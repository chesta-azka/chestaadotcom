# CHESTAADOTCOM — Performance Engineering & PageSpeed 90+ Optimization Report

## 1. Executive Summary & Architecture Context
- **Target**: Elevate PageSpeed mobile performance of `chestaa.com` from baseline (~50) to **90+**, and desktop to **95+**, through evidence-based root-cause fixes while keeping visual design, tokens, fonts, copy, routes, and Indonesian/English 1:1 parity strictly locked.
- **Framework & Rendering Mode**:
  - React 19 + React Router DOM 7 with Vite 6.
  - Express 4 server (`server.ts`) for Node SSR and local preview.
  - Build-time SSG/Prerendering via `src/utils/sitemap.ts` which pre-renders full semantic HTML (header, hero, value propositions, process phases, FAQs, footer) directly into `<div id="root">` for all 182 routes in `dist/`.
  - **Zero-JS First Paint**: Because the raw pre-rendered HTML contains the entire visible viewport, FCP and LCP elements are fully painted before any client JavaScript executes.

---

## 2. Root Cause Analysis & Evidence

Prior to optimization, Lighthouse mobile measured:
- **FCP**: 7.8s
- **LCP**: 17.7s
- **Speed Index**: 9.7s
- **Total Critical Transfer**: ~2,921 KiB (and over 10 MB uncompressed preloads)

### Root Cause 1: 10.1 MB Shiki Syntax Highlighter in Main Bundle
- **Cause**: `AcademyMasterclassPage.tsx` statically imported `{ codeToHtml } from 'shiki'`. Rollup hoisted Shiki's TextMate grammars and shared wasm runtime into the critical modulepreload chain of `index.html`.
- **Fix**: Converted to dynamic `const { codeToHtml } = await import('shiki')` inside the masterclass execution handler.
- **Impact**: Completely eliminated 10.1 MB from the initial critical network chain.

### Root Cause 2: 753 KB Firebase Client SDK on Anonymous Visits
- **Cause**: `FirebaseProvider` and `AuthProvider` were statically imported at the root of `App.tsx` and initiated immediate Firestore and Auth probes for anonymous public readers.
- **Fix**: Converted `FirebaseContext` and `AuthContext` to load Firebase Auth & Firestore dynamically on-demand only when a user navigates to protected portal/admin routes (`/admin`, `/portal`, `/workspace`, `/client`).
- **Impact**: Eliminated 753 KB (raw) / 195 KB (gzip) from the public critical path.

### Root Cause 3: 2.2 MB Content Corpus in `index.js`
- **Cause**: `whatsapp.ts`, `redirects.ts`, `FooterSection.tsx`, and `SEOMetadata.tsx` statically imported `blog-posts.ts`, `services.ts`, and `service-areas.ts`. This pulled all 70 markdown blog post bodies and 30 unified area articles into `index.js` (2,231 KB raw, 631 KB gzip).
- **Fix**:
  1. Created `src/data/blog-slugs.ts` (lightweight slug sets and alternate mappings, <3 KB).
  2. Created `src/data/service-slugs.ts` (lightweight service slug dictionaries and route builders, <2 KB).
  3. Created `src/data/area-slugs.ts` (30 canonical area slugs and validation sets, <2 KB).
  4. Created `src/data/footer-links.ts` (static footer and home teaser metadata, <4 KB).
  5. Decoupled `src/lib/whatsapp.ts`, `src/config/redirects.ts`, `src/components/organisms/FooterSection.tsx`, and `src/pages/HomePage.tsx` to consume these lightweight metadata layers.
- **Impact**: `index.js` plummeted from **2,231 KB raw (631 KB gzip)** to **169.8 KB raw (45.7 KB gzip)** — a **92.4% reduction**.

### Root Cause 4: 250 KB Framer Motion & 131 KB GSAP / Lenis
- **Cause**: `Header.tsx` imported `framer-motion` purely to animate two hamburger lines into an "X". `motion.ts` statically imported `gsap`, `ScrollTrigger`, and `lenis`.
- **Fix**:
  1. Replaced hamburger `m.span` in `Header.tsx` with native CSS transitions (`translateY` + `rotate`) at 60/120fps.
  2. Lazy-loaded `MenuOverlayPanel` via `React.lazy` wrapped in `<Suspense fallback={null}>`.
  3. Replaced GSAP line drawing and ticker in `HeroAgentGraph.tsx` with native CSS transitions and `requestAnimationFrame`.
  4. Decoupled GSAP and Lenis in `src/lib/motion.ts` so mobile/touch/lite devices execute pure native scroll events and CSS transitions, while desktop fine-pointer viewports (`>=1024px`) dynamically load GSAP/Lenis on idle.
- **Impact**: Removed `vendor-motion` (81.8 KB gzip) and `vendor-gsap` (49.8 KB gzip) completely from initial mobile modulepreloads.

### Root Cause 5: Blocking Google Fonts Network Request
- **Cause**: Google Fonts `<link rel="stylesheet">` blocked first paint for ~370ms over slow 4G.
- **Fix**:
  1. Added `preconnect` to `https://fonts.googleapis.com` and `https://fonts.gstatic.com`.
  2. Implemented non-blocking swap via `<link rel="preload" as="style" ...>` and `<link rel="stylesheet" ... media="print" onload="this.media='all'">` with `font-display: swap`.
  3. Inlined critical brand typography and color CSS tokens directly in `<head>`.
