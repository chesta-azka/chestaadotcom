import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    // Simulate hydration and quick state validation
    const timer = setTimeout(() => {
      setIsFullyLoaded(true);
      if (onComplete) onComplete();
    }, 800); // Very quick, subtle duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fbfbfd]"
      animate={isFullyLoaded ? { opacity: 0, filter: 'blur(10px)', scale: 1.05 } : { opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (isFullyLoaded) {
          setVisible(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4"
      >
        {/* Apple-style minimalist spinner */}
        <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
        <span className="font-sans text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Initializing
        </span>
      </motion.div>
    </motion.div>
  );
}
