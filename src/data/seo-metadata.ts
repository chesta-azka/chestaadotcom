// Centralized site-wide SEO metadata constants for all CHESTAADOTCOM routes
import { SERVICES_DATA } from './services';
import { getPublishedProjects } from './projects';
import { getPublishedCaseStudies } from './case-studies';
import { REAL_PROJECTS_EXPERIENCE, REAL_PROJECT_BADGE_ID } from './experience';
import { BLOG_CATEGORIES, getPublishedBlogPosts } from './blog-posts';

export interface RouteSEO {
  title: string;
  description: string;
  keywords: string[];
}

export const SITE_METADATA = {
  brandName: 'CHESTAADOTCOM',
  defaultTitle: 'Jasa Website, AI Agent & Software di Tangsel | CHESTAADOTCOM',
  defaultDescription:
    'Pengembangan software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan dan Jabodetabek. Mulai Rp1.200.000.',
  siteUrl: 'https://chestaa.com',
  instagramUrl: 'https://instagram.com/softwaredev.aiagentic.agency',
  whatsappNumber: '6282125447232',
  whatsappDisplay: '+62 821-2544-7232',
  whatsappUrl:
    'https://wa.me/6282125447232?text=Halo%20Chesta%20%26%20Zeeshan,%20saya%20ingin%20mulai%20dari%20audit%20gratis%2030%20menit%20untuk%20bisnis%20saya.',
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
    'Kota Tangerang Selatan',
    'BSD City',
    'Pamulang',
    'Jurang Mangu',
    'Lebak Bulus',
    'Jakarta Selatan',
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
      'Landing page sederhana selesai dalam hitungan hari. Untuk AI agent, otomasi workflow, dan aplikasi web custom biasanya membutuhkan hitungan minggu tergantung cakupan; estimasi pasti kami berikan setelah audit gratis.',
  },
  {
    question: 'Apakah data pelanggan saya aman?',
    answer:
      'Data tetap milikmu. Kamu bebas memilih tempat penyimpanannya (Google Sheets, database, atau server milikmu sendiri), dan domain serta hosting terdaftar atas namamu.',
  },
  {
    question: 'Apakah bisa untuk bisnis kecil yang belum punya sistem apa pun?',
    answer:
      'Bisa sekali. Banyak bisnis mulai dari satu alur sederhana terlebih dahulu, misalnya membalas chat WhatsApp dan mencatat jadwal konsultasi ke Google Sheets, kemudian bertahap menambah dashboard saat operasional berkembang.',
  },
  {
    question: 'Area mana yang dilayani?',
    answer:
      'Kami berbasis di BSD, Tangerang Selatan dan melayani bisnis di Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, Lebak Bulus, serta wilayah Jabodetabek, baik secara online maupun tatap muka sesuai kesepakatan.',
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

const REAL_PORTFOLIO_ROUTES_SEO: Record<string, RouteSEO> = Object.fromEntries(
  REAL_PROJECTS_EXPERIENCE.map((rp) => [
    `/portfolio/${rp.slugId}`,
    {
      title: rp.seoTitleId,
      description: rp.seoDescriptionId,
      keywords: [
        rp.titleId,
        REAL_PROJECT_BADGE_ID,
        'CHESTAADOTCOM',
        'BSD City',
        'Tangerang Selatan',
      ],
    },
  ])
);

const PORTFOLIO_ROUTES_SEO: Record<string, RouteSEO> = {
  ...REAL_PORTFOLIO_ROUTES_SEO,
  ...Object.fromEntries(
    getPublishedProjects().map((proj) => [
      `/portfolio/${proj.slug}`,
      {
        title: proj.seo.title,
        description: proj.seo.description,
        keywords: [
          proj.categoryLabel,
          proj.industry,
          'CHESTAADOTCOM',
          'Contoh proyek',
          'BSD City',
          'Tangerang Selatan',
          ...proj.stack,
        ],
      },
    ])
  ),
};

const CASE_STUDY_ROUTES_SEO: Record<string, RouteSEO> = Object.fromEntries(
  getPublishedCaseStudies().map((cs) => [
    `/case-studies/${cs.slug}`,
    {
      title: cs.seo.title,
      description:
        cs.seo.description ||
        `Masalah: ${cs.summary.problem} Solusi: ${cs.summary.solution} Target desain: ${cs.summary.result}`,
      keywords: [
        cs.industry,
        ...cs.services,
        'Studi kasus contoh CHESTAADOTCOM',
        'BSD City',
        'Tangerang Selatan',
      ],
    },
  ])
);

export const ROUTES_SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'Jasa Website, AI Agent & Software di Tangsel | CHESTAADOTCOM',
    description:
      'Pengembangan software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan dan Jabodetabek. Mulai Rp1.200.000.',
    keywords: [
      'software house BSD',
      'AI agent WhatsApp Tangsel',
      'jasa landing page Tangerang Selatan',
      'otomasi workflow BSD City',
      'CHESTAADOTCOM',
    ],
  },
  '/area': {
    title: 'Area Layanan Tangerang Selatan & Jakarta | CHESTAADOTCOM',
    description:
      'CHESTAADOTCOM melayani jasa pembuatan website, software custom, dan AI agent di Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, dan Lebak Bulus.',
    keywords: [
      'area layanan CHESTAADOTCOM',
      'jasa website Tangerang Selatan',
      'jasa AI agent BSD City',
      'jasa website Pamulang',
      'jasa website Lebak Bulus',
    ],
  },
  '/portfolio': {
    title: 'Proyek Nyata & Contoh Proyek Sistem | CHESTAADOTCOM',
    description:
      'Daftar proyek nyata (klien dirahasiakan) dan contoh proyek CHESTAADOTCOM: sistem brand minuman, pondok pesantren, gudang logistik, dan AI agent di Tangsel.',
    keywords: [
      'proyek CHESTAADOTCOM',
      'contoh proyek CHESTAADOTCOM',
      'proyek AI agent WhatsApp',
      'proyek web app Tangsel',
      'CHESTAADOTCOM portofolio',
    ],
  },
  '/case-studies': {
    title: 'Studi Kasus Contoh & Arsitektur Sistem | CHESTAADOTCOM',
    description:
      'Contoh studi kasus yang memperlihatkan cara CHESTAADOTCOM menganalisis masalah, mengambil keputusan, dan menimbang kompromi teknis di Tangerang Selatan.',
    keywords: [
      'studi kasus contoh',
      'studi kasus AI agent WhatsApp',
      'otomasi operasional bisnis Tangsel',
      'CHESTAADOTCOM case studies',
    ],
  },
  '/blog': {
    title: 'Blog AI Agent, Website & Otomasi Bisnis | CHESTAADOTCOM',
    description:
      'Panduan praktis dari Chesta Azka dan Zeeshan seputar software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website cepat di Tangerang Selatan.',
    keywords: [
      'panduan AI agent bisnis',
      'biaya bikin website BSD',
      'otomasi WhatsApp klinik',
      'landing page konversi',
      'CHESTAADOTCOM blog',
    ],
  },
  '/about': {
    title: 'Tentang CHESTAADOTCOM — Chesta Azka & Zeeshan | BSD',
    description:
      'Kenali Chesta Azka (Arsitektur, Produk, Teknologi) dan Zeeshan (Operasional, Client Success), co-founder studio rekayasa CHESTAADOTCOM di BSD, Tangsel.',
    keywords: ['Chesta Azka', 'Zeeshan', 'tentang CHESTAADOTCOM', 'partner teknologi BSD'],
  },
  '/audit-gratis': {
    title: 'Audit Gratis 30 Menit Alur Kerja & Otomasi | CHESTAADOTCOM',
    description:
      'Ceritakan kerjaan berulang yang paling bikin capek di bisnismu. Dapatkan peta alur kerja, rekomendasi jujur, dan perkiraan biaya gratis dalam sesi 30 menit.',
    keywords: ['audit gratis alur kerja', 'konsultasi AI agent BSD', 'audit otomasi bisnis Tangsel'],
  },
  '/harga': {
    title: 'Harga Pembuatan Website, AI Agent & Software | CHESTAADOTCOM',
    description:
      'Rincian biaya pembuatan website dan landing page mulai Rp1.200.000 serta estimasi cakupan AI agent WhatsApp, software custom, dan otomasi setelah audit.',
    keywords: ['harga pembuatan website BSD', 'biaya AI agent WhatsApp', 'harga software custom'],
  },
  '/cara-kerja': {
    title: 'Cara Kerja & Proses Pengerjaan 4 Langkah | CHESTAADOTCOM',
    description:
      'Pelajari empat langkah kerja CHESTAADOTCOM di BSD, Tangerang Selatan: audit gratis 30 menit, rancang dan prototipe, bangun dan uji, serta rilis dan rawat.',
    keywords: ['cara kerja CHESTAADOTCOM', 'proses pembuatan website', 'audit 30 menit'],
  },
  '/faq': {
    title: 'Pertanyaan Umum (FAQ) Website & AI Agent | CHESTAADOTCOM',
    description:
      'Jawaban jujur untuk 21 pertanyaan seputar harga pembuatan website, batas keamanan AI agent WhatsApp, kepemilikan kode, dan garansi di Tangerang Selatan.',
    keywords: ['FAQ CHESTAADOTCOM', 'tanya jawab AI agent', 'harga website Tangerang Selatan'],
  },
  '/privasi': {
    title: 'Kebijakan Privasi & Pelindungan Data (UU PDP) | CHESTAADOTCOM',
    description:
      'Kebijakan privasi CHESTAADOTCOM dalam bahasa lugas sesuai UU PDP No. 27 Tahun 2022: analitik tanpa cookie, tidak ada cookie dari situs, dan tanpa jual data.',
    keywords: ['kebijakan privasi CHESTAADOTCOM', 'UU PDP No 27 Tahun 2022', 'privasi data'],
  },
  '/workflow': {
    title: 'Alur Kerja Teknis & Tahap Implementasi | CHESTAADOTCOM',
    description:
      'Empat langkah kerja teknis CHESTAADOTCOM di BSD, Tangsel: audit gratis 30 menit, rancang dan prototipe, bangun dan uji, serta rilis dan rawat bersama timmu.',
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
