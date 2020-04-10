import {Card, CardStack, GameStates, Player} from "zahlenspiel-shared-entities";

export interface UIState {
    self?: Player;
    currentState: GameStates;
    couldFinish: boolean;
    players: Player[];
    currentPlayer?: Player;
    cardStacks?: CardStack[];
    selectedCardStack?: CardStack;
    cardDeck: Card[];
    totalRemainingCards?: number;
    causeOfLoss?: string;
    remainingCardsInDeck?: number;
}
export const initialState: UIState = {
    currentState: GameStates.WAITING,
    couldFinish: false,
    players: [],
    cardDeck: [],
}
