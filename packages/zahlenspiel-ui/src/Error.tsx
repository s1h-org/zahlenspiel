import React, {HTMLProps} from "react";
import styled from "styled-components";
import {AppContainer, Bottom, Center, HeaderText, Top} from "./components/Layout";
import errorImage from "./error.svg";

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-even;
    flex-direction: column;
`;

const ErrorImage = styled.img`
    width: 100vw;
    max-height: 50vh;
    position: relative;
    overflow: hidden;
    color: white;
`;

export interface ErrorViewProps extends HTMLProps<HTMLDivElement> {

}

export const ErrorView = (props: ErrorViewProps) => {
    return (<AppContainer>
            <Top>
                <HeaderText>An error occured ...</HeaderText>
            </Top>
            <Center>
                <ErrorContainer>
                    {props.children}
                    <ErrorImage src={errorImage}/>
                </ErrorContainer>
            </Center>
            <Bottom>
                <h4>You can try and refresh the page</h4>
            </Bottom>
        </AppContainer>
    )
}
