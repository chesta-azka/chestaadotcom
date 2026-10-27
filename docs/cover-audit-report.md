# Blog Cover & OpenGraph Uniqueness Audit Report — CHESTAADOTCOM

Laporan ini mendokumentasikan akar masalah duplikasi gambar sampul (*cover image*) sebelumnya serta memverifikasi bahwa seluruh 35 pasang artikel blog dwibahasa (70 halaman total: 35 Bahasa Indonesia + 35 Bahasa Inggris) kini memiliki sampul SVG `1600×900` (`16:9`) dan kartu OpenGraph `1200×630` yang 100% unik.

## 1. Akar Masalah Sebelumnya (Before Fix)
- Artikel 21–30 menggunakan ulang 5 file SVG klaster generik (`cluster-agentic-ai.svg`, `cluster-website-performance.svg`, `cluster-cost-vendor.svg`, `cluster-automation-software.svg`, `cluster-local-seo.svg`).
- Beberapa kunci gambar berbeda di `src/config/images.ts` (`blogRagBusiness`, `blogMcpBusinessGuide`, `blogSchemaLocalBusiness`, `blogInvoiceAutomation`, `blogAutomationToolStack`, `blogChooseWebAgency`, `blogMaintenanceCost`, `blogNextjsVsWordpress`, dll.) menunjuk ke file SVG fisik yang sama.

## 2. Tabel Verifikasi Sampul Baru (`1600×900` Cover + `1200×630` OG)

