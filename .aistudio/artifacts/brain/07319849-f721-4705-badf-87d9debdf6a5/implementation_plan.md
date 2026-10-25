# Apple-Level Motion & Interaction System Upgrade

This plan upgrades the site-wide motion and interaction layer to a calm, purposeful, Apple-grade standard while keeping the existing White + Purple design tokens, typography, layout, and bilingual (Indonesian/English) copy completely locked. Every animation explains hierarchy, communicates state transitions, or provides immediate tactile feedback within strict performance budgets (<35 KB gzip motion bundle, 95% frames <16.7 ms, INP <150 ms, zero CLS).

## User Review & Critical Decisions

> [!IMPORTANT]
> All core architectural and UX choices have been confirmed and aligned with the non-negotiable performance guardrails:

- **Confirmed Decision 1 (Adaptive Performance & Lite Mode)**: Auto-detect device and network constraints (`prefers-reduced-data`, `navigator.connection.saveData`, `deviceMemory <= 4`, `hardwareConcurrency <= 4`, or initial 60-frame average `> 20ms`) to automatically engage **Lite Mode** (disabling parallax, 3D tilt, spotlight, blur reveals, and ambient blobs while preserving clean fades and stacked sticky cards).
- **Confirmed Decision 2 (In-Place Component Refactor)**: Upgrade existing Design System primitives (`Button`, `Card`, `SectionHeading`, `Reveal`, `FAQAccordion`, `ImageWithFallback`) and page organisms in-place so all routes benefit immediately with zero layout shift or DOM bloat.
- **Confirmed Decision 3 (Pinned Storytelling Section)**: Use a scrubbed `ScrollTrigger` timeline (`scrub: 0.6`, snap off, smooth enter/exit easing, live mockup state swaps, and `scaleY` progress rail) on desktop fine-pointer viewports, falling back automatically to stacked sticky cards on mobile, touch, Lite Mode, and `prefers-reduced-motion`.
- **Confirmed Decision 4 (Dev Telemetry Overlay & Audit Deliverables)**: Provide a dev-only performance pill in the bottom-right corner toggled via `Alt+M` (stripped in production builds) showing live FPS, long-task count (>50 ms), and active `ScrollTrigger` instances, plus full deliverables in `README.md` and `docs/motion-audit.md`.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces ad-hoc transitions with a unified, compositor-first motion system governed by a single animation clock (GSAP ticker driving Lenis and ScrollTrigger), progressive CSS scroll-driven animations (`animation-timeline: view()`), and hardware-aware degradation.
- **Target Audience / Persona**: Business owners and technical decision-makers browsing `/ind` and `/eng` on desktop and mid-range Android devices who expect instant readability, zero preloader delay, and tactile, effortless polish.
- **Key Value**: Guides visual attention across complex B2B workflows and bilingual copy without main-thread jank, layout shifts, or battery drain.

---

## 2. User Experience & Visual Design

### Motion Tokens (CSS Variables & TypeScript Exports)
- **Easings**:
  - `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (primary spatial deceleration)
  - `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` (symmetric state swaps & crossfades)
  - `--ease-soft: cubic-bezier(0.16, 1, 0.3, 1)` (long settling curves for drawers, accordions, and pins)
  - `--ease-spring`: progressive `linear(...)` critical-damped spring approximation with `--ease-soft` fallback
- **Durations & Stagger**:
  - `--dur-micro: 150ms` (120–180 ms hover, press, focus ring, icon slide)
  - `--dur-ui: 280ms` (240–320 ms menu, tabs, accordion)
  - `--dur-reveal: 700ms` (600–800 ms scroll reveals & image masks)
  - `--dur-hero: 1000ms` (900–1100 ms initial hero choreography)
  - `--stagger-step: 60ms` (40–80 ms step, capped at 8 staggered items max; items 9+ reveal together)
- **Compositor-Only Property Discipline**:
  - Only `transform`, `opacity`, `clip-path`, SVG `stroke-dashoffset`, and short text `filter: blur(<=8px)` (<700 ms) are animated.
  - Dynamic `will-change` is applied immediately prior to animation start and cleared on completion.
  - Content is 100% visible without JS. An inline script in `<head>` adds `.js-motion` to `<html>` before first paint and sets a hard `1500ms` safety timeout (`html.js-motion-ready`) that forces all elements visible if any script stalls.

### Core Interaction & Animation Specifications (1–15)
1. **Word-Masked Text Reveals**: Headlines split by words (never letters) before first paint to prevent CLS, keeping `aria-label` on the heading and `aria-hidden="true"` on word masks (`overflow: clip`, inner word `translateY(100%) -> 0`). Subtitles fade up (`16px -> 0`) with a subtle `blur(6px) -> blur(0px)` under 650 ms (disabled in Lite/Reduced Motion).
2. **Scroll Reveal System**: Unified `Reveal` and `[data-reveal-group]` primitives using native CSS `animation-timeline: view()` (`entry 10% cover 28%`) where supported for zero main-thread cost, with a single shared `IntersectionObserver` fallback.
3. **Hero Layered Depth & Agent Graph**:
   - Background ambient blob, floating glass chips, and the agent graph move at distinct parallax ratios (4%, 6%, and 9% of scroll distance).
   - Desktop fine-pointer 3D tilt on the agent graph (clamped to $\pm 3^\circ$, lerped on the shared ticker).
   - Sequential SVG path drawing (`stroke-dashoffset`), data packets traveling along paths (`<animateMotion>`), and soft node opacity pulses.
   - Automatically pauses all intervals, SVG motion, and pointer listeners when the hero leaves the viewport.
4. **Scroll-Linked Section Backgrounds & Top Progress Bar**:
   - Thin 2px `#6A3FD0` scroll progress bar fixed at the top of the viewport driven by `transform: scaleX(var(--scroll-progress))` (`transform-origin: 0 50%`).
   - Section transitions between `#FFFFFF`, `--bg-soft` (`#F8F6FE`), and the single `--purple-900` (`#2B1763`) section use pre-layered opacity cross-fades rather than repainting `background-color`.
