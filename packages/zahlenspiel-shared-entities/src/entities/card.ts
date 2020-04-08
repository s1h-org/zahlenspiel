import {BaseEntity, EntityType} from "./base-entity";

export const isCard = (possibleCard: any): possibleCard is Card => {
    return "type" in possibleCard && (possibleCard as BaseEntity).type === "card";
};

export class Card extends BaseEntity {
    type: EntityType = "card";

    constructor(public value: number) {
        super();
    }
}