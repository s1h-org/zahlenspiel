import {Room} from "colyseus.js";
import React, {useEffect, useRef, useState} from 'react';
import {
    Card,
    CardStack,
    DropCardMessage,
    FinishTurnMessage,
    GameStates,
    isGameLostMessage,
    isGameStartedMessage,
    isGameWonMessage,
    isJoinErrorMessage,
    isJoinSuccessMessage,
    isNewCardMessage,
    isPlayerJoinMessage,
    isPlayerLeaveMessage,
    isPlayerSwitchMessage,
    isSetupFinishedMessage,
    isTurnFinishableMessage,
    isTurnInvalidMessage,
    isTurnValidMessage,
    isUpdateCardStacksMessage,
    Player,
    StartGameMessage,
    VoteFirstTurnMessage
} from "zahlenspiel-shared-entities";
import {CardComponent} from "./components/Card";
import {CardStackComponent} from "./components/CardStack";
import {HighlightedPlayerView, PlayerView} from "./components/PlayerView";
import {LobbyView} from "./components/LobbyView";
import {ActionButton, NextButton} from "./components/Buttons";

import ufo from "./ufo.svg";
import comet from "./comet.svg";
import {AppContainer, Bottom, CardDeck, CardStacks, Center, HeaderText, Top} from "./components/Layout";
import {CardDeckComponent} from "./components/CardDeck";

export interface GameProps {
    room: Promise<Room>;
}

