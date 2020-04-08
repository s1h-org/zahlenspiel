import {determineCardsInHand} from "./determine-cards-in-hand";

describe('determineCardsInHand', () => {
    it.each([
        [1, 8],
        [2, 7],
        [3, 6],
        [4, 6],
        [5, 6],
    ])('$s player(s) should have $s cards', (players: number, cards: number) => {
        expect(determineCardsInHand(players)).toBe(cards);
    });
});