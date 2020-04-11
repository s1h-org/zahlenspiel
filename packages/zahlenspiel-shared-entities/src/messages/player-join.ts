import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Player} from "../entities";

export const isPlayerJoinMessage = createTypeGuard<PlayerJoinMessage>("player-join");

export class PlayerJoinMessage extends BaseMessage {
    type: MessageType = "player-join";

    constructor(public readonly currentPlayers: Player[]) {
        super();
    }
}