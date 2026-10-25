// Centralized site-wide SEO metadata constants for all CHESTAADOTCOM routes
import { SERVICES_DATA } from './services';
import { getPublishedProjects } from './projects';
import { getPublishedCaseStudies } from './case-studies';
import { BLOG_CATEGORIES, getPublishedBlogPosts } from './blog-posts';

export interface RouteSEO {
  title: string;
  description: string;
  keywords: string[];
}

export const SITE_METADATA = {
  brandName: 'CHESTAADOTCOM',
  defaultTitle: 'Jasa Software & AI Agent untuk Bisnis di BSD & Tangsel | CHESTAADOTCOM',
  defaultDescription:
    'Partner rekayasa software custom dan AI agent (WhatsApp/CRM, booking, automasi) untuk bisnis di BSD City, Tangerang Selatan & Jabodetabek. Web mulai Rp1.200.000.',
  siteUrl: 'https://chestaa.com',
  instagramUrl: 'https://instagram.com/chestaadotcom',
  whatsappNumber: '6282125447232',
  whatsappUrl:
    'https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20software%20custom%20/%20AI%20agent%20untuk%20bisnis%20saya.',
  founders: [
    {
      name: 'Chesta Azka',
      role: 'Co-Founder — Arsitektur, Produk, dan Teknologi',
    },
    {
      name: 'Zeeshan',
      role: 'Co-Founder — Operasional dan Client Success',
    },
  ],
  areasServed: [
    'BSD City',
    'Alam Sutera',
    'Bintaro',
    'Gading Serpong',
    'Tangerang Selatan',
    'Jabodetabek',
  ],
};

export const HOME_FAQS = [
  {
    question: 'Apa bedanya chatbot dan AI agent?',
    answer:
      'Chatbot biasa hanya menjawab pertanyaan dari daftar teks FAQ yang sudah disiapkan. AI agent bisa memahami konteks percakapan bebas, memakai tool seperti kalender, spreadsheet, dan database, lalu mengerjakan tugasnya sampai tuntas (misalnya langsung membuat jadwal atau mencatat transaksi) dan melapor ke tim kamu.',
  },
  {
    question: 'Berapa biaya bikin AI agent?',
    answer:
      'Biaya pembuatan AI agent bergantung pada berapa banyak tool yang disambungkan dan seberapa kompleks aturan bisnis yang terlibat. Oleh karena itu, biayanya dihitung setelah audit gratis 30 menit. Sementara untuk pembuatan landing page dan website, harga mulai dari Rp1.200.000.',
  },
  {
    question: 'Kalau agent salah jawab bagaimana?',
    answer:
      'Agent dibekali batas tindakan tegas (guardrails) dan aturan serah ke manusia (human handover). Kasus yang sensitif, ragu, atau berbentuk komplain otomatis diteruskan ke stafmu beserta konteks percakapan lengkap. Selain itu, semua tindakan agent tercatat dalam log sehingga bisa diperiksa dan disempurnakan kapan saja.',
  },
  {
    question: 'Berapa lama pengerjaannya?',
    answer:
      'Landing page standar membutuhkan waktu sekitar 3–7 hari kerja. Untuk AI agent, otomasi workflow, dan aplikasi web custom biasanya membutuhkan 2–4 minggu tergantung pada jumlah integrasi dan alur kerja bisnismu.',
  },
  {
    question: 'Apakah data pelanggan saya aman?',
    answer:
      'Sangat aman. Kebijakan penyimpanan data bebas kamu tentukan sesuai preferensi infrastruktur internal bisnismu—baik di server database milikmu sendiri (on-premise/private cloud) maupun cloud terenkripsi. Kami tidak mengunci atau menjual data pelangganmu ke pihak mana pun.',
  },
  {
    question: 'Apakah bisa untuk bisnis kecil yang belum punya sistem apa pun?',
    answer:
      'Bisa sekali. Banyak klien kami yang mulai dari satu alur sederhana terlebih dahulu, misalnya membalas chat WhatsApp dan mencatat jadwal konsultasi ke Google Sheets, kemudian bertahap menambah sistem dashboard saat operasional makin berkembang.',
  },
  {
    question: 'Area mana yang dilayani?',
    answer:
      'Fokus utama kami berada di BSD City, Alam Sutera, Bintaro, Gading Serpong, Tangerang Selatan, dan wilayah Jabodetabek. Namun seluruh proses konsultasi, pengembangan, dan serah terima sistem dapat kami lakukan secara remote untuk bisnis di seluruh Indonesia.',
  },
];

const SERVICE_ROUTES_SEO: Record<string, RouteSEO> = Object.fromEntries(
  SERVICES_DATA.map((s) => [
    `/jasa/${s.slug}`,
    {
      title: s.seo.title,
      description: s.seo.description,
      keywords: [
        s.shortTitle,
        'CHESTAADOTCOM',
        'BSD City',
        'Tangerang Selatan',
        ...s.stackChips,
      ],
    },
  ])
);

