import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ArrowRight, Code2 } from 'lucide-react';
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
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute z-10 top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-900/20 dark:hover:bg-white/20 backdrop-blur-md transition-colors"
            >
              <X size={18} />
            </button>

            {data.image && (
              <div className="w-full h-48 sm:h-64 relative bg-slate-100 dark:bg-slate-800 shrink-0">
                <img 
                  src={data.image} 
                  alt={data.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
              </div>
            )}

            <div className={`p-6 sm:p-8 overflow-y-auto ${!data.image ? 'pt-12' : ''}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                  {data.type}
                </span>
                {data.subtitle && (
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {data.subtitle}
                  </span>
                )}
              </div>
              
              <h2 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-4">
                {data.title}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {data.description}
              </p>

              {data.tags && data.tags.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Teknologi & Fitur Utama</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm">
                        <Code2 size={14} className="text-slate-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link 
                  to={data.link}
                  onClick={onClose}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                >
                  Lihat Detail Penuh
                  <ArrowRight size={18} />
                </Link>
                <button 
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
