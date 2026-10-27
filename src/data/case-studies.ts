/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: CASE STUDIES (data/case-studies) — CHESTAADOTCOM
 * ============================================================================
 * Honesty & Internal Demo Content Rules:
 * - Every case study on this site is an INTERNAL CHESTAADOTCOM project.
 * - Carries the visible badge "Proyek internal" ("Internal project" in English).
 * - Numbers on the page are "Target desain" only (labeled "Target desain, bukan hasil klien" /
 *   "Design target, not client results"). Shown as static badges, never count-up.
 * - Never present as client work. No client names, no testimonials, no ratings, no measured results.
 *
 * HOW TO REPLACE AN INTERNAL CASE STUDY WITH A REAL CLIENT CASE STUDY LATER:
 * 1. Obtain written approval from the client for publishing the story and verified metrics.
 * 2. Set `internal: false` and update `internalBadgeLabel` to `"Studi kasus klien"` (EN: `"Client case study"`).
 * 3. Update `client` to the approved client name or industry descriptor.
 * 4. Change `targetsBadgeLabel` to `"Hasil terukur di lapangan"` (EN: `"Measured field results"`) only for metrics verified with the client.
 * 5. Replace illustration keys (`cover`) with real approved screenshots in `src/config/images.ts`.
 */

import { ServiceSlug } from './services';
import { CASE_STUDIES_DATA_EN, CASE_STUDY_SERVICE_FILTERS_EN } from './case-studies.en';

export type CaseStudyServiceFilter =
  | 'semua'
  | 'pembuatan-website'
  | 'ai-agent'
  | 'software-custom'
  | 'otomasi-workflow';

export interface CaseStudyDiagramNode {
  id: string;
  stepLabel: string;
  title: string;
  subtitle: string;
}

export interface CaseStudyDiagramBranch {
  fromNodeIndex: number; // 0-indexed node from which the branch splits
  stepLabel: string;
  title: string;
  subtitle: string;
}

export interface CaseStudyDiagramData {
  caption: string;
  nodes: CaseStudyDiagramNode[];
  branch?: CaseStudyDiagramBranch;
}

export interface CaseStudyTradeOffItem {
  decision: string;
  whyChosen: string;
  tradeOff: string;
}

export interface CaseStudyCalloutBlock {
  label: string;
  title: string;
  body: string;
}

export interface CaseStudyBeforeAfterItem {
  aspect: string;
  before: string;
  after: string;
}

export interface CaseStudyDesignTarget {
  label: string;
  value: string;
  note: string;
}

export interface CaseStudyMetricItem {
  label: string;
  value?: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  note?: string;
}

