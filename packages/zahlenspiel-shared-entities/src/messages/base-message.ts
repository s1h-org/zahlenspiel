export type NewCard = "new-card";
export type MoveCard = "move-card";
export type DropCard = "drop-card";
export type StartGame = "start-game";
export type GameStarted = "game-started";
export type GameWon = "game-won";
export type GameLost = "game-lost";
export type JoinSuccess = "join-success";
export type JoinError = "join-error";
export type PlayerJoin = "player-join";
export type PlayerLeave = "player-leave";
export type PlayerSwitch = "player-switch";
export type VoteFirstTurn = "vote-first-turn";
export type TurnValid = "turn-valid";
export type TurnInvalid = "turn-invalid";
export type TurnFinishable = "turn-finishable";
export type FinishTurn = "finish-turn";
export type NewCardStack = "new-card-stack";
export type UpdateCardStacks = "update-card-stacks";
export type SetupFinished = "setup-finished";
export type MessageType = NewCard |
    MoveCard |
    DropCard |
    StartGame |
    GameStarted |
    GameWon |
    GameLost |
    JoinSuccess |
    JoinError |
    PlayerJoin |
    PlayerLeave |
    PlayerSwitch |
    VoteFirstTurn |
    TurnValid |
    TurnInvalid |
    TurnFinishable |
    FinishTurn |
    NewCardStack |
    UpdateCardStacks |
    SetupFinished;

export abstract class BaseMessage {
    abstract type: MessageType;
}