import styled from "styled-components";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFastForward} from "@fortawesome/free-solid-svg-icons";

export const ActionButton = styled.div`
    display: flex;
    justify-content: center;
    cursor: default;
    background: #282c34;
    border: white 2px solid;
    padding: 0.5rem;
`;
export const NextButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    cursor: default;
    background: #282c34;
    border: white 2px solid;
    padding: 0.5rem;
    margin: 1rem;
`;
export interface NextButtonProps {
    onClick: (...args: any) => any;
}
export const NextButton = (props: NextButtonProps) => {
    return (
        <NextButtonContainer onClick={props.onClick}>
            <FontAwesomeIcon icon={faFastForward}/>
        </NextButtonContainer>
    )
};
