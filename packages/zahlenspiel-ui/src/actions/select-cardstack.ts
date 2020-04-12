import {ActionType, BaseAction, createTypeGuard} from "./game-actions";
import {CardStack} from "zahlenspiel-shared-entities";

export const isSelectCardStackAction = createTypeGuard<SelectCardStackAction>("select-cardstack");

export class SelectCardStackAction extends BaseAction {
    type: ActionType = "select-cardstack";

    constructor(public readonly cardStack: CardStack) {
        super();
    }
}
