'use client';

import React from 'react';
import { motion } from 'motion/react';

export default function GlowingSeparator() {
  return (
    <div className="relative w-full h-[1px] bg-slate-200/80 overflow-hidden my-4">
      {/* Subtle baseline ambient line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent" />
      
      {/* Smooth, continuous, elegant light beam glide without abrupt blinking or strobe */}
      <motion.div
        animate={{ x: ['-100%', '300%'] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="absolute top-0 bottom-0 w-2/5 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent blur-[0.5px]"
      />
    </div>
  );
}
