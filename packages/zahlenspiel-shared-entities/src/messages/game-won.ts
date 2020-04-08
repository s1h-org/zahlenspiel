import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isGameWonMessage = createTypeGuard("game-won");

export class GameWonMessage extends BaseMessage {
    type: MessageType = "game-won";

    constructor() {
        super();
    }
}