/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: data/services — CHESTAADOTCOM
 * ============================================================================
 * Bilingual (Indonesian /id and English /en) service dataset.
 * Routes:
 * - /id/jasa/pembuatan-website  | /en/services/website-development
 * - /id/jasa/ai-agent           | /en/services/ai-agents
 * - /id/jasa/software-custom    | /en/services/custom-software
 * - /id/jasa/otomasi-workflow   | /en/services/workflow-automation
 */

export type ServiceSlug =
  | 'pembuatan-website'
  | 'ai-agent'
  | 'software-custom'
  | 'otomasi-workflow';

export type EnglishServiceSlug =
  | 'website-development'
  | 'ai-agents'
  | 'custom-software'
  | 'workflow-automation';

export const SERVICE_ID_TO_EN_SLUG: Record<ServiceSlug, EnglishServiceSlug> = {
  'pembuatan-website': 'website-development',
  'ai-agent': 'ai-agents',
  'software-custom': 'custom-software',
  'otomasi-workflow': 'workflow-automation',
};

export const SERVICE_EN_TO_ID_SLUG: Record<EnglishServiceSlug, ServiceSlug> = {
  'website-development': 'pembuatan-website',
  'ai-agents': 'ai-agent',
  'custom-software': 'software-custom',
  'workflow-automation': 'otomasi-workflow',
};

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  num: string;
  duration: string;
  title: string;
  description: string;
}

export interface ServiceIndustryUseCase {
  industryId: 'klinik' | 'fnb' | 'properti' | 'jasa';
  industryLabel: string;
  scenarioTitle: string;
  workflowLines: string[];
  outcome: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface WebsiteComparisonRow {
  feature: string;
  landingPage: string;
  companyProfile: string;
  webCustom: string;
}

export interface ChatbotVsAgentRow {
  aspect: string;
  chatbot: string;
  agent: string;
}

export interface AgentGuardrailItem {
  id: 'batas-jelas' | 'serah-manusia' | 'semua-tercatat' | 'data-milikmu';
  title: string;
  description: string;
}

export interface ServiceCaseStudyBlueprint {
  slug: string;
  sector: string;
  title: string;
  problem: string;
  built: string;
  resultPlaceholder: string;
  imageKey: string;
}

export interface ServiceItem {
  slug: ServiceSlug;
  enSlug: EnglishServiceSlug;
  urlSlug: string;
  eyebrow: string;
  h1: string;
  sub: string;
  ringkasanSingkat: string;
  cocokKalau: string[];
  kapanTidakPerlu: string;
  yangKamuDapat: ServiceDeliverable[];
  caraKerja: ServiceProcessStep[];
  contohPenggunaan: ServiceIndustryUseCase[];
  comparisonTable?: {
    headers: [string, string, string, string];
    rows: WebsiteComparisonRow[];
  };
  chatbotVsAgentTable?: {
    headers: [string, string, string];
    rows: ChatbotVsAgentRow[];
  };
  guardrails?: AgentGuardrailItem[];
  prinsipTeknis: string;
  hargaDanScope: string;
  siapkanSebelumAudit: string[];
  faq: ServiceFAQItem[];
  hasAreaPages: boolean;
  updatedAt: string;
  // Legacy / shared fields for home bento & SEO helpers
  title: string;
  shortTitle: string;
  tagline: string;
  shortPromise: string;
  summary: string;
  bentoSpan: 'large' | 'small';
  timeline: string;
  bestForSummary: string;
  forWho: string[];
  deliverables: ServiceDeliverable[];
  process: ServiceProcessStep[];
  useCases: ServiceIndustryUseCase[];
  stackChips: string[];
  pricingNote: {
    label: string;
    startingPriceNumeric?: number;
    reason: string;
    scopeNote: string;
  };
  relatedCaseSlugs: string[];
  relatedPostSlugs: string[];
  seo: {
    title: string;
    description: string;
  };
  imageKey: string;
}

export interface ProblemSelectorOption {
  id: string;
  questionChip: string;
  situationDetail: string;
  recommendedSlug: ServiceSlug;
  recommendationNote: string;
}

export const SERVICE_CASE_STUDIES: Record<string, ServiceCaseStudyBlueprint> = {
  'wa-concierge-klinik': {
    slug: 'wa-concierge-klinik',
    sector: 'Proyek Internal · Klinik',
    title: 'WA Concierge: agen booking WhatsApp untuk klinik',
    problem:
      'Pertanyaan perawatan berulang setiap hari, pesan malam hari baru terbalas besok pagi, dan pencatatan jadwal ke spreadsheet masih manual.',
    built:
      'AI agent yang menjawab pertanyaan perawatan, mengecek slot terapis, dan membuat booking dari percakapan WhatsApp.',
    resultPlaceholder:
      'Target desain: pengecekan slot terapis, booking otomatis, dan serah ke staf dengan ringkasan.',
    imageKey: 'projectWaConciergeKlinik',
  },
  'dashboard-kafe': {
    slug: 'dashboard-kafe',
    sector: 'Proyek Internal · F&B',
    title: 'Dashboard Operasional Kafe',
    problem:
      'Stok bahan dan penjualan harian beberapa cabang dicatat di spreadsheet terpisah yang makin berat dan sering salah.',
    built:
      'Stok bahan, penjualan harian, dan laporan beberapa cabang dalam satu dashboard.',
    resultPlaceholder:
      'Target desain: laporan cabang diperbarui dari data yang sama dengan hak akses per peran.',
    imageKey: 'projectDashboardKafe',
  },
  'lead-properti': {
    slug: 'lead-properti',
    sector: 'Proyek Internal · Properti',
    title: 'Alur Lead Properti',
    problem:
      'Data calon pembeli dari formulir iklan dimasukkan manual ke beberapa tempat sehingga tindak lanjut agen terlambat.',
    built:
      'Lead dari formulir iklan masuk ke CRM, agen diberi tahu, dan follow-up terjadwal otomatis.',
    resultPlaceholder:
      'Target desain: pencatatan otomatis ke CRM, notifikasi instan ke agen, dan log eksekusi.',
    imageKey: 'projectLeadProperti',
  },
  'pemroses-dokumen': {
    slug: 'pemroses-dokumen',
    sector: 'Proyek Internal · Jasa Profesional',
    title: 'Pemroses Dokumen AI: ekstraksi data dengan tinjauan manusia',
    problem:
      'Tim administrasi mengetik ulang data dari invoice dan formulir ke tabel, yang lambat dan rawan salah.',
    built:
      'Sistem yang membaca dokumen, mengekstrak kolom penting ke tabel, menandai data yang tidak yakin, dan meminta tinjauan manusia sebelum data dipakai.',
    resultPlaceholder:
      'Target desain: data tidak yakin selalu ditandai, tinjauan manusia sebelum data masuk tabel akhir, dan pencatatan koreksi.',
    imageKey: 'projectPemrosesDokumen',
  },
};

export const PROBLEM_SELECTOR_OPTIONS: ProblemSelectorOption[] = [
  {
    id: 'chat-numpuk',
    questionChip: 'Menjawab pertanyaan yang sama berulang kali di WhatsApp',
    situationDetail:
      'Pesan masuk malam hari baru terbalas besok pagi, dan staf mencatat data dari chat ke spreadsheet secara manual.',
    recommendedSlug: 'ai-agent',
    recommendationNote:
      'AI agent membaca maksud pelanggan, memakai tool seperti kalender dan database, lalu mengerjakan tugasnya sampai selesai.',
  },
  {
    id: 'iklan-boncos',
    questionChip: 'Sudah memasang iklan tapi pengunjung langsung pergi',
    situationDetail:
      'Belum punya website, atau websitemu lambat dan susah dibuka di HP saat calon pelanggan mencari jasamu.',
    recommendedSlug: 'pembuatan-website',
    recommendationNote:
      'Website yang cepat dibuka, jelas menawarkan apa, dan siap dipasangi iklan mulai Rp1.200.000.',
  },
  {
    id: 'salin-data',
    questionChip: 'Memasukkan data yang sama ke dua atau tiga tempat',
    situationDetail:
      'Menyusun laporan mingguan secara manual dan mengandalkan ingatan staf untuk pengingat atau pengiriman invoice.',
    recommendedSlug: 'otomasi-workflow',
    recommendationNote:
      'Menyambungkan WhatsApp, Sheets, kalender, dan invoice supaya pekerjaan berulang berjalan otomatis.',
  },
  {
    id: 'spreadsheet-mentok',
    questionChip: 'Memakai spreadsheet yang makin berat dan sering salah',
    situationDetail:
      'Punya beberapa aplikasi yang tidak saling terhubung atau butuh dashboard laporan dan hak akses per peran.',
    recommendedSlug: 'software-custom',
    recommendationNote:
      'Aplikasi web, dashboard, dan sistem internal yang mengikuti cara kerjamu, dibangun bertahap dari versi kecil.',
  },
];

// ============================================================================
// INDONESIAN SERVICES DATA (SOURCE OF TRUTH — VERBATIM SECTION 4 COPY)
// ============================================================================
export const SERVICES_DATA_ID: ServiceItem[] = [
  // 1. pembuatan-website
  {
    slug: 'pembuatan-website',
    enSlug: 'website-development',
    urlSlug: 'pembuatan-website',
    eyebrow: 'Pembuatan website dan landing page',
    h1: 'Jasa pembuatan website dan landing page untuk bisnis di Tangerang Selatan',
    sub: 'Website yang cepat dibuka, jelas menawarkan apa, dan siap dipasangi iklan. Dibuat supaya pengunjung benar-benar menghubungi kamu, bukan sekadar melihat.',
    ringkasanSingkat:
      'Pembuatan website di CHESTAADOTCOM mencakup landing page, company profile, dan web custom untuk bisnis di Tangerang Selatan dan Jabodetabek. Setiap halaman dibuat cepat, nyaman dibaca di HP, dan punya satu tujuan jelas, misalnya booking atau pesan WhatsApp. Harga mulai Rp1.200.000, tergantung kompleksitas.',
    cocokKalau: [
      'Sudah memasang iklan tapi pengunjung langsung pergi.',
      'Belum punya website, atau websitemu lambat dan susah dibuka di HP.',
      'Ingin calon pelanggan bisa booking atau chat tanpa banyak langkah.',
      'Ingin ditemukan di Google saat orang mencari jasamu di daerahmu.',
    ],
    kapanTidakPerlu:
      'Kalau kamu hanya butuh satu halaman untuk link bio dan belum mengiklankan apa pun, template gratis sudah cukup. Kami lebih berguna saat halaman itu harus menghasilkan pesan, booking, atau pembelian.',
    yangKamuDapat: [
      {
        title: 'Struktur halaman dan tulisan',
        description:
          'Menjawab pertanyaan calon pelanggan sebelum mereka bertanya.',
      },
      {
        title: 'Desain responsif',
        description: 'Rapi di HP, tablet, dan desktop.',
      },
      {
        title: 'Kecepatan',
        description:
          'Gambar dioptimasi, skrip seperlunya, diuji di PageSpeed Insights.',
      },
      {
        title: 'SEO dasar',
        description:
          'Judul dan deskripsi tiap halaman, struktur heading, sitemap, dan data terstruktur.',
      },
      {
        title: 'Tombol WhatsApp dan formulir',
        description: 'Langsung menyampaikan pesan ke kamu.',
      },
      {
        title: 'Pelacakan dasar',
        description:
          'Kalau kamu mau, supaya kelihatan dari mana pengunjung datang.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description:
          'Kami lihat tujuan bisnismu, halaman yang ada, dan pesaing di sekitarmu.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description:
          'Kamu melihat struktur dan tampilannya sebelum dibangun penuh.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description:
          'Dibangun, lalu diuji di HP dan di PageSpeed Insights.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description:
          'Online, dipantau, dan diperbaiki setelah data pengunjung masuk.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Contoh penggunaan untuk Klinik',
        workflowLines: [
          'Satu halaman per perawatan dengan harga mulai dari, jadwal praktik, dan tombol booking via WhatsApp.',
          'Calon pasien tahu apa yang ditawarkan dan bisa langsung memesan jadwal.',
        ],
        outcome:
          'Contoh: Satu halaman per perawatan dengan harga mulai dari, jadwal praktik, dan tombol booking via WhatsApp. Calon pasien tahu apa yang ditawarkan dan bisa langsung memesan jadwal.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Contoh penggunaan untuk F&B',
        workflowLines: [
          'Menu, jam buka, peta, dan tombol pesan atau reservasi dalam satu halaman ringan.',
          'Orang yang mencari kafe terdekat langsung dapat jawabannya.',
        ],
        outcome:
          'Contoh: Menu, jam buka, peta, dan tombol pesan atau reservasi dalam satu halaman ringan. Orang yang mencari kafe terdekat langsung dapat jawabannya.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Contoh penggunaan untuk Properti',
        workflowLines: [
          'Halaman per proyek dengan galeri, tipe unit, dan formulir minat.',
          'Pesan calon pembeli masuk lengkap dengan tipe unit yang diminati.',
        ],
        outcome:
          'Contoh: Halaman per proyek dengan galeri, tipe unit, dan formulir minat. Pesan calon pembeli masuk lengkap dengan tipe unit yang diminati.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa profesional',
        scenarioTitle: 'Contoh penggunaan untuk Jasa profesional',
        workflowLines: [
          'Halaman layanan dengan alur kerja yang jelas dan formulir konsultasi.',
          'Pengunjung paham prosesnya sebelum menghubungi.',
        ],
        outcome:
          'Contoh: Halaman layanan dengan alur kerja yang jelas dan formulir konsultasi. Pengunjung paham prosesnya sebelum menghubungi.',
      },
    ],
    comparisonTable: {
      headers: ['Kategori', 'Landing page', 'Company profile', 'Web custom'],
      rows: [
        {
          feature: 'Cocok untuk',
          landingPage: 'Satu tujuan, misalnya booking atau iklan',
          companyProfile: 'Bisnis yang butuh tampil lengkap dan terpercaya',
          webCustom: 'Kebutuhan khusus seperti booking, pembayaran, atau login',
        },
        {
          feature: 'Jumlah halaman',
          landingPage: 'Satu halaman',
          companyProfile: 'Beberapa halaman',
          webCustom: 'Sesuai kebutuhan',
        },
        {
          feature: 'Isi umum',
          landingPage: 'Penawaran, bukti, tombol aksi',
          companyProfile: 'Profil, layanan, galeri, kontak',
          webCustom: 'Fitur khusus dan integrasi',
        },
        {
          feature: 'Harga',
          landingPage: 'Mulai Rp1.200.000',
          companyProfile: 'Dihitung sesuai jumlah halaman',
          webCustom: 'Dihitung setelah audit gratis',
        },
      ],
    },
    prinsipTeknis:
      'Halaman dibuat statis supaya cepat. Gambar dikompres dan diberi ukuran yang tepat. Skrip pihak ketiga dipasang hanya kalau memang perlu. Hasilnya diuji di HP, bukan hanya di laptop.',
    hargaDanScope:
      'Mulai Rp1.200.000 untuk landing page. Biaya naik kalau jumlah halaman, fitur (misalnya booking atau pembayaran), atau integrasi bertambah. Angka pastinya kami sampaikan setelah audit gratis, sebelum kamu membayar apa pun.',
    siapkanSebelumAudit: [
      'Tautan media sosial atau website lama',
      'Contoh website pesaing yang kamu suka',
      'Aksi utama yang kamu inginkan dari pengunjung (booking, chat, atau beli)',
      'Foto dan logo yang sudah ada',
    ],
    faq: [
      {
        question: 'Berapa harga pembuatan website?',
        answer:
          'Landing page mulai Rp1.200.000. Company profile dan website dengan fitur khusus dihitung sesuai jumlah halaman dan fiturnya, setelah audit gratis.',
      },
      {
        question: 'Berapa lama pengerjaannya?',
        answer:
          'Landing page sederhana biasanya selesai dalam hitungan hari. Website dengan banyak halaman atau fitur butuh hitungan minggu. Estimasi pastinya kami beri setelah audit.',
      },
      {
        question: 'Apakah website bisa muncul di Google?',
        answer:
          'Kami menyiapkan dasar SEO: judul dan deskripsi tiap halaman, struktur heading, sitemap, dan data terstruktur. Peringkat tetap bergantung pada persaingan dan waktu, jadi tidak ada yang bisa menjanjikan posisi tertentu.',
      },
      {
        question: 'Domain dan hosting atas nama siapa?',
        answer:
          'Atas namamu. Kamu pemilik domain dan hostingnya, jadi tidak terkunci pada kami.',
      },
      {
        question: 'Setelah rilis, siapa yang merawat?',
        answer:
          'Kamu bisa memakai paket rawat bulanan dari kami atau memegangnya sendiri. Kita tentukan di awal.',
      },
    ],
    hasAreaPages: true,
    updatedAt: '2026-03-20',
    title: 'Pembuatan website dan landing page',
    shortTitle: 'Pembuatan Website',
    tagline: 'Pembuatan website dan landing page',
    shortPromise:
      'Website yang cepat dibuka, jelas menawarkan apa, dan siap dipasangi iklan. Mulai Rp1.200.000.',
    summary:
      'Pembuatan website di CHESTAADOTCOM mencakup landing page, company profile, dan web custom untuk bisnis di Tangerang Selatan dan Jabodetabek. Setiap halaman dibuat cepat, nyaman dibaca di HP, dan punya satu tujuan jelas, misalnya booking atau pesan WhatsApp. Harga mulai Rp1.200.000, tergantung kompleksitas.',
    bentoSpan: 'large',
    timeline: 'Hitungan hari (landing page sederhana)',
    bestForSummary: 'Landing page iklan, company profile, dan web custom bisnis',
    forWho: [
      'Sudah memasang iklan tapi pengunjung langsung pergi.',
      'Belum punya website, atau websitemu lambat dan susah dibuka di HP.',
      'Ingin calon pelanggan bisa booking atau chat tanpa banyak langkah.',
      'Ingin ditemukan di Google saat orang mencari jasamu di daerahmu.',
    ],
    deliverables: [
      {
        title: 'Struktur halaman dan tulisan',
        description: 'Menjawab pertanyaan calon pelanggan sebelum mereka bertanya.',
      },
      {
        title: 'Desain responsif',
        description: 'Rapi di HP, tablet, dan desktop.',
      },
      {
        title: 'Kecepatan',
        description: 'Gambar dioptimasi, skrip seperlunya, diuji di PageSpeed Insights.',
      },
      {
        title: 'SEO dasar',
        description: 'Judul dan deskripsi tiap halaman, struktur heading, sitemap, dan data terstruktur.',
      },
      {
        title: 'Tombol WhatsApp dan formulir',
        description: 'Langsung menyampaikan pesan ke kamu.',
      },
      {
        title: 'Pelacakan dasar',
        description: 'Kalau kamu mau, supaya kelihatan dari mana pengunjung datang.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description: 'Kami lihat tujuan bisnismu, halaman yang ada, dan pesaing di sekitarmu.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description: 'Kamu melihat struktur dan tampilannya sebelum dibangun penuh.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description: 'Dibangun, lalu diuji di HP dan di PageSpeed Insights.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description: 'Online, dipantau, dan diperbaiki setelah data pengunjung masuk.',
      },
    ],
    useCases: [],
    stackChips: ['Halaman Statis', 'Optimasi Gambar', 'Data Terstruktur', 'PageSpeed Insights'],
    pricingNote: {
      label: 'Mulai Rp1.200.000',
      startingPriceNumeric: 1200000,
      reason:
        'Mulai Rp1.200.000 untuk landing page. Biaya naik kalau jumlah halaman, fitur (misalnya booking atau pembayaran), atau integrasi bertambah.',
      scopeNote:
        'Angka pastinya kami sampaikan setelah audit gratis, sebelum kamu membayar apa pun.',
    },
    relatedCaseSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedPostSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'checklist-landing-page-konversi-tinggi-umkm-b2b',
    ],
    seo: {
      title: 'Jasa Pembuatan Website Bisnis di Tangsel | CHESTAADOTCOM',
      description:
        'Pembuatan website dan landing page untuk bisnis di BSD, Pamulang, dan Tangerang Selatan. Cepat dibuka, rapi di HP, siap iklan. Mulai Rp1.200.000.',
    },
    imageKey: 'serviceWebLandingPage',
  },

