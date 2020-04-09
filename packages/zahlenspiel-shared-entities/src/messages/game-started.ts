import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isGameStartedMessage = createTypeGuard("game-started");

export class GameStartedMessage extends BaseMessage {
    type: MessageType = "game-started";

    constructor() {
        super();
    }
}