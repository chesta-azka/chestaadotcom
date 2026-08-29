'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ImageIcon } from 'lucide-react';

export default function ArtPlaceholder() {
  return (
    <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden relative mb-12 shadow-2xl shadow-purple-500/5 border border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950 flex items-center justify-center group cursor-default">
      {/* Motion Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          background: 'linear-gradient(120deg, #4f46e5 0%, #a855f7 30%, #ec4899 70%, #4f46e5 100%)',
          backgroundSize: '300% 300%'
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Glassmorphic Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-[80px] bg-white/40 dark:bg-slate-950/40 mix-blend-overlay" />
      
      {/* Decorative meshes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent dark:from-white/5" />

      {/* Placeholder Content */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-slate-500 dark:text-slate-400 group-hover:scale-105 transition-transform duration-700"
      >
        <div className="w-14 h-14 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4 shadow-sm">
          <ImageIcon className="w-6 h-6 text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
        </div>
        <p className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold uppercase text-slate-400 dark:text-slate-500">
          Abstract Corporate Art Space
        </p>
      </motion.div>
    </div>
  );
}
