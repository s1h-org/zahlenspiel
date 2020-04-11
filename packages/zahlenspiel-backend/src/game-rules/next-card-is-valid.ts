export type NextCardValidator = (currentValue: number, nextValue: number) => boolean;

export const ascendingCardIsValid = (currentValue: number, nextValue: number) => {
    return (nextValue > currentValue) || (currentValue - nextValue === 10);
};

export const descendingCardIsValid = (currentValue: number, nextValue: number) => {
    return (nextValue < currentValue) || (nextValue - currentValue === 10);
};