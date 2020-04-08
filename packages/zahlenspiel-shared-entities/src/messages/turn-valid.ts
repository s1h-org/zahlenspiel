import {BaseMessage, MessageType} from "./base-message";
import {Card} from "../entities";
import {createTypeGuard} from "./create-typeguard";

export const isTurnValidMessage = createTypeGuard("turn-valid");

export class TurnValidMessage extends BaseMessage {
    type: MessageType = "turn-valid";

    constructor(public readonly cards: Card[]) {
        super();
    }
}