import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../../data/blogData';

interface QuickReadModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function QuickReadModal({ article, onClose }: QuickReadModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [article]);

  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>

          <div className="w-full h-48 sm:h-64 relative shrink-0">
            {article.image ? (
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-white bg-purple-600/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                  {article.cat}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <Clock size={14} className="text-purple-300" /> {article.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
            <div className="prose prose-sm sm:prose-base prose-slate max-w-none font-sans">
              <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
                {article.desc}
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                <h4 className="font-display font-bold text-slate-900 mb-2">Key Takeaways:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Fokus utama pada AEO (Answer Engine Optimization).</li>
                  <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Strategi implementasi spesifik untuk area BSD & Cisauk.</li>
                  <li className="flex gap-2"><span className="text-purple-600 font-bold">•</span> Panduan teknis mendalam dan penerapan arsitektur modern.</li>
                </ul>
              </div>
              
              <div className="text-slate-600 line-clamp-4">
                {typeof article.content[0] === 'string' 
                  ? article.content[0].substring(0, 300) + '...'
                  : "Baca artikel selengkapnya untuk mendapatkan wawasan teknis, strategi implementasi, dan langkah-langkah konkret yang dapat langsung Anda terapkan."}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>Oleh {article.author?.name || 'Chesta Azka'}</span>
            </div>
            
            <Link 
              to={`/blog/${article.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-purple-700/20"
            >
              Baca Selengkapnya <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