5. **Pinned Vertical Storytelling Section**:
   - Desktop: Scrubbed `ScrollTrigger` timeline (`scrub: 0.6`, snap off, soft enter/exit easing) that cross-fades step copy with a `16px` vertical shift, fills a vertical side progress rail via `scaleY`, and transitions the interactive phone/dashboard mockup across 4 operational states (incoming WhatsApp bubble slide-in, RAG SOP check chip tick, PostgreSQL calendar slot lock, and human handover summary).
   - Mobile / Touch / Lite / Reduced Motion: Cleanly falls back to stacked sticky cards (`position: sticky; top: 88px`).
6. **Bento & Cards**:
   - Desktop cursor spotlight via `--mouse-x` / `--mouse-y` radial opacity gradient and subtle 3D tilt (max $4^\circ$) with CSS glare layer (zero JS on touch devices).
   - Card media scales `1 -> 1.04` inside an `overflow-hidden` frame; directional arrow icon translates `4px` on hover; active press scales to `0.98`.
7. **Buttons & Links**:
   - Primary buttons on desktop feature subtle magnetic pull (clamped to `8px`, smooth spring return on mouseleave) and a dual-layer vertical text-swap hover (`translateY(-100%)` / `translateY(0)`).
   - Inline and navigation text links feature a `scaleX(0 -> 1)` underline draw (`transform-origin: left` on enter, `right` on exit) and smooth focus-visible ring fade.
8. **Numbers & Diagrams**:
   - Metric counters animate once on viewport entry using `tabular-nums` when real numeric data is present (showing final values immediately under `prefers-reduced-motion`).
   - Case study architecture diagrams and the 4-step workflow vertical line scrub/draw with `stroke-dashoffset` and `scaleY`, lighting up each step badge sequentially.
9. **Velocity-Aware Marquee**:
   - Pure CSS `translate3d(-50%, 0, 0)` loop whose playback rate subtly modulates with clamped scroll velocity (`1x` to `1.8x`), pausing on hover and when offscreen.
10. **Images & Galleries**:
    - `SmartImage` / `ImageWithFallback` reveals with `clip-path: inset(8% 8% 8% 8% round 20px)` settling to `inset(0% 0% 0% 0% round 20px)` paired with `scale(1.06 -> 1)` and blur-up placeholder opacity fade-out. Portfolio and gallery rows stagger by row (up to 4 items per row).
11. **FAQ Accordion**:
    - Uses `grid-template-rows: 0fr -> 1fr` (`280ms var(--ease-soft)`) paired with inner content opacity fade, `180deg` chevron rotation, and single-open-item orchestration.
12. **Page Transitions & Instant Language Switch**:
    - Cross-document and SPA View Transitions API (`document.startViewTransition` + `@view-transition { navigation: auto; }`) with a `220ms` opacity + `8px` vertical settle and shared-element `view-transition-name` bindings between portfolio/blog cards and their detail hero covers.
    - Switching between `/ind` and `/eng` bypasses spatial translation for an instant `<120ms` opacity cross-fade.
13. **Navbar & Menu**:
    - Retains the locked `LazyMotion` + `domAnimation` + `m` menu overlay.
    - Floating header pill shrinks subtly on scroll (`scale(0.985)` / compact padding), hides on downward scroll (`translateY(-110%)`), reveals on upward scroll, and glides an active link indicator via `transform: translate3d(...)`.
