/**
 * ============================================================================
 * SHARED INTERNAL DEMO DATASET: data/projects — CHESTAADOTCOM
 * ============================================================================
 * Internal demo content rule:
 * - Every project in this site is an INTERNAL CHESTAADOTCOM project.
 * - Common fields for every entry:
 *   client: "Proyek internal CHESTAADOTCOM" (EN: "CHESTAADOTCOM internal project")
 *   year: 2026
 *   internal: true
 *   role: "Desain, pengembangan, dan pengujian"
 *   coverKey: from src/config/images.ts (labeled "Ilustrasi" / "Illustration")
 * - Targets are labeled "Target desain" ("Design target").
 * - Never present as client work; never invent client names, testimonials, ratings, or measured results.
 *
 * HOW TO REPLACE AN INTERNAL PROJECT WITH A REAL CLIENT PROJECT LATER:
 * 1. Obtain written permission from the client to publish the project name, scope, and verified results.
 * 2. In `src/data/projects.ts` and `src/data/projects.en.ts`:
 *    - Change `internal` from `true` to `false` (update the type `internal: boolean`).
 *    - Update `internalBadgeLabel` to `"Proyek klien"` (EN: `"Client project"`).
 *    - Replace `client` with the verified client name (or agreed industry descriptor if under partial NDA).
 *    - Replace `coverKey` and `gallery` items in `src/config/images.ts` with real screenshots and update captions to remove `"Ilustrasi:"`.
 *    - Update `features[].metricOrTag` from `"Target desain: ..."` to the verified operational outcome.
 * 3. If a corresponding case study exists in `src/data/case-studies.ts`, update its `internal` flag, `targets` label, and author/date metadata accordingly.
 */

import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_CATEGORIES_EN } from './projects.en';

export type ProjectCategory = 'web' | 'ai-agent' | 'software' | 'otomasi';
export type ProjectServiceId =
  | 'pembuatan-website'
  | 'ai-agent'
  | 'software-custom'
  | 'otomasi-workflow';

export interface ProjectGalleryItem {
  imageKey: string;
  caption: string;
  label: string;
  layout: 'full' | 'half';
}

export interface ProjectFeatureItem {
  title: string;
  description: string;
  metricOrTag: string;
  highlightType: 'architecture' | 'workflow' | 'interface' | 'security';
}

export interface PortfolioProjectRaw {
  slug: string;
  title: string;
  oneLiner: string;
  category: ProjectCategory;
  categoryLabel: string;
  services: ProjectServiceId[];
  serviceSlug: ProjectServiceId;
  industry: string;
  client: string;
  year: string;
  yearNumeric: number;
  internal: boolean;
  internalBadgeLabel: string;
  role: string;
  duration: string;
  stack: string[];
  cover: string;
  coverKey: string;
  alt: string;
  deviceFrame: 'browser' | 'phone';
  gallery: ProjectGalleryItem[];
  summaryParagraphs: [string, string];
  features: ProjectFeatureItem[];
  liveUrl?: string;
  liveStatusLabel?: string;
  relatedCaseSlug?: string;
  caseStudySlug?: string;
  featured: boolean;
  draft: boolean;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface PortfolioProject extends PortfolioProjectRaw {
  targetNote: string;
  outcomesLabel: string;
  outcomes: string[];
  problem: string;
  solution: string;
  howItWorks: string[];
}

export function enrichPortfolioProject(
  raw: PortfolioProjectRaw,
  locale: 'id' | 'en' = 'id'
): PortfolioProject {
  const outcomesLabel = locale === 'en' ? 'Design target' : 'Target desain';
  const outcomes = raw.features.map((f) => `${f.title}: ${f.description}`);
  const targetNote =
    raw.features[0]?.metricOrTag ||
    (locale === 'en'
      ? `Design target: ${raw.oneLiner}`
      : `Target desain: ${raw.oneLiner}`);
  return {
    ...raw,
    relatedCaseSlug: raw.relatedCaseSlug || raw.caseStudySlug,
    caseStudySlug: raw.caseStudySlug || raw.relatedCaseSlug,
    targetNote,
    outcomesLabel,
    outcomes,
    problem: raw.summaryParagraphs[0],
    solution: raw.summaryParagraphs[1],
    howItWorks: raw.features.map((f) => `${f.title} — ${f.description}`),
  };
}

export const PORTFOLIO_CATEGORIES: Array<{
  id: 'semua' | ProjectCategory;
  label: string;
}> = [
  { id: 'semua', label: 'Semua' },
  { id: 'web', label: 'Web & Landing Page' },
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'software', label: 'Software Custom' },
  { id: 'otomasi', label: 'Otomasi Workflow' },
];

