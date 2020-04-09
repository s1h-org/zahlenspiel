import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isGameWonMessage = createTypeGuard("game-won");

export class GameWonMessage extends BaseMessage {
    type: MessageType = "game-won";

    constructor() {
        super();
    }
}