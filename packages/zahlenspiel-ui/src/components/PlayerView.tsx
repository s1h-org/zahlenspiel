import styled from "styled-components";
import {Avatar} from "./Avatar";
import React, {HTMLProps} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

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

const QuitGameButton = styled.span`
    position: relative;
    float: right;
    margin-left: 0.75rem;
`;

export interface PlayerProps extends HTMLProps<HTMLDivElement> {
    name: string;
    imageSize?: number;
    isOwnPlayer: boolean;
}

export const PlayerView = (props: PlayerProps) => {
    return (
        <PlayerContainer borderColor={"white"} borderSize={"1px"}>
            {props.isOwnPlayer && <QuitGameButton onClick={props.onClick}><FontAwesomeIcon icon={faTimesCircle}/></QuitGameButton>}
            <Avatar identifier={props.name} size={props.imageSize}/>
            <PlayerName>{props.name}</PlayerName>
        </PlayerContainer>
    )
};

export const HighlightedPlayerView = (props: PlayerProps) => {
    return (
        <PlayerContainer borderColor={"green"} borderSize={"2px"}>
            {props.isOwnPlayer && <QuitGameButton onClick={props.onClick}><FontAwesomeIcon icon={faTimesCircle}/></QuitGameButton>}
            <Avatar identifier={props.name} size={props.imageSize}/>
            <PlayerName>{props.name}</PlayerName>
        </PlayerContainer>
    )
};
