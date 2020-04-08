import {ArraySchema, MapSchema} from "@colyseus/schema";
import {CardStack} from "./card-stack";
import {CardStack as CardStackDTO} from "zahlenspiel-shared-entities";
import {Player as PlayerDTO} from "zahlenspiel-shared-entities";
import {Player} from "./player";

export const toPlayerDTO = (player: Player): PlayerDTO => {
    return new PlayerDTO(player.order, player.name);
};

export const toCardStackDTO = (stack: CardStack): CardStackDTO => {
    return new CardStackDTO(stack.id, stack.direction, stack.values);
};

export const marshallCardStacks = (cardStacks: MapSchema<CardStack>) => {
    const updateCardStacks: CardStackDTO[] = [];
    for (let idx in cardStacks) {
        updateCardStacks.push(toCardStackDTO(cardStacks[idx]));
    }
    return updateCardStacks;
};

export const marshallPlayers = (players: ArraySchema<Player>) => {
    return players.map((player: Player) => toPlayerDTO(player));
};
