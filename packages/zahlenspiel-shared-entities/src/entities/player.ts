import {BaseEntity, EntityType} from "./base-entity";

export const isPlayer = (possiblePlayer : any): possiblePlayer is Player => {
    return "type" in possiblePlayer && (possiblePlayer as BaseEntity).type === "player";
};

export class Player extends BaseEntity {
    type: EntityType = "player";

    constructor(public order: number, public name: string) {
        super();
    }
}
