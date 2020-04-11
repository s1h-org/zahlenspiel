export const turnFinishable = (amountOfDroppedCards: number, remaingCardsInDeck: number): boolean => {
    return (remaingCardsInDeck > 0) ? amountOfDroppedCards >= 2 : amountOfDroppedCards >= 1;
};