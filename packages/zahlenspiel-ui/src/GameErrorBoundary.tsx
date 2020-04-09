import React, {Component, ErrorInfo} from "react";
import styled from "styled-components";
import {AppContainer, Bottom, Center, HeaderText, Top} from "./components/Layout";
import errorImage from "./error.svg";

interface GameErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export const ErrorImage = styled.img`
    width: 100vw;
    max-height: 50vh;
    position: relative;
    overflow: hidden;
    color: white;
`;

export class GameErrorBoundary extends Component<any, GameErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any) {
        return ({
            hasError: true,
            error
        });
    }

    componentDidCatch(error: Error, _: ErrorInfo) {
        return ({
            ...this.state,
            hasError: true,
            error
        });
    }

    render() {
        if (this.state.hasError) {
            return (<AppContainer>
                    <Top>
                        <HeaderText>An error occured ...</HeaderText>
                    </Top>
                    <Center>
                        <h3>{this.state.error?.message}</h3>
                        <ErrorImage src={errorImage}/>
                    </Center>
                    <Bottom>
                        <h4>You can try and refresh the page</h4>
                    </Bottom>
                </AppContainer>
            )
        }
        return this.props.children;
    }
}