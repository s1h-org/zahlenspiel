import {Client} from "colyseus";
import {mockPartial} from "sneer";
import {GameState} from "./game-state";
import {Card, Direction, GameStates} from "zahlenspiel-shared-entities";

describe("GameState", () => {
    describe("constructor", () => {
        it.each<[number, Direction]>([
            [2, "ascending"],
            [2, "descending"]
        ])("should initialize state with %d %s card stacks", (numberOfStacks: number, direction: Direction) => {
            // GIVEN
            const gameState = new GameState("pw");

            // WHEN
            let stackCount = 0;
            for (let idx in gameState.cardStacks) {
                if (gameState.cardStacks[idx].direction === direction) {
                    ++stackCount;
                }
            }

            // THEN
            expect(stackCount).toEqual(numberOfStacks);
        });

        it("should initialize a card deck with 98 cards", () => {
            // GIVEN
            const gameState = new GameState("pw");

            // WHEN
            const deckSize = gameState.currentDeck.length;

            // THEN
            expect(deckSize).toEqual(98);
        });

        it("should be in initial state 'WAITING'", () => {
            // GIVEN
            const gameState = new GameState("pw");

            // WHEN
            const initialState = gameState.currentGameState;

            // THEN
            expect(initialState).toEqual(GameStates.WAITING);
        });

        it("should store passed password", () => {
            // GIVEN
            const gamePassword = "testPassword123";
            const gameState = new GameState(gamePassword);

            // WHEN
            const storedPassword = gameState.password;

            // THEN
            expect(storedPassword).toEqual(gamePassword);
        });
    });

    describe("addNewPlayer", () => {
        it("should add a new player with given name and assign it an order number", () => {
            // GIVEN
            const clientMock = mockPartial<Client>({});
            const gameState = new GameState("pw");
            const playerName = "firstPlayer";

            // WHEN
            gameState.addNewPlayer(clientMock, playerName);

            // THEN
            expect(gameState.players[0].order).toBe(0);
            expect(gameState.players[0].name).toBe(playerName);
            expect(gameState.players[0].client).toEqual(clientMock);
        });
    });

    describe("removePlayer", () => {
        it("should remove a player via its id", () => {
            // GIVEN
            const clientId = "testClient";
            const clientMock = mockPartial<Client>({
                id: clientId
            });
            const gameState = new GameState("pw");
            gameState.addNewPlayer(clientMock, "player");

            // WHEN
            gameState.removePlayer(clientId);

            // THEN
            expect(gameState.players.length).toBe(0);
        });
    });

    describe("increaseDroppedCardAmount", () => {
        it("should default increase value by one", () => {
            // GIVEN
            const gameState = new GameState("pw");
            gameState.validDroppedCards = 0;

            // WHEN
            gameState.increaseDroppedCardsAmount();

            // THEN
            expect(gameState.validDroppedCards).toBe(1);
        });

        it("should increase by configurable amount", () => {
            // GIVEN
            const gameState = new GameState("pw");
            gameState.validDroppedCards = 0;

            // WHEN
            gameState.increaseDroppedCardsAmount(10);

            // THEN
            expect(gameState.validDroppedCards).toBe(10);
        });
    });

    describe("resetDroppedCardAmount", () => {
        it("should reset value to zero", () => {
            // GIVEN
            const gameState = new GameState("pw");
            gameState.validDroppedCards = 100;

            // WHEN
            gameState.resetDroppedCardsAmount();

            // THEN
            expect(gameState.validDroppedCards).toBe(0);
        });
    });

    describe("remainingCardsOnStack", () => {
        it("should return amount of cards in deck", () => {
            // GIVEN
            const gameState = new GameState("pw");

            // WHEN
            const remainingCards = gameState.remainingCardsOnStack();

            // THEN
            expect(remainingCards).toBe(98);
        });
    });

    describe("totalRemainingCards", () => {
        it("should return total amount of cards in game (deck + players)", () => {
            // GIVEN
            const clientMock = mockPartial<Client>({});
            const gameState = new GameState("pw");
            ["first", "second", "third"].forEach(playerName => gameState.addNewPlayer(clientMock, playerName));
            const testCard = new Card(42);
            gameState.players[0].cards.push(testCard);
            gameState.players[1].cards.push(testCard);
            gameState.players[1].cards.push(testCard);
            gameState.players[2].cards.push(testCard);

            // WHEN
            const remainingCards = gameState.totalRemainingCards();

            // THEN
            expect(remainingCards).toBe(102);
        });
    });

    describe("nextPlayer", () => {
        it("should skip players with no leftover cards", () => {
            // GIVEN
            const clientMock = mockPartial<Client>({});
            const gameState = new GameState("pw");
            ["first", "second", "third"].forEach(playerName => gameState.addNewPlayer(clientMock, playerName));
            const testCard = new Card(42);
            gameState.players[0].cards.push(testCard);
            gameState.players[2].cards.push(testCard);
            gameState.setCurrentPlayer(gameState.players[0]);

            // WHEN
            gameState.nextPlayer();

            // THEN
            expect(gameState.currentPlayer).toEqual(gameState.players[2]);
        });
    });
});