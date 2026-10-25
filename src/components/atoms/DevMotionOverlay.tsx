import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionMode, useMotionMode, setDocumentMotionMode } from '../../lib/motion';

/**
 * Dev-only motion telemetry pill (stripped in production builds via import.meta.env.DEV).
 * Toggle visibility anytime with Alt+M.
 * Displays live FPS, long tasks (>50ms), active ScrollTrigger count, and current motion mode.
 */
export default function DevMotionOverlay() {
  const isDev = import.meta.env.DEV;
  const motionMode = useMotionMode();
  const [visible, setVisible] = useState(false);
  const [fps, setFps] = useState(60);
  const [longTasks, setLongTasks] = useState(0);
  const [triggers, setTriggers] = useState(0);

  useEffect(() => {
    if (!isDev) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDev]);

  useEffect(() => {
    if (!isDev || !visible) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId = 0;

    const measureFps = (now: number) => {
      frameCount += 1;
      const elapsed = now - lastTime;
      if (elapsed >= 500) {
        setFps(Math.min(120, Math.round((frameCount * 1000) / elapsed)));
        setTriggers(ScrollTrigger.getAll().length);
        frameCount = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(measureFps);
    };

    rafId = requestAnimationFrame(measureFps);

    let observer: PerformanceObserver | null = null;
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        observer = new PerformanceObserver((list) => {
          const count = list.getEntries().filter((entry) => entry.duration > 50).length;
          if (count > 0) {
            setLongTasks((prev) => prev + count);
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch {
        // Longtask observer not supported in some environments
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [isDev, visible]);

  if (!isDev || !visible) return null;

  const cycleMode = () => {
    const next: Record<MotionMode, MotionMode> = {
      full: 'lite',
      lite: 'reduced',
      reduced: 'full',
    };
    setDocumentMotionMode(next[motionMode]);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2.5 rounded-full bg-[#17122B]/90 backdrop-blur-md border border-[#B9A2F2]/30 px-3.5 py-1.5 text-[11px] font-mono text-[#FFFFFF] shadow-lg select-none"
    >
      <span className="flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${
            fps >= 55 ? 'bg-emerald-400' : fps >= 45 ? 'bg-amber-400' : 'bg-rose-400'
          }`}
        />
        <span>{fps} FPS</span>
      </span>
      <span className="text-[#B9A2F2]/50">|</span>
      <span>LT: {longTasks}</span>
      <span className="text-[#B9A2F2]/50">|</span>
      <span>ST: {triggers}</span>
      <span className="text-[#B9A2F2]/50">|</span>
      <button
        type="button"
        onClick={cycleMode}
        className="px-2 py-0.5 rounded-full bg-[#6A3FD0] text-[#FFFFFF] uppercase tracking-wider cursor-pointer hover:bg-[#7C54E0] transition-colors"
        title="Click to cycle Full / Lite / Reduced mode (Alt+M to hide)"
      >
        {motionMode}
      </button>
    </div>
  );
}
