/**
 * ============================================================================
 * CENTRAL IMAGE CONFIGURATION — CHESTAADOTCOM
 * ============================================================================
 * Visual System: White + Purple Apple-Minimal (#FFFFFF, #F8F6FE, #EFEAFB, #7C54E0)
 *
 * Cara mengganti gambar (How to swap any image):
 * 1. Unggah file gambar baru (.avif / .webp / .jpg / .png / .svg) ke `/public/images/...`
 * 2. Atau ubah nilai `src` dan `alt` pada objek `SITE_IMAGES` di bawah ini.
 * 3. Jika file gagal dimuat, komponen `<ImageWithFallback>` / `<SmartImage>` otomatis
 *    menampilkan fallback bergradien lavender lembut (#F8F6FE) dengan aksen ungu (#7C54E0).
 */

export interface SiteImageAsset {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: '4:3' | '16:9' | '1200:630' | '1:1';
  caption?: string;
  placeholderColor?: string;
}

export const SITE_IMAGES: Record<string, SiteImageAsset> = {
  // Default OpenGraph & Twitter Card Image (1200x630)
  ogDefault: {
    key: 'ogDefault',
    src: '/images/og-default.svg',
    alt: 'CHESTAADOTCOM — Jasa Software Custom & AI Agent untuk Bisnis di BSD & Tangerang Selatan',
    width: 1200,
    height: 630,
    aspectRatio: '1200:630',
    placeholderColor: '#F8F6FE',
  },

  // Service Image Keys (16:9)
  serviceWebLandingPage: {
    key: 'serviceWebLandingPage',
    src: '/images/blog/landing-page-lambat-iklan-boncos.svg',
    alt: 'Ilustrasi pembuatan web dan landing page konversi tinggi untuk bisnis di BSD & Tangerang Selatan',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  serviceAiAgent: {
    key: 'serviceAiAgent',
    src: '/images/blog/otomasi-whatsapp-ai-klinik-fnb.svg',
    alt: 'Ilustrasi AI agent WhatsApp dan CRM yang mengeksekusi jadwal dan database otomatis',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  serviceSoftwareCustom: {
    key: 'serviceSoftwareCustom',
    src: '/images/portfolio/dashboard-logistik-tangsel.svg',
    alt: 'Ilustrasi aplikasi web dan dashboard operasional custom untuk bisnis di Jabodetabek',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  serviceOtomasiWorkflow: {
    key: 'serviceOtomasiWorkflow',
    src: '/images/portfolio/fnb-reservasi-wa-tangsel.svg',
    alt: 'Ilustrasi integrasi otomasi workflow antar-aplikasi bisnis tanpa salin manual',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 1 — Pillar Post (16:9)
  blogLandingPageSpeed: {
    key: 'blogLandingPageSpeed',
    src: '/images/blog/landing-page-lambat-iklan-boncos.svg',
    alt: 'Ilustrasi arsitektur kecepatan landing page dan efisiensi biaya iklan untuk bisnis di BSD dan Tangerang Selatan',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 2 — Website Cost Guide (16:9)
  blogWebsiteCost: {
    key: 'blogWebsiteCost',
    src: '/images/blog/biaya-bikin-website-bisnis.svg',
    alt: 'Panduan rincian biaya pembuatan website bisnis, landing page, dan sistem custom mulai dari Rp1.200.000',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 3 — WhatsApp & AI Automation for Clinic & F&B (16:9)
  blogWhatsappAiClinicFnb: {
    key: 'blogWhatsappAiClinicFnb',
    src: '/images/blog/otomasi-whatsapp-ai-klinik-fnb.svg',
    alt: 'Diagram alur kerja AI agent WhatsApp dan sistem CRM untuk reservasi klinik serta pesanan F&B',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 4 — High-Converting Landing Page Checklist (16:9)
  blogLandingPageChecklist: {
    key: 'blogLandingPageChecklist',
    src: '/images/blog/checklist-landing-page-konversi.svg',
    alt: 'Checklist struktur landing page konversi tinggi untuk bisnis jasa profesional dan klinik',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 5 — Local SEO BSD & Tangerang Selatan (16:9)
  blogLocalSeoBsd: {
    key: 'blogLocalSeoBsd',
    src: '/images/blog/seo-lokal-bsd-tangerang-selatan.svg',
    alt: 'Strategi optimasi SEO lokal dan AI search presence untuk bisnis di BSD City, Alam Sutera, Bintaro, dan Gading Serpong',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 6 — AI Agent vs Chatbot (16:9)
  blogAiAgentVsChatbot: {
    key: 'blogAiAgentVsChatbot',
    src: '/images/blog/ai-agent-vs-chatbot-bisnis.svg',
    alt: 'Diagram perbandingan arsitektur AI Agent dengan loop eksekusi tool vs chatbot berbasis aturan statis untuk bisnis',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 7 — MCP (Model Context Protocol) for Business Owners (16:9)
  blogMcpBusinessGuide: {
    key: 'blogMcpBusinessGuide',
    src: '/images/blog/mcp-model-context-protocol-bisnis.svg',
    alt: 'Ilustrasi cara kerja Model Context Protocol (MCP) menghubungkan AI Agent ke kalender, spreadsheet, dan database bisnis',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 8 — Vibe Coding for Business (16:9)
  blogVibeCodingBusiness: {
    key: 'blogVibeCodingBusiness',
    src: '/images/blog/vibe-coding-bisnis-aman.svg',
    alt: 'Panduan batas aman vibe coding buatan AI untuk prototipe vs rekayasa software custom produksi yang aman',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 9 — GEO & AEO for Local Business (16:9)
  blogGeoAeoLocalBusiness: {
    key: 'blogGeoAeoLocalBusiness',
    src: '/images/blog/geo-aeo-bisnis-lokal-ai.svg',
    alt: 'Kerangka kerja GEO dan AEO agar bisnis lokal muncul di jawaban ChatGPT, Google Gemini, dan Perplexity',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // Blog Cover 10 — Workflow Automation n8n & Make (16:9)
  blogWorkflowAutomationN8n: {
    key: 'blogWorkflowAutomationN8n',
    src: '/images/blog/otomasi-workflow-n8n-make.svg',
    alt: 'Alur kerja otomasi bisnis menggunakan n8n dan Make untuk menyambungkan form web, Google Sheets, invoice, dan WhatsApp',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  // ==========================================================================
  // PORTFOLIO PROJECT COVERS (4:3 — 1200x900) & GALLERY VISUALS
  // Clearly marked as prototypes in the White + Purple palette
  // ==========================================================================

  // 1. Clinic AI Booking & WhatsApp Agent (Featured #1)
  portfolioClinicPlaceholder: {
    key: 'portfolioClinicPlaceholder',
    src: '/images/portfolio/klinik-estetika-bsd.svg',
    alt: 'Tampilan asisten WhatsApp AI dan sinkronisasi jadwal dokter untuk klinik estetika di BSD City',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // 2. Logistics Operational & Dispatch Dashboard (Featured #2)
  portfolioLogisticsDashboard: {
    key: 'portfolioLogisticsDashboard',
    src: '/images/portfolio/dashboard-logistik-tangsel.svg',
    alt: 'Tampilan dashboard operasional pemantauan armada dan rekap surat jalan otomatis di Tangerang Selatan',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // 3. Property Residential Cluster Landing Page & KPR Calculator
  portfolioPropertyPlaceholder: {
    key: 'portfolioPropertyPlaceholder',
    src: '/images/portfolio/properti-interior-bintaro.svg',
    alt: 'Tampilan landing page klaster hunian Bintaro dengan kalkulator KPR interaktif dan jadwal kunjungan WhatsApp',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // 4. F&B Multi-Branch POS Reconciliation & WhatsApp Report Workflow
  portfolioFnbPlaceholder: {
    key: 'portfolioFnbPlaceholder',
    src: '/images/portfolio/fnb-reservasi-wa-tangsel.svg',
    alt: 'Tampilan alur otomasi n8n penarikan laporan kasir POS multi-cabang F&B di Gading Serpong ke WhatsApp owner',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // 5. Manufacturing Inventory & Internal PO Approval System
  portfolioErpInventory: {
    key: 'portfolioErpInventory',
    src: '/images/portfolio/sistem-inventaris-erp-manufaktur.svg',
    alt: 'Tampilan sistem inventaris gudang dan persetujuan Purchase Order internal berbasis web custom',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // 6. B2B Consultant Lead Qualification AI Agent
  portfolioConsultantAgent: {
    key: 'portfolioConsultantAgent',
    src: '/images/portfolio/asisten-kualifikasi-klien-konsultan.svg',
    alt: 'Tampilan agen WhatsApp penyaring kebutuhan calon klien B2B dan penjadwalan sesi konsultasi otomatis',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  // Portfolio Shared Detail Gallery Screens (Full-Width 16:9 & Half-Width 4:3)
  portfolioGalleryArchitecture: {
    key: 'portfolioGalleryArchitecture',
    src: '/images/portfolio/gallery-architecture-diagram.svg',
    alt: 'Diagram arsitektur alur data, validasi aturan bisnis, dan penyimpanan database',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    placeholderColor: '#F8F6FE',
  },

  portfolioGalleryAnalytics: {
    key: 'portfolioGalleryAnalytics',
    src: '/images/portfolio/gallery-analytics-table.svg',
    alt: 'Panel metrik harian dan pencatatan audit log eksekusi sistem secara real-time',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  },

  portfolioGalleryMobileHandover: {
    key: 'portfolioGalleryMobileHandover',
    src: '/images/portfolio/gallery-mobile-handover.svg',
    alt: 'Tampilan antarmuka mobile responsif dan ringkasan konteks serah terima ke staf manusia',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#EFEAFB',
  },
};

export function getImageAsset(keyOrPath: string): SiteImageAsset {
  if (SITE_IMAGES[keyOrPath]) {
    return SITE_IMAGES[keyOrPath];
  }
  const found = Object.values(SITE_IMAGES).find((item) => item.src === keyOrPath);
  if (found) {
    return found;
  }
  return {
    key: 'custom',
    src: keyOrPath || SITE_IMAGES.ogDefault.src,
    alt: 'Visualisasi software custom dan AI agent CHESTAADOTCOM',
    width: 1200,
    height: 900,
    aspectRatio: '4:3',
    placeholderColor: '#F8F6FE',
  };
}
