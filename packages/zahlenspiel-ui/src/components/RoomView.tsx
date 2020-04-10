import styled from "styled-components";
import React, {HTMLProps} from "react";
import {RoomAvailable} from "colyseus.js";
import {Separator} from "./Separator";
import {ActionButton} from "./Buttons";

const RoomContainer = styled.div`
    cursor: default;
    background: #282c34;
    border: white 2px solid;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
`;

const RoomId = styled.h4`
    margin: 0;
`;
const RoomDetails = styled.h5`
    margin: 0 0 1rem 0;
`;

export interface RoomProps extends HTMLProps<HTMLDivElement> {
    room: RoomAvailable<any>;
}

export const RoomView = (props: RoomProps) => {
    return (
        <RoomContainer>
            <RoomId>Id: {props.room.roomId}</RoomId>
            <Separator color={"white"} size={1} />
            <RoomDetails>Players: {props.room.clients}/{props.room.maxClients}</RoomDetails>
            <ActionButton onClick={props.onClick}>Join!</ActionButton>
        </RoomContainer>
    )
};
