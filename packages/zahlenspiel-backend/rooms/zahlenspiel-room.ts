import {Client, Room} from "colyseus";
import {GameState} from "../states/game-state";
import {
    Card,
    GameLostMessage,
    GameStartedMessage,
    GameStates,
    GameWonMessage,
    isDropCardMessage,
    isFinishTurnMessage,
    isStartGameMessage,
    isVoteFirstTurnMessage,
    JoinErrorMessage,
    JoinSuccessMessage, MAX_RECONNECTION_TIME_IN_SECONDS,
    NewCardMessage,
    PlayerJoinMessage,
    PlayerLeaveMessage,
    PlayerSwitchMessage,
    SetupFinishedMessage,
    TurnFinishableMessage,
    TurnValidMessage,
    UpdateCardStackMessage
} from "zahlenspiel-shared-entities";
import {turnFinishable} from "../game-rules";
import {marshallCardStacks, marshallPlayers, toPlayerDTO} from "../entities/entity-mapping";
import {Player} from "../entities";

export class ZahlenspielRoom extends Room<GameState> {

    maxClients = 5;

    onCreate(options: any) {
        this.setState(new GameState(options.password))
    }

    onAuth(client: Client, options: any): boolean {
        if (this.state.password?.length) {
            return (this.state.password === options.password)
        } else {
            return true;
        }
    }

    onJoin(client: Client, options: any) {
        console.log(`Client connected: ${client.id}`);
        this.state.addNewPlayer(client, options.playerName || "Guy Incognito");
        const newPlayer = this.state.getPlayer(client.id);
        if (newPlayer) {
            setTimeout(() => {
                this.send(client, new JoinSuccessMessage(toPlayerDTO(newPlayer)));
            }, 300);
            setTimeout(() => {
                this.broadcast(new PlayerJoinMessage(marshallPlayers(this.state.players)));
            }, 300);
        } else {
            this.send(client, new JoinErrorMessage("Failed to add player."));
        }
        if (this.maxPlayersReached()) {
            this.startGame();
        }
    }

    onMessage(client: Client, message: any) {
        const player = this.state.getPlayer(client.id);
        if (this.isWaitingPhase() && isStartGameMessage(message)) {
            this.state.currentGameState = GameStates.PREGAME;
            this.startGame();
        } else if (isVoteFirstTurnMessage(message)) {
            if (this.isPreGamePhase() && !this.state.currentPlayer) {
                this.state.currentGameState = GameStates.GAME;
                this.state.setCurrentPlayer(player);
                this.broadcast(new PlayerSwitchMessage(toPlayerDTO(this.state.currentPlayer)));
                this.broadcast(new GameStartedMessage());
            }
        } else if (isFinishTurnMessage(message)) {
            if (this.isGamePhase() && this.state.isCurrentPlayer(player)) {
                this.state.refillCurrentPlayerCards();
                this.updateCardStacks();
                this.send(this.state.currentPlayer.client, new NewCardMessage(player.cards));
                this.nextPlayer();
            }
        } else if (isDropCardMessage(message)) {
            if (this.isGamePhase() && this.state.isCurrentPlayer(player)) {
                try {
                    this.state.addCardToStack(message.card, message.stackId);
                    player.cards = player.cards.filter((card: Card) => card.value && card.value !== message.card.value);
                    this.state.increaseDroppedCardsAmount();
                    this.send(player.client, new TurnValidMessage(player.cards));
                    this.updateCardStacks();
                    if (this.state.isGameWon()) {
                        this.broadcast(new GameWonMessage());
                        return;
                    } else if (this.state.isGameLost()) {
                        this.broadcast(new GameLostMessage(this.state.totalRemainingCards()));
                    } else if (turnFinishable(this.state.validDroppedCards, this.state.currentDeck.length)) {
                        this.send(player.client, new TurnFinishableMessage());
                    }
                    console.log(JSON.stringify(this.state.cardStacks[message.stackId]));
                } catch (e) {
                    // this.send(player.client, new TurnInvalidMessage(initialCardState));
                }
            } else {
                console.log("Nope, not current player");
            }
        } else {
            console.log(`Received invalid message from client ${player.name}: ${JSON.stringify(message)}`);
        }
    }

