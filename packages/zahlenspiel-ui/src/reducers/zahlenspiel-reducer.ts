import {
    GameStates,
    isGameLostMessage,
    isGameStartedMessage,
    isGameWonMessage,
    isJoinErrorMessage,
    isJoinSuccessMessage,
    isNewCardMessage,
    isPlayerJoinMessage,
    isPlayerLeaveMessage,
    isPlayerSwitchMessage,
    isSetupFinishedMessage,
    isTurnFinishableMessage,
    isTurnInvalidMessage,
    isTurnValidMessage,
    isUpdateCardStacksMessage
} from "zahlenspiel-shared-entities";
import {UIState} from "../state/ui-state";
import {isFinishTurnAction} from "../actions/finish-turn";
import {isSelectCardStackAction} from "../actions/select-cardstack";

export const zahlenspielReducer = (state: UIState, action: any): UIState => {
    if (isJoinSuccessMessage(action)) {
        return {
            ...state,
            self: action.self
        }
    } else if (isJoinErrorMessage(action)) {
        throw new Error(action.reason);
    } else if (isPlayerJoinMessage(action)) {
        return {
            ...state,
            players: action.currentPlayers
        }
    } else if (isPlayerLeaveMessage(action)) {
        return {
            ...state,
            players: action.currentPlayers
        }
    } else if (isPlayerSwitchMessage(action)) {
        return {
            ...state,
            currentPlayer: action.currentPlayer
        }
    } else if (isNewCardMessage(action)) {
        return {
            ...state,
            cardDeck: action.cards
        }
    } else if (isTurnValidMessage(action)) {
        return {
            ...state,
            cardDeck: action.cards
        }
    } else if (isTurnInvalidMessage(action)) {
    } else if (isTurnFinishableMessage(action)) {
        return {
            ...state,
            couldFinish: true
        }
    } else if (isUpdateCardStacksMessage(action)) {
        let updatedStackId;
        const currentCardStacks = state.cardStacks ?? [];
        for (let idx = 0; idx < currentCardStacks.length; ++idx) {
            for (let odx = 0; odx < action.cardStacks.length; ++odx) {
                const current = currentCardStacks[idx];
                const updated = action.cardStacks[odx];
                if (updated.id === current.id && updated.values.length > current.values.length) {
                    updatedStackId = updated.id;
                    break;
                }
            }
            if (updatedStackId) {
                break;
            }
        }
        return {
            ...state,
            cardStacks: action.cardStacks,
            updatedCardStackId: updatedStackId,
            remainingCardsInDeck: action.remainingCardsInDeck
        }
    } else if (isSetupFinishedMessage(action)) {
        return {
            ...state,
            currentState: GameStates.PREGAME
        }
    } else if (isGameStartedMessage(action)) {
        return {
            ...state,
            currentState: GameStates.GAME
        }
    } else if (isGameWonMessage(action)) {
        return {
            ...state,
            currentState: GameStates.WON
        }
    } else if (isGameLostMessage(action)) {
        return {
            ...state,
            totalRemainingCards: action.remainingCards,
            causeOfLoss: action.reason,
            currentState: GameStates.LOST
        }
    } else if (isFinishTurnAction(action)) {
        return {
            ...state,
            couldFinish: false,
            selectedCardStack: undefined
        }
    } else if (isSelectCardStackAction(action)) {
        return {
            ...state,
            selectedCardStack: action.cardStack
        }
    }
    return state;
}