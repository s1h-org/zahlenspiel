import {BaseMessage, MessageType} from "./base-message";

export const createTypeGuard = <T>(identifier: MessageType) => {
    return (possibleTarget: any) => ("type" in possibleTarget && (possibleTarget as BaseMessage).type === identifier);
};