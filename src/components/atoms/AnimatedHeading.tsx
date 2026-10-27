import React, { useRef, useEffect, useState } from 'react';
import { useMotionMode, MOTION_TOKENS } from '../../lib/motion';

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  yOffset?: number;
}

/**
 * AnimatedHeading (Apple-Grade Split Text Primitives)
 * - Screen-reader intact: Unsplit raw text preserved in a `.sr-only` element.
 * - Zero CLS: Container pre-reserves vertical space; words are inline-blocks.
 * - Full mode (Desktop): Word-masked reveal from translateY(100%) -> 0, subtle blur (<700ms).
 * - Lite & Mobile: Single line-unit opacity fade, no per-word stagger or translate.
 * - Reduced motion: Instant / 150ms plain opacity fade.
 */
export default function AnimatedHeading({
  as: Tag = 'h2',
  children,
  className = '',
  delay = 0,
  id,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const motionMode = useMotionMode();
  const [isRevealed, setIsRevealed] = useState(false);

  // Extract plain text string representation for accessibility & word splitting
  const plainText = React.useMemo(() => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children
        .map((c) => (typeof c === 'string' ? c : ''))
        .filter(Boolean)
        .join(' ');
    }
    return '';
  }, [children]);

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
          if (delay > 0) {
            const timer = window.setTimeout(() => {
              setIsRevealed(true);
            }, delay * 1000);
            return () => window.clearTimeout(timer);
          } else {
            setIsRevealed(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, motionMode]);

  // If complex JSX or no plain text string available, render with compositor fade
  if (!plainText) {
    return (
      <Tag
        ref={containerRef as any}
        id={id}
        className={`${className} transition-opacity duration-500 ${
          isRevealed || motionMode === 'reduced' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </Tag>
    );
  }

  const words = plainText.split(/\s+/).filter(Boolean);

  return (
    <Tag
      ref={containerRef as any}
      id={id}
      className={`relative ${className}`}
    >
      {/* 1. Screen-reader & Search Bot Intact Sentence */}
      <span className="sr-only">{plainText}</span>

      {/* 2. Visual Layer */}
      <span
        aria-hidden="true"
        className={`inline-flex flex-wrap items-baseline gap-x-[0.24em] gap-y-[0.06em] select-none transition-opacity duration-300 ${
          isRevealed || motionMode === 'reduced' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {motionMode === 'full' ? (
          // Desktop Full Mode: Word clip mask translateY(105%) -> 0
          words.map((word, idx) => (
            <span
              key={idx}
              className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
            >
              <span
                style={{
                  transform: isRevealed ? 'translate3d(0, 0, 0)' : 'translate3d(0, 105%, 0)',
                  transition: `transform ${MOTION_TOKENS.durations.reveal}s ${MOTION_TOKENS.easings.easeOut}`,
                  transitionDelay: `${Math.min(idx, 8) * 45}ms`,
                }}
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            </span>
          ))
        ) : (
          // Mobile & Lite Mode: Plain text inline (zero per-word transform or layout overhead)
          <span>{plainText}</span>
        )}
      </span>
    </Tag>
  );
}
