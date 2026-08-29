import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags.tsx';

export default function NotFoundPage() {
  const handleSearchClick = () => {
    // Simulate Ctrl+K to open CommandPalette
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-[180px] md:pt-[240px] pb-12">
      <MetaTags 
        title="404 - Halaman Tidak Ditemukan | CHESTAADOTCOM" 
        description="Halaman yang Anda cari tidak dapat ditemukan. Silakan kembali ke beranda atau gunakan fitur pencarian."
      />

      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square border-[1px] border-slate-100/50 rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl aspect-square border-[1px] border-slate-100/50 rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10 w-full max-w-2xl"
      >
        <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase pt-0.5">
            Error 404
          </span>
        </div>

        <h1 className="text-[120px] md:text-[180px] leading-none font-display font-medium tracking-tighter text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400 select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-display font-medium text-slate-900 tracking-tight mb-4">
          Halaman Tidak Ditemukan
        </h2>

        <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed mb-10 max-w-md mx-auto">
          Maaf, halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau Anda salah mengetikkan URL.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-sans font-bold text-xs tracking-wide transition-all hover:bg-purple-600 shadow-sm hover:shadow-purple-600/20 group"
          >
            <Home size={16} />
            <span>KEMBALI KE BERANDA</span>
          </Link>
          
          <button 
            onClick={handleSearchClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-sans font-bold text-xs tracking-wide transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm group"
          >
            <Search size={16} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
            <span>CARI HALAMAN</span>
            <div className="hidden sm:flex items-center gap-1 ml-2">
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">CTRL</kbd>
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">K</kbd>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
