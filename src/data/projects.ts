/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: PORTFOLIO PROJECTS (/portfolio & /portfolio/[slug])
 * ============================================================================
 * Voice: "kamu" (hangat, lugas, profesional).
 * Placeholder policy: Seluruh proyek contoh ditandai secara jujur dengan
 * agar mudah diganti dengan data klien ril tanpa klaim palsu.
 */

export type ProjectCategory = 'web' | 'ai-agent' | 'software' | 'otomasi';

export interface ProjectGalleryItem {
  imageKey: string;
  caption: string;
  layout: 'full' | 'half';
}

export interface ProjectFeatureItem {
  title: string;
  description: string;
  metricOrTag: string;
  highlightType: 'architecture' | 'workflow' | 'interface' | 'security';
}

export interface PortfolioProject {
  slug: string;
  title: string;
  oneLiner: string;
  category: ProjectCategory;
  categoryLabel: string;
  industry: string;
  client: string;
  year: string;
  role: string;
  duration: string;
  stack: string[];
  cover: string;
  deviceFrame: 'browser' | 'phone';
  gallery: ProjectGalleryItem[];
  summaryParagraphs: [string, string];
  features: ProjectFeatureItem[];
  liveUrl?: string;
  liveStatusLabel?: string;
  caseStudySlug?: string;
  serviceSlug: 'pembuatan-website' | 'ai-agent' | 'software-custom' | 'otomasi-workflow';
  featured: boolean;
  draft: boolean;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
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

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // 1. FEATURED #1 — AI AGENT (Klinik & Kesehatan)
  {
    slug: 'klinik-estetika-bsd-ai-booking',
    title: 'Asisten Reservasi WhatsApp & Jadwal Dokter Klinik Estetika',
    oneLiner:
      'AI agent WhatsApp 24/7 yang mengecek ketersediaan slot dokter, mengunci jadwal perawatan pasien, dan mengirim pengingat H-1 otomatis.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent',
    industry: 'Klinik & Kesehatan',
    client: 'Klinik Estetika & Kesehatan di BSD City',
    year: '2025',
    role: 'Arsitektur AI Agent, Integrasi Kalender & Landing Page',
    duration: '3 Minggu',
    stack: ['WhatsApp Cloud API', 'Python', 'PostgreSQL', 'React', 'Node.js'],
    cover: 'portfolioClinicPlaceholder',
    deviceFrame: 'phone',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Skema alur kerja dari pesan WhatsApp pasien masuk, pengecekan jadwal dokter di PostgreSQL, hingga pencatatan slot otomatis.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioClinicPlaceholder',
        caption:
          'Simulasi percakapan asisten WhatsApp saat mencocokkan jam praktik dokter dan mengonfirmasi nama pasien.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        caption:
          'Tampilan serah terima ke resepsionis manusia lengkap dengan rangkuman keluhan pasien untuk konsultasi medis khusus.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Klinik dengan puluhan chat harian sering kehilangan calon pasien karena pesan baru masuk di malam hari saat admin sudah pulang. Proyek ini menghubungkan nomor WhatsApp resmi klinik ke AI agent yang mampu membaca jadwal praktik dokter secara langsung dan membalas pertanyaan prosedur dasar dalam hitungan detik.',
      'Kamu tetap memegang kendali penuh: ketika pasien menanyakan indikasi medis sensitif atau meminta penjadwalan ulang khusus, agent langsung meneruskan percakapan beserta rangkuman konteksnya ke layar admin resepsionis tanpa membuat pasien mengulang cerita dari awal.',
    ],
    features: [
      {
        title: 'Pengecekan Slot Kalender Dokter Real-Time',
        description:
          'Agent memanggil fungsi pencari jadwal di database untuk memastikan jam perawatan yang ditawarkan ke pasien benar-benar kosong dan tidak bentrok.',
        metricOrTag: 'Tool: check_doctor_slots()',
        highlightType: 'architecture',
      },
      {
        title: 'Guardrail Medis & Serah Terima Resepsionis',
        description:
          'Batas tindakan ketat mencegah agent mengarang saran medis; pertanyaan di luar SOP otomatis dialihkan ke admin manusia beserta ringkasan chat.',
        metricOrTag: 'Human-in-the-Loop Aktif',
        highlightType: 'security',
      },
      {
        title: 'Pengingat H-1 & Konfirmasi Kedatangan Otomatis',
        description:
          'Sistem mengirim pesan pengingat jadwal sehari sebelum tindakan untuk menekan angka pembatalan mendadak (no-show).',
        metricOrTag: 'Cron Pengingat H-1',
        highlightType: 'workflow',
      },
      {
        title: 'Dashboard Rekap Reservasi Harian untuk Admin Cabang',
        description:
          'Antarmuka web ringan bagi resepsionis untuk melihat daftar pasien hari ini, status konfirmasi WhatsApp, dan riwayat tindakan.',
        metricOrTag: 'React + PostgreSQL',
        highlightType: 'interface',
      },
      {
        title: 'Log Audit Percakapan & Pemanggilan Tool',
        description:
          'Setiap respons dan perubahan jadwal tercatat rapi dengan stempel waktu sehingga manajemen klinik dapat mengevaluasi performa layanan.',
        metricOrTag: '100% Transparansi Log',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Sistem Internal / NDA Klien',
    caseStudySlug: 'otomasi-reservasi-klinik-estetika',
    serviceSlug: 'ai-agent',
    featured: true,
    draft: false,
    updatedAt: '2025-03-10',
    seo: {
      title: 'Portofolio AI Agent WhatsApp & Booking Klinik BSD | CHESTAADOTCOM',
      description:
        'Visual showcase sistem AI agent WhatsApp untuk kualifikasi pasien dan penjadwalan dokter otomatis pada klinik estetika di BSD City.',
    },
  },

  // 2. FEATURED #2 — SOFTWARE CUSTOM (Logistik & Operasional)
  {
    slug: 'dashboard-operasional-logistik-tangsel',
    title: 'Dashboard Operasional Armada & Surat Jalan Terpusat',
    oneLiner:
      'Aplikasi web internal untuk memantau rute pengiriman harian, menerbitkan surat jalan digital, dan menggantikan belasan file spreadsheet terpisah.',
    category: 'software',
    categoryLabel: 'Software Custom',
    industry: 'Logistik & Operasional',
    client: 'Perusahaan Distribusi & Logistik Regional',
    year: '2025',
    role: 'Pengembangan Web App Custom & Desain Database',
    duration: '4 Minggu',
    stack: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API'],
    cover: 'portfolioLogisticsDashboard',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Arsitektur terpusat yang menyatukan input admin gudang, status armada di lapangan, dan pencetakan dokumen penagihan.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioLogisticsDashboard',
        caption:
          'Tampilan tabel manifest pengiriman harian dengan filter status perjalanan dan pencarian cepat nomor surat jalan.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        caption:
          'Panel metrik ketepatan waktu pengiriman dan log perubahan status oleh staf operasional.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Saat volume pengiriman harian meningkat, pencatatan surat jalan menggunakan file spreadsheet yang dikirim lewat grup chat sering memicu selisih data antara tim gudang, sopir, dan bagian penagihan. Aplikasi web custom ini menyatukan seluruh alur tersebut ke dalam satu layar kerja berbasis peran.',
      'Staf gudang cukup membuat manifest satu kali, sistem otomatis menghasilkan dokumen surat jalan siap cetak, dan status barang tiba langsung memperbarui antrean draf faktur bagi tim keuangan tanpa salin-tempel manual.',
    ],
    features: [
      {
        title: 'Manajemen Manifest & Surat Jalan Satu Pintu',
        description:
          'Nomor surat jalan diterbitkan berurutan secara otomatis dari database PostgreSQL sehingga tidak ada lagi penomoran ganda antar cabang.',
        metricOrTag: 'Single Source Database',
        highlightType: 'architecture',
      },
      {
        title: 'Hak Akses Berjenjang (Admin Gudang, Dispatcher, Finance)',
        description:
          'Setiap staf hanya melihat menu dan tombol aksi yang sesuai dengan tanggung jawabnya, lengkap dengan pencatatan siapa yang mengubah status.',
        metricOrTag: 'Role-Based Access Control',
        highlightType: 'security',
      },
      {
        title: 'Notifikasi Status Pengiriman via WhatsApp API',
        description:
          'Penerima barang maupun koordinator lapangan mendapat pembaruan otomatis saat armada berangkat dan ketika barang terkonfirmasi tiba.',
        metricOrTag: 'Notifikasi Real-Time',
        highlightType: 'workflow',
      },
      {
        title: 'Rekap Penagihan & Ekspor Laporan Instan',
        description:
          'Tim keuangan dapat menarik daftar pengiriman yang sudah berstatus selesai dalam satu klik untuk mempercepat penerbitan invoice.',
        metricOrTag: 'Ekspor CSV / PDF Bersih',
        highlightType: 'interface',
      },
    ],
    liveStatusLabel: 'Sistem Internal / NDA Klien',
    caseStudySlug: 'sentralisasi-operasional-armada-logistik',
    serviceSlug: 'software-custom',
    featured: true,
    draft: false,
    updatedAt: '2025-03-08',
    seo: {
      title: 'Portofolio Dashboard Operasional & Surat Jalan Logistik | CHESTAADOTCOM',
      description:
        'Visual showcase pengembangan aplikasi web dashboard operasional armada, surat jalan digital, dan database PostgreSQL terpusat.',
    },
  },

