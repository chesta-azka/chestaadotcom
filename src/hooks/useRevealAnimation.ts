import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export function useRevealAnimation(margin = '-10%') {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin });

  const revealProps = {
    ref,
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: shouldReduceMotion 
      ? { opacity: 1, y: 0 } 
      : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }),
    transition: shouldReduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          staggerChildren: 0.03
        }
  };

  return {
    ref,
    isInView,
    revealProps
  };
}
