import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isTurnFinishableMessage = createTypeGuard("turn-finishable");

export class TurnFinishableMessage extends BaseMessage {
    type: MessageType = "turn-finishable";

    constructor() {
        super();
    }
}