import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isVoteFirstTurnMessage = createTypeGuard("vote-first-turn");

export class VoteFirstTurnMessage extends BaseMessage {
    type: MessageType = "vote-first-turn";

    constructor(public readonly order: number) {
        super();
    }
}