  // 2. ai-agent
  {
    slug: 'ai-agent',
    enSlug: 'ai-agents',
    urlSlug: 'ai-agent',
    eyebrow: 'AI agent',
    h1: 'Jasa AI agent untuk bisnis: balas WhatsApp, booking, dan follow-up berjalan sendiri',
    sub: 'AI agent membaca maksud pelanggan, memakai tool seperti kalender dan database, lalu mengerjakan tugasnya sampai selesai. Kalau perlu manusia, agent menyerahkannya ke timmu beserta ringkasan.',
    ringkasanSingkat:
      'AI agent adalah sistem yang memahami pesan pelanggan, memakai tool seperti kalender, database, atau CRM, lalu menyelesaikan tugas, misalnya membuat booking atau mengirim follow-up. CHESTAADOTCOM membangun AI agent untuk bisnis di Tangerang Selatan dan Jabodetabek, lengkap dengan batas tindakan dan serah ke manusia. Biaya dihitung setelah audit gratis.',
    cocokKalau: [
      'Menjawab pertanyaan yang sama berulang kali setiap hari.',
      'Punya pesan masuk malam hari yang baru terbalas besok pagi.',
      'Mencatat data dari chat ke spreadsheet secara manual.',
      'Kehilangan calon pelanggan karena tidak ada yang menindaklanjuti setelah mereka bertanya harga.',
    ],
    kapanTidakPerlu:
      'Kalau pesan yang masuk hanya beberapa per hari dan semuanya butuh sentuhan pribadi, agent belum diperlukan. Kami bilang itu terus terang saat audit.',
    yangKamuDapat: [
      {
        title: 'Agent yang terhubung',
        description: 'Ke WhatsApp Business dan tool yang sudah kamu pakai.',
      },
      {
        title: 'Aturan tindakan',
        description:
          'Apa yang boleh dan tidak boleh dilakukan agent, ditulis bersama kamu.',
      },
      {
        title: 'Serah ke staf',
        description:
          'Kasus di luar aturan diteruskan lengkap dengan ringkasan percakapan.',
      },
      {
        title: 'Log semua tindakan',
        description: 'Yang bisa kamu periksa.',
      },
      {
        title: 'Pengujian dengan percakapan nyata',
        description: 'Dari bisnismu sebelum rilis.',
      },
      {
        title: 'Pendampingan dan penyesuaian',
        description: 'Setelah timmu memakainya.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description:
          'Kami petakan percakapan dan tugas berulang, lalu bilang jujur mana yang layak diserahkan ke agent dan mana yang tidak.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description:
          'Kamu melihat contoh alur percakapan dan aturan tindakannya sebelum kami bangun penuh.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description:
          'Agent diuji dengan percakapan nyata, termasuk pertanyaan sulit dan permintaan yang aneh.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description:
          'Kami memantau log, memperbaiki jawaban yang meleset, dan menyesuaikan aturan seiring dipakai.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Contoh penggunaan untuk Klinik',
        workflowLines: [
          'Pelanggan menulis "besok jam 4 bisa facial?".',
          'Agent mengecek kalender terapis, membuat booking, mengirim konfirmasi, mencatatnya di CRM, dan mengingatkan sehari sebelumnya.',
        ],
        outcome:
          'Contoh: Pelanggan menulis "besok jam 4 bisa facial?". Agent mengecek kalender terapis, membuat booking, mengirim konfirmasi, mencatatnya di CRM, dan mengingatkan sehari sebelumnya.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Contoh penggunaan untuk F&B',
        workflowLines: [
          'Agent menjawab menu, jam buka, dan ketersediaan meja, mencatat reservasi rombongan, lalu meneruskan komplain ke staf dengan konteks lengkap.',
        ],
        outcome:
          'Contoh: Agent menjawab menu, jam buka, dan ketersediaan meja, mencatat reservasi rombongan, lalu meneruskan komplain ke staf dengan konteks lengkap.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Contoh penggunaan untuk Properti',
        workflowLines: [
          'Agent menanyakan budget, lokasi, dan tipe unit, menjadwalkan survei, dan mengirim data calon pembeli ke agen yang tepat.',
        ],
        outcome:
          'Contoh: Agent menanyakan budget, lokasi, dan tipe unit, menjadwalkan survei, dan mengirim data calon pembeli ke agen yang tepat.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa profesional',
        scenarioTitle: 'Contoh penggunaan untuk Jasa profesional',
        workflowLines: [
          'Agent menerima permintaan konsultasi, mengumpulkan informasi awal, dan menjadwalkan pertemuan di kalender.',
        ],
        outcome:
          'Contoh: Agent menerima permintaan konsultasi, mengumpulkan informasi awal, dan menjadwalkan pertemuan di kalender.',
      },
    ],
    chatbotVsAgentTable: {
      headers: ['Aspek', 'Chatbot', 'AI agent'],
      rows: [
        {
          aspect: 'Memahami konteks percakapan',
          chatbot: 'Terbatas pada daftar jawaban',
          agent: 'Membaca maksud dan riwayat chat',
        },
        {
          aspect: 'Bertindak',
          chatbot: 'Berhenti di balasan',
          agent: 'Membuat booking, mencatat data, mengirim follow-up',
        },
        {
          aspect: 'Memakai tool',
          chatbot: 'Biasanya tidak',
          agent: 'Kalender, database, CRM, invoice',
        },
        {
          aspect: 'Kasus di luar aturan',
          chatbot: 'Jawaban buntu',
          agent: 'Diserahkan ke staf dengan ringkasan',
        },
        {
          aspect: 'Jejak tindakan',
          chatbot: 'Seadanya',
          agent: 'Log lengkap',
        },
        {
          aspect: 'Cocok untuk',
          chatbot: 'Pertanyaan sederhana yang tetap',
          agent: 'Alur kerja yang butuh beberapa langkah',
        },
      ],
    },
    guardrails: [
      {
        id: 'batas-jelas',
        title: 'Batas jelas',
        description:
          'Agent hanya boleh melakukan tindakan yang kita tentukan bersama.',
      },
      {
        id: 'serah-manusia',
        title: 'Serah ke manusia',
        description:
          'Kasus sensitif, seperti komplain, diteruskan ke stafmu otomatis.',
      },
      {
        id: 'semua-tercatat',
        title: 'Semua tercatat',
        description:
          'Setiap tindakan agent punya log yang bisa kamu periksa.',
      },
      {
        id: 'data-milikmu',
        title: 'Data tetap milikmu',
        description:
          'Data bisnismu tetap milikmu, dan akses diberikan hanya seperlunya.',
      },
    ],
    prinsipTeknis:
      'Agent diberi akses seminimal mungkin ke tool yang dibutuhkan. Tindakan berisiko meminta persetujuan manusia. Setiap versi diuji dengan percakapan nyata sebelum rilis. Pengalaman kami mencakup sistem chat berbasis AI, API gateway pintar, pemroses dokumen berbasis AI, dan sistem operasional untuk brand minuman, pondok pesantren, dan gudang logistik.',
    hargaDanScope:
      'Biaya AI agent dihitung setelah audit gratis, karena bergantung pada jumlah tool yang terhubung, banyaknya aturan bisnis, dan volume pesan. Kamu tahu angkanya sebelum membayar apa pun.',
    siapkanSebelumAudit: [
      'Sepuluh pertanyaan yang paling sering masuk dari pelanggan',
      'Jam operasional dan aturan harga',
      'Daftar tindakan yang boleh dilakukan agent',
      'Siapa yang menangani kasus di luar aturan',
    ],
    faq: [
      {
        question: 'Apa bedanya chatbot dan AI agent?',
        answer:
          'Chatbot menjawab dari daftar jawaban yang sudah disiapkan. AI agent memahami konteks, memakai tool seperti kalender atau database, lalu mengerjakan tugasnya sampai selesai.',
      },
      {
        question: 'Berapa biaya membuat AI agent?',
        answer:
          'Dihitung setelah audit gratis, karena bergantung pada jumlah tool, aturan, dan volume pesan. Kamu menerima angkanya sebelum membayar apa pun.',
      },
      {
        question: 'Bagaimana kalau agent salah menjawab?',
        answer:
          'Agent punya batas tindakan dan aturan serah ke manusia. Kasus sensitif diteruskan ke stafmu, dan semua percakapan tercatat supaya bisa diperiksa dan diperbaiki.',
      },
      {
        question: 'Apakah data pelanggan saya aman?',
        answer:
          'Data tetap milikmu. Kami hanya mengakses yang diperlukan untuk membangun dan merawat sistem, dan aksesnya dicabut saat proyek atau kontrak rawat berakhir.',
      },
      {
        question: 'Apakah bisa lewat WhatsApp?',
        answer:
          'Bisa. Agent berjalan lewat WhatsApp Business Platform resmi dari Meta, yang punya ketentuan akun dan nomor sendiri. Kami jelaskan opsinya dan membantu pendaftaran saat audit.',
      },
    ],
    hasAreaPages: true,
    updatedAt: '2026-03-20',
    title: 'AI agent',
    shortTitle: 'AI Agent',
    tagline: 'AI agent',
    shortPromise:
      'AI agent membaca maksud pelanggan, memakai tool seperti kalender dan database, lalu mengerjakan tugasnya sampai selesai.',
    summary:
      'AI agent adalah sistem yang memahami pesan pelanggan, memakai tool seperti kalender, database, atau CRM, lalu menyelesaikan tugas, misalnya membuat booking atau mengirim follow-up. CHESTAADOTCOM membangun AI agent untuk bisnis di Tangerang Selatan dan Jabodetabek, lengkap dengan batas tindakan dan serah ke manusia. Biaya dihitung setelah audit gratis.',
    bentoSpan: 'large',
    timeline: 'Hitungan minggu (estimasi pasti setelah audit)',
    bestForSummary: 'Balas WhatsApp, booking kalender, pencatatan CRM, dan follow-up',
    forWho: [
      'Menjawab pertanyaan yang sama berulang kali setiap hari.',
      'Punya pesan masuk malam hari yang baru terbalas besok pagi.',
      'Mencatat data dari chat ke spreadsheet secara manual.',
      'Kehilangan calon pelanggan karena tidak ada yang menindaklanjuti setelah mereka bertanya harga.',
    ],
    deliverables: [
      {
        title: 'Agent yang terhubung',
        description: 'Ke WhatsApp Business dan tool yang sudah kamu pakai.',
      },
      {
        title: 'Aturan tindakan',
        description: 'Apa yang boleh dan tidak boleh dilakukan agent, ditulis bersama kamu.',
      },
      {
        title: 'Serah ke staf',
        description: 'Kasus di luar aturan diteruskan lengkap dengan ringkasan percakapan.',
      },
      {
        title: 'Log semua tindakan',
        description: 'Yang bisa kamu periksa.',
      },
      {
        title: 'Pengujian dengan percakapan nyata',
        description: 'Dari bisnismu sebelum rilis.',
      },
      {
        title: 'Pendampingan dan penyesuaian',
        description: 'Setelah timmu memakainya.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description:
          'Kami petakan percakapan dan tugas berulang, lalu bilang jujur mana yang layak diserahkan ke agent dan mana yang tidak.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description:
          'Kamu melihat contoh alur percakapan dan aturan tindakannya sebelum kami bangun penuh.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description:
          'Agent diuji dengan percakapan nyata, termasuk pertanyaan sulit dan permintaan yang aneh.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description:
          'Kami memantau log, memperbaiki jawaban yang meleset, dan menyesuaikan aturan seiring dipakai.',
      },
    ],
    useCases: [],
    stackChips: ['WhatsApp Business', 'Kalender & CRM', 'Batas Tindakan', 'Log Lengkap'],
    pricingNote: {
      label: 'Dihitung setelah audit gratis',
      reason:
        'Biaya AI agent dihitung setelah audit gratis, karena bergantung pada jumlah tool yang terhubung, banyaknya aturan bisnis, dan volume pesan.',
      scopeNote: 'Kamu tahu angkanya sebelum membayar apa pun.',
    },
    relatedCaseSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedPostSlugs: [
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
      'Apa-Bedanya-AI-Agent-dan-Chatbot-Biasa-untuk-Operasional-Bisnis',
      'Mengenal-Model-Context-Protocol-MCP-Cara-AI-Terkoneksi-ke-Data-Bisnis',
    ],
    seo: {
      title: 'Jasa AI Agent untuk Bisnis di Tangsel | CHESTAADOTCOM',
      description:
        'AI agent untuk bisnis di BSD, Pamulang, dan Tangerang Selatan: balas WhatsApp, booking, dan follow-up berjalan sendiri. Biaya dihitung setelah audit gratis.',
    },
    imageKey: 'serviceAiAgent',
  },

