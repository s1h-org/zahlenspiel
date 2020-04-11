import {ArraySchema, Schema, type} from "@colyseus/schema";
import {ascendingCardIsValid, descendingCardIsValid, NextCardValidator} from "../game-rules";
import {Card, Direction} from "zahlenspiel-shared-entities";
import {v4} from "uuid";

export class CardStack extends Schema {
    @type(["number"])
    values = new ArraySchema<number>();
    @type("string")
    id: string = v4();

    comparator: NextCardValidator;

    constructor(readonly direction: Direction) {
        super();
        this.direction = direction;
        if (this.direction === "ascending") {
            this.values.push(1);
            this.comparator = ascendingCardIsValid;
        } else {
            this.values.push(100);
            this.comparator = descendingCardIsValid;
        }
    }

    addCard(next: Card) {
        const currentValue = this.values[this.values.length - 1];
        const nextValue = next.value;
        if (this.comparator(currentValue, nextValue)) {
            this.values.push(nextValue);
        } else {
            throw Error(`Invalid move! Current: ${currentValue}, next: ${nextValue}`);
        }
    }
}
