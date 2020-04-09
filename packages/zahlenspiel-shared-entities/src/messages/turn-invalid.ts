import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isTurnInvalidMessage = createTypeGuard("turn-invalid");

export class TurnInvalidMessage extends BaseMessage {
    type: MessageType = "turn-invalid";

    constructor(public readonly reason: string) {
        super();
    }
}