import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryState{
    hasError: boolean;
}

interface ErrorBoundaryPropos{
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryPropos, ErrorBoundaryState>{
    constructor(props:ErrorBoundaryPropos){
        super(props)
        this.state = { hasError: false }

    }

    static getDerivedStateFromProps(_:Error): ErrorBoundaryState{
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("Error: ", error);
        console.log("ErrorInfo: ", errorInfo);
    }

    render(): ReactNode {
        if(this.state.hasError){
            return <h1>Oops! I did it again!</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;