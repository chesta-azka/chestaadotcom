import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

/**
 * Real LoadingScreen:
 * Dismisses as soon as the DOM and assets are actually loaded (document.readyState === 'complete'),
 * without artificial artificial multi-second setTimeout delays.
 */
export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleRealLoad = () => {
      setIsExiting(true);
      if (onComplete) onComplete();
    };

    // If document is already complete, dismiss immediately without fake delay
    if (document.readyState === 'complete') {
      // Small microtask to allow paint
      const raf = requestAnimationFrame(() => {
        handleRealLoad();
      });
      return () => cancelAnimationFrame(raf);
    } else {
      window.addEventListener('load', handleRealLoad, { once: true });
      // Fallback safeguard max 600ms if load event was missed or slow asset
      const fallbackTimer = setTimeout(handleRealLoad, 600);
      return () => {
        window.removeEventListener('load', handleRealLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#090d16] select-none pointer-events-none"
      initial={{ opacity: 1 }}
      animate={isExiting ? { 
        opacity: 0,
        filter: 'blur(8px)',
      } : { 
        opacity: 1,
        filter: 'blur(0px)',
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          setVisible(false);
        }
      }}
    >
      <div className="flex flex-col items-center">
        {/* Real Minimalist Fast Logo Indicator */}
        <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 flex items-center justify-center overflow-hidden shadow-lg">
          <img 
            src="/chesta.png" 
            alt="Chestaa" 
            className="w-full h-full object-cover object-top" 
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/favicon.svg';
            }}
          />
        </div>
        
        {/* Subtle lightweight loading pulse bar */}
        <div className="w-24 h-0.5 bg-white/10 rounded-full mt-6 overflow-hidden">
          <motion.div 
            className="h-full bg-purple-500 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
