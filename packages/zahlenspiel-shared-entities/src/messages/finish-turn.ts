import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isFinishTurnMessage = createTypeGuard<FinishTurnMessage>("finish-turn");

export class FinishTurnMessage extends BaseMessage {
    type: MessageType = "finish-turn";

    constructor(public readonly order: number) {
        super();
    }
}