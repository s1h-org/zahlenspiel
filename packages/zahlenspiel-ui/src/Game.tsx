import {Room} from "colyseus.js";
import React, {useEffect, useReducer, useRef} from 'react';
import {
    Card,
    CardStack,
    DropCardMessage,
    FinishTurnMessage,
    GameStates,
    Player,
    StartGameMessage,
    VoteFirstTurnMessage
} from "zahlenspiel-shared-entities";
import {CardComponent} from "./components/Card";
import {CardStackComponent} from "./components/CardStack";
import {HighlightedPlayerView, PlayerView} from "./components/PlayerView";
import {PlayerListView} from "./components/PlayerListView";
import {ActionButton, NextButton} from "./components/Buttons";

import ufo from "./ufo.svg";
import comet from "./comet.svg";
import {AppContainer, Bottom, CardDeck, CardStacks, Center, Column, HeaderText, Top} from "./components/Layout";
import {CardDeckComponent} from "./components/CardDeck";
import {initialState} from "./state/ui-state";
import {zahlenspielReducer} from "./reducers/zahlenspiel-reducer";
import {FinishTurnAction} from "./actions/finish-turn";
import {SelectCardStackAction} from "./actions/select-cardstack";

export interface GameProps {
    room: Room;
    onQuit: (roomId: string) => void;
}

const Game = (props: GameProps) => {

    const room = useRef<Room>(props.room);

    const [gameState, dispatch] = useReducer(zahlenspielReducer, initialState);

    useEffect(() => {
        window.location.hash = room.current.id;
        room.current.onMessage((message: any) => {
            dispatch(message);
        });
    }, []);

    const startGame = () => {
        room.current.send(new StartGameMessage());
    };

    const requestFirstTurn = () => {
        if (gameState.self) {
            room.current.send(new VoteFirstTurnMessage(gameState.self?.order!));
        }
    };

    const finishTurn = () => {
        room.current.send(new FinishTurnMessage(gameState.self?.order!));
        dispatch(new FinishTurnAction())
    };

    const dropCard = (card: Card, stackId: string) => {
        room.current.send(new DropCardMessage(card, stackId));
    };

    const leaveGame = (done: boolean) => {
        let isSure = true;
        if (!done) {
            isSure = window.confirm("You really want to leave and let the game win?");
        }
        if (isSure) {
            room.current.leave(true);
            props.onQuit(room.current.id);
        }
    }

    const renderCardStacks = () => {
        return gameState.cardStacks?.map((cardStack: CardStack) => {
                return (<>
                    <CardStackComponent key={`${cardStack.direction}_${cardStack.id}`}
                                        src={(cardStack.direction === "ascending") ? ufo : comet}/>
                    <CardComponent key={cardStack.id}
                                   card={new Card(cardStack.values[cardStack.values.length - 1])}
                                   onClick={() => dispatch(new SelectCardStackAction(cardStack))}
                                   active={cardStack.id === gameState.selectedCardStack?.id}
                                   falling={cardStack.id === gameState.updatedCardStackId}/>
                </>)
            }
        );
    };

    const renderCards = () => {
        return gameState.cardDeck?.sort((first: Card, second: Card) => first.value - second.value)
            .filter((card: Card) => card.value)
            .map((card: Card) => {
                return (<CardComponent key={card.value}
                                       card={card}
                                       onClick={() => dropCard(card, gameState.selectedCardStack?.id!)}/>)
            });
    };

    const renderPlayers = () => {
        return gameState.players.map((player: Player) => {
            return (gameState.currentPlayer?.order === player.order) ?
                <HighlightedPlayerView key={player.order} name={player.name} imageSize={64}
                                       isOwnPlayer={gameState.self?.order === player.order}
                                       onClick={() => leaveGame(false)}/> :
                <PlayerView key={player.order} name={player.name} imageSize={64}
                            isOwnPlayer={gameState.self?.order === player.order}
                            onClick={() => leaveGame(false)}/>
        });
    };

    const finishButton = () => {
        return (gameState.couldFinish) ? <NextButton onClick={finishTurn}/> : <></>;
    };

    const gameComponent = () => {
        switch (gameState.currentState) {
            case GameStates.WAITING:
                return (<>
                        <Top>
                            <HeaderText>Waiting for players ...</HeaderText>
                        </Top>
                        <Center>
                            <PlayerListView>
                                {renderPlayers()}
                            </PlayerListView>
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
                        <PlayerListView>
                            {renderPlayers()}
                        </PlayerListView>
                        <CardDeckComponent numberOfCards={3}>{gameState.remainingCardsInDeck}</CardDeckComponent>
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
                    <Center>
                        <Column>
                            {"Great job, you beat the game!"}
                            <ActionButton onClick={() => leaveGame(true)}>{"New game!"}</ActionButton>
                        </Column>
                    </Center>
                    <Bottom>
                    </Bottom>
                </>);
            case GameStates.LOST:
                return (<>
                    <Top>
                        <CardStacks>
                            {renderCardStacks()}
                        </CardStacks>
                    </Top>
                    <Center>
                        <Column>
                            {gameState.causeOfLoss ? gameState.causeOfLoss : "Oh no, you got beaten by the game!"} There
                            were {gameState.totalRemainingCards} cards left in total!
                            <ActionButton onClick={() => leaveGame(true)}>{"New game!"}</ActionButton>
                        </Column>
                    </Center>
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
