import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      if (onComplete) onComplete();
    }, 2200); // Elegant duration for brand presence

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#090d16] select-none"
      initial={{ opacity: 1 }}
      animate={isExiting ? { 
        opacity: 0,
        filter: 'blur(20px)',
        scale: 1.05
      } : { 
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          setVisible(false);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scale: [0.98, 1, 0.98]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        {/* Minimalist Branded Logo Mark */}
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center overflow-hidden">
            <div className="w-4 h-4 bg-white/90 rounded-sm rotate-45" />
          </div>
          
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-150 opacity-50" />
        </div>
        
        {/* Minimalist Branded Identity */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-8 text-[10px] tracking-[0.4em] font-light text-white/30 uppercase"
        >
          CHESTAADOTCOM
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
