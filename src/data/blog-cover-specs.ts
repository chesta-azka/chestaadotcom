export type CoverClusterSignature =
  | 'agentic-ai'
  | 'automation'
  | 'web-perf'
  | 'local-seo'
  | 'pricing-vendor';

export type CoverMotifFamily =
  | 'node-graph'
  | 'rag-vector'
  | 'security-shield'
  | 'pipeline-flow'
  | 'wa-funnel'
  | 'vitals-gauge'
  | 'conversion-funnel'
  | 'architecture-stack'
  | 'map-pins-bsd'
  | 'schema-tree'
  | 'cost-breakdown'
  | 'vendor-scorecard'
  | 'roi-timeline';

export type CoverHeroId =
  | 'speed-gauge'
  | 'three-gauges'
  | 'price-tiers'
  | 'cost-bars'
  | 'usage-meter'
  | 'wrench-calendar'
  | 'chat-to-calendar'
  | 'page-checklist'
  | 'question-checklist'
  | 'area-network'
  | 'compare-two'
  | 'compare-frames'
  | 'before-after'
  | 'doc-to-table'
  | 'doc-search'
  | 'usb-ports'
  | 'kpi-grid'
  | 'loop-steps'
  | 'memory-layers'
  | 'shield-gate'
  | 'eval-matrix'
  | 'handoff-bridge'
  | 'consent-flow'
  | 'webhook-pipe'
  | 'sheet-to-app'
  | 'map-card'
  | 'schema-tree'
  | 'answer-box'
  | 'form-to-wa'
  | 'vitals-trio'
  | 'https-lock'
  | 'vendor-matrix';

export type CoverVariant = 'A' | 'B';
export type CoverLayoutVariant = 'A' | 'B' | 'C' | 'D';
export type CoverAccentToken =
  | 'violet'
  | 'cyan'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'indigo';

export interface CoverSpec {
  coverId: string;
  canonicalSlug: string;
  enSlug: string;
  cluster: CoverClusterSignature;
  hero: CoverHeroId;
  variant: CoverVariant;
  motif: CoverMotifFamily;
  layoutVariant: CoverLayoutVariant;
  accentToken: CoverAccentToken;
  seed: number;
  labels: [string, string?, string?];
  alt: string;
  altEn: string;
  overrideFile?: string;
  legacyImagePath?: string;
}

/**
 * Deterministic 32-bit FNV-1a hash of the canonical slug.
 * Never changes after publishing.
 */
