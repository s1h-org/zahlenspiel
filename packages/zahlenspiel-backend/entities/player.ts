import {Schema, type} from "@colyseus/schema";
import {Client} from "colyseus";
import {Card} from "zahlenspiel-shared-entities";

export class Player extends Schema {
    @type("string")
    id: string;

    order: number;
    name: string = "Guy Incognito";

    client: Client;
    cards: Card[];

    constructor(order: number, name: string, client: Client) {
        super();
        this.order = order;
        this.id = client.id;
        this.name = name;
        this.client = client;
        this.cards = [];
    }
}