  // 3. software-custom
  {
    slug: 'software-custom',
    enSlug: 'custom-software',
    urlSlug: 'software-custom',
    eyebrow: 'Software custom',
    h1: 'Jasa pembuatan software custom: aplikasi web, dashboard, dan sistem internal',
    sub: 'Sistem yang mengikuti cara kerjamu, bukan sebaliknya. Dari dashboard laporan sampai aplikasi internal untuk timmu.',
    ringkasanSingkat:
      'Software custom dari CHESTAADOTCOM mencakup aplikasi web, dashboard, dan sistem internal untuk bisnis di Tangerang Selatan dan Jabodetabek. Dibangun mengikuti alur kerja yang sudah berjalan di timmu, dimulai dari versi kecil yang bisa dipakai cepat lalu dikembangkan bertahap. Biaya dihitung setelah audit gratis.',
    cocokKalau: [
      'Memakai spreadsheet yang makin berat dan sering salah.',
      'Punya beberapa aplikasi yang tidak saling terhubung.',
      'Menemukan aplikasi jadi yang tidak cocok dengan alur kerjamu.',
      'Butuh laporan yang diperbarui otomatis, atau portal untuk pelanggan dan mitra.',
    ],
    kapanTidakPerlu:
      'Kalau alurmu standar dan aplikasi jadi sudah memenuhi kebutuhan dengan biaya wajar, pakai itu. Software custom baru masuk akal saat alurmu khas atau data harus tersambung antar sistem.',
    yangKamuDapat: [
      {
        title: 'Alur dan kebutuhan yang ditulis jelas',
        description: 'Sebelum satu baris kode dibuat.',
      },
      {
        title: 'Aplikasi web responsif',
        description: 'Yang nyaman dipakai di HP dan desktop.',
      },
      {
        title: 'Login dan hak akses per peran',
        description: 'Misalnya admin, staf, dan pelanggan.',
      },
      {
        title: 'Dashboard dan laporan',
        description: 'Yang diperbarui dari data yang sama.',
      },
      {
        title: 'Integrasi dengan tool yang kamu pakai',
        description: 'Lewat API.',
      },
      {
        title: 'Dokumentasi dan pelatihan singkat',
        description: 'Untuk timmu.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description:
          'Kami pelajari alur kerjamu dan bilang jujur apakah software custom memang diperlukan atau aplikasi jadi sudah cukup.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description:
          'Kamu mencoba kerangka layar dan alurnya sebelum fitur dibangun.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description:
          'Dibangun bertahap, setiap tahap dicoba oleh orang yang akan memakainya.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description:
          'Versi pertama dirilis lebih dulu, lalu disempurnakan berdasarkan pemakaian nyata.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Contoh penggunaan untuk Klinik',
        workflowLines: [
          'Pencatatan pasien dan jadwal dalam satu sistem, dengan laporan harian untuk pemilik.',
        ],
        outcome:
          'Contoh: Pencatatan pasien dan jadwal dalam satu sistem, dengan laporan harian untuk pemilik.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Contoh penggunaan untuk F&B',
        workflowLines: [
          'Stok bahan dan laporan penjualan beberapa cabang di satu dashboard.',
        ],
        outcome:
          'Contoh: Stok bahan dan laporan penjualan beberapa cabang di satu dashboard.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Contoh penggunaan untuk Properti',
        workflowLines: [
          'Data calon pembeli dan status unit terpusat, sehingga tim tahu siapa yang perlu ditindaklanjuti.',
        ],
        outcome:
          'Contoh: Data calon pembeli dan status unit terpusat, sehingga tim tahu siapa yang perlu ditindaklanjuti.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa profesional',
        scenarioTitle: 'Contoh penggunaan untuk Jasa profesional',
        workflowLines: [
          'Pelacakan proyek, tenggat, dan tagihan di satu tempat.',
        ],
        outcome:
          'Contoh: Pelacakan proyek, tenggat, dan tagihan di satu tempat.',
      },
    ],
    prinsipTeknis:
      'Kami mulai dari versi terkecil yang sudah berguna, lalu menambah fitur bertahap. Kode ditulis supaya mudah dirawat dan hak kepemilikannya disepakati tertulis di awal. Data dicadangkan dan akses dibatasi per peran.',
    hargaDanScope:
      'Dihitung setelah audit gratis. Yang memengaruhi biaya: jumlah peran pengguna, jumlah fitur, integrasi dengan tool lain, dan kebutuhan laporan. Kamu menerima angka dan cakupan kerjanya sebelum membayar apa pun.',
    siapkanSebelumAudit: [
      'Alur kerja sekarang dan aplikasi atau spreadsheet yang dipakai',
      'Siapa saja penggunanya dan perannya',
      'Laporan yang paling kamu butuhkan',
      'Contoh data nyata dengan informasi sensitif disamarkan',
    ],
    faq: [
      {
        question: 'Kapan saya perlu software custom, bukan aplikasi jadi?',
        answer:
          'Pilih aplikasi jadi kalau alurmu standar dan kamu nyaman menyesuaikan cara kerja. Pilih custom kalau alurmu khas, datamu perlu terhubung antar sistem, atau biaya langganan per pengguna mulai membengkak.',
      },
      {
        question: 'Berapa biayanya?',
        answer:
          'Dihitung setelah audit gratis, sesuai jumlah peran, fitur, dan integrasi. Kamu menerima angkanya sebelum membayar apa pun.',
      },
      {
        question: 'Apakah bisa dibangun bertahap?',
        answer:
          'Bisa, dan itu cara yang kami sarankan. Versi pertama berisi fitur yang paling berguna, lalu ditambah setelah dipakai.',
      },
      {
        question: 'Bagaimana dengan kepemilikan kode dan data?',
        answer:
          'Data bisnismu tetap milikmu. Kepemilikan kode kita sepakati tertulis di awal proyek.',
      },
      {
        question: 'Siapa yang merawat setelah rilis?',
        answer:
          'Kamu bisa memakai paket rawat dari kami atau menyerahkannya ke tim lain, karena kodenya didokumentasikan. Kita tentukan di awal.',
      },
    ],
    hasAreaPages: false,
    updatedAt: '2026-03-20',
    title: 'Software custom',
    shortTitle: 'Software Custom',
    tagline: 'Software custom',
    shortPromise:
      'Sistem yang mengikuti cara kerjamu, bukan sebaliknya. Dari dashboard laporan sampai aplikasi internal untuk timmu.',
    summary:
      'Software custom dari CHESTAADOTCOM mencakup aplikasi web, dashboard, dan sistem internal untuk bisnis di Tangerang Selatan dan Jabodetabek. Dibangun mengikuti alur kerja yang sudah berjalan di timmu, dimulai dari versi kecil yang bisa dipakai cepat lalu dikembangkan bertahap. Biaya dihitung setelah audit gratis.',
    bentoSpan: 'small',
    timeline: 'Hitungan minggu (estimasi pasti setelah audit)',
    bestForSummary: 'Aplikasi web, dashboard laporan, dan sistem internal',
    forWho: [
      'Memakai spreadsheet yang makin berat dan sering salah.',
      'Punya beberapa aplikasi yang tidak saling terhubung.',
      'Menemukan aplikasi jadi yang tidak cocok dengan alur kerjamu.',
      'Butuh laporan yang diperbarui otomatis, atau portal untuk pelanggan dan mitra.',
    ],
    deliverables: [
      {
        title: 'Alur dan kebutuhan yang ditulis jelas',
        description: 'Sebelum satu baris kode dibuat.',
      },
      {
        title: 'Aplikasi web responsif',
        description: 'Yang nyaman dipakai di HP dan desktop.',
      },
      {
        title: 'Login dan hak akses per peran',
        description: 'Misalnya admin, staf, dan pelanggan.',
      },
      {
        title: 'Dashboard dan laporan',
        description: 'Yang diperbarui dari data yang sama.',
      },
      {
        title: 'Integrasi dengan tool yang kamu pakai',
        description: 'Lewat API.',
      },
      {
        title: 'Dokumentasi dan pelatihan singkat',
        description: 'Untuk timmu.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description:
          'Kami pelajari alur kerjamu dan bilang jujur apakah software custom memang diperlukan atau aplikasi jadi sudah cukup.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description: 'Kamu mencoba kerangka layar dan alurnya sebelum fitur dibangun.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description: 'Dibangun bertahap, setiap tahap dicoba oleh orang yang akan memakainya.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description: 'Versi pertama dirilis lebih dulu, lalu disempurnakan berdasarkan pemakaian nyata.',
      },
    ],
    useCases: [],
    stackChips: ['Aplikasi Web', 'Hak Akses Peran', 'Dashboard Laporan', 'Integrasi API'],
    pricingNote: {
      label: 'Dihitung setelah audit gratis',
      reason:
        'Dihitung setelah audit gratis. Yang memengaruhi biaya: jumlah peran pengguna, jumlah fitur, integrasi dengan tool lain, dan kebutuhan laporan.',
      scopeNote: 'Kamu menerima angka dan cakupan kerjanya sebelum membayar apa pun.',
    },
    relatedCaseSlugs: ['dashboard-kafe', 'pemroses-dokumen'],
    relatedPostSlugs: [
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'Vibe-Coding-untuk-Bisnis-Kapan-Pakai-AI-dan-Kapan-Harus-Rekayasa-Software-Asli',
    ],
    seo: {
      title: 'Jasa Software Custom dan Dashboard di Tangsel | CHESTAADOTCOM',
      description:
        'Aplikasi web, dashboard, dan sistem internal sesuai alur kerja bisnismu. Melayani Tangerang Selatan, BSD, dan Jabodetabek. Mulai dari audit gratis.',
    },
    imageKey: 'serviceSoftwareCustom',
  },

