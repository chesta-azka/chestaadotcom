import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

export interface QuickViewData {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuickViewData | null;
}

export default function QuickViewModal({ isOpen, onClose, data }: QuickViewModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] touch-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden border border-slate-100 flex flex-col max-h-[85vh] mx-4 sm:mx-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400" />
              <h3 className="text-xl font-display font-semibold text-slate-900 tracking-tight">
                {data.title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0 ml-4"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              <p className="text-slate-600 font-sans leading-relaxed text-sm mb-6">
                {data.description}
              </p>
              
              <div className="mb-2">
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase mb-4">
                  Core Benefits
                </h4>
                <ul className="space-y-3">
                  {data.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-sans text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-50 bg-slate-50/50">
              <a
                href={data.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-slate-900 text-white font-sans font-bold text-sm tracking-wide transition-all hover:bg-indigo-600 shadow-sm"
              >
                <MessageCircle size={16} />
                {data.ctaText}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
