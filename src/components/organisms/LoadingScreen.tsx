import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1200; // Reach 100% smoothly
    const intervalTime = 16; 
    const step = end / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setProgress(end);
        clearInterval(timer);
        // Add a micro-delay for the user to perceive the 100% state, then trigger opening
        setTimeout(() => {
          setIsFullyLoaded(true);
          if (onComplete) onComplete();
        }, 150);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#06080F]">
      
      {/* 1. Cinematic Shockwave Circle: Expands outward from center upon hitting 100% */}
      <AnimatePresence>
        {isFullyLoaded && (
          <motion.div
            initial={{ scale: 0.05, opacity: 0 }}
            animate={{ scale: 4.5, opacity: [0, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[200px] h-[200px] rounded-full border-2 border-[#D4FF00] bg-radial-gradient from-[#D4FF40]/15 to-transparent pointer-events-none z-[80] filter blur-[1px]"
          />
        )}
      </AnimatePresence>

      {/* 2. Soft expanding radial ambient light leakage */}
      <AnimatePresence>
        {isFullyLoaded && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: 5, opacity: [0, 0.4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeOut", delay: 0.05 }}
            className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 pointer-events-none z-[79] filter blur-[40px]"
          />
        )}
      </AnimatePresence>

      {/* 3. Center Counter Content Panel: smooth slide & fade away */}
      <motion.div 
        className="flex flex-col items-center gap-6 z-[90] relative text-center select-none text-white"
        animate={isFullyLoaded ? { opacity: 0, scale: 0.85, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
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
      </motion.div>

      {/* 4. Horizontal Split-Screen Curtains. Protruding round elements model a splitting circle that widens and disappears */}
      {/* LEFT PANEL */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#06080F] z-[60] pointer-events-none"
        initial={{ x: 0 }}
        animate={isFullyLoaded ? { x: '-101%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Protruding rounded bubble on the dividing edge */}
        <div className="absolute right-[-100px] sm:right-[-150px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[350px] sm:h-[450px] bg-[#06080F] rounded-full" />
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#06080F] z-[60] pointer-events-none"
        initial={{ x: 0 }}
        animate={isFullyLoaded ? { x: '101%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (isFullyLoaded) {
            setVisible(false);
          }
        }}
      >
        {/* Protruding rounded bubble on the dividing edge */}
        <div className="absolute left-[-100px] sm:left-[-150px] top-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[350px] sm:h-[450px] bg-[#06080F] rounded-full" />
      </motion.div>

    </div>
  );
}