  // 4. otomasi-workflow
  {
    slug: 'otomasi-workflow',
    enSlug: 'workflow-automation',
    urlSlug: 'otomasi-workflow',
    eyebrow: 'Otomasi workflow',
    h1: 'Jasa otomasi workflow bisnis: sambungkan WhatsApp, Sheets, kalender, dan invoice',
    sub: 'Pekerjaan berulang yang selama ini disalin manual antar aplikasi jadi berjalan otomatis, lengkap dengan notifikasi kalau ada yang gagal.',
    ringkasanSingkat:
      'Otomasi workflow adalah menyambungkan aplikasi yang sudah kamu pakai, seperti WhatsApp, Google Sheets, kalender, dan invoice, supaya tugas berulang berjalan sendiri. CHESTAADOTCOM membangun otomasi untuk bisnis di Tangerang Selatan dan Jabodetabek, lengkap dengan log dan notifikasi kegagalan. Biaya dihitung setelah audit gratis.',
    cocokKalau: [
      'Memasukkan data yang sama ke dua atau tiga tempat.',
      'Menyusun laporan mingguan secara manual.',
      'Mengandalkan ingatan staf untuk pengingat dan notifikasi.',
      'Sering terlambat mengirim invoice atau tagihan.',
    ],
    kapanTidakPerlu:
      'Kalau tugasnya hanya muncul beberapa kali sebulan, mengerjakannya manual lebih murah daripada membangun otomasi. Kami akan bilang begitu kalau memang itu jawabannya.',
    yangKamuDapat: [
      {
        title: 'Pemetaan alur kerja',
        description: 'Sebelum otomasi dibuat.',
      },
      {
        title: 'Otomasi antar tool',
        description: 'Yang kamu pakai.',
      },
      {
        title: 'Penanganan error dan notifikasi',
        description: 'Saat ada langkah yang gagal.',
      },
      {
        title: 'Log eksekusi',
        description: 'Yang bisa diperiksa.',
      },
      {
        title: 'Dokumentasi alur',
        description: 'Supaya timmu paham apa yang berjalan.',
      },
      {
        title: 'Opsional: AI untuk langkah teks',
        description:
          'Untuk langkah yang perlu memahami teks, misalnya mengelompokkan pesan masuk.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description:
          'Kami catat tugas berulang timmu dan pilih yang paling banyak memakan waktu.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description:
          'Kamu melihat diagram alurnya dan memastikan aturannya benar.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description:
          'Otomasi dijalankan dengan data contoh, termasuk skenario gagal.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description:
          'Kami memantau log dan memperbaiki saat tool pihak ketiga berubah.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Contoh penggunaan untuk Klinik',
        workflowLines: [
          'Pengingat janji temu terkirim otomatis, dan rekap harian masuk ke pemilik setiap malam.',
        ],
        outcome:
          'Contoh: Pengingat janji temu terkirim otomatis, dan rekap harian masuk ke pemilik setiap malam.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Contoh penggunaan untuk F&B',
        workflowLines: [
          'Penjualan harian terekap ke Google Sheets, dan notifikasi muncul saat stok bahan menipis.',
        ],
        outcome:
          'Contoh: Penjualan harian terekap ke Google Sheets, dan notifikasi muncul saat stok bahan menipis.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Contoh penggunaan untuk Properti',
        workflowLines: [
          'Calon pembeli dari formulir iklan masuk ke CRM dan agen yang bertugas langsung diberi tahu.',
        ],
        outcome:
          'Contoh: Calon pembeli dari formulir iklan masuk ke CRM dan agen yang bertugas langsung diberi tahu.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa profesional',
        scenarioTitle: 'Contoh penggunaan untuk Jasa profesional',
        workflowLines: [
          'Invoice terkirim otomatis setelah proyek selesai, lalu pengingat pembayaran dikirim sesuai jadwal.',
        ],
        outcome:
          'Contoh: Invoice terkirim otomatis setelah proyek selesai, lalu pengingat pembayaran dikirim sesuai jadwal.',
      },
    ],
    prinsipTeknis:
      'Setiap alur punya penanganan kegagalan dan notifikasi, jadi masalah ketahuan sebelum pelanggan yang menemukannya. Akses ke tiap aplikasi dibatasi seperlunya. Alur didokumentasikan supaya tidak bergantung pada satu orang.',
    hargaDanScope:
      'Dihitung setelah audit gratis, sesuai jumlah alur, jumlah tool yang dihubungkan, dan volume data. Langganan aplikasi pihak ketiga dibayar langsung oleh kamu sesuai paket penyedianya; biaya bangun dan rawat otomasi dari kami.',
    siapkanSebelumAudit: [
      'Daftar tugas berulang dan seberapa sering terjadi',
      'Aplikasi yang dipakai di tiap langkah',
      'Aturan pengecualian, misalnya kapan harus ditangani manual',
      'Siapa yang diberi tahu kalau ada langkah yang gagal',
    ],
    faq: [
      {
        question: 'Apa bedanya otomasi workflow dan AI agent?',
        answer:
          'Otomasi menjalankan langkah yang aturannya tetap, misalnya "jika ada pesanan baru, catat ke Sheets". AI agent dipakai kalau tugasnya butuh memahami pesan dan mengambil keputusan.',
      },
      {
        question: 'Aplikasi apa saja yang bisa dihubungkan?',
        answer:
          'Selama aplikasinya punya API atau integrasi resmi. Kami periksa saat audit.',
      },
      {
        question: 'Bagaimana kalau satu langkah gagal?',
        answer:
          'Alur dirancang dengan notifikasi kegagalan dan log, jadi masalahnya ketahuan dan prosesnya bisa diulang.',
      },
      {
        question: 'Apakah ada biaya bulanan?',
        answer:
          'Langganan aplikasi pihak ketiga dibayar langsung olehmu sesuai paket penyedia. Biaya rawat otomasi dari kami hanya kalau kamu memilih paket rawat.',
      },
      {
        question: 'Berapa lama pengerjaannya?',
        answer:
          'Satu alur sederhana biasanya selesai dalam hitungan hari, beberapa alur yang saling terhubung butuh hitungan minggu. Estimasi pastinya kami beri setelah audit.',
      },
    ],
    hasAreaPages: false,
    updatedAt: '2026-03-20',
    title: 'Otomasi workflow',
    shortTitle: 'Otomasi Workflow',
    tagline: 'Otomasi workflow',
    shortPromise:
      'Pekerjaan berulang yang selama ini disalin manual antar aplikasi jadi berjalan otomatis, lengkap dengan notifikasi kalau ada yang gagal.',
    summary:
      'Otomasi workflow adalah menyambungkan aplikasi yang sudah kamu pakai, seperti WhatsApp, Google Sheets, kalender, dan invoice, supaya tugas berulang berjalan sendiri. CHESTAADOTCOM membangun otomasi untuk bisnis di Tangerang Selatan dan Jabodetabek, lengkap dengan log dan notifikasi kegagalan. Biaya dihitung setelah audit gratis.',
    bentoSpan: 'small',
    timeline: 'Hitungan hari hingga minggu (estimasi setelah audit)',
    bestForSummary: 'Sambungkan WhatsApp, Sheets, kalender, dan invoice otomatis',
    forWho: [
      'Memasukkan data yang sama ke dua atau tiga tempat.',
      'Menyusun laporan mingguan secara manual.',
      'Mengandalkan ingatan staf untuk pengingat dan notifikasi.',
      'Sering terlambat mengirim invoice atau tagihan.',
    ],
    deliverables: [
      {
        title: 'Pemetaan alur kerja',
        description: 'Sebelum otomasi dibuat.',
      },
      {
        title: 'Otomasi antar tool',
        description: 'Yang kamu pakai.',
      },
      {
        title: 'Penanganan error dan notifikasi',
        description: 'Saat ada langkah yang gagal.',
      },
      {
        title: 'Log eksekusi',
        description: 'Yang bisa diperiksa.',
      },
      {
        title: 'Dokumentasi alur',
        description: 'Supaya timmu paham apa yang berjalan.',
      },
      {
        title: 'Opsional: AI untuk langkah teks',
        description: 'Untuk langkah yang perlu memahami teks, misalnya mengelompokkan pesan masuk.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 menit',
        title: 'Audit gratis (30 menit)',
        description: 'Kami catat tugas berulang timmu dan pilih yang paling banyak memakan waktu.',
      },
      {
        num: '2',
        duration: 'Tahap 2',
        title: 'Rancang dan prototipe',
        description: 'Kamu melihat diagram alurnya dan memastikan aturannya benar.',
      },
      {
        num: '3',
        duration: 'Tahap 3',
        title: 'Bangun dan uji',
        description: 'Otomasi dijalankan dengan data contoh, termasuk skenario gagal.',
      },
      {
        num: '4',
        duration: 'Tahap 4',
        title: 'Rilis dan rawat',
        description: 'Kami memantau log dan memperbaiki saat tool pihak ketiga berubah.',
      },
    ],
    useCases: [],
    stackChips: ['WhatsApp', 'Google Sheets', 'Kalender & Invoice', 'Log & Notifikasi'],
    pricingNote: {
      label: 'Dihitung setelah audit gratis',
      reason:
        'Dihitung setelah audit gratis, sesuai jumlah alur, jumlah tool yang dihubungkan, dan volume data.',
      scopeNote:
        'Langganan aplikasi pihak ketiga dibayar langsung oleh kamu sesuai paket penyedianya; biaya bangun dan rawat otomasi dari kami.',
    },
    relatedCaseSlugs: ['lead-properti'],
    relatedPostSlugs: [
      'Cara-Otomasi-Workflow-Bisnis-Tanpa-Harus-Ganti-Semua-Aplikasi-Lama',
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    ],
    seo: {
      title: 'Jasa Otomasi Workflow Bisnis di Tangsel | CHESTAADOTCOM',
      description:
        'Sambungkan WhatsApp, Google Sheets, kalender, dan invoice supaya kerja berulang berjalan otomatis. Melayani bisnis di Tangsel dan Jabodetabek. Audit gratis.',
    },
    imageKey: 'serviceOtomasiWorkflow',
  },
];

