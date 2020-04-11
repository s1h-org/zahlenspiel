import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isStartGameMessage = createTypeGuard<StartGameMessage>("start-game");

export class StartGameMessage extends BaseMessage {
    type: MessageType = "start-game";

    constructor() {
        super();
    }
}