import {BaseMessage, MessageType} from "./base-message";
import {Card} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isMoveCardMessage = createTypeGuard("move-card");

export class MoveCardMessage extends BaseMessage {
    type : MessageType = "move-card";

    constructor(public card: Card, public x: number, public y: number) {
        super();
    }
}