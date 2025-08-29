import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-red-500/30 rounded-xl p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4 font-mono">
              SYSTEM ERROR DETECTED
            </h2>
            <p className="text-gray-300 mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={this.resetError}
              className="bg-red-600 hover:bg-red-700 text-white font-mono px-4 py-2 rounded transition-colors"
            >
              RETRY OPERATION
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-sm">
                <summary className="text-red-400 cursor-pointer">Error Details (Dev Mode)</summary>
                <pre className="mt-2 text-gray-400 text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
