# Content Publishing Waves & Schedule — CHESTAADOTCOM

This document describes the publishing wave architecture, date filtering system, and scheduled rebuild triggers for automatic content rollouts.

---

## 1. Publishing Waves System Overview

All content items across pages, services, areas, blog posts, case studies, projects, and glossary entries contain two ISO date fields:
- `publishAt`: ISO 8601 date string (e.g. `2026-10-23T00:00:00Z`)
- `updatedAt`: ISO 8601 date string (e.g. `2026-10-25T00:00:00Z`)

### Automated Build Filtering Rule
The build system dynamically filters out any content entry whose `publishAt` is in the future relative to build time (`now`).

Exclusions applied to future-dated entries:
- Excluded from `sitemap.xml`, `sitemap-*.xml`
- Excluded from `llms.txt` and `llms-full.txt`
- Excluded from `rss.xml` / `feed.xml`
- Excluded from hreflang alternate lists
- Excluded from internal link suggestions and hub listings
- Excluded from client-side route map

---

## 2. Daily Automated Rebuild Trigger

To automatically publish scheduled content entries when their `publishAt` date arrives:

1. **Vercel Deploy Hook Setup**:
   - Navigate to Vercel Project Settings > Git > Deploy Hooks.
   - Create a Deploy Hook named `Daily Publishing Wave Trigger`.
2. **Cron Scheduler Configuration**:
   - Trigger a daily `POST` request to the Vercel Deploy Hook at `00:05 UTC` (07:05 WIB).
   - This initiates an automated production rebuild, publishing all newly matured `publishAt` entries instantly.

---

## 3. Content Wave Release Schedule Table

| Wave ID | Scheduled Date (`publishAt`) | Content Type | Target Category / Cluster | Primary Language | Status |
| :---: | :---: | :---: | :--- | :---: | :---: |
| **Wave 1** | `2026-10-20` | Core Pages | Home, Services, Pricing, About, FAQ, Cara Kerja | ID & EN | **LIVE** |
| **Wave 2** | `2026-10-23` | Service Areas | 10 Local Area Pages (BSD, Tangsel, Pamulang, etc.) | ID & EN | **LIVE** |
| **Wave 3** | `2026-10-25` | Pillar Posts | 6 Pillar Articles across Topic Clusters | ID & EN | **LIVE** |
| **Wave 4** | `2026-10-27` | Spoke Posts | 64 Spoke Articles & Case Studies | ID & EN | **LIVE** |
| **Wave 5** | `2026-11-01` | Glossary | 20 AI & Web Tech Glossary Terms | ID & EN | **SCHEDULED** |
| **Wave 6** | `2026-11-15` | Tech Guides | Advanced Workflow & AEO Optimization Guides | ID & EN | **SCHEDULED** |
