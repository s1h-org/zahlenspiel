import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isTurnInvalidMessage = createTypeGuard("turn-invalid");

export class TurnInvalidMessage extends BaseMessage {
    type: MessageType = "turn-invalid";

    constructor(public readonly reason: string) {
        super();
    }
}