const Game = (props: GameProps) => {

    const room = useRef<Promise<Room>>(props.room);

    const [self, setSelf] = useState<Player>();
    const [currentState, setCurrentState] = useState<GameStates>(GameStates.WAITING);
    const [couldFinish, setCouldFinish] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<Player>();
    const [cardStacks, setCardStacks] = useState<CardStack[]>([]);
    const [selectedCardStack, selectCardStack] = useState<CardStack>();
    const [cardDeck, setCardDeck] = useState<Card[]>();
    const [totalRemainingCards, setTotalRemainingCards] = useState<number>();
    const [remainingCardsInDeck, setRemainingCardsInDeck] = useState<number>();
    const [currentError, setCurrentError] = useState<number>();

    useEffect(() => {
        room.current.then(r => {
            r.onMessage((message: any) => {
                if (isJoinSuccessMessage(message)) {
                    console.log(`Connected successfully`);
                    setSelf(message.self);
                } else if (isJoinErrorMessage(message)) {
                    console.log(`Connection failed`);
                } else if (isPlayerJoinMessage(message)) {
                    setPlayers(message.currentPlayers);
                } else if (isPlayerLeaveMessage(message)) {
                    setPlayers(message.currentPlayers);
                } else if (isPlayerSwitchMessage(message)) {
                    setCurrentPlayer(message.currentPlayer);
                } else if (isNewCardMessage(message)) {
                    setCardDeck(message.cards);
                } else if (isTurnValidMessage(message)) {
                    setCardDeck(message.cards);
                } else if (isTurnInvalidMessage(message)) {
                } else if (isTurnFinishableMessage(message)) {
                    setCouldFinish(true);
                } else if (isUpdateCardStacksMessage(message)) {
                    setCardStacks(message.cardStacks);
                    setRemainingCardsInDeck(message.remainingCardsInDeck);
                } else if (isSetupFinishedMessage(message)) {
                    setCurrentState(GameStates.PREGAME);
                } else if (isGameStartedMessage(message)) {
                    setCurrentState(GameStates.GAME);
                } else if (isGameWonMessage(message)) {
                    setCurrentState(GameStates.WON);
                } else if (isGameLostMessage(message)) {
                    setTotalRemainingCards(message.remainingCards);
                    setCurrentState(GameStates.LOST);
                }
            })
        }).catch((reason => {
            setCurrentError(reason);
            setCurrentState(GameStates.ERROR);
        }));
    }, []);

    const startGame = () => {
        room.current.then(r => r.send(new StartGameMessage()));
    };

    const requestFirstTurn = () => {
        if (self) {
            room.current.then(r => r.send(new VoteFirstTurnMessage(self?.order!)));
        }
    };

    const finishTurn = () => {
        room.current.then(r => r.send(new FinishTurnMessage(self?.order!)));
        setCouldFinish(false);
        selectCardStack(undefined);
    };

    const dropCard = (card: Card, stackId: string) => {
        room.current.then(r => r.send(new DropCardMessage(card, stackId)));
    };

    const renderCardStacks = () => {
        return cardStacks?.map(cardStack => {
                return (<>
                    <CardStackComponent key={`${cardStack.direction}_${cardStack.id}`}
                                        src={(cardStack.direction === "ascending") ? ufo : comet}/>
                    <CardComponent key={cardStack.id}
                                   card={new Card(cardStack.values[cardStack.values.length - 1])}
                                   onClick={() => selectCardStack(cardStack)}
                                   active={cardStack.id === selectedCardStack?.id}/>
                </>)
            }
        );
    };

    const renderCards = () => {
        return cardDeck?.sort((first: Card, second: Card) => first.value - second.value)
            .filter(card => card.value)
            .map(card => {
                return (<CardComponent key={card.value}
                                       card={card}
                                       onClick={() => dropCard(card, selectedCardStack?.id!)}/>)
            });
    };

    const renderPlayers = () => {
        return players.map((player: Player) => {
            return (currentPlayer?.order === player.order) ?
                <HighlightedPlayerView key={player.order} name={player.name} imageSize={64}/> :
                <PlayerView key={player.order} name={player.name} imageSize={64}/>
        });
    };

    const finishButton = () => {
        return (couldFinish) ? <NextButton onClick={finishTurn}/> : <></>;
    };

    const gameComponent = () => {
        switch (currentState) {
            case GameStates.ERROR:
                return (<>
                        <Top>
                            <HeaderText>An error occured ...</HeaderText>
                        </Top>
                        <Center>
                            <h3>{currentError}</h3>
                        </Center>
                        <Bottom>
                            <h4>You can try and refresh the page</h4>
                        </Bottom>
                    </>
                );
            case GameStates.WAITING:
                return (<>
                        <Top>
                            <HeaderText>Waiting for players ...</HeaderText>
                        </Top>
                        <Center>
                            <LobbyView>
                                {renderPlayers()}
                            </LobbyView>
                        </Center>
                        <Bottom>
                            <ActionButton onClick={startGame}>{"Start game!"}</ActionButton>
                        </Bottom>
                    </>
                );
            case GameStates.PREGAME:
                return (<>
                        <Top>
                            <CardStacks>
                                {renderCardStacks()}
                            </CardStacks>
                        </Top>
                        <Center>
                            <ActionButton
                                onClick={requestFirstTurn}>{"I want to go first!"}</ActionButton>
                        </Center>
                        <Bottom>
                            <CardDeck>
                                {renderCards()}
                            </CardDeck>
                        </Bottom>
                    </>
                );
            case GameStates.GAME:
                return (<>
                    <Top>
                        <CardStacks>
                            {renderCardStacks()}
                        </CardStacks>
                    </Top>
                    <Center>
                        <LobbyView>
                            {renderPlayers()}
                        </LobbyView>
                        <CardDeckComponent numberOfCards={3}>{remainingCardsInDeck}</CardDeckComponent>
                    </Center>
                    <Bottom>
                        <CardDeck>
                            {renderCards()}
                        </CardDeck>
                        {finishButton()}
                    </Bottom>
                </>);
            case GameStates.WON:
                return (<>
                    <Top>
                        <CardStacks>
                            {renderCardStacks()}
                        </CardStacks>
                    </Top>
                    <Center>Great job, you beat the game!</Center>;
                    <Bottom>
                        <CardDeck>
                            {renderCards()}
                        </CardDeck>
                    </Bottom>
                </>);
            case GameStates.LOST:
                return (<>
                    <Top>
                        <CardStacks>
                            {renderCardStacks()}
                        </CardStacks>
                    </Top>
                    <Center>Oh no, you got beaten by the game! There were {totalRemainingCards} cards left!</Center>
                    <Bottom>
                        <CardDeck>
                            {renderCards()}
                        </CardDeck>
                    </Bottom>
                </>);

        }
    };

    return (
        <AppContainer>
            {gameComponent()}
        </AppContainer>
    );
};

export default Game;
