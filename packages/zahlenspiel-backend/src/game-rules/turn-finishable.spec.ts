import {turnFinishable} from "./turn-finishable";

describe('turnFinishable', () => {
    it.each([
        [true, 0, 1],
        [false, 0, 0],
        [true, 4, 4],
        [false, 4, 1],
        [false, 4, 0],
    ])('should be $s for $s remaining cards and $s dropped card', (expected: boolean, remainingCards: number, droppedCards: number) => {
        // WHEN
        const result = turnFinishable(droppedCards, remainingCards);

        // THEN
        expect(result).toBe(expected);
    });
});