export function fnv1a32(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

interface RawCoverEntry {
  coverId: string;
  canonicalSlug: string;
  enSlug: string;
  aliases?: string[];
  cluster: CoverClusterSignature;
  hero: CoverHeroId;
  variant: CoverVariant;
  motif: CoverMotifFamily;
  layoutVariant: CoverLayoutVariant;
  accentToken: CoverAccentToken;
  labels: [string, string?, string?];
  alt: string;
  altEn: string;
  overrideFile?: string;
  legacyImagePath: string;
}

const RAW_COVER_ENTRIES: RawCoverEntry[] = [
  // ============================================================================
  // CLUSTER 1: agentic-ai (15 Bilingual Article Pairs)
  // ============================================================================
  {
    coverId: 'cover-01-agentic-ai-loop-steps',
    canonicalSlug: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
    enSlug: 'a-complete-guide-to-how-agentic-ai-works-for-beginners',
    aliases: ['guide-how-agentic-ai-works-for-beginners'],
    cluster: 'agentic-ai',
    hero: 'loop-steps',
    variant: 'A',
    motif: 'node-graph',
    layoutVariant: 'A',
    accentToken: 'violet',
    labels: ['PLAN', 'ACT', 'OBSERVE'],
    alt: 'Diagram siklus kerja Agentic AI meliputi tahap perencanaan, pemanggilan tool, dan evaluasi hasil untuk operasional bisnis',
    altEn: 'Schematic loop diagram of Agentic AI showing planning, tool execution, and observation stages for business operations',
    legacyImagePath: '/images/blog/cluster-agentic-ai.svg',
  },
  {
    coverId: 'cover-02-tool-use-usb-ports',
    canonicalSlug: 'tool-use-function-calling-ai-agent-bisnis',
    enSlug: 'tool-use-function-calling-ai-agents-business',
    cluster: 'agentic-ai',
    hero: 'usb-ports',
    variant: 'B',
    motif: 'node-graph',
    layoutVariant: 'B',
    accentToken: 'cyan',
    labels: ['TOOL CALL', 'JSON ARGS', 'API EXEC'],
    alt: 'Diagram arsitektur function calling AI agent yang menghubungkan parameter JSON tervalidasi ke endpoint API sistem bisnis',
    altEn: 'Architecture diagram of AI agent function calling connecting validated JSON parameters to business system API endpoints',
    legacyImagePath: '/images/blog/cluster-agentic-ai.svg',
  },
  {
    coverId: 'cover-03-memory-layers-stack',
    canonicalSlug: 'memori-ai-agent-bisnis-retensi-dan-privasi',
    enSlug: 'ai-agent-memory-retention-privacy-business',
    cluster: 'agentic-ai',
    hero: 'memory-layers',
    variant: 'A',
    motif: 'rag-vector',
    layoutVariant: 'C',
    accentToken: 'amber',
    labels: ['SESSION', 'VECTOR DB', 'TTL POLICY'],
    alt: 'Ilustrasi tiga lapisan memori AI agent dari memori sesi jangka pendek hingga penyimpanan vektor dengan batas retensi',
    altEn: 'Illustration of three AI agent memory layers from short-term session state to vector storage with retention policies',
    legacyImagePath: '/images/blog/cluster-agentic-ai.svg',
  },
  {
    coverId: 'cover-04-multi-vs-single-agent',
    canonicalSlug: 'multi-agent-vs-single-agent-arsitektur-bisnis',
    enSlug: 'multi-agent-vs-single-agent-business-architecture',
    cluster: 'agentic-ai',
    hero: 'compare-two',
    variant: 'B',
    motif: 'node-graph',
    layoutVariant: 'D',
    accentToken: 'emerald',
    labels: ['SINGLE', 'MULTI-AGENT', 'ROUTER'],
    alt: 'Perbandingan skematik arsitektur single-agent tunggal melawan jaringan orkestrasi multi-agent terdistribusi untuk bisnis',
    altEn: 'Schematic comparison between a single-agent architecture and a distributed multi-agent orchestration network for business',
    legacyImagePath: '/images/blog/cluster-agentic-ai.svg',
  },
  {
    coverId: 'cover-05-wa-conversation-flow',
    canonicalSlug: 'merancang-alur-percakapan-whatsapp-ai-agent',
    enSlug: 'designing-whatsapp-conversation-flows-ai-agents',
    cluster: 'agentic-ai',
    hero: 'form-to-wa',
    variant: 'A',
    motif: 'wa-funnel',
    layoutVariant: 'A',
    accentToken: 'emerald',
    labels: ['GREETING', 'INTENT', 'FALLBACK'],
    alt: 'Diagram perancangan alur percakapan WhatsApp AI agent dari sapaan awal, deteksi niat pelanggan, hingga jalur eskalasi',
    altEn: 'Diagram of WhatsApp AI agent conversation flow design from initial greeting and intent detection to fallback routing',
    legacyImagePath: '/images/blog/cluster-agentic-ai.svg',
  },
  {
    coverId: 'cover-06-human-handoff-bridge',
    canonicalSlug: 'human-handoff-ai-agent-kapan-serahkan-ke-manusia',
    enSlug: 'human-handoff-ai-agent-when-to-escalate-to-humans',
    cluster: 'agentic-ai',
    hero: 'handoff-bridge',
    variant: 'A',
    motif: 'wa-funnel',
    layoutVariant: 'B',
    accentToken: 'amber',
    labels: ['AI TRIAGE', 'HANDOFF', 'HUMAN CS'],
    alt: 'Ilustrasi jembatan serah terima human handoff saat AI agent meneruskan ringkasan konteks percakapan ke admin manusia',
    altEn: 'Illustration of a human handoff bridge where an AI agent transfers conversation context summaries to human support staff',
    legacyImagePath: '/images/portfolio/gallery-mobile-handover.svg',
  },
  {
    coverId: 'cover-07-rag-doc-search',
    canonicalSlug: 'rag-untuk-pemilik-bisnis-ai-menjawab-dari-dokumen',
    enSlug: 'rag-for-business-owners-ai-answers-from-documents',
    cluster: 'agentic-ai',
    hero: 'doc-search',
    variant: 'A',
    motif: 'rag-vector',
    layoutVariant: 'A',
    accentToken: 'cyan',
    labels: ['CHUNKING', 'RETRIEVE', 'CITED ANS'],
    alt: 'Diagram alur Retrieval-Augmented Generation (RAG) yang mengekstrak potongan dokumen SOP internal untuk jawaban akurat',
    altEn: 'Pipeline diagram of Retrieval-Augmented Generation (RAG) extracting internal SOP document chunks for grounded AI answers',
    legacyImagePath: '/images/blog/mcp-model-context-protocol-bisnis.svg',
  },
  {
    coverId: 'cover-08-eval-matrix-agent',
    canonicalSlug: 'evaluasi-ai-agent-cara-mengukur-kinerja-agent-bisnis',
    enSlug: 'evaluating-ai-agents-how-to-measure-business-agent-performance',
    cluster: 'agentic-ai',
    hero: 'eval-matrix',
    variant: 'A',
    motif: 'vitals-gauge',
    layoutVariant: 'C',
    accentToken: 'indigo',
    labels: ['ACCURACY', 'LATENCY', 'CONTAINMENT'],
    alt: 'Matriks evaluasi kinerja AI agent bisnis yang memantau akurasi penyelesaian tugas, waktu respons, dan ketepatan eskalasi',
    altEn: 'Evaluation matrix for business AI agents tracking task completion accuracy, response latency, and escalation precision',
    legacyImagePath: '/images/portfolio/gallery-analytics-table.svg',
  },
  {
    coverId: 'cover-09-boarding-house-sheet-app',
    canonicalSlug: 'ai-untuk-kos-kosan-dan-properti-sewa',
    enSlug: 'ai-for-boarding-houses-and-rental-properties',
    cluster: 'agentic-ai',
    hero: 'sheet-to-app',
    variant: 'A',
    motif: 'wa-funnel',
    layoutVariant: 'C',
    accentToken: 'violet',
    labels: ['VACANCY', 'SURVEY WA', 'INVOICE'],
    alt: 'Skema otomatisasi AI agent untuk operasional kos-kosan dan properti sewa dari cek kamar kosong hingga tagihan bulanan',
    altEn: 'Schematic of AI agent automation for boarding houses and rental properties from vacancy checks to monthly rent billing',
    legacyImagePath: '/images/portfolio/properti-interior-bintaro.svg',
  },
  {
    coverId: 'cover-10-wa-app-vs-cloud-api',
    canonicalSlug: 'whatsapp-business-app-vs-api-untuk-bisnis',
    enSlug: 'whatsapp-business-app-vs-api-for-business',
    cluster: 'agentic-ai',
    hero: 'compare-frames',
    variant: 'B',
    motif: 'architecture-stack',
    layoutVariant: 'B',
    accentToken: 'indigo',
    labels: ['WA APP', 'CLOUD API', 'WEBHOOK'],
    alt: 'Perbandingan arsitektur aplikasi WhatsApp Business ponsel melawan integrasi WhatsApp Business Cloud API untuk tim CS',
    altEn: 'Architectural comparison between mobile WhatsApp Business App and official WhatsApp Business Cloud API for support teams',
    legacyImagePath: '/images/blog/whatsapp-app-vs-api-bisnis.svg',
  },
  {
    coverId: 'cover-11-agent-security-shield-gate',
    canonicalSlug: 'keamanan-ai-agent-prompt-injection-data-pelanggan',
    enSlug: 'ai-agent-security-prompt-injection-customer-data',
    cluster: 'agentic-ai',
    hero: 'shield-gate',
    variant: 'A',
    motif: 'security-shield',
    layoutVariant: 'A',
    accentToken: 'rose',
    labels: ['INJECTION', 'GUARDRAIL', 'RBAC SCOPE'],
    alt: 'Diagram gerbang pertahanan keamanan AI agent untuk menangkal serangan prompt injection dan melindungi data pelanggan',
    altEn: 'Security gate diagram for AI agents defending against prompt injection attacks and enforcing customer data isolation',
    legacyImagePath: '/images/blog/keamanan-ai-agent-prompt-injection.svg',
  },
  {
    coverId: 'cover-12-uu-pdp-consent-flow',
    canonicalSlug: 'uu-pdp-bisnis-whatsapp-ai-panduan-praktis',
    enSlug: 'pdp-law-indonesia-business-whatsapp-ai',
    cluster: 'agentic-ai',
    hero: 'consent-flow',
    variant: 'A',
    motif: 'security-shield',
    layoutVariant: 'B',
    accentToken: 'emerald',
    labels: ['CONSENT', 'RETENTION', 'UU PDP'],
    alt: 'Diagram alur persetujuan pelanggan, minimisasi data, dan kepatuhan UU PDP No. 27 Tahun 2022 pada sistem WhatsApp AI',
    altEn: 'Compliance flow diagram showing user consent, data minimization, and Indonesian PDP Law controls in WhatsApp AI systems',
    legacyImagePath: '/images/blog/uu-pdp-whatsapp-ai-bisnis.svg',
  },
  {
    coverId: 'cover-13-website-chatbot-failures',
    canonicalSlug: 'chatbot-ai-website-gagal-7-penyebab-solusi',
    enSlug: 'why-website-ai-chatbots-fail-7-causes-fixes',
    cluster: 'agentic-ai',
    hero: 'before-after',
    variant: 'B',
    motif: 'conversion-funnel',
    layoutVariant: 'B',
    accentToken: 'rose',
    labels: ['DEAD END', 'CONTEXT', 'CONVERT'],
    alt: 'Ilustrasi kontras antara widget chatbot website yang buntu dan alur asisten AI terarah yang menghasilkan konversi prospek',
    altEn: 'Contrast illustration between a dead-end website chatbot widget and a guided AI assistant flow that converts prospects',
    legacyImagePath: '/images/blog/chatbot-ai-website-gagal.svg',
  },
  {
    coverId: 'cover-14-ai-agent-vs-chatbot-compare',
    canonicalSlug: 'ai-agent-vs-chatbot-perbedaan-untuk-bisnis',
    enSlug: 'ai-agent-vs-chatbot-difference-for-business',
    cluster: 'agentic-ai',
    hero: 'compare-two',
    variant: 'A',
    motif: 'node-graph',
    layoutVariant: 'C',
    accentToken: 'indigo',
    labels: ['FAQ TREE', 'AI AGENT', 'ACTIONS'],
    alt: 'Diagram berdampingan yang membandingkan pohon keputusan chatbot statis dengan jaringan penalaran dan aksi AI agent',
    altEn: 'Side-by-side diagram comparing a static rule-based chatbot decision tree against an action-capable AI agent graph',
    legacyImagePath: '/images/blog/ai-agent-vs-chatbot-bisnis.svg',
  },
  {
    coverId: 'cover-15-mcp-usb-ports-protocol',
    canonicalSlug: 'mcp-model-context-protocol-untuk-pemilik-bisnis',
    enSlug: 'mcp-model-context-protocol-for-business-owners',
    cluster: 'agentic-ai',
    hero: 'usb-ports',
    variant: 'A',
    motif: 'architecture-stack',
    layoutVariant: 'D',
    accentToken: 'violet',
    labels: ['MCP HOST', 'CONNECTOR', 'SCOPED DB'],
    alt: 'Skema port konektor standar Model Context Protocol (MCP) yang menghubungkan AI agent ke kalender dan database bisnis',
    altEn: 'Schematic of standardized Model Context Protocol (MCP) connector ports linking AI agents to business calendars and data',
    legacyImagePath: '/images/blog/mcp-model-context-protocol-bisnis.svg',
  },

  // ============================================================================
  // CLUSTER 2: website-dan-performa -> web-perf (6 Bilingual Article Pairs)
  // ============================================================================
  {
    coverId: 'cover-16-slow-landing-page-speed-gauge',
    canonicalSlug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    enSlug: 'why-slow-landing-pages-waste-ad-spend',
    cluster: 'web-perf',
    hero: 'speed-gauge',
    variant: 'A',
    motif: 'vitals-gauge',
    layoutVariant: 'A',
    accentToken: 'rose',
    labels: ['LCP < 2.5S', 'AD CLICK', 'ROAS'],
    alt: 'Indikator pengukur kecepatan muat landing page LCP di bawah 2,5 detik untuk mencegah kebocoran anggaran iklan digital',
    altEn: 'Landing page speed gauge indicator targeting sub-2.5s LCP to stop mobile bounce loss on paid digital ad campaigns',
    legacyImagePath: '/images/blog/landing-page-lambat-iklan-boncos.svg',
  },
  {
    coverId: 'cover-17-landing-page-conversion-checklist',
    canonicalSlug: 'checklist-landing-page-konversi-tinggi-bisnis-jasa',
    enSlug: 'high-converting-landing-page-checklist-for-service-businesses',
    cluster: 'web-perf',
    hero: 'page-checklist',
    variant: 'A',
    motif: 'conversion-funnel',
    layoutVariant: 'A',
    accentToken: 'violet',
    labels: ['HEADLINE', 'TRUST', 'WA CTA'],
    alt: 'Kerangka wireframe landing page berkonversi tinggi dengan penanda daftar periksa proposisi nilai, bukti, dan tombol CTA',
    altEn: 'High-converting landing page wireframe schematic with checklist markers for value proposition, proof, and WhatsApp CTA',
    legacyImagePath: '/images/blog/checklist-landing-page-konversi.svg',
  },
  {
    coverId: 'cover-18-nextjs-vs-wordpress-frames',
    canonicalSlug: 'nextjs-vs-wordpress-untuk-bisnis-lokal-cara-memilih',
    enSlug: 'nextjs-vs-wordpress-for-local-business-how-to-choose',
    cluster: 'web-perf',
    hero: 'compare-frames',
    variant: 'A',
    motif: 'architecture-stack',
    layoutVariant: 'A',
    accentToken: 'indigo',
    labels: ['NEXT.JS', 'WORDPRESS', 'TTFB'],
    alt: 'Perbandingan kerangka arsitektur aplikasi web Next.js modern melawan tumpukan plugin CMS WordPress untuk bisnis lokal',
    altEn: 'Architectural frame comparison between modern Next.js static rendering and a traditional WordPress plugin stack',
    legacyImagePath: '/images/blog/landing-page-lambat-iklan-boncos.svg',
  },
  {
    coverId: 'cover-19-meta-google-ads-landing-speed',
    canonicalSlug: 'landing-page-iklan-meta-google-konversi-tinggi',
    enSlug: 'landing-pages-meta-google-ads-high-conversion',
    cluster: 'web-perf',
    hero: 'speed-gauge',
    variant: 'B',
    motif: 'conversion-funnel',
    layoutVariant: 'C',
    accentToken: 'amber',
    labels: ['AD MATCH', 'FAST LOAD', 'LEAD FORM'],
    alt: 'Diagram keselarasan pesan iklan Meta dan Google Ads menuju halaman arahan berkecepatan tinggi dengan formulir ringkas',
    altEn: 'Diagram showing message match from Meta and Google Ads to a fast-loading landing page with a streamlined lead capture',
    legacyImagePath: '/images/blog/cluster-website-performance.svg',
  },
  {
    coverId: 'cover-20-core-web-vitals-three-gauges',
    canonicalSlug: 'core-web-vitals-pemilik-bisnis-lcp-inp-cls',
    enSlug: 'core-web-vitals-business-owners-lcp-inp-cls',
    cluster: 'web-perf',
    hero: 'three-gauges',
    variant: 'A',
    motif: 'vitals-gauge',
    layoutVariant: 'B',
    accentToken: 'emerald',
    labels: ['LCP', 'INP', 'CLS'],
    alt: 'Tiga cincin pengukur metrik Core Web Vitals meliputi Largest Contentful Paint, Interaction to Next Paint, dan stabilitas',
    altEn: 'Three precision metric rings for Core Web Vitals displaying Largest Contentful Paint, Interaction to Next Paint, and CLS',
    legacyImagePath: '/images/blog/cluster-website-performance.svg',
  },
  {
    coverId: 'cover-21-website-security-https-lock',
    canonicalSlug: 'keamanan-website-bisnis-lokal-12-langkah',
    enSlug: 'local-business-website-security-12-essential-steps',
    cluster: 'web-perf',
    hero: 'https-lock',
    variant: 'A',
    motif: 'security-shield',
    layoutVariant: 'D',
    accentToken: 'cyan',
    labels: ['HTTPS TLS', 'BACKUP', 'HEADERS'],
    alt: 'Diagram pengamanan berlapis website bisnis lokal dengan kunci enkripsi HTTPS, proteksi formulir, dan cadangan terpisah',
    altEn: 'Layered security diagram for local business websites featuring HTTPS TLS encryption, form protection, and off-site backups',
    legacyImagePath: '/images/blog/cluster-website-performance.svg',
  },

  // ============================================================================
  // CLUSTER 3: seo-lokal-dan-geo -> local-seo (3 Bilingual Article Pairs)
  // ============================================================================
  {
    coverId: 'cover-22-local-seo-bsd-area-network',
    canonicalSlug: 'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    enSlug: 'local-seo-guide-for-bsd-and-south-tangerang-businesses',
    aliases: [
      'seo-lokal-bisnis-bsd-tangerang-selatan',
      'local-seo-for-businesses-in-bsd-and-south-tangerang',
    ],
    cluster: 'local-seo',
    hero: 'area-network',
    variant: 'A',
    motif: 'map-pins-bsd',
    layoutVariant: 'D',
    accentToken: 'cyan',
    labels: ['BSD CITY', 'TANGSEL', 'GBP MAPS'],
    alt: 'Jaringan skematik simpul pencarian lokal yang menghubungkan entitas bisnis di BSD City, Pamulang, dan Tangerang Selatan',
    altEn: 'Schematic local search node network connecting business entities across BSD City, Pamulang, and South Tangerang',
    legacyImagePath: '/images/blog/seo-lokal-bsd-tangerang-selatan.svg',
  },
  {
    coverId: 'cover-23-geo-aeo-answer-box',
    canonicalSlug: 'geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai',
    enSlug: 'geo-and-aeo-how-local-businesses-rank-in-ai-answers',
    cluster: 'local-seo',
    hero: 'answer-box',
    variant: 'A',
    motif: 'schema-tree',
    layoutVariant: 'B',
    accentToken: 'violet',
    labels: ['GEO', 'AEO CAPSULE', 'AI CITE'],
    alt: 'Ilustrasi kotak ekstraksi jawaban mesin pencari AI yang mengutip ringkasan terstruktur dan fakta terverifikasi bisnis lokal',
    altEn: 'Illustration of an AI answer engine extraction box citing structured answer capsules and verified local business facts',
    legacyImagePath: '/images/blog/geo-aeo-bisnis-lokal-ai.svg',
  },
  {
    coverId: 'cover-24-schema-markup-jsonld-tree',
    canonicalSlug: 'schema-markup-untuk-bisnis-lokal-panduan-praktis',
    enSlug: 'schema-markup-for-local-businesses-practical-guide',
    cluster: 'local-seo',
    hero: 'schema-tree',
    variant: 'A',
    motif: 'schema-tree',
    layoutVariant: 'C',
    accentToken: 'indigo',
    labels: ['JSON-LD', '@GRAPH', 'ENTITY'],
    alt: 'Pohon hierarki data terstruktur JSON-LD Schema.org yang menautkan LocalBusiness, Service, dan FAQPage tanpa duplikasi',
    altEn: 'Hierarchical Schema.org JSON-LD entity tree linking LocalBusiness, Service, and FAQPage nodes without duplication',
    legacyImagePath: '/images/blog/geo-aeo-bisnis-lokal-ai.svg',
  },

  // ============================================================================
  // CLUSTER 4: otomasi-dan-software -> automation (6 Bilingual Article Pairs)
  // ============================================================================
  {
    coverId: 'cover-25-wa-clinic-fnb-chat-calendar',
    canonicalSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    enSlug: 'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
    aliases: [
      'otomasi-whatsapp-ai-klinik-dan-fnb',
      'whatsapp-and-ai-automation-for-clinics-and-fnb',
    ],
    cluster: 'automation',
    hero: 'chat-to-calendar',
    variant: 'A',
    motif: 'wa-funnel',
    layoutVariant: 'A',
    accentToken: 'emerald',
    labels: ['WA CHAT', 'CALENDAR', 'REMINDER'],
    alt: 'Alur pesan masuk WhatsApp pelanggan klinik dan F&B yang tersinkronisasi otomatis ke kisi slot jadwal kalender reservasi',
    altEn: 'Customer WhatsApp message stream for clinics and F&B syncing automatically into a reservation calendar slot grid',
    legacyImagePath: '/images/blog/otomasi-whatsapp-ai-klinik-fnb.svg',
  },
  {
    coverId: 'cover-26-workflow-n8n-make-pipe',
    canonicalSlug: 'otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif',
    enSlug: 'business-workflow-automation-n8n-make-repetitive-tasks',
    cluster: 'automation',
    hero: 'webhook-pipe',
    variant: 'B',
    motif: 'pipeline-flow',
    layoutVariant: 'B',
    accentToken: 'violet',
    labels: ['TRIGGER', 'N8N / MAKE', 'SYNC DB'],
    alt: 'Pipa orkestrasi workflow otomatis menggunakan n8n dan Make untuk menyinkronkan formulir, spreadsheet, dan notifikasi tim',
    altEn: 'Automated workflow orchestration pipeline using n8n and Make to synchronize forms, spreadsheets, and team notifications',
    legacyImagePath: '/images/blog/otomasi-workflow-n8n-make.svg',
  },
  {
    coverId: 'cover-27-automation-stack-vendor-matrix',
    canonicalSlug: 'n8n-make-zapier-kode-custom-pilih-otomasi',
    enSlug: 'n8n-make-zapier-custom-code-automation-guide',
    cluster: 'automation',
    hero: 'vendor-matrix',
    variant: 'A',
    motif: 'vendor-scorecard',
    layoutVariant: 'C',
    accentToken: 'amber',
    labels: ['NO-CODE', 'SELF-HOST', 'CUSTOM JS'],
    alt: 'Matriks keputusan pemilihan arsitektur otomasi antara Zapier, Make, n8n self-hosted, dan layanan kode custom Node.js',
    altEn: 'Decision matrix comparing automation architectures across Zapier, Make, self-hosted n8n, and custom Node.js services',
    legacyImagePath: '/images/blog/otomasi-workflow-n8n-make.svg',
  },
  {
    coverId: 'cover-28-cafe-dashboard-kpi-grid',
    canonicalSlug: 'dashboard-untuk-pemilik-kafe-metrik-operasional',
    enSlug: 'dashboards-for-cafe-owners-operational-metrics',
    cluster: 'automation',
    hero: 'kpi-grid',
    variant: 'A',
    motif: 'roi-timeline',
    layoutVariant: 'A',
    accentToken: 'cyan',
    labels: ['HOURLY POS', 'COGS %', 'STOCK'],
    alt: 'Kisi antarmuka dashboard operasional kafe yang menampilkan grafik penjualan per jam, rasio HPP bahan, dan stok kritis',
    altEn: 'Cafe operational dashboard interface grid displaying hourly POS revenue, ingredient COGS ratio, and critical stock alerts',
    legacyImagePath: '/images/portfolio/dashboard-logistik-tangsel.svg',
  },
  {
    coverId: 'cover-29-invoice-billing-doc-table',
    canonicalSlug: 'otomasi-invoice-dan-penagihan-jasa-profesional',
    enSlug: 'invoice-and-billing-automation-for-professional-services',
    cluster: 'automation',
    hero: 'doc-to-table',
    variant: 'A',
    motif: 'pipeline-flow',
    layoutVariant: 'C',
    accentToken: 'indigo',
    labels: ['INVOICE', 'WA REMIND', 'RECONCILE'],
    alt: 'Transformasi otomatis dokumen kontrak kerja menjadi baris tabel penagihan invoice dan jadwal pengingat jatuh tempo',
    altEn: 'Automated transformation of service contracts into structured invoice billing rows and scheduled payment reminder queues',
    legacyImagePath: '/images/blog/otomasi-workflow-n8n-make.svg',
  },
  {
    coverId: 'cover-30-webhooks-apis-event-pipe',
    canonicalSlug: 'webhook-dan-api-otomasi-antar-aplikasi-bisnis',
    enSlug: 'webhooks-and-apis-cross-app-automation-business',
    cluster: 'automation',
    hero: 'webhook-pipe',
    variant: 'A',
    motif: 'pipeline-flow',
    layoutVariant: 'D',
    accentToken: 'rose',
    labels: ['EVENT PUSH', 'REST API', '200 OK'],
    alt: 'Skema pengiriman event real-time melalui jalur webhook dan permintaan REST API antar-aplikasi operasional bisnis',
    altEn: 'Schematic of real-time event delivery through webhook pipelines and REST API requests across business applications',
    legacyImagePath: '/images/blog/cluster-automation-software.svg',
  },

  // ============================================================================
  // CLUSTER 5: biaya-dan-memilih-vendor -> pricing-vendor (5 Bilingual Pairs)
  // ============================================================================
  {
    coverId: 'cover-31-website-cost-price-tiers',
    canonicalSlug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    enSlug: 'how-much-does-a-business-website-cost-pricing-guide',
    cluster: 'pricing-vendor',
    hero: 'price-tiers',
    variant: 'A',
    motif: 'cost-breakdown',
    layoutVariant: 'A',
    accentToken: 'amber',
    labels: ['LANDING', 'COMPANY', 'CUSTOM WEB'],
    alt: 'Diagram tingkatan komponen biaya pembuatan website bisnis berdasarkan kompleksitas halaman, fitur, dan integrasi sistem',
    altEn: 'Tiered cost breakdown diagram for business website development scaled by page complexity, features, and integrations',
    legacyImagePath: '/images/blog/biaya-bikin-website-bisnis.svg',
  },
  {
    coverId: 'cover-32-vibe-coding-before-after',
    canonicalSlug: 'vibe-coding-untuk-bisnis-kapan-cukup-kapan-berbahaya',
    enSlug: 'vibe-coding-for-business-when-enough-when-dangerous',
    cluster: 'pricing-vendor',
    hero: 'before-after',
    variant: 'A',
    motif: 'architecture-stack',
    layoutVariant: 'C',
    accentToken: 'rose',
    labels: ['PROTOTYPE', 'AUTH AUDIT', 'PRODUCTION'],
    alt: 'Perbandingan tahapan prototipe instan hasil vibe coding melawan arsitektur aplikasi produksi yang telah diaudit keamanannya',
    altEn: 'Stage comparison between an instant vibe-coded prototype and a security-audited production software architecture',
    legacyImagePath: '/images/blog/vibe-coding-bisnis-aman.svg',
  },
  {
    coverId: 'cover-33-maintenance-cost-wrench-calendar',
    canonicalSlug: 'biaya-rawat-website-dan-sistem-setelah-rilis',
    enSlug: 'website-and-system-maintenance-costs-after-launch',
    cluster: 'pricing-vendor',
    hero: 'wrench-calendar',
    variant: 'A',
    motif: 'roi-timeline',
    layoutVariant: 'D',
    accentToken: 'indigo',
    labels: ['DOMAIN SSL', 'CLOUD VPS', 'PATCH SLA'],
    alt: 'Ilustrasi roda gigi pemeliharaan teknis di samping kalender jadwal pembaruan keamanan, backup, dan perpanjangan server',
    altEn: 'Technical maintenance gear beside a calendar grid scheduling security patches, automated backups, and server renewals',
    legacyImagePath: '/images/blog/vibe-coding-bisnis-aman.svg',
  },
  {
    coverId: 'cover-34-choose-vendor-question-checklist',
    canonicalSlug: 'cara-memilih-jasa-pembuatan-website-tangerang-selatan',
    enSlug: 'how-to-choose-web-development-service-south-tangerang',
    cluster: 'pricing-vendor',
    hero: 'question-checklist',
    variant: 'A',
    motif: 'vendor-scorecard',
    layoutVariant: 'B',
    accentToken: 'emerald',
    labels: ['12 CHECKS', 'REPO ACCESS', 'SLA'],
    alt: 'Diagram dua belas titik verifikasi uji tuntas untuk mengevaluasi kredibilitas vendor pembuatan website dan kepemilikan aset',
    altEn: 'Twelve due-diligence verification nodes around a web blueprint for evaluating agency credibility and asset ownership',
    legacyImagePath: '/images/blog/biaya-bikin-website-bisnis.svg',
  },
  {
    coverId: 'cover-35-monthly-ai-cost-usage-meter',
    canonicalSlug: 'biaya-operasional-bulanan-ai-agent-bisnis',
    enSlug: 'monthly-operating-costs-ai-agents-business',
    cluster: 'pricing-vendor',
    hero: 'usage-meter',
    variant: 'A',
    motif: 'cost-breakdown',
    layoutVariant: 'C',
    accentToken: 'cyan',
    labels: ['LLM TOKENS', 'WA SESSION', 'SERVER'],
    alt: 'Meteran pemakaian bulanan operasional AI agent yang merinci kuota token model bahasa, biaya percakapan WA, dan cloud',
    altEn: 'Monthly AI agent operating usage meter detailing language model token quotas, WhatsApp session fees, and cloud hosting',
    legacyImagePath: '/images/blog/cluster-cost-vendor.svg',
  },
];

export const ALL_CANONICAL_COVER_SPECS: CoverSpec[] = RAW_COVER_ENTRIES.map(
  (entry) => ({
    coverId: entry.coverId,
    canonicalSlug: entry.canonicalSlug,
    enSlug: entry.enSlug,
    cluster: entry.cluster,
    hero: entry.hero,
    variant: entry.variant,
    motif: entry.motif,
    layoutVariant: entry.layoutVariant,
    accentToken: entry.accentToken,
    seed: fnv1a32(entry.canonicalSlug),
    labels: entry.labels,
    alt: entry.alt,
    altEn: entry.altEn,
    overrideFile: entry.overrideFile,
    legacyImagePath: entry.legacyImagePath,
  })
);

const SLUG_TO_COVER_SPEC_MAP = new Map<string, CoverSpec>();

for (let i = 0; i < RAW_COVER_ENTRIES.length; i++) {
  const raw = RAW_COVER_ENTRIES[i];
  const spec = ALL_CANONICAL_COVER_SPECS[i];
  SLUG_TO_COVER_SPEC_MAP.set(raw.canonicalSlug.toLowerCase(), spec);
  SLUG_TO_COVER_SPEC_MAP.set(raw.enSlug.toLowerCase(), spec);
  if (raw.aliases) {
    for (const alias of raw.aliases) {
      SLUG_TO_COVER_SPEC_MAP.set(alias.toLowerCase(), spec);
    }
  }
}

/**
 * Resolves the CoverSpec for any Indonesian, English, or legacy alias blog slug.
 * If a future post is added without a pre-registered entry, deterministically
 * derives a non-colliding CoverSpec from its slug hash.
 */
export function resolveCoverSpecForSlug(
  slug: string,
  fallbackTitle = ''
): CoverSpec {
  const normalized = (slug || '').trim().toLowerCase();
  const existing = SLUG_TO_COVER_SPEC_MAP.get(normalized);
  if (existing) {
    return existing;
  }

  const seed = fnv1a32(normalized || 'default-slug');
  const heroes: CoverHeroId[] = [
    'loop-steps',
    'speed-gauge',
    'three-gauges',
    'price-tiers',
    'cost-bars',
    'usage-meter',
    'wrench-calendar',
    'chat-to-calendar',
    'page-checklist',
    'question-checklist',
    'area-network',
    'compare-two',
    'compare-frames',
    'before-after',
    'doc-to-table',
    'doc-search',
    'usb-ports',
    'kpi-grid',
    'memory-layers',
    'shield-gate',
    'eval-matrix',
    'handoff-bridge',
    'consent-flow',
    'webhook-pipe',
    'sheet-to-app',
    'map-card',
    'schema-tree',
    'answer-box',
    'form-to-wa',
    'vitals-trio',
    'https-lock',
    'vendor-matrix',
  ];
  const motifs: CoverMotifFamily[] = [
    'node-graph',
    'rag-vector',
    'security-shield',
    'pipeline-flow',
    'wa-funnel',
    'vitals-gauge',
    'conversion-funnel',
    'architecture-stack',
    'map-pins-bsd',
    'schema-tree',
    'cost-breakdown',
    'vendor-scorecard',
    'roi-timeline',
  ];
  const layouts: CoverLayoutVariant[] = ['A', 'B', 'C', 'D'];
  const accents: CoverAccentToken[] = [
    'violet',
    'cyan',
    'emerald',
    'amber',
    'rose',
    'indigo',
  ];

  const hero = heroes[seed % heroes.length];
  const variant: CoverVariant = ((seed >>> 5) & 1) === 0 ? 'A' : 'B';
  const motif = motifs[(seed >>> 7) % motifs.length];
  const layoutVariant = layouts[(seed >>> 11) % layouts.length];
  const accentToken = accents[(seed >>> 15) % accents.length];

  const cleanTitle = (fallbackTitle || normalized.replace(/-/g, ' ')).slice(0, 52);

  return {
    coverId: `cover-auto-${normalized.slice(0, 36)}`,
    canonicalSlug: normalized,
    enSlug: normalized,
    cluster: 'agentic-ai',
    hero,
    variant,
    motif,
    layoutVariant,
    accentToken,
    seed,
    labels: ['SYSTEM', 'WORKFLOW', 'METRICS'],
    alt: `Diagram teknis dan ilustrasi alur sistem untuk artikel ${cleanTitle} pada blog CHESTAADOTCOM`.slice(0, 120),
    altEn: `Technical diagram and system workflow illustration for the ${cleanTitle} guide on CHESTAADOTCOM`.slice(0, 120),
  };
}

export function getCoverSvgPathForSpec(spec: CoverSpec): string {
  if (spec.overrideFile) {
    return `/images/blog/${spec.overrideFile}`;
  }
  return `/images/blog/covers/${spec.canonicalSlug}.svg`;
}

export function getOgSvgPathForPost(
  slug: string,
  locale: 'id' | 'en' = 'id'
): string {
  const cleanSlug = (slug || '').trim().toLowerCase();
  return `/images/og/blog/${locale}/${cleanSlug}.svg`;
}
