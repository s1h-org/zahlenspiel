import styled from "styled-components";
import React, {ReactNode} from "react";

const MARGIN_SIZE = 7;

export interface DeckCardProps {
    order: number;
}

const DeckCardContainer = styled.div`
    position: relative;
    width: calc(100vw / 10);
    height: calc(100vh / 4);
`;
const DeckCard = styled.div`
    position: absolute;
    left: ${(props: DeckCardProps) => props.order * MARGIN_SIZE}px;
    top: ${(props: DeckCardProps) => props.order * MARGIN_SIZE}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100vw / 10);
    height: calc(100vh / 4);
    font-family: Josefin Sans, serif;
    font-weight: bold;
    letter-spacing: -1px;
    box-sizing: border-box;
    background: #282c34;
    border-radius: 12px;
    border: darkgrey 2px solid;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    color: white;
}
`;
const CenterText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

export interface CardDeckProps {
    numberOfCards: number;
    children?: ReactNode;
}

const renderDeckCards = (amount: number, children?: ReactNode) => {
    const cards: JSX.Element[] = [];
    for (let idx = 0; idx < amount - 1; ++idx) {
        cards.push(<DeckCard key={`cardDeck${idx}`} order={idx}/>)
    }
    cards.push(<DeckCard key={`cardDeck${amount - 1}`}
                         order={amount - 1}><CenterText>{children}</CenterText></DeckCard>);
    return cards;
};
export const CardDeckComponent = (props: CardDeckProps) => {
    return (
        <DeckCardContainer>
            {renderDeckCards(props.numberOfCards, props.children)}
        </DeckCardContainer>
    )
};
