import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {CardStack} from "../entities";

export const isNewCardStackMessage = createTypeGuard("new-card-stack");

export class NewCardStackMessage extends BaseMessage {
    type : MessageType = "new-card-stack";

    constructor(public stack: CardStack) {
        super();
    }
}