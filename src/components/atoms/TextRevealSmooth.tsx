import React, { useRef, useEffect, useState } from 'react';
import { useMotionMode } from '../../lib/motion';

interface TextRevealSmoothProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
  wordClassName?: string;
  once?: boolean;
}

/**
 * TextRevealSmooth (Compositor-First Split Text)
 * - Preserves full unsplit sentence in .sr-only for search bots and screen readers.
 * - In Desktop Full mode: subtle opacity + optical blur resolve (<500ms).
 * - In Mobile & Lite: line opacity fade with 0 layout calculation and zero blur.
 * - In Reduced motion: instant / 150ms opacity fade.
 * - Zero CLS: Pre-reserves full baseline height.
 */
export default function TextRevealSmooth({
  text,
  className = '',
  highlightWords = [],
  highlightClass = 'text-purple-700 font-serif italic',
  wordClassName = '',
}: TextRevealSmoothProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const motionMode = useMotionMode();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (motionMode === 'reduced') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [motionMode]);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* 1. Screen-reader intact text */}
      <span className="sr-only">{text}</span>

      {/* 2. Visual presentation */}
      <span
        aria-hidden="true"
        className={`inline-flex flex-wrap items-baseline gap-x-[0.24em] gap-y-[0.06em] leading-[1.15] select-none transition-opacity duration-300 ${
          isRevealed || motionMode === 'reduced' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {motionMode === 'full' ? (
          words.map((word, idx) => {
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
            const isHighlight = highlightWords.some((hw) => cleanWord === hw.toLowerCase());
            const wordColorClass = isHighlight ? highlightClass : 'text-slate-900';

            return (
              <span
                key={idx}
                style={{
                  opacity: isRevealed ? 1 : 0.01,
                  filter: isRevealed ? 'blur(0px)' : 'blur(4px)',
                  transition: 'opacity 450ms cubic-bezier(0.22, 1, 0.36, 1), filter 450ms cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: `${Math.min(idx, 8) * 40}ms`,
                }}
                className={`inline-block ${wordClassName}`}
              >
                <span className={wordColorClass}>{word}</span>
              </span>
            );
          })
        ) : (
          words.map((word, idx) => {
            const cleanWord = word.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
            const isHighlight = highlightWords.some((hw) => cleanWord === hw.toLowerCase());
            const wordColorClass = isHighlight ? highlightClass : 'text-slate-900';

            return (
              <span key={idx} className={`inline-block ${wordClassName}`}>
                <span className={wordColorClass}>{word}</span>
              </span>
            );
          })
        )}
      </span>
    </span>
  );
}
