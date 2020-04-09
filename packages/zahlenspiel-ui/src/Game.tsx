import {Room} from "colyseus.js";
import React, {useEffect, useReducer, useRef} from 'react';
import {
    Card,
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
import {LobbyView} from "./components/LobbyView";
import {ActionButton, NextButton} from "./components/Buttons";

import ufo from "./ufo.svg";
import comet from "./comet.svg";
import {AppContainer, Bottom, CardDeck, CardStacks, Center, HeaderText, Top} from "./components/Layout";
import {CardDeckComponent} from "./components/CardDeck";
import {initialState} from "./state/ui-state";
import {zahlenspielReducer} from "./reducers/zahlenspiel-reducer";
import {FinishTurnAction} from "./actions/finish-turn";
import {SelectCardStackAction} from "./actions/select-cardstack";

export interface GameProps {
    room: Promise<Room>;
}

const Game = (props: GameProps) => {

    const room = useRef<Promise<Room>>(props.room);

    const [gameState, dispatch] = useReducer(zahlenspielReducer, initialState);

    useEffect(() => {
        room.current.then(r => {
            r.onMessage((message: any) => {
                dispatch(message);
            });
        });
    }, []);

    const startGame = () => {
        room.current.then(r => r.send(new StartGameMessage()));
    };

    const requestFirstTurn = () => {
        if (gameState.self) {
            room.current.then(r => r.send(new VoteFirstTurnMessage(gameState.self?.order!)));
        }
    };

    const finishTurn = () => {
        room.current.then(r => r.send(new FinishTurnMessage(gameState.self?.order!)));
        dispatch(new FinishTurnAction())
    };

    const dropCard = (card: Card, stackId: string) => {
        room.current.then(r => r.send(new DropCardMessage(card, stackId)));
    };

    const renderCardStacks = () => {
        return gameState.cardStacks?.map(cardStack => {
                return (<>
                    <CardStackComponent key={`${cardStack.direction}_${cardStack.id}`}
                                        src={(cardStack.direction === "ascending") ? ufo : comet}/>
                    <CardComponent key={cardStack.id}
                                   card={new Card(cardStack.values[cardStack.values.length - 1])}
                                   onClick={() => dispatch(new SelectCardStackAction(cardStack))}
                                   active={cardStack.id === gameState.selectedCardStack?.id}/>
                </>)
            }
        );
    };

    const renderCards = () => {
        return gameState.cardDeck?.sort((first: Card, second: Card) => first.value - second.value)
            .filter(card => card.value)
            .map(card => {
                return (<CardComponent key={card.value}
                                       card={card}
                                       onClick={() => dropCard(card, gameState.selectedCardStack?.id!)}/>)
            });
    };

    const renderPlayers = () => {
        return gameState.players.map((player: Player) => {
            return (gameState.currentPlayer?.order === player.order) ?
                <HighlightedPlayerView key={player.order} name={player.name} imageSize={64}/> :
                <PlayerView key={player.order} name={player.name} imageSize={64}/>
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
                    <Center>Oh no, you got beaten by the game! There were {gameState.totalRemainingCards} cards
                        left!</Center>
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
