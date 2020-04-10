import * as Colyseus from "colyseus.js";
import React from 'react';
import {render} from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {GameErrorBoundary} from "./GameErrorBoundary";
import {ConnectionHandler} from "./connection-handler";
import Zahlenspiel from "./Zahlenspiel";
import {getRoomId} from "./game-data-handler";

let endpoint = `${window.document.location.protocol.replace("http", "ws")}//${window.document.location.hostname}`;
if (window.document.location.port && window.document.location.port !== "80") {
    endpoint = `${endpoint}:2567`;
} else if (window.document.location.port && window.document.location.port !== "443") {
    endpoint = `${endpoint}:2567`;
}

const connectionHandler = new ConnectionHandler(
    new Colyseus.Client(endpoint)
);

const directJoinRoomId = getRoomId();
if (directJoinRoomId) {
    console.log("direct join room:", directJoinRoomId);
    connectionHandler.join(directJoinRoomId);
}

render(
    <React.StrictMode>
        <GameErrorBoundary>
            <Zahlenspiel connectionHandler={connectionHandler}/>
        </GameErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
