import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isStartGameMessage = createTypeGuard("start-game");

export class StartGameMessage extends BaseMessage {
    type: MessageType = "start-game";

    constructor() {
        super();
    }
}