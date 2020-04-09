import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isTurnFinishableMessage = createTypeGuard("turn-finishable");

export class TurnFinishableMessage extends BaseMessage {
    type: MessageType = "turn-finishable";

    constructor() {
        super();
    }
}