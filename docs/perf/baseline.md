# Performance Baseline & Architecture Report — chestaa.com

**Date**: 30 October 2026  
**Auditor**: Senior Performance Engineer & Systems Architect  
**Target Domain**: `https://chestaa.com`  
**Test Profile**: Lighthouse 13.6, Mobile Preset (Emulated Moto G Power, Slow 4G: 1.6 Mbps download, 150ms RTT, 4x CPU slowdown).

---

## 1. Executive Summary & Production Baseline

The production audit of `chestaa.com` on slow 4G mobile emulation revealed a severe performance deficit (PageSpeed Mobile ~50) driven almost exclusively by excessive byte payloads and blocking critical path chains before first paint:

| Metric | Production Baseline | Target Budget | Status | Root Cause |
| :--- | :--- | :--- | :--- | :--- |
| **Performance Score** | **50 / 100** | **≥ 90 / 100** | ❌ Failing | Heavy blocking assets & deferred rendering |
| **First Contentful Paint (FCP)** | **7.8s** | **≤ 1.8s** | ❌ Failing | Render-blocking CSS (248 KB) + Google Fonts + empty HTML shell |
| **Largest Contentful Paint (LCP)** | **17.7s** | **≤ 2.5s** | ❌ Failing | LCP element requires 14.5 MB JS evaluation to render |
| **Speed Index** | **9.7s** | **≤ 3.4s** | ❌ Failing | Progressive visual paint blocked by JS download & execution |
| **Total Blocking Time (TBT)** | **250ms** | **≤ 200ms** | ⚠️ Borderline | Long tasks from React hydration & motion engine init |
| **Cumulative Layout Shift (CLS)** | **0.00** | **≤ 0.05** | ✅ Passing | Rock solid typography & stable component dimensions |
| **Total Transferred Payload** | **2,921 KiB** (14.5 MB uncompressed) | **≤ 600 KiB** | ❌ Failing | Massive un-split vendor bundles + sitemap corpus in client bundle |
| **Initial Critical JavaScript** | **~2,628 KiB raw / ~650 KiB gzip** | **≤ 70 KiB gzip** | ❌ Failing | Monolithic entry bundle with content data & Firebase SDK |

---

## 2. Architecture & Rendering Mode Inspection

- **Framework**: React 19 (`19.2.6`) + React Router DOM (`7.16.0`) with Vite (`6.2.3`).
- **Server Runtime**: Express 4 (`server.ts`) in development and Node SSR wrapper.
- **Production Hosting (Vercel)**: Static Single-Page Application (SPA) with rewrite rules in `vercel.json` pointing `/(.*)` to `/index.html`.
- **Rendering Mode Found**: 
  - **Static Client-Side SPA**: The served `dist/index.html` file contained an **empty** `<div id="root"></div>`.
  - While `server.ts` implemented runtime `injectSocialMeta()` with HTML body pre-rendering, Vercel deployments bypass `server.ts` and serve the static `dist/index.html` directly as an SPA fallback.
  - Consequently, on Vercel preview and production environments, no HTML content painted until JavaScript had fully loaded, parsed, and initialized React.

---

## 3. Network Math & Critical Budget Constraints

Under the standard Lighthouse Mobile throttling model:
- **Bandwidth**: $1,638.4 \text{ kbps} \approx 204.8 \text{ KB/s}$.
- **Round-Trip Time (RTT)**: $150\text{ ms}$.
- **CPU Throttling**: $4\times$ slowdown multiplier.

### The Physics of Slow 4G:
1. Every $100\text{ KB}$ of transferred data consumes at least $\sim 488\text{ ms}$ of wire time under ideal TCP ramp-up.
2. Every sequential round-trip (e.g. HTML $\to$ Google Fonts CSS $\to$ Google Fonts WOFF2) adds at least $150\text{ ms}$ of network latency before byte transfer can even begin.
3. Every $100\text{ KB}$ of JavaScript incurs $\sim 150-250\text{ ms}$ of CPU parse/compile time on an emulated low-tier mobile core (Moto G Power).

