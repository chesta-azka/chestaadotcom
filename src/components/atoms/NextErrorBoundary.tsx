"use client";
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class NextErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error intercepted by NextErrorBoundary:", error, errorInfo);
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white p-6 font-sans">
          <div className="relative z-10 w-full max-w-md bg-white border border-purple-100 rounded-3xl shadow-lg p-8 text-center">
            <div className="mx-auto w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5">
              <AlertCircle className="w-7 h-7 text-red-500" strokeWidth={2} />
            </div>
            
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mb-2">
              Terjadi Kesalahan
            </h1>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
              Sistem mendeteksi kendala pada antarmuka. Silakan muat ulang halaman.
            </p>
            
            <button
              onClick={this.handleReload}
              className="w-full py-3 px-6 bg-purple-900 text-white font-semibold rounded-2xl hover:bg-purple-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <RefreshCcw className="w-4 h-4" />
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
