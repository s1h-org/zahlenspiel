import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isGameLostMessage = createTypeGuard("game-lost");

export class GameLostMessage extends BaseMessage {
    type: MessageType = "game-lost";

    constructor(public remainingCards: number) {
        super();
    }
}