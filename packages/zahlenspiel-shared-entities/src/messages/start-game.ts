import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isStartGameMessage = createTypeGuard("start-game");

export class StartGameMessage extends BaseMessage {
    type: MessageType = "start-game";

    constructor() {
        super();
    }
}