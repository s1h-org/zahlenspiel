import {Client} from "colyseus";
import {mockPartial} from "sneer";
import {GameState} from "./game-state";
import {Card} from "zahlenspiel-shared-entities";

describe("GameState", () => {
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