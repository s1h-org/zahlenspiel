import {BaseMessage, createTypeGuard, MessageType} from "./base-message";

export const isSetupFinishedMessage = createTypeGuard("setup-finished");

export class SetupFinishedMessage extends BaseMessage {
    type: MessageType = "setup-finished";

    constructor() {
        super();
    }
}