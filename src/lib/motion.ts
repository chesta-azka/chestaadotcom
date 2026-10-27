import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Apple-grade Motion Tokens (TypeScript export matching CSS variables in index.css)
 */
export const MOTION_TOKENS = {
  easings: {
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    easeSoft: 'cubic-bezier(0.16, 1, 0.3, 1)',
    gsapOut: 'power3.out',
    gsapSoft: 'expo.out',
    gsapInOut: 'power2.inOut',
  },
  durations: {
    micro: 0.16, // 120-180ms
    ui: 0.28, // 240-320ms
    reveal: 0.7, // 600-800ms
    hero: 1.0, // 900-1100ms
  },
  stagger: {
    step: 0.055, // 40-80ms
    maxItems: 8,
  },
  distances: {
    short: 12,
    reveal: 24,
    max: 32,
  },
  scales: {
    press: 0.98,
    subtleMin: 0.97,
    subtleMax: 1.03,
    cardImageHover: 1.04,
    imageEnter: 1.06,
  },
} as const;

export type MotionMode = 'full' | 'lite' | 'reduced';

/**
 * Single source of truth for reduced-motion preference.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detects whether the device/network should run in 'full', 'lite', or 'reduced' motion mode.
 * Hard Rule: All touch devices, mobile screens (<1024px), low hardware, or save-data users
 * strictly route to 'lite' mode (zero Lenis, zero parallax/tilt, pure compositor CSS transitions).
 */
export function detectMotionMode(): MotionMode {
  if (typeof window === 'undefined') return 'lite';
  if (prefersReducedMotion()) return 'reduced';

  const docMode = document.documentElement.getAttribute('data-motion-mode') as MotionMode | null;
  if (docMode === 'lite' || docMode === 'reduced') return docMode;

  const isTouchOrMobile =
    'ontouchstart' in window ||
    Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    Boolean(window.matchMedia?.('(pointer: coarse)').matches) ||
    Boolean(window.matchMedia?.('(hover: none)').matches) ||
    window.innerWidth < 1024;

  if (isTouchOrMobile) return 'lite';

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const reducedData =
    Boolean(window.matchMedia?.('(prefers-reduced-data: reduce)').matches) ||
    Boolean(nav.connection?.saveData);
  const lowHardware =
    (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) ||
    (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4);

  return reducedData || lowHardware ? 'lite' : 'full';
}

export function setDocumentMotionMode(mode: MotionMode): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-motion-mode', mode);
  window.dispatchEvent(new CustomEvent('chestaa:motion-mode-change', { detail: mode }));
}

/**
 * React hook for reactive prefers-reduced-motion detection.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      setDocumentMotionMode(e.matches ? 'reduced' : detectMotionMode());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

/**
 * React hook for reactive MotionMode ('full' | 'lite' | 'reduced').
 */
export function useMotionMode(): MotionMode {
  const [mode, setMode] = useState<MotionMode>(() => detectMotionMode());

  useEffect(() => {
    setMode(detectMotionMode());
    const handler = (e: Event) => {
      const custom = e as CustomEvent<MotionMode>;
      if (custom.detail) setMode(custom.detail);
    };
    window.addEventListener('chestaa:motion-mode-change', handler);
    return () => window.removeEventListener('chestaa:motion-mode-change', handler);
  }, []);

  return mode;
}

/**
 * Probes the first 60 animation frames after interactive mount.
 * If average frame delta > 20ms (<50fps), automatically downgrades to 'lite' mode.
 */
let frameProbeStarted = false;
export function initFrameBudgetMonitor(): void {
  if (typeof window === 'undefined' || frameProbeStarted) return;
  if (detectMotionMode() !== 'full') return;
  frameProbeStarted = true;

  let frames = 0;
  let totalDelta = 0;
  let lastTime = performance.now();

  const sample = (now: number) => {
    const delta = now - lastTime;
    lastTime = now;
    // Ignore tab-switch spikes > 150ms
    if (delta > 0 && delta < 150) {
      totalDelta += delta;
      frames += 1;
    }
    if (frames < 60) {
      requestAnimationFrame(sample);
    } else {
      const avgDelta = totalDelta / frames;
      if (avgDelta > 20 && detectMotionMode() === 'full') {
        setDocumentMotionMode('lite');
      }
    }
  };

  requestAnimationFrame(sample);
}

/**
 * Single unified animation clock:
 * - Instantiates Lenis ONLY on desktop fine-pointer devices in 'full' motion mode.
 * - Connects Lenis to GSAP's ticker so there is only ONE requestAnimationFrame loop in the app.
 * - Updates --scroll-progress on <html> and modulates --marquee-duration based on scroll velocity.
 */
let activeLenis: Lenis | null = null;

export function getActiveLenis(): Lenis | null {
  return activeLenis;
}

