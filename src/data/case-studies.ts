/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: CASE STUDIES (/case-studies & /case-studies/[slug])
 * ============================================================================
 * Voice: "kamu" (jujur, praktisi, jelas, tanpa jargon berlebihan).
 * Placeholder policy: Seluruh nama klien, angka sebelum/sesudah, dan hasil
 * spesifik ditandai dengan. Kami tidak pernah mengarang angka
 * atau kutipan fiktif.
 */

import { ServiceSlug } from './services';

export type CaseStudyServiceFilter =
  | 'semua'
  | 'ai-agent'
  | 'software-custom'
  | 'otomasi-workflow'
  | 'pembuatan-website';

export interface CaseStudyDiagramNode {
  id: string;
  stepLabel: string;
  title: string;
  subtitle: string;
}

export interface CaseStudyDiagramData {
  caption: string;
  nodes: [
    CaseStudyDiagramNode,
    CaseStudyDiagramNode,
    CaseStudyDiagramNode,
    CaseStudyDiagramNode
  ];
}

export interface CaseStudyTradeOffItem {
  decision: string;
  whyChosen: string;
  tradeOff: string;
}

export interface CaseStudyBeforeAfterItem {
  aspect: string;
  before: string;
  after: string;
}

export interface CaseStudyMetricItem {
  label: string;
  /**
   * Jika nilai numerik belum diisi (undefined), kartu metrik otomatis
   * disembunyikan agar halaman tidak pernah menampilkan angka karangan.
   */
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  note?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export type CaseStudyContentBlock =
  | {
      type: 'text';
      paragraphs: string[];
    }
  | {
      type: 'previous-attempts';
      title: string;
      attempts: Array<{
        method: string;
        whyItFailed: string;
      }>;
    }
  | {
      type: 'trade-offs';
      items: CaseStudyTradeOffItem[];
    }
  | {
      type: 'diagram';
      diagram: CaseStudyDiagramData;
    }
  | {
      type: 'list';
      title?: string;
      items: Array<{
        title: string;
        detail: string;
      }>;
    }
  | {
      type: 'image';
      imageKey: string;
      caption: string;
    }
  | {
      type: 'quote';
      quote: string;
      contextLabel: string;
    }
  | {
      type: 'metrics';
      beforeAfter: CaseStudyBeforeAfterItem[];
    };

export interface CaseStudySection {
  id:
    | 'konteks-bisnis'
    | 'masalah'
    | 'pendekatan'
    | 'alur-sistem'
    | 'implementasi'
    | 'hasil'
    | 'yang-kami-pelajari';
  number: string;
  title: string;
  eyebrow: string;
  blocks: CaseStudyContentBlock[];
}

export interface CaseStudyItem {
  slug: string;
  legacySlugs?: string[];
  title: string;
  oneSentenceSummary: string;
  client: string;
  industry: string;
  services: string[];
  serviceSlugs: ServiceSlug[];
  year: string;
  duration: string;
  publishedAt: string;
  updatedAt: string;
  cover: string;
  summary: {
    problem: string;
    solution: string;
    result: string;
  };
  sections: CaseStudySection[];
  /**
   * Kartu metrik count-up. Kosongkan array atau biarkan numericValue undefined
   * selama masih agar kartu angka disembunyikan dan fokus pada
   * tabel Sebelum vs Sesudah.
   */
  metrics: CaseStudyMetricItem[];
  pullQuote: {
    text: string;
    attribution: string;
  };
  testimonial?: CaseStudyTestimonial;
  projectSlug?: string;
  relatedServiceSlugs: ServiceSlug[];
  relatedPostSlugs: string[];
  draft: boolean;
  seo: {
    title: string;
    description: string;
  };
}

export const CASE_STUDY_SERVICE_FILTERS: Array<{
  id: CaseStudyServiceFilter;
  label: string;
}> = [
  { id: 'semua', label: 'Semua Layanan' },
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'software-custom', label: 'Software Custom' },
  { id: 'otomasi-workflow', label: 'Otomasi Workflow' },
  { id: 'pembuatan-website', label: 'Pembuatan Website & Landing Page' },
];

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  // ==========================================================================
  // 1. KLINIK & KESEHATAN — AI AGENT & OTOMASI RESERVASI
  // ==========================================================================
  {
    slug: 'otomasi-reservasi-klinik-estetika',
    title:
      'Menangani Chat Pasien di Luar Jam Operasional & Menghentikan Jadwal Dokter Bentrok',
    oneSentenceSummary:
      'Bagaimana klinik estetika menghubungkan WhatsApp resmi ke kalender praktik dokter agar pasien malam hari tetap terlayani tanpa mengarang saran medis.',
    client: 'Klinik Estetika & Perawatan Kulit di BSD City',
    industry: 'Klinik & Kesehatan',
    services: ['AI Agent', 'Pembuatan Website & Landing Page'],
    serviceSlugs: ['ai-agent', 'pembuatan-website'],
    year: '2025',
    duration: '3 Minggu',
    publishedAt: '2025-03-10',
    updatedAt: '2025-03-12',
    cover: 'portfolioClinicPlaceholder',
    summary: {
      problem:
        'Chat calon pasien dari iklan malam hari baru dibalas keesokan pagi, sementara pencatatan jadwal dokter secara manual di buku dan spreadsheet memicu jadwal ganda.',
      solution:
        'Membangun AI agent WhatsApp dengan tool pengecek slot dokter real-time di PostgreSQL, batasan ketat anti-diagnosis medis, dan serah terima ke resepsionis manusia.',
      result:
        'Respon chat awal berlangsung dalam hitungan detik 24/7, jadwal dokter tercatat di satu sumber data tunggal, dan pengingat H-1 berjalan otomatis.',
    },
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'LATAR BELAKANG OPERASIONAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Klinik estetika ini mengandalkan kampanye iklan Instagram dan pencarian lokal untuk mendatangkan pasien konsultasi kulit maupun perawatan berkala. Seluruh pendaftaran pasien bermuara ke satu nomor WhatsApp admin resepsionis yang juga bertugas melayani pembayaran pasien di meja kasir cabang.',
              'Saat jam pulang kantor antara pukul 19.00 hingga 22.30 malam, trafik pesan WhatsApp justru mencapai titik tertinggi karena calon pasien baru sempat membuka ponsel dan bertanya harga tindakan serta ketersediaan jadwal dokter untuk akhir pekan.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'TITIK MACET & PERCOBAAN SEBELUMNYA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Ketika resepsionis baru membalas pesan pukul 09.00 keesokan paginya, sebagian calon pasien sudah kehilangan minat atau berpindah ke klinik lain yang merespons lebih dulu. Di jam sibuk siang hari, admin juga sering kewalahan membuka-tutup file spreadsheet jadwal tiga dokter berbeda sambil melayani pasien tatap muka.',
              'Akibatnya, pernah terjadi dua pasien tercatat di jam dan ruang tindakan yang sama karena admin salah membaca baris sheet yang belum diperbarui oleh rekan satu shift-nya.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Yang sudah dicoba sebelumnya',
            attempts: [
              {
                method: 'Auto-reply bawaan WhatsApp Business di luar jam kerja',
                whyItFailed:
                  'Hanya mengirim pesan statis "Terima kasih, kami akan membalas besok pagi" sehingga calon pasien tetap tidak tahu apakah slot dokter hari Sabtu masih kosong atau sudah penuh.',
              },
              {
                method: 'Chatbot berbasis tombol angka ("Ketik 1 untuk Harga, Ketik 2 untuk Jadwal")',
                whyItFailed:
                  'Pasien klinik estetika jarang mengetik angka sesuai menu; mereka langsung mengirim kalimat bebas seperti "Kak, kalau facial acne sama dr. Maya hari Minggu siang bisa?" yang membuat bot kaku berhenti merespons.',
              },
              {
                method: 'Membagi jadwal di Google Sheets bersama antar 2 admin',
                whyItFailed:
                  'Saat dibuka dari ponsel, baris tabel sering tidak sengaja tergeser atau terlambat disegarkan sehingga tetap memicu jadwal bentrok.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'KEPUTUSAN ARSITEKTUR & TRADE-OFF',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Alih-alih membiarkan AI menjawab semua hal secara bebas, kami merancang arsitektur yang memisahkan percakapan menjadi dua jalur tegas: jalur informasi & penjadwalan terstruktur yang dieksekusi oleh agent, serta jalur konsultasi medis yang wajib diserahkan ke manusia.',
              'Setiap keputusan teknis diambil dengan mempertimbangkan kemudahan operasional tim resepsionis kamu sehari-hari, termasuk kompromi (trade-off) yang kami sepakati sejak minggu pertama.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Membatasi AI hanya pada katalog resmi & memblokir saran medis',
                whyChosen:
                  'Dalam industri kesehatan dan estetika, satu jawaban yang mengarang dosis atau indikasi perawatan dapat merusak kepercayaan pasien.',
                tradeOff:
                  'Sekitar% chat yang menanyakan keluhan kulit spesifik tidak langsung selesai di bot, melainkan tetap membutuhkan balasan akhir dari admin/dokter pada jam kerja.',
              },
              {
                decision: 'Menggunakan database PostgreSQL terpusat dibanding membaca Google Sheets langsung',
                whyChosen:
                  'Mencegah kondisi balapan (race condition) ketika dua pasien memesan slot jam yang sama di malam hari.',
                tradeOff:
                  'Staf admin perlu membiasakan diri melihat jadwal melalui tampilan web ringan yang kami sediakan, bukan lagi mengedit sel spreadsheet secara bebas.',
              },
              {
                decision: 'Menambahkan jeda konfirmasi sebelum mengunci slot kalender',
                whyChosen:
                  'Memastikan nama lengkap, jenis perawatan, dan jam kedatangan sudah disetujui pasien sebelum slot dokter dikunci di database.',
                tradeOff:
                  'Percakapan bertambah satu langkah konfirmasi ekstra, namun menghapus risiko slot terkunci oleh pengunjung yang sekadar bertanya-tanya.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'SKEMA EKSEKUSI DATA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Begitu pesan masuk ke WhatsApp Cloud API resmi klinik, sistem memproses maksud pesan, mengecek aturan keamanan (guardrail), memanggil fungsi ketersediaan jadwal dokter, dan mencatat pemesanan ke database.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Alur pemrosesan pesan WhatsApp pasien dari pengecekan guardrail hingga penguncian slot dokter di PostgreSQL.',
              nodes: [
                {
                  id: 'wa-in',
                  stepLabel: '01 · INPUT',
                  title: 'WhatsApp Cloud API',
                  subtitle: 'Pesan pasien masuk 24/7',
                },
                {
                  id: 'guardrail',
                  stepLabel: '02 · FILTER',
                  title: 'AI Agent & Guardrail',
                  subtitle: 'Cek katalog & batas medis',
                },
                {
                  id: 'db-slot',
                  stepLabel: '03 · TOOL CALL',
                  title: 'PostgreSQL Slot Lock',
                  subtitle: 'Validasi & kunci jam dokter',
                },
                {
                  id: 'handover',
                  stepLabel: '04 · OUTPUT',
                  title: 'Konfirmasi / Handover',
                  subtitle: 'Balas pasien & notifikasi admin',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'TAHAPAN PEMBANGUNAN & INTEGRASI',
        blocks: [
          {
            type: 'list',
            title: 'Komponen yang dibangun selama 3 minggu pengerjaan',
            items: [
              {
                title: 'Minggu 1 — Pemetaan SOP Klinik & Skema Database Jadwal',
                detail:
                  'Merapikan daftar perawatan resmi, durasi tiap tindakan (30/60/90 menit), jadwal praktik per dokter, dan membangun tabel slot di PostgreSQL.',
              },
              {
                title: 'Minggu 2 — Integrasi WhatsApp Cloud API & Tool Calling Python',
                detail:
                  'Menyambungkan nomor WhatsApp klinik ke layanan backend Python yang memiliki akses baca/tulis ke fungsi check_doctor_slots() dan create_appointment().',
              },
              {
                title: 'Minggu 3 — Uji Simulasi Kasus Tepi, Dashboard Admin & Pengingat H-1',
                detail:
                  'Menguji skenario pembatalan, penjadwalan ulang, eskalasi komplain ke resepsionis, serta mengaktifkan pengingat jadwal otomatis 24 jam sebelum tindakan.',
              },
            ],
          },
          {
            type: 'image',
            imageKey: 'portfolioGalleryArchitecture',
            caption:
              'Visualisasi arsitektur serah terima percakapan dan pencatatan jadwal dokter terpusat.',
          },
        ],
      },
      {
        id: 'hasil',
        number: '06',
        title: 'Hasil',
        eyebrow: 'PERBANDINGAN SEBELUM & SESUDAH',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Setelah sistem berjalan di lingkungan operasional cabang, perubahan paling terasa berada pada hilangnya tumpukan chat pagi hari dan ketertiban jadwal ruang tindakan dokter.',
            ],
          },
          {
            type: 'metrics',
            beforeAfter: [
              {
                aspect: 'Waktu tanggap chat malam hari (19.00–23.00)',
                before:
                  'Menunggu hingga jam buka besok pagi (rata-rata jeda jam).',
                after:
                  'Dijawab otomatis dalam hitungan detik lengkap dengan opsi jam praktik dokter yang kosong.',
              },
              {
                aspect: 'Pencatatan jadwal & risiko bentrok ruangan',
                before:
                  'Dicatat manual di buku resepsionis dan spreadsheet terpisah, rentan jadwal ganda.',
                after:
                  'Terkunci otomatis di satu database PostgreSQL; slot yang sudah terisi tidak bisa dipesan dua kali.',
              },
              {
                aspect: 'Pengingat kedatangan pasien (H-1)',
                before:
                  'Admin menyalin pesan satu per satu jika sempat, sehingga sering terlewat saat klinik ramai.',
                after:
                  'Dikirim terjadwal setiap sore untuk seluruh pasien besok beserta konfirmasi hadir otomatis.',
              },
              {
                aspect: 'Serah terima konsultasi medis khusus',
                before:
                  'Pasien harus menceritakan ulang keluhannya dari awal ketika berganti admin shift.',
                after:
                  'Admin menerima notifikasi eskalasi beserta rangkuman 3 poin kebutuhan pasien di layar dashboard.',
              },
            ],
          },
        ],
      },
      {
        id: 'yang-kami-pelajari',
        number: '07',
        title: 'Yang kami pelajari',
        eyebrow: 'CATATAN PRAKTISI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pelajaran terpenting dari proyek ini adalah bahwa keberhasilan AI agent di klinik kesehatan bukan ditentukan oleh seberapa panjang kalimat yang bisa ditulis AI, melainkan seberapa rapi aturan durasi tindakan dan batasan serah terima ke staf manusia.',
              'Ketika resepsionis dilibatkan sejak awal untuk menentukan pertanyaan mana yang boleh dijawab otomatis dan mana yang harus dioper ke mereka, adopsi sistem di cabang berjalan lancar tanpa resistensi dari tim internal kamu.',
            ],
          },
          {
            type: 'quote',
            quote:
              'Jangan meminta AI menebak jadwal atau mengarang saran perawatan. Berikan akses ke tabel jadwal yang pasti, dan biarkan manusia menangani empati medisnya.',
            contextLabel: 'Prinsip Desain AI Agent — CHESTAADOTCOM',
          },
        ],
      },
    ],
    // Dikosongkan selama masih placeholder agar kartu angka fiktif tidak dirender
    metrics: [],
    pullQuote: {
      text: 'Otomasi yang sehat di klinik tidak menggantikan keramahan resepsionis, tetapi memastikan calon pasien pukul 10 malam langsung mendapatkan kepastian jadwal.',
      attribution: 'Catatan Arsitektur Sistem — CHESTAADOTCOM',
    },
    projectSlug: 'klinik-estetika-bsd-ai-booking',
    relatedServiceSlugs: ['ai-agent', 'pembuatan-website'],
    relatedPostSlugs: [
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
    ],
    draft: false,
    seo: {
      title:
        'Studi Kasus AI Agent WhatsApp & Booking Klinik Estetika | CHESTAADOTCOM',
      description:
        'Cerita lengkap bagaimana kami merancang AI agent WhatsApp dan sistem penjadwalan dokter untuk klinik estetika di BSD City: masalah awal, kompromi teknis, dan hasil.',
    },
  },

  // ==========================================================================
  // 2. LOGISTIK & OPERASIONAL — SOFTWARE CUSTOM & DASHBOARD ARMADA
  // ==========================================================================
  {
    slug: 'sentralisasi-operasional-armada-logistik',
    legacySlugs: ['eliminasi-excel-logistik-surabaya'],
    title:
      'Mengganti Belasan File Spreadsheet dengan Dashboard Surat Jalan & Armada Terpusat',
    oneSentenceSummary:
      'Bagaimana perusahaan distribusi menyatukan pembuatan manifest gudang, pemantauan status sopir, dan rekap penagihan ke dalam satu aplikasi web internal.',
    client: 'Perusahaan Distribusi & Logistik Regional',
    industry: 'Logistik & Operasional',
    services: ['Software Custom', 'Otomasi Workflow'],
    serviceSlugs: ['software-custom', 'otomasi-workflow'],
    year: '2025',
    duration: '4 Minggu',
    publishedAt: '2025-03-04',
    updatedAt: '2025-03-08',
    cover: 'portfolioLogisticsDashboard',
    summary: {
      problem:
        'Data pengiriman tersebar di belasan file spreadsheet dan grup chat WhatsApp, memicu penomoran surat jalan ganda serta keterlambatan penerbitan invoice penagihan.',
      solution:
        'Membangun aplikasi web dashboard operasional custom berbasis React, Node.js, dan PostgreSQL dengan pembagian hak akses (Gudang, Dispatcher, Finance) serta notifikasi WhatsApp otomatis.',
      result:
        'Surat jalan terbit dari satu pintu tanpa nomor ganda, status pengiriman terpantau real-time, dan tim keuangan dapat menarik rekap siap tagih dalam satu klik.',
    },
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'LATAR BELAKANG OPERASIONAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Perusahaan distribusi ini melayani pengiriman barang harian ke puluhan titik ritel dan gudang mitra menggunakan armada internal. Setiap pengiriman melewati tiga divisi berbeda: staf admin gudang yang menyiapkan manifest barang, koordinator lapangan (dispatcher) yang mengatur penugasan sopir, serta tim keuangan (finance) yang menerbitkan faktur penagihan setelah barang diterima.',
              'Selama beberapa tahun, koordinasi ketiga divisi tersebut bertumpu pada kiriman file Excel harian dan foto surat jalan fisik di grup WhatsApp operasional.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'TITIK MACET & PERCOBAAN SEBELUMNYA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Masalah mulai membesar ketika jumlah pengiriman harian bertambah dan staf bekerja dalam dua shift. Admin gudang sering menyalin template file hari sebelumnya sehingga nomor surat jalan kadang terduplikasi atau rumus rekap tidak sengaja terhapus.',
              'Di sisi hilir, bagian keuangan harus mencocokkan ratusan foto bukti terima barang di grup chat dengan baris spreadsheet satu per satu sebelum berani mengirim tagihan ke klien korporat.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Yang sudah dicoba sebelumnya',
            attempts: [
              {
                method: 'Menggunakan satu file spreadsheet cloud bersama untuk semua divisi',
                whyItFailed:
                  'Karena semua orang memiliki akses edit penuh ke lembar yang sama, staf gudang kadang tidak sengaja mengubah kolom harga milik tim finance, dan file menjadi sangat lambat ketika baris transaksi menumpuk.',
              },
              {
                method: 'Mencoba berlangganan software ERP logistik SaaS siap pakai',
                whyItFailed:
                  'Biaya lisensi dihitung per pengguna setiap bulan, sementara antarmukanya memiliki terlalu banyak menu akuntansi rumit yang membingungkan staf gudang di lapangan.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'KEPUTUSAN ARSITEKTUR & TRADE-OFF',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Kami mengambil pendekatan rekayasa perangkat lunak custom yang hanya menampilkan layar kerja sesuai peran masing-masing staf. Staf gudang hanya melihat antrean barang keluar dan tombol cetak surat jalan, sedangkan nilai rupiah kontrak dan status penagihan hanya terbuka untuk akun finance dan manajemen.',
              'Berikut adalah keputusan arsitektur dan kompromi teknis yang kami ambil bersama pemilik bisnis:',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Aplikasi web responsif (PWA-ready) dibanding membangun aplikasi native iOS/Android terpisah',
                whyChosen:
                  'Memangkas waktu pengerjaan menjadi 4 minggu dan memudahkan pembaruan fitur secara instan untuk seluruh komputer gudang maupun ponsel koordinator lapangan.',
                tradeOff:
                  'Membutuhkan koneksi internet seluler saat sopir atau koordinator memperbarui status barang tiba di lokasi tujuan.',
              },
              {
                decision: 'Notifikasi status via WhatsApp API dibanding membangun sistem pelacakan GPS peta penuh',
                whyChosen:
                  'Kebutuhan paling mendesak bagi manajemen dan pelanggan adalah kepastian status tahapan (Berangkat, Tiba, Selesai Muat) beserta bukti foto surat jalan, bukan titik koordinat detik-per-detik.',
                tradeOff:
                  'Tidak menampilkan peta pergerakan truk secara live, tetapi menghemat biaya perangkat keras GPS tracker dan menjaga sistem tetap ringan.',
              },
              {
                decision: 'Penomoran dokumen sekuensial terkunci di level transaksi PostgreSQL',
                whyChosen:
                  'Menjamin tidak akan pernah ada dua surat jalan dengan nomor identik meskipun dua admin menekan tombol simpan di detik yang bersamaan.',
                tradeOff:
                  'Surat jalan yang salah input tidak boleh dihapus begitu saja dari database, melainkan harus berstatus "Batal (Void)" demi menjaga keutuhan jejak audit.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'SKEMA EKSEKUSI DATA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Data mengalir satu arah dari pembuatan manifest di gudang hingga siap ditagihkan oleh tim finance tanpa ada lagi proses ketik ulang antar-divisi.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Alur satu pintu dari penerbitan manifest gudang hingga rekap invoice otomatis di meja finance.',
              nodes: [
                {
                  id: 'manifest',
                  stepLabel: '01 · GUDANG',
                  title: 'Input Manifest',
                  subtitle: 'Terbit nomor Surat Jalan unik',
                },
                {
                  id: 'dispatch',
                  stepLabel: '02 · DISPATCH',
                  title: 'Penugasan Armada',
                  subtitle: 'Pilih rute & sopir bertugas',
                },
                {
                  id: 'pod',
                  stepLabel: '03 · LAPANGAN',
                  title: 'Konfirmasi Tiba',
                  subtitle: 'Unggah bukti & WA ke klien',
                },
                {
                  id: 'finance',
                  stepLabel: '04 · FINANCE',
                  title: 'Antrean Siap Tagih',
                  subtitle: 'Ekspor rekap invoice instan',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'TAHAPAN PEMBANGUNAN & INTEGRASI',
        blocks: [
          {
            type: 'list',
            title: 'Langkah eksekusi tanpa menghentikan pengiriman harian',
            items: [
              {
                title: 'Minggu 1 — Audit Template Surat Jalan & Desain Skema Role-Based Access',
                detail:
                  'Memetakan seluruh kolom data yang wajib ada di surat jalan cetak dan memisahkan hak akses untuk 3 peran utama (Gudang, Operasional, Finance).',
              },
              {
                title: 'Minggu 2 — Pengembangan Modul Manifest, Armada & Generator Dokumen Cetak',
                detail:
                  'Membangun antarmuka tabel cepat dengan pencarian instan serta fitur cetak surat jalan berformat rapi langsung dari browser.',
              },
              {
                title: 'Minggu 3 — Integrasi Notifikasi WhatsApp & Modul Konfirmasi Lapangan',
                detail:
                  'Menyambungkan pemicu pesan otomatis saat status pengiriman berubah menjadi "Dalam Perjalanan" dan "Barang Diterima".',
              },
              {
                title: 'Minggu 4 — Migrasi Data Master Klien & Pelatihan Staf Shift',
                detail:
                  'Memindahkan daftar pelanggan dan tarif rute dari Excel lama ke PostgreSQL, diikuti pendampingan pemakaian langsung bersama staf gudang.',
              },
            ],
          },
          {
            type: 'image',
            imageKey: 'portfolioLogisticsDashboard',
            caption:
              'Tampilan dashboard pemantauan armada dan filter status surat jalan harian.',
          },
        ],
      },
      {
        id: 'hasil',
        number: '06',
        title: 'Hasil',
        eyebrow: 'PERBANDINGAN SEBELUM & SESUDAH',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Transisi dari file terpisah ke satu database terpusat menghilangkan perdebatan selisih data antara gudang dan bagian penagihan.',
            ],
          },
          {
            type: 'metrics',
            beforeAfter: [
              {
                aspect: 'Penerbitan surat jalan & penomoran dokumen',
                before:
                  'Ketik manual di file spreadsheet per cabang, rawan nomor ganda dan salah rumus.',
                after:
                  'Terbit otomatis dari database pusat dengan format cetak standar dalam satu klik.',
              },
              {
                aspect: 'Pelacakan status barang tiba (Proof of Delivery)',
                before:
                  'Foto surat jalan menumpuk di grup chat WhatsApp dan sulit dicari saat ada klaim pelanggan.',
                after:
                  'Tersimpan rapi menempel pada nomor surat jalan masing-masing lengkap dengan waktu dan nama petugas.',
              },
              {
                aspect: 'Proses rekap penagihan mingguan/bulanan (Finance)',
                before:
                  'Menyalin dan mencocokkan ratusan baris pengiriman secara manual sebelum membuat invoice.',
                after:
                  'Filter pengiriman berstatus "Selesai" dan unduh rekap siap tagih dalam hitungan detik.',
              },
              {
                aspect: 'Biaya lisensi penambahan akun staf',
                before:
                  'Terkendala biaya langganan per kursi (per-user) pada platform SaaS komersial.',
                after:
                  'Bebas menambah akun staf gudang, koordinator, dan admin tanpa biaya lisensi per orang.',
              },
            ],
          },
        ],
      },
      {
        id: 'yang-kami-pelajari',
        number: '07',
        title: 'Yang kami pelajari',
        eyebrow: 'CATATAN PRAKTISI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Bagi tim operasional lapangan yang bekerja di bawah tekanan jam keberangkatan truk, kecepatan input jauh lebih penting daripada dekorasi visual yang rumit. Memangkas jumlah kolom formulir hingga tersisa yang benar-benar krusial membuat staf gudang langsung nyaman meninggalkan spreadsheet lama mereka.',
              'Selain itu, menyimpan jejak audit (siapa mengubah status apa dan jam berapa) terbukti menjadi fitur yang paling disukai pemilik bisnis karena membangun akuntabilitas antar-divisi secara sehat.',
            ],
          },
          {
            type: 'quote',
            quote:
              'Software internal yang baik tidak memaksa staf gudang menjadi akuntan; ia menyederhanakan layar input di hulu agar laporan keuangan di hilir otomatis rapi.',
            contextLabel: 'Prinsip Desain Software Custom — CHESTAADOTCOM',
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Saat gudang, koordinator armada, dan bagian keuangan melihat satu tabel kebenaran yang sama, waktu yang tadinya habis untuk mencari selisih data kembali dipakai untuk melayani pengiriman.',
      attribution: 'Catatan Rekayasa Sistem — CHESTAADOTCOM',
    },
    projectSlug: 'dashboard-operasional-logistik-tangsel',
    relatedServiceSlugs: ['software-custom', 'otomasi-workflow'],
    relatedPostSlugs: [
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    ],
    draft: false,
    seo: {
      title:
        'Studi Kasus Dashboard Operasional & Surat Jalan Logistik | CHESTAADOTCOM',
      description:
        'Cerita lengkap pembangunan aplikasi web dashboard operasional armada dan surat jalan terpusat untuk menggantikan belasan spreadsheet manual.',
    },
  },

  // ==========================================================================
  // 3. F&B & RETAIL — OTOMASI WORKFLOW REKAP POS MULTI-CABANG
  // ==========================================================================
  {
    slug: 'sinkronisasi-rekap-pos-fnb-multi-cabang',
    legacySlugs: ['migrasi-erp-pabrik-cikarang'],
    title:
      'Otomasi Rekap Kasir POS Multi-Cabang & Peringatan Stok Bahan Baku ke WhatsApp Owner',
    oneSentenceSummary:
      'Bagaimana jaringan restoran dan kafe menghilangkan rutinitas unduh-salin CSV kasir setiap malam dan mengirim rangkuman laba bersih otomatis pukul 22.00 WIB.',
    client: 'Jaringan Restoran & Kafe di Gading Serpong',
    industry: 'F&B & Retail',
    services: ['Otomasi Workflow', 'Software Custom'],
    serviceSlugs: ['otomasi-workflow', 'software-custom'],
    year: '2024',
    duration: '2 Minggu',
    publishedAt: '2025-02-20',
    updatedAt: '2025-02-26',
    cover: 'portfolioFnbPlaceholder',
    summary: {
      problem:
        'Staf admin harus mengunduh laporan CSV dari aplikasi kasir tiap cabang dan menggabungkannya manual ke spreadsheet, sehingga pemilik bisnis baru tahu angka penjualan keesokan siang.',
      solution:
        'Membangun pipeline otomasi menggunakan n8n, skrip rekonsiliasi Python, database PostgreSQL, dan pengiriman rangkuman harian via WhatsApp Cloud API setiap jam tutup toko.',
      result:
        'Laporan omzet bersih per cabang, potongan komisi aplikasi pesan-antar, dan daftar bahan baku menipis diterima otomatis di ponsel owner setiap pukul 22.00 WIB.',
    },
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'LATAR BELAKANG OPERASIONAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Bisnis F&B yang beroperasi di beberapa cabang memiliki ratusan transaksi harian yang terbagi antara makan di tempat (dine-in), bawa pulang, serta pesanan dari platform pesan-antar online. Masing-masing cabang menutup kasir sekitar pukul 21.30 malam.',
              'Pemilik bisnis membutuhkan angka penjualan bersih dan posisi stok bahan baku utama malam itu juga agar dapat memutuskan belanja bahan segar ke pemasok untuk keesokan paginya.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'TITIK MACET & PERCOBAAN SEBELUMNYA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Aplikasi kasir (POS) yang digunakan memang menyediakan laporan, tetapi datanya terpisah per akun cabang dan belum memisahkan potongan diskon promosi platform pesan-antar secara bersih sesuai format pembukuan internal.',
              'Setiap pagi, staf admin harus masuk ke akun tiap cabang, mengunduh file CSV, merapikan kolom di spreadsheet, lalu menghitung selisih pemakaian bahan baku dapur. Jika admin sedang libur atau sakit, pemilik bisnis praktis tidak memegang laporan harian.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Yang sudah dicoba sebelumnya',
            attempts: [
              {
                method: 'Meminta kapten kasir cabang mengetik rangkuman manual di grup WhatsApp saat tutup toko',
                whyItFailed:
                  'Staf cabang sudah lelah setelah jam operasional malam, sehingga sering terjadi salah ketik angka nominal atau lupa memperhitungkan transaksi void/refund.',
              },
              {
                method: 'Menggunakan rumus IMPORTRANGE bertingkat di Google Sheets',
                whyItFailed:
                  'Sering mengalami error pemuatan (#REF! / Loading...) ketika jumlah baris transaksi bulanan menembus puluhan ribu baris dari seluruh cabang.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'KEPUTUSAN ARSITEKTUR & TRADE-OFF',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Kami memilih untuk tidak mengganti aplikasi kasir POS yang sudah akrab dipakai kasir di meja depan. Sebagai gantinya, kami membangun lapisan otomasi di belakang layar yang menarik data transaksi secara terjadwal, mengolahnya dengan aturan akuntansi milik klien, dan menyajikan hasilnya ke kanal yang paling sering dibuka owner: WhatsApp.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Mempertahankan POS lama & membangun konektor otomasi n8n + Python',
                whyChosen:
                  'Menghindari biaya pergantian perangkat kasir dan tidak perlu melatih ulang seluruh kasir cabang.',
                tradeOff:
                  'Penarikan data bergantung pada sinkronisasi internet mesin kasir cabang saat tutup buku pukul 21.30–22.00 WIB.',
              },
              {
                decision: 'Menambahkan mekanisme percobaan ulang (auto-retry) 3 kali dengan jeda 15 menit',
                whyChosen:
                  'Kadang tablet kasir di salah satu cabang terlambat terhubung ke Wi-Fi saat proses tutup kasir malam.',
                tradeOff:
                  'Jika satu cabang belum sinkron pada pukul 22.00, pesan WhatsApp owner akan menampilkan cabang yang sudah masuk lebih dulu disertai catatan cabang mana yang sedang menunggu sinkronisasi ulang.',
              },
              {
                decision: 'Menyimpan hasil rekonsiliasi bersih di PostgreSQL sebelum dikirim ke WhatsApp',
                whyChosen:
                  'Memastikan pemilik bisnis tetap memiliki riwayat data bulanan yang bisa diaudit kapan saja tanpa membebani file spreadsheet.',
                tradeOff:
                  'Memerlukan pemeliharaan skrip pemetaan menu apabila manajemen merilis kategori produk baru di mesin kasir.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'SKEMA EKSEKUSI DATA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Setiap malam tepat pukul 22.00 WIB, penjadwal otomatis (cron trigger) menjalankan alur penarikan, penghitungan resep bahan baku, penyimpanan database, hingga pengiriman laporan WhatsApp.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Pipeline otomasi n8n dan Python dari penarikan transaksi POS cabang hingga pengiriman ringkasan ke WhatsApp owner.',
              nodes: [
                {
                  id: 'pos-pull',
                  stepLabel: '01 · CRON 22:00',
                  title: 'Tarik Data POS Cabang',
                  subtitle: 'Ambil transaksi harian & void',
                },
                {
                  id: 'python-recon',
                  stepLabel: '02 · OLAH DATA',
                  title: 'Rekonsiliasi Python',
                  subtitle: 'Hitung omzet bersih & HPP stok',
                },
                {
                  id: 'pg-store',
                  stepLabel: '03 · SIMPAN',
                  title: 'Database PostgreSQL',
                  subtitle: 'Arsip laporan & cek batas stok',
                },
                {
                  id: 'wa-report',
                  stepLabel: '04 · LAPOR',
                  title: 'Ringkasan WhatsApp',
                  subtitle: 'Kirim omzet & daftar reorder',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'TAHAPAN PEMBANGUNAN & INTEGRASI',
        blocks: [
          {
            type: 'list',
            title: 'Pengerjaan terfokus dalam 2 minggu',
            items: [
              {
                title: 'Minggu 1 — Konektor Data POS, Rumus Komisi & Pemetaan Bahan Baku',
                detail:
                  'Menyambungkan endpoint laporan transaksi tiap cabang ke workflow n8n dan menulis skrip Python untuk menghitung potongan bersih per metode pembayaran serta pengurangan stok bahan utama.',
              },
              {
                title: 'Minggu 2 — Format Pesan Eksekutif WhatsApp, Auto-Retry & Uji Coba Paralel',
                detail:
                  'Merancang tata letak pesan laporan WhatsApp agar nyaman dibaca dalam 15 detik di layar ponsel, lengkap dengan pengujian paralel bersama rekap manual admin untuk memastikan kecocokan angka 100%.',
              },
            ],
          },
          {
            type: 'image',
            imageKey: 'portfolioGalleryAnalytics',
            caption:
              'Visualisasi log eksekusi workflow harian dan pemantauan stok bahan baku multi-cabang.',
          },
        ],
      },
      {
        id: 'hasil',
        number: '06',
        title: 'Hasil',
        eyebrow: 'PERBANDINGAN SEBELUM & SESUDAH',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pemilik bisnis kini menutup hari dengan visibilitas penuh atas performa tiap cabang tanpa harus menunggu staf admin masuk kantor keesokan paginya.',
            ],
          },
          {
            type: 'metrics',
            beforeAfter: [
              {
                aspect: 'Waktu tersedianya laporan penjualan harian',
                before:
                  'Baru selesai direkap keesokan harinya sekitar pukul 11.00–13.00 siang.',
                after:
                  'Masuk otomatis ke WhatsApp owner setiap malam pukul 22.00 WIB tepat setelah tutup toko.',
              },
              {
                aspect: 'Pekerjaan salin-tempel file CSV oleh admin',
                before:
                  'Mengunduh dan menggabungkan file dari tiap cabang secara manual setiap pagi.',
                after:
                  'Berjalan otomatis di latar belakang; admin fokus memeriksa anomali dan pembelian bahan.',
              },
              {
                aspect: 'Deteksi bahan baku menipis di dapur cabang',
                before:
                  'Sering baru ketahuan saat staf dapur melapor bahan hampir habis di jam makan siang.',
                after:
                  'Daftar bahan yang menyentuh batas minimum langsung tercantum di laporan malam untuk dipesan pagi hari.',
              },
              {
                aspect: 'Penanganan kendala koneksi internet kasir cabang',
                before:
                  'Data cabang hilang dari rekap harian jika kasir lupa mengirim laporan sebelum pulang.',
                after:
                  'Workflow melakukan auto-retry terjadwal dan memberi penanda status sinkronisasi yang transparan.',
              },
            ],
          },
        ],
      },
      {
        id: 'yang-kami-pelajari',
        number: '07',
        title: 'Yang kami pelajari',
        eyebrow: 'CATATAN PRAKTISI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Dalam proyek otomasi operasional F&B, laporan terbaik bukanlah dashboard dengan puluhan grafik rumit yang jarang dibuka, melainkan satu pesan terstruktur yang datang tepat waktu di aplikasi yang sudah kamu buka setiap hari.',
              'Menyertakan logika penanganan error (seperti pemberitahuan jujur saat satu cabang belum sinkron internetnya) membuat pemilik bisnis percaya penuh pada angka yang dikirim oleh sistem.',
            ],
          },
          {
            type: 'quote',
            quote:
              'Kamu tidak selalu harus membongkar software lama yang sudah berjalan di kasir. Sering kali yang dibutuhkan hanyalah jembatan otomatis yang membereskan pekerjaan salin-tempel di antaranya.',
            contextLabel: 'Prinsip Otomasi Workflow — CHESTAADOTCOM',
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Keputusan belanja bahan baku esok pagi jauh lebih tenang ketika rangkuman omzet bersih dan sisa stok seluruh cabang sudah ada di genggaman pukul 10 malam.',
      attribution: 'Catatan Otomasi Operasional — CHESTAADOTCOM',
    },
    projectSlug: 'otomasi-rekap-pos-fnb-serpong',
    relatedServiceSlugs: ['otomasi-workflow', 'software-custom'],
    relatedPostSlugs: [
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
    ],
    draft: false,
    seo: {
      title:
        'Studi Kasus Otomasi Rekap POS Multi-Cabang & Laporan WhatsApp F&B | CHESTAADOTCOM',
      description:
        'Cerita lengkap bagaimana kami mengotomasi penarikan data kasir POS multi-cabang F&B di Gading Serpong menggunakan n8n, Python, PostgreSQL, dan WhatsApp API.',
    },
  },
];