  // 3. WEB & LANDING PAGE (Properti & Arsitektur)
  {
    slug: 'landing-page-hunian-bintaro',
    title: 'Landing Page Klaster Hunian & Kalkulator KPR Bintaro',
    oneLiner:
      'Halaman promosi properti dengan waktu muat cepat di jaringan seluler, kalkulator simulasi cicilan interaktif, dan pengarah jadwal show unit.',
    category: 'web',
    categoryLabel: 'Web & Landing Page',
    industry: 'Properti & Arsitektur',
    client: 'Pengembang Hunian & Studio Arsitektur di Bintaro',
    year: '2025',
    role: 'Desain Antarmuka, Optimasi Kecepatan & Integrasi CTA WhatsApp',
    duration: '5 Hari',
    stack: ['React', 'Node.js', 'WhatsApp Cloud API'],
    cover: 'portfolioPropertyPlaceholder',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Alur tangkapan pengunjung dari iklan Meta/Google Ads menuju simulasi unit hingga pengiriman pesan WhatsApp terformat.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioPropertyPlaceholder',
        caption:
          'Komponen kalkulator simulasi DP dan tenor KPR yang bekerja instan di layar ponsel tanpa memuat ulang halaman.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        caption:
          'Format pesan WhatsApp otomatis yang langsung membawa informasi tipe unit dan jadwal kunjungan pilihan calon pembeli.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Banyak anggaran iklan properti terbuang karena halaman tujuan memuat foto resolusi besar tanpa kompresi sehingga pengunjung menutup halaman sebelum denah terlihat. Halaman ini dibangun dengan fokus pada kecepatan muat di perangkat seluler dan alur informasi yang langsung menjawab pertanyaan utama calon pembeli rumah.',
      'Pengunjung dapat membandingkan tipe unit, mencoba simulasi uang muka serta angsuran bulanan secara interaktif, lalu menekan tombol WhatsApp yang otomatis menyertakan tipe unit pilihan mereka ke tim sales in-house kamu.',
    ],
    features: [
      {
        title: 'Optimasi Aset Visual Denah & Fasad (WebP/AVIF)',
        description:
          'Seluruh galeri arsitektur dimuat secara bertahap dengan ukuran dimensi eksplisit sehingga halaman tampil cepat tanpa pergeseran tata letak.',
        metricOrTag: 'Target LCP < 1.5 Detik',
        highlightType: 'architecture',
      },
      {
        title: 'Kalkulator Simulasi KPR & DP Interaktif',
        description:
          'Memudahkan calon pembeli menghitung estimasi cicilan bulanan berdasarkan pilihan persentase DP dan tenor langsung di halaman.',
        metricOrTag: 'Interaksi Tanpa Reload',
        highlightType: 'interface',
      },
      {
        title: 'CTA WhatsApp dengan Parameter Unit & Sumber Iklan',
        description:
          'Tim sales langsung mengetahui unit mana yang sedang dilihat calon pembeli beserta asal kampanye iklannya saat chat pertama masuk.',
        metricOrTag: 'Pelacakan UTM & Konversi',
        highlightType: 'workflow',
      },
      {
        title: 'Struktur SEO Lokal & Skema OpenGraph Lengkap',
        description:
          'Tampilan pratinjau tautan terlihat rapi dan meyakinkan saat dibagikan oleh agen properti melalui WhatsApp kepada calon pembeli.',
        metricOrTag: 'Schema.org Tervalidasi',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Sistem Internal / NDA Klien',
    serviceSlug: 'pembuatan-website',
    featured: false,
    draft: false,
    updatedAt: '2025-03-05',
    seo: {
      title: 'Portofolio Landing Page Properti & Simulasi KPR Bintaro | CHESTAADOTCOM',
      description:
        'Visual showcase pembuatan landing page klaster hunian di Bintaro dengan galeri cepat, kalkulator KPR interaktif, dan integrasi WhatsApp sales.',
    },
  },

  // 4. OTOMASI WORKFLOW (F&B & Retail)
  {
    slug: 'otomasi-rekap-pos-fnb-serpong',
    title: 'Otomasi Rekap POS Multi-Cabang & Laporan WhatsApp F&B',
    oneLiner:
      'Alur kerja otomatis yang menarik data transaksi kasir setiap jam tutup toko, mencocokkan stok bahan baku, dan mengirim ringkasan laba ke WhatsApp owner.',
    category: 'otomasi',
    categoryLabel: 'Otomasi Workflow',
    industry: 'F&B & Retail',
    client: 'Jaringan Restoran & Kafe di Gading Serpong',
    year: '2024',
    role: 'Arsitektur Otomasi Workflow n8n & Database Pelaporan',
    duration: '2 Minggu',
    stack: ['n8n', 'Python', 'PostgreSQL', 'WhatsApp Cloud API'],
    cover: 'portfolioFnbPlaceholder',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Alur node otomasi dari penarikan data kasir POS tiga cabang menuju proses rekonsiliasi Python dan pengiriman laporan malam.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioFnbPlaceholder',
        caption:
          'Visualisasi alur kerja n8n yang memisahkan omzet kotor, potongan promosi platform pesan-antar, dan pemakaian bahan baku.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        caption:
          'Tabel riwayat eksekusi workflow beserta mekanisme percobaan ulang otomatis (auto-retry) jika koneksi internet cabang sempat terputus.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Pemilik bisnis F&B dengan beberapa cabang kerap harus menunggu hingga keesokan siang hanya untuk mengetahui total penjualan bersih dan sisa stok bahan baku malam sebelumnya. Otomasi ini menghilangkan rutinitas mengunduh CSV dari aplikasi kasir dan menyalinnya satu per satu ke spreadsheet.',
      'Setiap pukul 22.00 setelah kasir tutup buku, workflow menarik data transaksi seluruh cabang secara otomatis, menghitung ringkasan performa harian, menyimpannya ke database PostgreSQL, lalu mengirimkan pesan rangkuman rapi langsung ke WhatsApp kamu.',
    ],
    features: [
      {
        title: 'Penarikan Data Kasir Terjadwal Setiap Tutup Toko',
        description:
          'Menghubungkan laporan transaksi harian dari tiap cabang tanpa perlu staf admin mengunduh dan menggabungkan file secara manual.',
        metricOrTag: 'Trigger Cron 22:00 WIB',
        highlightType: 'workflow',
      },
      {
        title: 'Deteksi Selisih Stok & Peringatan Reorder Bahan Baku',
        description:
          'Skrip Python membandingkan volume menu terjual dengan stok gudang dan memberi tanda jika ada bahan utama yang mendekati batas minimum.',
        metricOrTag: 'Python + PostgreSQL',
        highlightType: 'architecture',
      },
      {
        title: 'Laporan Malam Ringkas ke WhatsApp Owner',
        description:
          'Format pesan menyajikan omzet per cabang, menu terlaris, dan daftar bahan yang perlu dipesan besok pagi dalam satu layar baca.',
        metricOrTag: 'WhatsApp Cloud API',
        highlightType: 'interface',
      },
      {
        title: 'Mekanisme Auto-Retry & Notifikasi Error',
        description:
          'Jika salah satu mesin kasir cabang belum sinkron karena kendala sinyal, sistem otomatis mencoba ulang dan memberi catatan status yang jelas.',
        metricOrTag: 'Reliabilitas Workflow',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Sistem Internal / NDA Klien',
    caseStudySlug: 'sinkronisasi-rekap-pos-fnb-multi-cabang',
    serviceSlug: 'otomasi-workflow',
    featured: false,
    draft: false,
    updatedAt: '2025-02-26',
    seo: {
      title: 'Portofolio Otomasi Rekap POS & Laporan WhatsApp F&B Serpong | CHESTAADOTCOM',
      description:
        'Visual showcase integrasi workflow n8n, Python, dan WhatsApp API untuk otomatisasi rekap penjualan kasir multi-cabang F&B di Gading Serpong.',
    },
  },

  // 5. SOFTWARE CUSTOM (Logistik & Operasional / Manufaktur)
  {
    slug: 'sistem-inventaris-erp-manufaktur',
    title: 'Sistem Inventaris Gudang & Persetujuan PO Internal',
    oneLiner:
      'Modul ERP berbasis web untuk melacak mutasi stok bahan baku, mengatur batas minimum gudang, dan menyetujui Purchase Order dari ponsel.',
    category: 'software',
    categoryLabel: 'Software Custom',
    industry: 'Logistik & Operasional',
    client: 'Operasional Gudang & Manufaktur Skala Menengah',
    year: '2024',
    role: 'Arsitektur Sistem Custom, RBAC & Migrasi Skema Database',
    duration: '4 Minggu',
    stack: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API'],
    cover: 'portfolioErpInventory',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Struktur database relasional dan pemisahan hak akses antara staf pencatat barang masuk, kepala gudang, dan direktur operasional.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioErpInventory',
        caption:
          'Antarmuka pemantauan kapasitas bahan baku gudang dan antrean persetujuan Purchase Order satu klik.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        caption:
          'Jejak audit lengkap yang merekam waktu, akun pengguna, dan alasan setiap penyesuaian stok (stock opname).',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Perusahaan yang tumbuh dengan puluhan staf gudang sering terhambat oleh biaya lisensi software SaaS per pengguna yang membengkak atau sistem lama yang lambat diakses saat pergantian shift. Kami merancang modul inventaris dan pengadaan yang fokus tepat pada alur kerja yang dipakai tim di lapangan.',
      'Seluruh data tersimpan di infrastruktur pilihan kamu tanpa biaya langganan per kursi pengguna. Ketika stok bahan baku menyentuh batas aman, draf Purchase Order otomatis disiapkan dan direktur dapat meninjau serta menyetujuinya langsung melalui tautan aman di ponsel.',
    ],
    features: [
      {
        title: 'Bebas Biaya Lisensi Per Pengguna (Zero Per-Seat Tax)',
        description:
          'Kamu dapat menambahkan akun staf gudang, admin purchasing, dan supervisor sebanyak yang dibutuhkan tanpa tambahan biaya bulanan per orang.',
        metricOrTag: 'Kepemilikan Sistem 100%',
        highlightType: 'architecture',
      },
      {
        title: 'Persetujuan Purchase Order Berjenjang via Mobile',
        description:
          'Pengajuan pembelian di atas nominal tertentu otomatis mengirim notifikasi WhatsApp ke manajemen untuk disetujui dalam satu klik.',
        metricOrTag: 'Alur Approval Cepat',
        highlightType: 'workflow',
      },
      {
        title: 'Pencatatan Mutasi Antar-Gudang & Stock Opname',
        description:
          'Mendukung perpindahan barang dari gudang bahan baku ke lini produksi dengan perhitungan saldo stok real-time.',
        metricOrTag: 'Transaksi ACID PostgreSQL',
        highlightType: 'interface',
      },
      {
        title: 'Audit Trail Penuh untuk Setiap Perubahan Angka',
        description:
          'Tidak ada angka stok yang berubah secara misterius; setiap koreksi menyimpan nilai sebelum, nilai sesudah, dan identitas staf.',
        metricOrTag: 'Keamanan & Audit Internal',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Sistem Internal / NDA Klien',
    caseStudySlug: 'migrasi-erp-pabrik-cikarang',
    serviceSlug: 'software-custom',
    featured: false,
    draft: false,
    updatedAt: '2025-02-18',
    seo: {
      title: 'Portofolio Sistem Inventaris Gudang & Approval PO Custom | CHESTAADOTCOM',
      description:
        'Visual showcase modul ERP inventaris gudang dan persetujuan Purchase Order berbasis React, Node.js, dan PostgreSQL.',
    },
  },

  // 6. AI AGENT (Jasa Profesional)
  {
    slug: 'asisten-kualifikasi-klien-konsultan',
    title: 'Agen Kualifikasi Prospek B2B & Penjadwalan Konsultan',
    oneLiner:
      'AI agent WhatsApp yang menyaring kebutuhan calon klien korporat, menyusun ringkasan ke CRM internal, dan menjadwalkan sesi temu awal otomatis.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent',
    industry: 'Jasa Profesional',
    client: 'Firma Konsultan & Jasa Profesional di Tangerang Selatan',
    year: '2025',
    role: 'Pengembangan AI Agent WhatsApp & Integrasi Pipeline CRM',
    duration: '3 Minggu',
    stack: ['WhatsApp Cloud API', 'Python', 'Node.js', 'PostgreSQL', 'n8n'],
    cover: 'portfolioConsultantAgent',
    deviceFrame: 'phone',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Alur penyaringan prospek B2B dari pesan pertama di WhatsApp hingga pembuatan kartu klien di CRM dan undangan kalender.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioConsultantAgent',
        caption:
          'Tampilan percakapan natural saat agent menanyakan bidang industri, skala perusahaan, dan target waktu pengerjaan.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        caption:
          'Ringkasan prospek terstruktur yang diterima konsultan senior sebelum rapat penemuan dimulai.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Bagi firma konsultan, kantor hukum, maupun agensi B2B, konsultan senior sering menghabiskan banyak waktu hanya untuk menanyakan informasi dasar kepada prospek yang belum tentu sesuai dengan cakupan layanan. Agent ini bertugas melakukan penyaringan awal secara sopan dan terarah begitu pesan masuk.',
      'Setelah mengetahui bidang industri, kebutuhan utama, dan lini masa calon klien, agent mencatat datanya ke tabel CRM kamu dan langsung menawarkan slot diskusi yang kosong di kalender tim konsultan.',
    ],
    features: [
      {
        title: 'Alur Pertanyaan Kualifikasi yang Natural & Ringkas',
        description:
          'Menggali 3–4 informasi kunci (industri, cakupan kebutuhan, target waktu) melalui percakapan yang ramah layaknya asisten eksekutif.',
        metricOrTag: 'Kualifikasi B2B 24/7',
        highlightType: 'interface',
      },
      {
        title: 'Pembuatan Kartu Prospek Otomatis di Database CRM',
        description:
          'Hasil tanya-jawab langsung dirangkum ke kolom terstruktur di PostgreSQL sehingga tim tidak perlu mengetik ulang dari chat.',
        metricOrTag: 'Sinkronisasi CRM Instan',
        highlightType: 'architecture',
      },
      {
        title: 'Penjadwalan Sesi Konsultasi & Undangan Rapat',
        description:
          'Menghubungkan prospek yang memenuhi kriteria langsung ke slot kalender konsultan yang tersedia beserta pengingat jadwal.',
        metricOrTag: 'Integrasi Kalender & n8n',
        highlightType: 'workflow',
      },
      {
        title: 'Eskalasi Instan untuk Klien Prioritas / Korporat',
        description:
          'Jika calon klien membutuhkan diskusi mendesak atau negosiasi khusus, notifikasi prioritas langsung dikirim ke nomor partner konsultan.',
        metricOrTag: 'Fast-Track Handover',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Sistem Internal / NDA Klien',
    serviceSlug: 'ai-agent',
    featured: false,
    draft: false,
    updatedAt: '2025-03-01',
    seo: {
      title: 'Portofolio AI Agent Kualifikasi Klien B2B & CRM | CHESTAADOTCOM',
      description:
        'Visual showcase asisten AI WhatsApp untuk kualifikasi prospek B2B, pencatatan CRM otomatis, dan penjadwalan rapat bagi bisnis jasa profesional.',
    },
  },
];

import { PORTFOLIO_PROJECTS_EN, PORTFOLIO_CATEGORIES_EN } from './projects.en';

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

// ============================================================================
// Backward-compatible export for any legacy consumer importing `PROJECTS`
// ============================================================================
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
  liveLink: p.liveUrl || `/portfolio/${p.slug}`,
  thumbnail: p.cover,
  overview: p.summaryParagraphs[0],
  challenges: p.summaryParagraphs[0],
  solution: p.summaryParagraphs[1],
  impact: p.oneLiner,
}));

