import {BaseMessage, MessageType} from "./base-message";
import {Player} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isJoinSuccessMessage = createTypeGuard("join-success");

export class JoinSuccessMessage extends BaseMessage {
    type: MessageType = "join-success";

    constructor(public readonly self: Player) {
        super();
    }
}