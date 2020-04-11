import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Player} from "../entities";

export const isPlayerSwitchMessage = createTypeGuard<PlayerSwitchMessage>("player-switch");

export class PlayerSwitchMessage extends BaseMessage {
    type: MessageType = "player-switch";

    constructor(public readonly currentPlayer: Player) {
        super();
    }
}