const RAW_PORTFOLIO_PROJECTS: PortfolioProjectRaw[] = [
  // 1. wa-concierge-klinik
  {
    slug: 'wa-concierge-klinik',
    title: 'WA Concierge: agen booking WhatsApp untuk klinik',
    oneLiner:
      'Menjawab pertanyaan perawatan, mengecek slot terapis, dan membuat booking dari percakapan WhatsApp.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent',
    services: ['ai-agent'],
    serviceSlug: 'ai-agent',
    industry: 'Klinik',
    client: 'Proyek internal CHESTAADOTCOM',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    role: 'Desain, pengembangan, dan pengujian',
    duration: 'Proyek internal',
    stack: ['WhatsApp Business Platform', 'Kalender Terapis', 'Database CRM', 'Log Tindakan'],
    cover: 'projectWaConciergeKlinik',
    coverKey: 'projectWaConciergeKlinik',
    alt: 'Ilustrasi proyek internal WA Concierge agen booking WhatsApp untuk klinik dengan pengecekan slot terapis',
    deviceFrame: 'phone',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: alur pesan dari pertanyaan perawatan, pengecekan kalender terapis, pembuatan booking, hingga pencatatan ke CRM.',
        layout: 'full',
      },
      {
        imageKey: 'projectWaConciergeKlinik',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: percakapan WhatsApp saat mengecek jam perawatan yang tersedia dan mengirim konfirmasi jadwal.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: ringkasan percakapan yang diteruskan ke staf klinik ketika kasus berada di luar aturan agent.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'WA Concierge adalah proyek internal CHESTAADOTCOM yang dirancang untuk menunjukkan cara AI agent membaca maksud calon pasien di WhatsApp, mengecek slot kalender terapis, membuat booking, mencatat data ke CRM, dan mengirim pengingat sehari sebelumnya.',
      'Sistem ini dilengkapi batas tindakan dan aturan serah ke manusia: pertanyaan di luar aturan atau keluhan khusus diteruskan ke staf klinik beserta ringkasan percakapan, dan setiap tindakan agent punya log yang bisa diperiksa.',
    ],
    features: [
      {
        title: 'Pemahaman Maksud & Katalog Perawatan',
        description:
          'Membaca pertanyaan bahasa sehari-hari dari calon pasien dan mencocokkannya dengan daftar perawatan, durasi sesi, serta kisaran harga yang berlaku.',
        metricOrTag: 'Target desain: baca maksud chat bebas',
        highlightType: 'interface',
      },
      {
        title: 'Pengecekan Slot Kalender Terapis',
        description:
          'Agent memeriksa ketersediaan jadwal terapis di kalender sebelum menawarkan pilihan jam perawatan di chat WhatsApp.',
        metricOrTag: 'Target desain: jadwal tidak bentrok',
        highlightType: 'architecture',
      },
      {
        title: 'Batas Tindakan & Serah ke Staf',
        description:
          'Mematuhi aturan tindakan yang ditentukan bersama dan meneruskan kasus di luar aturan ke staf lengkap dengan ringkasan percakapan.',
        metricOrTag: 'Target desain: serah ke manusia + ringkasan',
        highlightType: 'security',
      },
      {
        title: 'Konfirmasi Booking & Pengingat H-1',
        description:
          'Membuat booking, mencatatnya ke CRM, dan menjadwalkan pesan pengingat sehari sebelum jadwal perawatan.',
        metricOrTag: 'Target desain: pengingat H-1 otomatis',
        highlightType: 'workflow',
      },
      {
        title: 'Log Semua Tindakan',
        description:
          'Setiap pemanggilan tool dan balasan tercatat dalam log sehingga pemilik maupun admin klinik dapat memeriksanya kapan saja.',
        metricOrTag: 'Target desain: log tindakan lengkap',
        highlightType: 'interface',
      },
    ],
    liveStatusLabel: 'Proyek internal (Target desain)',
    relatedCaseSlug: 'wa-concierge-klinik',
    caseStudySlug: 'wa-concierge-klinik',
    featured: true,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'WA Concierge Agen Booking Klinik — Proyek Internal | CHESTAADOTCOM',
      description:
        'Proyek internal CHESTAADOTCOM: agen booking WhatsApp untuk klinik yang menjawab pertanyaan perawatan, mengecek slot terapis, dan membuat booking.',
    },
  },

  // 2. dashboard-kafe
  {
    slug: 'dashboard-kafe',
    title: 'Dashboard Operasional Kafe',
    oneLiner:
      'Stok bahan, penjualan harian, dan laporan beberapa cabang dalam satu dashboard.',
    category: 'software',
    categoryLabel: 'Software Custom',
    services: ['software-custom'],
    serviceSlug: 'software-custom',
    industry: 'F&B',
    client: 'Proyek internal CHESTAADOTCOM',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    role: 'Desain, pengembangan, dan pengujian',
    duration: 'Proyek internal',
    stack: ['Aplikasi Web', 'Hak Akses Per Peran', 'Database Terpusat', 'Dashboard Laporan'],
    cover: 'projectDashboardKafe',
    coverKey: 'projectDashboardKafe',
    alt: 'Ilustrasi proyek internal Dashboard Operasional Kafe untuk memantau stok bahan dan penjualan harian cabang',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectDashboardKafe',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: ringkasan penjualan harian dan indikator stok bahan di beberapa cabang kafe.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: tampilan perbandingan cabang dan catatan keluar-masuk bahan baku.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: pengaturan login dan hak akses per peran antara pemilik, manajer, dan staf cabang.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Dashboard Operasional Kafe adalah proyek internal CHESTAADOTCOM yang menunjukkan bagaimana aplikasi web custom menggantikan spreadsheet yang makin berat untuk usaha F&B dengan beberapa cabang.',
      'Staf tiap cabang mencatat stok bahan dan penjualan harian dari HP atau desktop sesuai hak akses perannya, sementara pemilik melihat laporan gabungan yang diperbarui dari data yang sama.',
    ],
    features: [
      {
        title: 'Stok Bahan & Penjualan Beberapa Cabang',
        description:
          'Menyatukan catatan stok bahan baku dan rekap penjualan harian dari tiap cabang ke dalam satu dashboard.',
        metricOrTag: 'Target desain: satu sumber data',
        highlightType: 'interface',
      },
      {
        title: 'Login & Hak Akses per Peran',
        description:
          'Memisahkan hak akses antara pemilik, manajer, dan staf cabang agar tiap pengguna hanya mengakses bagian kerjanya.',
        metricOrTag: 'Target desain: akses dibatasi per peran',
        highlightType: 'security',
      },
      {
        title: 'Peringatan Batas Stok Minimum',
        description:
          'Menandai bahan baku yang mendekati batas minimum per cabang agar pemesanan ulang tidak terlambat.',
        metricOrTag: 'Target desain: indikator stok menipis',
        highlightType: 'workflow',
      },
      {
        title: 'Responsif di HP dan Desktop',
        description:
          'Nyaman dibuka oleh staf dapur atau kasir lewat HP maupun oleh pemilik saat memeriksa laporan di laptop.',
        metricOrTag: 'Target desain: nyaman di HP & desktop',
        highlightType: 'architecture',
      },
      {
        title: 'Riwayat Perubahan & Ekspor Laporan',
        description:
          'Mencatat siapa yang memperbarui angka stok harian dan menyediakan unduhan rekap bulanan.',
        metricOrTag: 'Target desain: jejak input tercatat',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Proyek internal (Target desain)',
    relatedCaseSlug: 'dashboard-kafe',
    caseStudySlug: 'dashboard-kafe',
    featured: true,
    draft: false,
    updatedAt: '2026-03-24',
    seo: {
      title: 'Dashboard Operasional Kafe — Proyek Internal | CHESTAADOTCOM',
      description:
        'Proyek internal CHESTAADOTCOM: dashboard web untuk memantau stok bahan, penjualan harian, dan laporan beberapa cabang kafe.',
    },
  },

  // 3. lead-properti
  {
    slug: 'lead-properti',
    title: 'Alur Lead Properti',
    oneLiner:
      'Lead dari formulir iklan masuk ke CRM, agen diberi tahu, dan follow-up terjadwal otomatis.',
    category: 'otomasi',
    categoryLabel: 'Otomasi Workflow',
    services: ['otomasi-workflow'],
    serviceSlug: 'otomasi-workflow',
    industry: 'Properti',
    client: 'Proyek internal CHESTAADOTCOM',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    role: 'Desain, pengembangan, dan pengujian',
    duration: 'Proyek internal',
    stack: ['Formulir Iklan', 'CRM & Sheets', 'Notifikasi WhatsApp', 'Log Eksekusi'],
    cover: 'projectLeadProperti',
    coverKey: 'projectLeadProperti',
    alt: 'Ilustrasi proyek internal Alur Lead Properti dari formulir iklan ke CRM dan jadwal follow-up otomatis',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectLeadProperti',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: alur otomatis dari formulir minat pembeli ke pencatatan CRM dan notifikasi agen yang bertugas.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: diagram alur kerja lengkap dengan penanganan error dan notifikasi saat ada langkah yang gagal.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: log eksekusi yang mencatat setiap data masuk dan pengiriman pengingat follow-up.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Alur Lead Properti adalah proyek internal CHESTAADOTCOM untuk memperlihatkan otomasi workflow yang menyambungkan formulir iklan properti langsung ke CRM, Google Sheets, dan notifikasi WhatsApp agen.',
      'Tanpa perlu menyalin data calon pembeli secara manual antar aplikasi, setiap formulir yang masuk tercatat otomatis, agen yang bertugas langsung diberi tahu, jadwal follow-up dibuat, dan kegagalan langkah apa pun memicu notifikasi beserta log eksekusi.',
    ],
    features: [
      {
        title: 'Formulir Iklan Langsung ke CRM',
        description:
          'Mencatat nama, kontak, dan tipe unit yang diminati calon pembeli dari formulir iklan langsung ke CRM tanpa salin manual.',
        metricOrTag: 'Target desain: 0 langkah pencatatan manual',
        highlightType: 'workflow',
      },
      {
        title: 'Pembagian Agen & Notifikasi Instan',
        description:
          'Membagi lead ke agen yang bertugas sesuai giliran dan mengirim notifikasi WhatsApp berisi ringkasan minat pembeli.',
        metricOrTag: 'Target desain: notifikasi ke agen < 1 menit',
        highlightType: 'architecture',
      },
      {
        title: 'Pengingat Follow-Up H+1 dan H+3',
        description:
          'Menjadwalkan pengingat otomatis pada H+1 dan H+3 apabila status lead di CRM belum diperbarui oleh agen.',
        metricOrTag: 'Target desain: jadwal follow-up H+1 & H+3',
        highlightType: 'workflow',
      },
      {
        title: 'Penanganan Kegagalan & Log Eksekusi',
        description:
          'Dilengkapi notifikasi kalau ada langkah yang gagal dan log eksekusi yang bisa diperiksa kapan saja.',
        metricOrTag: 'Target desain: log & notifikasi error',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Proyek internal (Target desain)',
    relatedCaseSlug: 'lead-properti',
    caseStudySlug: 'lead-properti',
    featured: true,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'Alur Lead Properti Otomatis — Proyek Internal | CHESTAADOTCOM',
      description:
        'Proyek internal CHESTAADOTCOM: otomasi workflow yang memasukkan lead dari formulir iklan ke CRM, memberi tahu agen, dan menjadwalkan follow-up.',
    },
  },

  // 4. landing-klinik-estetika
  {
    slug: 'landing-klinik-estetika',
    title: 'Landing Page Klinik Estetika',
    oneLiner:
      'Halaman per perawatan dengan harga mulai dari, jadwal, dan booking via WhatsApp.',
    category: 'web',
    categoryLabel: 'Web & Landing Page',
    services: ['pembuatan-website'],
    serviceSlug: 'pembuatan-website',
    industry: 'Klinik',
    client: 'Proyek internal CHESTAADOTCOM',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    role: 'Desain, pengembangan, dan pengujian',
    duration: 'Proyek internal',
    stack: ['Halaman Statis', 'Optimasi Gambar', 'Data Terstruktur', 'Tombol WhatsApp'],
    cover: 'projectLandingKlinikEstetika',
    coverKey: 'projectLandingKlinikEstetika',
    alt: 'Ilustrasi proyek internal Landing Page Klinik Estetika dengan daftar perawatan, harga mulai dari, dan tombol WhatsApp',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectLandingKlinikEstetika',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: halaman per perawatan dengan rincian layanan, harga mulai dari, jadwal praktik, dan tombol booking WhatsApp.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: tampilan responsif di layar HP yang dirancang ringan dan cepat dibuka.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: struktur heading, SEO dasar, dan pelacakan asal pengunjung.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Landing Page Klinik Estetika adalah proyek internal CHESTAADOTCOM yang mendemonstrasikan struktur halaman tujuan iklan dan pencarian lokal untuk klinik perawatan.',
      'Setiap halaman perawatan disusun untuk menjawab pertanyaan calon pasien sebelum mereka bertanya—mulai dari penjelasan tindakan, harga mulai dari, hingga jadwal praktik—lengkap dengan tombol booking via WhatsApp tanpa banyak langkah.',
    ],
    features: [
      {
        title: 'Halaman Khusus per Perawatan',
        description:
          'Menampilkan informasi perawatan, harga mulai dari, dan jadwal praktik dengan satu tujuan jelas.',
        metricOrTag: 'Target desain: satu tujuan jelas per halaman',
        highlightType: 'interface',
      },
      {
        title: 'Cepat Dibuka di HP',
        description:
          'Halaman dibuat statis, gambar dikompres dengan ukuran tepat, dan skrip dipasang seperlunya.',
        metricOrTag: 'Target desain: diuji di PageSpeed Insights',
        highlightType: 'architecture',
      },
      {
        title: 'SEO Dasar & Data Terstruktur',
        description:
          'Dilengkapi judul dan deskripsi halaman, struktur heading rapi, sitemap, dan data terstruktur.',
        metricOrTag: 'Target desain: struktur SEO dasar rapi',
        highlightType: 'interface',
      },
      {
        title: 'Tombol Booking WhatsApp Terisi Otomatis',
        description:
          'Menyertakan pesan awal di tombol WhatsApp sesuai halaman perawatan yang sedang dibuka pengunjung.',
        metricOrTag: 'Target desain: booking langsung via WhatsApp',
        highlightType: 'workflow',
      },
    ],
    liveStatusLabel: 'Proyek internal (Target desain)',
    relatedCaseSlug: 'wa-concierge-klinik',
    caseStudySlug: 'wa-concierge-klinik',
    featured: true,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'Landing Page Klinik Estetika — Proyek Internal | CHESTAADOTCOM',
      description:
        'Proyek internal CHESTAADOTCOM: landing page klinik estetika per perawatan dengan harga mulai dari, jadwal praktik, dan booking via WhatsApp.',
    },
  },

  // 5. chestaa-v2
  {
    slug: 'chestaa-v2',
    title: 'Membangun ulang chestaa.com',
    oneLiner:
      'Situs dua bahasa yang statis dan cepat, dibangun ulang dengan fokus software dan AI agent.',
    category: 'web',
    categoryLabel: 'Web & Landing Page',
    services: ['pembuatan-website'],
    serviceSlug: 'pembuatan-website',
    industry: 'Agensi (situs sendiri)',
    client: 'Proyek internal CHESTAADOTCOM',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    role: 'Desain, pengembangan, dan pengujian',
    duration: 'Proyek internal',
    stack: ['Arsitektur Dua Bahasa', 'JSON-LD @graph', 'Sitemap & llms.txt', 'Core Web Vitals'],
    cover: 'projectChestaaV2',
    coverKey: 'projectChestaaV2',
    alt: 'Ilustrasi proyek internal membangun ulang situs dua bahasa chestaa.com yang statis dan cepat',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectChestaaV2',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: halaman layanan dan area lokal dua bahasa (/id dan /en) dengan ringkasan singkat di bagian atas.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: struktur JSON-LD @graph, hreflang timbal balik, serta pembangkit sitemap.xml dan llms.txt.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: tampilan mobile yang bersih dengan tab industri dan akordeon FAQ yang tetap terbaca tanpa JavaScript.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Membangun ulang chestaa.com adalah proyek internal situs kami sendiri di CHESTAADOTCOM, dirancang sebagai situs dua bahasa (/id dan /en) yang statis, cepat dibuka di HP, dan berfokus pada layanan pembuatan website, AI agent, software custom, serta otomasi workflow.',
      'Setiap halaman layanan dan area lokal diawali dengan ringkasan singkat yang langsung menjawab pertanyaan pembaca, dilengkapi struktur heading yang rapi, data terstruktur JSON-LD @graph, serta berkas sitemap dan llms.txt.',
    ],
    features: [
      {
        title: 'Situs Dua Bahasa (/id dan /en)',
        description:
          'Seluruh halaman layanan, area lokal, studi kasus, dan proyek internal tersedia dalam bahasa Indonesia dan Inggris secara 1:1.',
        metricOrTag: 'Target desain: hreflang timbal balik /id & /en',
        highlightType: 'architecture',
      },
      {
        title: 'Ringkasan Singkat & Data Terstruktur',
        description:
          'Menempatkan ringkasan 40–60 kata tepat setelah hero dan menyertakan satu grafik JSON-LD lengkap di setiap halaman.',
        metricOrTag: 'Target desain: JSON-LD @graph & llms.txt',
        highlightType: 'interface',
      },
      {
        title: 'Konten Terbaca Tanpa JavaScript',
        description:
          'Teks utama, tab contoh penggunaan, dan FAQ tetap utuh di HTML dan diuji untuk kecepatan muat di HP.',
        metricOrTag: 'Target desain: LCP < 1,8 dtk, CLS < 0,02',
        highlightType: 'workflow',
      },
      {
        title: 'Sistem Gerak yang Tenang & Hemat Perangkat',
        description:
          'Animasi dibatasi pada properti ringan, menghormati pengaturan pengurangan gerak pengguna, dan menyesuaikan kemampuan perangkat.',
        metricOrTag: 'Target desain: animasi tenang & terukur',
        highlightType: 'security',
      },
    ],
    liveUrl: 'https://chestaa.com/id',
    liveStatusLabel: 'Proyek internal (Aktif di chestaa.com)',
    relatedCaseSlug: 'chestaa-v2',
    caseStudySlug: 'chestaa-v2',
    featured: false,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'Membangun Ulang chestaa.com — Proyek Internal | CHESTAADOTCOM',
      description:
        'Proyek internal CHESTAADOTCOM: membangun ulang situs dua bahasa chestaa.com yang statis dan cepat dengan fokus software custom dan AI agent.',
    },
  },

  // 6. pemroses-dokumen
  {
    slug: 'pemroses-dokumen',
    title: 'Pemroses Dokumen AI',
    oneLiner:
      'Mengekstrak data dari dokumen ke tabel, dengan tinjauan manusia sebelum data dipakai.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent & Software Custom',
    services: ['ai-agent', 'software-custom'],
    serviceSlug: 'ai-agent',
    industry: 'Jasa profesional',
    client: 'Proyek internal CHESTAADOTCOM',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    role: 'Desain, pengembangan, dan pengujian',
    duration: 'Proyek internal',
    stack: ['Ekstraksi Dokumen AI', 'Tabel Tinjauan Manusia', 'Hak Akses Peran', 'Log Tindakan'],
    cover: 'projectPemrosesDokumen',
    coverKey: 'projectPemrosesDokumen',
    alt: 'Ilustrasi proyek internal Pemroses Dokumen AI yang mengekstrak data dokumen ke tabel dengan tinjauan manusia',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectPemrosesDokumen',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: unggah dokumen, ekstraksi kolom ke baris tabel, dan layar tinjauan manusia berdampingan.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: daftar antrean tinjauan yang menandai kolom yang perlu diperiksa staf sebelum disimpan.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Ilustrasi',
        caption:
          'Ilustrasi: pemisahan tahap pembacaan AI dan tahap persetujuan manusia sebelum data masuk ke tabel utama.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Pemroses Dokumen AI adalah proyek internal CHESTAADOTCOM yang menggabungkan pemroses dokumen berbasis AI dengan antarmuka tabel web custom untuk tim jasa profesional yang setiap hari menyalin isi dokumen ke tabel.',
      'Alih-alih langsung memakai hasil bacaan AI tanpa pemeriksaan, sistem menempatkan data hasil ekstraksi ke layar tinjauan supaya staf manusia bisa memeriksa, mengoreksi bila perlu, dan menyetujui baris data sebelum dipakai.',
    ],
    features: [
      {
        title: 'Ekstraksi Isi Dokumen ke Baris Tabel',
        description:
          'Membaca kolom penting dari dokumen yang diunggah dan menyusunnya ke dalam struktur tabel yang seragam.',
        metricOrTag: 'Target desain: ekstraksi terstruktur ke tabel',
        highlightType: 'architecture',
      },
      {
        title: 'Tinjauan Manusia Sebelum Data Dipakai',
        description:
          'Staf memeriksa hasil bacaan berdampingan dengan dokumen asli dan memberi persetujuan sebelum data disimpan.',
        metricOrTag: 'Target desain: wajib persetujuan manusia',
        highlightType: 'security',
      },
      {
        title: 'Penandaan Kolom yang Perlu Diperiksa',
        description:
          'Menyorot baris atau kolom yang kurang jelas agar staf langsung fokus memeriksa bagian tersebut.',
        metricOrTag: 'Target desain: sorot kolom meragukan',
        highlightType: 'workflow',
      },
      {
        title: 'Catatan Persetujuan & Koreksi',
        description:
          'Mencatat siapa yang meninjau, mengoreksi, dan menyetujui setiap dokumen di dalam log aplikasi.',
        metricOrTag: 'Target desain: jejak tinjauan tercatat',
        highlightType: 'interface',
      },
    ],
    liveStatusLabel: 'Proyek internal (Target desain)',
    relatedCaseSlug: 'pemroses-dokumen',
    caseStudySlug: 'pemroses-dokumen',
    featured: true,
    draft: false,
    updatedAt: '2026-03-24',
    seo: {
      title: 'Pemroses Dokumen AI — Proyek Internal | CHESTAADOTCOM',
      description:
        'Proyek internal CHESTAADOTCOM: pemroses dokumen AI dan aplikasi tabel web yang mengekstrak data dari dokumen dengan tinjauan manusia.',
    },
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = RAW_PORTFOLIO_PROJECTS.map(
  (p) => enrichPortfolioProject(p, 'id')
);

