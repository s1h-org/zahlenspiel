import {ConnectionHandler} from "./connection-handler";
import React, {useRef, useState} from "react";
import {Room} from "colyseus.js";
import Game from "./Game";
import Lobby from "./Lobby";
import {ErrorView} from "./Error";

export interface ZahlenspielProps {
    connectionHandler: ConnectionHandler;
}

const Zahlenspiel = (props: ZahlenspielProps) => {

    const [currentGame, setCurrentGame] = useState<Room>();
    const [error, setError] = useState<Error>();

    const client = useRef<ConnectionHandler>(props.connectionHandler);
    client.current.onCreate = (room: Room) => {
        setCurrentGame(room);
    }
    client.current.onJoin = (room: Room) => {
        setCurrentGame(room);
    }
    client.current.onReconnect = (room: Room) => {
        setCurrentGame(room);
    }
    client.current.onError = (error: Error) => {
        setError(error);
    }

    if (error) {
        return <ErrorView><h3>{error.message}</h3></ErrorView>;
    } else if (currentGame) {
        return <Game room={currentGame}/>;
    } else {
        return <Lobby connectionHandler={client.current}/>;
    }
};

export default Zahlenspiel;