export type CaseStudyContentBlock =
  | {
      type: 'text';
      paragraphs: string[];
    }
  | {
      type: 'callout';
      callout: CaseStudyCalloutBlock;
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
      type: 'targets';
      badgeLabel: string;
      targets: CaseStudyDesignTarget[];
      beforeAfter?: CaseStudyBeforeAfterItem[];
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
    | 'konteks'
    | 'masalah'
    | 'pendekatan'
    | 'alur-sistem'
    | 'implementasi'
    | 'target-desain'
    | 'catatan-perancangan'
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
  internal: boolean;
  internalBadgeLabel: string;
  targetsBadgeLabel: string;
  duration: string;
  readingTime: string;
  author: 'Chesta Azka' | 'Zeeshan';
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  cover: string;
  coverCaption: string;
  summary: {
    problem: string;
    built: string;
    solution: string;
    result: string;
  };
  targets: CaseStudyDesignTarget[];
  sections: CaseStudySection[];
  metrics: CaseStudyMetricItem[];
  pullQuote: {
    text: string;
    attribution: string;
  };
  projectSlug: string;
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
  { id: 'semua', label: 'Semua' },
  { id: 'pembuatan-website', label: 'Web & Landing Page' },
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'software-custom', label: 'Software Custom' },
  { id: 'otomasi-workflow', label: 'Otomasi Workflow' },
];

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  // ===========================================================================
  // CASE STUDY 1: wa-concierge-klinik
  // ===========================================================================
  {
    slug: 'wa-concierge-klinik',
    legacySlugs: ['otomasi-reservasi-klinik-estetika', 'landing-klinik-estetika'],
    title: 'WA Concierge: merancang agen booking untuk klinik',
    oneSentenceSummary:
      'Proyek internal merancang agen WhatsApp yang memahami maksud pesan calon pasien, mengecek slot kalender terapis, membuat booking, dan menyerahkan kasus di luar aturan ke staf klinik.',
    client: 'Proyek internal CHESTAADOTCOM',
    industry: 'Klinik',
    services: ['AI Agent'],
    serviceSlugs: ['ai-agent'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    targetsBadgeLabel: 'Target desain, bukan hasil klien',
    duration: 'Proyek internal',
    readingTime: '6 menit baca',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (arsitektur, produk, teknologi)',
    publishedAt: '2026-03-10',
    updatedAt: '2026-03-20',
    cover: 'projectWaConciergeKlinik',
    coverCaption:
      'Ilustrasi: simulasi percakapan WA Concierge saat membaca maksud pasien, memeriksa jadwal terapis, dan membuat konfirmasi booking.',
    summary: {
      problem:
        'Klinik kecil menerima pesan WhatsApp sepanjang hari, termasuk malam, dan satu admin harus menjawab pertanyaan yang sama sambil mengurus jadwal.',
      built:
        'Agen yang memahami maksud pesan, mengecek kalender terapis, membuat booking, mengirim konfirmasi dan pengingat, lalu menyerahkan kasus di luar aturan ke staf.',
      solution:
        'Agen yang memahami maksud pesan, mengecek kalender terapis, membuat booking, mengirim konfirmasi dan pengingat, lalu menyerahkan kasus di luar aturan ke staf.',
      result:
        'Target desain: waktu respons awal < 10 detik, serah ke manusia otomatis dengan ringkasan, dan pengingat jadwal H-1 via WhatsApp.',
    },
    targets: [
      {
        label: 'Waktu respons awal',
        value: '< 10 detik',
        note: 'Target untuk pesan di jam sibuk dan malam',
      },
      {
        label: 'Serah ke manusia',
        value: 'Otomatis dengan ringkasan',
        note: 'Saat pertanyaan di luar aturan',
      },
      {
        label: 'Pengingat jadwal',
        value: 'H-1 via WhatsApp',
        note: 'Mengurangi jadwal terlewat',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'PROYEK INTERNAL · KLINIK',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Di banyak klinik perawatan kulit, gigi, maupun fisioterapi skala kecil di Tangerang Selatan dan Jakarta Selatan, WhatsApp bukan sekadar saluran tanya jawab tambahan—WhatsApp adalah meja resepsionis utama. Calon pasien jarang mengisi formulir panjang di website untuk memesan jadwal. Mereka lebih suka mengirim pesan singkat seperti menanyakan kisaran harga perawatan dasar, menanyakan apakah hari Sabtu sore masih ada jadwal kosong, atau meminta pindah jam karena terjebak macet di jalan.',
              'Kami membangun WA Concierge sebagai proyek internal CHESTAADOTCOM untuk menguji secara langsung bagaimana sebuah agen percakapan bekerja ketika dihubungkan ke kalender terapis dan tabel CRM. Alih-alih membuat demo presentasi yang hanya menjawab satu kalimat rapi, kami ingin menguji skenario percakapan sehari-hari yang penuh singkatan, perubahan niat di tengah obrolan, serta batas tegas antara tugas yang boleh diselesaikan otomatis dan tugas yang wajib diserahkan ke admin manusia.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'TITIK MACET OPERASIONAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Klinik kecil menerima pesan WhatsApp sepanjang hari, termasuk malam, dan satu admin harus menjawab pertanyaan yang sama sambil mengurus jadwal. Pada jam operasional siang hari, admin yang sama biasanya juga melayani pasien yang datang langsung di meja depan, menyiapkan lembar registrasi, serta mengonfirmasi pembayaran. Akibatnya, pesan WhatsApp yang masuk sering tertumpuk selama tiga puluh hingga enam puluh menit sebelum sempat dibalas.',
              'Ketika pesan masuk di atas pukul delapan malam—justru saat banyak calon pasien selesai bekerja dan mulai mencari jadwal perawatan akhir pekan—pesan tersebut baru dibalas keesokan paginya. Saat admin membalas di pagi hari, sebagian calon pasien sudah memesan di tempat lain atau lupa melanjutkan percakapan. Di sisi lain, percobaan memakai balasan otomatis bawaan yang kaku sering membuat calon pasien kesal karena harus mengetik angka menu berulang kali tanpa mendapat kepastian apakah jam yang mereka inginkan benar-benar kosong.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Mengapa pendekatan umum sering mentok di operasional klinik',
            attempts: [
              {
                method: 'Balasan otomatis berbasis kata kunci atau tombol angka (1, 2, 3)',
                whyItFailed:
                  'Calon pasien jarang mengetik sesuai urutan tombol. Saat mereka bertanya dua hal sekaligus—misalnya harga perawatan dan ketersediaan hari Sabtu—sistem kata kunci langsung bingung atau mengulang pesan pembuka.',
              },
              {
                method: 'Formulir pemesanan terpisah di luar WhatsApp',
                whyItFailed:
                  'Mengirim tautan formulir panjang membuat sebagian calon pasien berhenti di tengah jalan karena mereka hanya ingin memastikan satu slot jam kosong terlebih dahulu.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'PRINSIP PERANCANGAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pendekatan kami berangkat dari satu aturan sederhana: model bahasa hanya bertugas memahami maksud pesan dan menyusun kalimat balasan yang sopan, sedangkan seluruh informasi harga, durasi perawatan, dan ketersediaan jadwal wajib diambil dari sumber data tertulis melalui pemanggilan fungsi (tool calling). Agen tidak pernah diizinkan menebak jam kosong atau mengarang daftar tindakan perawatan di luar tabel katalog yang sudah disetujui.',
              'Kami juga merancang mekanisme serah ke staf manusia (human handover) sejak hari pertama, bukan sebagai tambalan belakangan. Sebelum menulis prompt atau menyambungkan API kalender, kami membagi jenis pesan ke dalam dua kelompok tegas: pesan rutin yang boleh diselesaikan agen sampai tuntas, dan pesan sensitif yang harus langsung menghentikan respons otomatis lalu memberi tahu admin klinik.',
            ],
          },
          {
            type: 'callout',
            callout: {
              label: 'KEPUTUSAN KUNCI',
              title: 'Memisahkan pembacaan maksud dari eksekusi jadwal',
              body: 'Agen tidak pernah langsung menulis ke kalender hanya dari satu pesan ambigu. Ia wajib merangkum nama perawatan, hari, dan jam pilihan pasien, lalu meminta satu konfirmasi singkat sebelum mengunci slot di kalender terapis.',
            },
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'ARSITEKTUR & PERCABANGAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Setiap pesan WhatsApp yang masuk melewati enam langkah berurutan mulai dari pembacaan maksud hingga pencatatan ke CRM. Apabila pada tahap pemahaman maksud sistem mendeteksi pertanyaan medis, keluhan pasca-tindakan, atau permintaan khusus di luar daftar perawatan standar, alur langsung berbelok ke cabang Serah ke staf beserta ringkasan percakapan.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Ilustrasi: alur 6 langkah WA Concierge dari pesan WhatsApp hingga pencatatan CRM, dilengkapi cabang Serah ke staf untuk kasus di luar aturan.',
              nodes: [
                {
                  id: 'wa-step-1',
                  stepLabel: '01 · MASUK',
                  title: 'Pesan WhatsApp',
                  subtitle: 'Pasien mengirim pertanyaan atau permintaan jadwal di chat',
                },
                {
                  id: 'wa-step-2',
                  stepLabel: '02 · ANALISIS',
                  title: 'Pemahaman maksud',
                  subtitle: 'Memilah pertanyaan rutin vs kasus yang wajib diserahkan ke staf',
                },
                {
                  id: 'wa-step-3',
                  stepLabel: '03 · KALENDER',
                  title: 'Cek kalender',
                  subtitle: 'Memeriksa slot terapis dan durasi tindakan yang tersedia',
                },
                {
                  id: 'wa-step-4',
                  stepLabel: '04 · EKSEKUSI',
                  title: 'Buat booking',
                  subtitle: 'Mengunci slot jadwal setelah pasien mengonfirmasi jam pilihan',
                },
                {
                  id: 'wa-step-5',
                  stepLabel: '05 · BALASAN',
                  title: 'Konfirmasi',
                  subtitle: 'Mengirim detail jadwal dan menjadwalkan pengingat H-1 via WhatsApp',
                },
                {
                  id: 'wa-step-6',
                  stepLabel: '06 · DATA',
                  title: 'Catat CRM',
                  subtitle: 'Menyimpan data pasien, riwayat booking, dan log tindakan',
                },
              ],
              branch: {
                fromNodeIndex: 1,
                stepLabel: 'CABANG AMAN · HUMAN HANDOVER',
                title: 'Serah ke staf',
                subtitle:
                  'Jika pesan berisi keluhan klinis atau di luar aturan, agen menghentikan balasan otomatis dan mengirim ringkasan ke admin.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'KOMPONEN TEKNIS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pada lapisan integrasi pesan, WA Concierge menerima webhook dari WhatsApp Business Platform dan menyimpan status percakapan per nomor telepon dengan masa berlaku sesi yang terukur. Ketika seorang calon pasien mengirim tiga balon chat berturut-turut dalam waktu lima detik—kebiasaan yang sangat lazim di WhatsApp—lapisan penampung singkat (debounce buffer) menggabungkan ketiganya terlebih dahulu agar agen merespons konteks utuh, bukan membalas tiga kali secara terpisah.',
              'Untuk pengecekan jadwal, kami membangun tiga fungsi terstruktur: pembaca katalog perawatan (`get_treatment_catalog`), pemeriksa slot kosong (`check_available_slots`), dan pembuat reservasi (`create_booking_slot`). Setiap fungsi memvalidasi parameter dengan skema ketat sebelum menyentuh kalender. Misalnya, jika perawatan membutuhkan waktu 60 menit ditambah 15 menit jeda sterilisasi ruangan, fungsi pemeriksa slot otomatis menghitung total 75 menit sebelum menyatakan suatu jam masih tersedia.',
            ],
          },
          {
            type: 'list',
            title: 'Empat pengaman operasional yang dipasang di dalam alur',
            items: [
              {
                title: 'Penggabungan pesan beruntun (message buffering)',
                detail:
                  'Menunggu jeda singkat ketika pasien mengetik beberapa baris pesan pendek supaya agen membaca satu maksud yang utuh.',
              },
              {
                title: 'Kunci sementara (slot hold) saat menunggu konfirmasi',
                detail:
                  'Mencegah dua pasien di chat berbeda mengambil jam dan terapis yang sama persis pada menit yang bersamaan.',
              },
              {
                title: 'Ringkasan serah terima 3 poin untuk admin',
                detail:
                  'Saat menyerahkan percakapan ke staf manusia, sistem mengirim nama pasien, inti pertanyaan, dan alasan serah terima sehingga staf tidak perlu menggulir chat dari awal.',
              },
              {
                title: 'Penjadwal pengingat H-1 otomatis',
                detail:
                  'Setiap booking yang berstatus terkonfirmasi otomatis masuk ke antrean pesan pengingat 24 jam sebelum jadwal tindakan.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Target desain',
        eyebrow: 'TARGET DESAIN · BUKAN HASIL KLIEN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Karena WA Concierge adalah proyek internal yang kami bangun untuk menguji keandalan alur sebelum diterapkan pada klien, seluruh indikator di bawah ini merupakan target desain rekayasa sistem kami, bukan klaim hasil pengukuran dari klinik klien.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Target desain, bukan hasil klien',
            targets: [
              {
                label: 'Waktu respons awal',
                value: '< 10 detik',
                note: 'Target untuk pesan di jam sibuk dan malam',
              },
              {
                label: 'Serah ke manusia',
                value: 'Otomatis dengan ringkasan',
                note: 'Saat pertanyaan di luar aturan',
              },
              {
                label: 'Pengingat jadwal',
                value: 'H-1 via WhatsApp',
                note: 'Mengurangi jadwal terlewat',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Balasan untuk pesan di malam hari dan akhir pekan',
                before:
                  'Pesan calon pasien menunggu hingga admin membuka WhatsApp keesokan paginya.',
                after:
                  'Target desain: agen menjawab informasi perawatan dan memeriksa jam kosong dalam hitungan detik sesuai aturan.',
              },
              {
                aspect: 'Penanganan pertanyaan sensitif atau di luar daftar perawatan',
                before:
                  'Bot kata kunci memberikan jawaban melantur atau memaksa pengguna memilih menu berulang.',
                after:
                  'Target desain: agen langsung menyerahkan percakapan ke staf klinik disertai ringkasan konteks.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Catatan perancangan',
        eyebrow: 'KOMPROMI TEKNIS & BATASAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Bagian paling penting dari merancang agen untuk klinik bukanlah membuat agen terdengar pintar, melainkan menentukan secara tegas apa yang tidak boleh dilakukan oleh agen tersebut. Dalam rancangan WA Concierge, kami menetapkan tiga batasan keras: agen dilarang memberikan saran medis atau diagnosis kondisi kulit/kesehatan, agen dilarang menjanjikan diskon atau mengubah harga di luar tabel resmi, dan agen dilarang membatalkan jadwal sepihak kurang dari 12 jam sebelum tindakan tanpa persetujuan admin.',
              'Keputusan membatasi ruang gerak agen ini tentu membawa kompromi teknis. Sekitar dua puluh hingga tiga puluh persen percakapan yang mengandung konsultasi keluhan spesifik tetap harus diselesaikan oleh manusia. Namun, justru kompromi itulah yang menjaga keamanan operasional klinik: admin manusia bisa mencurahkan perhatian penuh pada pasien yang memang membutuhkan diskusi khusus, sementara pertanyaan berulang tentang jam kosong dan pencatatan jadwal rutin sudah dibereskan dengan rapi.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Menolak menjawab pertanyaan medis atau rekomendasi tindakan klinis',
                whyChosen:
                  'Rekomendasi perawatan yang berkaitan dengan kondisi kulit, alergi, atau keluhan medis membutuhkan penilaian tenaga kesehatan manusia.',
                tradeOff:
                  'Pasien yang bertanya soal keluhan medis tidak bisa langsung selesai booking otomatis dan harus menunggu balasan staf pada jam kerja.',
              },
              {
                decision: 'Mewajibkan satu langkah konfirmasi eksplisit sebelum menulis ke kalender',
                whyChosen:
                  'Menghindari salah catat hari atau jam akibat pesan chat pasien yang singkat atau berganti pikiran.',
                tradeOff:
                  'Percakapan bertambah satu giliran pesan dibandingkan langsung memesan otomatis, tetapi jadwal kalender jauh lebih bersih dari pembatalan salah input.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Tugas agen bukan menggantikan penilaian staf klinik, melainkan membereskan tanya-jawab jadwal yang berulang supaya staf manusia bisa fokus melayani pasien yang butuh perhatian khusus.',
      attribution: 'Chesta Azka — Catatan Proyek Internal CHESTAADOTCOM',
    },
    projectSlug: 'wa-concierge-klinik',
    relatedServiceSlugs: ['ai-agent'],
    relatedPostSlugs: ['otomasi-whatsapp-ai-klinik-fnb-alur-kerja'],
    draft: false,
    seo: {
      title: 'Studi Kasus WA Concierge Agen Klinik | CHESTAADOTCOM',
      description:
        'Studi kasus proyek internal WA Concierge: merancang agen booking WhatsApp untuk klinik dengan cek kalender terapis, pengingat H-1, dan serah ke staf.',
    },
  },

  // ===========================================================================
  // CASE STUDY 2: chestaa-v2
  // ===========================================================================
  {
    slug: 'chestaa-v2',
    legacySlugs: ['membangun-ulang-chestaa-com'],
    title: 'Membangun ulang chestaa.com sebagai situs statis dua bahasa',
    oneSentenceSummary:
      'Proyek internal merombak situs kami sendiri menjadi arsitektur dua bahasa (/id dan /en) yang ringan, jujur soal posisi layanan, dan cepat dibuka di layar HP.',
    client: 'Proyek internal CHESTAADOTCOM',
    industry: 'Agensi (situs sendiri)',
    services: ['Web & Landing Page'],
    serviceSlugs: ['pembuatan-website'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    targetsBadgeLabel: 'Target desain, bukan hasil klien',
    duration: 'Proyek internal',
    readingTime: '6 menit baca',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (arsitektur, produk, teknologi)',
    publishedAt: '2026-03-14',
    updatedAt: '2026-03-20',
    cover: 'projectChestaaV2',
    coverCaption:
      'Ilustrasi: struktur halaman layanan dan area lokal dua bahasa (/id dan /en) dengan desain putih-ungu yang tenang dan ringkasan langsung di bagian atas.',
    summary: {
      problem:
        'Versi awal situs terlalu berat di animasi dan kurang jelas menjelaskan layanan baru kami di AI agent dan software custom.',
      built:
        'Situs statis dua bahasa (/id dan /en) dengan desain putih-ungu yang tenang, halaman layanan dan area lokal yang terstruktur, serta waktu muat cepat di HP.',
      solution:
        'Situs statis dua bahasa (/id dan /en) dengan desain putih-ungu yang tenang, halaman layanan dan area lokal yang terstruktur, serta waktu muat cepat di HP.',
      result:
        'Target desain: LCP di HP < 1,8 detik pada koneksi 4G, CLS < 0,02 tanpa pergeseran layout, dan 2 bahasa (/id dan /en) dengan hreflang timbal balik.',
    },
    targets: [
      {
        label: 'LCP di HP',
        value: '< 1,8 detik',
        note: 'Target pada koneksi 4G',
      },
      {
        label: 'CLS',
        value: '< 0,02',
        note: 'Tanpa pergeseran layout',
      },
      {
        label: 'Bahasa',
        value: '2 (/id dan /en)',
        note: 'Hreflang timbal balik',
      },
    ],
    sections: [
      {
        id: 'konteks',
        number: '01',
        title: 'Konteks',
        eyebrow: 'PROYEK INTERNAL · SITUS SENDIRI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Ketika CHESTAADOTCOM berkembang dari mengerjakan halaman web sederhana menjadi partner teknis untuk pembuatan website, AI agent bisnis, pengembangan software custom, dan otomasi workflow di BSD, Tangerang Selatan, situs lama kami tidak lagi mencerminkan cara kami bekerja. Situs adalah benda pertama yang diuji oleh calon klien ketika kami berbicara soal kecepatan muat halaman, kerapian struktur informasi, dan kejelasan penjelasan teknis.',
              'Kami memutuskan membangun ulang chestaa.com dari nol sebagai proyek rekayasa internal yang menerapkan seluruh standar yang kami tawarkan ke klien: halaman harus bisa dibaca tuntas tanpa menunggu bundel JavaScript berat, tersedia secara utuh dalam bahasa Indonesia (`/id`) dan bahasa Inggris (`/en`), serta transparan membedakan mana proyek internal dan mana target desain.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'EVALUASI VERSI AWAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Versi awal situs terlalu berat di animasi dan kurang jelas menjelaskan layanan baru kami di AI agent dan software custom. Terlalu banyak efek visual bergerak secara bersamaan di latar belakang, sehingga pada ponsel kelas menengah dengan jaringan seluler 4G, pembaca harus menunggu sebelum teks utama terasa nyaman digulir. Padahal mayoritas pemilik bisnis yang mengeklik tautan dari WhatsApp atau pencarian lokal membuka situs kami lewat HP di sela kesibukan mereka.',
              'Selain beban visual, arsitektur informasi di versi lama mencampur semua layanan di satu halaman panjang tanpa pemisahan URL yang jelas. Calon klien yang hanya mencari landing page mulai Rp1.200.000 harus membaca istilah teknis yang sama dengan calon klien yang sedang mencari integrasi AI agent WhatsApp atau dashboard operasional custom. Demikian pula untuk pencari berbahasa Inggris, belum ada pemetaan rute 1:1 yang konsisten antara halaman bahasa Indonesia dan bahasa Inggris.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Dua hal di versi awal yang sengaja kami tinggalkan',
            attempts: [
              {
                method: 'Animasi dekoratif berlapis yang berjalan terus-menerus di latar halaman',
                whyItFailed:
                  'Menguras baterai perangkat mobile, memperberat waktu render awal, dan mengalihkan fokus mata dari isi penawaran serta rincian layanan.',
              },
              {
                method: 'Menyembunyikan teks utama hingga skrip animasi selesai dimuat',
                whyItFailed:
                  'Jika koneksi seluler melambat atau skrip tertahan, pengunjung melihat ruang kosong lebih lama dan mesin pencari kesulitan membaca hierarki konten.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'ARSITEKTUR KONTEN & DESAIN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Kami menetapkan tiga keputusan arsitektur sebelum menyentuh kode tampilan. Pertama, sistem desain dikunci pada kanvas putih bersih (`#FFFFFF`) dan ungu lembut (`#F8F6FE`, `#EFEAFB`, `#6A3FD0`) dengan skala tipografi yang tenang, membatasi lapisan efek kaca (glass) maksimal tiga lapis, dan menghapus semua pernak-pernik visual yang tidak membantu pembaca memahami isi halaman.',
              'Kedua, setiap halaman layanan dan halaman area lokal wajib dibuka dengan blok ringkasan singkat 40 hingga 60 kata tepat di bawah judul utama. Pola ini memastikan baik pembaca manusia yang memindai cepat maupun mesin pencari langsung mendapatkan jawaban lugas: apa yang dibangun, untuk siapa layanan itu cocok, dan bagaimana cara memulainya.',
            ],
          },
          {
            type: 'callout',
            callout: {
              label: 'PRINSIP GERAK & KETERBACAAN',
              title: 'Konten terbaca tanpa bergantung pada JavaScript',
              body: 'Seluruh teks halaman dirender langsung di HTML. Kelas animasi awal hanya diaktifkan bila JavaScript siap, dilengkapi pengaman waktu 1,5 detik yang otomatis membuka seluruh elemen bila skrip tertunda.',
            },
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'ALUR PEMBANGKITAN HALAMAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Untuk menjaga konsistensi antara versi bahasa Indonesia dan bahasa Inggris sekaligus mempertahankan kecepatan halaman statis, seluruh konten layanan, area lokal, proyek internal, dan studi kasus disimpan dalam sumber data bertipe ketat (typed dataset) yang kemudian dipetakan ke rute `/id` dan `/en`, divalidasi panjang metatag-nya, serta dilengkapi grafik JSON-LD dan berkas indeks.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Ilustrasi: alur pembangkitan halaman dua bahasa chestaa.com dari sumber data terstruktur hingga prarender HTML dan pulau interaktif ringan.',
              nodes: [
                {
                  id: 'v2-step-1',
                  stepLabel: '01 · SUMBER DATA',
                  title: 'Dataset Terstruktur',
                  subtitle: 'Data layanan, area lokal, proyek, dan studi kasus bertipe ketat',
                },
                {
                  id: 'v2-step-2',
                  stepLabel: '02 · RUTE 1:1',
                  title: 'Pemetaan /id & /en',
                  subtitle: 'Menautkan pasangan URL dua bahasa dan atribut hreflang timbal balik',
                },
                {
                  id: 'v2-step-3',
                  stepLabel: '03 · PRARENDER',
                  title: 'HTML Statis & Ringkasan',
                  subtitle: 'Menyusun konten utama agar langsung terbaca tanpa menunggu skrip',
                },
                {
                  id: 'v2-step-4',
                  stepLabel: '04 · SKEMA',
                  title: 'JSON-LD @graph',
                  subtitle: 'Merakit skema Organization, Service, Article, FAQPage, dan BreadcrumbList',
                },
                {
                  id: 'v2-step-5',
                  stepLabel: '05 · INDEKS',
                  title: 'Sitemap & llms.txt',
                  subtitle: 'Membangkitkan sitemap.xml, rss.xml, llms.txt, dan llms-full.txt',
                },
                {
                  id: 'v2-step-6',
                  stepLabel: '06 · PENGIRIMAN',
                  title: 'Siap di Layar HP',
                  subtitle: 'Gambar berdimensi tetap tanpa pergeseran layout (CLS < 0,02)',
                },
              ],
              branch: {
                fromNodeIndex: 2,
                stepLabel: 'CABANG INTERAKTIF · HEMAT SKRIP',
                title: 'Pulau interaktif ringan',
                subtitle:
                  'Tab contoh industri, akordeon FAQ, dan navigasi tetap bisa diakses keyboard serta menghormati prefers-reduced-motion.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'REKAYASA FRONTEND & SEO LOKAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Dalam implementasinya, kami memisahkan empat halaman layanan utama (`/id/jasa/pembuatan-website`, `/id/jasa/ai-agent`, `/id/jasa/software-custom`, `/id/jasa/otomasi-workflow`) beserta pasangan bahasa Inggrisnya (`/en/services/...`). Untuk pencarian lokal di sekitar basis kami, kami menyusun 10 halaman area layanan yang dapat diindeks—yakni kombinasi layanan Pembuatan Website dan AI Agent untuk lima wilayah fokus: Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, dan Lebak Bulus—sementara kombinasi area lainnya disiapkan dengan status `noindex,follow` sampai memiliki konten unik yang cukup.',
              'Dari sisi performa dan gerak, kami mengaudit ulang seluruh komponen animasi. Kami hanya mengizinkan animasi pada properti yang tidak memicu hitung ulang tata letak (`transform`, `opacity`, `clip-path`, dan `stroke-dashoffset`), membatasi durasi transisi mikro di kisaran 120–180 milidetik, serta menambahkan pendeteksi kemampuan perangkat otomatis yang mematikan efek gulir berat pada perangkat berspesifikasi rendah atau saat pengguna mengaktifkan pengurangan gerak (`prefers-reduced-motion`).',
            ],
          },
          {
            type: 'list',
            title: 'Empat detail teknis yang kami terapkan di chestaa.com',
            items: [
              {
                title: 'Validasi otomatis panjang judul dan deskripsi halaman',
                detail:
                  'Setiap halaman layanan dan area lokal diperiksa agar judul berada di rentang 50–62 karakter dan deskripsi meta di rentang 140–160 karakter tanpa duplikasi.',
              },
              {
                title: 'Satu grafik JSON-LD (@graph) utuh per halaman',
                detail:
                  'Menghubungkan node Organization, WebSite, WebPage, BreadcrumbList, serta node spesifik halaman (Service, FAQPage, atau Article) tanpa skema rating palsu.',
              },
              {
                title: 'Tab dan akordeon FAQ yang tetap utuh di DOM',
                detail:
                  'Panel tab industri dan jawaban FAQ tidak dihapus dari DOM saat tertutup, sehingga tetap terbaca apabila JavaScript dimatikan.',
              },
              {
                title: 'Dimensi eksplisit pada seluruh aset ilustrasi SVG/WebP',
                detail:
                  'Setiap gambar dan ilustrasi memiliki atribut lebar, tinggi, dan rasio aspek tetap agar halaman tidak melompat saat dimuat di layar HP.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Target desain',
        eyebrow: 'TARGET DESAIN · BUKAN HASIL KLIEN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Sebagai proyek internal untuk situs kami sendiri, angka di bawah ini adalah anggaran performa dan target desain arsitektur yang menjadi standar pengujian halaman di chestaa.com.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Target desain, bukan hasil klien',
            targets: [
              {
                label: 'LCP di HP',
                value: '< 1,8 detik',
                note: 'Target pada koneksi 4G',
              },
              {
                label: 'CLS',
                value: '< 0,02',
                note: 'Tanpa pergeseran layout',
              },
              {
                label: 'Bahasa',
                value: '2 (/id dan /en)',
                note: 'Hreflang timbal balik',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Kecepatan baca dan kejelasan layanan di layar HP',
                before:
                  'Animasi latar yang berat dan penjelasan layanan yang tercampur di satu halaman.',
                after:
                  'Target desain: halaman statis ringan dengan ringkasan 40–60 kata di bagian atas tiap layanan.',
              },
              {
                aspect: 'Dukungan dua bahasa dan indeks mesin pencari',
                before:
                  'Rute bahasa belum seragam dan belum memiliki berkas ringkasan terstruktur untuk mesin penjawab.',
                after:
                  'Target desain: pasangan rute 1:1 (/id dan /en) dengan hreflang timbal balik, sitemap.xml, dan llms.txt.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Catatan perancangan',
        eyebrow: 'KOMPROMI & KEJUJURAN KONTEN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Keputusan terbesar saat membangun ulang chestaa.com bukan soal memilih pustaka kode, melainkan menjaga disiplin kejujuran konten. Sebagai agensi yang baru merilis pembaruan identitas dan katalog layanan ini, kami memilih untuk memberi label "Proyek internal" secara terbuka pada seluruh enam proyek demo dan tiga studi kasus kami, serta menuliskan semua angka sasaran sebagai "Target desain, bukan hasil klien".',
              'Kami juga sengaja menahan diri untuk tidak membuka puluhan halaman area lokal sekaligus. Dari total lima belas kombinasi area dan layanan yang datanya sudah kami siapkan, hanya sepuluh halaman dengan konteks bisnis lokal yang benar-benar spesifik yang kami buka untuk diindeks (`index,follow`), sedangkan lima sisanya kami tahan sebagai `noindex,follow`. Kompromi ini membuat jumlah halaman yang terindeks lebih ramping di awal, namun menjamin setiap halaman yang tampil di mesin pencari memiliki isi yang jujur, relevan, dan tidak terasa seperti salinan tempel.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Memangkas efek animasi dekoratif demi LCP < 1,8 detik di HP',
                whyChosen:
                  'Calon klien yang membuka situs dari WhatsApp di ponsel membutuhkan kejelasan informasi dan tombol diskusi yang langsung responsif.',
                tradeOff:
                  'Tampilan terasa lebih tenang dan editorial dibandingkan situs showcase yang penuh efek 3D berat, namun waktu muat dan keterbacaan jauh lebih terjaga.',
              },
              {
                decision: 'Memelihara kesetaraan konten 1:1 antara /id dan /en',
                whyChosen:
                  'Memastikan tim lokal berbahasa Indonesia maupun mitra berbahasa Inggris membaca fakta, struktur, dan cakupan layanan yang sama persis.',
                tradeOff:
                  'Setiap perubahan salinan atau penambahan studi kasus harus ditulis dan diperiksa dalam dua bahasa sekaligus sebelum dirilis.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Situs agensi teknologi seharusnya menjadi contoh langsung dari kerapian arsitektur, kecepatan muat di HP, dan kejujuran informasi yang dijanjikan kepada klien.',
      attribution: 'Chesta Azka — Catatan Proyek Internal CHESTAADOTCOM',
    },
    projectSlug: 'chestaa-v2',
    relatedServiceSlugs: ['pembuatan-website'],
    relatedPostSlugs: ['berapa-biaya-bikin-website-bisnis-panduan-harga'],
    draft: false,
    seo: {
      title: 'Studi Kasus Membangun Ulang chestaa.com | CHESTAADOTCOM',
      description:
        'Studi kasus proyek internal membangun ulang chestaa.com sebagai situs statis dua bahasa (/id dan /en) dengan target LCP < 1,8 detik dan CLS < 0,02.',
    },
  },

  // ===========================================================================
  // CASE STUDY 3: lead-properti
  // ===========================================================================
  {
    slug: 'lead-properti',
    legacySlugs: ['otomasi-rekap-pos-fnb-serpong'],
    title: 'Alur lead properti: dari formulir iklan ke follow-up agen',
    oneSentenceSummary:
      'Proyek internal merancang otomasi penyaluran lead properti dari formulir iklan langsung ke CRM, pembagian giliran agen, notifikasi WhatsApp, hingga jadwal pengingat follow-up.',
    client: 'Proyek internal CHESTAADOTCOM',
    industry: 'Properti',
    services: ['Otomasi Workflow'],
    serviceSlugs: ['otomasi-workflow'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    targetsBadgeLabel: 'Target desain, bukan hasil klien',
    duration: 'Proyek internal',
    readingTime: '6 menit baca',
    author: 'Zeeshan',
    authorRole: 'Co-founder (operasional dan client success)',
    publishedAt: '2026-03-16',
    updatedAt: '2026-03-20',
    cover: 'projectLeadProperti',
    coverCaption:
      'Ilustrasi: alur otomatis dari formulir iklan properti ke pencatatan CRM, pembagian agen, notifikasi WhatsApp, dan pengingat follow-up H+1 serta H+3.',
    summary: {
      problem:
        'Lead dari iklan masuk ke spreadsheet lalu disalin manual ke WhatsApp agen; banyak yang terlambat dihubungi.',
      built:
        'Alur otomatis yang mencatat lead ke CRM, membagi ke agen yang bertugas, mengirim notifikasi WhatsApp, dan menjadwalkan pengingat follow-up.',
      solution:
        'Alur otomatis yang mencatat lead ke CRM, membagi ke agen yang bertugas, mengirim notifikasi WhatsApp, dan menjadwalkan pengingat follow-up.',
      result:
        'Target desain: notifikasi ke agen < 1 menit sejak formulir dikirim, jadwal follow-up H+1 dan H+3, serta 0 langkah pencatatan manual.',
    },
    targets: [
      {
        label: 'Notifikasi ke agen',
        value: '< 1 menit',
        note: 'Target sejak formulir dikirim',
      },
      {
        label: 'Jadwal follow-up',
        value: 'H+1 dan H+3',
        note: 'Pengingat otomatis jika belum direspons',
      },
      {
        label: 'Pencatatan manual',
        value: '0 langkah',
        note: 'Langsung dari formulir ke CRM',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'PROYEK INTERNAL · PROPERTI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Tim pemasaran properti dan kantor agen pemasaran di koridor pengembangan seperti BSD City, Serpong, dan sekitarnya sangat bergantung pada kampanye iklan digital serta halaman landing proyek untuk menjaring minat calon pembeli. Ketika seseorang mengisi formulir untuk meminta brosur harga atau jadwal kunjungan rumah contoh (show unit), minat mereka sedang berada di titik paling tinggi pada lima hingga lima belas menit pertama setelah menekan tombol kirim.',
              'Kami merancang proyek internal Alur Lead Properti di CHESTAADOTCOM untuk memodelkan bagaimana sebuah tim pemasaran properti dapat menghapus jeda waktu antara masuknya formulir iklan dan sapaan pertama dari agen penjualan di lapangan—tanpa mengharuskan admin pemasaran menyalin baris data satu per satu dari berkas spreadsheet ke ruang obrolan grup WhatsApp.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'KEBOCORAN LEAD DI LAPANGAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Lead dari iklan masuk ke spreadsheet lalu disalin manual ke WhatsApp agen; banyak yang terlambat dihubungi. Dalam alur kerja manual yang sering kami temui, data dari formulir iklan atau landing page dikumpulkan dulu di satu tabel spreadsheet. Admin kemudian memeriksa tabel tersebut beberapa kali sehari, melihat giliran agen mana yang sedang bertugas, lalu menyalin nama, nomor telepon, dan tipe unit yang diminati ke WhatsApp agen satu per satu.',
              'Masalahnya muncul ketika formulir dikirim di luar jam kerja kantor, saat akhir pekan ketika pameran properti sedang ramai, atau ketika admin sedang mengerjakan laporan lain. Lead yang masuk pukul sembilan malam baru diteruskan ke agen esok siang. Lebih jauh lagi, setelah nama calon pembeli dikirim ke chat agen, koordinator penjualan sering kesulitan memantau apakah calon pembeli tersebut sudah benar-benar dihubungi atau tertimbun oleh percakapan lain di ponsel agen.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Mengapa cara manual di grup chat dan spreadsheet sering bocor',
            attempts: [
              {
                method: 'Melempar data mentah ke grup WhatsApp bersama untuk direbut agen',
                whyItFailed:
                  'Tidak ada kepastian siapa yang bertanggung jawab penuh; kadang dua agen menghubungi nomor yang sama, atau sebaliknya tidak ada yang menghubungi karena mengira rekan lain sudah mengambilnya.',
              },
              {
                method: 'Mengandalkan admin memeriksa spreadsheet setiap beberapa jam',
                whyItFailed:
                  'Menciptakan jeda waktu berjam-jam pada malam hari dan akhir pekan, serta rawan salah salin digit nomor telepon.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'RANCANGAN ALUR KERJA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Kami mendekati persoalan ini bukan dengan membangun aplikasi baru yang rumit dan memaksa agen belajar banyak menu, melainkan dengan menyambungkan alat yang sudah dipakai sehari-hari melalui otomasi workflow yang tertib. Prinsip utamanya ada tiga: setiap data yang masuk harus divalidasi dan dicek duplikasinya terlebih dahulu, setiap lead harus memiliki satu penanggung jawab (PIC) yang jelas di CRM, dan setiap agen menerima pesan notifikasi WhatsApp yang sudah dilengkapi tautan klik-langsung untuk menyapa calon pembeli.',
              'Selain penyaluran awal, kami merancang pengingat tindak lanjut berjenjang pada H+1 dan H+3. Dengan cara ini, sistem tidak berhenti setelah melempar notifikasi pertama, melainkan ikut membantu koordinator memastikan setiap lead benar-benar disapa dan diperbarui statusnya.',
            ],
          },
          {
            type: 'callout',
            callout: {
              label: 'KEPUTUSAN KUNCI',
              title: 'Deduplikasi nomor telepon sebelum membagi giliran agen',
              body: 'Calon pembeli properti sering mengisi formulir dua kali di iklan yang berbeda dalam minggu yang sama. Sistem mengecek nomor telepon yang sudah dinormalisasi (+62) agar calon pembeli yang sama tetap diarahkan ke agen yang pertama kali menanganinya, bukan diberikan ke agen kedua.',
            },
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'DIAGRAM PENYALURAN & FOLLOW-UP',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Begitu calon pembeli mengirim formulir, webhook memicu enam tahap otomatis mulai dari normalisasi nomor kontak hingga penjadwalan pengingat H+1 dan H+3. Apabila salah satu koneksi API—misalnya pengiriman notifikasi atau penulisan ke tabel CRM—mengalami gangguan jaringan, alur langsung menjalankan cabang pengaman yang menyimpan data ke antrean cadangan dan mengirim peringatan error ke admin.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Ilustrasi: alur 6 langkah penyaluran lead properti dari formulir iklan ke follow-up agen, dilengkapi cabang penanganan error & antrean ulang.',
              nodes: [
                {
                  id: 'prop-step-1',
                  stepLabel: '01 · INPUT',
                  title: 'Formulir iklan',
                  subtitle: 'Calon pembeli mengirim nama, nomor WA, dan minat tipe unit',
                },
                {
                  id: 'prop-step-2',
                  stepLabel: '02 · FILTER',
                  title: 'Validasi & cek duplikat',
                  subtitle: 'Merapikan format +62 dan mengecek apakah nomor sudah terdaftar',
                },
                {
                  id: 'prop-step-3',
                  stepLabel: '03 · SIMPAN',
                  title: 'Catat ke CRM',
                  subtitle: 'Membuat baris lead baru dengan status awal "Baru Masuk"',
                },
                {
                  id: 'prop-step-4',
                  stepLabel: '04 · DISTRIBUSI',
                  title: 'Bagi ke agen',
                  subtitle: 'Menentukan agen bertugas sesuai giliran (round-robin) proyek',
                },
                {
                  id: 'prop-step-5',
                  stepLabel: '05 · INSTAN',
                  title: 'Notifikasi WhatsApp',
                  subtitle: 'Mengirim detail lead & tombol sapaan cepat ke WA agen',
                },
                {
                  id: 'prop-step-6',
                  stepLabel: '06 · JADWAL',
                  title: 'Pengingat H+1 & H+3',
                  subtitle: 'Mengingatkan agen otomatis jika status lead belum diperbarui',
                },
              ],
              branch: {
                fromNodeIndex: 2,
                stepLabel: 'CABANG AMAN · ERROR HANDLER',
                title: 'Log error & antrean ulang',
                subtitle:
                  'Jika API tujuan sedang gangguan, payload disimpan di antrean cadangan dan admin menerima notifikasi kegagalan.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'DETAIL EKSEKUSI WORKFLOW',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pada tahap pertama, data yang dikirim dari formulir landing page atau webhook iklan ditangkap oleh endpoint penerima yang langsung membersihkan format nomor telepon (mengubah awalan `08` atau tanda strip menjadi format standar `+628...`) dan memberi penanda unik (idempotency key) berdasarkan kombinasi nomor telepon dan tanggal. Penanda ini mencegah terciptanya dua baris kembar apabila pengguna tidak sengaja menekan tombol kirim dua kali karena sinyal seluler yang lambat.',
              'Setelah data bersih tercatat di CRM dan cadangan Google Sheets, modul pembagi giliran memeriksa daftar agen aktif pada klaster atau proyek properti terkait, menetapkan satu nama agen sebagai penanggung jawab, lalu mengirim pesan WhatsApp ke agen tersebut. Di dalam pesan notifikasi agen, kami menyertakan informasi ringkas (nama calon pembeli, tipe unit, waktu masuk) serta satu tautan pembaruan status cepat supaya agen dapat menandai "Sudah Dihubungi" dari layar ponselnya dalam satu ketukan.',
            ],
          },
          {
            type: 'list',
            title: 'Empat komponen yang menjaga alur tetap tertib di lapangan',
            items: [
              {
                title: 'Normalisasi kontak & pencegahan duplikasi',
                detail:
                  'Memastikan nomor telepon seragam dan mendeteksi calon pembeli lama agar riwayat komunikasinya tidak terpecah di dua agen berbeda.',
              },
              {
                title: 'Pembagian giliran (round-robin) yang bisa diatur aktif/libur',
                detail:
                  'Koordinator dapat menandai agen yang sedang cuti atau lepas piket di tabel konfigurasi sehingga lead hanya dibagikan ke agen yang siap merespons.',
              },
              {
                title: 'Pengecekan berjadwal pada H+1 dan H+3',
                detail:
                  'Menjalankan pemeriksaan otomatis terhadap status baris di CRM; jika status masih "Baru Masuk", sistem mengirim pengingat ke agen dan koordinator.',
              },
              {
                title: 'Log eksekusi dan notifikasi kegagalan langkah',
                detail:
                  'Setiap eksekusi dari formulir masuk hingga pengiriman pesan tercatat beserta cap waktunya, lengkap dengan peringatan instan jika ada langkah yang gagal.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Target desain',
        eyebrow: 'TARGET DESAIN · BUKAN HASIL KLIEN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Seluruh angka di bawah ini merupakan target desain dari proyek internal Alur Lead Properti di CHESTAADOTCOM, dirancang sebagai tolok ukur kecepatan penyaluran data dan ketertiban tindak lanjut, bukan klaim hasil kampanye klien.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Target desain, bukan hasil klien',
            targets: [
              {
                label: 'Notifikasi ke agen',
                value: '< 1 menit',
                note: 'Target sejak formulir dikirim',
              },
              {
                label: 'Jadwal follow-up',
                value: 'H+1 dan H+3',
                note: 'Pengingat otomatis jika belum direspons',
              },
              {
                label: 'Pencatatan manual',
                value: '0 langkah',
                note: 'Langsung dari formulir ke CRM',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Jeda waktu dari formulir dikirim hingga agen menerima info',
                before:
                  'Data menumpuk di spreadsheet dan menunggu disalin manual oleh admin ke WhatsApp agen.',
                after:
                  'Target desain: tercatat di CRM dan mengirim notifikasi ke WhatsApp agen dalam waktu kurang dari 1 menit.',
              },
              {
                aspect: 'Kepastian tindak lanjut setelah lead dibagikan',
                before:
                  'Sulit memantau mana calon pembeli yang belum disapa setelah dibagikan di grup chat.',
                after:
                  'Target desain: pengingat otomatis pada H+1 dan H+3 jika status di CRM belum diperbarui.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Catatan perancangan',
        eyebrow: 'KOMPROMI & DISIPLIN TIM',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Dalam merancang otomasi workflow penjualan, godaan terbesar adalah membuat aturan cabang yang terlalu rumit sejak hari pertama—misalnya mencoba menilai skor daya beli secara otomatis dengan lusinan pertanyaan formulir. Dalam proyek internal ini, kami memilih kompromi sebaliknya: formulir di sisi calon pembeli dibuat sesingkat mungkin (cukup nama, nomor WhatsApp aktif, dan pilihan tipe unit/jadwal kunjungan), sementara kualifikasi mendalam tetap dilakukan oleh agen manusia melalui percakapan.',
              'Kompromi kedua berkaitan dengan pembaruan status. Pengingat otomatis H+1 dan H+3 hanya akan akurat apabila agen disiplin memperbarui status lead setelah menghubungi calon pembeli. Karena itu, alih-alih mengharuskan agen membuka dashboard desktop yang berat, kami menyederhanakan aksi pembaruan status menjadi satu tautan cepat dari pesan notifikasi WhatsApp mereka. Otomasi yang baik tidak menggantikan keramahan agen properti saat bernegosiasi, tetapi memastikan tidak ada calon pembeli yang terlewat hanya karena keterlambatan salin data.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Membatasi kolom formulir awal hanya pada 3–4 isian inti',
                whyChosen:
                  'Mengurangi gesekan saat calon pembeli mengisi formulir dari iklan di layar ponsel.',
                tradeOff:
                  'Agen perlu menggali detail tambahan (seperti rencana skema pembayaran KPR atau tunai) saat melakukan sapaan pertama di WhatsApp.',
              },
              {
                decision: 'Menyimpan salinan paralel di CRM sekaligus lembar log eksekusi',
                whyChosen:
                  'Memudahkan koordinator memeriksa riwayat data masuk dan memastikan tidak ada satu pun kiriman formulir yang hilang bila salah satu layanan pihak ketiga melambat.',
                tradeOff:
                  'Membutuhkan sedikit konfigurasi tambahan di awal untuk menjaga sinkronisasi skema kolom antara formulir, CRM, dan tabel log.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Otomasi lead yang berguna tidak memaksa agen belajar aplikasi rumit; tugasnya memastikan begitu calon pembeli mengirim formulir, agen yang tepat langsung tahu dan diingatkan sampai tuntas.',
      attribution: 'Zeeshan — Catatan Proyek Internal CHESTAADOTCOM',
    },
    projectSlug: 'lead-properti',
    relatedServiceSlugs: ['otomasi-workflow'],
    relatedPostSlugs: ['otomasi-whatsapp-ai-klinik-fnb-alur-kerja'],
    draft: false,
    seo: {
      title: 'Studi Kasus Alur Lead Properti Otomatis | CHESTAADOTCOM',
      description:
        'Studi kasus proyek internal alur lead properti: otomasi dari formulir iklan ke CRM, pembagian agen < 1 menit, dan pengingat follow-up H+1 serta H+3.',
    },
  },

  // ===========================================================================
  // CASE STUDY 4: dashboard-kafe
  // ===========================================================================
  {
    slug: 'dashboard-kafe',
    legacySlugs: ['rekap-operasional-kafe', 'pos-kafe-multicabang'],
    title: 'Dashboard operasional kafe: dari spreadsheet harian ke satu tampilan',
    oneSentenceSummary:
      'Proyek internal merancang dashboard web yang menyatukan penjualan harian, stok bahan, dan laporan cabang kafe tanpa mengganti mesin kasir yang sudah ada.',
    client: 'Proyek internal CHESTAADOTCOM',
    industry: 'F&B',
    services: ['Software Custom'],
    serviceSlugs: ['software-custom'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    targetsBadgeLabel: 'Target desain, bukan hasil klien',
    duration: 'Proyek internal',
    readingTime: '7 menit baca',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (arsitektur, produk, teknologi)',
    publishedAt: '2026-03-22',
    updatedAt: '2026-03-24',
    cover: 'projectDashboardKafe',
    coverCaption:
      'Ilustrasi: antarmuka dashboard operasional kafe yang menyatukan penjualan harian, sisa stok bahan kritis, dan selisih kas per cabang.',
    summary: {
      problem:
        'Pemilik kafe dengan beberapa cabang merekap penjualan dan stok dari beberapa spreadsheet, sehingga laporan terlambat dan angkanya sering tidak cocok.',
      built:
        'Dashboard web yang menyatukan penjualan harian, stok bahan, dan laporan per cabang, dengan hak akses untuk pemilik, manajer, dan staf.',
      solution:
        'Dashboard web yang menyatukan penjualan harian, stok bahan, dan laporan per cabang, dengan hak akses untuk pemilik, manajer, dan staf.',
      result:
        'Target desain: laporan harian tersedia tanpa rekap manual, stok menipis memicu peringatan sebelum habis, dan satu sumber data untuk semua cabang.',
    },
    targets: [
      {
        label: 'Ketersediaan laporan harian',
        value: 'Tanpa rekap manual',
        note: 'Terkompilasi otomatis setelah tutup shift kasir',
      },
      {
        label: 'Peringatan stok menipis',
        value: 'Sebelum bahan habis',
        note: 'Memicu peringatan saat stok di bawah batas aman',
      },
      {
        label: 'Konsolidasi multi-cabang',
        value: '1 sumber data terpusat',
        note: 'Menghapus konflik versi antar spreadsheet cabang',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'PROYEK INTERNAL · F&B',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Di industri makanan dan minuman (F&B) multi-cabang, mengelola tiga gerai kafe di Serpong, Bintaro, dan BSD sering kali menghadirkan tantangan operasional yang jauh lebih melelahkan daripada saat mengelola satu gerai tunggal. Setiap malam tepat pukul sepuluh, barista dan kepala shift di masing-masing gerai harus menghitung tumpukan struk kasir, menimbang sisa fisik biji kopi, sirup, dan susu, lalu mengetik angka ke lembar spreadsheet lokal di komputer kasir.',
              'Pemilik kafe biasanya baru bisa membaca total omzet harian dan sisa bahan baku keesokan siangnya setelah ketiga lembar rekap dikirimkan lewat grup obrolan WhatsApp dan digabungkan secara manual. Jeda waktu setengah hari ini membuat pemilik bisnis tidak memiliki visibilitas real-time terhadap performa gerai mereka sendiri.',
              'Kami membangun proyek internal Dashboard Operasional Kafe di CHESTAADOTCOM untuk memodelkan solusi software custom yang realistis bagi pemilik bisnis F&B. Tujuannya adalah menyatukan angka penjualan harian dan pergerakan stok dari beberapa gerai ke satu layar terpusat, tanpa harus memaksa tim mengganti aplikasi kasir (POS) yang sudah mereka pakai sehari-hari.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'TITIK MACET SPREADSHEET HARIAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Format rekap yang dipakai antar cabang sering kali tidak seragam karena dibuat oleh kepala shift yang berbeda. Cabang pertama mencatat susu oat dan susu segar dalam baris terpisah, sedangkan cabang kedua menggabungkannya dalam satu kategori minuman susu sehingga data belanja bahan tidak pernah bisa dibandingkan secara adil.',
              'Masalah kedua adalah keterlambatan deteksi bahan baku yang kritis. Stok sirup karamel atau biji kopi house blend sering kali baru disadari habis ketika pelanggan sedang ramai memesan di jam makan siang, sehingga staf terpaksa meminjam bahan ke cabang terdekat atau menolak pesanan menu andalan.',
              'Akibat laporan baru selesai keesokan harinya, evaluasi operasional selalu terlambat satu langkah. Ketika terjadi selisih kas fisik yang mencurigakan di salah satu cabang pada malam hari, pemilik bisnis baru bisa menanyakannya belasan jam kemudian saat ingatan kasir yang bertugas sudah samar.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Dua pendekatan umum yang biasanya dicoba pemilik kafe',
            attempts: [
              {
                method: 'Satu file spreadsheet bersama di Google Drive yang diedit serentak',
                whyItFailed:
                  'Bergantung pada kedisiplinan manual yang rentan goyah saat lelah. Baris rumus sering terhapus tidak sengaja oleh staf yang membuka file lewat layar HP, dan data antar cabang mudah saling tertimpa (overwrite).',
              },
              {
                method: 'Grup chat WhatsApp untuk laporan tutup kasir dan foto stok fisik',
                whyItFailed:
                  'Pesan laporan cepat tenggelam oleh percakapan operasional lain. Angka foto struk tidak terstruktur ke database, sehingga pemilik tetap harus menyalin ulang angka satu per satu ke laptop setiap akhir pekan.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'TIGA LAYAR UTAMA & FORMULIR HP',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Alih-alih merancang sistem enterprise yang rumit dengan puluhan grafik analitik yang membingungkan, kami membatasi dashboard ini hanya pada tiga layar utama: layar ringkasan penjualan harian, layar pemantau stok bahan kritis, dan layar laporan ringkas per cabang. Pendekatan ini membuat sistem tetap fokus pada keputusan harian yang paling mendesak.',
              'Untuk memudahkan pengumpulan data di lapangan, kami merancang formulir web sederhana yang sangat ringan di ponsel. Staf kasir atau barista cukup membuka tautan formulir di HP masing-masing dan menyelesaikan input penutupan shift dalam waktu kurang dari sembilan puluh detik sebelum pulang kerja.',
              'Sistem membagi hak akses ke dalam tiga peran tegas: Pemilik Bisnis memiliki akses menyeluruh untuk memantau semua cabang, omzet, dan margin kotor; Manajer Cabang dapat memperbarui stok masuk dan meninjau laporan shift di cabangnya; sedangkan Staf Kasir hanya bisa mengisi angka tutup shift pada hari berjalan.',
              'Kami juga menyaring metrik yang ditampilkan agar hanya memuat angka yang langsung memengaruhi keputusan esok hari: total penjualan bersih per cabang, bahan baku yang sudah mendekati batas minimum pemesanan ulang, serta selisih antara kas fisik di laci dan catatan kasir.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Tidak membangun mesin kasir (POS) lengkap dari nol, hanya menyatukan data operasional',
                whyChosen:
                  'Mengganti mesin kasir di seluruh cabang membutuhkan biaya perangkat keras baru, langganan mahal, dan pelatihan ulang staf yang memakan waktu berminggu-minggu.',
                tradeOff:
                  'Staf tetap memakai mesin kasir yang sudah ada untuk mencetak struk transaksi, lalu menyalin total rekap shift ke formulir web kami saat tutup toko.',
              },
              {
                decision: 'Membatasi dashboard hanya pada metrik keputusan esok hari',
                whyChosen:
                  'Menjaga layar tetap bersih dan cepat dibuka di layar ponsel pemilik bisnis saat berada di jalan atau sebelum tidur malam.',
                tradeOff:
                  'Analisis statistik jangka panjang seperti segmentasi demografi pelanggan atau tren jam sibuk per menu tidak disertakan di layar utama ini.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'DARI INPUT STAF KE PERINGATAN STOK',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Alur kerja sistem dirancang agar data bergerak secara otomatis dari meja kasir cabang hingga ke layar ponsel pemilik bisnis melalui lima tahap terstruktur. Sistem juga dilengkapi cabang pengaman untuk mendeteksi selisih kas fisik yang tidak wajar sebelum formulir shift dikunci.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Ilustrasi: alur data dari formulir tutup shift staf di ponsel menuju database terpusat, konsolidasi dashboard pemilik, dan sistem peringatan stok otomatis.',
              nodes: [
                {
                  id: 'kafe-step-1',
                  stepLabel: '01 · INPUT',
                  title: 'Input staf di HP',
                  subtitle: 'Staf memasukkan rekap penjualan shift dan sisa bahan baku via formulir web ringan',
                },
                {
                  id: 'kafe-step-2',
                  stepLabel: '02 · VALIDASI',
                  title: 'Validasi sistem',
                  subtitle: 'Memeriksa kebenaran format angka, mencegah input ganda, dan menghitung selisih kas',
                },
                {
                  id: 'kafe-step-3',
                  stepLabel: '03 · DATABASE',
                  title: 'Database terpusat',
                  subtitle: 'Menyimpan mutasi stok dan penjualan ke tabel terstruktur dengan isolasi hak akses',
                },
                {
                  id: 'kafe-step-4',
                  stepLabel: '04 · DASHBOARD',
                  title: 'Dashboard pemilik',
                  subtitle: 'Mengagregasi total omzet cabang secara real-time dan menghitung margin kotor',
                },
                {
                  id: 'kafe-step-5',
                  stepLabel: '05 · PERINGATAN',
                  title: 'Peringatan stok menipis',
                  subtitle: 'Menandai bahan baku yang mendekati batas minimum pemesanan ulang untuk esok hari',
                },
              ],
              branch: {
                fromNodeIndex: 1,
                stepLabel: 'CABANG SELISIH · AUDIT KASIR',
                title: 'Catatan selisih kas fisik',
                subtitle:
                  'Bila selisih kas fisik dengan catatan sistem melebihi batas wajar, staf wajib menuliskan catatan penjelasan sebelum submit.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'TAHAPAN INTEGRASI & PENGUJIAN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Dalam proses rekayasa sistem, kami menerapkan pendekatan bertahap agar perangkat lunak benar-benar selaras dengan rutinitas harian staf kafe. Kami tidak langsung merilis sistem ke ketiga cabang sekaligus, melainkan melakukan validasi mendalam mulai dari pemetaan data historis hingga pengujian ketahanan terhadap kesalahan input manusia.',
              'Lapisan antarmuka pengguna dibangun dengan pendekatan mobile-first yang sangat responsif, memastikan tombol-tombol input mudah ditekan dengan satu tangan oleh barista yang sedang terburu-buru merapikan bar kopi di akhir shift kerja.',
            ],
          },
          {
            type: 'list',
            title: 'Lima langkah rekayasa yang kami jalankan dalam proyek ini',
            items: [
              {
                title: 'Memetakan formulir spreadsheet yang sudah ada',
                detail:
                  'Mengumpulkan dan menganalisis berkas spreadsheet dari ketiga cabang untuk menyamakan penamaan bahan baku (SKU) serta kategori transaksi agar seragam.',
              },
              {
                title: 'Merancang skema tabel data bersama',
                detail:
                  'Menyusun basis data relasional yang menampung transaksi harian, mutasi stok masuk, dan pemakaian bahan dengan pengelompokan rapi per identitas cabang.',
              },
              {
                title: 'Mengatur hak akses sesuai peran pengguna',
                detail:
                  'Mengunci hak akses agar staf kasir hanya melihat shift miliknya, manajer cabang mengelola inventaris lokal, dan pemilik melihat ringkasan konsolidasi.',
              },
              {
                title: 'Uji ketahanan dengan skenario data ekstrim',
                detail:
                  'Menguji sistem terhadap salah ketik angka desimal, penekanan tombol kirim ganda secara cepat, serta pengiriman saat koneksi internet seluler melemah.',
              },
              {
                title: 'Rilis percontohan di satu cabang terlebih dahulu',
                detail:
                  'Menjalankan dashboard di cabang Serpong selama dua minggu untuk memantau adaptasi staf sebelum memperluas penerapannya ke cabang Bintaro dan BSD.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Target desain',
        eyebrow: 'TARGET DESAIN · BUKAN HASIL KLIEN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Sebagai proyek rekayasa internal CHESTAADOTCOM, seluruh indikator di bawah ini adalah sasaran desain sistem yang kami tetapkan dalam uji simulasi operasional, bukan klaim hasil pengukuran dari klien nyata.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Target desain, bukan hasil klien',
            targets: [
              {
                label: 'Ketersediaan laporan harian',
                value: 'Tanpa rekap manual',
                note: 'Terkompilasi otomatis setelah tutup shift kasir',
              },
              {
                label: 'Peringatan stok menipis',
                value: 'Sebelum bahan habis',
                note: 'Memicu peringatan saat stok di bawah batas aman',
              },
              {
                label: 'Konsolidasi multi-cabang',
                value: '1 sumber data terpusat',
                note: 'Menghapus konflik versi antar spreadsheet cabang',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Waktu penerimaan laporan omzet dan kasir harian',
                before:
                  'Pemilik menunggu hingga esok siang hari setelah berkas spreadsheet dari tiap cabang digabungkan manual.',
                after:
                  'Target desain: angka omzet terkonsolidasi langsung muncul di dashboard pemilik begitu shift malam selesai diinput.',
              },
              {
                aspect: 'Penanganan persediaan bahan baku kritis',
                before:
                  'Stok bahan sering baru ketahuan habis di tengah jam sibuk siang hari saat pelanggan memesan.',
                after:
                  'Target desain: sistem otomatis memunculkan peringatan stok kuning jika sisa fisik bahan mendekati batas pemesanan ulang.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Catatan perancangan',
        eyebrow: 'REFLEKSI & KOMPROMI OPERASIONAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pelajaran paling berharga saat merancang software untuk operasional kafe adalah menyadari bahwa pengguna akhir bukanlah analis data yang duduk santai di depan komputer desktop. Barista dan staf kasir bekerja berdiri sepanjang hari, melayani ratusan cangkir kopi, dan berada dalam kondisi lelah saat toko tutup.',
              'Jika formulir digital membutuhkan waktu pengisian lebih dari dua menit atau memiliki terlalu banyak kolom isian, staf cenderung menunda pengisian atau mengetik angka perkiraan asal-asalan. Karena itulah kami bersikeras membuat proses input di layar ponsel selesai dalam hitungan detik.',
              'Kami juga memutuskan untuk tidak memindahkan data mentah bertahun-tahun yang tersimpan di puluhan spreadsheet lama yang formatnya berantakan. Mengimpor data lama yang inkonsisten hanya akan mencemari database baru. Kami memilih mengimpor saldo awal bahan baku selama empat belas hari terakhir, lalu membiarkan data historis baru terbentuk secara rapi dan disiplin sejak hari pertama rilis.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Menampilkan sedikit metrik ringkas daripada dashboard analitik penuh grafik',
                whyChosen:
                  'Pemilik bisnis membutuhkan kejelasan instan sebelum tidur: apakah semua cabang sudah tutup buku dengan benar dan bahan apa yang wajib dipesan besok pagi.',
                tradeOff:
                  'Pemilik tidak dapat melihat grafik regresi musiman atau tren jam sibuk secara mendalam pada tampilan utama ini.',
              },
              {
                decision: 'Mengimpor data historis lama secara bertahap daripada migrasi massal',
                whyChosen:
                  'Menghindari risiko korupsi data akibat perbedaan rumus dan penamaan bahan baku pada spreadsheet lama dari tahun-tahun sebelumnya.',
                tradeOff:
                  'Perbandingan performa tahun ke tahun (year-on-year) membutuhkan waktu beberapa bulan hingga data historis baru terkumpul cukup lengkap.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Kami tidak membuang mesin kasir yang sudah akrab dengan barista; kami hanya membangun jembatan agar data penjualan dan sisa stok masuk ke satu layar yang rapi.',
      attribution: 'Chesta Azka — Catatan Proyek Internal CHESTAADOTCOM',
    },
    projectSlug: 'dashboard-kafe',
    relatedServiceSlugs: ['software-custom'],
    relatedPostSlugs: ['otomasi-whatsapp-ai-klinik-fnb-alur-kerja'],
    draft: false,
    seo: {
      title: 'Studi Kasus Dashboard Operasional Kafe | CHESTAADOTCOM',
      description:
        'Studi kasus proyek internal Dashboard Operasional Kafe: menyatukan penjualan harian, stok bahan baku, dan laporan cabang kafe tanpa ganti kasir.',
    },
  },

  // ===========================================================================
  // CASE STUDY 5: pemroses-dokumen
  // ===========================================================================
  {
    slug: 'pemroses-dokumen',
    legacySlugs: ['ekstraksi-faktur-pajak-ai', 'asisten-kualifikasi-klien-konsultan'],
    title: 'Pemroses Dokumen AI: ekstraksi data dengan tinjauan manusia',
    oneSentenceSummary:
      'Proyek internal merancang pipeline AI untuk mengekstrak invoice dan bukti potong pajak ke tabel web dengan peninjauan manusia sebelum disimpan.',
    client: 'Proyek internal CHESTAADOTCOM',
    industry: 'Jasa profesional',
    services: ['AI Agent', 'Software Custom'],
    serviceSlugs: ['ai-agent', 'software-custom'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Proyek internal',
    targetsBadgeLabel: 'Target desain, bukan hasil klien',
    duration: 'Proyek internal',
    readingTime: '7 menit baca',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (arsitektur, produk, teknologi)',
    publishedAt: '2026-03-24',
    updatedAt: '2026-03-24',
    cover: 'projectPemrosesDokumen',
    coverCaption:
      'Ilustrasi: antarmuka layar terbagi memperlihatkan dokumen pindaian asli di sisi kiri dan kolom ekstraksi AI yang siap diverifikasi di sisi kanan.',
    summary: {
      problem:
        'Firma jasa profesional menerima puluhan format invoice, bukti potong pajak, dan kontrak per minggu, lalu menyalin angka secara manual dengan risiko salah ketik tinggi.',
      built:
        'Sistem ekstraksi dokumen berbasis AI dengan antarmuka web layar terbagi, di mana manusia memeriksa dan menyetujui data sebelum masuk ke database.',
      solution:
        'Sistem ekstraksi dokumen berbasis AI dengan antarmuka web layar terbagi, di mana manusia memeriksa dan menyetujui data sebelum masuk ke database.',
      result:
        'Target desain: data yang tidak yakin selalu ditandai untuk ditinjau, tidak ada data masuk ke tabel akhir tanpa persetujuan manusia, dan setiap koreksi tercatat.',
    },
    targets: [
      {
        label: 'Penandaan data meragukan',
        value: 'Selalu ditandai',
        note: 'Tingkat keyakinan < 95% otomatis disorot kuning untuk ditinjau',
      },
      {
        label: 'Pintu persetujuan manusia',
        value: 'Wajib persetujuan',
        note: '0 baris data masuk tabel akhir tanpa klik persetujuan staf',
      },
      {
        label: 'Jejak riwayat koreksi',
        value: '100% tercatat',
        note: 'Mencatat identitas staf, nilai awal AI, dan waktu perubahan',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Konteks bisnis',
        eyebrow: 'PROYEK INTERNAL · JASA PROFESIONAL',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Di firma konsultan akuntansi, kantor konsultan pajak, dan praktik notaris di Tangerang Selatan dan Jakarta, dokumen administratif datang dalam gelombang besar setiap awal bulan. Staf operasional menerima puluhan berkas PDF dari klien dan vendor yang mencakup invoice tagihan, bukti potong pajak penghasilan (PPh 21 dan PPh 23), pindaian struk pembayaran operasional, serta lembar kontrak kerja.',
              'Tantangan terbesarnya adalah keberagaman tata letak dokumen. Tidak ada satu pun standar format yang seragam: sebagian vendor melampirkan invoice digital dengan tabel yang rapi, sebagian mengirimkan pindaian kertas yang miring atau sedikit buram, dan sebagian lainnya melampirkan foto bukti pembayaran yang diambil menggunakan kamera ponsel dengan pencahayaan seadanya.',
              'Kami merancang proyek internal Pemroses Dokumen AI di CHESTAADOTCOM untuk mengeksplorasi bagaimana model bahasa dan visi komputer modern dapat mempercepat penyalinan data tanpa mengorbankan ketepatan angka finansial. Kami berpegang pada satu prinsip tegas: efisiensi tidak boleh mengorbankan akurasi data hukum dan pembukuan.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Masalah',
        eyebrow: 'RISIKO SALAH KETIK & HALUSINASI AI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Menyalin data secara manual dari puluhan dokumen ke software akuntansi adalah pekerjaan yang lambat dan melelahkan. Setelah memeriksa dokumen kelima belas secara berurutan, konsentrasi staf mulai menurun, sehingga risiko salah mengetik angka penting—seperti tertukar satu digit Nomor Pokok Wajib Pajak (NPWP) atau kelebihan mengetik angka nol pada nominal tagihan—meningkat sangat tajam.',
              'Alat Optical Character Recognition (OCR) konvensional yang mengandalkan template koordinat kaku sangat mudah mengalami kegagalan. Begitu pihak vendor mengubah sedikit posisi logo perusahaan atau menambahkan satu baris diskon di bagian bawah, pembacaan OCR langsung meleset ke kolom yang keliru.',
              'Di sisi lain, membiarkan model AI mengekstrak data lalu langsung menyimpannya ke database produksi secara otomatis tanpa pengawasan manusia adalah resep malapetaka. Model bahasa sesekali dapat mengalami halusinasi, salah membedakan angka tanggal dengan nomor faktur, atau menebak angka nominal pada pindaian resi yang buram.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Dua pendekatan yang biasa dicoba dan mengapa keduanya kurang efektif',
            attempts: [
              {
                method: 'Penyalinan manual berulang dengan pola copy-paste oleh staf junior',
                whyItFailed:
                  'Menyita waktu berjam-jam setiap minggu yang seharusnya bisa dipakai untuk konsultasi klien, serta tetap rentan terhadap salah ketik akibat kejenuhan mata.',
              },
              {
                method: 'Otomasi OCR berbasis template koordinat kaku tanpa tinjauan',
                whyItFailed:
                  'Format faktur dari vendor selalu berubah tanpa pemberitahuan. Begitu tata letak bergeser beberapa milimeter, hasil ekstraksi langsung salah total dan merusak pembukuan.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Pendekatan',
        eyebrow: 'HUMAN-IN-THE-LOOP & LAYAR TERBAGI',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Pendekatan kami mengadopsi prinsip manusia di tengah alur kerja (human-in-the-loop). AI diposisikan sebagai asisten pembaca awal yang sangat cepat, sementara staf manusia memegang kendali sebagai pengawas mutu yang memvalidasi kebenaran setiap baris data.',
              'Kami merancang antarmuka web dengan tata letak layar terbagi (split-screen view): dokumen asli ditampilkan di panel kiri dengan fitur pembesar gambar yang mulus, sedangkan formulir kolom hasil ekstraksi terstruktur ditampilkan di panel kanan tepat bersebelahan.',
              'Setiap kolom ekstraksi dilengkapi penanda visual tingkat keyakinan (confidence score). Jika model mendeteksi kualitas teks yang meragukan atau tingkat keyakinan di bawah 95%, sistem otomatis memberi sorotan warna kuning kontras dan mengarahkan fokus mata peninjau ke kolom tersebut.',
              'Sistem menyediakan tombol persetujuan satu klik dan pintasan keyboard cepat. Staf cukup meninjau kecocokan angka selama beberapa detik, melakukan koreksi langsung pada kolom jika ditemukan ketidaksesuaian, lalu menekan tombol persetujuan agar data resmi tersimpan ke database inti.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Menolak otomatisasi 100% tanpa campur tangan manusia (human approval gate)',
                whyChosen:
                  'Satu kesalahan nominal pada faktur pajak atau laporan keuangan dapat berujung pada sanksi denda pajak dan kerugian reputasi yang mahal bagi firma jasa profesional.',
                tradeOff:
                  'Pemrosesan tidak berjalan sepenuhnya instan tanpa staf karena tetap membutuhkan verifikasi manusia, namun akurasi data finansial dijamin 100% valid.',
              },
              {
                decision: 'Menyimpan riwayat audit lengkap untuk setiap pengubahan data',
                whyChosen:
                  'Memberikan akuntabilitas mutlak sehingga tim manajemen selalu tahu siapa staf yang menyetujui dokumen dan angka apa saja yang pernah dikoreksi.',
                tradeOff:
                  'Membutuhkan alokasi penyimpanan tambahan untuk mencatat log perubahan dan perbandingan antara teks mentah AI dengan hasil akhir koreksi manusia.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'Alur sistem',
        eyebrow: 'DARI UNGGAH PINDAIAN KE LOG AUDIT',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Alur kerja pemrosesan dokumen berjalan melalui lima tahapan berurutan mulai dari penerimaan berkas digital hingga pencatatan audit. Apabila sistem mendeteksi kolom yang meragukan, alur secara otomatis memprioritaskan peninjauan khusus sebelum data diizinkan masuk ke tabel pembukuan.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Ilustrasi: alur 5 tahap Pemroses Dokumen AI dari unggah berkas hingga pencatatan log audit, dengan gerbang verifikasi manusia sebelum commit ke database.',
              nodes: [
                {
                  id: 'doc-step-1',
                  stepLabel: '01 · UNGGAH',
                  title: 'Unggah dokumen',
                  subtitle: 'Staf mengunggah berkas PDF atau pindaian gambar ke antrean sistem terenkripsi',
                },
                {
                  id: 'doc-step-2',
                  stepLabel: '02 · EKSTRAKSI',
                  title: 'Ekstraksi model AI',
                  subtitle: 'Membaca teks, tabel, dan memetakan angka ke dalam skema data terstruktur',
                },
                {
                  id: 'doc-step-3',
                  stepLabel: '03 · SKORING',
                  title: 'Penilaian keyakinan',
                  subtitle: 'Menghitung skor keyakinan per kolom dan memvalidasi rumus penjumlahan matematika',
                },
                {
                  id: 'doc-step-4',
                  stepLabel: '04 · TINJAUAN',
                  title: 'Layar tinjauan manusia',
                  subtitle: 'Staf memeriksa data di layar terbagi dengan penanda visual pada kolom meragukan',
                },
                {
                  id: 'doc-step-5',
                  stepLabel: '05 · SIMPAN & AUDIT',
                  title: 'Database & riwayat audit',
                  subtitle: 'Menyimpan baris data yang disetujui lengkap dengan jejak staf yang memeriksa',
                },
              ],
              branch: {
                fromNodeIndex: 3,
                stepLabel: 'KOREKSI STAF · REVISI INSTAN',
                title: 'Penyuntingan langsung di formulir',
                subtitle:
                  'Jika angka pada pindaian buram salah dibaca, staf langsung mengoreksi kolom teks sebelum menekan tombol persetujuan.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementasi',
        eyebrow: 'EVALUASI DOKUMEN & PINTASAN KEYBOARD',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Untuk menguji ketahanan sistem dalam kondisi kerja nyata, kami mengumpulkan lebih dari seratus sampel dokumen beragam. Sampel ini mencakup invoice digital keluaran software modern, faktur pajak standar Direktorat Jenderal Pajak, struk belanja bertinta tipis, hingga dokumen kontrak yang dipindai dengan sudut miring.',
              'Pada sisi antarmuka, kami menambahkan dukungan pintasan keyboard menyeluruh. Staf peninjau dapat berpindah antar kolom input menggunakan tombol Tab, menyetujui dokumen dengan kombinasi tombol cepat, serta memperbesar area dokumen dengan roda tetikus tanpa harus melepaskan tangan dari keyboard.',
            ],
          },
          {
            type: 'list',
            title: 'Lima komponen utama yang dibangun dalam sistem ini',
            items: [
              {
                title: 'Evaluasi variasi dokumen dunia nyata',
                detail:
                  'Menguji pipeline terhadap lebih dari 100 sampel invoice, bukti potong pajak, dan kuitansi dengan berbagai tingkat ketajaman visual.',
              },
              {
                title: 'Perancangan skema ekstraksi terstruktur ketat',
                detail:
                  'Menetapkan aturan kolom data standar mencakup nomor dokumen, tanggal transaksi, NPWP penerbit/penerima, nilai DPP, tarif PPN, dan total akhir.',
              },
              {
                title: 'Antarmuka layar terbagi dengan pintasan keyboard',
                detail:
                  'Menyediakan navigasi cepat di mana tombol Tab berpindah ke kolom berikutnya dan tombol Ctrl+Enter langsung menyetujui baris data.',
              },
              {
                title: 'Validasi silang matematika otomatis',
                detail:
                  'Sistem memverifikasi apakah penjumlahan nilai baris barang dan perhitungan tarif pajak cocok dengan nominal total sebelum ditampilkan.',
              },
              {
                title: 'Integrasi riwayat audit dan pembatasan peran',
                detail:
                  'Mencatat identitas peninjau, cap waktu verifikasi, serta nilai awal hasil bacaan AI untuk keperluan akuntabilitas tim pembukuan.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Target desain',
        eyebrow: 'TARGET DESAIN · BUKAN HASIL KLIEN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Seluruh indikator kinerja di bawah ini merupakan sasaran desain rekayasa yang kami gunakan dalam pengujian simulasi internal CHESTAADOTCOM, bukan klaim hasil pengukuran dari klien aktif.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Target desain, bukan hasil klien',
            targets: [
              {
                label: 'Penandaan data meragukan',
                value: 'Selalu ditandai',
                note: 'Tingkat keyakinan < 95% otomatis disorot kuning untuk ditinjau',
              },
              {
                label: 'Pintu persetujuan manusia',
                value: 'Wajib persetujuan',
                note: '0 baris data masuk tabel akhir tanpa klik persetujuan staf',
              },
              {
                label: 'Jejak riwayat koreksi',
                value: '100% tercatat',
                note: 'Mencatat identitas staf, nilai awal AI, dan waktu perubahan',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Kecepatan dan kenyamanan ekstraksi data dokumen',
                before:
                  'Staf menyalin manual angka demi angka dari jendela PDF ke spreadsheet, membutuhkan 3–5 menit per dokumen.',
                after:
                  'Target desain: seluruh kolom terisi otomatis dalam hitungan detik dan staf hanya membutuhkan 20–30 detik untuk memeriksa.',
              },
              {
                aspect: 'Pengendalian risiko salah ketik dan halusinasi AI',
                before:
                  'Salah ketik angka nol atau digit NPWP baru disadari saat rekonsiliasi akhir bulan yang rumit.',
                after:
                  'Target desain: kolom meragukan otomatis disorot kuning dan tidak ada data yang masuk tanpa persetujuan manusia.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Catatan perancangan',
        eyebrow: 'KENAPA MENOLAK OTOMASI PENUH',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Di era antusiasme kecerdasan buatan, godaan terbesar para pengembang software adalah menjanjikan otomatisasi seratus persen tanpa campur tangan manusia. Dalam proyek internal ini, kami secara sadar menolak janji tersebut.',
              'Dalam konteks perpajakan, keuangan, dan perjanjian hukum, biaya untuk memperbaiki satu kesalahan data yang terlanjur dilaporkan ke kantor pajak jauh lebih besar daripada beberapa detik yang dihabiskan staf untuk memeriksa layar terbagi.',
              'Kami sengaja merancang penanda tingkat keyakinan rendah dengan warna kuning kontras yang tidak bisa diabaikan. Penanda ini berfungsi sebagai pengingat visual agar mata manusia tidak sekadar melakukan stempel persetujuan buta (rubber-stamping). Setiap koreksi yang dilakukan staf juga otomatis tercatat dalam riwayat audit, sehingga jika sewaktu-waktu terjadi pemeriksaan eksternal, tim memiliki catatan pertanggungjawaban yang transparan.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Mewajibkan klik persetujuan manusia untuk setiap berkas dokumen',
                whyChosen:
                  'Mencegah halusinasi model AI merusak konsistensi pembukuan dan mematuhi prinsip kehati-hatian data finansial.',
                tradeOff:
                  'Sistem tidak bisa dibiarkan berjalan sendiri di tengah malam tanpa ada staf yang bertugas meninjau antrean.',
              },
              {
                decision: 'Membuat penanda visual kolom meragukan terlihat sangat mencolok',
                whyChosen:
                  'Mencegah fenomena kelelahan perhatian di mana peninjau hanya menekan tombol persetujuan tanpa benar-benar membaca.',
                tradeOff:
                  'Tampilan formulir terlihat lebih mencolok saat dokumen memiliki kualitas pindaian yang rendah, namun keselamatan data tetap nomor satu.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Otomasi dokumen finansial bukan soal membiarkan AI bekerja tanpa diawasi, melainkan memangkas waktu salin manual hingga 80% sambil memastikan manusia tetap menjadi pemegang keputusan akhir.',
      attribution: 'Chesta Azka — Catatan Proyek Internal CHESTAADOTCOM',
    },
    projectSlug: 'pemroses-dokumen',
    relatedServiceSlugs: ['ai-agent', 'software-custom'],
    relatedPostSlugs: ['keamanan-ai-agent-prompt-injection-data-pelanggan'],
    draft: false,
    seo: {
      title: 'Studi Kasus Sistem Pemroses Dokumen AI | CHESTAADOTCOM',
      description:
        'Studi kasus proyek internal Pemroses Dokumen AI: ekstraksi dokumen ke tabel web dengan peninjauan manusia, layar terbagi, dan catatan log audit.',
    },
  },
];


/**
 * Counts the total words across a case study's title, summary, pull quote, and all section blocks.
 */
export function countCaseStudyWords(study: CaseStudyItem): number {
  const chunks: string[] = [
    study.title,
    study.oneSentenceSummary,
    study.summary.problem,
    study.summary.built,
    study.pullQuote.text,
  ];

  for (const target of study.targets) {
    chunks.push(target.label, target.value, target.note);
  }

  for (const sec of study.sections) {
    chunks.push(sec.title);
    for (const block of sec.blocks) {
      if (block.type === 'text') {
        chunks.push(...block.paragraphs);
      } else if (block.type === 'callout') {
        chunks.push(block.callout.label, block.callout.title, block.callout.body);
      } else if (block.type === 'previous-attempts') {
        chunks.push(block.title);
        for (const att of block.attempts) {
          chunks.push(att.method, att.whyItFailed);
        }
      } else if (block.type === 'trade-offs') {
        for (const item of block.items) {
          chunks.push(item.decision, item.whyChosen, item.tradeOff);
        }
      } else if (block.type === 'diagram') {
        chunks.push(block.diagram.caption);
        for (const node of block.diagram.nodes) {
          chunks.push(node.title, node.subtitle);
        }
        if (block.diagram.branch) {
          chunks.push(block.diagram.branch.title, block.diagram.branch.subtitle);
        }
      } else if (block.type === 'list') {
        if (block.title) chunks.push(block.title);
        for (const item of block.items) {
          chunks.push(item.title, item.detail);
        }
      } else if (block.type === 'targets') {
        chunks.push(block.badgeLabel);
        for (const t of block.targets) {
          chunks.push(t.label, t.value, t.note);
        }
        if (block.beforeAfter) {
          for (const ba of block.beforeAfter) {
            chunks.push(ba.aspect, ba.before, ba.after);
          }
        }
      } else if (block.type === 'metrics') {
        for (const ba of block.beforeAfter) {
          chunks.push(ba.aspect, ba.before, ba.after);
        }
      }
    }
  }

  const fullText = chunks.join(' ').trim();
  if (!fullText) return 0;
  return fullText.split(/\s+/).length;
}

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

export function getAdjacentCaseStudies(
  slug: string,
  locale: 'id' | 'en' = 'id'
): {
  prev: CaseStudyItem;
  next: CaseStudyItem;
} {
  const published = getPublishedCaseStudies(locale);
  const clean = slug.trim().toLowerCase();
  let idx = published.findIndex((item) => item.slug.toLowerCase() === clean);
  if (idx === -1) {
    idx = published.findIndex(
      (item) => item.legacySlugs && item.legacySlugs.some((legacy) => legacy.toLowerCase() === clean)
    );
  }
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

export function getNextCaseStudy(slug: string, locale: 'id' | 'en' = 'id'): CaseStudyItem {
  return getAdjacentCaseStudies(slug, locale).next;
}

export function getCaseStudyIndustries(locale: 'id' | 'en' = 'id'): string[] {
  const industries = Array.from(new Set(getPublishedCaseStudies(locale).map((c) => c.industry)));
  return [locale === 'en' ? 'All Industries' : 'Semua Industri', ...industries];
}

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
  architectureUsed: cs.summary.built,
  roiMetrics: cs.summary.result,
  implementationTime: cs.duration,
  summary: cs.oneSentenceSummary,
  keyTakeaways: [cs.summary.problem, cs.summary.built, cs.summary.result],
  metrics: [],
}));
