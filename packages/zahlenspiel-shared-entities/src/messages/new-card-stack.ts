import {BaseMessage, MessageType} from "./base-message";
import {CardStack} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isNewCardStackMessage = createTypeGuard("new-card-stack");

export class NewCardStackMessage extends BaseMessage {
    type : MessageType = "new-card-stack";

    constructor(public stack: CardStack) {
        super();
    }
}