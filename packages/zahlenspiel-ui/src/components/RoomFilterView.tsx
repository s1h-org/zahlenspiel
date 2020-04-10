import styled from "styled-components";
import React, {HTMLProps} from "react";

const RoomFilterContainer = styled.div`
    cursor: default;
    background: #282c34;
    border: white 2px solid;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const RoomFilter = styled.input`
    width: 90%;
    background: #282c34;
    border: white 2px solid;
    padding: 0.5rem;
    color: white;
    font-size: 1rem;
    font-weight: bold;
`;

export interface RoomFilterViewProps extends HTMLProps<HTMLInputElement> {
}
export const RoomFilterView = (props: RoomFilterViewProps) => {
    return (
        <RoomFilterContainer>
            <RoomFilter onChange={props.onChange} placeholder={"Search by id..."}/>
        </RoomFilterContainer>
    )
};
