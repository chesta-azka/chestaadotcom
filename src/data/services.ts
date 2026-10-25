/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: SERVICES DATA — CHESTAADOTCOM
 * ============================================================================
 * Routes powered by this file:
 * - /jasa/pembuatan-website
 * - /jasa/ai-agent
 * - /jasa/software-custom
 * - /jasa/otomasi-workflow
 * - Dynamic /sitemap.xml & /llms.txt
 */

export type ServiceSlug =
  | 'pembuatan-website'
  | 'ai-agent'
  | 'software-custom'
  | 'otomasi-workflow';

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
  faq: ServiceFAQItem[];
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
  'klinik-triage-bsd': {
    slug: 'klinik-triage-bsd',
    sector: 'Klinik Estetika & Gigi · BSD City',
    title: 'Landing Page Reservasi & AI Agent Triage Pasien WhatsApp',
    problem:
      'Admin kewalahan membalas chat di jam sibuk lebih dari 45 menit dan jadwal dokter sering bentrok.',
    built:
      'Landing page muat 1,1 detik + WhatsApp Cloud API agent untuk cek jadwal dokter dan sinkronisasi Google Calendar.',
    resultPlaceholder:
      'Waktu respon turun ke <20 detik & 0 jadwal bentrok',
    imageKey: 'portfolioClinicPlaceholder',
  },
  'fnb-preorder-serpong': {
    slug: 'fnb-preorder-serpong',
    sector: 'Restoran, Kafe & Katering · Gading Serpong',
    title: 'Katalog Menu Digital, Reservasi Meja & Pre-Order Katering',
    problem:
      'Pelanggan enggan mengunduh menu PDF berukuran 15MB dan pesanan acara kantor tercecer di chat kasir.',
    built:
      'Katalog menu web interaktif ringan + form pre-order katering otomatis ke WhatsApp sales dan rekap dapur.',
    resultPlaceholder:
      'Jumlah pesanan katering bulanan tercatat rapi tanpa salah input',
    imageKey: 'portfolioFnbPlaceholder',
  },
  'properti-arsitektur-bintaro': {
    slug: 'properti-arsitektur-bintaro',
    sector: 'Studio Arsitektur & Properti · Bintaro & Alam Sutera',
    title: 'Website Portofolio Korporat & Kualifikasi Prospek Proyek',
    problem:
      'Banyak pesan masuk menanyakan proyek di luar jangkauan anggaran atau lokasi, menyita waktu arsitek utama.',
    built:
      'Website portofolio cepat + kalkulator estimasi awal dan alur kualifikasi parameter ke database CRM.',
    resultPlaceholder:
      'Prospek terkualifikasi langsung masuk ke agenda konsultasi',
    imageKey: 'portfolioPropertyPlaceholder',
  },
};

