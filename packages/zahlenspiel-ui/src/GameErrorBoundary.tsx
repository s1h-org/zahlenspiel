import React, {Component, ErrorInfo} from "react";
import {ErrorView} from "./Error";

interface GameErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

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
            return <ErrorView><h3>{this.state.error?.message}</h3></ErrorView>
        }
        return this.props.children;
    }
}