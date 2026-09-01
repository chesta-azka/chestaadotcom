import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface QuickViewData {
  id: string;
  type: 'project' | 'service';
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  tags?: string[];
  link: string;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuickViewData | null;
}

export default function QuickViewModal({ isOpen, onClose, data }: QuickViewModalProps) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-xs"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-purple-100 flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute z-10 top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 backdrop-blur-md transition-colors"
            >
              <X size={18} />
            </button>

            {data.image && (
              <div className="w-full h-48 sm:h-64 relative bg-purple-50 shrink-0">
                <img 
                  src={data.image} 
                  alt={data.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              </div>
            )}

            <div className={`p-6 sm:p-8 overflow-y-auto ${!data.image ? 'pt-12' : ''}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-900 border border-purple-100 uppercase tracking-wider">
                  {data.type}
                </span>
                {data.subtitle && (
                  <span className="text-sm font-medium text-slate-500">
                    {data.subtitle}
                  </span>
                )}
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4">
                {data.title}
              </h2>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {data.description}
              </p>

              {data.tags && data.tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">Teknologi & Fitur Utama</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50/50 border border-purple-100 text-purple-950 text-xs">
                        <Code2 size={13} className="text-purple-600" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                <Link 
                  to={data.link}
                  onClick={onClose}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-900 text-white px-6 py-2.5 rounded-2xl font-sans text-xs sm:text-sm font-semibold hover:bg-purple-800 transition-colors"
                >
                  <span>Lihat Detail Penuh</span>
                  <ArrowRight size={15} />
                </Link>
                <button 
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl font-sans text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
