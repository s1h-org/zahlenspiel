import {initialState} from "../state/ui-state";
import {
    Card,
    CardStack,
    GameLostMessage,
    GameStartedMessage,
    GameStates,
    GameWonMessage,
    JoinErrorMessage,
    JoinSuccessMessage,
    NewCardMessage,
    Player,
    PlayerJoinMessage,
    PlayerLeaveMessage,
    PlayerSwitchMessage,
    SetupFinishedMessage,
    StartGameMessage,
    TurnFinishableMessage,
    UpdateCardStackMessage
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
        expect(() => zahlenspielReducer(initialState, incomingMessage)).toThrowError("test error");
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

    it("should determine which cardstack to update and update remaining cards on updateCardStack message", () => {
        // GIVEN
        const firstStack = new CardStack("first", "ascending", []);
        const secondStack = new CardStack("second", "ascending", []);
        const thirdStack = new CardStack("third", "descending", []);
        const fourthStack = new CardStack("fourth", "descending", []);
        const updatedStack = new CardStack("fourth", "descending", [10]);
        const updatedCardStacks = [firstStack, secondStack, thirdStack, updatedStack];
        const remainingCards = 15;
        initialState.cardStacks = [firstStack, secondStack, thirdStack, fourthStack];

        // WHEN
        const updateState = zahlenspielReducer(initialState,
            new UpdateCardStackMessage(updatedCardStacks, remainingCards)
        );

        // THEN
        expect(updateState.cardStacks).toEqual(expect.arrayContaining(updatedCardStacks));
        expect(updateState.updatedCardStackId).toBe(updatedStack.id);
        expect(updateState.remainingCardsInDeck).toBe(remainingCards);
    });

    it.each<[GameStates, SetupFinishedMessage | StartGameMessage | GameWonMessage | GameLostMessage]>([
        [GameStates.PREGAME, new SetupFinishedMessage()],
        [GameStates.GAME, new GameStartedMessage()],
        [GameStates.WON, new GameWonMessage()],
        [GameStates.LOST, new GameLostMessage(10, "test reason")],
    ])("should switch to gamestate %s on %s", (newState: GameStates, message: SetupFinishedMessage | GameStartedMessage | GameWonMessage | GameLostMessage) => {
        // GIVEN
        initialState.currentState = GameStates.WAITING

        // WHEN
        const updatedState = zahlenspielReducer(initialState, message);

        // THEN
        expect(updatedState.currentState).toBe(newState);
    });
});
