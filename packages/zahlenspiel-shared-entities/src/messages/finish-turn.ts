import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isFinishTurnMessage = createTypeGuard("finish-turn");

export class FinishTurnMessage extends BaseMessage {
    type: MessageType = "finish-turn";

    constructor(public readonly order: number) {
        super();
    }
}