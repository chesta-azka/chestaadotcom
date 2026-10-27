import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SearchCode, ShieldCheck, Activity, LockKeyhole } from 'lucide-react';
import { useMotionMode, MOTION_TOKENS } from '../../lib/motion';

const timelineSteps = [
  { id: 1, title: 'Analisis', icon: SearchCode },
  { id: 2, title: 'Desain', icon: ShieldCheck },
  { id: 3, title: 'Perakitan', icon: Activity },
  { id: 4, title: 'Peluncuran', icon: LockKeyhole },
];

/**
 * ProjectTimeline (Process Line)
 * - Uses compositor transform (scaleX) with transform-origin: left instead of layout width!
 * - Scoped GSAP ScrollTrigger animation for the process line on desktop Full mode.
 * - Lite & Reduced motion: Immediate static render, zero GSAP listeners.
 */
export default function ProjectTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const motionMode = useMotionMode();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (motionMode === 'reduced') {
      setIsRevealed(true);
      return;
    }

    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    if (motionMode === 'lite') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    // Full Mode: GSAP ScrollTrigger animating transform: scaleX
    line.style.willChange = 'transform';
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        setIsRevealed(true);
        gsap.to(line, {
          scaleX: 1,
          duration: 1.1,
          ease: MOTION_TOKENS.easings.gsapOut,
          onComplete: () => {
            line.style.willChange = 'auto';
          },
        });
      },
      once: true,
    });

    return () => {
      st.kill();
    };
  }, [motionMode]);

  return (
    <div ref={containerRef} className="w-full py-8 mb-6 font-sans">
      <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-8 text-center md:text-left">
        Alur Pelaksanaan Proyek
      </h3>

      <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto md:mx-0">
        {/* Base Connecting Track */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-purple-100 rounded-full" />

        {/* Compositor Animated Progress Line (transform: scaleX, NO width animation) */}
        <div
          ref={lineRef}
          style={{
            transform: isRevealed || motionMode === 'reduced' ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: motionMode === 'lite' ? 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
          }}
          className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-[#6A3FD0] rounded-full z-0"
        />

        {timelineSteps.map((step, index) => {
          const Icon = step.icon;
          const nodeDelay = motionMode === 'lite' ? index * 80 : index * 140;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <div
                style={{
                  transform: isRevealed || motionMode === 'reduced' ? 'scale(1)' : 'scale(0.001)',
                  opacity: isRevealed || motionMode === 'reduced' ? 1 : 0,
                  transition: `transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${nodeDelay}ms, opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${nodeDelay}ms`,
                }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center shadow-xs relative"
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-purple-900 relative z-10" />
              </div>

              <span
                style={{
                  transform: isRevealed || motionMode === 'reduced' ? 'translate3d(0, 0, 0)' : 'translate3d(0, 6px, 0)',
                  opacity: isRevealed || motionMode === 'reduced' ? 1 : 0,
                  transition: `transform 400ms cubic-bezier(0.16, 1, 0.3, 1) ${nodeDelay + 60}ms, opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) ${nodeDelay + 60}ms`,
                }}
                className="text-[10px] md:text-xs uppercase tracking-wider font-semibold text-slate-600 absolute top-[3.2rem] md:top-[3.8rem] text-center w-24 -ml-12 left-1/2"
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
