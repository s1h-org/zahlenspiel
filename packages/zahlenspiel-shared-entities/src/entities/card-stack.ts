import {BaseEntity, EntityType} from "./base-entity";

export const isCardStack = (possibleCardStack: any): possibleCardStack is CardStack => {
    return "type" in possibleCardStack && (possibleCardStack as BaseEntity).type === "card-stack";
};

export type Direction = "ascending" | "descending";

export class CardStack extends BaseEntity {
    type: EntityType = "card-stack";

    constructor(public id: string, public direction: Direction, public values: number[]) {
        super();
    }
}