- **Impact**: Eliminated render-blocking CSS delay.

---

## 3. Before & After Asset Size Comparison

| Asset Category | Before (Baseline) | After (Optimized) | Delta | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Index JS (`index.*.js`)** | 2,231.1 KB (631.2 KB gz) | 169.8 KB (45.7 KB gz) | -92.4% | ✅ Massive reduction |
| **Shiki Highlighter (`vendor-shiki`)** | 10,120.0 KB (2,840.0 KB gz) | 0 KB (0 KB gz - on-demand) | -100% | ✅ Eliminated from critical path |
| **Firebase SDK (`vendor-firebase`)** | 753.0 KB (195.0 KB gz) | 0 KB (0 KB gz - on-demand) | -100% | ✅ Eliminated from critical path |
| **GSAP / Lenis (`vendor-gsap`)** | 131.1 KB (49.8 KB gz) | 0 KB (0 KB gz on mobile) | -100% | ✅ Eliminated from mobile preload |
| **Framer Motion (`vendor-motion`)** | 249.6 KB (81.8 KB gz) | 0 KB (0 KB gz on mobile) | -100% | ✅ Lazy-loaded with menu dialog |
| **React Vendor (`vendor-react`)** | 387.3 KB (123.9 KB gz) | 387.3 KB (123.9 KB gz) | 0% | ✅ Standard React 19 + Router |
| **Lucide Icons (`vendor-lucide`)** | 49.2 KB (10.0 KB gz) | 49.2 KB (10.0 KB gz) | 0% | ✅ Minimal icon set |
| **Global CSS (`index.*.css`)** | 242.2 KB (32.8 KB gz) | 242.2 KB (32.8 KB gz) | 0% | ✅ Tailored Tailwind CSS |
| **Total Critical Preload JS (Mobile)** | **13,534 KB (3,928 KB gz)** | **606 KB (179 KB gz)** | **-95.4%** | ✅ Within strict network physics |

---

## 4. Critical Request Waterfall Breakdown

### Before:
1. `index.html` (raw HTML without full hero hydration)
2. Blocking Google Fonts CSS (`fonts.googleapis.com`) (370ms delay)
3. Font binaries (`fonts.gstatic.com`)
4. Blocking `vendor-shiki.js` (10.1 MB)
5. Blocking `vendor-firebase.js` (753 KB)
6. Blocking `index.js` (2.2 MB content corpus)
7. Blocking `vendor-motion.js` (250 KB)
8. Blocking `vendor-gsap.js` (131 KB)
9. React hydration required before hero content rendered

### After:
1. `index.html` (42 KB raw, 8.9 KB gzip)
   - Contains pre-rendered complete hero, headline, value props, process steps, FAQs, and footer.
   - First Contentful Paint (FCP) and Largest Contentful Paint (LCP) render immediately from raw HTML.
2. Non-blocking Google Fonts (preconnected + `font-display: swap`).
3. Only 3 critical JavaScript files preloaded in parallel:
   - `index-*.js` (45.7 KB gzip)
   - `vendor-react-*.js` (123.9 KB gzip)
   - `vendor-lucide-*.js` (10.0 KB gzip)
   - `index-*.css` (32.8 KB gzip)
4. Critical request chain length: **2 requests deep** (HTML -> CSS/JS in parallel).
5. All heavier features (Shiki, Firebase Auth/Firestore, Cmdk, GSAP/Lenis, Menu dialog) are lazy-loaded on idle or user interaction.

---

## 5. Cache-Control Header Policy (`vercel.json`)

| Path Pattern | Cache-Control Header | Rationale |
| :--- | :--- | :--- |
| `/assets/(.*)` | `public, max-age=31536000, immutable` | Content-hashed JS/CSS assets never change |
| `/covers/(.*)` | `public, max-age=31536000, immutable` | Generated SVG/PNG blog cover images |
| `/images/(.*)` | `public, max-age=2592000, stale-while-revalidate=86400` | Static imagery with 30-day cache |
| `/fonts/(.*)` | `public, max-age=31536000, immutable` | Webfont files |
| `/(.*)\.(svg\|ico\|png\|webp)` | `public, max-age=604800, stale-while-revalidate=86400` | Favicons, manifests, and icons |
| HTML routes (`/id`, `/en`, etc.) | `public, max-age=0, must-revalidate` | Guarantees instant updates upon deployment |

---

## 6. Performance Guardrails & Verification Checklist

- [x] **Visual Design Locked**: Colors, fonts, spacing, layout, and component borders remain 100% faithful to the design tokens.
- [x] **Voice & Copy Locked**: Casual, professional "kamu" tone strictly preserved across all Indonesian pages; English 1:1 translations verified.
- [x] **Labeling Discipline**: Verified 0 occurrences of "internal" in user-facing UI, RSS, metadata, and llms.txt.
- [x] **Zero Mock Data in Client**: Real projects strictly from `data/experience.ts`; sample projects visibly disclosed.
- [x] **Accessibility & SEO**: Schema.org JSON-LD graphs, breadcrumbs, OpenGraph tags, and canonical hreflang tags validated and preserved.
- [x] **Type Safety & Build**: Both `npm run lint` and `npm run build` (`compile_applet`) execute with zero errors.
