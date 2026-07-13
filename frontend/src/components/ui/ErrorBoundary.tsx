import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
          <div className="rounded-lg border border-red-200 bg-white p-8 shadow-sm max-w-2xl w-full">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Ops! Algo deu errado.</h2>
            <p className="mb-4 text-gray-700">Um erro inesperado ocorreu na renderização da tela.</p>
            <div className="mb-6 rounded bg-gray-100 p-4 overflow-auto max-h-64">
              <pre className="text-sm text-red-800 font-mono">
                {this.state.error?.toString()}
                {'\n'}
                {this.state.error?.stack}
              </pre>
            </div>
            <Button onClick={() => window.location.href = '/'}>
              Voltar ao Início
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