// ============================================================================
// ENGLISH SERVICES DATA (1:1 FAITHFUL TRANSLATION OF SECTION 4)
// ============================================================================
export const SERVICES_DATA_EN: ServiceItem[] = [
  // 1. website-development (pembuatan-website)
  {
    slug: 'pembuatan-website',
    enSlug: 'website-development',
    urlSlug: 'website-development',
    eyebrow: 'Website and landing page development',
    h1: 'Website and landing page development for businesses in South Tangerang',
    sub: 'Websites that open quickly, state clearly what you offer, and are ready for ads. Built so visitors actually contact you, not just browse.',
    ringkasanSingkat:
      'Website development at CHESTAADOTCOM covers landing pages, company profiles, and custom websites for businesses in South Tangerang and Greater Jakarta. Every page is built to load fast, read comfortably on mobile phones, and focus on one clear goal, such as a booking or a WhatsApp message. Pricing starts from IDR 1,200,000, depending on complexity.',
    cocokKalau: [
      'You are already running ads, but visitors leave right away.',
      'You do not have a website yet, or your current site is slow and hard to open on mobile phones.',
      'You want prospective customers to book or chat without taking many steps.',
      'You want to be found on Google when people search for your service in your area.',
    ],
    kapanTidakPerlu:
      'If you only need a single page for a bio link and are not advertising anything yet, a free template is enough. We are much more useful when that page needs to generate messages, bookings, or purchases.',
    yangKamuDapat: [
      {
        title: 'Page structure and copy',
        description:
          'Answers prospective customers’ questions before they have to ask.',
      },
      {
        title: 'Responsive design',
        description: 'Clean and tidy on mobile phones, tablets, and desktops.',
      },
      {
        title: 'Speed',
        description:
          'Optimized images, only necessary scripts, tested on PageSpeed Insights.',
      },
      {
        title: 'Foundational SEO',
        description:
          'Titles and descriptions for each page, heading structure, sitemap, and structured data.',
      },
      {
        title: 'WhatsApp buttons and forms',
        description: 'Deliver messages straight to you.',
      },
      {
        title: 'Basic tracking',
        description:
          'If you want it, so you can see where your visitors come from.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description:
          'We look at your business goals, your existing pages, and competitors around you.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description:
          'You review the structure and layout before we build it in full.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description:
          'Built, then tested on mobile phones and on PageSpeed Insights.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description:
          'Live online, monitored, and refined after visitor data comes in.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinic',
        scenarioTitle: 'Example use case for Clinics',
        workflowLines: [
          'One page per treatment with starting prices, practice hours, and a booking button via WhatsApp.',
          'Prospective patients know what is offered and can book a slot right away.',
        ],
        outcome:
          'Example: One page per treatment with starting prices, practice hours, and a booking button via WhatsApp. Prospective patients know what is offered and can book a slot right away.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Example use case for F&B',
        workflowLines: [
          'Menu, opening hours, map, and an order or reservation button on one lightweight page.',
          'People searching for a nearby cafe get their answer immediately.',
        ],
        outcome:
          'Example: Menu, opening hours, map, and an order or reservation button on one lightweight page. People searching for a nearby cafe get their answer immediately.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Example use case for Property',
        workflowLines: [
          'A page per project with a gallery, unit types, and an interest form.',
          'Prospective buyer messages arrive complete with the unit type they are interested in.',
        ],
        outcome:
          'Example: A page per project with a gallery, unit types, and an interest form. Prospective buyer messages arrive complete with the unit type they are interested in.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional services',
        scenarioTitle: 'Example use case for Professional services',
        workflowLines: [
          'A service page with a clear workflow and a consultation form.',
          'Visitors understand the process before reaching out.',
        ],
        outcome:
          'Example: A service page with a clear workflow and a consultation form. Visitors understand the process before reaching out.',
      },
    ],
    comparisonTable: {
      headers: ['Category', 'Landing page', 'Company profile', 'Custom web'],
      rows: [
        {
          feature: 'Best for',
          landingPage: 'One goal, such as bookings or ads',
          companyProfile: 'Businesses that need a complete, credible presence',
          webCustom: 'Specific needs such as booking, payments, or login',
        },
        {
          feature: 'Number of pages',
          landingPage: 'One page',
          companyProfile: 'Multiple pages',
          webCustom: 'As needed',
        },
        {
          feature: 'Common contents',
          landingPage: 'Offer, proof, action button',
          companyProfile: 'Profile, services, gallery, contact',
          webCustom: 'Custom features and integrations',
        },
        {
          feature: 'Price',
          landingPage: 'Starting from IDR 1,200,000',
          companyProfile: 'Calculated by number of pages',
          webCustom: 'Calculated after free audit',
        },
      ],
    },
    prinsipTeknis:
      'Pages are built statically so they stay fast. Images are compressed and sized properly. Third-party scripts are added only when truly needed. Results are tested on mobile phones, not just on laptops.',
    hargaDanScope:
      'Starting from IDR 1,200,000 for a landing page. The cost increases as the number of pages, features (such as booking or payments), or integrations grows. We share the exact figure after the free audit, before you pay anything.',
    siapkanSebelumAudit: [
      'Links to your social media or old website',
      'Examples of competitor websites you like',
      'The main action you want from visitors (book, chat, or buy)',
      'Existing photos and logo',
    ],
    faq: [
      {
        question: 'How much does website development cost?',
        answer:
          'A landing page starts from IDR 1,200,000. Company profiles and websites with custom features are calculated based on the number of pages and features after the free audit.',
      },
      {
        question: 'How long does it take to build?',
        answer:
          'Simple landing pages usually take days. Websites with many pages or features take weeks. We give the exact estimate after the audit.',
      },
      {
        question: 'Can my website appear on Google?',
        answer:
          'We prepare the SEO foundation: title and description for each page, heading structure, sitemap, and structured data. Rankings still depend on competition and time, so no one can promise a specific position.',
      },
      {
        question: 'Whose name are the domain and hosting registered under?',
        answer:
          'Under your name. You own the domain and hosting, so you are never locked in with us.',
      },
      {
        question: 'After release, who maintains the website?',
        answer:
          'You can use our monthly maintenance plan or manage it yourself. We agree on this upfront.',
      },
    ],
    hasAreaPages: true,
    updatedAt: '2026-03-20',
    title: 'Website and landing page development',
    shortTitle: 'Website Development',
    tagline: 'Website and landing page development',
    shortPromise:
      'Websites that open quickly, state clearly what you offer, and are ready for ads. Starting from IDR 1,200,000.',
    summary:
      'Website development at CHESTAADOTCOM covers landing pages, company profiles, and custom websites for businesses in South Tangerang and Greater Jakarta. Every page is built to load fast, read comfortably on mobile phones, and focus on one clear goal, such as a booking or a WhatsApp message. Pricing starts from IDR 1,200,000, depending on complexity.',
    bentoSpan: 'large',
    timeline: 'Days (simple landing page)',
    bestForSummary: 'Ad landing pages, company profiles, and custom business websites',
    forWho: [
      'You are already running ads, but visitors leave right away.',
      'You do not have a website yet, or your current site is slow and hard to open on mobile phones.',
      'You want prospective customers to book or chat without taking many steps.',
      'You want to be found on Google when people search for your service in your area.',
    ],
    deliverables: [
      {
        title: 'Page structure and copy',
        description: 'Answers prospective customers’ questions before they have to ask.',
      },
      {
        title: 'Responsive design',
        description: 'Clean and tidy on mobile phones, tablets, and desktops.',
      },
      {
        title: 'Speed',
        description: 'Optimized images, only necessary scripts, tested on PageSpeed Insights.',
      },
      {
        title: 'Foundational SEO',
        description: 'Titles and descriptions for each page, heading structure, sitemap, and structured data.',
      },
      {
        title: 'WhatsApp buttons and forms',
        description: 'Deliver messages straight to you.',
      },
      {
        title: 'Basic tracking',
        description: 'If you want it, so you can see where your visitors come from.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description: 'We look at your business goals, your existing pages, and competitors around you.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description: 'You review the structure and layout before we build it in full.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description: 'Built, then tested on mobile phones and on PageSpeed Insights.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description: 'Live online, monitored, and refined after visitor data comes in.',
      },
    ],
    useCases: [],
    stackChips: ['Static Pages', 'Image Compression', 'Structured Data', 'PageSpeed Insights'],
    pricingNote: {
      label: 'Starting from IDR 1,200,000',
      startingPriceNumeric: 1200000,
      reason:
        'Starting from IDR 1,200,000 for a landing page. The cost increases as the number of pages, features (such as booking or payments), or integrations grows.',
      scopeNote:
        'We share the exact figure after the free audit, before you pay anything.',
    },
    relatedCaseSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedPostSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'checklist-landing-page-konversi-tinggi-umkm-b2b',
    ],
    seo: {
      title: 'Business Website Development in Tangsel | CHESTAADOTCOM',
      description:
        'Website and landing page development for businesses in BSD, Pamulang, and South Tangerang. Fast on mobile and ad-ready. Starting from IDR 1,200,000.',
    },
    imageKey: 'serviceWebLandingPage',
  },

  // 2. ai-agents (ai-agent)
  {
    slug: 'ai-agent',
    enSlug: 'ai-agents',
    urlSlug: 'ai-agents',
    eyebrow: 'AI agent',
    h1: 'AI agent services for business: automated WhatsApp replies, bookings, and follow-ups',
    sub: 'An AI agent reads customer intent, uses tools like your calendar and database, and completes the task through to the end. When a human is needed, the agent hands it over to your team with a summary.',
    ringkasanSingkat:
      'An AI agent is a system that understands customer messages, uses tools like calendars, databases, or CRMs, and completes tasks such as creating a booking or sending a follow-up. CHESTAADOTCOM builds AI agents for businesses in South Tangerang and Greater Jakarta, complete with action boundaries and human handover. Pricing is calculated after a free audit.',
    cocokKalau: [
      'You answer the exact same questions repeatedly every day.',
      'You receive incoming messages at night that only get answered the next morning.',
      'You copy data from chats into spreadsheets manually.',
      'You lose prospective customers because no one follows up after they ask for prices.',
    ],
    kapanTidakPerlu:
      'If you only receive a few messages a day and every single one needs a personal touch, an agent is not needed yet. We will tell you that openly during the audit.',
    yangKamuDapat: [
      {
        title: 'A connected agent',
        description:
          'Linked to WhatsApp Business and the tools you already use.',
      },
      {
        title: 'Action rules',
        description:
          'What the agent may and may not do, written together with you.',
      },
      {
        title: 'Staff handover',
        description:
          'Out-of-rule cases are forwarded complete with a conversation summary.',
      },
      {
        title: 'Complete action log',
        description: 'Every action is recorded so you can inspect it.',
      },
      {
        title: 'Real-conversation testing',
        description: 'Tested with real conversations from your business before release.',
      },
      {
        title: 'Support and adjustments',
        description: 'Ongoing tuning after your team starts using it.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description:
          'We map your recurring conversations and tasks, then tell you honestly which ones should be handled by an agent and which should not.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description:
          'You see sample conversation flows and action rules before we build the full system.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description:
          'The agent is tested with real conversations, including tough questions and unusual requests.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description:
          'We monitor the logs, fix off-target replies, and adjust the rules as it gets used.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinic',
        scenarioTitle: 'Example use case for Clinics',
        workflowLines: [
          'A customer writes "can I book a facial tomorrow at 4 PM?".',
          'The agent checks the therapist calendar, creates the booking, sends a confirmation, records it in the CRM, and sends a reminder the day before.',
        ],
        outcome:
          'Example: A customer writes "can I book a facial tomorrow at 4 PM?". The agent checks the therapist calendar, creates the booking, sends a confirmation, records it in the CRM, and sends a reminder the day before.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Example use case for F&B',
        workflowLines: [
          'The agent answers menu, opening hour, and table availability questions, records group reservations, and forwards complaints to staff with full context.',
        ],
        outcome:
          'Example: The agent answers menu, opening hour, and table availability questions, records group reservations, and forwards complaints to staff with full context.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Example use case for Property',
        workflowLines: [
          'The agent asks about budget, location, and unit type, schedules a site visit, and sends the prospective buyer’s details to the right agent.',
        ],
        outcome:
          'Example: The agent asks about budget, location, and unit type, schedules a site visit, and sends the prospective buyer’s details to the right agent.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional services',
        scenarioTitle: 'Example use case for Professional services',
        workflowLines: [
          'The agent receives consultation requests, gathers initial information, and schedules a meeting on the calendar.',
        ],
        outcome:
          'Example: The agent receives consultation requests, gathers initial information, and schedules a meeting on the calendar.',
      },
    ],
    chatbotVsAgentTable: {
      headers: ['Aspect', 'Chatbot', 'AI agent'],
      rows: [
        {
          aspect: 'Understanding conversation context',
          chatbot: 'Limited to a preset list of answers',
          agent: 'Reads intent and chat history',
        },
        {
          aspect: 'Taking action',
          chatbot: 'Stops at replying',
          agent: 'Creates bookings, logs data, sends follow-ups',
        },
        {
          aspect: 'Using tools',
          chatbot: 'Usually no',
          agent: 'Calendar, database, CRM, invoice',
        },
        {
          aspect: 'Out-of-rule cases',
          chatbot: 'Dead-end answer',
          agent: 'Handed over to staff with a summary',
        },
        {
          aspect: 'Action trail',
          chatbot: 'Minimal',
          agent: 'Complete log',
        },
        {
          aspect: 'Best for',
          chatbot: 'Simple, fixed questions',
          agent: 'Workflows that require multiple steps',
        },
      ],
    },
    guardrails: [
      {
        id: 'batas-jelas',
        title: 'Clear boundaries',
        description:
          'The agent may only perform actions we explicitly agree on together.',
      },
      {
        id: 'serah-manusia',
        title: 'Human handover',
        description:
          'Sensitive cases, such as complaints, are forwarded to your staff automatically.',
      },
      {
        id: 'semua-tercatat',
        title: 'Everything logged',
        description:
          'Every action taken by the agent has a log you can inspect.',
      },
      {
        id: 'data-milikmu',
        title: 'Your data stays yours',
        description:
          'Your business data remains yours, and access is granted only as needed.',
      },
    ],
    prinsipTeknis:
      'The agent is given the minimum access needed for its tools. High-risk actions ask for human approval. Every version is tested with real conversations before release. Our experience includes AI-based chat systems, smart API gateways, and AI-based document processors.',
    hargaDanScope:
      'AI agent pricing is calculated after the free audit, because it depends on the number of connected tools, business rules, and message volume. You know the figure before paying anything.',
    siapkanSebelumAudit: [
      'The ten questions customers ask most frequently',
      'Operating hours and pricing rules',
      'The list of actions the agent is allowed to take',
      'Who handles cases that fall outside the rules',
    ],
    faq: [
      {
        question: 'What is the difference between a chatbot and an AI agent?',
        answer:
          'A chatbot replies from a prepared list of answers. An AI agent understands context, uses tools like a calendar or database, and completes the task through to the end.',
      },
      {
        question: 'How much does it cost to build an AI agent?',
        answer:
          'Calculated after the free audit, because it depends on the number of tools, rules, and message volume. You receive the exact figure before paying anything.',
      },
      {
        question: 'What if the agent gives a wrong answer?',
        answer:
          'The agent has action boundaries and human handover rules. Sensitive cases are forwarded to your staff, and all conversations are logged so they can be inspected and improved.',
      },
      {
        question: 'Is my customer data safe?',
        answer:
          'Your data stays yours. We only access what is needed to build and maintain the system, and access is removed when the project or maintenance contract ends.',
      },
      {
        question: 'Can it run on WhatsApp?',
        answer:
          'Yes. The agent runs via the official WhatsApp Business Platform from Meta, which has its own account and number requirements. We explain the options and assist with registration during the audit.',
      },
    ],
    hasAreaPages: true,
    updatedAt: '2026-03-20',
    title: 'AI agent',
    shortTitle: 'AI Agent',
    tagline: 'AI agent',
    shortPromise:
      'An AI agent reads customer intent, uses tools like your calendar and database, and completes the task through to the end.',
    summary:
      'An AI agent is a system that understands customer messages, uses tools like calendars, databases, or CRMs, and completes tasks such as creating a booking or sending a follow-up. CHESTAADOTCOM builds AI agents for businesses in South Tangerang and Greater Jakarta, complete with action boundaries and human handover. Pricing is calculated after a free audit.',
    bentoSpan: 'large',
    timeline: 'Weeks (exact estimate after audit)',
    bestForSummary: 'WhatsApp replies, calendar bookings, CRM logging, and follow-ups',
    forWho: [
      'You answer the exact same questions repeatedly every day.',
      'You receive incoming messages at night that only get answered the next morning.',
      'You copy data from chats into spreadsheets manually.',
      'You lose prospective customers because no one follows up after they ask for prices.',
    ],
    deliverables: [
      {
        title: 'A connected agent',
        description: 'Linked to WhatsApp Business and the tools you already use.',
      },
      {
        title: 'Action rules',
        description: 'What the agent may and may not do, written together with you.',
      },
      {
        title: 'Staff handover',
        description: 'Out-of-rule cases are forwarded complete with a conversation summary.',
      },
      {
        title: 'Complete action log',
        description: 'Every action is recorded so you can inspect it.',
      },
      {
        title: 'Real-conversation testing',
        description: 'Tested with real conversations from your business before release.',
      },
      {
        title: 'Support and adjustments',
        description: 'Ongoing tuning after your team starts using it.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description:
          'We map your recurring conversations and tasks, then tell you honestly which ones should be handled by an agent and which should not.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description:
          'You see sample conversation flows and action rules before we build the full system.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description:
          'The agent is tested with real conversations, including tough questions and unusual requests.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description:
          'We monitor the logs, fix off-target replies, and adjust the rules as it gets used.',
      },
    ],
    useCases: [],
    stackChips: ['WhatsApp Business', 'Calendar & CRM', 'Action Guardrails', 'Complete Log'],
    pricingNote: {
      label: 'Calculated after free audit',
      reason:
        'AI agent pricing is calculated after the free audit, because it depends on the number of connected tools, business rules, and message volume.',
      scopeNote: 'You know the figure before paying anything.',
    },
    relatedCaseSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedPostSlugs: [
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
      'Apa-Bedanya-AI-Agent-dan-Chatbot-Biasa-untuk-Operasional-Bisnis',
      'Mengenal-Model-Context-Protocol-MCP-Cara-AI-Terkoneksi-ke-Data-Bisnis',
    ],
    seo: {
      title: 'AI Agent Services for Business in Tangsel | CHESTAADOTCOM',
      description:
        'AI agents for businesses in BSD, Pamulang, and South Tangerang: automated WhatsApp replies, booking, and follow-ups. Priced after a free 30-min audit.',
    },
    imageKey: 'serviceAiAgent',
  },

  // 3. custom-software (software-custom)
  {
    slug: 'software-custom',
    enSlug: 'custom-software',
    urlSlug: 'custom-software',
    eyebrow: 'Custom software',
    h1: 'Custom software development: web applications, dashboards, and internal systems',
    sub: 'Systems that follow the way you work, not the other way around. From reporting dashboards to internal applications for your team.',
    ringkasanSingkat:
      'Custom software from CHESTAADOTCOM covers web applications, dashboards, and internal systems for businesses in South Tangerang and Greater Jakarta. Built around the workflows already running in your team, starting from a small version you can use quickly and expanded step by step. Pricing is calculated after a free audit.',
    cocokKalau: [
      'You use spreadsheets that are getting heavier and prone to errors.',
      'You have several applications that do not connect to one another.',
      'Off-the-shelf software does not fit the way your team works.',
      'You need reports that update automatically, or a portal for customers and partners.',
    ],
    kapanTidakPerlu:
      'If your workflow is standard and off-the-shelf software already meets your needs at a reasonable cost, use that. Custom software only makes sense when your workflow is specific or data must connect across systems.',
    yangKamuDapat: [
      {
        title: 'Clear workflow and requirements',
        description: 'Written down clearly before a single line of code is built.',
      },
      {
        title: 'Responsive web application',
        description: 'Comfortable to use on both mobile phones and desktops.',
      },
      {
        title: 'Role-based login and permissions',
        description: 'For example admin, staff, and customers.',
      },
      {
        title: 'Dashboards and reports',
        description: 'Updated from the same underlying data.',
      },
      {
        title: 'Integration with the tools you use',
        description: 'Connected via API.',
      },
      {
        title: 'Documentation and brief training',
        description: 'Prepared for your team.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description:
          'We study your workflow and tell you honestly whether custom software is truly needed or off-the-shelf software is enough.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description:
          'You try out the screen layouts and flow before the features are built.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description:
          'Built step by step, with each stage tested by the people who will actually use it.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description:
          'The first version is released early, then refined based on real usage.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinic',
        scenarioTitle: 'Example use case for Clinics',
        workflowLines: [
          'Patient records and schedules in one system, with daily reports for the owner.',
        ],
        outcome:
          'Example: Patient records and schedules in one system, with daily reports for the owner.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Example use case for F&B',
        workflowLines: [
          'Ingredient stock and sales reports across multiple branches in a single dashboard.',
        ],
        outcome:
          'Example: Ingredient stock and sales reports across multiple branches in a single dashboard.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Example use case for Property',
        workflowLines: [
          'Centralized buyer leads and unit status, so the team knows who needs follow-up.',
        ],
        outcome:
          'Example: Centralized buyer leads and unit status, so the team knows who needs follow-up.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional services',
        scenarioTitle: 'Example use case for Professional services',
        workflowLines: [
          'Project tracking, deadlines, and billing in one place.',
        ],
        outcome:
          'Example: Project tracking, deadlines, and billing in one place.',
      },
    ],
    prinsipTeknis:
      'We start from the smallest useful version, then add features step by step. Code is written to be easy to maintain, with code ownership agreed in writing upfront. Data is backed up and access is restricted by role.',
    hargaDanScope:
      'Calculated after the free audit. What affects the cost: number of user roles, number of features, integrations with other tools, and reporting needs. You receive the figure and scope of work before paying anything.',
    siapkanSebelumAudit: [
      'Your current workflow and the apps or spreadsheets you use',
      'Who the users are and their roles',
      'The reports you need most',
      'Sample real data with sensitive information masked',
    ],
    faq: [
      {
        question: 'When do I need custom software instead of off-the-shelf apps?',
        answer:
          'Choose off-the-shelf software if your workflow is standard and you are comfortable adapting how you work. Choose custom software if your workflow is specific, your data needs to connect across systems, or per-user subscription fees are ballooning.',
      },
      {
        question: 'How much does it cost?',
        answer:
          'Calculated after the free audit, based on the number of roles, features, and integrations. You receive the figure before paying anything.',
      },
      {
        question: 'Can it be built in stages?',
        answer:
          'Yes, and that is the approach we recommend. The first version includes the most useful features, and more are added after real use.',
      },
      {
        question: 'What about code and data ownership?',
        answer:
          'Your business data stays yours. Code ownership is agreed in writing at the start of the project.',
      },
      {
        question: 'Who maintains it after release?',
        answer:
          'You can use a maintenance plan from us or hand it over to another team, because the code is documented. We decide this upfront.',
      },
    ],
    hasAreaPages: false,
    updatedAt: '2026-03-20',
    title: 'Custom software',
    shortTitle: 'Custom Software',
    tagline: 'Custom software',
    shortPromise:
      'Systems that follow the way you work, not the other way around. From reporting dashboards to internal applications for your team.',
    summary:
      'Custom software from CHESTAADOTCOM covers web applications, dashboards, and internal systems for businesses in South Tangerang and Greater Jakarta. Built around the workflows already running in your team, starting from a small version you can use quickly and expanded step by step. Pricing is calculated after a free audit.',
    bentoSpan: 'small',
    timeline: 'Weeks (exact estimate after audit)',
    bestForSummary: 'Web applications, reporting dashboards, and internal systems',
    forWho: [
      'You use spreadsheets that are getting heavier and prone to errors.',
      'You have several applications that do not connect to one another.',
      'Off-the-shelf software does not fit the way your team works.',
      'You need reports that update automatically, or a portal for customers and partners.',
    ],
    deliverables: [
      {
        title: 'Clear workflow and requirements',
        description: 'Written down clearly before a single line of code is built.',
      },
      {
        title: 'Responsive web application',
        description: 'Comfortable to use on both mobile phones and desktops.',
      },
      {
        title: 'Role-based login and permissions',
        description: 'For example admin, staff, and customers.',
      },
      {
        title: 'Dashboards and reports',
        description: 'Updated from the same underlying data.',
      },
      {
        title: 'Integration with the tools you use',
        description: 'Connected via API.',
      },
      {
        title: 'Documentation and brief training',
        description: 'Prepared for your team.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description:
          'We study your workflow and tell you honestly whether custom software is truly needed or off-the-shelf software is enough.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description: 'You try out the screen layouts and flow before the features are built.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description: 'Built step by step, with each stage tested by the people who will actually use it.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description: 'The first version is released early, then refined based on real usage.',
      },
    ],
    useCases: [],
    stackChips: ['Web Application', 'Role Permissions', 'Reporting Dashboard', 'API Integration'],
    pricingNote: {
      label: 'Calculated after free audit',
      reason:
        'Calculated after the free audit. What affects the cost: number of user roles, number of features, integrations with other tools, and reporting needs.',
      scopeNote: 'You receive the figure and scope of work before paying anything.',
    },
    relatedCaseSlugs: ['dashboard-kafe', 'pemroses-dokumen'],
    relatedPostSlugs: [
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'Vibe-Coding-untuk-Bisnis-Kapan-Pakai-AI-dan-Kapan-Harus-Rekayasa-Software-Asli',
    ],
    seo: {
      title: 'Custom Software & Dashboards in Tangsel | CHESTAADOTCOM',
      description:
        'Web applications, dashboards, and internal systems built around your team\'s workflow in South Tangerang, BSD, and Greater Jakarta. Free 30-min audit.',
    },
    imageKey: 'serviceSoftwareCustom',
  },

  // 4. workflow-automation (otomasi-workflow)
  {
    slug: 'otomasi-workflow',
    enSlug: 'workflow-automation',
    urlSlug: 'workflow-automation',
    eyebrow: 'Workflow automation',
    h1: 'Business workflow automation: connect WhatsApp, Sheets, calendar, and invoices',
    sub: 'Repetitive tasks that used to be copied manually between apps now run automatically, complete with notifications if anything fails.',
    ringkasanSingkat:
      'Workflow automation connects the applications you already use, such as WhatsApp, Google Sheets, calendars, and invoices, so repetitive tasks run on their own. CHESTAADOTCOM builds automation for businesses in South Tangerang and Greater Jakarta, complete with execution logs and failure notifications. Pricing is calculated after a free audit.',
    cocokKalau: [
      'You enter the exact same data into two or three different places.',
      'You compile weekly reports manually.',
      'You rely on staff memory for reminders and notifications.',
      'You frequently send out invoices or billing reminders late.',
    ],
    kapanTidakPerlu:
      'If a task only happens a few times a month, doing it manually is cheaper than building automation. We will tell you so if that is the case.',
    yangKamuDapat: [
      {
        title: 'Workflow mapping',
        description: 'Mapped clearly before automation is built.',
      },
      {
        title: 'Cross-tool automation',
        description: 'Connecting the tools you already use.',
      },
      {
        title: 'Error handling and notifications',
        description: 'Alerts whenever a step fails.',
      },
      {
        title: 'Execution logs',
        description: 'Recorded so you can inspect every run.',
      },
      {
        title: 'Workflow documentation',
        description: 'So your team understands what is running.',
      },
      {
        title: 'Optional: AI for text steps',
        description:
          'For steps that need to understand text, such as categorizing incoming messages.',
      },
    ],
    caraKerja: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description:
          'We list your team’s repetitive tasks and pick the ones that consume the most time.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description:
          'You review the workflow diagram and confirm the rules are right.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description:
          'The automation is tested with sample data, including failure scenarios.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description:
          'We monitor the logs and update the flow when third-party tools change.',
      },
    ],
    contohPenggunaan: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinic',
        scenarioTitle: 'Example use case for Clinics',
        workflowLines: [
          'Appointment reminders are sent automatically, and a daily summary arrives for the owner every evening.',
        ],
        outcome:
          'Example: Appointment reminders are sent automatically, and a daily summary arrives for the owner every evening.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Example use case for F&B',
        workflowLines: [
          'Daily sales are recorded to Google Sheets, and a notification appears when ingredient stock runs low.',
        ],
        outcome:
          'Example: Daily sales are recorded to Google Sheets, and a notification appears when ingredient stock runs low.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Example use case for Property',
        workflowLines: [
          'Prospective buyers from ad forms enter the CRM and the assigned agent is notified immediately.',
        ],
        outcome:
          'Example: Prospective buyers from ad forms enter the CRM and the assigned agent is notified immediately.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional services',
        scenarioTitle: 'Example use case for Professional services',
        workflowLines: [
          'Invoices are sent automatically after a project finishes, and payment reminders are sent on schedule.',
        ],
        outcome:
          'Example: Invoices are sent automatically after a project finishes, and payment reminders are sent on schedule.',
      },
    ],
    prinsipTeknis:
      'Every workflow includes failure handling and notifications, so issues are caught before customers notice them. Access to each application is limited strictly to what is needed. Workflows are documented so they never depend on a single person.',
    hargaDanScope:
      'Calculated after the free audit, based on the number of workflows, connected tools, and data volume. Third-party app subscriptions are paid directly by you according to the provider’s plan; our fee covers building and maintaining the automation.',
    siapkanSebelumAudit: [
      'A list of repetitive tasks and how often they happen',
      'The applications used at each step',
      'Exception rules, such as when a case must be handled manually',
      'Who should be notified if a step fails',
    ],
    faq: [
      {
        question: 'What is the difference between workflow automation and an AI agent?',
        answer:
          'Workflow automation runs steps with fixed rules, such as "when a new order arrives, record it to Sheets". An AI agent is used when the task requires understanding messages and making decisions.',
      },
      {
        question: 'Which applications can be connected?',
        answer:
          'Any application that provides an official API or integration. We check this during the audit.',
      },
      {
        question: 'What happens if one step fails?',
        answer:
          'The workflow is designed with failure notifications and logs, so the issue is caught and the process can be re-run.',
      },
      {
        question: 'Are there monthly fees?',
        answer:
          'Third-party app subscriptions are paid directly by you to the provider. Maintenance fees from us apply only if you choose a maintenance plan.',
      },
      {
        question: 'How long does it take to build?',
        answer:
          'A single simple workflow usually takes days; multiple connected workflows take weeks. We provide the exact estimate after the audit.',
      },
    ],
    hasAreaPages: false,
    updatedAt: '2026-03-20',
    title: 'Workflow automation',
    shortTitle: 'Workflow Automation',
    tagline: 'Workflow automation',
    shortPromise:
      'Repetitive tasks that used to be copied manually between apps now run automatically, complete with notifications if anything fails.',
    summary:
      'Workflow automation connects the applications you already use, such as WhatsApp, Google Sheets, calendars, and invoices, so repetitive tasks run on their own. CHESTAADOTCOM builds automation for businesses in South Tangerang and Greater Jakarta, complete with execution logs and failure notifications. Pricing is calculated after a free audit.',
    bentoSpan: 'small',
    timeline: 'Days to weeks (exact estimate after audit)',
    bestForSummary: 'Connect WhatsApp, Sheets, calendars, and invoices automatically',
    forWho: [
      'You enter the exact same data into two or three different places.',
      'You compile weekly reports manually.',
      'You rely on staff memory for reminders and notifications.',
      'You frequently send out invoices or billing reminders late.',
    ],
    deliverables: [
      {
        title: 'Workflow mapping',
        description: 'Mapped clearly before automation is built.',
      },
      {
        title: 'Cross-tool automation',
        description: 'Connecting the tools you already use.',
      },
      {
        title: 'Error handling and notifications',
        description: 'Alerts whenever a step fails.',
      },
      {
        title: 'Execution logs',
        description: 'Recorded so you can inspect every run.',
      },
      {
        title: 'Workflow documentation',
        description: 'So your team understands what is running.',
      },
      {
        title: 'Optional: AI for text steps',
        description: 'For steps that need to understand text, such as categorizing incoming messages.',
      },
    ],
    process: [
      {
        num: '1',
        duration: '30 minutes',
        title: 'Free audit (30 minutes)',
        description: 'We list your team’s repetitive tasks and pick the ones that consume the most time.',
      },
      {
        num: '2',
        duration: 'Step 2',
        title: 'Design and prototype',
        description: 'You review the workflow diagram and confirm the rules are right.',
      },
      {
        num: '3',
        duration: 'Step 3',
        title: 'Build and test',
        description: 'The automation is tested with sample data, including failure scenarios.',
      },
      {
        num: '4',
        duration: 'Step 4',
        title: 'Release and maintain',
        description: 'We monitor the logs and update the flow when third-party tools change.',
      },
    ],
    useCases: [],
    stackChips: ['WhatsApp', 'Google Sheets', 'Calendar & Invoice', 'Logs & Alerts'],
    pricingNote: {
      label: 'Calculated after free audit',
      reason:
        'Calculated after the free audit, based on the number of workflows, connected tools, and data volume.',
      scopeNote:
        'Third-party app subscriptions are paid directly by you according to the provider’s plan; our fee covers building and maintaining the automation.',
    },
    relatedCaseSlugs: ['lead-properti'],
    relatedPostSlugs: [
      'Cara-Otomasi-Workflow-Bisnis-Tanpa-Harus-Ganti-Semua-Aplikasi-Lama',
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    ],
    seo: {
      title: 'Business Workflow Automation in Tangsel | CHESTAADOTCOM',
      description:
        'Connect WhatsApp, Google Sheets, calendars, and invoices so repetitive work runs automatically for businesses in Tangsel and Greater Jakarta. Free audit.',
    },
    imageKey: 'serviceOtomasiWorkflow',
  },
];

