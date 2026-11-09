# Bilingual Pillar Article Update: Why Ad Landing Pages Load Slowly in Social App Browsers

This plan outlines the authoring, catalog synchronization, and quality verification of the bilingual (Indonesian & English) pillar blog article (`kenapa-landing-page-iklan-lambat-di-hp` / `why-ad-landing-pages-load-slowly-on-mobile`) following the exact 9-H2 blueprint, 5-row comparison table, 6-step mobile testing checklist, BSD aesthetic clinic scenario, and frontmatter character counts specified in the prompt.

## User Review & Critical Decisions

> [!IMPORTANT]
> Both key decisions were confirmed during Phase 1 clarification:

- **Confirmed Decision 1 (Dual Delivery Scope)**: The bilingual pillar article will be updated directly inside the live CHESTAADOTCOM blog catalog AND printed in full (`id/blog/kenapa-landing-page-iklan-lambat-di-hp.md` and `en/blog/why-ad-landing-pages-load-slowly-on-mobile.md` plus `=== LAPORAN QA ===`) in chat without any truncation or summarization.
- **Confirmed Decision 2 (Locked Slug Pair & Precision Frontmatter)**: We will lock the canonical slug pair `kenapa-landing-page-iklan-lambat-di-hp` (ID) and `why-ad-landing-pages-load-slowly-on-mobile` (EN), along with the exact character-counted `title` (53 chars ID / 55 chars EN) and `description` (153 chars ID / 153 chars EN) from the blueprint.

## 1. Overview & Core Concept

- **What It Does**: Delivers a comprehensive, zero-fluff bilingual pillar guide (1,600+ words ID / 1,500+ words EN, 1:1 structural parity) explaining why landing pages that look smooth on an office laptop often freeze or render a blank white screen inside Instagram and TikTok mobile in-app browsers, and how local businesses can structure lightweight HTML pages that route qualified prospects straight to WhatsApp.
- **Target Audience / Persona**: Beauty/dental clinic owners, F&B brands, property/interior studios, and professional service businesses across BSD, Alam Sutera, Bintaro, South Tangerang, and Greater Jakarta whose ad reports show high link clicks but very few incoming WhatsApp chats.
- **Key Value**:
  - Explains the technical and operational gap between an "ad link click" and a "fully rendered mobile page" inside memory-constrained social media in-app browsers.
  - Contrasts heavy visual brochure pages against lightweight mobile conversion pages across 5 concrete operational dimensions.
  - Connects field lessons from CHESTAADOTCOM's 3 real projects (beverage brand temperature/inventory/defect system, Islamic boarding school internal system, and logistics warehouse operational system) and a BSD aesthetic clinic scenario (with an illustrative Rp300,000 starting price) to show why clean, fast interfaces outperform heavy decorative scripts.

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. Readers land on `/blog/kenapa-landing-page-iklan-lambat-di-hp` (or `/en/blog/why-ad-landing-pages-load-slowly-on-mobile`) from search, the `website-dan-performa` topic cluster hub, `/area/bsd`, or `/layanan/pembuatan-website`.
  2. Above the fold, readers see the schematic SVG cover (`hero: 'three-gauges'`, `variant: 'B'`, `accentToken: 'rose'`), author profile (`Chesta Azka`), reading time, and the 3-bullet `Poin utama` / `Key takeaways` box.
  3. Each of the 9 H2 sections opens with a 40–60 word direct AEO answer capsule, followed by 3–4 concise paragraphs (max 4 lines each), a 5-row comparison table under H2 #4, an explicit `> **Peringatan:**` / `> **Warning:**` callout under H2 #5, the 3 real CHESTAADOTCOM project lessons + BSD skin clinic `**Contoh skenario:**` / `**Scenario example:**` under H2 #6, and a 6-step self-testing checklist under H2 #8.
  4. Readers finish at a zero-cost actionable first step in the conclusion, an interactive 5-item FAQ accordion, and a direct CTA to `/layanan/pembuatan-website` (`/en/services/web-development`).
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Utilitarian editorial clarity with high-contrast typography (`Plus Jakarta Sans` display, readable body prose, `JetBrains Mono` tabular metadata) and zero decorative pill clutter.
  - *Color Palette & Mood*: Crisp light/dark adaptive surfaces with a `rose` schematic cover accent highlighting mobile speed diagnostics and in-app browser bottlenecks.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Exact 9-H2 Blueprint & 40–60 Word AEO Capsules**
  - *Chosen Approach*: Follow the exact 9 H2 headings and section structure from the blueprint, opening every H2 with a self-contained 40–60 word answer paragraph before expanding into 3–4 focused paragraphs.
  - *Why*: Ensures 100% alignment with the user's editorial blueprint and Answer Engine Optimization standards.
- **Decision 2: Transparent Commercial Terms & Asset Ownership**
  - *Chosen Approach*: Detail how website and landing page builds start from Rp1,200,000, with a free 30-minute audit with co-founders Chesta Azka (writing code since 2021) and Zeeshan, 50% DP and 50% pre-handover payment, scope adjustment instead of upfront discounting, and 100% client ownership of domain, hosting, and data.
  - *Why*: Grounds the article in CHESTAADOTCOM's verified commercial facts.

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     CHESTAADOTCOM BLOG CONTENT ENGINE                    │
├──────────────────────────────────────────────────────────────────────────┤
│  Bilingual Raw Post Modules (ID & EN 1:1 Parity — Post 45)               │
│  ├── ID: kenapa-landing-page-iklan-lambat-di-hp                          │
│  └── EN: why-ad-landing-pages-load-slowly-on-mobile                      │
│                         │                                                │
│                         ▼                                                │
│  Slug & Cluster Registry                                                 │
│  ├── Bidirectional ID <-> EN Slug Mapping                                │
│  ├── Topic Cluster Assignment: website-dan-performa                      │
│  └── Unique Schematic Cover Spec: three-gauges (Variant B, Rose)         │
│                         │                                                │
│                         ▼                                                │
│  Article Reader & SEO / AEO Output                                       │
│  ├── 9 Blueprint H2s + 40-60w AEO Capsules + 5-Row Comparison Table      │
│  ├── Poster Image Warning Callout + BSD Skin Clinic Scenario Example     │
│  └── Natural Internal Links (/layanan/pembuatan-website, /area/bsd)      │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - Updates the bilingual Post 45 data modules (`author: 'chesta'`, `clusterId: 'website-dan-performa'`, `date: '2026-11-09'`) with exact blueprint headings, table rows, numbered steps, and internal links.
- **Verification**:
  - Validate TypeScript compilation, portfolio/case-study label integrity (`labels:check`), cover uniqueness (`covers:check`), canonical host & email rules (`host:check`), exact frontmatter character counts, em-dash limits ($\le 2$), and zero forbidden phrases.
