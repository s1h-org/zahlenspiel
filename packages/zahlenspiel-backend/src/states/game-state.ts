import {CardStack, Player} from "../entities";
import {Card, GameStates} from "zahlenspiel-shared-entities";
import {determineCardsInHand, newDeck, turnFinishable} from "../game-rules";
import {Client} from "colyseus";
import {ArraySchema, MapSchema, Schema, type} from "@colyseus/schema";

export class GameState extends Schema {
    @type([Player])
    players = new ArraySchema<Player>();

    @type({map: CardStack})
    cardStacks = new MapSchema<CardStack>();

    @type("number")
    currentGameState: GameStates;

    password?: string;

    currentPlayer: Player;

    validDroppedCards: number = 0;
    currentDeck: number[];

    constructor(password: string) {
        super();
        this.addAscendingCardStack();
        this.addAscendingCardStack();
        this.addDescendingCardStack();
        this.addDescendingCardStack();
        this.currentDeck = newDeck(2, 99);
        this.currentGameState = GameStates.WAITING;
        this.password = password;
    }

    private addAscendingCardStack() {
        const newStack = new CardStack("ascending");
        this.cardStacks[newStack.id] = newStack;
    }

    private addDescendingCardStack() {
        const newStack = new CardStack("descending");
        this.cardStacks[newStack.id] = newStack;
    }

    addCardToStack(nextCard: Card, stackId: string) {
        this.cardStacks[stackId].addCard(nextCard);
    }

    addNewPlayer(client: Client, name: string) {
        const newPlayer = new Player(this.players.length, name, client);
        this.players.push(newPlayer);
    }

    removePlayer(id: string) {
        this.players = this.players
            .filter((player: Player) => player.id !== id);
    }

    increaseDroppedCardsAmount(amount: number = 1) {
        this.validDroppedCards += amount;
    }

    resetDroppedCardsAmount() {
        this.validDroppedCards = 0;
    }

    remainingCardsOnStack(): number {
        return this.currentDeck.length;
    }
   
    totalRemainingCards(): number {
        const remainingPlayerCards = this.players.reduce((totalCards: number, currentPlayer: Player) => {
            totalCards += currentPlayer.cards.length;
            return totalCards;
        }, 0);
        const remainingCardsOnStack = this.currentDeck.length;
        return remainingCardsOnStack + remainingPlayerCards;
    }

    getPlayer(id: string): Player {
        return this.players.find((player: Player) => player.id === id);
    }

    setCurrentPlayer(player: Player) {
        this.currentPlayer = player;
    }

    isCurrentPlayer(player: Player): boolean {
        return player.id === this.currentPlayer.id;
    }

    nextPlayer() {
        const playersWithCardsLeft = this.players.filter(player => player.cards.length).length > 0;
        if (!playersWithCardsLeft) {
            return;
        }
        const nextPlayerOrdinal = (this.currentPlayer.order + 1) % this.players.length;
        this.currentPlayer = this.players.find((player: Player) => player.order === nextPlayerOrdinal);
        if (this.currentPlayer.cards.length === 0) {
            this.nextPlayer();
        }
    }

    handoutCardsToPlayers() {
        const amountOfCardsToHandOut = determineCardsInHand(this.players.length);
        for (let round = 0; round < amountOfCardsToHandOut; ++round) {
            for (let player of this.players) {
                player.cards.push(new Card(this.currentDeck.pop()));
            }
        }
    }

    refillCurrentPlayerCards() {
        for (let idx = 0; idx < this.validDroppedCards; ++idx) {
            const nextCardValue = this.currentDeck.pop();
            if (nextCardValue) {
                this.currentPlayer.cards.push(new Card(nextCardValue));
            }
        }
        this.resetDroppedCardsAmount();
    }

    isGameWon(): boolean {
        return this.totalRemainingCards() === 0;
    }

    isGameLost(): boolean {
        if (this.currentPlayer.cards.length === 0 || turnFinishable(this.validDroppedCards, this.currentDeck.length)) {
            return false;
        }
        const increasingCardStacks: CardStack[] = [];
        const decreasingCardStacks: CardStack[] = [];

        for (let stackId in this.cardStacks) {
            const cardStack: CardStack = this.cardStacks[stackId];
            if (cardStack.direction === "ascending") {
                increasingCardStacks.push(cardStack);
            } else {
                decreasingCardStacks.push(cardStack);
            }
        }
        const playableCards = this.currentPlayer.cards.filter((card: Card) => {
            const cardValue = card.value;

            const increasePossible = increasingCardStacks.map((cardStack: CardStack) => {
                return cardStack.values[cardStack.values.length - 1] < cardValue
            });
            const decreasePossible = decreasingCardStacks.map((cardStack: CardStack) => {
                return cardStack.values[cardStack.values.length - 1] > cardValue
            });
            for (const isPlayable of [...increasePossible, ...decreasePossible]) {
                if (isPlayable) {
                    return true;
                }
            }
        });
        return (playableCards.length === 0);
    }
}