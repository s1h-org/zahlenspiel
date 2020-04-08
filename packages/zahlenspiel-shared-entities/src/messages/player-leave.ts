import {BaseMessage, MessageType} from "./base-message";
import {Player} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isPlayerLeaveMessage = createTypeGuard("player-leave");

export class PlayerLeaveMessage extends BaseMessage {
    type: MessageType = "player-leave";

    constructor(public readonly currentPlayers: Player[]) {
        super();
    }
}