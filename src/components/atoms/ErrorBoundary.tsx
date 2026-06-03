import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#06080F] p-6 text-center">
          <h1 className="font-sans text-2xl font-medium tracking-tight text-white">
            Terjadi Kesalahan
          </h1>
          <p className="mt-2 font-sans text-gray-400">
            Mohon maaf, sistem kami sedang mengalami gangguan.
          </p>
          <button
            className="mt-6 rounded-full bg-[#D4FF00] px-6 py-2.5 font-sans text-sm font-semibold text-[#06080F] transition-opacity hover:opacity-80"
            onClick={() => window.location.reload()}
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