| # | Slug Indonesia | Slug Inggris | Hero (`Variant`) | Tuple `(Cluster / Motif / Layout / Accent)` | SHA-256 | 64-Bit dHash | Ukuran | Jarak Hamming Terdekat |
|---|---|---|---|---|---|---|---|---|
| 1 | `panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula` | `a-complete-guide-to-how-agentic-ai-works-for-beginners` | `loop-steps (A)` | `agentic-ai / node-graph / A / violet` | `ba8502450c41` | `0x152113cbccdd4903` | 5.1 KB | 23 bit |
| 2 | `tool-use-function-calling-ai-agent-bisnis` | `tool-use-function-calling-ai-agents-business` | `usb-ports (B)` | `agentic-ai / node-graph / B / cyan` | `8ceb4826bb55` | `0x17c53336b2327303` | 5.1 KB | 19 bit |
| 3 | `memori-ai-agent-bisnis-retensi-dan-privasi` | `ai-agent-memory-retention-privacy-business` | `memory-layers (A)` | `agentic-ai / rag-vector / C / amber` | `8957b1494441` | `0x11919f8626226319` | 4.7 KB | 20 bit |
| 4 | `multi-agent-vs-single-agent-arsitektur-bisnis` | `multi-agent-vs-single-agent-business-architecture` | `compare-two (B)` | `agentic-ai / node-graph / D / emerald` | `d26604eedfae` | `0x4c5e5d9f9d1d1d0f` | 5.7 KB | 13 bit |
| 5 | `merancang-alur-percakapan-whatsapp-ai-agent` | `designing-whatsapp-conversation-flows-ai-agents` | `form-to-wa (A)` | `agentic-ai / wa-funnel / A / emerald` | `c221208d2d76` | `0x7c3bb3abab233570` | 5.6 KB | 12 bit |
| 6 | `human-handoff-ai-agent-kapan-serahkan-ke-manusia` | `human-handoff-ai-agent-when-to-escalate-to-humans` | `handoff-bridge (A)` | `agentic-ai / wa-funnel / B / amber` | `d51b737aeaae` | `0x0f41d34333b35b1c` | 4.7 KB | 17 bit |
| 7 | `rag-untuk-pemilik-bisnis-ai-menjawab-dari-dokumen` | `rag-for-business-owners-ai-answers-from-documents` | `doc-search (A)` | `agentic-ai / rag-vector / A / cyan` | `30daa4c2d2cc` | `0x71f132322a3a397c` | 5.3 KB | 12 bit |
| 8 | `evaluasi-ai-agent-cara-mengukur-kinerja-agent-bisnis` | `evaluating-ai-agents-how-to-measure-business-agent-performance` | `eval-matrix (A)` | `agentic-ai / vitals-gauge / C / indigo` | `f0af1204c4a9` | `0x7c3db1974d2f5370` | 5.4 KB | 13 bit |
| 9 | `ai-untuk-kos-kosan-dan-properti-sewa` | `ai-for-boarding-houses-and-rental-properties` | `sheet-to-app (A)` | `agentic-ai / wa-funnel / C / violet` | `47ad09341baf` | `0x4361839333374303` | 6.0 KB | 18 bit |
| 10 | `whatsapp-business-app-vs-api-untuk-bisnis` | `whatsapp-business-app-vs-api-for-business` | `compare-frames (B)` | `agentic-ai / architecture-stack / B / indigo` | `7f44c676a91d` | `0x0f1932362e397e08` | 5.3 KB | 17 bit |
| 11 | `keamanan-ai-agent-prompt-injection-data-pelanggan` | `ai-agent-security-prompt-injection-customer-data` | `shield-gate (A)` | `agentic-ai / security-shield / A / rose` | `13289b85c7b2` | `0x7071303a7231bd7c` | 5.4 KB | 11 bit |
| 12 | `uu-pdp-bisnis-whatsapp-ai-panduan-praktis` | `pdp-law-indonesia-business-whatsapp-ai` | `consent-flow (A)` | `agentic-ai / security-shield / B / emerald` | `026cf014ce18` | `0x7071cf8a8b2bfd7c` | 5.5 KB | 19 bit |
| 13 | `chatbot-ai-website-gagal-7-penyebab-solusi` | `why-website-ai-chatbots-fail-7-causes-fixes` | `before-after (B)` | `agentic-ai / conversion-funnel / B / rose` | `85e243d9c6d6` | `0x571d191217665b03` | 5.1 KB | 19 bit |
| 14 | `ai-agent-vs-chatbot-perbedaan-untuk-bisnis` | `ai-agent-vs-chatbot-difference-for-business` | `compare-two (A)` | `agentic-ai / node-graph / C / indigo` | `c623dfac955d` | `0x7c3939be1e1b3d70` | 5.6 KB | 15 bit |
| 15 | `mcp-model-context-protocol-untuk-pemilik-bisnis` | `mcp-model-context-protocol-for-business-owners` | `usb-ports (A)` | `agentic-ai / architecture-stack / D / violet` | `fb02356bc541` | `0x4c79322226130d0f` | 5.0 KB | 19 bit |
| 16 | `kenapa-landing-page-lambat-bikin-iklan-boncos` | `why-slow-landing-pages-waste-ad-spend` | `speed-gauge (A)` | `web-perf / vitals-gauge / A / rose` | `c13a8a5503c9` | `0x117dd29093c31901` | 5.7 KB | 21 bit |
| 17 | `checklist-landing-page-konversi-tinggi-bisnis-jasa` | `high-converting-landing-page-checklist-for-service-businesses` | `page-checklist (A)` | `web-perf / conversion-funnel / A / violet` | `a7709457c22c` | `0x5cec0722a2a72570` | 6.0 KB | 15 bit |
| 18 | `nextjs-vs-wordpress-untuk-bisnis-lokal-cara-memilih` | `nextjs-vs-wordpress-for-local-business-how-to-choose` | `compare-frames (A)` | `web-perf / architecture-stack / A / indigo` | `66f24e8484bd` | `0x711936165f1b3d7c` | 5.3 KB | 15 bit |
| 19 | `landing-page-iklan-meta-google-konversi-tinggi` | `landing-pages-meta-google-ads-high-conversion` | `speed-gauge (B)` | `web-perf / conversion-funnel / C / amber` | `2e1975481edd` | `0x5d5995d6961d2770` | 5.4 KB | 17 bit |
| 20 | `core-web-vitals-pemilik-bisnis-lcp-inp-cls` | `core-web-vitals-business-owners-lcp-inp-cls` | `three-gauges (A)` | `web-perf / vitals-gauge / B / emerald` | `7507a6ecd1e4` | `0x7c7133b3b3336170` | 6.1 KB | 12 bit |
| 21 | `keamanan-website-bisnis-lokal-12-langkah` | `local-business-website-security-12-essential-steps` | `https-lock (A)` | `web-perf / security-shield / D / cyan` | `826ef4abf374` | `0x0c7e37175d0d050f` | 5.1 KB | 13 bit |
| 22 | `seo-lokal-bisnis-bsd-tangerang-selatan-google-maps` | `local-seo-guide-for-bsd-and-south-tangerang-businesses` | `area-network (A)` | `local-seo / map-pins-bsd / D / cyan` | `b19b4d5ec29b` | `0x0f6d2ace8ea34d1c` | 6.3 KB | 17 bit |
| 23 | `geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai` | `geo-and-aeo-how-local-businesses-rank-in-ai-answers` | `answer-box (A)` | `local-seo / schema-tree / B / violet` | `712729b25df2` | `0x5cf133132f0f7170` | 5.0 KB | 13 bit |
| 24 | `schema-markup-untuk-bisnis-lokal-panduan-praktis` | `schema-markup-for-local-businesses-practical-guide` | `schema-tree (A)` | `local-seo / schema-tree / C / indigo` | `6cd57f061fa3` | `0x7d3d159733335370` | 5.9 KB | 13 bit |
| 25 | `otomasi-whatsapp-ai-klinik-fnb-alur-kerja` | `whatsapp-ai-automation-for-clinics-and-fnb-workflows` | `chat-to-calendar (A)` | `automation / wa-funnel / A / emerald` | `b672ebc1fda8` | `0x11701a52361a2105` | 5.2 KB | 19 bit |
| 26 | `otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif` | `business-workflow-automation-n8n-make-repetitive-tasks` | `webhook-pipe (B)` | `automation / pipeline-flow / B / violet` | `47aa1adaaf39` | `0x7c0d0dd3874f3f70` | 5.4 KB | 17 bit |
| 27 | `n8n-make-zapier-kode-custom-pilih-otomasi` | `n8n-make-zapier-custom-code-automation-guide` | `vendor-matrix (A)` | `automation / vendor-scorecard / C / amber` | `718c6f4a24b4` | `0x7031371a3a26727c` | 5.3 KB | 11 bit |
| 28 | `dashboard-untuk-pemilik-kafe-metrik-operasional` | `dashboards-for-cafe-owners-operational-metrics` | `kpi-grid (A)` | `automation / roi-timeline / A / cyan` | `3834c70f5a54` | `0x0f2f6f2c15131908` | 5.9 KB | 20 bit |
| 29 | `otomasi-invoice-dan-penagihan-jasa-profesional` | `invoice-and-billing-automation-for-professional-services` | `doc-to-table (A)` | `automation / pipeline-flow / C / indigo` | `f9908c5da7d7` | `0x70f1353c32177d7c` | 5.6 KB | 11 bit |
| 30 | `webhook-dan-api-otomasi-antar-aplikasi-bisnis` | `webhooks-and-apis-cross-app-automation-business` | `webhook-pipe (A)` | `automation / pipeline-flow / D / rose` | `ec22b6788773` | `0x5d7c33272b333570` | 4.9 KB | 12 bit |
| 31 | `berapa-biaya-bikin-website-bisnis-panduan-harga` | `how-much-does-a-business-website-cost-pricing-guide` | `price-tiers (A)` | `pricing-vendor / cost-breakdown / A / amber` | `8fbc71f0ac7d` | `0x0f4d0f83c2c2410c` | 5.2 KB | 17 bit |
| 32 | `vibe-coding-untuk-bisnis-kapan-cukup-kapan-berbahaya` | `vibe-coding-for-business-when-enough-when-dangerous` | `before-after (A)` | `pricing-vendor / architecture-stack / C / rose` | `2197a6759575` | `0x0f0163271729470c` | 4.9 KB | 17 bit |
| 33 | `biaya-rawat-website-dan-sistem-setelah-rilis` | `website-and-system-maintenance-costs-after-launch` | `wrench-calendar (A)` | `pricing-vendor / roi-timeline / D / indigo` | `fbbc830c55d1` | `0x7031141a3617317c` | 5.6 KB | 11 bit |
| 34 | `cara-memilih-jasa-pembuatan-website-tangerang-selatan` | `how-to-choose-web-development-service-south-tangerang` | `question-checklist (A)` | `pricing-vendor / vendor-scorecard / B / emerald` | `f15ab9e69a5f` | `0x0c490d0f0f4d4f0f` | 7.8 KB | 13 bit |
| 35 | `biaya-operasional-bulanan-ai-agent-bisnis` | `monthly-operating-costs-ai-agents-business` | `usage-meter (A)` | `pricing-vendor / cost-breakdown / C / cyan` | `15e5b7996d12` | `0x0c0f192b59495f0f` | 5.4 KB | 13 bit |
