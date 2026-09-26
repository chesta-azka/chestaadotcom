import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only trigger once per session
    if (sessionStorage.getItem('exitIntentTriggered')) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves top of window (indicating moving to tabs/address bar)
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        sessionStorage.setItem('exitIntentTriggered', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleWhatsApp = () => {
    const text = `Halo CHESTAADOTCOM! Saya tertarik mendapatkan *Checklist IT Infrastructure Audit Gratis* untuk bisnis saya. Mohon informasinya.`;
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col sm:flex-row">
              {/* Left Accent Bar / Graphic */}
              <div className="bg-purple-900 sm:w-1/3 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 relative z-10 backdrop-blur-md border border-white/20">
                  <FileText size={32} className="text-emerald-400" />
                </div>
                <h4 className="text-white font-display font-semibold text-lg relative z-10">
                  IT Audit <br />Checklist
                </h4>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold relative z-10">
                  100% GRATIS
                </div>
              </div>

              {/* Right Content */}
              <div className="p-6 sm:p-8 sm:w-2/3 flex flex-col justify-center bg-white">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-600 mb-2 block">
                  Tunggu Dulu!
                </span>
                <h3 className="text-xl font-display font-semibold text-slate-900 leading-tight mb-3">
                  Cek Kesehatan Website & Sistem Bisnis Anda
                </h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-5">
                  Dapatkan <strong>Checklist IT Infrastructure Audit</strong> eksklusif kami untuk mengidentifikasi bottleneck performa, celah keamanan, dan peluang optimasi SEO sebelum Anda pergi.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-sans text-slate-700">Analisis Core Web Vitals & Performa</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-sans text-slate-700">Pengecekan Fondasi SEO Lokal (BSD/Cisauk)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-sans text-slate-700">Rekomendasi Skalabilitas Server</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-sans text-xs font-bold shadow-lg shadow-purple-950/15 transition-all cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700/0 via-white/20 to-purple-700/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span>Klaim Checklist via WhatsApp</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={handleClose}
                  className="mt-3 w-full text-center text-[10px] font-sans text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Tidak, terima kasih. Saya tidak butuh optimasi.
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