export function initUnifiedMotionEngine(): () => void {
  if (typeof window === 'undefined') return () => {};

  initFrameBudgetMonitor();

  const root = document.documentElement;
  const mode = detectMotionMode();
  const isFineDesktop =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024;

  let lenisInstance: Lenis | null = null;
  let lastScrollY = window.scrollY;

  const updateScrollMetrics = (velocity = 0) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    root.style.setProperty('--scroll-progress', progress.toFixed(4));

    // Clamp marquee duration modulation between 18s (fast scroll) and 28s (idle)
    const speedFactor = Math.min(10, Math.abs(velocity) * 0.15);
    const marqueeDuration = Math.max(18, 28 - speedFactor);
    root.style.setProperty('--marquee-duration', `${marqueeDuration.toFixed(1)}s`);
  };

  const onNativeScroll = () => {
    const currentY = window.scrollY;
    const velocity = currentY - lastScrollY;
    lastScrollY = currentY;
    updateScrollMetrics(velocity);
  };

  if (mode === 'full' && isFineDesktop) {
    lenisInstance = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });
    activeLenis = lenisInstance;

    lenisInstance.on('scroll', (e: { velocity?: number }) => {
      ScrollTrigger.update();
      updateScrollMetrics(e?.velocity || 0);
    });
  } else {
    window.addEventListener('scroll', onNativeScroll, { passive: true });
  }

  const tickerCallback = (time: number) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(500, 33);
  updateScrollMetrics(0);

  return () => {
    gsap.ticker.remove(tickerCallback);
    window.removeEventListener('scroll', onNativeScroll);
    if (lenisInstance) {
      lenisInstance.destroy();
      activeLenis = null;
    }
  };
}

/**
 * Checks if browser natively supports CSS scroll-driven animations (animation-timeline: view()).
 */
export function supportsCssScrollTimeline(): boolean {
  if (typeof window === 'undefined' || typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('animation-timeline: view()');
}

export interface RevealOptions {
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  preferCssViewTimeline?: boolean;
}

/**
 * Shared reveal helper: animates transform (translateY), opacity, and optional subtle blur (<700ms).
 * Uses CSS animation-timeline: view() when supported and delay === 0 for zero main-thread cost,
 * falling back to IntersectionObserver + CSS/GSAP transition.
 */
export function revealElement(
  element: HTMLElement | null,
  options: RevealOptions = {}
): () => void {
  if (!element) return () => {};

  const mode = detectMotionMode();
  if (mode === 'reduced') {
    element.setAttribute('data-revealed', 'true');
    element.style.opacity = '1';
    element.style.transform = 'none';
    element.style.filter = 'none';
    return () => {};
  }

  const {
    delay = 0,
    duration = MOTION_TOKENS.durations.reveal,
    y = MOTION_TOKENS.distances.reveal,
    blur = false,
    preferCssViewTimeline = true,
  } = options;

  // Zero-JS main-thread path using CSS view() timeline when supported and no custom delay
  if (preferCssViewTimeline && delay === 0 && supportsCssScrollTimeline()) {
    element.classList.add('reveal-css-view');
    return () => {
      element.classList.remove('reveal-css-view');
    };
  }

  element.classList.add('reveal-item');
  if (blur && mode === 'full' && duration <= 0.7) {
    element.setAttribute('data-reveal-blur', 'true');
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.style.willChange = 'transform, opacity';
          gsap.fromTo(
            element,
            {
              opacity: 0.001,
              y,
              filter: blur && mode === 'full' && duration <= 0.7 ? 'blur(6px)' : 'blur(0px)',
            },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: mode === 'lite' ? Math.min(0.45, duration) : duration,
              delay,
              ease: MOTION_TOKENS.easings.gsapOut,
              onComplete: () => {
                element.setAttribute('data-revealed', 'true');
                element.style.willChange = 'auto';
                gsap.set(element, { clearProps: 'transform,filter,willChange' });
              },
            }
          );
          observer.disconnect();
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
  );

  observer.observe(element);
  return () => observer.disconnect();
}

export interface StaggerOptions {
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
}

/**
 * Shared stagger helper: animates a group of child elements on transform and opacity only.
 * Enforces max 8 staggered items — items 9+ appear together with the 8th item.
 */
