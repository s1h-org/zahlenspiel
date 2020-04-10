import {RoomAvailable} from "colyseus.js";
import React, {useEffect, useState} from 'react';
import {AppContainer, Center, Left, Right, Top} from "./components/Layout";
import {RoomView} from "./components/RoomView";
import {RoomListView} from "./components/RoomListView";
import {RoomFilterView} from "./components/RoomFilterView";
import {ActionButton} from "./components/Buttons";
import {ConnectionHandler} from "./connection-handler";

export interface LobbyProps {
    connectionHandler: ConnectionHandler;
}

const Lobby = (props: LobbyProps) => {

    const client = props.connectionHandler;

    const [availableRooms, setAvailableRooms] = useState<RoomAvailable<any>[]>();
    const [roomFilter, setRoomFilter] = useState<string>("");

    useEffect(() => {
        client.getAvailableRooms()
            .then(
                (rooms: RoomAvailable<any>[]) => setAvailableRooms(rooms)
            );
    }, [client]);

    const renderAvailableRooms = () => {
        const filteredRooms = availableRooms?.filter(room => {
            return roomFilter?.length ? room.roomId.startsWith(roomFilter) : true;
        })
        if (filteredRooms && filteredRooms.length) {
            return filteredRooms.map(room => <RoomView key={room.roomId}
                                                       onClick={() => client.join(room.roomId)} room={room}/>);
        }
        return <h5>No games</h5>;
    };

    const debounceUpdateRoomFilter = (event: React.FormEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        setTimeout(() => setRoomFilter(currentValue), 200);
    };

    return (
        <AppContainer>
            <Top><h3>Zahlenspiel Lobby</h3></Top>
            <Center>
                <Left>
                    <ActionButton onClick={() => {
                        client.create();
                    }}>Start new game</ActionButton>
                </Left>
                <Right>
                    <RoomListView>
                        <RoomFilterView onChange={debounceUpdateRoomFilter}/>
                        {renderAvailableRooms()}
                    </RoomListView>
                </Right>
            </Center>
        </AppContainer>
    );
};

export default Lobby;
