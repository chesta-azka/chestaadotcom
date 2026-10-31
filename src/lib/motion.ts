import { useEffect, useState } from 'react';

/**
 * Apple-grade Motion Tokens (matching CSS variables in index.css)
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

// Lenis reference (typed loosely to avoid static import)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let activeLenis: any = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getActiveLenis(): any {
  return activeLenis;
}

/**
 * Single unified animation clock:
 * - On desktop fine-pointer in 'full' mode: dynamically imports Lenis and connects it.
 * - On mobile, touch, low-hardware, or reduced mode: lightweight native scroll listener (0 KB GSAP/Lenis).
 * - Updates --scroll-progress on <html> and modulates --marquee-duration.
 */
export function initUnifiedMotionEngine(): () => void {
  if (typeof window === 'undefined') return () => {};

  initFrameBudgetMonitor();

  const root = document.documentElement;
  const mode = detectMotionMode();
  const isFineDesktop =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth >= 1024;

  let destroyed = false;
  let lastScrollY = window.scrollY;

  const updateScrollMetrics = (velocity = 0) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    root.style.setProperty('--scroll-progress', progress.toFixed(4));

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

  updateScrollMetrics(0);

  if (mode === 'full' && isFineDesktop) {
    // Dynamic import for desktop only
    Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenisInstance = new Lenis({
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

      const tickerCallback = (time: number) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(500, 33);
    }).catch(() => {
      // Fallback to native scroll if dynamic import fails
      window.addEventListener('scroll', onNativeScroll, { passive: true });
    });
  } else {
    window.addEventListener('scroll', onNativeScroll, { passive: true });
  }

  return () => {
    destroyed = true;
    window.removeEventListener('scroll', onNativeScroll);
    if (activeLenis) {
      activeLenis.destroy?.();
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
 * Shared reveal helper: animates transform (translateY), opacity, and optional subtle blur.
 * Uses native IntersectionObserver + CSS transition for zero main-thread blockage and zero JS payload.
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

  element.style.opacity = '0.001';
  element.style.transform = `translateY(${y}px)`;
  if (blur && mode === 'full') {
    element.style.filter = 'blur(6px)';
  }

  const animDuration = mode === 'lite' ? Math.min(0.45, duration) : duration;
  element.style.transition = `opacity ${animDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${animDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, filter ${animDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.filter = 'blur(0px)';
            element.setAttribute('data-revealed', 'true');
          });
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
 * Native IntersectionObserver + CSS transition with zero GSAP requirement.
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

  const animDuration = mode === 'lite' ? 0.45 : duration;
  const staggerStep = mode === 'lite' ? 0.035 : stagger;

  targets.forEach((el, index) => {
    const clampedIndex = Math.min(index, MOTION_TOKENS.stagger.maxItems - 1);
    const itemDelay = delay + clampedIndex * staggerStep;
    el.style.opacity = '0.001';
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${animDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${itemDelay}s, transform ${animDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${itemDelay}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            targets.forEach((el) => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              el.setAttribute('data-revealed', 'true');
            });
          });
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
  const animDuration = mode === 'lite' ? 0.5 : duration;
  pathElement.style.transition = `stroke-dashoffset ${animDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            pathElement.style.strokeDashoffset = '0';
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
 */
export function animateCountUp(
  element: HTMLElement | null,
  rawText: string,
  duration = 0.85
): () => void {
  if (!element) return () => {};
  const mode = detectMotionMode();
  
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
          const startTime = performance.now();
          const totalMs = Math.min(650, duration * 1000);

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / totalMs);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = normalizedNum * easedProgress;
            const formatted = currentVal.toFixed(decimals);
            element.textContent = `${prefix}${
              usesComma ? formatted.replace('.', ',') : formatted
            }${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              element.textContent = rawText;
            }
          };

          requestAnimationFrame(step);
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
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSectionTimeline(
  scopeElement?: HTMLElement | null,
  vars?: any
): {
  tl: any;
  kill: () => void;
} {
  let killed = false;
  let activeTl: any = null;

  import('gsap').then(({ default: gsap }) => {
    if (killed) return;
    activeTl = gsap.timeline(vars);
  });

  const kill = () => {
    killed = true;
    if (activeTl) {
      activeTl.kill();
    }
  };
  return { tl: activeTl, kill };
}

/**
 * Registers one or more ScrollTrigger instances for cleanup.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerScrollTriggerCleanup(
  ...triggers: Array<any>
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
 */
let refreshTimer: number | null = null;
export function refreshScrollTrigger(): void {
  if (typeof window === 'undefined') return;
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
  }

  const runRefresh = () => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    }).catch(() => {});
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
