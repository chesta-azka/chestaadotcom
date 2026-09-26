'use client';

import React from 'react';

interface SoftDividerProps {
  className?: string;
}

/**
 * Soft, low-contrast horizontal rule with edge fade and refined micro-accent.
 * Improves section separation and visual flow without harsh high-contrast borders.
 */
export default function SoftDivider({ className = '' }: SoftDividerProps) {
  return (
    <div 
      className={`w-full max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-center select-none pointer-events-none ${className}`} 
      aria-hidden="true"
    >
      {/* Soft low-contrast line with gentle horizontal edge fade */}
      <hr className="w-full border-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/90 to-transparent m-0 p-0" />
      
      {/* Subtle modern central micro-mark for refined visual rhythm */}
      <span className="absolute w-1.5 h-1.5 rounded-full bg-slate-300/80 -translate-y-[0.5px]" />
    </div>
  );
}
