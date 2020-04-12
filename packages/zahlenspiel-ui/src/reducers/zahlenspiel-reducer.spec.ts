import {initialState} from "../state/ui-state";
import {
    Card,
    JoinErrorMessage,
    JoinSuccessMessage,
    NewCardMessage,
    Player,
    PlayerJoinMessage,
    PlayerLeaveMessage,
    PlayerSwitchMessage,
    TurnFinishableMessage
} from "zahlenspiel-shared-entities";
import {zahlenspielReducer} from "./zahlenspiel-reducer";

describe("zahlenspiel-reducer", () => {
    it("should update self on joinSuccess", () => {
        // GIVEN
        const player = new Player(0, "testPlayer");
        const incomingMessage = new JoinSuccessMessage(player)
        initialState.self = undefined;

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
        const newPlayers = [playerOne, playerTwo];
        initialState.players = [];

        // WHEN
        const updateState = zahlenspielReducer(initialState, new PlayerLeaveMessage(newPlayers));

        // THEN
        expect(updateState.players.length).toBe(newPlayers.length);
        expect(updateState.players).toEqual(expect.arrayContaining(newPlayers));
    });

    it("should update player list on player join", () => {
        // GIVEN
        const playerOne = new Player(0, "first");
        const playerTwo = new Player(1, "second");
        const newPlayers = [playerOne, playerTwo];
        initialState.players = [];

        // WHEN
        const updateState = zahlenspielReducer(initialState, new PlayerJoinMessage(newPlayers));

        // THEN
        expect(updateState.players.length).toBe(newPlayers.length);
        expect(updateState.players).toEqual(expect.arrayContaining(newPlayers));
    });

    it("should update current player on player switch", () => {
        // GIVEN
        const currentPlayer = new Player(0, "current");
        const nextPlayer = new Player(1, "next");
        initialState.currentPlayer = currentPlayer;

        // WHEN
        const updateState = zahlenspielReducer(initialState, new PlayerSwitchMessage(nextPlayer));

        // THEN
        expect(updateState.currentPlayer).toEqual(nextPlayer);
    });

    it("should update list of cards on newCard message", () => {
        // GIVEN
        const currentCards: Card[] = [];
        const cardTen = new Card(10);
        const cardTwelve = new Card(12);
        const newCards = [cardTen, cardTwelve];
        initialState.cardDeck = currentCards;

        // WHEN
        const updateState = zahlenspielReducer(initialState, new NewCardMessage(newCards));

        // THEN
        expect(updateState.cardDeck.length).toBe(2);
        expect(updateState.cardDeck).toEqual(expect.arrayContaining(newCards));
    });

    it("should update list of cards on valid turn", () => {
        // GIVEN
        const cardTen = new Card(10);
        const cardTwelve = new Card(12);
        const currentCards = [cardTen, cardTwelve];
        const newCards = [cardTen];
        initialState.cardDeck = currentCards;

        // WHEN
        const updateState = zahlenspielReducer(initialState, new NewCardMessage(newCards));

        // THEN
        expect(updateState.cardDeck.length).toBe(1);
        expect(updateState.cardDeck).toEqual(expect.arrayContaining(newCards));
    });

    it("should mark turn as finishable on isFinishable message", () => {
        // GIVEN
        initialState.couldFinish = false;

        // WHEN
        const updateState = zahlenspielReducer(initialState, new TurnFinishableMessage());

        // THEN
        expect(updateState.couldFinish).toBeTruthy();
    });
});
