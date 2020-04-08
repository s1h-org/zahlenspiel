import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isGameLostMessage = createTypeGuard("game-lost");

export class GameLostMessage extends BaseMessage {
    type: MessageType = "game-lost";

    constructor(public remainingCards: number) {
        super();
    }
}