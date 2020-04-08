export const determineCardsInHand = (playerCount: number): number => {
    if (playerCount === 1) {
        return 8;
    } else if (playerCount === 2) {
        return 7;
    } else if (playerCount >= 3 && playerCount <= 5) {
        return 6;
    }
    throw Error(`Invalid amount of players: ${playerCount}`);
};

export const amountOfCardsInAllHands = (playerCount: number): number => {
    return playerCount * determineCardsInHand(playerCount);
};
