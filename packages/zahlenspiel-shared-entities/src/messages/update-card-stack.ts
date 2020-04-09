import {BaseMessage, createTypeGuard, MessageType} from "./base-message";
import {CardStack} from "../entities";

export const isUpdateCardStacksMessage = createTypeGuard("update-card-stacks");

export class UpdateCardStackMessage extends BaseMessage {
    type : MessageType = "update-card-stacks";

    constructor(public cardStacks: CardStack[], public remainingCardsInDeck: number) {
        super();
    }
}