    async onLeave(client: Client, consented: boolean) {
        if (consented) {
            console.log(`Client left: ${client.id}`);
            this.state.removePlayer(client.id);
            const playerList = marshallPlayers(this.state.players);
            this.broadcast(new PlayerLeaveMessage(playerList), {except: client});
        } else {
            const reconnectedClient = await this.allowReconnection(client, MAX_RECONNECTION_TIME_IN_SECONDS);
            const player = this.state.getPlayer(client.id);
            player.client = reconnectedClient;
            this.syncPlayerAfterReconnect(player);
        }
    }

    onDispose() {
    }

    private nextPlayer() {
        if (this.state.isGameLost()) {
            this.broadcast(new GameLostMessage(this.state.totalRemainingCards()));
        } else {
            this.state.nextPlayer();
            this.broadcast(new PlayerSwitchMessage(toPlayerDTO(this.state.currentPlayer)));
        }
    }

    private startGame() {
        this.lock().then(_ => {
            this.handoutCardsToPlayers();
            this.updateCardStacks();
            if (this.isSinglePlayerGame()) {
                this.startSinglePlayerGame();
            } else {
                this.finishSetup();
            }
        });
    }

    private updateCardStacks() {
        this.broadcast(
            new UpdateCardStackMessage(
                marshallCardStacks(this.state.cardStacks),
                this.state.remainingCardsOnStack()
            )
        );
    }

    private finishSetup() {
        this.state.currentGameState = GameStates.PREGAME;
        this.broadcast(new SetupFinishedMessage());
    }

    private maxPlayersReached() {
        return this.state.players.length === this.maxClients;
    }

    private isSinglePlayerGame() {
        return this.state.players.length === 1;
    }

    private startSinglePlayerGame() {
        this.state.currentGameState = GameStates.GAME;
        this.state.setCurrentPlayer(this.state.players[0]);
        this.broadcast(new PlayerSwitchMessage(toPlayerDTO(this.state.currentPlayer)));
        this.broadcast(new GameStartedMessage());
    }

    private handoutCardsToPlayers() {
        this.state.handoutCardsToPlayers();
        for (let player of this.state.players) {
            this.send(player.client, new NewCardMessage(player.cards));
        }
    }

    private isPreGamePhase(): boolean {
        return this.state.currentGameState === GameStates.PREGAME;
    }

    private isGamePhase(): boolean {
        return this.state.currentGameState === GameStates.GAME;
    }

    private isWaitingPhase(): boolean {
        return this.state.currentGameState === GameStates.WAITING;
    }

    private syncPlayerAfterReconnect(player: Player) {
        setTimeout(() => {
            this.send(player.client, new JoinSuccessMessage(toPlayerDTO(player)));
            this.send(player.client, new PlayerJoinMessage(marshallPlayers(this.state.players)));
            if (this.isPreGamePhase()) {
                this.send(player.client, new UpdateCardStackMessage(marshallCardStacks(this.state.cardStacks), this.state.remainingCardsOnStack()));
                this.send(player.client, new NewCardMessage(player.cards));
                this.send(player.client, new SetupFinishedMessage());
            } else if (this.isGamePhase()) {
                this.send(player.client, new UpdateCardStackMessage(marshallCardStacks(this.state.cardStacks), this.state.remainingCardsOnStack()));
                this.send(player.client, new NewCardMessage(player.cards));
                this.send(player.client, new PlayerSwitchMessage(toPlayerDTO(this.state.currentPlayer)));
                this.send(player.client, new GameStartedMessage());
            }
        }, 200);
    }
}
