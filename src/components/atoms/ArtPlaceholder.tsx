'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function ArtPlaceholder() {
  return (
    <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden relative mb-10 border border-purple-100 bg-purple-50/40 flex items-center justify-center group cursor-default">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(120deg, #9333ea 0%, #c084fc 50%, #f3e8ff 100%)',
          backgroundSize: '200% 200%'
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-purple-900 group-hover:scale-105 transition-transform duration-500 font-sans">
        <div className="w-12 h-12 rounded-2xl bg-white border border-purple-100 flex items-center justify-center mb-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-purple-700" />
        </div>
        <p className="text-xs tracking-wider font-semibold uppercase text-purple-900">
          CHESTADOTCOM &bull; Visual Showcase
        </p>
      </div>
    </div>
  );
}
