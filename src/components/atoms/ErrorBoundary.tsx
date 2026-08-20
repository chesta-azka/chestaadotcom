import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
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
        <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-100 p-6 text-center">
          <h1 className="font-sans text-2xl font-medium tracking-tight text-slate-900">
            Terjadi Kesalahan
          </h1>
          <p className="mt-2 font-sans text-slate-600">
            Mohon maaf, sistem kami sedang mengalami gangguan.
          </p>
          <button
            className="mt-6 rounded-full bg-[#4f46e5] px-6 py-2.5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-80"
            onClick={() => window.location.reload()}
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
