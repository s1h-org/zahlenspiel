import {initialState} from "../state/ui-state";
import {
    JoinErrorMessage,
    JoinSuccessMessage,
    Player,
    PlayerJoinMessage,
    PlayerLeaveMessage
} from "zahlenspiel-shared-entities";
import {zahlenspielReducer} from "./zahlenspiel-reducer";

describe("zahlenspiel-reducer", () => {
    it("should update self on joinSuccess", () => {
        // GIVEN
        const player = new Player(0, "testPlayer");
        const incomingMessage = new JoinSuccessMessage(player)

        // WHEN
        const updatedState = zahlenspielReducer(initialState, incomingMessage);

        // THEN
        expect(updatedState.self).toEqual(player);
    });

    it("should throw on joinError", () => {
        // GIVEN
        const incomingMessage = new JoinErrorMessage("test error");

        // WHEN

        // THEN
        expect(zahlenspielReducer(initialState, incomingMessage)).toThrowError("test error");
    });

    it("should update player list on player leave", () => {
        // GIVEN
        const playerOne = new Player(0, "first");
        const playerTwo = new Player(1, "second");

        // WHEN
        const updateState = zahlenspielReducer(initialState, new PlayerLeaveMessage([playerOne, playerTwo]));

        // THEN
        expect(updateState.players.length).toBe(2);
        expect(updateState.players).toEqual(expect.arrayContaining([playerOne, playerTwo]));
    });

    it("should update player list on player join", () => {
        // GIVEN
        const playerOne = new Player(0, "first");
        const playerTwo = new Player(1, "second");

        // WHEN
        const updateState = zahlenspielReducer(initialState, new PlayerJoinMessage([playerOne, playerTwo]));

        // THEN
        expect(updateState.players.length).toBe(2);
        expect(updateState.players).toEqual(expect.arrayContaining([playerOne, playerTwo]));
    });
});
