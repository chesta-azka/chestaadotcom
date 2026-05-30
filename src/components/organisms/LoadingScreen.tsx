import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1400; // Reach 100% right before cards slide open
    const intervalTime = 16; 
    const step = end / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setProgress(end);
        clearInterval(timer);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06080F]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.4 }}
      onAnimationComplete={() => setVisible(false)}
    >
      <div className="flex flex-col items-center gap-6 z-[110] relative text-center select-none">
        <motion.h1
          className="text-[#D4FF00] text-3xl sm:text-4xl font-display font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          chestaa<span className="text-white">.</span>com
        </motion.h1>
        
        {/* Subtle, premium digital preloader tracker */}
        <div className="flex flex-col items-center">
          <div className="font-mono text-xs tracking-[0.2em] text-white/80 font-bold">
            {progress.toString().padStart(3, '0')}%
          </div>
          {/* Subtle responsive line indicator */}
          <div className="w-24 h-[1px] bg-white/10 mt-2 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#D4FF00] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[7px] tracking-[0.4em] text-gray-500 uppercase mt-2.5">
            INITIALIZING ARCHITECT
          </span>
        </div>
      </div>

      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#06080F] z-50 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#06080F] z-50 pointer-events-none"
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

