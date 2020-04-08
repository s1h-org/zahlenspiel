import {BaseMessage, MessageType} from "./base-message";
import {Player} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isPlayerSwitchMessage = createTypeGuard("player-switch");

export class PlayerSwitchMessage extends BaseMessage {
    type: MessageType = "player-switch";

    constructor(public readonly currentPlayer: Player) {
        super();
    }
}