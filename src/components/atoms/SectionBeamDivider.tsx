import React from 'react';
import { motion } from 'motion/react';

interface SectionBeamDividerProps {
  className?: string;
  reverse?: boolean;
  duration?: number;
}

export default function SectionBeamDivider({ 
  className = '', 
  reverse = false,
  duration = 8
}: SectionBeamDividerProps) {
  return (
    <div className={`relative w-full h-px flex items-center justify-center overflow-hidden ${className}`}>
      {/* Base Line */}
      <div className="absolute inset-0 bg-slate-200/40" />
      
      {/* Moving Beam */}
      <motion.div
        initial={{ x: reverse ? '100%' : '-100%' }}
        animate={{ x: reverse ? '-100%' : '100%' }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-full w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent blur-sm"
      />

      {/* Center Accents */}
      <div className="absolute w-2 h-2 rounded-full bg-slate-100 border border-slate-200 z-10 shadow-sm" />
    </div>
  );
}
