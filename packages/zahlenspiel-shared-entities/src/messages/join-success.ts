import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Player} from "../entities";

export const isJoinSuccessMessage = createTypeGuard("join-success");

export class JoinSuccessMessage extends BaseMessage {
    type: MessageType = "join-success";

    constructor(public readonly self: Player) {
        super();
    }
}