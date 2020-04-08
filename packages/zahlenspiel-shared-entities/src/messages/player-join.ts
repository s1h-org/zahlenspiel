import {BaseMessage, MessageType} from "./base-message";
import {Player} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isPlayerJoinMessage = createTypeGuard("player-join");

export class PlayerJoinMessage extends BaseMessage {
    type: MessageType = "player-join";

    constructor(public readonly currentPlayers: Player[]) {
        super();
    }
}