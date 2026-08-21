import { motion } from 'motion/react';
import { Diamond } from 'lucide-react';
import React from 'react';

export default function SectionSeparator() {
  const scrollToNext = (e: React.MouseEvent<HTMLDivElement>) => {
    // Find the current separator container
    const currentSeparator = (e.target as HTMLElement).closest('.separator-container');
    if (currentSeparator && currentSeparator.nextElementSibling) {
      // Find the next element that is a SectionGlassCard or has a snap-start class
      let nextEl = currentSeparator.nextElementSibling;
      while (nextEl && !nextEl.classList.contains('snap-start')) {
        nextEl = nextEl.nextElementSibling;
      }
      
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to just the immediate next sibling
        currentSeparator.nextElementSibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center py-12 md:py-16 opacity-50 px-6 separator-container">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="px-6 text-slate-400 cursor-pointer hover:text-indigo-500 transition-colors"
        onClick={scrollToNext}
        title="Scroll to next section"
      >
        <Diamond size={20} strokeWidth={1.5} className="animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
      </motion.div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  );
}