export const PROBLEM_SELECTOR_OPTIONS: ProblemSelectorOption[] = [
  {
    id: 'chat-numpuk',
    questionChip: 'Pertanyaan pelanggan menumpuk di WhatsApp',
    situationDetail:
      'Admin kamu menghabiskan berjam-jam menjawab jam buka, daftar harga, dan cek slot jadwal yang sama berulang kali.',
    recommendedSlug: 'ai-agent',
    recommendationNote:
      'AI Agent membaca konteks pesan bebas, mengecek kalender/database, dan mengunci reservasi otomatis 24/7.',
  },
  {
    id: 'iklan-boncos',
    questionChip: 'Iklan jalan tapi sedikit yang lanjut chat',
    situationDetail:
      'Biaya klik iklan Google atau Meta Ads terus keluar, tetapi halaman tujuanmu lambat dibuka di HP atau penawarannya membingungkan.',
    recommendedSlug: 'pembuatan-website',
    recommendationNote:
      'Landing page yang muat di bawah 1,2 detik dengan struktur penawaran tajam dan tombol WhatsApp terformat.',
  },
  {
    id: 'salin-data',
    questionChip: 'Data dicatat berkali-kali antar-sheet',
    situationDetail:
      'Staf harus menyalin pesanan dari chat ke Google Sheets, lalu mengetik ulang ke sistem invoice dan mengirim pengingat manual.',
    recommendedSlug: 'otomasi-workflow',
    recommendationNote:
      'Otomasi workflow menyambungkan aplikasi yang sudah kamu pakai agar data mengalir sendiri begitu transaksi masuk.',
  },
  {
    id: 'butuh-sistem-internal',
    questionChip: 'Butuh sistem internal atau dashboard sendiri',
    situationDetail:
      'Spreadsheet sudah terlalu penuh, hak akses staf bercampur aduk, dan kamu butuh aplikasi web yang mengikuti SOP bisnismu.',
    recommendedSlug: 'software-custom',
    recommendationNote:
      'Aplikasi web & dashboard custom dengan pembagian hak akses staf, laporan real-time, dan kepemilikan kode penuh.',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'ai-agent',
    title: 'AI Agent untuk WhatsApp & CRM',
    shortTitle: 'AI Agent (WA & CRM)',
    tagline: 'AI AGENT & OTOMASI PERCAKAPAN',
    shortPromise:
      'Menjawab chat, memeriksa jadwal kosong, membuat booking, dan melapor ke tim kamu secara otomatis 24/7.',
    summary:
      'Bukan sekadar bot yang mengulang daftar FAQ. AI agent ini memahami bahasa sehari-hari pelangganmu, memakai tool nyata seperti kalender dan database, lalu menyelesaikan tugas sampai tuntas atau menyerahkannya ke staf manusia beserta ringkasan lengkap.',
    bentoSpan: 'large',
    timeline: '2–4 minggu',
    bestForSummary: 'Klinik, F&B, dan bisnis jasa dengan ratusan chat masuk per minggu',
    forWho: [
      'Admin WhatsApp bisnismu sering kewalahan membalas chat di jam sibuk atau malam hari hingga calon pelanggan pindah ke kompetitor.',
      'Staf resepsionis harus bolak-balik mengecek kalender dokter, terapis, atau jadwal ruangan setiap kali ada yang bertanya slot kosong.',
      'Kamu pernah mencoba chatbot biasa, tetapi pelanggan justru kesal karena balasan kaku dan disuruh menekan angka 1–5.',
      'Banyak prospek potensial yang berhenti membalas setelah tanya harga karena tidak ada staf yang sempat mengirim pesan follow-up.',
    ],
    deliverables: [
      {
        title: 'AI Agent WhatsApp Resmi (Cloud API)',
        description:
          'Agent terhubung ke nomor WhatsApp bisnismu untuk merespons pesan masuk dalam hitungan detik sepanjang hari.',
      },
      {
        title: 'Integrasi Tool Kalender & Database',
        description:
          'Koneksi langsung ke Google Calendar, Google Sheets, atau PostgreSQL agar agent bisa membaca stok/jadwal dan menulis data baru.',
      },
      {
        title: 'Sistem Serah ke Manusia (Human Handover)',
        description:
          'Deteksi otomatis untuk komplain, negosiasi khusus, atau kasus di luar SOP yang langsung meneruskan konteks ke staf adminmu.',
      },
      {
        title: 'Basis Pengetahuan SOP Bisnismu',
        description:
          'Penyusunan dokumen aturan harga, syarat layanan, dan gaya bahasa supaya agent menjawab persis seperti staf terlatihmu.',
      },
      {
        title: 'Dashboard Log & Audit Percakapan',
        description:
          'Catatan transparan setiap pesan masuk, alasan keputusan agent, dan tool yang dipanggil agar mudah kamu pantau.',
      },
      {
        title: 'Pengujian Skenario Ekstrem & Garansi 30 Hari',
        description:
          'Simulasi pesan typo, pertanyaan menjebak, hingga penanganan error sebelum rilis, ditambah garansi perbaikan 30 hari.',
      },
    ],
    process: [
      {
        num: '01',
        duration: '30 Menit',
        title: 'Audit alur chat & SOP gratis',
        description:
          'Kita bedah riwayat chat yang paling sering menyita waktu adminmu dan tentukan batas tugas yang boleh diambil alih agent.',
      },
      {
        num: '02',
        duration: 'Hari ke-2–5',
        title: 'Rancang akses tool & aturan batas',
        description:
          'Kami petakan skema database/kalender yang akan dibaca agent serta skenario kapan agent wajib mengoper chat ke manusia.',
      },
      {
        num: '03',
        duration: 'Minggu ke-1–3',
        title: 'Bangun & uji coba di nomor staging',
        description:
          'Kamu dan timmu menguji langsung percakapan dengan agent—mulai dari booking normal hingga pesan komplain rumit.',
      },
      {
        num: '04',
        duration: 'Rilis & Rawat',
        title: 'Aktifkan ke pelanggan & pantau log',
        description:
          'Agent mulai melayani pelanggan nyata. Kami mendampingi timmu dan menyempurnakan instruksi berdasarkan interaksi minggu pertama.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Reservasi Treatment & Kualifikasi Jadwal Dokter',
        workflowLines: [
          'Pasien mengirim chat pukul 21.30: "Besok sore ada slot scaling gigi sama drg. Maya?"',
          'Agent mengecek Google Calendar klinik, melihat jam 16.00 kosong, lalu menawarkan slot tersebut beserta estimasi biaya.',
          'Setelah pasien setuju, agent mengunci jadwal di kalender, mencatat data ke database pasien, dan mengirim pengingat H-3 jam.',
        ],
        outcome: 'Contoh hasil: 0 chat malam hari terlewat, resepsionis pagi tinggal menerima daftar pasien terkonfirmasi.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Pemesanan Katering Acara & Reservasi Meja VIP',
        workflowLines: [
          'Pelanggan korporat menanyakan paket nasi box untuk 80 orang di hari Jumat.',
          'Agent menghitung total harga sesuai pilihan menu, mengecek kuota dapur pada tanggal tersebut, dan menerbitkan draf invoice.',
          'Begitu bukti transfer dikirim, agent meneruskan konfirmasi ke grup WhatsApp dapur dan mencatat pesanan di sheet pengiriman.',
        ],
        outcome: 'Contoh hasil: Pesanan grup tercatat seragam tanpa risiko salah hitung porsi atau lupa alamat kirim.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Penyaringan Prospek Pembeli & Jadwal Survei Lokasi',
        workflowLines: [
          'Calon pembeli dari iklan Instagram bertanya cicilan dan ketersediaan unit rumah di BSD.',
          'Agent menggali 3 informasi kunci secara ramah: kisaran anggaran, rencana KPR/tunai, dan waktu luang untuk kunjungan lokasi.',
          'Agent menjadwalkan sesi survei di kalender sales in-house dan mengirim ringkasan profil pembeli ke WhatsApp tim sales.',
        ],
        outcome: 'Contoh hasil: Tim sales fokus menemani prospek yang sudah jelas anggaran dan jadwal kedatangannya.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa Profesional',
        scenarioTitle: 'Konsultasi Awal & Pengumpulan Dokumen Klien',
        workflowLines: [
          'Klien menghubungi kantor konsultan pajak/hukum untuk menanyakan pembuatan izin usaha.',
          'Agent menjelaskan rincian persyaratan dokumen awal, menjawab kisaran durasi proses, dan menawarkan jadwal sesi konsultasi.',
          'Klien memilih jadwal Zoom, dan agent otomatis membuat tautan kalender serta daftar periksa dokumen di folder internal.',
        ],
        outcome: 'Contoh hasil: Sesi konsultasi pertama langsung produktif karena dokumen dasar sudah terkumpul.',
      },
    ],
    stackChips: ['Python', 'Node.js', 'WhatsApp Cloud API', 'PostgreSQL', 'n8n'],
    pricingNote: {
      label: 'Dihitung setelah audit gratis',
      reason:
        'Biaya AI agent sangat bergantung pada berapa banyak tool (kalender, database, CRM) dan aturan keputusan yang perlu disambungkan, sehingga kami menghitung angka pastinya setelah audit gratis 30 menit agar kamu tidak membayar fitur yang tidak terpakai.',
      scopeNote: 'Sudah termasuk setup guardrails keamanan, integrasi WhatsApp Cloud API, dan garansi bug-fix 30 hari.',
    },
    faq: [
      {
        question: 'Apakah balasan AI agent terasa kaku seperti robot?',
        answer:
          'Tidak. Kami menyusun instruksi bahasa mengikuti gaya sapaan admin bisnismu sehari-hari (misalnya memakai sapaan "Kak" atau "Bapak/Ibu" yang hangat). Pelanggan tetap bisa bertanya dengan kalimat bebas tanpa harus mengetik kode angka.',
      },
      {
        question: 'Bagaimana kalau pelanggan bertanya hal rumit yang belum ada di SOP?',
        answer:
          'Agent tidak akan mengarang jawaban. Jika pertanyaan berada di luar batas wewenang atau pelanggan menyampaikan keluhan, agent langsung menghentikan balasan otomatis dan mengalihkan percakapan ke staf manusiamu beserta ringkasan masalahnya.',
      },
      {
        question: 'Apakah nomor WhatsApp bisnis saya yang lama tetap bisa dipakai?',
        answer:
          'Bisa. Kami membantu proses migrasi atau integrasi nomor bisnismu ke WhatsApp Cloud API resmi maupun skema koeksistensi sesuai kebutuhan operasional adminmu.',
      },
      {
        question: 'Berapa biaya bulanan untuk menjalankan AI agent setelah rilis?',
        answer:
          'Biaya operasional bulanan hanya berasal dari pemakaian kuota API model AI dan percakapan WhatsApp yang sangat terjangkau sesuai volume chat nyata. Semua rincian estimasi biaya bulanan kami hitung secara terbuka saat sesi audit.',
      },
      {
        question: 'Apakah data percakapan pelanggan saya dipakai untuk melatih AI publik?',
        answer:
          'Tidak. Kami menggunakan jalur API enterprise yang tidak memakai data bisnis atau chat pelangganmu untuk melatih model publik, dan database riwayat dapat disimpan di infrastruktur pilihanmu sendiri.',
      },
    ],
    relatedCaseSlugs: ['klinik-triage-bsd', 'fnb-preorder-serpong'],
    relatedPostSlugs: [
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
    ],
    seo: {
      title: 'Jasa AI Agent WhatsApp & CRM di BSD & Tangsel | CHESTAADOTCOM',
      description:
        'Bangun AI agent WhatsApp & CRM yang membalas chat, mengecek jadwal kalender, dan mencatat database otomatis untuk bisnis di BSD City, Tangsel & Jabodetabek.',
    },
    imageKey: 'serviceAiAgent',
  },
  {
    slug: 'pembuatan-website',
    title: 'Pembuatan Website & Landing Page',
    shortTitle: 'Pembuatan Website & Landing Page',
    tagline: 'WEBSITE & LANDING PAGE CEPAT',
    shortPromise:
      'Muat di bawah 1,2 detik, struktur penawaran jelas, dan siap mengubah klik iklan menjadi chat WhatsApp.',
    summary:
      'Kami merancang dan menulis kode landing page serta website profil bisnis dari nol tanpa template berat yang membebani layar HP. Dirancang supaya pengunjung langsung paham keunggulan bisnismu dalam 5 detik pertama dan mudah menghubungi timmu.',
    bentoSpan: 'large',
    timeline: '3–7 hari kerja',
    bestForSummary: 'Kampanye iklan Google/Meta Ads, peluncuran layanan baru, dan profil bisnis kredibel',
    forWho: [
      'Kamu sedang menjalankan iklan Google Ads, Instagram, atau TikTok Ads, tetapi rasio pengunjung yang mengeklik tombol WhatsApp masih rendah.',
      'Website lamamu membutuhkan waktu lebih dari 4 detik untuk terbuka di jaringan seluler sehingga pengunjung keburu menutup halaman.',
      'Calon klien korporat atau pasien sering menanyakan profil dan daftar layananmu, tetapi kamu baru memiliki bio Instagram atau file PDF berat.',
      'Kamu ingin bisnis lokalmu di BSD, Alam Sutera, Bintaro, atau Gading Serpong mudah ditemukan di pencarian Google dan AI Search.',
    ],
    deliverables: [
      {
        title: 'Desain Antarmuka Mobile-First & Bersih',
        description:
          'Tata letak yang nyaman dibaca di layar ponsel 360px–430px maupun layar desktop lebar, dengan hirarki tombol aksi yang jelas.',
      },
      {
        title: 'Copywriting Bahasa Indonesia yang Konkret',
        description:
          'Kami bantu menyusun teks penawaran, keunggulan layanan, dan FAQ yang langsung menjawab keraguan calon pelangganmu.',
      },
      {
        title: 'Kecepatan Muat Sub-Detik (Core Web Vitals Hijau)',
        description:
          'Optimasi gambar AVIF/WebP, font lokal, dan kode ringan untuk mengejar skor performa Lighthouse 90+ di perangkat mobile.',
      },
      {
        title: 'Integrasi Tombol WhatsApp & Pelacakan Iklan',
        description:
          'Pesan pembuka WhatsApp yang sudah terformat per layanan, lengkap dengan pemasangan Meta Pixel, TikTok Pixel, atau Google Tag (GA4).',
      },
      {
        title: 'Fondasi Teknis SEO, GEO & AEO',
        description:
          'Dilengkapi Schema.org JSON-LD (LocalBusiness, Service, FAQPage), OpenGraph card, dan struktur heading semantik.',
      },
      {
        title: 'Kepemilikan Penuh Source Code & Domain',
        description:
          'Seluruh file kode, konfigurasi hosting, dan akses domain diserahkan 100% atas namamu tanpa biaya sewa bulanan yang mengikat.',
      },
    ],
    process: [
      {
        num: '01',
        duration: 'Hari ke-1',
        title: 'Bedah penawaran & target pelanggan',
        description:
          'Kita diskusikan layanan utama yang ingin kamu jual, profil pelanggan ideal, serta pertanyaan yang paling sering mereka ajukan.',
      },
      {
        num: '02',
        duration: 'Hari ke-2–3',
        title: 'Penyusunan copywriting & kerangka halaman',
        description:
          'Kami menyusun alur argumen dari judul utama, bukti layanan, daftar harga/paket, hingga akordeon FAQ untuk kamu tinjau.',
      },
      {
        num: '03',
        duration: 'Hari ke-4–6',
        title: 'Pengembangan kode & optimasi kecepatan',
        description:
          'Halaman dibangun dengan React/Tailwind, diuji di berbagai ukuran layar HP, dan dipasang kode pelacakan konversi iklan.',
      },
      {
        num: '04',
        duration: 'Hari ke-7',
        title: 'Rilis ke domain resmi & indeksasi',
        description:
          'Website tayang di domain resmimu lengkap dengan SSL, didaftarkan ke Google Search Console, dan bergaransi perbaikan 30 hari.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Halaman Kampanye Promo Treatment & Profil Dokter',
        workflowLines: [
          'Calon pasien mengeklik iklan Instagram promo perawatan wajah atau gigi dari ponsel mereka.',
          'Halaman terbuka instan dalam 0,9 detik, menampilkan rincian prosedur, profil dokter praktik, kisaran biaya transparan, dan lokasi Google Maps.',
          'Pasien menekan tombol "Booking Jadwal via WhatsApp" yang langsung mengirim pesan terformat berisi nama treatment pilihan.',
        ],
        outcome: 'Contoh hasil: Penurunan bounce rate pengunjung iklan dan peningkatan chat konsultasi yang siap reservasi.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Halaman Katalog Menu Interaktif & Paket Katering/Acara',
        workflowLines: [
          'Pelanggan membuka tautan di bio Instagram atau profil Google Maps restoranmu tanpa perlu mengunduh file PDF belasan megabyte.',
          'Pelanggan melihat foto menu terkompresi tajam, memfilter kategori makanan/paket acara, dan mengecek kapasitas ruang privat.',
          'Satu ketukan pada tombol reservasi langsung mengirim rincian tanggal, jumlah tamu, dan paket ke WhatsApp admin outlet.',
        ],
        outcome: 'Contoh hasil: Pelanggan lebih cepat memilih menu dan admin menerima format reservasi yang rapi.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Showcase Proyek Hunian & Studio Arsitektur',
        workflowLines: [
          'Pemilik lahan atau pencari rumah mengunjungi halaman proyek untuk melihat portofolio desain, denah lantai, dan spesifikasi teknis.',
          'Galeri beresolusi tinggi dimuat secara bertahap (lazy-load) sehingga halaman tetap ringan meski memuat banyak visual.',
          'Pengunjung mengisi kalkulator singkat luas bangunan dan langsung terhubung ke tim arsitek dengan estimasi awal.',
        ],
        outcome: 'Contoh hasil: Kredibilitas studio meningkat di mata klien pemilik proyek bernilai tinggi.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa Profesional',
        scenarioTitle: 'Landing Page Layanan Konsultan, Legal & B2B',
        workflowLines: [
          'Manajer perusahaan mencari jasa konsultan pajak, hukum, atau pengadaan B2B di area Tangerang Selatan melalui Google.',
          'Halaman menyajikan cakupan layanan yang lugas, tahapan kerja, daftar dokumen yang diperlukan, dan FAQ teknis.',
          'Prospek menekan tombol penjadwalan diskusi dengan pesan yang sudah mencantumkan jenis badan usaha dan kebutuhannya.',
        ],
        outcome: 'Contoh hasil: Tim konsultan menerima prospek B2B yang sudah memahami alur dan kisaran layanan.',
      },
    ],
    stackChips: ['React', 'Node.js', 'WhatsApp Cloud API'],
    pricingNote: {
      label: 'Mulai Rp1.200.000',
      startingPriceNumeric: 1200000,
      reason:
        'Harga landing page satu halaman dimulai dari Rp1.200.000. Untuk website multi-halaman dengan fitur katalog atau kalkulator khusus, biaya dihitung transparan di awal sesuai jumlah halaman dan fitur.',
      scopeNote: 'Sudah termasuk penulisan copywriting, optimasi kecepatan mobile, pemasangan pixel iklan, dan garansi 30 hari.',
    },
    faq: [
      {
        question: 'Apa saja yang sudah termasuk dalam harga mulai Rp1.200.000?',
        answer:
          'Harga tersebut sudah mencakup perancangan desain mobile-first, penyusunan copywriting Bahasa Indonesia, optimasi kecepatan muat, integrasi tombol WhatsApp terformat, pengaturan SEO dasar, dan bantuan pemasangan ke domainmu.',
      },
      {
        question: 'Apakah menggunakan template WordPress atau dibangun custom?',
        answer:
          'Kami membangun dengan kode modern (React & Tailwind CSS) tanpa tumpukan plugin WordPress yang berat. Hasilnya jauh lebih cepat dibuka di HP, lebih aman dari celah plugin kedaluwarsa, dan tidak membebani server.',
      },
      {
        question: 'Berapa lama waktu pengerjaan sampai website bisa dipakai iklan?',
        answer:
          'Untuk landing page standar, waktu pengerjaan adalah 3–7 hari kerja sejak materi dasar (info layanan dan kontak) kita sepakati bersama.',
      },
      {
        question: 'Bagaimana kalau saya belum punya teks atau foto yang rapi?',
        answer:
          'Tidak masalah. Kami akan mewawancarai kamu singkat selama 30 menit untuk menyusun seluruh kalimat penawarannya, serta menyiapkan ilustrasi visual bersih yang bisa diganti kapan saja saat foto aslimu siap.',
      },
      {
        question: 'Apakah saya mendapatkan akses penuh ke kode dan domainnya?',
        answer:
          'Ya, 100%. Setelah proyek selesai, seluruh kode sumber (source code) dan akses akun hosting/domain adalah milikmu sepenuhnya.',
      },
    ],
    relatedCaseSlugs: ['klinik-triage-bsd', 'properti-arsitektur-bintaro'],
    relatedPostSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'checklist-landing-page-konversi-tinggi-bisnis-jasa',
    ],
    seo: {
      title: 'Jasa Landing Page & Website Cepat di BSD | Mulai Rp1,2 Juta',
      description:
        'Jasa pembuatan landing page konversi tinggi dan website bisnis cepat (<1,2 detik) di BSD City, Tangerang Selatan & Jabodetabek. Harga transparan mulai Rp1.200.000.',
    },
    imageKey: 'serviceWebLandingPage',
  },
  {
    slug: 'software-custom',
    title: 'Aplikasi Web & Dashboard Custom',
    shortTitle: 'Software & Dashboard Custom',
    tagline: 'SISTEM OPERASIONAL & PORTAL INTERNAL',
    shortPromise:
      'Aplikasi web, portal klien, dan dashboard internal yang dibangun mengikuti SOP unik bisnismu.',
    summary:
      'Ketika Google Sheets sudah terlalu lambat dan software SaaS langganan tidak cocok dengan cara kerja timmu, kami membangun aplikasi web dan dashboard khusus yang memusatkan data operasional, komisi, inventaris, dan laporan dalam satu pintu.',
    bentoSpan: 'small',
    timeline: '2–4 minggu',
    bestForSummary: 'Bisnis berkembang yang butuh sistem internal, portal klien, atau perhitungan komisi/stok khusus',
    forWho: [
      'Tim kamu mengelola ratusan baris transaksi di banyak file spreadsheet terpisah yang sering tidak sinkron atau tak sengaja terhapus.',
      'Kamu butuh pembagian hak akses yang jelas: staf lapangan hanya bisa menginput tugas harian, sementara pemilik bisnis bisa melihat laporan margin.',
      'Software kasir atau ERP langganan yang ada di pasaran terlalu kaku, terlalu mahal biaya per kursinya, atau tidak mendukung rumus komisi bisnismu.',
      'Kamu ingin menyediakan portal khusus bagi klien B2B atau pasien untuk memantau status pesanan dan riwayat pembayaran secara mandiri.',
    ],
    deliverables: [
      {
        title: 'Aplikasi Web Responsif Berbasis Peran (RBAC)',
        description:
          'Sistem login aman dengan pembagian wewenang bertingkat untuk pemilik bisnis, manajer operasional, admin, dan staf lapangan.',
      },
      {
        title: 'Database Relasional Terstruktur (PostgreSQL)',
        description:
          'Skema database yang dirancang rapi untuk menjaga keakuratan angka stok, transaksi, jadwal, dan riwayat perubahan data.',
      },
      {
        title: 'Dashboard Laporan & Metrik Real-Time',
        description:
          'Ringkasan angka operasional penting, grafik penjualan, dan fitur ekspor laporan ke CSV/Excel/PDF dalam satu klik.',
      },
      {
        title: 'Formulir Input Cepat & Validasi Anti-Salah Ketik',
        description:
          'Antarmuka kerja untuk staf admin yang meminimalkan ketikan manual dan mencegah data ganda atau format kosong.',
      },
      {
        title: 'Integrasi API ke WhatsApp & Sistem Eksternal',
        description:
          'Koneksi langsung dari dashboard untuk mengirim notifikasi status pesanan atau bukti transaksi ke nomor WhatsApp pelanggan.',
      },
      {
        title: 'Dokumentasi Video Tim & Serah Terima Source Code',
        description:
          'Panduan pemakaian singkat untuk stafmu, kepemilikan penuh kode sumber, dan garansi pemeliharaan pasca-rilis 30 hari.',
      },
    ],
    process: [
      {
        num: '01',
        duration: '30 Menit',
        title: 'Audit spreadsheet & alur kerja saat ini',
        description:
          'Kita pelajari file Excel/Sheets yang dipakai timmu sekarang dan temukan titik mana yang paling sering bikin salah rekap.',
      },
      {
        num: '02',
        duration: 'Hari ke-2–5',
        title: 'Desain struktur database & prototipe layar',
        description:
          'Kamu melihat rancangan layar input, pembagian hak akses pengguna, dan estimasi biaya tetap sebelum penulisan kode dimulai.',
      },
      {
        num: '03',
        duration: 'Minggu ke-1–3',
        title: 'Pengembangan modul & uji coba staf',
        description:
          'Sistem dibangun bertahap. Staf adminmu mencoba langsung menginput data sampel di server staging untuk memastikan kemudahannya.',
      },
      {
        num: '04',
        duration: 'Minggu ke-4',
        title: 'Migrasi data awal & peluncuran produksi',
        description:
          'Kami bantu memindahkan data master dari sheet lamamu ke sistem baru dan mendampingi timmu selama 30 hari penuh.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Dashboard Antrean, Rekam Kunjungan & Komisi Tindakan Dokter',
        workflowLines: [
          'Resepsionis mendaftarkan pasien datang dan memilih jenis tindakan medis serta terapis yang bertugas.',
          'Sistem otomatis menghitung bagi hasil komisi dokter/terapis dan mengurangi stok bahan habis pakai di gudang klinik.',
          'Pemilik klinik dapat membuka ringkasan pendapatan harian dan rincian komisi bulanan dari ponsel kapan saja.',
        ],
        outcome: 'Contoh hasil: Perhitungan komisi akhir bulan selesai instan tanpa lembur rekap manual.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Sistem Manajemen Produksi Dapur Sentral & Pengiriman Outlet',
        workflowLines: [
          'Setiap cabang kafe menginput permintaan bahan baku sebelum pukul 17.00 melalui halaman ponsel kepala outlet.',
          'Dashboard dapur sentral merangkum total kebutuhan produksi besok pagi dan mencetak surat jalan pengiriman per rute.',
          'Saat barang tiba, cabang melakukan konfirmasi terima barang sehingga selisih stok langsung terdeteksi hari itu juga.',
        ],
        outcome: 'Contoh hasil: Kehilangan bahan baku berkurang dan pemesanan antar-cabang tidak lagi tercecer di grup chat.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Portal Progres Pembangunan & Termin Pembayaran Klien',
        workflowLines: [
          'Pengawas lapangan mengunggah foto progres mingguan proyek renovasi atau pembangunan rumah langsung dari HP.',
          'Klien pemilik rumah masuk ke portal khusus untuk melihat persentase capaian tahap kerja dan jadwal termin tagihan berikutnya.',
          'Sistem mengirim pengingat jatuh tempo termin secara otomatis beserta lampiran laporan progres terbaru.',
        ],
        outcome: 'Contoh hasil: Kepercayaan klien meningkat dan pencairan pembayaran termin lebih tepat waktu.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa Profesional',
        scenarioTitle: 'Sistem Pelacakan Proyek Klien, Dokumen & Penagihan Berulang',
        workflowLines: [
          'Tim konsultan memantau status puluhan dokumen perizinan atau laporan pajak klien dalam satu papan kerja terpusat.',
          'Setiap dokumen yang mendekati masa kedaluwarsa otomatis memunculkan peringatan ke akun staf penanggung jawab.',
          'Manajer dapat melihat beban kerja per staf dan status tagihan klien yang belum lunas dalam satu layar.',
        ],
        outcome: 'Contoh hasil: Tidak ada tenggat dokumen klien yang terlewat dan arus kas tagihan lebih terkontrol.',
      },
    ],
    stackChips: ['React', 'Node.js', 'PostgreSQL', 'Python', 'WhatsApp Cloud API'],
    pricingNote: {
      label: 'Dihitung setelah audit gratis',
      reason:
        'Setiap bisnis memiliki jumlah modul, peran pengguna, dan aturan perhitungan yang berbeda, sehingga kami menyusun harga tetap yang adil setelah membedah kebutuhanmu pada sesi audit gratis 30 menit.',
      scopeNote: 'Tanpa biaya lisensi per pengguna (per-seat fee). Kode sumber menjadi aset milik perusahaanmu.',
    },
    faq: [
      {
        question: 'Kenapa bangun software custom daripada berlangganan aplikasi SaaS bulanan?',
        answer:
          'Aplikasi SaaS bulanan sering memaksamu mengubah cara kerja mengikuti fitur mereka, dan biayanya terus membengkak seiring bertambahnya jumlah staf. Dengan software custom, fitur dirancang pas sesuai SOP bisnismu dan kamu tidak dikenakan biaya langganan per pengguna.',
      },
      {
        question: 'Apakah staf saya yang kurang paham teknologi akan kesulitan memakainya?',
        answer:
          'Justru kami merancang layar aplikasi sesederhana mungkin dengan hanya menampilkan tombol yang relevan bagi tugas staf tersebut. Kami juga menyertakan sesi pelatihan langsung dan video panduan singkat.',
      },
      {
        question: 'Di mana database dan aplikasinya akan disimpan?',
        answer:
          'Lokasi penyimpanan bebas kamu tentukan sesuai kebijakan internal bisnismu—bisa di cloud server pilihanmu maupun di server internal perusahaanmu sendiri.',
      },
      {
        question: 'Apakah sistem ini nantinya bisa ditambah fitur baru saat bisnis makin besar?',
        answer:
          'Bisa. Kami membangun kode secara modular menggunakan React, Node.js, dan PostgreSQL sehingga penambahan modul baru di kemudian hari tidak perlu membongkar sistem yang sudah jalan.',
      },
    ],
    relatedCaseSlugs: ['properti-arsitektur-bintaro', 'fnb-preorder-serpong'],
    relatedPostSlugs: [
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    ],
    seo: {
      title: 'Jasa Pembuatan Web App & Dashboard Custom BSD | CHESTAADOTCOM',
      description:
        'Bangun aplikasi web operasional, sistem internal, dan dashboard custom sesuai SOP bisnismu di BSD City, Tangerang Selatan & Jabodetabek. Audit alur kerja gratis.',
    },
    imageKey: 'serviceSoftwareCustom',
  },
  {
    slug: 'otomasi-workflow',
    title: 'Otomasi Workflow Antar-Aplikasi',
    shortTitle: 'Otomasi Workflow',
    tagline: 'INTEGRASI & OTOMASI PROSES KERJA',
    shortPromise:
      'Menyambungkan Google Sheets, form website, invoice, kalender, dan WhatsApp supaya data mengalir sendiri.',
    summary:
      'Kamu tidak selalu harus mengganti tool yang sudah biasa dipakai timmu. Kami membangun jembatan otomatis di belakang layar (menggunakan n8n, Node.js, dan Webhook API) agar setiap data yang masuk di satu tempat langsung memperbarui sistem lainnya tanpa salin-tempel manual.',
    bentoSpan: 'small',
    timeline: '1–3 minggu',
    bestForSummary: 'Tim yang sudah memakai Sheets/Notion/Form tetapi lelah menyalin data dan mengirim notifikasi manual',
    forWho: [
      'Staf kamu menghabiskan waktu berjam-jam setiap hari hanya untuk menyalin data dari formulir atau chat ke berbagai spreadsheet.',
      'Sering terjadi salah ketik nominal, nomor telepon, atau jadwal karena data dipindahkan secara manual oleh admin yang sedang terburu-buru.',
      'Pembuatan kuitansi/invoice, pengiriman email konfirmasi, dan pengingat jatuh tempo masih diketik satu per satu.',
      'Kamu sebagai pemilik bisnis harus selalu bertanya ke admin di grup chat hanya untuk mengetahui total penjualan atau prospek hari ini.',
    ],
    deliverables: [
      {
        title: 'Arsitektur Alur Otomasi (n8n / Node.js Webhook)',
        description:
          'Skenario pemicu otomatis (trigger & action) yang menghubungkan aplikasi harianmu secara instan dan stabil.',
      },
      {
        title: 'Sinkronisasi Dua Arah Spreadsheet & Database',
        description:
          'Pencatatan dan pembaruan baris otomatis di Google Sheets, Notion, Airtable, atau PostgreSQL saat ada transaksi baru.',
      },
      {
        title: 'Otomasi Pembuatan Invoice & Dokumen PDF',
        description:
          'Pembuatan dokumen penawaran, invoice, atau tanda terima otomatis dari data pesanan yang langsung dikirim ke pelanggan.',
      },
      {
        title: 'Pengingat Terjadwal & Notifikasi Tim Real-Time',
        description:
          'Pengiriman pengingat H-1 ke WhatsApp pelanggan serta laporan ringkasan harian otomatis ke WhatsApp/Slack pemilik bisnis.',
      },
      {
        title: 'Penanganan Error & Peringatan Gagal Kirim',
        description:
          'Mekanisme coba-ulang otomatis (auto-retry) jika salah satu koneksi pihak ketiga sedang gangguan, lengkap dengan log pemantauan.',
      },
      {
        title: 'Dokumentasi Alur & Garansi Pemeliharaan 30 Hari',
        description:
          'Peta visual alur data yang mudah dipahami timmu beserta garansi perbaikan penuh selama 30 hari pertama.',
      },
    ],
    process: [
      {
        num: '01',
        duration: '30 Menit',
        title: 'Petakan daftar aplikasi & pekerjaan berulang',
        description:
          'Kita urutkan langkah-langkah manual yang dilakukan stafmu dari saat pesanan masuk hingga laporan selesai dibuat.',
      },
      {
        num: '02',
        duration: 'Hari ke-2–3',
        title: 'Rancang skema pemicu (trigger) & validasi data',
        description:
          'Kami tentukan aturan bersih: kapan alur otomatis menyala, data apa yang difilter, dan ke mana hasil akhirnya dikirim.',
      },
      {
        num: '03',
        duration: 'Minggu ke-1–2',
        title: 'Sambungkan API & uji coba dengan data sampel',
        description:
          'Kami merakit workflow di n8n/Node.js dan mengujinya dengan puluhan baris data transaksi untuk memastikan akurasi 100%.',
      },
      {
        num: '04',
        duration: 'Rilis & Pantau',
        title: 'Aktifkan otomatisasi & serah terima ke tim',
        description:
          'Alur berjalan otomatis di belakang layar. Stafmu langsung terbebas dari tugas salin-tempel dan fokus melayani pelanggan.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Klinik',
        scenarioTitle: 'Otomasi Pengingat Kontrol Pasien & Rekap Kunjungan Harian',
        workflowLines: [
          'Setiap kali staf menambahkan jadwal pasien di Google Sheets/Calendar, alur otomatis menyiapkan antrean pesan pengingat.',
          'Pada H-1 dan H-2 jam sebelum jadwal, sistem mengirim pesan konfirmasi kehadiran via WhatsApp ke nomor pasien.',
          'Setiap pukul 20.00, sistem merangkum total pasien hadir, batal, dan pendapatan harian lalu mengirimkannya ke WhatsApp pemilik klinik.',
        ],
        outcome: 'Contoh hasil: Angka pasien lupa datang (no-show) turun drastis tanpa admin harus mengirim chat satu per satu.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Rekap Otomatis Pesanan Pre-Order ke Daftar Belanja & Kurir',
        workflowLines: [
          'Pesanan yang masuk dari formulir web otomatis masuk ke baris Google Sheets utama dan dikelompokkan berdasarkan tanggal kirim.',
          'Sistem otomatis menjumlahkan total porsi per menu untuk tim dapur dan menghasilkan label alamat cetak untuk kurir.',
          'Begitu status di sheet diubah menjadi "Dikirim", pelanggan otomatis menerima pesan WhatsApp berisi estimasi jam tiba.',
        ],
        outcome: 'Contoh hasil: Koordinasi antara admin pesanan, dapur, dan kurir berjalan rapi tanpa salah kirim.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Properti',
        scenarioTitle: 'Distribusi Leads Iklan Instan & Pengingat Follow-Up Sales',
        workflowLines: [
          'Prospek baru yang mengisi formulir iklan Meta/Google langsung tercatat di CRM dan dibagikan bergiliran (round-robin) ke sales yang bertugas.',
          'Sales langsung menerima notifikasi WhatsApp berisi profil prospek beserta tautan satu-klik untuk menyapa calon pembeli.',
          'Jika dalam 2 jam status prospek belum diperbarui, sistem mengirim pengingat ke sales dan manajer pemasaran.',
        ],
        outcome: 'Contoh hasil: Setiap prospek iklan dihubungi saat minatnya masih tinggi, tidak ada lagi data iklan yang mengendap.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Jasa Profesional',
        scenarioTitle: 'Pembuatan Kontrak, Invoice & Pengingat Tagihan Otomatis',
        workflowLines: [
          'Saat status prospek di tabel diubah menjadi "Deal", sistem otomatis mengisi template draf kontrak dan invoice PDF sesuai data klien.',
          'Dokumen dikirim ke klien melalui email dan WhatsApp, sekaligus mencatat tanggal jatuh tempo di kalender keuangan.',
          'Tiga hari sebelum jatuh tempo, sistem mengirimkan pengingat pembayaran sopan secara otomatis.',
        ],
        outcome: 'Contoh hasil: Administrasi kontrak dan penagihan selesai dalam hitungan detik tanpa salah ketik nominal.',
      },
    ],
    stackChips: ['n8n', 'Node.js', 'WhatsApp Cloud API', 'PostgreSQL', 'Python'],
    pricingNote: {
      label: 'Dihitung setelah audit gratis',
      reason:
        'Biaya otomasi dihitung berdasarkan jumlah aplikasi yang disambungkan dan tingkat kerumitan cabang logika datanya, yang kami rincikan secara pasti setelah sesi audit gratis 30 menit.',
      scopeNote: 'Dapat di-host di server mandiri (self-hosted n8n) sehingga kamu bebas dari biaya langganan per-task yang mahal.',
    },
    faq: [
      {
        question: 'Apakah saya harus berhenti memakai Google Sheets atau aplikasi yang sudah ada?',
        answer:
          'Tidak perlu. Keunggulan otomasi workflow justru menyambungkan Google Sheets, kalender, atau sistem yang sudah akrab dipakai stafmu supaya datanya sinkron otomatis tanpa harus belajar software baru dari nol.',
      },
      {
        question: 'Kenapa memakai n8n dan Node.js dibanding langganan Zapier biasa?',
        answer:
          'Zapier mengenakan biaya bulanan dalam dolar yang cepat membengkak saat jumlah transaksi bisnismu naik. Dengan n8n dan Node.js yang bisa dipasang di server sendiri, biaya operasionalnya jauh lebih hemat untuk ribuan eksekusi harian.',
      },
      {
        question: 'Bagaimana kalau salah satu aplikasi yang disambungkan sedang error atau down?',
        answer:
          'Setiap alur yang kami bangun dilengkapi sistem penyimpanan antrean dan coba-ulang otomatis (auto-retry), serta mengirim peringatan ke admin jika ada koneksi yang membutuhkan perhatian.',
      },
      {
        question: 'Berapa lama waktu pengerjaan satu alur otomasi?',
        answer:
          'Untuk alur otomasi standar antar 2–4 aplikasi, pengerjaan memakan waktu sekitar 1–2 minggu termasuk tahap pengujian data nyata.',
      },
    ],
    relatedCaseSlugs: ['fnb-preorder-serpong', 'klinik-triage-bsd'],
    relatedPostSlugs: [
      'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
      'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    ],
    seo: {
      title: 'Jasa Otomasi Workflow Bisnis & n8n di BSD | CHESTAADOTCOM',
      description:
        'Sambungkan Google Sheets, WhatsApp, kalender, dan pembuatan invoice otomatis dengan layanan otomasi workflow (n8n & Node.js) di BSD City, Tangsel & Jabodetabek.',
    },
    imageKey: 'serviceOtomasiWorkflow',
  },
];

export function getAllServices(): ServiceItem[] {
  return SERVICES_DATA;
}

const LEGACY_SERVICE_SLUG_ALIASES: Record<string, ServiceSlug> = {
  'web-landing-page': 'pembuatan-website',
  'custom-web-development': 'pembuatan-website',
  'landing-page': 'pembuatan-website',
  'ai-integration': 'ai-agent',
  'whatsapp-ai-agent': 'ai-agent',
  'custom-software': 'software-custom',
  'workflow-automation': 'otomasi-workflow',
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

export function getServiceBySlug(slug?: string): ServiceItem | undefined {
  const canonical = resolveCanonicalServiceSlug(slug);
  if (!canonical) return undefined;
  return SERVICES_DATA.find((item) => item.slug === canonical);
}

export function getAdjacentServices(slug: ServiceSlug): {
  prev: ServiceItem;
  next: ServiceItem;
} {
  const index = SERVICES_DATA.findIndex((item) => item.slug === slug);
  const currentIdx = index === -1 ? 0 : index;
  const prevIdx = (currentIdx - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
  const nextIdx = (currentIdx + 1) % SERVICES_DATA.length;
  return {
    prev: SERVICES_DATA[prevIdx],
    next: SERVICES_DATA[nextIdx],
  };
}
