import {BaseMessage, MessageType} from "./base-message";
import {Card} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isNewCardMessage = createTypeGuard("new-card");

export class NewCardMessage extends BaseMessage {
    type : MessageType = "new-card";

    constructor(public cards: Card[]) {
        super();
    }
}