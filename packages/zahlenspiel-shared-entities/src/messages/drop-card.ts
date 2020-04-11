import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Card} from "../entities";

export const isDropCardMessage = createTypeGuard<DropCardMessage>("drop-card");

export class DropCardMessage extends BaseMessage {
    type: MessageType = "drop-card";

    constructor(public card: Card, public stackId: string) {
        super();
    }
}