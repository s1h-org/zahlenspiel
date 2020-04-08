import {BaseMessage, MessageType} from "./base-message";
import {createTypeGuard} from "./create-typeguard";

export const isSetupFinishedMessage = createTypeGuard("setup-finished");

export class SetupFinishedMessage extends BaseMessage {
    type: MessageType = "setup-finished";

    constructor() {
        super();
    }
}