### Non-Negotiable Budgets:
- **Critical Path Transfer (before LCP)**: $\le 150\text{ KB}$ total.
- **Max Sequential Request Chain**: $\le 3$ round-trips.
- **Total Initial Page Load Transfer**: $\le 600\text{ KB}$.
- **Initial JavaScript (Gzip)**: $\le 70\text{ KB}$ on `/id` ($\le 90\text{ KB}$ on sub-pages).
- **Hero Element Paint**: Pure static HTML & inlined critical CSS. **Zero JavaScript required for first paint or LCP.**

---

## 4. Full Request Waterfall & Bottleneck Breakdown

Inspection of the compiled production assets revealed the exact sequential request chain choking mobile performance:

1. **Request 1 — HTML Shell (`/id`, 5.4 KB)**:
   - `<div id="root"></div>` was completely blank.
   - Contained `<link rel="modulepreload">` tags for 5 separate chunks totaling $>14\text{ MB}$ uncompressed.
2. **Request 2 — Render-Blocking Google Fonts CSS (`fonts.googleapis.com`, 370ms latency)**:
   - Synchronous external stylesheet requesting full variable font ranges for *Plus Jakarta Sans*, *Inter*, and *JetBrains Mono*.
   - Blocked browser rendering pipeline while awaiting DNS lookup, TLS handshake, and stylesheet response.
3. **Request 3 — Render-Blocking Global CSS (`index-BtqQ7pC7.css`, 248 KB)**:
   - Global stylesheet required for paint. Downloaded over slow 4G took $>1.2\text{s}$.
4. **Requests 4–9 — Preloaded Monolithic JavaScript Chunks**:
   - `dist/assets/vendor-shiki-CNzHNBSY.js` (**10,098 KB** raw): Shiki syntax highlighter bundled due to static import in `AcademyMasterclassPage.tsx` and manual chunk grouping.
   - `dist/assets/index-D04gAYwR.js` (**2,628 KB** raw): Main client bundle containing entire sitemap corpus (all 70 blog posts, 30 area datasets, case studies) via `src/lib/social-meta.ts`.
   - `dist/assets/vendor-firebase-DVtua1kf.js` (**753 KB** raw): Firebase Firestore & Auth SDK loaded on root `src/App.tsx`.
   - `dist/assets/vendor-react-BWh1ag0S.js` (**607 KB** raw): React, React DOM, React Router runtime.
   - `dist/assets/vendor-motion-ff8V5qt1.js` (**260 KB** raw): Framer Motion runtime.
   - `dist/assets/vendor-lucide-C_lK__l8.js` (**50 KB** raw): Icons.

---

## 5. Hypothesis Evaluation (a through n)

- **Hypothesis (a) — Content Corpus Leakage into Client Bundle** (`VERIFIED`):
  `src/components/atoms/SEOMetadata.tsx` imported `getMetaTagsForUrl` from `src/lib/social-meta.ts`, which imported `SITE_URL` from `src/utils/sitemapGenerator.ts`. This pulled all 70 blog post texts, 30 unified area articles, and case study datasets directly into `index.js`, inflating it by over $1.5\text{ MB}$.
- **Hypothesis (b) — Shiki 10MB Critical Path Preload** (`VERIFIED`):
  `AcademyMasterclassPage.tsx` statically imported `{ codeToHtml }` from `shiki`. Rollup bundled shared runtime helpers into `vendor-shiki`, creating a static import from `index.js` to `vendor-shiki.js` and adding `<link rel="modulepreload">` for 10 MB of Shiki to every page.
- **Hypothesis (c) — Unneeded Firebase SDK on Public Routes** (`VERIFIED`):
  `src/App.tsx` wrapped the entire application in `FirebaseProvider` and `AuthProvider`. An anonymous visitor browsing `/id` or `/id/jasa/ai-agent` was forced to download 753 KB of Firebase code and execute Firestore test queries.
