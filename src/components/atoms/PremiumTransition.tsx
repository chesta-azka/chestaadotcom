import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function PremiumTransition() {
  const location = useLocation();
  
  // Wipe container handles pointer events and a tiny delay to ensure smooth transition
  const containerAnim = {
    initial: { display: "block" },
    enter: { 
        display: "none",
        transition: { delay: 1 } 
    },
    exit: { display: "block" }
  } as any;

  // The actual morphing layer
  const morphAnim = {
    initial: { 
        top: "100vh",
        borderTopLeftRadius: "100%", 
        borderTopRightRadius: "100%",
        borderBottomLeftRadius: "0%", 
        borderBottomRightRadius: "0%" 
    },
    enter: { 
        top: "-100vh",
        borderTopLeftRadius: "0%", 
        borderTopRightRadius: "0%",
        borderBottomLeftRadius: "100%", 
        borderBottomRightRadius: "100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: { 
        top: "0vh",
        borderTopLeftRadius: "10%", 
        borderTopRightRadius: "10%",
        borderBottomLeftRadius: "0%", 
        borderBottomRightRadius: "0%",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  } as any;

  const textAnim = {
    initial: { opacity: 1, y: 0 },
    enter: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: "easeInOut" } }
  } as any;

  const getPageTitle = (path) => {
    if (path === "/") return "CHESTAADOTCOM";
    const segment = path.split("/").filter(Boolean)[0];
    if (!segment) return "CHESTAADOTCOM";
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
      variants={containerAnim}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        className="absolute w-full h-[120vh] bg-slate-900 shadow-2xl flex items-center justify-center"
        variants={morphAnim}
      >
          <motion.div variants={textAnim} className="flex items-center gap-3 text-white absolute top-1/2 -translate-y-1/2">
            <svg className="w-6 h-6 animate-spin-slow text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m12 3-8 8 8 8 8-8-8-8z" />
            </svg>
            <span className="font-display text-2xl font-black tracking-widest uppercase">
              {getPageTitle(location.pathname)}
            </span>
          </motion.div>
      </motion.div>
    </motion.div>
  );
}
