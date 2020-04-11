import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {Card} from "../entities";

export const isTurnValidMessage = createTypeGuard<TurnValidMessage>("turn-valid");

export class TurnValidMessage extends BaseMessage {
    type: MessageType = "turn-valid";

    constructor(public readonly cards: Card[]) {
        super();
    }
}