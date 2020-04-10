import React, {ReactNode} from "react";
import {Card} from "zahlenspiel-shared-entities";

import styled from "styled-components";

interface CardContainerProps {
    active?: boolean;
}

const CardContainer = styled.div`
    font-family: Josefin Sans, serif;
    font-weight: 100;
    letter-spacing: -1px;
    box-sizing: border-box;
    width: calc(100vw / 10);
    height: calc(100vh / 4);
    background: #CCC5B3;
    border-radius: 12px;
    border: ${(props: CardContainerProps) => (props.active) ? "white 2px solid" : null};
    margin: 5px;
    position: relative;
    overflow: hidden;
    color: white;
    background-color: #6d695c;
    background-image:
    repeating-linear-gradient(120deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
    repeating-linear-gradient(60deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
    linear-gradient(60deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1)),
    linear-gradient(120deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1));
    background-size: 70px 120px;
    &:hover {
        border: white 2px solid;
    }
  }
`;

const CenterText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Mark = styled.div`
    position: absolute;
    font-size: 1.5rem;
    font-weight: bold;
    top: 5%;
    left: 5%;
`;

const FlippedMark = styled(Mark)`
    transform: rotate(180deg);
    top: auto;
    left: auto;
    bottom: 5%;
    right: 5%;
    color: #E1623F;
`;

interface CardProps {
    card: Card;
    active?: boolean;
    onClick?: () => void;
    children?: ReactNode;
}

export const CardComponent = (props: CardProps) => {
    return (<CardContainer key={props.card.value} onClick={props.onClick} active={props.active}>
        <Mark>{props.card.value}</Mark>
        <CenterText>{props.children ? props.children : null}</CenterText>
        <FlippedMark>{props.card.value}</FlippedMark>
    </CardContainer>)
};