const PORTFOLIO_ROUTES_SEO: Record<string, RouteSEO> = Object.fromEntries(
  getPublishedProjects().map((proj) => [
    `/portfolio/${proj.slug}`,
    {
      title: proj.seo.title,
      description: proj.seo.description,
      keywords: [
        proj.categoryLabel,
        proj.industry,
        'CHESTAADOTCOM',
        'BSD City',
        'Tangerang Selatan',
        ...proj.stack,
      ],
    },
  ])
);

const CASE_STUDY_ROUTES_SEO: Record<string, RouteSEO> = Object.fromEntries(
  getPublishedCaseStudies().map((cs) => [
    `/case-studies/${cs.slug}`,
    {
      title: cs.seo.title,
      description:
        cs.seo.description ||
        `Masalah: ${cs.summary.problem} Solusi: ${cs.summary.solution} Hasil: ${cs.summary.result}`,
      keywords: [
        cs.industry,
        ...cs.services,
        'Studi Kasus CHESTAADOTCOM',
        'BSD City',
        'Tangerang Selatan',
      ],
    },
  ])
);

export const ROUTES_SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'Jasa Software & AI Agent untuk Bisnis di BSD & Tangsel | CHESTAADOTCOM',
    description:
      'Partner rekayasa software custom dan AI agent (WhatsApp/CRM, booking, automasi) untuk bisnis di BSD City, Tangerang Selatan & Jabodetabek. Web mulai Rp1.200.000.',
    keywords: [
      'software house BSD',
      'AI agent WhatsApp Tangsel',
      'jasa landing page Tangerang Selatan',
      'otomasi CRM BSD City',
      'CHESTAADOTCOM',
    ],
  },
  '/portfolio': {
    title: 'Proyek yang Sudah Kami Bangun — Portofolio Software & AI Agent | CHESTAADOTCOM',
    description:
      'Etalase visual proyek pembuatan landing page, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di BSD City, Tangerang Selatan, dan Jabodetabek.',
    keywords: [
      'portofolio software BSD',
      'proyek AI agent WhatsApp',
      'proyek web app Tangsel',
      'CHESTAADOTCOM portofolio',
    ],
  },
  '/case-studies': {
    title: 'Cerita di Balik Proyeknya — Studi Kasus Software & AI Agent | CHESTAADOTCOM',
    description:
      'Baca cerita mendalam di balik setiap proyek CHESTAADOTCOM: masalah operasional awal, pendekatan teknis, kompromi arsitektur, dan dampak di lapangan.',
    keywords: [
      'studi kasus software custom BSD',
      'studi kasus AI agent WhatsApp',
      'otomasi operasional bisnis Tangsel',
      'CHESTAADOTCOM case studies',
    ],
  },
  '/blog': {
    title: 'Catatan dari Kami — Blog Software, AI Agent & Web Bisnis | CHESTAADOTCOM',
    description:
      'Catatan praktis dari Chesta Azka & Zeeshan seputar software custom, AI agent WhatsApp, otomasi alur kerja, dan web untuk bisnis di BSD & Jabodetabek.',
    keywords: [
      'panduan AI agent bisnis',
      'biaya bikin website BSD',
      'otomasi WhatsApp klinik',
      'landing page konversi',
      'CHESTAADOTCOM blog',
    ],
  },
  '/about': {
    title: 'Tentang CHESTAADOTCOM — Chesta Azka & Zeeshan | BSD Tangsel',
    description:
      'Kenali Chesta Azka (Arsitektur, Produk, Teknologi) dan Zeeshan (Operasional, Client Success), co-founder CHESTAADOTCOM yang membantu bisnis di BSD & Jabodetabek.',
    keywords: ['Chesta Azka', 'Zeeshan', 'tentang CHESTAADOTCOM', 'partner teknologi BSD'],
  },
  '/workflow': {
    title: 'Cara Kerja & Proses Rekayasa Sistem | CHESTAADOTCOM',
    description:
      '4 tahapan kerja terukur di CHESTAADOTCOM: Audit gratis 30 menit, rancang & prototipe, bangun & uji, serta rilis & pemantauan berkala.',
    keywords: ['cara kerja CHESTAADOTCOM', 'proses pembuatan AI agent', 'audit software BSD'],
  },
  ...SERVICE_ROUTES_SEO,
  ...PORTFOLIO_ROUTES_SEO,
  ...CASE_STUDY_ROUTES_SEO,
  ...Object.fromEntries(
    BLOG_CATEGORIES.map((cat) => [
      `/blog/kategori/${cat.slug}`,
      {
        title: `Artikel ${cat.shortLabel} — Catatan dari Kami | CHESTAADOTCOM`,
        description: cat.description,
        keywords: [cat.name, cat.shortLabel, 'Blog CHESTAADOTCOM', 'BSD City', 'Tangerang Selatan'],
      },
    ])
  ),
  ...Object.fromEntries(
    getPublishedBlogPosts().map((post) => [
      `/blog/${post.slug}`,
      {
        title: post.seoTitle,
        description: post.metaDescription,
        keywords: post.tags,
      },
    ])
  ),
};

export const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  ...ROUTES_SEO_MAP,
};
