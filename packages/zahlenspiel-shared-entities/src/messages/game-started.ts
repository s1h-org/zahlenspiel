import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isGameStartedMessage = createTypeGuard("game-started");

export class GameStartedMessage extends BaseMessage {
    type: MessageType = "game-started";

    constructor() {
        super();
    }
}