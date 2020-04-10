import {Client, Room} from "colyseus.js";
import {getPlayerName, getRoompassword, setRoompassword} from "./game-data-handler";

export class ConnectionHandler {
    public onJoin?: (room: Room) => void;
    public onCreate?: (room: Room) => void;
    public onReconnect?: (room: Room) => void;
    public onError?: (error: any) => void;

    constructor(private readonly client: Client) {
    }

    getAvailableRooms = () => {
        return this.client.getAvailableRooms("zahlenspiel");
    };

    create = () => {
        const playerName = getPlayerName();
        const password = setRoompassword();
        const room = this.client.create('zahlenspiel', {playerName, password});
        room.then(r => {
            if (this.onCreate) {
                this.onCreate(r);
            }
        }).catch(error => {
            if (this.onError) {
                this.onError(error);
            }
        });
    };
    join = (roomId: string) => {
        const playerName = getPlayerName();
        const password = getRoompassword();
        const room = this.client.joinById(roomId, {playerName, password});
        room.then(r => {
            if (this.onJoin) {
                this.onJoin(r);
            }
        }).catch(error => {
            if (this.onError) {
                this.onError(error);
            }
        });
    };
    reconnect = (roomId: string, sessionId: string) => {
        const room = this.client.reconnect(roomId, sessionId);
        room.then(r => {
            if (this.onReconnect) {
                this.onReconnect(r);
            }
        }).catch(error => {
            if (this.onError) {
                this.onError(error);
            }
        });
    };
}