14. **Footer & Final CTA**:
    - Final CTA glass card rises `20px -> 0` on enter while its radial purple aura breathes on a 6-second opacity-only cycle (`0.35 <-> 0.65`). Footer link columns stagger in once.
15. **Zero-Preloader First Paint**:
    - Removes all blocking preloaders and route suspense spinners. First paint renders real SSR/DOM content immediately; hero intro choreography begins at `DOMContentLoaded` and completes in `<1.1s`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Single Unified Animation Clock**
  - *Chosen Approach*: Bind Lenis smooth scrolling directly to `gsap.ticker` (`gsap.ticker.add((time) => lenis.raf(time * 1000))`) and `lenis.on('scroll', ScrollTrigger.update)` with `gsap.ticker.lagSmoothing(0)`.
  - *Why*: Eliminates competing `requestAnimationFrame` loops and scroll jitter between Lenis and ScrollTrigger.
  - *Alternatives Considered*: Separate `requestAnimationFrame` loops (causes frame drift during pinned sections).
- **Decision 2: CSS `animation-timeline: view()` First, Observer Second**
  - *Chosen Approach*: Use native CSS scroll-driven animations for standard card and text reveals where supported, with a single shared `IntersectionObserver` fallback.
  - *Why*: Offloads 80% of page reveals to the browser compositor thread with zero JS execution during scroll.
- **Decision 3: Viewport-Gated Lazy Loading of GSAP & ScrollTrigger**
  - *Chosen Approach*: Keep initial hero animations lightweight and lazy-load `ScrollTrigger` timelines when sections approach within `rootMargin: '600px'`, pausing/disabling offscreen timelines and calling `ScrollTrigger.refresh()` once after `document.fonts.ready`.
  - *Why*: Keeps total motion JS well under the 35 KB gzip budget and prevents long tasks >50 ms during initial hydration.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Motion Engine Diagram

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                     HTML Head Safety Bootstrap (<1.5s)                   │
│       Adds .js-motion class + 1500ms fallback -> .js-motion-ready        │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                Motion & Performance Engine (src/lib/motion.ts)           │
│  • Tokens: CSS custom properties + TS constants (easings, durations)     │
│  • Capability Detector: Reduced Motion / Lite Mode / Frame Budget Probe  │
│  • Single Clock: GSAP Ticker ──► Lenis (Desktop Fine Pointer)            │
│                              ──► ScrollTrigger.update + Velocity Tracker │
└───────────┬────────────────────────┬─────────────────────────┬───────────┘
            │                        │                         │
            ▼                        ▼                         ▼
┌───────────────────────┐ ┌──────────────────────┐ ┌───────────────────────┐
│  Primitives & Text    │ │  Hero & Storytelling │ │  Page & Chrome Layer  │
│  • WordRevealHeading  │ │  • HeroAgentGraph    │ │  • Top Scroll Bar     │
│  • Reveal / Stagger   │ │    (Parallax/Tilt/   │ │  • Header Pill &      │
│  • Bento Card (Tilt/  │ │     Pause offscreen) │ │    Gliding Indicator  │
│    Spotlight/Glare)   │ │  • PinnedStorySection│ │  • View Transitions   │
│  • Magnetic Button &  │ │    (Scrubbed Pin vs  │ │    (Instant ID/EN)    │
│    Text-Swap Label    │ │     Sticky Fallback) │ │  • Dev Perf Overlay   │
│  • CountUp & SVG Draw │ │  • Velocity Marquee  │ │    (Alt+M in DEV)     │
└───────────────────────┘ └──────────────────────┘ └───────────────────────┘
```

### Interactive Component & State Mapping
- **Capability & Mode State (`PerformanceContext` + `src/lib/motion.ts`)**:
  - Evaluates `prefersReducedMotion`, `isLiteMode` (hardware concurrency, device memory, `saveData`, and initial 60-frame FPS probe), and exposes `<html data-motion-mode="full|lite|reduced">` so both CSS rules and JS hooks adapt instantaneously.
- **Pinned Storytelling State Machine**:
  - Tracks progress $p \in [0, 1]$ across 4 steps ($0\text{–}0.25$, $0.25\text{–}0.50$, $0.50\text{–}0.75$, $0.75\text{–}1.0$), updating active step index only on boundary crossings to avoid per-frame React re-renders while driving the progress rail (`scaleY`) and step opacity/transform directly via GSAP.
- **Dev Telemetry Overlay (`DevMotionOverlay`)**:
  - Rendered strictly when `import.meta.env.DEV` is true. Uses `PerformanceObserver({ entryTypes: ['longtask'] })`, a lightweight `requestAnimationFrame` delta counter, and `ScrollTrigger.getAll().length` to display real-time metrics without polluting production bundles.
