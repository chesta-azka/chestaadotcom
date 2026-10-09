import React from 'react';

/**
 * Clean, subtle architectural background canvas.
 * High performance, zero mouse-tracking CPU overhead, no AI slop noise artifacts.
 */
export default function InteractiveBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[0] overflow-hidden" 
      aria-hidden="true"
    >
      {/* Quiet, ultra-subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)', 
          backgroundSize: '48px 48px' 
        }}
      />

      {/* Gentle, static ambient top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-purple-50/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