export function staggerElements(
  container: HTMLElement | null,
  selector: string,
  options: StaggerOptions = {}
): () => void {
  if (!container) return () => {};
  const mode = detectMotionMode();
  const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
  if (!targets.length) return () => {};

  if (mode === 'reduced') {
    targets.forEach((el) => {
      el.setAttribute('data-revealed', 'true');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return () => {};
  }

  const {
    stagger = MOTION_TOKENS.stagger.step,
    duration = MOTION_TOKENS.durations.reveal,
    y = 20,
    delay = 0,
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          targets.forEach((el) => {
            el.style.willChange = 'transform, opacity';
          });
          gsap.fromTo(
            targets,
            { opacity: 0.001, y },
            {
              opacity: 1,
              y: 0,
              duration: mode === 'lite' ? 0.45 : duration,
              delay,
              stagger: (index: number) =>
                Math.min(index, MOTION_TOKENS.stagger.maxItems - 1) *
                (mode === 'lite' ? 0.035 : stagger),
              ease: MOTION_TOKENS.easings.gsapOut,
              onComplete: () => {
                targets.forEach((el) => {
                  el.setAttribute('data-revealed', 'true');
                  el.style.willChange = 'auto';
                  gsap.set(el, { clearProps: 'transform,willChange' });
                });
              },
            }
          );
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  observer.observe(container);
  return () => observer.disconnect();
}

/**
 * Shared SVG line-draw helper: animates strokeDashoffset when entering viewport.
 */
export function lineDrawElement(
  pathElement: SVGGeometryElement | null,
  duration = 0.85,
  delay = 0
): () => void {
  if (!pathElement) return () => {};
  const mode = detectMotionMode();
  if (mode === 'reduced') return () => {};

  const length = pathElement.getTotalLength ? pathElement.getTotalLength() : 200;
  pathElement.style.strokeDasharray = `${length}`;
  pathElement.style.strokeDashoffset = `${length}`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(pathElement, {
            strokeDashoffset: 0,
            duration: mode === 'lite' ? 0.5 : duration,
            delay,
            ease: MOTION_TOKENS.easings.gsapOut,
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(pathElement);
  return () => observer.disconnect();
}

/**
 * Count-up helper for real numeric metric values (runs once on view).
 * Target metrics on case studies and portfolio are static badges, never counted up.
 * Parses prefix, numeric value, decimals, and suffix (e.g., "+42%", "3.2x").
 */
export function animateCountUp(
  element: HTMLElement | null,
  rawText: string,
  duration = 0.85
): () => void {
  if (!element) return () => {};
  const mode = detectMotionMode();
  
  // Static badge enforcement: never animate case studies, portfolio targets, or when in reduced/lite mode
  const isStaticMetric =
    element.getAttribute('data-static-metric') === 'true' ||
    Boolean(element.closest('[data-static-metric="true"]')) ||
    Boolean(element.closest('[data-case-study]')) ||
    mode === 'reduced' ||
    mode === 'lite';

  if (isStaticMetric) {
    element.textContent = rawText;
    return () => {};
  }

  // Match first numeric sequence that is not part of a ratio like 24/7
  const match = rawText.match(/^([^0-9+-]*[+-]?)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match || rawText.includes('/')) {
    element.textContent = rawText;
    return () => {};
  }

  const [, prefix, numStr, suffix] = match;
  const usesComma = numStr.includes(',');
  const normalizedNum = parseFloat(numStr.replace(',', '.'));
  if (Number.isNaN(normalizedNum)) {
    element.textContent = rawText;
    return () => {};
  }

  const decimals = numStr.includes('.')
    ? numStr.split('.')[1].length
    : usesComma
    ? numStr.split(',')[1].length
    : 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const state = { val: 0 };
          gsap.to(state, {
            val: normalizedNum,
            duration: Math.min(0.65, duration),
            ease: MOTION_TOKENS.easings.gsapOut,
            onUpdate: () => {
              const formatted = state.val.toFixed(decimals);
              element.textContent = `${prefix}${
                usesComma ? formatted.replace('.', ',') : formatted
              }${suffix}`;
            },
            onComplete: () => {
              element.textContent = rawText;
            },
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(element);
  return () => observer.disconnect();
}

/**
 * Creates a GSAP timeline scoped to a section element with guaranteed cleanup.
 * Enforces one timeline per section, killed when the section leaves view or unmounts.
 */
export function createSectionTimeline(
  scopeElement?: HTMLElement | null,
  vars?: gsap.TimelineVars
): {
  tl: gsap.core.Timeline;
  kill: () => void;
} {
  const tl = gsap.timeline(vars);
  const kill = () => {
    tl.kill();
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          scopeElement &&
          (st.trigger === scopeElement || (st.trigger instanceof Node && scopeElement.contains(st.trigger)))
        ) {
          st.kill();
        }
      });
    }
  };
  return { tl, kill };
}

/**
 * Registers one or more ScrollTrigger instances for cleanup.
 */
export function registerScrollTriggerCleanup(
  ...triggers: Array<ScrollTrigger | null | undefined>
): () => void {
  return () => {
    triggers.forEach((st) => {
      if (st && typeof st.kill === 'function') {
        st.kill();
      }
    });
  };
}

/**
 * Calls ScrollTrigger.refresh() once document fonts and images settle.
 * Debounced and guarded against repetitive layout shifts.
 */
let refreshTimer: number | null = null;
export function refreshScrollTrigger(): void {
  if (typeof window === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
  }

  const runRefresh = () => {
    ScrollTrigger.refresh();
    refreshTimer = null;
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      refreshTimer = window.setTimeout(runRefresh, 120);
    });
  } else {
    refreshTimer = window.setTimeout(runRefresh, 200);
  }
}
