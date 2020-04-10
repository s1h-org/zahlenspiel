import {Client, Room} from "colyseus.js";
import {getPlayerName, getRoompassword, setRoompassword} from "./game-data-handler";
import {get, set, Store} from "idb-keyval";

export class ConnectionHandler {
    public onJoin?: (room: Room) => void;
    public onCreate?: (room: Room) => void;
    public onReconnect?: (room: Room) => void;
    public onError?: (error: any) => void;

    constructor(private readonly client: Client, private readonly store: Store) {
    }

    getAvailableRooms = () => {
        return this.client.getAvailableRooms("zahlenspiel");
    };

    create = () => {
        const playerName = getPlayerName();
        const password = setRoompassword();
        const room = this.client.create('zahlenspiel', {playerName, password});
        room.then(r => {
            set(r.id, r.sessionId, this.store).then(() => {
                if (this.onCreate) {
                    this.onCreate(r);
                }
            });
        }).catch(error => {
            if (this.onError) {
                this.onError(error);
            }
        });
    };
    join = (roomId: string) => {
        get<string>(roomId, this.store).then(sessionId => {
            if (sessionId) {
                this.reconnect(roomId, sessionId);
            } else {
                const playerName = getPlayerName();
                const password = getRoompassword();
                const room = this.client.joinById(roomId, {playerName, password});
                room.then(r => {
                    set(roomId, r.sessionId, this.store).then(() => {
                        if (this.onJoin) {
                            this.onJoin(r);
                        }
                    });
                }).catch(error => {
                    if (this.onError) {
                        this.onError(error);
                    }
                });
            }
        })
    };
    private reconnect = (roomId: string, sessionId: string) => {
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