export function getPortfolioCategories(locale: 'id' | 'en' = 'id'): Array<{
  id: 'semua' | ProjectCategory;
  label: string;
}> {
  return locale === 'en' ? PORTFOLIO_CATEGORIES_EN : PORTFOLIO_CATEGORIES;
}

export function getPublishedProjects(locale: 'id' | 'en' = 'id'): PortfolioProject[] {
  const source = locale === 'en' ? PORTFOLIO_PROJECTS_EN : PORTFOLIO_PROJECTS;
  return source.filter((project) => !project.draft);
}

export function getProjectBySlug(
  slug?: string,
  locale: 'id' | 'en' = 'id'
): PortfolioProject | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  return getPublishedProjects(locale).find((p) => p.slug.toLowerCase() === clean);
}

export function getProjectsByServiceSlug(
  serviceSlug: ProjectServiceId,
  locale: 'id' | 'en' = 'id'
): PortfolioProject[] {
  return getPublishedProjects(locale).filter((p) =>
    p.services.includes(serviceSlug)
  );
}

export function getAdjacentProjects(
  slug: string,
  locale: 'id' | 'en' = 'id'
): {
  prev: PortfolioProject;
  next: PortfolioProject;
} {
  const published = getPublishedProjects(locale);
  const idx = published.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return {
      prev: published[published.length - 1],
      next: published[0],
    };
  }
  const prevIdx = (idx - 1 + published.length) % published.length;
  const nextIdx = (idx + 1) % published.length;
  return {
    prev: published[prevIdx],
    next: published[nextIdx],
  };
}

export function getPortfolioIndustries(locale: 'id' | 'en' = 'id'): string[] {
  const industries = Array.from(new Set(getPublishedProjects(locale).map((p) => p.industry)));
  return [locale === 'en' ? 'All Industries' : 'Semua Industri', ...industries];
}

// Backward-compatible export for any legacy consumer importing `PROJECTS`
export interface Project {
  id: string;
  title: string;
  client?: string;
  duration?: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  liveLink: string;
  thumbnail: string;
  overview?: string;
  challenges?: string;
  solution?: string;
  impact?: string;
}

export const PROJECTS: Project[] = getPublishedProjects('id').map((p) => ({
  id: p.slug,
  title: p.title,
  client: p.client,
  duration: p.duration,
  category: p.categoryLabel,
  description: p.oneLiner,
  techStack: p.stack,
  features: p.features.map((f) => f.title),
  liveLink: p.liveUrl || `/id/portfolio/${p.slug}`,
  thumbnail: p.cover,
  overview: p.summaryParagraphs[0],
  challenges: p.summaryParagraphs[0],
  solution: p.summaryParagraphs[1],
  impact: p.oneLiner,
}));
