import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Player} from "../entities";

export const isPlayerLeaveMessage = createTypeGuard("player-leave");

export class PlayerLeaveMessage extends BaseMessage {
    type: MessageType = "player-leave";

    constructor(public readonly currentPlayers: Player[]) {
        super();
    }
}