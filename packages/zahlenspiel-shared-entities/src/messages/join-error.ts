import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isJoinErrorMessage = createTypeGuard("join-error");

export class JoinErrorMessage extends BaseMessage {
    type: MessageType = "join-error";

    constructor(public readonly reason: string) {
        super();
    }
}