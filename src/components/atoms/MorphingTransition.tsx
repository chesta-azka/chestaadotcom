import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function MorphingTransition({ children }: { children: React.ReactNode }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const initialPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width/2} ${dimensions.height + 300} 0 ${dimensions.height}  L0 0`;
  const targetPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} 0 Q${dimensions.width/2} 0 0 0  L0 0`;
  const exitPath = `M0 ${dimensions.height} L${dimensions.width} ${dimensions.height} L${dimensions.width} ${dimensions.height} Q${dimensions.width/2} ${dimensions.height} 0 ${dimensions.height} L0 ${dimensions.height}`;

  const curve: any = {
    initial: {
        d: initialPath
    },
    enter: {
        d: targetPath,
        transition: {duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] as any}
    },
    exit: {
        d: initialPath,
        transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1] as any}
    }
  }

  const slide: any = {
    initial: {
        top: "0vh"
    },
    enter: {
        top: "-100vh",
        transition: {duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] as any},
        transitionEnd: {
            top: "100vh"
        }
    },
    exit: {
        top: "0vh",
        transition: {duration: 0.75, ease: [0.76, 0, 0.24, 1] as any}
    }
  }

  return (
    <>
      <motion.div 
        className="fixed inset-0 z-[100] bg-purple-950 pointer-events-none"
        variants={slide}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {dimensions.width > 0 && (
            <svg className="absolute w-full h-[300px] -bottom-[299px] fill-purple-950 pointer-events-none">
                <motion.path 
                  variants={curve} 
                  initial="initial" 
                  animate="enter" 
                  exit="exit"
                />
            </svg>
        )}
      </motion.div>
      {children}
    </>
  );
}
