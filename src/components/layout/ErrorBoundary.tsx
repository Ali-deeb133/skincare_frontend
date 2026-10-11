import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Catches a crash while rendering any page and shows a message instead of a
// blank screen.
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unexpected error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="min-h-screen bg-sakura-base px-6 flex flex-col items-center justify-center text-center"
      >
        <span className="text-6xl mb-6">😕</span>
        <h1 className="font-display text-3xl text-sakura-ink italic mb-3">Something went wrong</h1>
        <p className="text-sm text-sakura-muted max-w-sm mb-8">
          An unexpected error stopped this page from loading. Please reload and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-sakura-accent to-sakura-dark text-white font-semibold rounded-2xl hover:opacity-90 transition-opacity text-sm"
        >
          Reload page
        </button>
      </div>
    );
  }
}
