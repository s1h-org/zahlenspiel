import styled from "styled-components";
import {Avatar} from "./Avatar";
import React from "react";

interface PlayerContainerProps {
    borderColor: string;
    borderSize: string;
}

const PlayerContainer = styled.div`
    border: ${(props: PlayerContainerProps) => props.borderColor} ${(props: PlayerContainerProps) => props.borderSize} solid;
    padding: 0.5rem;
    margin: 0.25rem;
    height: fit-content;
`;

const PlayerName = styled.h4`
    margin: 0 0 0.25rem 0;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: -1px;
`;

export interface PlayerProps {
    name: string;
    imageSize?: number;
}

export const PlayerView = (props: PlayerProps) => {
    return (
        <PlayerContainer borderColor={"white"} borderSize={"1px"}>
            <Avatar identifier={props.name} size={props.imageSize}/>
            <PlayerName>{props.name}</PlayerName>
        </PlayerContainer>
    )
};

export const HighlightedPlayerView = (props: PlayerProps) => {
    return (
        <PlayerContainer borderColor={"green"} borderSize={"2px"}>
            <Avatar identifier={props.name} size={props.imageSize}/>
            <PlayerName>{props.name}</PlayerName>
        </PlayerContainer>
    )
};
