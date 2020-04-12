export type FinishTurn = "finish-turn";
export type SelectCardStack = "select-cardstack";
export type ActionType = FinishTurn |
    SelectCardStack;

export abstract class BaseAction {
    abstract type: ActionType;
}

export const createTypeGuard = <T>(identifier: ActionType) => {
    return (possibleTarget: any): possibleTarget is T => ("type" in possibleTarget && (possibleTarget as BaseAction).type === identifier);
};