import { CASE_STUDIES_DATA_EN, CASE_STUDY_SERVICE_FILTERS_EN } from './case-studies.en';

export function getCaseStudyServiceFilters(locale: 'id' | 'en' = 'id'): Array<{
  id: CaseStudyServiceFilter;
  label: string;
}> {
  return locale === 'en' ? CASE_STUDY_SERVICE_FILTERS_EN : CASE_STUDY_SERVICE_FILTERS;
}

export function getPublishedCaseStudies(locale: 'id' | 'en' = 'id'): CaseStudyItem[] {
  const source = locale === 'en' ? CASE_STUDIES_DATA_EN : CASE_STUDIES_DATA;
  return source.filter((item) => !item.draft);
}

export function getCaseStudyBySlug(
  slug?: string,
  locale: 'id' | 'en' = 'id'
): CaseStudyItem | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  return getPublishedCaseStudies(locale).find(
    (item) =>
      item.slug.toLowerCase() === clean ||
      (item.legacySlugs && item.legacySlugs.some((legacy) => legacy.toLowerCase() === clean))
  );
}

export function getNextCaseStudy(slug: string, locale: 'id' | 'en' = 'id'): CaseStudyItem {
  const published = getPublishedCaseStudies(locale);
  const idx = published.findIndex(
    (item) => item.slug === slug || (item.legacySlugs && item.legacySlugs.includes(slug))
  );
  if (idx === -1) return published[0];
  return published[(idx + 1) % published.length];
}

export function getCaseStudyIndustries(locale: 'id' | 'en' = 'id'): string[] {
  const industries = Array.from(new Set(getPublishedCaseStudies(locale).map((c) => c.industry)));
  return [locale === 'en' ? 'All Industries' : 'Semua Industri', ...industries];
}

// ============================================================================
// Backward-compatible legacy exports for any existing consumer
// ============================================================================
export interface CaseStudyData {
  slug: string;
  title: string;
  clientIndustry: string;
  location: string;
  problem: string;
  architectureUsed: string;
  roiMetrics: string;
  implementationTime: string;
  summary: string;
  keyTakeaways: string[];
  metrics: { label: string; value: string; change: string }[];
}

export const CASE_STUDIES: CaseStudyData[] = getPublishedCaseStudies('id').map((cs) => ({
  slug: cs.slug,
  title: cs.title,
  clientIndustry: cs.industry,
  location: cs.client,
  problem: cs.summary.problem,
  architectureUsed: cs.summary.solution,
  roiMetrics: cs.summary.result,
  implementationTime: cs.duration,
  summary: cs.oneSentenceSummary,
  keyTakeaways: [cs.summary.problem, cs.summary.solution, cs.summary.result],
  metrics: [],
}));