- **Hypothesis (d) — Desktop Motion Engine Executing on Mobile** (`VERIFIED`):
  `src/lib/motion.ts` statically imported `gsap`, `ScrollTrigger`, and `lenis`. Even though `detectMotionMode()` routed mobile to 'lite' mode, the 260 KB GSAP/Lenis bundle was still downloaded and parsed.
- **Hypothesis (e) — External Google Fonts Render Blocking** (`VERIFIED`):
  `<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">` added a 370ms blocking network chain.
- **Hypothesis (f) — 248 KB Render-Blocking CSS** (`VERIFIED`):
  No critical CSS was inlined; browser had to download the entire Tailwind stylesheet before first paint.
- **Hypothesis (g) — Empty HTML Body Shell** (`VERIFIED`):
  `<div id="root"></div>` was blank; FCP and LCP were completely tethered to JavaScript execution.
- **Hypothesis (h) — Non-Composited Animations** (`VERIFIED`):
  8 elements animated non-composited properties (e.g., height, top, margin, or unoptimized filters), consuming 4.3s of mobile CPU main-thread work.
- **Hypothesis (i) — Forced Reflow from Layout Reads** (`VERIFIED`):
  Synchronous DOM measurements during initial mount caused layout thrashing.
- **Hypothesis (j) — Sub-optimal Asset Caching** (`VERIFIED`):
  Static SVGs, covers, and non-hashed images in `/images/` lacked long-term immutable caching headers.
- **Hypothesis (k) — Synchronous Auxiliary Tooling** (`VERIFIED`):
  `CommandPalette`, `CommLinkAdmin`, and `KeyboardShortcutsModal` mounted synchronously in `src/App.tsx` on initial load.
- **Hypothesis (l) — Unoptimized Media & SVG Overhead** (`VERIFIED`):
  Raster images and complex SVGs lacked explicit dimensions and modern WebP/AVIF formats.
- **Hypothesis (m) — Third-Party Script Contention** (`VERIFIED`):
  Plausible script in `<head>` executed before FCP.
- **Hypothesis (n) — Missing Build-Time SSG for Static Hosting** (`VERIFIED`):
  No prerender build step existed to generate static HTML for key routes prior to Vercel deployment.

---

## 6. Optimization Plan & Group Sequencing

To achieve Mobile PageSpeed $\ge 90$ and Desktop $\ge 95$, we execute 8 systematic optimization groups:

1. **Group 1: First Paint & Critical Path** — Self-host font subsets (WOFF2) with size-adjusted system fallback, inline critical CSS ($\le 14\text{ KB}$), defer non-critical CSS, remove external Google Fonts links.
2. **Group 2: Instant LCP Hero Paint** — Pre-render hero DOM statically in HTML for all target routes; CSS-only compositor entrance transitions.
3. **Group 3: Monolithic Bundle Elimination** — Decouple `SEOMetadata` from `social-meta.ts` and `sitemapGenerator.ts`; dynamic import for `shiki`; lazy Firebase initialization.
4. **Group 4: Desktop Motion Decoupling** — Dynamic import for GSAP, ScrollTrigger, and Lenis only on desktop viewports ($\ge 1024\text{px}$); zero motion JS on mobile.
5. **Group 5: Island Hydration & Auxiliary Tooling** — Lazy load `CommandPalette`, `CommLinkAdmin`, and `KeyboardShortcutsModal` on interaction or idle.
6. **Group 6: Animation Compositing & Reflow Elimination** — Strict `transform` and `opacity` only; remove forced reflow layout reads.
7. **Group 7: Cache Headers & Compression** — Immutable 1-year caching for hashed static assets; stale-while-revalidate for HTML.
8. **Group 8: Verification & Automated Performance Guardrails** — Automated Lighthouse CI, bundle size budgets, and zero-JS hero visibility tests.
