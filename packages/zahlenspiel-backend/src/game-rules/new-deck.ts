export const newDeck = (from: number, to: number) => {
    let deck = [];
    for (let idx = from; idx <= to; ++idx) {
        deck.push(idx);
    }

    const shuffle = (array: number[]): number[] => {
        let tmp, current, top = array.length;
        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }
        return array;
    };

    return shuffle(deck);
};
