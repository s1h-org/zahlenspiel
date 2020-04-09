import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isJoinErrorMessage = createTypeGuard("join-error");

export class JoinErrorMessage extends BaseMessage {
    type: MessageType = "join-error";

    constructor(public readonly reason: string) {
        super();
    }
}