import {BaseMessage, MessageType} from "./base-message";
import {Card} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isDropCardMessage = createTypeGuard("drop-card");

export class DropCardMessage extends BaseMessage {
    type: MessageType = "drop-card";

    constructor(public card: Card, public stackId: string) {
        super();
    }
}