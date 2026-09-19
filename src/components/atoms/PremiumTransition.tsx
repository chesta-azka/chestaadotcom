import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function PremiumTransition() {
  const location = useLocation();
  
  // Wipe container handles pointer events and a tiny delay to ensure smooth transition
  const containerAnim = {
    initial: { opacity: 1 },
    enter: { 
        opacity: 1,
        transition: { delay: 1 } 
    },
    exit: { opacity: 1 }
  };

  // The wipe layer: soft white, sliding from left to right
  const wipeAnim: any = {
    initial: { 
        x: "0%",
        skewX: "-5deg"
    },
    enter: { 
        x: "100%",
        skewX: "0deg",
        transition: { 
          duration: 0.8, 
          ease: [0.65, 0, 0.35, 1], // Sophisticated cubic bezier for organic feel
          delay: 0.1 
        }
    },
    exit: { 
        x: "0%",
        skewX: "5deg",
        transition: { 
          duration: 0.6, 
          ease: [0.65, 0, 0.35, 1] 
        }
    }
  };

  // Text animation refined for white background (dark text)
  const textAnim: any = {
    initial: { opacity: 1, y: 0 },
    enter: { 
      opacity: 0, 
      y: -10, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
    exit: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3, delay: 0.2, ease: "easeOut" } 
    }
  };

  const getPageTitle = (path: string) => {
    if (path === "/") return "CHESTAADOTCOM";
    const segment = path.split("/").filter(Boolean)[0];
    if (!segment) return "CHESTAADOTCOM";
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
      variants={containerAnim}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        className="absolute inset-0 w-[110%] h-full bg-white shadow-[0_0_80px_rgba(0,0,0,0.05)] flex items-center justify-center border-l border-slate-100"
        variants={wipeAnim}
        style={{ left: "-5%" }} // Offset to cover the skew overflow
      >
          <motion.div 
            variants={textAnim} 
            className="flex items-center gap-4 text-slate-900"
          >
            <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin-slow" />
            <span className="font-display text-xl sm:text-2xl font-black tracking-[0.15em] uppercase text-slate-800">
              {getPageTitle(location.pathname)}
            </span>
          </motion.div>
      </motion.div>
    </motion.div>
  );
}