export const SERVICES_DATA: ServiceItem[] = SERVICES_DATA_ID;

const LEGACY_SERVICE_SLUG_ALIASES: Record<string, ServiceSlug> = {
  'website-development': 'pembuatan-website',
  'ai-agents': 'ai-agent',
  'custom-software': 'software-custom',
  'workflow-automation': 'otomasi-workflow',
  'web-landing-page': 'pembuatan-website',
  'custom-web-development': 'pembuatan-website',
  'landing-page': 'pembuatan-website',
  'ai-integration': 'ai-agent',
  'whatsapp-ai-agent': 'ai-agent',
};

export function resolveCanonicalServiceSlug(slug?: string): ServiceSlug | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  if (
    clean === 'pembuatan-website' ||
    clean === 'ai-agent' ||
    clean === 'software-custom' ||
    clean === 'otomasi-workflow'
  ) {
    return clean;
  }
  return LEGACY_SERVICE_SLUG_ALIASES[clean];
}

export function getLocalizedServiceUrlSlug(
  serviceSlug: ServiceSlug,
  locale: 'id' | 'en' = 'id'
): string {
  return locale === 'en' ? SERVICE_ID_TO_EN_SLUG[serviceSlug] : serviceSlug;
}

export function getServicePath(
  serviceSlug: ServiceSlug,
  locale: 'id' | 'en' = 'id'
): string {
  if (locale === 'en') {
    return `/en/services/${SERVICE_ID_TO_EN_SLUG[serviceSlug]}`;
  }
  return `/id/jasa/${serviceSlug}`;
}

