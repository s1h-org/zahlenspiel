import * as Colyseus from "colyseus.js";
import {Room} from "colyseus.js";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import * as serviceWorker from './serviceWorker';
import {MAX_RECONNECTION_TIME_IN_SECONDS} from "zahlenspiel-shared-entities";

const Storage = {
    sessionId: "zahlenspiel_sessionId",
    roomId: "zahlenspiel_roomId",
    lastUpdated: "zahlenspiel_lastUpdated",
};

let endpoint = `${window.document.location.protocol.replace("http", "ws")}//${window.document.location.hostname}`;
if (window.document.location.port && window.document.location.port !== "80") {
    endpoint = `${endpoint}:2567`;
} else if (window.document.location.port && window.document.location.port !== "443") {
    endpoint = `${endpoint}:2567`;
}

const setState = (roomId: string, sessionId: string) => {
    localStorage.setItem(Storage.roomId, roomId);
    localStorage.setItem(Storage.sessionId, sessionId);
    localStorage.setItem(Storage.lastUpdated, String(Date.now()));
};

const isStateOutdated = () => {
    const now = Date.now();
    const lastUpdate = localStorage.getItem(Storage.lastUpdated);
    if (!lastUpdate) {
        return true;
    } else {
        const timeSinceLastStateUpdateInSeconds = (now - Number(lastUpdate)) / 1000;
        return (timeSinceLastStateUpdateInSeconds > MAX_RECONNECTION_TIME_IN_SECONDS);
    }
};

const getState = () => {
    return ({
        roomId: localStorage.getItem(Storage.roomId),
        sessionId: localStorage.getItem(Storage.sessionId),
        lastUpdated: localStorage.getItem(Storage.lastUpdated)
    });
};

const clearState = () => {
    for (const val of Object.values(Storage)) {
        localStorage.removeItem(val);
    }
};

const connect = () => {
    console.log(`Connecting to endpoint: ${endpoint}`);
    const playerName = window.prompt("Please enter your name", "Guy Incognito");
    const room = client.joinOrCreate('zahlenspiel', {playerName});
    return room.then(r => {
        setState(r.id, r.sessionId);
        return r;
    });
};

const reconnect = (roomId: string, sessionId: string) => {
    console.log(`Reconnecting to endpoint: ${endpoint}`);
    return client.reconnect(roomId, sessionId).then(r => {
        return r;
    })
};

const client = new Colyseus.Client(endpoint);
let room: Promise<Room>;

if (!isStateOutdated()) {
    const answer = window.confirm("You have an ongoing game, do you want to reconnect?");
    const storedGameState = getState();
    if (answer) {
        if (storedGameState.roomId && storedGameState.sessionId) {
            room = reconnect(storedGameState.roomId, storedGameState.sessionId);
        } else {
            clearState();
            room = Promise.reject(`Missing room and / or session info, failed to reconnect.`);
        }
    } else {
        if (storedGameState.roomId && storedGameState.sessionId) {
            room = reconnect(storedGameState.roomId, storedGameState.sessionId);
            room.then(r => r.leave(true));
        }
        room = connect()
    }
} else {
    clearState();
    room = connect()
}

ReactDOM.render(
    <React.StrictMode>
        <Game room={room}/>
    </React.StrictMode>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
