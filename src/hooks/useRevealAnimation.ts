import { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface RevealOptions {
  margin?: any;
  delay?: number;
  duration?: number;
  y?: number;
}

export function useRevealAnimation(optionsOrMargin: RevealOptions | string = '-10%') {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const options: RevealOptions = typeof optionsOrMargin === 'string' 
    ? { margin: optionsOrMargin } 
    : optionsOrMargin;

  const margin = options.margin ?? '-10%';
  const delay = options.delay ?? 0;
  const duration = options.duration ?? 0.6;
  const yOffset = options.y ?? 24;

  const isInView = useInView(ref, { once: true, margin });

  const revealProps = {
    ref,
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset },
    animate: shouldReduceMotion 
      ? { opacity: 1, y: 0 } 
      : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }),
    transition: shouldReduceMotion
      ? { duration: 0 }
      : {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] as any,
          staggerChildren: 0.05
        }
  };

  return {
    ref,
    isInView,
    revealProps
  };
}
