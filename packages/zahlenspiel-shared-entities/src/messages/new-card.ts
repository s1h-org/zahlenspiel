import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Card} from "../entities";

export const isNewCardMessage = createTypeGuard<NewCardMessage>("new-card");

export class NewCardMessage extends BaseMessage {
    type : MessageType = "new-card";

    constructor(public cards: Card[]) {
        super();
    }
}