export function getServiceAreaPath(
  serviceSlug: ServiceSlug,
  areaSlug: string,
  locale: 'id' | 'en' = 'id'
): string {
  if (locale === 'en') {
    return `/en/services/${SERVICE_ID_TO_EN_SLUG[serviceSlug]}/${areaSlug}`;
  }
  return `/id/jasa/${serviceSlug}/${areaSlug}`;
}

export function getAllServices(locale: 'id' | 'en' = 'id'): ServiceItem[] {
  return locale === 'en' ? SERVICES_DATA_EN : SERVICES_DATA_ID;
}

export function getServiceBySlug(
  slug?: string,
  locale: 'id' | 'en' = 'id'
): ServiceItem | undefined {
  const canonical = resolveCanonicalServiceSlug(slug);
  if (!canonical) return undefined;
  const list = locale === 'en' ? SERVICES_DATA_EN : SERVICES_DATA_ID;
  return list.find((item) => item.slug === canonical);
}

export function getAdjacentServices(
  slug: ServiceSlug,
  locale: 'id' | 'en' = 'id'
): {
  prev: ServiceItem;
  next: ServiceItem;
} {
  const list = locale === 'en' ? SERVICES_DATA_EN : SERVICES_DATA_ID;
  const index = list.findIndex((item) => item.slug === slug);
  const currentIdx = index === -1 ? 0 : index;
  const prevIdx = (currentIdx - 1 + list.length) % list.length;
  const nextIdx = (currentIdx + 1) % list.length;
  return {
    prev: list[prevIdx],
    next: list[nextIdx],
  };
}
