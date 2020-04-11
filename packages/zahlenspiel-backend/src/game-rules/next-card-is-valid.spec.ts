import {ascendingCardIsValid, descendingCardIsValid} from "./next-card-is-valid";

describe('NextCardValidator', () => {
    describe('ascending', () => {
        it('should approve a higher card when ascending', () => {
            // GIVEN
            const current = 5;
            const next = 6;

            // WHEN
            const SUT = () => ascendingCardIsValid(current, next);

            // THEN
            expect(SUT()).toBeTruthy();
        });

        it('should fail a lower card when ascending', () => {
            // GIVEN
            const current = 5;
            const next = 1;

            // WHEN
            const SUT = () => ascendingCardIsValid(current, next);

            // THEN
            expect(SUT()).toBeFalsy();
        });

        it('should approve a lower card when ascending if it is exactly 10 lower than current', () => {
            // GIVEN
            const current = 15;
            const next = 5;

            // WHEN
            const SUT = () => ascendingCardIsValid(current, next);

            // THEN
            expect(SUT()).toBeTruthy();
        })
    });

    describe('descending', () => {
        it('should approve a lower card when descending', () => {
            // GIVEN
            const current = 6;
            const next = 5;

            // WHEN
            const SUT = () => descendingCardIsValid(current, next);

            // THEN
            expect(SUT()).toBeTruthy();
        });

        it('should fail a higher card when descending', () => {
            // GIVEN
            const current = 1;
            const next = 5;

            // WHEN
            const SUT = () => descendingCardIsValid(current, next);

            // THEN
            expect(SUT()).toBeFalsy();
        });

        it('should approve a higher card when descending if it is exactly 10 higher than current', () => {
            // GIVEN
            const current = 5;
            const next = 15;

            // WHEN
            const SUT = () => descendingCardIsValid(current, next);

            // THEN
            expect(SUT()).toBeTruthy();
        })
    });
});