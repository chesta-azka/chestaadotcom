import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Home, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-40 md:pt-48 pb-12 font-sans">
          {/* Subtle Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square border-[1px] border-slate-100/50 rounded-full pointer-events-none -z-10" />
          
          <div className="text-center z-10 w-full max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase pt-0.5">
                System Error
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight text-slate-900 mb-6">
              Terjadi Kesalahan
            </h1>
            
            <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
              Sistem kami mendeteksi adanya error tidak terduga saat mencoba memuat halaman ini. Silakan muat ulang atau kembali ke beranda.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-sans font-bold text-xs tracking-wide transition-all hover:bg-purple-600 shadow-sm group"
              >
                <Home size={16} />
                <span>KEMBALI KE BERANDA</span>
              </a>
              
              <button 
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-sans font-bold text-xs tracking-wide transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm group"
              >
                <RefreshCcw size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
                <span>MUAT ULANG HALAMAN</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
