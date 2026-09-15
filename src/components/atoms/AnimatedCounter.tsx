import React, { useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function AnimatedCounter({ value, label, suffix = '', prefix = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasStarted, setHasStarted] = useState(false);
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  });

  const displayValue = useTransform(springValue, (current) => {
    return Math.floor(current);
  });

  useEffect(() => {
    if (isInView && !hasStarted) {
      springValue.set(value);
      setHasStarted(true);
    }
  }, [isInView, value, springValue, hasStarted]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center group">
      <div className="flex items-baseline justify-center font-display font-black tracking-tighter text-slate-900 group-hover:text-purple-900 transition-colors duration-300">
        {prefix && <span className="text-3xl sm:text-4xl text-slate-400 mr-1">{prefix}</span>}
        <motion.span className="text-5xl sm:text-7xl tabular-nums">
          {displayValue}
        </motion.span>
        {suffix && <span className="text-3xl sm:text-4xl text-purple-600 ml-1">{suffix}</span>}
      </div>
      <p className="mt-3 text-sm sm:text-base font-sans font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}
