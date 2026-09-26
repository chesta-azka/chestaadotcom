import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function MobileActionBar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const location = useLocation();

  const isBlogPage = location.pathname.startsWith('/blog');

  React.useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isBlogPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-4 right-4 z-[90] lg:hidden"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 pl-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <MessageCircle className="text-purple-600 w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Siap Memulai?</span>
                <span className="text-xs font-medium text-slate-900">Konsultasi Gratis</span>
              </div>
            </div>

            <a
              href="https://wa.me/6282125447232?text=Halo%20Chesta,%20saya%20tertarik%20berdiskusi%20mengenai%20proyek%20arsitektur%20digital%20bisnis%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-purple-900 hover:bg-purple-800 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-all"
            >
              <span>Hubungi WA</span>
              <ArrowRight size={14} className="opacity-50" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
