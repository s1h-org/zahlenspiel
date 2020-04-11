import {newDeck} from "./new-deck";

describe('newDeck', () => {
    it('should create a deck of given size', () => {
        // GIVEN
        const from = 2;
        const to = 99;
        const expectedSize = 98;

        // WHEN
        const createdDeck = newDeck(from, to);

        // THEN
        expect(createdDeck.length).toBe(expectedSize);
    });

    it('should create a unique deck of given size', () => {
        // GIVEN
        const from = 2;
        const to = 99;
        const expectedSize = 98;

        // WHEN
        const createdDeck = newDeck(from, to);
        const uniqueSet = new Set(createdDeck);

        // THEN
        expect(uniqueSet.size).toBe(expectedSize);
    });
});