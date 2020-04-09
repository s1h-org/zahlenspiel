import {ActionType, BaseAction, createTypeGuard} from "./game-actions";

export const isFinishTurnAction = createTypeGuard("finish-turn");

export class FinishTurnAction extends BaseAction {
    type: ActionType = "finish-turn";
}
