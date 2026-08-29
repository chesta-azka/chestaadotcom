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
    // Clear application session cache to ensure a clean state
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-700 font-sans">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-black/50 z-0" />
          
          <div className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-10 text-center animate-in fade-in zoom-in-95 duration-500">
            
            <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-400" strokeWidth={2} />
            </div>
            
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-3">
              Application Error
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
              We encountered an unexpected issue while rendering this view. Our premium diagnostics have logged the exception.
            </p>
            
            <button
              onClick={this.handleReload}
              className="w-full py-3.5 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <RefreshCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
              Clear Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
