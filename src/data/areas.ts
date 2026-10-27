/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: data/areas — CHESTAADOTCOM
 * ============================================================================
 * 5 Indexable Areas (indexable: true):
 * - tangerang-selatan
 * - bsd-city
 * - pamulang
 * - jurang-mangu
 * - lebak-bulus
 *
 * 5 Prepared Non-Indexable Areas (indexable: false, noindex, out of sitemap/footer/hub):
 * - alam-sutera
 * - bintaro
 * - gading-serpong
 * - serpong
 * - ciputat
 */

import type { ServiceSlug } from './services';

export type IndexableAreaSlug =
  | 'tangerang-selatan'
  | 'bsd-city'
  | 'pamulang'
  | 'jurang-mangu'
  | 'lebak-bulus';

export type NonIndexableAreaSlug =
  | 'alam-sutera'
  | 'bintaro'
  | 'gading-serpong'
  | 'serpong'
  | 'ciputat';

export const NON_INDEXABLE_AREA_SLUGS: NonIndexableAreaSlug[] = [
  'alam-sutera',
  'bintaro',
  'gading-serpong',
  'serpong',
  'ciputat',
];

export type AreaSlug = IndexableAreaSlug | NonIndexableAreaSlug;

export interface AreaDefinition {
  slug: AreaSlug;
  name: string;
  nameEn: string;
  shortName: string;
  regionLabel: string;
  regionLabelEn: string;
  indexable: boolean;
  isBaseArea?: boolean;
  factsSummaryId: string;
  factsSummaryEn: string;
  typicalBusinessesId: string[];
  typicalBusinessesEn: string[];
  nearbySlugs: IndexableAreaSlug[];
  targetPhrases: {
    website: string[];
    aiAgent: string[];
  };
  ogImageKey: string;
}

export interface AreaQuickCheck {
  cocokKalau: string;
  mulaiDari: string;
  harga: string;
}

export interface LocalScenario {
  label: string; // "Contoh skenario" / "Example scenario"
  title: string;
  businessType: string;
  challenge: string;
  solution: string;
  expectedOutcome: string;
}

export interface LocalFAQ {
  question: string;
  answer: string;
}

export interface ProcessStepSummary {
  stepNumber: string;
  title: string;
  sentence: string;
}

export interface ServiceAreaPageData {
  serviceSlug: 'pembuatan-website' | 'ai-agent';
  serviceName: string;
  areaSlug: AreaSlug;
  areaName: string;
  indexable: boolean;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  quickSummary: string; // 40-60 words direct answer
  cekCepat: AreaQuickCheck;
  localContextHeading: string;
  localContextParagraphs: string[];
  businessMixList: string[];
  scenarios: [LocalScenario, LocalScenario];
  collaborationHeading: string;
  collaborationParagraphs: string[];
  processSteps: [
    ProcessStepSummary,
    ProcessStepSummary,
    ProcessStepSummary,
    ProcessStepSummary
  ];
  priceHeading: string;
  priceCopy: string;
  priceNote: {
    startingPrice: string;
    timeline: string;
    note: string;
  };
  relatedProjectSlugs: string[];
  relatedBlogSlug: string;
  faqs: [LocalFAQ, LocalFAQ, LocalFAQ];
  updatedAt: string;
  ogImageKey: string;
}

export const AREAS: Record<AreaSlug, AreaDefinition> = {
  'tangerang-selatan': {
    slug: 'tangerang-selatan',
    name: 'Tangerang Selatan',
    nameEn: 'South Tangerang',
    shortName: 'Tangsel',
    regionLabel: 'Kota Tangerang Selatan, Banten',
    regionLabelEn: 'South Tangerang City, Banten',
    indexable: true,
    isBaseArea: true,
    factsSummaryId:
      'Kota di Provinsi Banten yang berbatasan dengan Jakarta Selatan, Depok, Kota Tangerang, dan Kabupaten Tangerang, terdiri dari tujuh kecamatan dengan campuran kawasan perumahan, kampus, dan pusat komersial.',
    factsSummaryEn:
      'A city in Banten Province bordering South Jakarta, Depok, Tangerang City, and Tangerang Regency, spanning seven districts with a mix of residential neighborhoods, university campuses, and commercial centers.',
    typicalBusinessesId: [
      'Praktik dokter dan klinik kesehatan',
      'Klinik kecantikan dan perawatan',
      'Kafe dan restoran',
      'Bimbingan belajar (bimbel)',
      'Agen dan pengembang properti',
      'Jasa profesional',
      'Toko online UMKM',
    ],
    typicalBusinessesEn: [
      'Medical practices and health clinics',
      'Beauty and aesthetic clinics',
      'Cafes and restaurants',
      'Tutoring centers (bimbel)',
      'Property agents and developers',
      'Professional services',
      'SME online stores',
    ],
    nearbySlugs: ['bsd-city', 'pamulang', 'jurang-mangu', 'lebak-bulus'],
    targetPhrases: {
      website: [
        'jasa pembuatan website Tangerang Selatan',
        'website untuk bisnis di Tangsel',
      ],
      aiAgent: ['AI agent untuk bisnis di Tangerang Selatan'],
    },
    ogImageKey: 'ogAreaTangerangSelatan',
  },

  'bsd-city': {
    slug: 'bsd-city',
    name: 'BSD City',
    nameEn: 'BSD City',
    shortName: 'BSD',
    regionLabel: 'BSD City, Serpong, Tangerang Selatan',
    regionLabelEn: 'BSD City, Serpong, South Tangerang',
    indexable: true,
    isBaseArea: true,
    factsSummaryId:
      'Kawasan kota mandiri di Serpong, Tangerang Selatan dengan pusat belanja seperti AEON Mall BSD City dan The Breeze, kawasan perkantoran, serta ICE BSD sebagai pusat pameran.',
    factsSummaryEn:
      'A planned township in Serpong, South Tangerang featuring shopping centers such as AEON Mall BSD City and The Breeze, office districts, and the ICE BSD exhibition center.',
    typicalBusinessesId: [
      'Klinik estetika',
      'Restoran dan kafe',
      'Kantor dan startup',
      'Agen properti',
      'Studio arsitektur dan kontraktor',
    ],
    typicalBusinessesEn: [
      'Aesthetic clinics',
      'Restaurants and cafes',
      'Offices and startups',
      'Property agents',
      'Architecture studios and contractors',
    ],
    nearbySlugs: ['tangerang-selatan', 'pamulang', 'jurang-mangu'],
    targetPhrases: {
      website: [
        'jasa pembuatan website BSD City',
        'website untuk klinik dan restoran di BSD',
      ],
      aiAgent: ['AI agent WhatsApp untuk bisnis di BSD City'],
    },
    ogImageKey: 'ogAreaBsdCity',
  },

  pamulang: {
    slug: 'pamulang',
    name: 'Pamulang',
    nameEn: 'Pamulang',
    shortName: 'Pamulang',
    regionLabel: 'Kecamatan Pamulang, Tangerang Selatan',
    regionLabelEn: 'Pamulang District, South Tangerang',
    indexable: true,
    factsSummaryId:
      'Kecamatan padat penduduk di Tangerang Selatan tempat Universitas Pamulang berada, dengan banyak usaha kos-kosan, tempat makan, bimbel dan kursus, toko online, bengkel, dan laundry.',
    factsSummaryEn:
      'A densely populated district in South Tangerang home to Universitas Pamulang, with many boarding houses, eateries, tutoring and course centers, online shops, workshops, and laundries.',
    typicalBusinessesId: [
      'Usaha kos-kosan',
      'Tempat makan dan kuliner harian',
      'Bimbel dan tempat kursus',
      'Toko online dan reseller',
      'Bengkel dan layanan servis',
      'Usaha laundry',
    ],
    typicalBusinessesEn: [
      'Boarding houses (kos-kosan)',
      'Eateries and daily food stalls',
      'Tutoring and course centers',
      'Online shops and resellers',
      'Workshops and repair services',
      'Laundry businesses',
    ],
    nearbySlugs: ['tangerang-selatan', 'bsd-city', 'lebak-bulus', 'jurang-mangu'],
    targetPhrases: {
      website: [
        'jasa pembuatan website Pamulang',
        'website untuk usaha kos-kosan di Pamulang',
      ],
      aiAgent: ['AI agent WhatsApp untuk bisnis di Pamulang'],
    },
    ogImageKey: 'ogAreaPamulang',
  },

  'jurang-mangu': {
    slug: 'jurang-mangu',
    name: 'Jurang Mangu',
    nameEn: 'Jurang Mangu',
    shortName: 'Jurang Mangu',
    regionLabel: 'Kelurahan Jurang Mangu, Pondok Aren, Tangerang Selatan',
    regionLabelEn: 'Jurang Mangu Subdistrict, Pondok Aren, South Tangerang',
    indexable: true,
    factsSummaryId:
      'Kelurahan di Kecamatan Pondok Aren, Tangerang Selatan di sekitar kawasan Bintaro, berupa permukiman padat dengan praktik dokter, kuliner, jasa renovasi, dan kursus.',
    factsSummaryEn:
      'A subdistrict in Pondok Aren, South Tangerang around the Bintaro area, featuring dense residential neighborhoods with medical practices, food businesses, renovation services, and courses.',
    typicalBusinessesId: [
      'Praktik dokter dan dokter gigi',
      'Kuliner rumahan dan kafe',
      'Jasa renovasi dan kontraktor',
      'Tempat kursus dan les',
    ],
    typicalBusinessesEn: [
      'Medical and dental practices',
      'Home-based food businesses and cafes',
      'Renovation services and contractors',
      'Courses and private lessons',
    ],
    nearbySlugs: ['tangerang-selatan', 'pamulang', 'lebak-bulus', 'bsd-city'],
    targetPhrases: {
      website: [
        'jasa pembuatan website Jurang Mangu',
        'website untuk jasa renovasi di Jurang Mangu',
      ],
      aiAgent: ['AI agent untuk klinik dan praktik dokter di Jurang Mangu'],
    },
    ogImageKey: 'ogAreaJurangMangu',
  },

  'lebak-bulus': {
    slug: 'lebak-bulus',
    name: 'Lebak Bulus',
    nameEn: 'Lebak Bulus',
    shortName: 'Lebak Bulus',
    regionLabel: 'Kelurahan Lebak Bulus, Cilandak, Jakarta Selatan',
    regionLabelEn: 'Lebak Bulus Subdistrict, Cilandak, South Jakarta',
    indexable: true,
    factsSummaryId:
      'Kelurahan di Kecamatan Cilandak, Jakarta Selatan di sisi barat daya Jakarta dekat perbatasan Tangerang Selatan; lokasi Stasiun MRT Jakarta Lebak Bulus dengan banyak komuter, kafe, jasa profesional, dan bisnis online.',
    factsSummaryEn:
      'A subdistrict in Cilandak, South Jakarta on the southwestern edge of Jakarta near the South Tangerang border; home to Lebak Bulus MRT Jakarta Station with many commuters, cafes, professional services, and online businesses.',
    typicalBusinessesId: [
      'Kafe dan usaha katering',
      'Konsultan dan jasa profesional',
      'Bisnis online',
      'Jasa servis dan klinik sekitar permukiman',
    ],
    typicalBusinessesEn: [
      'Cafes and catering businesses',
      'Consultants and professional services',
      'Online businesses',
      'Repair services and neighborhood clinics',
    ],
    nearbySlugs: ['pamulang', 'jurang-mangu', 'tangerang-selatan'],
    targetPhrases: {
      website: [
        'jasa pembuatan website Lebak Bulus',
        'website untuk kafe dan jasa profesional di Lebak Bulus',
      ],
      aiAgent: ['AI agent WhatsApp untuk bisnis di Lebak Bulus'],
    },
    ogImageKey: 'ogAreaLebakBulus',
  },

  // ==========================================================================
  // 5 NON-INDEXABLE AREAS (indexable: false)
  // ==========================================================================
  'alam-sutera': {
    slug: 'alam-sutera',
    name: 'Alam Sutera',
    nameEn: 'Alam Sutera',
    shortName: 'Alam Sutera',
    regionLabel: 'Alam Sutera, Serpong Utara',
    regionLabelEn: 'Alam Sutera, North Serpong',
    indexable: false,
    factsSummaryId: 'Kawasan hunian dan komersial di sekitar Serpong Utara dan Tangerang.',
    factsSummaryEn: 'Residential and commercial area around North Serpong and Tangerang.',
    typicalBusinessesId: ['Klinik', 'Restoran', 'Jasa profesional'],
    typicalBusinessesEn: ['Clinics', 'Restaurants', 'Professional services'],
    nearbySlugs: ['bsd-city', 'tangerang-selatan'],
    targetPhrases: { website: [], aiAgent: [] },
    ogImageKey: 'ogDefault',
  },

  bintaro: {
    slug: 'bintaro',
    name: 'Bintaro',
    nameEn: 'Bintaro',
    shortName: 'Bintaro',
    regionLabel: 'Bintaro, Pondok Aren, Tangerang Selatan',
    regionLabelEn: 'Bintaro, Pondok Aren, South Tangerang',
    indexable: false,
    factsSummaryId: 'Kawasan permukiman dan niaga di Pondok Aren, Tangerang Selatan.',
    factsSummaryEn: 'Residential and commercial area in Pondok Aren, South Tangerang.',
    typicalBusinessesId: ['Klinik', 'Kafe', 'Jasa renovasi'],
    typicalBusinessesEn: ['Clinics', 'Cafes', 'Renovation services'],
    nearbySlugs: ['jurang-mangu', 'tangerang-selatan', 'bsd-city'],
    targetPhrases: { website: [], aiAgent: [] },
    ogImageKey: 'ogDefault',
  },

  'gading-serpong': {
    slug: 'gading-serpong',
    name: 'Gading Serpong',
    nameEn: 'Gading Serpong',
    shortName: 'Gading Serpong',
    regionLabel: 'Gading Serpong, Tangerang',
    regionLabelEn: 'Gading Serpong, Tangerang',
    indexable: false,
    factsSummaryId: 'Kawasan komersial dan perumahan di dekat Serpong, Tangerang Selatan.',
    factsSummaryEn: 'Commercial and residential area near Serpong, South Tangerang.',
    typicalBusinessesId: ['Restoran', 'Klinik', 'Toko ritel'],
    typicalBusinessesEn: ['Restaurants', 'Clinics', 'Retail shops'],
    nearbySlugs: ['bsd-city', 'tangerang-selatan'],
    targetPhrases: { website: [], aiAgent: [] },
    ogImageKey: 'ogDefault',
  },

  serpong: {
    slug: 'serpong',
    name: 'Serpong',
    nameEn: 'Serpong',
    shortName: 'Serpong',
    regionLabel: 'Kecamatan Serpong, Tangerang Selatan',
    regionLabelEn: 'Serpong District, South Tangerang',
    indexable: false,
    factsSummaryId: 'Kecamatan di Kota Tangerang Selatan yang mencakup kawasan perumahan dan niaga.',
    factsSummaryEn: 'District in South Tangerang City covering residential and commercial areas.',
    typicalBusinessesId: ['Klinik', 'Kafe', 'Jasa profesional'],
    typicalBusinessesEn: ['Clinics', 'Cafes', 'Professional services'],
    nearbySlugs: ['bsd-city', 'tangerang-selatan', 'pamulang'],
    targetPhrases: { website: [], aiAgent: [] },
    ogImageKey: 'ogDefault',
  },

  ciputat: {
    slug: 'ciputat',
    name: 'Ciputat',
    nameEn: 'Ciputat',
    shortName: 'Ciputat',
    regionLabel: 'Kecamatan Ciputat, Tangerang Selatan',
    regionLabelEn: 'Ciputat District, South Tangerang',
    indexable: false,
    factsSummaryId: 'Kecamatan di Kota Tangerang Selatan yang berbatasan dekat dengan Jakarta Selatan.',
    factsSummaryEn: 'District in South Tangerang City bordering South Jakarta.',
    typicalBusinessesId: ['Kuliner', 'Bimbel', 'Toko online'],
    typicalBusinessesEn: ['Food stalls', 'Tutoring', 'Online shops'],
    nearbySlugs: ['pamulang', 'tangerang-selatan', 'lebak-bulus', 'jurang-mangu'],
    targetPhrases: { website: [], aiAgent: [] },
    ogImageKey: 'ogDefault',
  },
};

export const INDEXABLE_AREA_SLUGS: IndexableAreaSlug[] = [
  'tangerang-selatan',
  'bsd-city',
  'pamulang',
  'jurang-mangu',
  'lebak-bulus',
];

// ============================================================================
// INDONESIAN AREA PAGES (10 INDEXABLE PAGES WITH 650+ WORDS EACH + 10 PREPARED)
// ============================================================================
export const SERVICE_AREA_PAGES_ID: ServiceAreaPageData[] = [
  // 1A. PEMBUATAN WEBSITE — TANGERANG SELATAN
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan website dan landing page',
    areaSlug: 'tangerang-selatan',
    areaName: 'Tangerang Selatan',
    indexable: true,
    eyebrow: 'Pembuatan website · Tangerang Selatan',
    metaTitle: 'Jasa Pembuatan Website di Tangerang Selatan | CHESTAADOTCOM',
    metaDescription:
      'Pembuatan website dan landing page untuk klinik, kafe, bimbel, dan bisnis di Tangerang Selatan. Cepat dibuka di HP, siap iklan, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Tangerang Selatan',
    quickSummary:
      'Layanan jasa pembuatan website Tangerang Selatan dari CHESTAADOTCOM membantu praktik dokter, klinik kecantikan, kafe, bimbel, properti, jasa profesional, dan toko online UMKM memiliki halaman yang cepat dibuka di HP dan jelas menawarkan apa. Harga mulai Rp1.200.000 tergantung kompleksitas, dengan proses kerja online maupun tatap muka sesuai kesepakatan.',
    cekCepat: {
      cocokKalau:
        'Kamu menjalankan bisnis di wilayah Tangerang Selatan yang ingin calon pelanggan langsung menghubungi lewat WhatsApp atau melakukan booking tanpa bingung mencari informasi.',
      mulaiDari:
        'Audit gratis 30 menit untuk melihat halaman yang sudah ada, tujuan bisnismu, dan pesaing di sekitarmu sebelum kamu membayar apa pun.',
      harga:
        'Landing page mulai Rp1.200.000 tergantung kompleksitas; company profile dan web custom dihitung setelah audit gratis.',
    },
    localContextHeading: 'Kenapa bisnis di Tangerang Selatan butuh website yang jelas dan cepat',
    localContextParagraphs: [
      'Tangerang Selatan adalah kota di Provinsi Banten yang berbatasan langsung dengan Jakarta Selatan, Depok, Kota Tangerang, dan Kabupaten Tangerang. Wilayahnya terbagi ke dalam tujuh kecamatan—Serpong, Serpong Utara, Setu, Pamulang, Ciputat, Ciputat Timur, dan Pondok Aren—yang membentuk campuran kawasan perumahan, kampus, dan pusat komersial. Karena letaknya yang saling terhubung, warga umumnya mencari layanan harian maupun jasa profesional langsung dari layar HP saat sedang berada di rumah atau dalam perjalanan.',
      'Di ketujuh kecamatan tersebut, umumnya tumbuh berbagai jenis usaha seperti praktik dokter dan klinik, klinik kecantikan, kafe dan restoran, bimbingan belajar, agen properti, jasa profesional, hingga toko online UMKM. Ketika seseorang mencari layanan di Google atau mengklik iklan media sosial, mereka biasanya membandingkan beberapa pilihan dalam waktu singkat. Jika halaman yang dibuka lambat, tulisannya berputar-putar, atau nomor kontaknya sulit ditemukan, calon pelanggan cenderung langsung menutup halaman tersebut.',
      'Membangun website untuk bisnis di Tangsel bukan soal membuat tampilan yang rumit, melainkan menyusun informasi agar pertanyaan utama calon pelanggan terjawab sebelum mereka bertanya. Halaman yang statis, ringan, dan rapi di HP membantu pengunjung memahami layanan apa yang kamu tawarkan, berapa kisaran harganya, di mana lokasimu, dan tombol mana yang harus ditekan untuk memesan jadwal atau berkonsultasi lewat WhatsApp.',
    ],
    businessMixList: [
      'Praktik dokter, dokter gigi, dan klinik kesehatan keluarga di kawasan perumahan',
      'Klinik kecantikan dan perawatan yang mengandalkan booking jadwal',
      'Kafe dan restoran yang membutuhkan halaman menu, jam buka, dan peta lokasi',
      'Lembaga bimbingan belajar (bimbel) dan kursus di sekitar kawasan kampus dan sekolah',
      'Agen properti, jasa profesional, dan toko online UMKM di tujuh kecamatan Tangerang Selatan',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Kafe baru yang dicari lewat peta dan media sosial',
        businessType: 'Kafe & Tempat Makan di Tangerang Selatan',
        challenge:
          'Orang biasanya mencari kafe terdekat di Google Maps lalu memeriksa Instagram sebelum memutuskan datang. Sering kali calon pengunjung batal mampir karena daftar menu, kisaran harga, jam buka, dan titik peta tersebar di banyak unggahan yang sulit dibuka di HP.',
        solution:
          'Satu website kecil yang ringan berisi daftar menu yang mudah dibaca di layar HP, jam buka terkini, penunjuk peta, serta tombol WhatsApp untuk tanya ketersediaan tempat atau pesan lebih dulu.',
        expectedOutcome:
          'Halaman tersebut menjawab ketiga hal yang dicari pengunjung sekaligus, sehingga orang yang menemukan kafe di peta bisa langsung datang atau menghubungi lewat WhatsApp.',
      },
      {
        label: 'Contoh skenario',
        title: 'Praktik dokter gigi dengan halaman per layanan',
        businessType: 'Praktik Dokter Gigi & Klinik di Tangerang Selatan',
        challenge:
          'Calon pasien yang ingin periksa gigi umumnya ingin tahu kisaran biaya scaling atau pemasangan behel serta jam praktik dokter sebelum menghubungi admin klinik.',
        solution:
          'Website dengan halaman terpisah per layanan (seperti scaling, tambal, atau behel) yang memuat penjelasan tindakan, harga mulai dari, jadwal praktik, dan tombol booking via WhatsApp.',
        expectedOutcome:
          'Calon pasien mendapatkan gambaran biaya dan jadwal yang jelas sejak awal, lalu mengirim pesan WhatsApp dengan pilihan layanan yang sudah spesifik.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Tangerang Selatan',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani bisnis di seluruh Tangerang Selatan serta Jabodetabek. Pekerjaan sehari-hari seperti pengiriman materi, diskusi struktur halaman, dan peninjauan prototipe kami jalankan secara online lewat WhatsApp dan video call supaya praktis bagi waktumu.',
      'Apabila kamu lebih nyaman berdiskusi secara langsung untuk membahas alur bisnis di awal proyek, pertemuan tatap muka di area Tangerang Selatan bisa dijadwalkan sesuai kesepakatan bersama. Setiap proyek dikerjakan langsung oleh Chesta Azka (arsitektur, produk, teknologi) dan Zeeshan (operasional dan client success) melalui empat langkah kerja yang terukur.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami melihat tujuan bisnismu di Tangerang Selatan, memeriksa halaman atau media sosial yang sudah ada, dan memetakan pesaing di sekitarmu.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau susunan halaman, tulisan penawaran, dan tampilan awalnya terlebih dahulu sebelum website dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Website dibangun secara statis agar cepat, gambarnya dioptimasi, lalu diuji langsung di layar HP serta di PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman tayang di atas domain dan hosting milikmu sendiri, lalu dipantau dan disesuaikan setelah data pengunjung mulai masuk.',
      },
    ],
    priceHeading: 'Harga dan cakupan pembuatan website di Tangerang Selatan',
    priceCopy:
      'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas. Biaya naik kalau jumlah halaman, fitur (misalnya booking atau pembayaran), atau integrasi bertambah. Angka pastinya kami sampaikan setelah audit gratis 30 menit, sebelum kamu membayar apa pun. Landing page sederhana biasanya selesai dalam hitungan hari, sedangkan website dengan banyak halaman atau fitur membutuhkan hitungan minggu. Domain dan hosting didaftarkan atas namamu sendiri.',
    priceNote: {
      startingPrice: 'Mulai Rp1.200.000',
      timeline: 'Hitungan hari untuk landing page sederhana; estimasi pasti setelah audit',
      note: 'Domain dan hosting terdaftar atas namamu sendiri.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    faqs: [
      {
        question: 'Apakah harga untuk bisnis di Tangerang Selatan berbeda?',
        answer:
          'Tidak berbeda. Pembuatan website dan landing page tetap mulai dari Rp1.200.000, tergantung kompleksitas halaman dan fitur yang kamu butuhkan. Rincian biayanya kami sampaikan secara terbuka setelah audit gratis 30 menit, sebelum kamu membayar apa pun.',
      },
      {
        question: 'Apakah kita harus bertemu langsung?',
        answer:
          'Tidak wajib. Seluruh proses mulai dari audit, peninjauan rancangan, hingga rilis bisa dijalankan secara online lewat WhatsApp dan video call, atau tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Siapa yang memegang domain dan akses hosting setelah website selesai?',
        answer:
          'Domain dan hosting didaftarkan langsung atas namamu sehingga sepenuhnya menjadi milikmu. Akses kami hanya sebatas yang diperlukan untuk membangun serta merawat sistem, dan akses tersebut dicabut saat proyek atau kontrak rawat berakhir.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaTangerangSelatan',
  },

  // 1B. AI AGENT — TANGERANG SELATAN
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'tangerang-selatan',
    areaName: 'Tangerang Selatan',
    indexable: true,
    eyebrow: 'AI agent · Tangerang Selatan',
    metaTitle: 'Jasa AI Agent Bisnis di Tangerang Selatan | CHESTAADOTCOM',
    metaDescription:
      'AI agent untuk bisnis di Tangerang Selatan: balas WhatsApp, cek jadwal klinik atau bimbel, buat booking, dan follow-up otomatis. Audit gratis 30 menit.',
    h1: 'Jasa AI agent untuk bisnis di Tangerang Selatan',
    quickSummary:
      'Layanan AI agent untuk bisnis di Tangerang Selatan dari CHESTAADOTCOM membantu klinik kecantikan, praktik dokter, bimbel, kafe, properti, dan UMKM membalas pesan WhatsApp, mengecek jadwal di kalender, serta mencatat data ke database atau spreadsheet secara otomatis. Dilengkapi batas tindakan dan serah ke staf manusia, dengan biaya yang dihitung setelah audit gratis 30 menit.',
    cekCepat: {
      cocokKalau:
        'Timmu di Tangerang Selatan setiap hari menjawab pertanyaan chat yang sama berulang kali, sering menerima pesan malam hari, atau masih menyalin data booking dari WhatsApp ke spreadsheet secara manual.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan percakapan berulang di bisnismu dan menentukan alur mana yang layak diserahkan ke agent.',
      harga:
        'Biaya dihitung setelah audit gratis 30 menit sesuai jumlah tool, aturan bisnis, dan volume pesan, sebelum kamu membayar apa pun.',
    },
    localContextHeading: 'Kenapa bisnis di Tangerang Selatan butuh AI agent yang bisa bertindak',
    localContextParagraphs: [
      'Di Kota Tangerang Selatan yang mencakup tujuh kecamatan—Serpong, Serpong Utara, Setu, Pamulang, Ciputat, Ciputat Timur, dan Pondok Aren—sebagian besar komunikasi antara warga dan pelaku usaha berlangsung lewat WhatsApp. Baik di kawasan perumahan, sekitar kampus, maupun pusat komersial, calon pelanggan umumnya mengirim pesan di luar jam kerja kantor, misalnya sepulang kerja atau pada malam hari ketika admin sudah beristirahat.',
      'Bisnis seperti klinik kecantikan, praktik dokter, bimbingan belajar, kafe, agen properti, dan toko online UMKM biasanya menghadapi pola pertanyaan harian yang serupa: menanyakan ketersediaan jam layanan, rincian biaya, kuota kelas, atau jadwal survei. Ketika pesan baru terbalas keesokan paginya, sebagian calon pelanggan sudah berpindah ke tempat lain. Di sisi lain, admin juga menghabiskan banyak waktu untuk menyalin nama, nomor telepon, dan pilihan jadwal dari chat ke dalam spreadsheet satu per satu.',
      'Berbeda dari chatbot biasa yang hanya membalas dari daftar jawaban kaku, AI agent memahami maksud percakapan pelanggan, memakai tool seperti kalender, database, atau CRM, lalu mengerjakan tugasnya sampai tuntas. Jika pelanggan menanyakan hal di luar aturan atau membutuhkan penanganan khusus manusia, agent langsung menyerahkan percakapan tersebut ke stafmu lengkap dengan ringkasan konteksnya.',
    ],
    businessMixList: [
      'Klinik kecantikan dan praktik dokter yang melayani booking jadwal perawatan harian',
      'Lembaga bimbingan belajar (bimbel) dan kursus yang menerima pendaftaran siswa baru',
      'Kafe, restoran, dan toko online UMKM dengan pertanyaan menu serta pesanan berulang',
      'Agen properti dan jasa profesional di wilayah Tangerang Selatan',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Klinik kecantikan yang menerima chat booking di malam hari',
        businessType: 'Klinik Kecantikan di Tangerang Selatan',
        challenge:
          'Calon pasien sering mengirim pesan malam hari seperti "besok jam 4 bisa facial?" saat admin klinik sudah selesai bertugas, sehingga pesan baru terjawab esok pagi dan jadwal terapis harus dicek manual.',
        solution:
          'AI agent yang terhubung ke WhatsApp Business dan kalender terapis untuk menjawab pertanyaan perawatan, memeriksa slot kosong pada jam yang diminta, membuat booking, mencatatnya di CRM, dan mengirim pengingat H-1.',
        expectedOutcome:
          'Pesan malam hari langsung terlayani sampai jadwal terkunci di kalender, sementara staf klinik cukup melihat daftar booking yang sudah tercatat rapi keesokan paginya.',
      },
      {
        label: 'Contoh skenario',
        title: 'Bimbingan belajar (bimbel) saat musim pendaftaran kelas baru',
        businessType: 'Bimbingan Belajar di Tangerang Selatan',
        challenge:
          'Orang tua dan calon siswa menanyakan jadwal kelas, rincian biaya per jenjang, dan sisa kuota secara bersamaan di WhatsApp, membuat admin kewalahan mengumpulkan data pendaftar satu per satu.',
        solution:
          'AI agent yang menjawab jadwal, biaya, dan kuota kelas sesuai aturan terbaru, mengumpulkan data siswa dari percakapan, mencatatnya ke tabel pendaftaran, lalu menyerahkan ke admin untuk proses konfirmasi pembayaran.',
        expectedOutcome:
          'Calon pendaftar mendapat informasi kelas dengan cepat dan admin menerima data siswa yang sudah lengkap untuk tahap pembayaran.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Tangerang Selatan',
    collaborationParagraphs: [
      'Karena CHESTAADOTCOM berbasis di BSD, Tangerang Selatan, kami melayani bisnis di seluruh kecamatan Tangerang Selatan dan Jabodetabek dengan alur komunikasi yang ringkas. Diskusi pemetaan aturan, pengujian percakapan, hingga pemantauan log dapat dilakukan secara online melalui WhatsApp dan video call.',
      'Jika diperlukan diskusi langsung untuk memetakan alur kerja tim adminmu di lapangan, kami juga dapat bertemu tatap muka di area Tangerang Selatan sesuai kesepakatan. Pengalaman kami mencakup sistem chat berbasis AI, API gateway pintar, dan pemroses dokumen berbasis AI, yang kami terapkan melalui empat langkah kerja berikut.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan percakapan dan tugas berulang di bisnismu, lalu menyampaikan secara jujur mana yang layak diserahkan ke agent dan mana yang sebaiknya tetap ditangani manusia.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu memeriksa contoh alur percakapan serta daftar aturan tindakan yang boleh dan tidak boleh dilakukan agent sebelum sistem dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Agent dihubungkan ke WhatsApp Business serta tool yang kamu pakai, lalu diuji menggunakan percakapan nyata termasuk pertanyaan sulit dan permintaan di luar aturan.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Setelah berjalan, kami memantau log tindakan, memperbaiki jawaban yang kurang tepat, dan menyesuaikan aturan seiring pemakaian timmu.',
      },
    ],
    priceHeading: 'Harga dan cakupan AI agent di Tangerang Selatan',
    priceCopy:
      'Biaya AI agent dihitung setelah audit gratis 30 menit, karena bergantung pada jumlah tool yang terhubung (seperti kalender, spreadsheet, atau database), banyaknya aturan bisnis, dan volume pesan harian. Kamu menerima rincian angka dan cakupan kerjanya sebelum membayar apa pun. Pembuatan sistem dan AI agent umumnya memakan waktu dalam hitungan minggu, dengan estimasi waktu pasti yang kami sampaikan setelah audit.',
    priceNote: {
      startingPrice: 'Dihitung setelah audit gratis',
      timeline: 'Hitungan minggu; estimasi pasti setelah audit 30 menit',
      note: 'Data bisnismu tetap milikmu; akses dicabut saat proyek atau kontrak rawat berakhir.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Apakah AI agent cocok untuk bisnis kecil dengan satu atau dua admin?',
        answer:
          'Cocok kalau satu atau dua admin tersebut setiap hari harus menjawab pertanyaan yang sama berulang kali dan menyalin data chat ke spreadsheet secara manual. Namun kalau pesan yang masuk hanya beberapa per hari dan semuanya butuh sentuhan pribadi, agent belum diperlukan dan kami akan menyampaikan itu terus terang saat audit.',
      },
      {
        question: 'Dari mana sebaiknya mulai kalau belum punya sistem apa pun?',
        answer:
          'Sebaiknya mulai dari satu alur yang paling sering menyita waktu dulu, misalnya balasan WhatsApp dan pencatatan booking ke kalender atau spreadsheet. Setelah alur pertama tersebut berjalan stabil dan timmu terbiasa memeriksa lognya, barulah aturan atau tool lain ditambahkan secara bertahap.',
      },
      {
        question: 'Bagaimana keamanan data pelanggan di Tangerang Selatan yang masuk lewat agent?',
        answer:
          'Data pelanggan sepenuhnya tetap menjadi milikmu. Kami hanya mengakses bagian yang diperlukan untuk membangun dan merawat sistem, serta mencabut akses tersebut ketika proyek atau kontrak rawat berakhir.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaTangerangSelatan',
  },

  // 2A. PEMBUATAN WEBSITE — BSD CITY
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan website dan landing page',
    areaSlug: 'bsd-city',
    areaName: 'BSD City',
    indexable: true,
    eyebrow: 'Pembuatan website · BSD City',
    metaTitle: 'Jasa Pembuatan Website Bisnis di BSD City | CHESTAADOTCOM',
    metaDescription:
      'Pembuatan website dan landing page untuk klinik estetika, restoran, properti, dan kantor di BSD City, Serpong. Cepat di HP, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di BSD City',
    quickSummary:
      'Layanan jasa pembuatan website BSD City dari CHESTAADOTCOM dirancang untuk klinik estetika, restoran, kantor, startup, agen properti, dan studio arsitektur di kawasan Serpong, Tangerang Selatan. Setiap halaman dibuat cepat dibuka di HP, jelas menampilkan penawaran, dan mengarahkan pengunjung ke booking atau WhatsApp. Harga mulai Rp1.200.000 tergantung kompleksitas.',
    cekCepat: {
      cocokKalau:
        'Bisnismu di BSD City sudah menjalankan iklan atau sering dicari di Google, tetapi pengunjung pergi karena belum ada halaman yang langsung menjawab pertanyaan mereka.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa halaman lama, penawaran utama, dan pesaing di sekitar BSD City.',
      harga:
        'Landing page mulai Rp1.200.000 tergantung kompleksitas; company profile dan web custom dihitung setelah audit gratis.',
    },
    localContextHeading: 'Kenapa bisnis di BSD City butuh halaman yang cepat dan langsung ke inti',
    localContextParagraphs: [
      'BSD City merupakan kawasan kota mandiri di Serpong, Tangerang Selatan yang berkembang dengan pusat belanja seperti AEON Mall BSD City dan The Breeze, kawasan perkantoran, serta ICE BSD sebagai pusat pameran. Di dalam kawasan ini, umumnya beroperasi banyak klinik estetika, restoran, kantor dan startup, agen properti, hingga studio arsitektur maupun kontraktor yang melayani warga serta pengunjung dari berbagai wilayah Jabodetabek.',
      'Karena banyaknya pilihan usaha sejenis di satu kawasan yang berdekatan, calon pelanggan di BSD City biasanya membandingkan beberapa penyedia jasa lewat HP sebelum memutuskan untuk berkunjung atau mengirim pesan. Saat mereka mengklik iklan atau hasil pencarian lalu mendapati halaman yang lambat dimuat, tidak mencantumkan kisaran harga, atau menyembunyikan cara pemesanan di balik banyak langkah, mereka umumnya langsung berpindah ke pilihan berikutnya.',
      'Merancang website untuk klinik dan restoran di BSD maupun studio jasa profesional membutuhkan struktur yang lugas: halaman dibuat statis agar cepat dibuka di jaringan seluler, gambar dikompres dengan ukuran yang tepat, dan setiap halaman punya satu tujuan aksi yang jelas. Dengan begitu, pengunjung bisa langsung melihat daftar perawatan, menu, atau portofolio proyek dan segera menghubungi timmu lewat WhatsApp.',
    ],
    businessMixList: [
      'Klinik estetika dan perawatan yang membutuhkan halaman per tindakan beserta jadwal praktik',
      'Restoran dan kafe di sekitar pusat komersial BSD City yang membutuhkan halaman menu dan reservasi',
      'Studio arsitektur, kontraktor, dan konsultan dengan kebutuhan galeri portofolio dan alur kerja',
      'Agen properti serta kantor dan startup di kawasan perkantoran BSD City',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Klinik estetika dengan halaman per perawatan dan tombol booking',
        businessType: 'Klinik Estetika di BSD City',
        challenge:
          'Calon pasien yang melihat iklan perawatan wajah atau tubuh ingin mengetahui apa saja tahapan tindakan, harga mulai dari, dan jam praktik sebelum menghubungi admin klinik.',
        solution:
          'Landing page terpisah untuk tiap jenis perawatan yang memuat penjelasan ringkas, informasi harga mulai dari, jadwal praktik, tombol booking via WhatsApp, serta dokumentasi foto sebelum-sesudah yang dipasang hanya dengan izin tertulis dari pasien.',
        expectedOutcome:
          'Pengunjung iklan langsung memahami layanan yang ditawarkan dan menekan tombol WhatsApp dengan tujuan booking perawatan yang jelas.',
      },
      {
        label: 'Contoh skenario',
        title: 'Studio arsitektur atau kontraktor dengan alur konsultasi yang jelas',
        businessType: 'Studio Arsitektur & Kontraktor di BSD City',
        challenge:
          'Calon klien yang ingin merenovasi atau membangun properti biasanya perlu melihat portofolio proyek dan memahami tahapan kerja studio sebelum bersedia menjadwalkan diskusi awal.',
        solution:
          'Website company profile dengan galeri portofolio proyek yang gambarnya sudah dioptimasi agar tetap ringan di HP, penjelasan tahapan kerja dari awal hingga serah terima, serta formulir konsultasi yang langsung terhubung ke WhatsApp.',
        expectedOutcome:
          'Calon klien memahami cara kerja studio sebelum menghubungi, sehingga pesan yang masuk sudah berisi kebutuhan proyek yang terarah.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di BSD City',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis langsung di BSD, Tangerang Selatan. Kami melayani klien secara online melalui WhatsApp dan video call untuk koordinasi harian, pengiriman materi, dan peninjauan rancangan, serta dapat bertemu tatap muka di area Tangerang Selatan—termasuk di BSD City—sesuai kesepakatan.',
      'Seluruh pengerjaan ditangani oleh Chesta Azka (arsitektur, produk, teknologi) dan Zeeshan (operasional dan client success) tanpa perantara berlapis, mengikuti empat tahapan kerja yang transparan dari awal hingga rilis.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami mempelajari tujuan bisnismu di BSD City, memeriksa halaman atau materi yang sudah ada, dan melihat halaman pesaing di sekitarmu.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu melihat susunan informasi, tulisan penawaran, dan tampilan halaman terlebih dahulu sebelum kami membangunnya secara penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Halaman dibangun dengan kode statis yang ringan, gambar terkompresi, dan diuji langsung di HP serta di PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Website dirilis pada domain dan hosting atas namamu sendiri, lalu dipantau dan diperbaiki setelah data pengunjung mulai masuk.',
      },
    ],
    priceHeading: 'Harga dan cakupan pembuatan website di BSD City',
    priceCopy:
      'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas. Biaya naik kalau jumlah halaman, fitur (misalnya booking atau pembayaran), atau integrasi bertambah. Angka pastinya kami sampaikan setelah audit gratis 30 menit, sebelum kamu membayar apa pun. Landing page sederhana biasanya selesai dalam hitungan hari, sedangkan website multi-halaman atau fitur khusus membutuhkan hitungan minggu.',
    priceNote: {
      startingPrice: 'Mulai Rp1.200.000',
      timeline: 'Hitungan hari untuk landing page sederhana; estimasi pasti setelah audit',
      note: 'Domain dan hosting terdaftar atas namamu sendiri.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    faqs: [
      {
        question: 'Bagaimana website saya bisa menonjol di antara banyak bisnis sejenis di BSD City?',
        answer:
          'Dengan menampilkan penawaran yang jelas, kecepatan muat yang ringan di HP, dan struktur halaman yang langsung menjawab pertanyaan calon pelanggan sebelum mereka bertanya. Kami juga menyiapkan dasar SEO seperti judul halaman, struktur heading, sitemap, dan data terstruktur, tanpa pernah memberi janji peringkat tertentu di mesin pencari.',
      },
      {
        question: 'Apakah foto dan konten klien perlu izin sebelum dipasang di website?',
        answer:
          'Ya, kami selalu menyarankan agar setiap foto dokumentasi—seperti foto sebelum-sesudah perawatan klinik atau foto proyek rumah klien—memiliki izin tertulis terlebih dahulu sebelum dipasang di website. Saat audit, kami membantu memeriksa materi foto dan logo yang sudah kamu miliki.',
      },
      {
        question: 'Apakah domain dan hosting website nantinya menjadi milik bisnis saya sendiri?',
        answer:
          'Ya, domain dan hosting didaftarkan langsung atas namamu sehingga kamu tidak terkunci pada kami. Setelah website rilis, kamu bebas memilih untuk memakai paket rawat bulanan dari kami atau mengelolanya sendiri.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaBsdCity',
  },

  // 2B. AI AGENT — BSD CITY
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'bsd-city',
    areaName: 'BSD City',
    indexable: true,
    eyebrow: 'AI agent · BSD City',
    metaTitle: 'Jasa AI Agent untuk Bisnis di BSD City | CHESTAADOTCOM',
    metaDescription:
      'AI agent WhatsApp untuk restoran, klinik estetika, agen properti, dan kantor di BSD City. Cek jadwal, catat reservasi, dan serah ke staf otomatis.',
    h1: 'Jasa AI agent untuk bisnis di BSD City',
    quickSummary:
      'CHESTAADOTCOM membangun AI agent WhatsApp untuk bisnis di BSD City—mulai dari klinik estetika dan restoran hingga agen properti serta kantor di Serpong, Tangerang Selatan. Agent memahami maksud pesan pelanggan, memakai tool seperti kalender dan CRM untuk mencatat booking atau jadwal survei, serta menyerahkan kasus sensitif ke stafmu. Biaya dihitung setelah audit gratis.',
    cekCepat: {
      cocokKalau:
        'Bisnismu di BSD City menerima banyak chat pertanyaan menu, jadwal perawatan, atau survei unit properti di jam sibuk dan malam hari yang belum sempat ditindaklanjuti.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan 10 pertanyaan tersering pelangganmu dan menentukan batas tindakan agent.',
      harga:
        'Biaya dihitung setelah audit gratis sesuai jumlah tool yang dihubungkan, banyaknya aturan bisnis, dan volume pesan.',
    },
    localContextHeading: 'Kenapa bisnis di BSD City butuh AI agent yang terhubung ke kalender dan CRM',
    localContextParagraphs: [
      'Sebagai kawasan kota mandiri di Serpong, Tangerang Selatan yang memiliki pusat belanja seperti AEON Mall BSD City dan The Breeze, kawasan perkantoran, serta pusat pameran ICE BSD, aktivitas bisnis di BSD City sering kali memuncak pada jam makan siang, akhir pekan, atau saat ada acara pameran. Pada jam-jam tersebut, restoran, klinik estetika, maupun agen properti umumnya menerima lonjakan pesan WhatsApp dalam waktu bersamaan.',
      'Ketika admin harus membalas pertanyaan jam buka, ketersediaan meja, slot perawatan, atau tipe unit properti satu per satu sambil melayani pelanggan yang datang langsung, sebagian chat sering tertunda atau lupa ditindaklanjuti. Selain itu, mencatat reservasi rombongan atau jadwal survei secara manual dari percakapan WhatsApp ke spreadsheet rawan menimbulkan jadwal ganda.',
      'Melalui layanan AI agent WhatsApp untuk bisnis di BSD City, sistem tidak sekadar membalas dengan teks template, melainkan membaca maksud pelanggan, memeriksa jadwal di kalender atau database, lalu menuntaskan pencatatan reservasi maupun jadwal survei. Setiap tindakan dibatasi oleh aturan yang ditulis bersama kamu, tercatat di dalam log yang bisa diperiksa, dan otomatis diteruskan ke staf manusia beserta ringkasan percakapan apabila muncul permintaan khusus atau komplain.',
    ],
    businessMixList: [
      'Restoran dan kafe di kawasan komersial BSD City yang melayani reservasi meja dan rombongan',
      'Klinik estetika yang mengelola jadwal terapis dan pengingat kedatangan pasien',
      'Agen dan kantor pemasaran properti yang mengatur jadwal survei unit',
      'Kantor, startup, dan studio arsitektur yang menyaring permintaan konsultasi masuk',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Restoran yang menangani reservasi meja dan pertanyaan menu di jam ramai',
        businessType: 'Restoran & Kafe di BSD City',
        challenge:
          'Saat jam makan siang dan akhir pekan, staf restoran sibuk melayani tamu di tempat sehingga pesan WhatsApp yang menanyakan menu, jam buka, dan ketersediaan meja untuk rombongan lambat terbalas.',
        solution:
          'AI agent yang menjawab pertanyaan menu, jam buka, dan ketersediaan meja, mencatat reservasi rombongan langsung ke jadwal restoran, serta meneruskan pesan komplain atau permintaan khusus ke staf lengkap dengan konteks percakapan.',
        expectedOutcome:
          'Tamu mendapatkan konfirmasi reservasi dengan cepat, sementara komplain atau permintaan khusus langsung ditangani staf manusia tanpa membuat tamu mengulang penjelasan.',
      },
      {
        label: 'Contoh skenario',
        title: 'Agen properti yang menyaring prospek dan menjadwalkan survei',
        businessType: 'Agen Properti di BSD City',
        challenge:
          'Pesan dari calon pembeli yang tertarik melihat unit sering masuk di malam hari atau akhir pekan, dan agen harus menanyakan budget, lokasi, serta tipe unit berulang kali sebelum bisa mengatur jadwal survei.',
        solution:
          'AI agent yang menanyakan kisaran budget, preferensi lokasi, dan tipe unit secara sopan di WhatsApp, menjadwalkan waktu survei di kalender, lalu mengirim ringkasan data calon pembeli ke agen yang tepat.',
        expectedOutcome:
          'Calon pembeli langsung terlayani saat minatnya masih tinggi, dan agen properti menerima jadwal survei beserta profil calon pembeli yang sudah jelas.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di BSD City',
    collaborationParagraphs: [
      'Berbasis di BSD, Tangerang Selatan, CHESTAADOTCOM bekerja bersama bisnis di BSD City baik secara online melalui WhatsApp dan video call maupun lewat pertemuan tatap muka di area Tangerang Selatan sesuai kesepakatan. Kami memulai setiap proyek dengan memeriksa alur percakapan nyata di bisnismu.',
      'Pengalaman kami mencakup sistem chat berbasis AI, API gateway pintar, dan pemroses dokumen berbasis AI. Seluruh pengerjaan dilakukan melalui empat tahapan berikut agar aturan tindakan agent benar-benar sesuai dengan cara kerja timmu.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan percakapan berulang di bisnismu di BSD City dan memberi tahu secara jujur bagian mana yang layak dijalankan agent.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau contoh alur percakapan serta aturan tindakan yang boleh dan tidak boleh dilakukan agent sebelum dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Agent dihubungkan ke WhatsApp Business dan tool kerjamu, kemudian diuji dengan percakapan nyata termasuk skenario di luar aturan.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Kami memantau log tindakan bersama timmu, memperbaiki respons yang kurang pas, dan menyesuaikan aturan seiring pemakaian.',
      },
    ],
    priceHeading: 'Harga dan cakupan AI agent di BSD City',
    priceCopy:
      'Biaya AI agent dihitung setelah audit gratis 30 menit, karena bergantung pada jumlah tool yang terhubung, banyaknya aturan bisnis, dan volume pesan. Kamu mengetahui angka pastinya sebelum membayar apa pun. Pengerjaan sistem dan AI agent biasanya memakan waktu dalam hitungan minggu, dengan estimasi pasti setelah sesi audit.',
    priceNote: {
      startingPrice: 'Dihitung setelah audit gratis',
      timeline: 'Hitungan minggu; estimasi pasti setelah audit 30 menit',
      note: 'Dilengkapi batas tindakan jelas, serah ke staf manusia, dan log lengkap.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'Apa-Bedanya-AI-Agent-dan-Chatbot-Biasa-untuk-Operasional-Bisnis',
    faqs: [
      {
        question: 'Apakah agent bisa menangani banyak pertanyaan sekaligus saat jam ramai?',
        answer:
          'Bisa. Saat banyak pesan masuk bersamaan di jam makan siang, akhir pekan, atau masa pameran, agent membaca dan membalas tiap percakapan serta memeriksa kalender atau database sesuai aturan yang sudah ditetapkan. Semua tindakan tersebut tercatat di dalam log sehingga stafmu tetap bisa memantaunya.',
      },
      {
        question: 'Bagaimana kalau pelanggan meminta hal di luar aturan?',
        answer:
          'Agent dibekali batas tindakan yang ditulis bersama kamu sejak awal. Begitu pelanggan menyampaikan komplain, negosiasi khusus, atau pertanyaan di luar aturan, agent tidak mengarang jawaban melainkan langsung menyerahkan percakapan itu ke stafmu beserta ringkasan percakapannya.',
      },
      {
        question: 'Apa saja yang perlu disiapkan bisnis saya di BSD City sebelum sesi audit gratis?',
        answer:
          'Cukup siapkan sepuluh pertanyaan yang paling sering masuk dari pelanggan, jam operasional beserta aturan harga, daftar tindakan yang boleh dilakukan agent, serta siapa staf yang menangani kasus di luar aturan. Dari situ kami akan memetakan alur dan estimasi biayanya dalam 30 menit.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaBsdCity',
  },

  // 3A. PEMBUATAN WEBSITE — PAMULANG
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan website dan landing page',
    areaSlug: 'pamulang',
    areaName: 'Pamulang',
    indexable: true,
    eyebrow: 'Pembuatan website · Pamulang',
    metaTitle: 'Jasa Pembuatan Website Bisnis di Pamulang | CHESTAADOTCOM',
    metaDescription:
      'Pembuatan website dan landing page untuk kos-kosan, bimbel, kursus, tempat makan, dan UMKM di Pamulang, Tangsel. Rapi di HP, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Pamulang',
    quickSummary:
      'Layanan jasa pembuatan website Pamulang dari CHESTAADOTCOM membantu pemilik kos-kosan, tempat makan, bimbel dan kursus, toko online, bengkel, serta laundry di Kecamatan Pamulang, Tangerang Selatan memiliki halaman web yang cepat dibuka di HP dan langsung mengarahkan pengunjung ke WhatsApp. Harga mulai Rp1.200.000 tergantung kompleksitas.',
    cekCepat: {
      cocokKalau:
        'Usahamu di Pamulang sering dicari oleh mahasiswa, warga sekitar, atau pelanggan lewat HP, tetapi belum punya halaman yang merangkum harga, fasilitas, peta lokasi, dan tombol WhatsApp.',
      mulaiDari:
        'Audit gratis 30 menit untuk melihat kebutuhan halamanmu dan menentukan susunan informasi yang paling pas.',
      harga:
        'Landing page mulai Rp1.200.000 tergantung kompleksitas; domain dan hosting didaftarkan atas namamu sendiri.',
    },
    localContextHeading: 'Kenapa usaha di Pamulang terbantu oleh halaman website yang ringan di HP',
    localContextParagraphs: [
      'Pamulang adalah kecamatan padat penduduk di Kota Tangerang Selatan tempat Universitas Pamulang berada. Kehadiran kawasan kampus dan permukiman yang ramai membuat perputaran usaha harian di wilayah ini sangat aktif: umumnya terdapat banyak usaha kos-kosan, tempat makan, bimbingan belajar dan tempat kursus, toko online, bengkel, hingga usaha laundry yang melayani mahasiswa maupun keluarga.',
      'Calon pelanggan di Pamulang—seperti mahasiswa baru yang mencari kamar kos dari luar daerah, orang tua yang mencari tempat kursus, atau warga yang mencari bengkel dan tempat makan—biasanya melakukan pencarian lewat Google atau mengklik tautan dari media sosial di HP mereka. Kalau informasi kamar, biaya kursus, atau daftar layanan hanya tersimpan di potongan unggahan lama tanpa halaman yang rapi, calon pelanggan harus bertanya dari nol atau justru memilih tempat lain yang informasinya lebih jelas.',
      'Menyediakan website untuk usaha kos-kosan di Pamulang maupun usaha kursus dan layanan harian tidak perlu rumit atau mahal. Satu halaman statis yang cepat dibuka di jaringan seluler, menampilkan foto yang sudah dikompres dengan ukuran tepat, rincian harga mulai dari, peta lokasi, dan tombol WhatsApp sudah cukup untuk membuat calon pelanggan langsung menghubungi kamu dengan maksud yang jelas.',
    ],
    businessMixList: [
      'Pemilik usaha kos-kosan di sekitar kawasan Universitas Pamulang dan permukiman warga',
      'Lembaga bimbingan belajar (bimbel), tempat kursus bahasa, komputer, atau keterampilan',
      'Tempat makan, katering harian, serta usaha laundry dan bengkel',
      'Toko online dan reseller yang berbasis di Kecamatan Pamulang',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Pemilik kos-kosan dengan halaman kamar dan tombol jadwalkan survei',
        businessType: 'Usaha Kos-Kosan di Pamulang',
        challenge:
          'Setiap awal semester, banyak calon penghuni menanyakan foto kamar, harga bulanan, fasilitas, dan titik lokasi lewat chat satu per satu, sementara sebagian hanya bertanya karena belum tahu kisaran harganya.',
        solution:
          'Satu halaman website yang memuat foto tiap tipe kamar, harga bulanan, daftar fasilitas (seperti Wi-Fi, kamar mandi dalam, atau parkir), peta lokasi, dan tombol jadwalkan survei via WhatsApp.',
        expectedOutcome:
          'Calon penghuni yang menghubungi lewat WhatsApp sudah melihat foto, fasilitas, dan harga kamar terlebih dahulu, sehingga percakapan langsung fokus pada penjadwalan survei kamar.',
      },
      {
        label: 'Contoh skenario',
        title: 'Tempat kursus atau bimbel dengan rincian program dan pendaftaran',
        businessType: 'Kursus & Bimbel di Pamulang',
        challenge:
          'Calon peserta atau orang tua siswa sering kesulitan membandingkan pilihan program belajar, jadwal pertemuan, dan rincian biaya jika hanya melihat poster gambar di media sosial.',
        solution:
          'Halaman website yang merinci daftar program kursus, pilihan jadwal belajar, informasi biaya, serta formulir pendaftaran sederhana yang langsung meneruskan data ke WhatsApp admin.',
        expectedOutcome:
          'Calon peserta memahami program yang sesuai sebelum mendaftar, dan admin menerima data awal pendaftar dengan rapi.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Pamulang',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pelaku usaha di Kecamatan Pamulang serta wilayah Tangerang Selatan sekitarnya. Seluruh proses mulai dari konsultasi awal, pengiriman foto kamar atau materi kursus, hingga peninjauan halaman dapat dilakukan secara online lewat WhatsApp dan video call.',
      'Apabila diperlukan pertemuan langsung untuk membahas kebutuhan halaman bisnismu, kami juga dapat menjadwalkan tatap muka di area Tangerang Selatan sesuai kesepakatan bersama. Pengerjaan berjalan melalui empat tahap berikut.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami melihat tujuan usahamu di Pamulang, materi foto atau media sosial yang sudah ada, serta aksi utama yang kamu inginkan dari pengunjung.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu melihat kerangka susunan halaman dan tulisannya terlebih dahulu sebelum website dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Halaman dibangun ringan, gambar dikompres agar hemat kuota, lalu diuji di HP dan di PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Website tayang dengan domain dan hosting atas namamu sendiri, lalu dipantau setelah pengunjung mulai masuk.',
      },
    ],
    priceHeading: 'Harga dan cakupan pembuatan website di Pamulang',
    priceCopy:
      'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas. Biaya naik apabila jumlah halaman, fitur khusus, atau integrasi bertambah. Angka pastinya kami sampaikan setelah audit gratis 30 menit, sebelum kamu membayar apa pun. Landing page sederhana biasanya selesai dalam hitungan hari.',
    priceNote: {
      startingPrice: 'Mulai Rp1.200.000',
      timeline: 'Hitungan hari untuk landing page sederhana; estimasi pasti setelah audit',
      note: 'Domain dan hosting terdaftar langsung atas namamu.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    faqs: [
      {
        question: 'Apakah layanan ini cocok untuk usaha kos-kosan atau kursus kecil di Pamulang?',
        answer:
          'Sangat cocok selama halaman tersebut punya tujuan yang jelas, misalnya membantu calon penghuni kos melihat kamar lalu menjadwalkan survei, atau membantu calon siswa mendaftar kursus. Untuk satu halaman landing page, harga mulai dari Rp1.200.000 tergantung kompleksitas.',
      },
      {
        question: 'Bisa pakai domain sendiri, dan siapa yang mengurus hosting?',
        answer:
          'Bisa memakai domain pilihanmu sendiri, dan baik domain maupun hosting didaftarkan langsung atas namamu. Kami membantu proses pengaturannya saat pengerjaan berlangsung, sehingga kamu tetap menjadi pemilik penuh tanpa terkunci pada kami.',
      },
      {
        question: 'Apa saja yang perlu saya siapkan sebelum audit gratis 30 menit?',
        answer:
          'Kamu cukup menyiapkan tautan media sosial atau halaman lama jika ada, contoh website yang kamu sukai, aksi utama yang kamu inginkan dari pengunjung (seperti chat survei kamar atau daftar kursus), serta foto dan logo yang sudah ada.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaPamulang',
  },

  // 3B. AI AGENT — PAMULANG
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'pamulang',
    areaName: 'Pamulang',
    indexable: true,
    eyebrow: 'AI agent · Pamulang',
    metaTitle: 'Jasa AI Agent untuk Bisnis di Pamulang | CHESTAADOTCOM',
    metaDescription:
      'AI agent WhatsApp untuk bisnis di Pamulang: cek kamar kos kosong, balas stok toko online, jadwalkan survei, dan catat data otomatis. Audit gratis.',
    h1: 'Jasa AI agent untuk bisnis di Pamulang',
    quickSummary:
      'CHESTAADOTCOM membangun AI agent WhatsApp untuk bisnis di Pamulang, Tangerang Selatan—mulai dari usaha kos-kosan dan bimbel di sekitar kawasan Universitas Pamulang hingga toko online, tempat makan, bengkel, dan laundry. Agent memahami pertanyaan pelanggan, mengecek ketersediaan kamar atau stok di tabel, menjadwalkan survei, dan mencatat data otomatis. Biaya dihitung setelah audit gratis.',
    cekCepat: {
      cocokKalau:
        'Kamu atau adminmu di Pamulang setiap hari kewalahan membalas chat "ada kamar kosong?" atau "barang ini ready?" satu per satu di WhatsApp.',
      mulaiDari:
        'Audit gratis 30 menit untuk melihat daftar pertanyaan berulang dan menilai apakah AI agent memang menghemat waktumu.',
      harga:
        'Biaya dihitung setelah audit gratis 30 menit sesuai jumlah tool, aturan, dan volume pesan, sebelum kamu membayar apa pun.',
    },
    localContextHeading: 'Kenapa usaha di Pamulang terbantu oleh AI agent di WhatsApp',
    localContextParagraphs: [
      'Kecamatan Pamulang di Tangerang Selatan dikenal sebagai wilayah yang padat penduduk sekaligus lokasi Universitas Pamulang. Banyak usaha di sini—seperti kos-kosan, toko online dan reseller, bimbingan belajar, tempat makan, bengkel, serta laundry—dikelola langsung oleh pemiliknya sendiri atau dibantu oleh satu orang admin yang merangkap banyak pekerjaan operasional.',
      'Ketika puluhan chat masuk ke WhatsApp untuk menanyakan hal yang berulang seperti ketersediaan kamar kos, harga bulanan, stok barang toko online, atau status pesanan, pemilik usaha harus terus-menerus membuka HP di sela pekerjaan lain. Akibatnya, pesan yang masuk di malam hari sering baru terbalas keesokan paginya, dan pencatatan jadwal survei kamar maupun pengingat tagihan bulanan masih mengandalkan ingatan.',
      'Dengan memasang AI agent WhatsApp untuk bisnis di Pamulang, tugas berulang tersebut ditangani secara teratur: agent membaca maksud pesan, memeriksa tabel daftar kamar atau stok, mengirim informasi dan foto yang sesuai, serta mencatat jadwal survei di kalender. Bila ada pertanyaan di luar aturan atau komplain pelanggan, agent langsung meneruskannya ke pemilik atau admin beserta ringkasan percakapan.',
    ],
    businessMixList: [
      'Usaha kos-kosan yang mengelola pertanyaan ketersediaan kamar, jadwal survei, dan pengingat pembayaran bulanan',
      'Toko online dan reseller yang menjawab status pesanan serta ketersediaan stok barang setiap hari',
      'Bimbel dan tempat kursus di Pamulang yang melayani tanya-jawab jadwal kelas serta pendaftaran',
      'Tempat makan, bengkel, dan laundry yang menerima pertanyaan layanan harian lewat WhatsApp',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Usaha kos-kosan yang mengecek kamar kosong dan menjadwalkan survei',
        businessType: 'Usaha Kos-Kosan di Pamulang',
        challenge:
          'Calon penghuni sering mengirim pesan singkat "ada kamar kosong?" di berbagai jam, sehingga pemilik kos harus berulang kali mengecek catatan kamar, mengirim foto, menjelaskan harga, dan mengatur janji lihat kamar.',
        solution:
          'AI agent yang memeriksa tabel daftar kamar terkini, mengirim foto dan rincian harga kamar yang masih tersedia, menjadwalkan waktu survei di kalender, serta mengirim pengingat pembayaran bulanan kepada penghuni.',
        expectedOutcome:
          'Pertanyaan ketersediaan kamar terjawab kapan saja sesuai data terbaru, dan pemilik kos hanya menerima jadwal survei dari calon penghuni yang sudah cocok dengan harga serta fasilitasnya.',
      },
      {
        label: 'Contoh skenario',
        title: 'Toko online atau reseller yang menjawab stok dan status pesanan',
        businessType: 'Toko Online & Reseller di Pamulang',
        challenge:
          'Admin toko online menghabiskan banyak waktu memeriksa tabel stok dan daftar pengiriman setiap kali pelanggan bertanya apakah barang tersedia atau sudah dikirim.',
        solution:
          'AI agent yang terhubung ke tabel stok dan pesanan untuk menjawab ketersediaan barang serta status pesanan secara otomatis, mencatat data pelanggan baru, dan menyerahkan keluhan pengiriman ke admin lengkap dengan ringkasan chat.',
        expectedOutcome:
          'Pelanggan mendapat jawaban cepat tanpa menunggu admin membuka tabel satu per satu, dan data pelanggan tercatat rapi.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Pamulang',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pelaku usaha di Pamulang baik secara online melalui WhatsApp dan video call maupun lewat pertemuan tatap muka di area Tangerang Selatan sesuai kesepakatan. Kami berbicara terus terang saat audit: jika volume pesan harianmu masih sedikit dan belum memerlukan agent, kami akan menyampaikannya sejak awal.',
      'Untuk usaha yang memang siap menggunakan AI agent, kami membangun dan mengujinya melalui empat langkah kerja yang jelas bersama Chesta Azka dan Zeeshan.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan pertanyaan harian yang masuk ke WhatsApp usahamu di Pamulang dan menilai mana yang layak dijalankan oleh agent.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu melihat contoh alur percakapan dan aturan tindakan agent sebelum sistem dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Agent dihubungkan ke WhatsApp Business dan tabel atau kalender yang kamu pakai, lalu diuji menggunakan percakapan nyata.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Kami memantau log tindakan, memperbaiki jawaban yang meleset, dan menyesuaikan aturan seiring sistem digunakan.',
      },
    ],
    priceHeading: 'Harga dan cakupan AI agent di Pamulang',
    priceCopy:
      'Biaya AI agent dihitung setelah audit gratis 30 menit, sesuai jumlah tool yang dihubungkan, banyaknya aturan bisnis, dan volume pesan. Kamu menerima angkanya sebelum membayar apa pun. Pengerjaan sistem dan AI agent biasanya membutuhkan waktu dalam hitungan minggu, dengan estimasi pasti setelah audit.',
    priceNote: {
      startingPrice: 'Dihitung setelah audit gratis',
      timeline: 'Hitungan minggu; estimasi pasti setelah audit 30 menit',
      note: 'Dilengkapi log tindakan yang bisa diperiksa dan aturan serah ke manusia.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Apakah agent bisa membedakan calon penghuni yang serius dan yang sekadar bertanya?',
        answer:
          'Bisa, melalui alur pertanyaan yang kita tetapkan bersama. Agent dapat menanyakan rencana tanggal masuk, durasi sewa, dan kesesuaian budget kamar terlebih dahulu sebelum menjadwalkan waktu survei di kalender atau meneruskannya ke kamu.',
      },
      {
        question: 'Kalau adminnya hanya satu orang, apakah masih masuk akal memakai AI agent?',
        answer:
          'Masuk akal apabila satu orang admin tersebut setiap hari kewalahan menjawab puluhan pertanyaan berulang dan menyalin data ke spreadsheet secara manual. Sebaliknya, kalau pesan yang masuk hanya beberapa per hari dan semuanya butuh sentuhan pribadi, agent belum diperlukan dan kami akan mengatakan itu terus terang saat audit.',
      },
      {
        question: 'Apakah data kamar, stok, dan nomor pelanggan saya tetap aman?',
        answer:
          'Data bisnismu sepenuhnya tetap milikmu. Kami hanya mengakses yang diperlukan untuk membangun serta merawat sistem, dan akses tersebut dicabut saat proyek atau kontrak rawat berakhir.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaPamulang',
  },

  // 4A. PEMBUATAN WEBSITE — JURANG MANGU
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan website dan landing page',
    areaSlug: 'jurang-mangu',
    areaName: 'Jurang Mangu',
    indexable: true,
    eyebrow: 'Pembuatan website · Jurang Mangu',
    metaTitle: 'Jasa Pembuatan Website di Jurang Mangu | CHESTAADOTCOM',
    metaDescription:
      'Pembuatan website dan landing page untuk jasa renovasi, praktik dokter, kuliner, dan kursus di Jurang Mangu, Pondok Aren. Mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Jurang Mangu',
    quickSummary:
      'Layanan jasa pembuatan website Jurang Mangu dari CHESTAADOTCOM membantu jasa renovasi, praktik dokter, kuliner rumahan atau kafe, dan tempat kursus di Kelurahan Jurang Mangu, Kecamatan Pondok Aren, Tangerang Selatan memiliki halaman yang cepat dibuka di HP dan langsung mengarahkan pengunjung ke WhatsApp. Harga mulai Rp1.200.000 tergantung kompleksitas.',
    cekCepat: {
      cocokKalau:
        'Usahamu di Jurang Mangu dan sekitar Pondok Aren butuh halaman yang rapi untuk menampilkan portofolio renovasi, jadwal praktik, atau menu pre-order tanpa langkah rumit.',
      mulaiDari:
        'Audit gratis 30 menit untuk memeriksa materi yang sudah kamu punya dan merancang susunan halaman yang jelas.',
      harga:
        'Landing page mulai Rp1.200.000 tergantung kompleksitas; angka pasti disampaikan setelah audit gratis.',
    },
    localContextHeading: 'Kenapa usaha di Jurang Mangu butuh website yang langsung menjawab pertanyaan warga',
    localContextParagraphs: [
      'Jurang Mangu merupakan kelurahan di Kecamatan Pondok Aren, Tangerang Selatan yang berada di sekitar kawasan Bintaro. Sebagai wilayah permukiman padat yang terus berkembang, kebutuhan warga di sini umumnya berkaitan erat dengan layanan rumah tangga dan keluarga: mulai dari praktik dokter, kuliner rumahan dan kafe, jasa renovasi rumah, hingga tempat kursus.',
      'Ketika warga di Jurang Mangu dan permukiman sekitarnya membutuhkan tukang atau kontraktor renovasi, ingin memeriksakan kesehatan ke praktik dokter, atau ingin memesan makanan pre-order, mereka biasanya mencari referensi lewat Google atau membuka tautan yang dibagikan di grup percakapan warga menggunakan HP. Apabila tautan yang dibuka terlalu berat atau tidak mencantumkan alur kerja dan cara pemesanan yang jelas, calon pelanggan sering ragu untuk melanjutkan chat.',
      'Menyusun website untuk jasa renovasi di Jurang Mangu maupun untuk kuliner dan praktik kesehatan berfokus pada kejelasan isi: menampilkan hasil pekerjaan yang sudah ada izin pemiliknya, menjelaskan alur layanan langkah demi langkah, dan memasang tombol WhatsApp yang langsung mengirimkan format pesan ke nomor bisnismu.',
    ],
    businessMixList: [
      'Jasa renovasi rumah dan kontraktor yang melayani permukiman di Jurang Mangu dan Pondok Aren',
      'Praktik dokter umum, dokter gigi, dan layanan kesehatan di lingkungan permukiman',
      'Usaha kuliner rumahan, katering pre-order, dan kafe',
      'Tempat kursus dan les bagi anak sekolah maupun dewasa di Jurang Mangu',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Jasa renovasi atau kontraktor dengan portofolio dan tombol minta estimasi',
        businessType: 'Jasa Renovasi & Kontraktor di Jurang Mangu',
        challenge:
          'Pemilik rumah yang ingin memperbaiki atap, dapur, atau menambah ruangan biasanya ingin melihat contoh hasil kerja sebelumnya dan memahami tahapan survei sebelum menghubungi kontraktor.',
        solution:
          'Halaman website yang menampilkan portofolio proyek beserta foto sebelum-sesudah (dipasang dengan izin pemilik rumah), penjelasan alur kerja dari survei hingga garansi pekerjaan, serta tombol minta estimasi via WhatsApp.',
        expectedOutcome:
          'Calon pelanggan percaya pada kerapian alur kerjamu dan langsung mengirim pesan WhatsApp berisi jenis renovasi yang dibutuhkan.',
      },
      {
        label: 'Contoh skenario',
        title: 'Kuliner rumahan atau kafe dengan menu dan sistem pre-order WhatsApp',
        businessType: 'Kuliner Rumahan & Kafe di Jurang Mangu',
        challenge:
          'Pelanggan yang ingin memesan makanan harian atau paket acara sering kesulitan melihat daftar menu terbaru, batas waktu pre-order, dan jadwal pengiriman jika hanya mengandalkan status chat.',
        solution:
          'Satu halaman website ringan berisi daftar menu lengkap dengan harga, aturan jadwal pre-order, area pengiriman, dan tombol pesan yang langsung membuka WhatsApp dengan daftar pesanan.',
        expectedOutcome:
          'Pelanggan dapat memilih menu dengan nyaman di HP dan mengirim pesanan WhatsApp yang sudah rapi tanpa tanya-jawab panjang.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Jurang Mangu',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani pelaku usaha di Jurang Mangu, Kecamatan Pondok Aren, serta seluruh Tangerang Selatan dan Jabodetabek. Diskusi pengumpulan materi, peninjauan tampilan, hingga peluncuran website dilakukan secara online melalui WhatsApp dan video call.',
      'Karena Jurang Mangu berada di wilayah Tangerang Selatan, pertemuan tatap muka juga dapat dilakukan di area Tangerang Selatan sesuai kesepakatan bersama. Kami menjalankan setiap proyek lewat empat tahapan kerja berikut.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami melihat tujuan bisnismu di Jurang Mangu, meninjau materi yang sudah ada, dan memberi saran praktis sebelum pengerjaan dimulai.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu memeriksa susunan halaman dan tulisannya terlebih dahulu sebelum kami membangun halaman secara penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Halaman dibuat statis agar cepat dibuka, gambar dikompres dengan ukuran tepat, lalu diuji di HP dan di PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Website tayang di atas domain dan hosting atas namamu sendiri, lalu dipantau setelah pengunjung mulai datang.',
      },
    ],
    priceHeading: 'Harga dan cakupan pembuatan website di Jurang Mangu',
    priceCopy:
      'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas. Biaya naik kalau jumlah halaman, fitur (misalnya booking atau pembayaran), atau integrasi bertambah. Angka pastinya kami sampaikan setelah audit gratis 30 menit, sebelum kamu membayar apa pun. Landing page sederhana biasanya selesai dalam hitungan hari.',
    priceNote: {
      startingPrice: 'Mulai Rp1.200.000',
      timeline: 'Hitungan hari untuk landing page sederhana; estimasi pasti setelah audit',
      note: 'Domain dan hosting terdaftar atas namamu sendiri.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'checklist-landing-page-konversi-tinggi-umkm-b2b',
    faqs: [
      {
        question: 'Bagaimana kalau usaha saya baru dan belum punya foto atau logo yang bagus?',
        answer:
          'Tidak masalah. Kami bantu menata materi yang sudah ada supaya tetap tampil rapi dan mudah dibaca di layar HP, sekaligus memberi saran praktis untuk pengambilan fotonya saat sesi audit gratis 30 menit.',
      },
      {
        question: 'Apakah website bisa dipakai untuk menerima pesanan lewat WhatsApp?',
        answer:
          'Bisa. Kami memasang tombol WhatsApp dan formulir singkat di halaman website yang langsung menyampaikan rincian pesanan atau permintaan estimasi ke nomor WhatsApp bisnismu tanpa langkah yang berbelit.',
      },
      {
        question: 'Berapa lama pembuatan website sederhana untuk usaha di Jurang Mangu?',
        answer:
          'Landing page sederhana biasanya selesai dalam hitungan hari, sedangkan website dengan banyak halaman atau fitur khusus membutuhkan hitungan minggu. Estimasi waktu dan biaya pastinya kami sampaikan setelah audit gratis.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaJurangMangu',
  },

  // 4B. AI AGENT — JURANG MANGU
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'jurang-mangu',
    areaName: 'Jurang Mangu',
    indexable: true,
    eyebrow: 'AI agent · Jurang Mangu',
    metaTitle: 'Jasa AI Agent untuk Bisnis di Jurang Mangu | CHESTAADOTCOM',
    metaDescription:
      'AI agent untuk praktik dokter, klinik, jasa renovasi, dan kursus di Jurang Mangu, Pondok Aren. Booking, pengingat kontrol, dan survei via WhatsApp.',
    h1: 'Jasa AI agent untuk bisnis di Jurang Mangu',
    quickSummary:
      'CHESTAADOTCOM membangun AI agent untuk klinik dan praktik dokter di Jurang Mangu serta usaha jasa renovasi, kuliner, dan kursus di Kecamatan Pondok Aren, Tangerang Selatan. Agent membaca pesan WhatsApp pelanggan, mengecek jadwal kalender, mengumpulkan data survei atau membuat booking, serta mengirim pengingat kontrol otomatis. Biaya dihitung setelah audit gratis.',
    cekCepat: {
      cocokKalau:
        'Praktik dokter, usaha renovasi, atau tempat kursusmu di Jurang Mangu sering terlambat membalas chat pendaftaran, pengingat jadwal kontrol, atau pengumpulan data survei awal.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan pertanyaan harian pelanggan dan batas tindakan agent.',
      harga:
        'Biaya dihitung setelah audit gratis 30 menit sesuai jumlah tool, aturan, dan volume pesan, sebelum kamu membayar apa pun.',
    },
    localContextHeading: 'Kenapa praktik dokter dan usaha jasa di Jurang Mangu butuh AI agent',
    localContextParagraphs: [
      'Di Kelurahan Jurang Mangu, Kecamatan Pondok Aren, Tangerang Selatan—yang berada di sekitar kawasan Bintaro—banyak usaha berjalan di tengah permukiman padat, seperti praktik dokter dan dokter gigi, jasa renovasi rumah, usaha kuliner, serta tempat kursus. Pelanggan di lingkungan ini umumnya lebih suka berkomunikasi langsung lewat chat WhatsApp untuk menanyakan jadwal praktik, meminta perkiraan biaya perbaikan rumah, atau menanyakan jadwal les.',
      'Bagi praktik dokter maupun penyedia jasa renovasi yang tim adminnya terbatas, membalas pertanyaan umum satu per satu sambil mengumpulkan informasi awal (seperti keluhan umum, jam kedatangan, ukuran ruangan yang ingin direnovasi, atau foto lokasi) sering menyita waktu berjam-jam. Selain itu, mengingatkan pasien untuk kontrol berkala enam bulanan secara manual dari buku catatan atau spreadsheet sering kali terlewat.',
      'Dengan memasang AI agent yang terhubung ke WhatsApp Business, kalender, dan tabel data, proses pengumpulan informasi awal, pembuatan booking, serta pengiriman pengingat kontrol dapat berjalan sendiri sesuai aturan yang kita tulis bersama. Apabila pelanggan menanyakan hal di luar aturan atau kasus yang sensitif, agent langsung meneruskannya ke staf manusia beserta ringkasan percakapan.',
    ],
    businessMixList: [
      'Praktik dokter dan dokter gigi di Jurang Mangu yang membutuhkan booking jadwal dan pengingat kontrol',
      'Jasa renovasi rumah dan kontraktor yang perlu mengumpulkan detail pekerjaan dan foto sebelum survei',
      'Tempat kursus dan bimbingan belajar yang melayani pertanyaan jadwal kelas via WhatsApp',
      'Usaha kuliner dan katering pre-order di sekitar Jurang Mangu dan Pondok Aren',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Praktik dokter gigi dengan booking jadwal dan pengingat kontrol enam bulanan',
        businessType: 'Praktik Dokter Gigi di Jurang Mangu',
        challenge:
          'Admin praktik harus menjawab pertanyaan umum tentang layanan dan jam buka setiap hari, sementara pengingat kontrol gigi enam bulanan kepada pasien lama sering terlupa karena harus dicek manual.',
        solution:
          'AI agent yang menjawab pertanyaan umum tentang layanan sesuai aturan praktik, mengecek slot jadwal untuk membuat booking di kalender, serta mengirim pesan pengingat kontrol enam bulanan secara terjadwal.',
        expectedOutcome:
          'Pasien bisa memesan jadwal periksa dengan mudah lewat WhatsApp dan menerima pengingat kontrol tepat waktu tanpa membebani pekerjaan harian admin.',
      },
      {
        label: 'Contoh skenario',
        title: 'Jasa renovasi yang mengumpulkan detail pekerjaan dan foto sebelum survei',
        businessType: 'Jasa Renovasi di Jurang Mangu',
        challenge:
          'Saat pemilik rumah mengirim chat "bisa renovasi bagian belakang?", tim teknis harus bolak-balik menanyakan jenis pekerjaan, ukuran kasar, titik lokasi, dan meminta foto kondisi awal sebelum bisa menjadwalkan survei.',
        solution:
          'AI agent yang secara berurutan menanyakan jenis pekerjaan renovasi, perkiraan ukuran, lokasi rumah, dan meminta unggahan foto di WhatsApp, lalu mencatatnya dan menjadwalkan waktu survei di kalender.',
        expectedOutcome:
          'Tim survei turun ke lokasi dengan bekal foto dan rincian pekerjaan yang sudah lengkap sejak dari percakapan WhatsApp.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Jurang Mangu',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani klien di Jurang Mangu, Pondok Aren, serta seluruh Tangerang Selatan dan Jabodetabek. Koordinasi pemetaan aturan, peninjauan prototipe percakapan, dan pengujian dilakukan secara online lewat WhatsApp dan video call, atau melalui pertemuan tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      'Pengalaman kami mencakup sistem chat berbasis AI, API gateway pintar, dan pemroses dokumen berbasis AI. Setiap proyek dikerjakan melalui empat langkah berikut.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan percakapan berulang di tempat praktik atau usahamu di Jurang Mangu dan menilai secara jujur mana yang layak ditangani agent.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu meninjau contoh alur tanya-jawab serta aturan batas tindakan agent sebelum sistem dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Agent dihubungkan ke WhatsApp Business dan kalender atau tabelmu, lalu diuji dengan percakapan nyata sebelum rilis.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Kami memantau log tindakan, memperbaiki jawaban yang meleset, dan menyesuaikan aturan seiring dipakai oleh timmu.',
      },
    ],
    priceHeading: 'Harga dan cakupan AI agent di Jurang Mangu',
    priceCopy:
      'Biaya AI agent dihitung setelah audit gratis 30 menit, karena bergantung pada jumlah tool yang dihubungkan, banyaknya aturan bisnis, dan volume pesan. Kamu mengetahui angka pastinya sebelum membayar apa pun. Pengerjaan sistem dan AI agent umumnya membutuhkan waktu dalam hitungan minggu, dengan estimasi pasti setelah audit.',
    priceNote: {
      startingPrice: 'Dihitung setelah audit gratis',
      timeline: 'Hitungan minggu; estimasi pasti setelah audit 30 menit',
      note: 'Dilengkapi batas tindakan jelas, serah ke manusia, dan log tindakan lengkap.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Apakah agent bisa mengirim pengingat kontrol ke pasien?',
        answer:
          'Bisa. Selama jadwal kunjungan pasien tercatat di kalender atau database yang terhubung, agent dapat mengirim pesan pengingat sehari sebelum janji temu maupun pengingat kontrol berkala sesuai aturan yang disepakati.',
      },
      {
        question: 'Apa yang terjadi kalau pertanyaan pelanggan di luar bidang usahaku?',
        answer:
          'Agent memiliki aturan tindakan yang tegas mengenai apa yang boleh dan tidak boleh dijawab. Jika pelanggan menanyakan hal di luar bidang usahamu atau membutuhkan pertimbangan khusus manusia, agent langsung menyerahkan percakapan tersebut ke stafmu beserta ringkasan chatnya.',
      },
      {
        question: 'Apakah data pasien atau pelanggan saya tetap menjadi milik bisnis saya?',
        answer:
          'Ya, seluruh data tetap milikmu. Kami hanya mengakses yang diperlukan untuk membangun dan merawat sistem, lalu mencabut akses tersebut saat proyek atau kontrak rawat berakhir.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaJurangMangu',
  },

  // 5A. PEMBUATAN WEBSITE — LEBAK BULUS
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan website dan landing page',
    areaSlug: 'lebak-bulus',
    areaName: 'Lebak Bulus',
    indexable: true,
    eyebrow: 'Pembuatan website · Lebak Bulus',
    metaTitle: 'Jasa Pembuatan Website di Lebak Bulus | CHESTAADOTCOM',
    metaDescription:
      'Pembuatan website dan landing page untuk kafe, katering, dan jasa profesional di Lebak Bulus, Jakarta Selatan. Cepat dibuka di HP, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Lebak Bulus',
    quickSummary:
      'Layanan jasa pembuatan website Lebak Bulus dari CHESTAADOTCOM membantu kafe, usaha katering, konsultan, jasa profesional, dan bisnis online di Kelurahan Lebak Bulus, Kecamatan Cilandak, Jakarta Selatan memiliki halaman yang cepat dibuka di HP dan siap mengarahkan pengunjung ke WhatsApp. Harga mulai Rp1.200.000 tergantung kompleksitas.',
    cekCepat: {
      cocokKalau:
        'Bisnismu di sekitar Lebak Bulus ingin memudahkan komuter maupun klien melihat menu pre-order, jam buka, atau alur layanan dan langsung menghubungi lewat WhatsApp.',
      mulaiDari:
        'Audit gratis 30 menit secara online untuk memeriksa halaman yang ada dan merumuskan tujuan utamanya.',
      harga:
        'Landing page mulai Rp1.200.000 tergantung kompleksitas; company profile dan web custom dihitung setelah audit gratis.',
    },
    localContextHeading: 'Kenapa bisnis di Lebak Bulus butuh halaman web yang ringkas dan cepat di HP',
    localContextParagraphs: [
      'Lebak Bulus adalah kelurahan di Kecamatan Cilandak, Jakarta Selatan—bukan bagian dari Tangerang Selatan—yang terletak di sisi barat daya Jakarta dekat perbatasan Tangerang Selatan. Karena Stasiun MRT Jakarta Lebak Bulus berada di sini, banyak pekerja komuter melintas setiap pagi dan sore hari, berdampingan dengan kawasan permukiman serta berbagai usaha seperti kafe, katering, jasa profesional, dan bisnis online.',
      'Pekerja komuter maupun warga di sekitar Lebak Bulus umumnya membuka informasi lewat HP dengan waktu baca yang singkat: mereka ingin memeriksa jam buka kafe, melihat menu pre-order yang bisa diambil sepulang kerja, atau mempelajari alur layanan sebuah kantor konsultan sebelum menjadwalkan diskusi. Apabila halaman web lambat terbuka di jaringan seluler atau informasinya terpecah-pecah, pengunjung sering membatalkan niatnya.',
      'Membangun website untuk kafe dan jasa profesional di Lebak Bulus menuntut halaman statis yang ringan, gambar yang sudah dikompres dengan ukuran tepat, serta struktur tulisan yang langsung menjawab pertanyaan pembaca. Dengan satu tujuan aksi yang jelas di tiap halaman, pengunjung bisa langsung memesan pre-order atau mengisi formulir konsultasi yang diteruskan ke WhatsApp timmu.',
    ],
    businessMixList: [
      'Kafe dan usaha katering di sekitar jalur komuter Stasiun MRT Jakarta Lebak Bulus',
      'Konsultan, kantor jasa profesional, dan penyedia layanan B2B di Cilandak dan Lebak Bulus',
      'Bisnis online yang melayani pengiriman ke Jakarta Selatan dan Tangerang Selatan',
      'Jasa servis dan klinik di sekitar kawasan permukiman Lebak Bulus',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Kafe atau katering dekat jalur komuter dengan sistem pre-order untuk diambil',
        businessType: 'Kafe & Katering di Lebak Bulus',
        challenge:
          'Pekerja komuter yang melintas di sekitar Stasiun MRT Jakarta Lebak Bulus sering ingin memesan kopi atau paket makanan lebih dulu agar bisa langsung diambil tanpa mengantre lama, namun belum ada halaman menu yang praktis.',
        solution:
          'Satu halaman website ringan yang memuat jam buka, daftar menu beserta harga, titik peta lokasi, serta tombol pre-order via WhatsApp untuk pesanan yang siap diambil pada jam tertentu.',
        expectedOutcome:
          'Pelanggan dapat memesan dari HP sebelum tiba di lokasi, dan tim dapur atau barista menerima rincian pesanan lebih teratur.',
      },
      {
        label: 'Contoh skenario',
        title: 'Konsultan atau jasa profesional dengan alur kerja dan formulir konsultasi',
        businessType: 'Jasa Profesional di Lebak Bulus',
        challenge:
          'Calon klien yang mencari jasa konsultan umumnya ingin memahami cakupan layanan dan tahapan proses kerja terlebih dahulu sebelum bersedia meluangkan waktu untuk rapat awal.',
        solution:
          'Website layanan dengan penjelasan alur kerja yang lugas, daftar layanan per kebutuhan, serta formulir konsultasi singkat yang langsung menyampaikan pesan ke WhatsApp atau kontak tim.',
        expectedOutcome:
          'Pengunjung memahami proses kerja sebelum menghubungi, sehingga diskusi awal berjalan jauh lebih fokus.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Lebak Bulus',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani bisnis di Tangerang Selatan serta Jabodetabek, termasuk di Kelurahan Lebak Bulus, Jakarta Selatan. Pekerjaan utama—mulai dari sesi audit, pengiriman materi, peninjauan prototipe, hingga rilis—berjalan secara online lewat WhatsApp dan video call.',
      'Karena Lebak Bulus berada dekat dengan perbatasan Tangerang Selatan, pertemuan tatap muka juga dimungkinkan sesuai kesepakatan bersama apabila diperlukan. Seluruh proyek dikerjakan melalui empat langkah berikut.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami mempelajari tujuan bisnismu di Lebak Bulus, halaman yang sudah ada, dan pesaing di sekitarmu.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu melihat struktur halaman dan tampilannya terlebih dahulu sebelum website dibangun penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Website dibangun secara statis agar cepat, lalu diuji langsung di layar HP dan di PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Halaman tayang pada domain dan hosting atas namamu sendiri, lalu dipantau setelah pengunjung mulai masuk.',
      },
    ],
    priceHeading: 'Harga dan cakupan pembuatan website di Lebak Bulus',
    priceCopy:
      'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas. Biaya naik kalau jumlah halaman, fitur (misalnya booking atau pembayaran), atau integrasi bertambah. Angka pastinya kami sampaikan setelah audit gratis 30 menit, sebelum kamu membayar apa pun. Landing page sederhana biasanya selesai dalam hitungan hari.',
    priceNote: {
      startingPrice: 'Mulai Rp1.200.000',
      timeline: 'Hitungan hari untuk landing page sederhana; estimasi pasti setelah audit',
      note: 'Domain dan hosting terdaftar atas namamu sendiri.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    faqs: [
      {
        question: 'Apakah kalian melayani bisnis di Jakarta Selatan?',
        answer:
          'Ya, kami melayani bisnis di seluruh wilayah Tangerang Selatan dan Jabodetabek, termasuk Kelurahan Lebak Bulus di Kecamatan Cilandak, Jakarta Selatan. Karena Lebak Bulus dekat dengan perbatasan Tangerang Selatan, tatap muka dimungkinkan sesuai kesepakatan sementara pekerjaan utama tetap berjalan secara online.',
      },
      {
        question: 'Apakah proses pembuatan websitenya bisa sepenuhnya online?',
        answer:
          'Bisa sepenuhnya online. Mulai dari audit gratis 30 menit, pengiriman foto dan materi tulisan, peninjauan prototipe halaman, hingga serah terima domain dan hosting dapat kita selesaikan lewat WhatsApp dan video call.',
      },
      {
        question: 'Berapa harga awal untuk membuat landing page bagi usaha di Lebak Bulus?',
        answer:
          'Landing page mulai dari Rp1.200.000, tergantung kompleksitas halaman. Untuk company profile beberapa halaman atau website dengan fitur khusus, biayanya kami hitungkan secara pasti setelah sesi audit gratis sebelum kamu membayar apa pun.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaLebakBulus',
  },

  // 5B. AI AGENT — LEBAK BULUS
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'lebak-bulus',
    areaName: 'Lebak Bulus',
    indexable: true,
    eyebrow: 'AI agent · Lebak Bulus',
    metaTitle: 'Jasa AI Agent untuk Bisnis di Lebak Bulus | CHESTAADOTCOM',
    metaDescription:
      'AI agent WhatsApp untuk bisnis di Lebak Bulus, Jakarta Selatan: rekap pesanan kafe/katering, booking klinik, dan pengingat otomatis. Audit gratis.',
    h1: 'Jasa AI agent untuk bisnis di Lebak Bulus',
    quickSummary:
      'CHESTAADOTCOM membangun AI agent WhatsApp untuk bisnis di Lebak Bulus, Kecamatan Cilandak, Jakarta Selatan—mulai dari kafe, katering, dan bisnis online hingga jasa profesional, servis, serta klinik. Agent memahami pesan masuk, mencatat pesanan atau membuat booking di kalender, dan menyerahkan kasus khusus ke stafmu. Biaya dihitung setelah audit gratis.',
    cekCepat: {
      cocokKalau:
        'Usaha kafe, katering, klinik, atau jasa profesionalmu di Lebak Bulus setiap hari menyalin pesanan dan jadwal booking dari chat WhatsApp ke spreadsheet secara manual.',
      mulaiDari:
        'Audit gratis 30 menit untuk memetakan alur chat berulang dan menentukan aturan tindakan agent.',
      harga:
        'Biaya dihitung setelah audit gratis 30 menit sesuai jumlah tool, aturan, dan volume pesan, sebelum kamu membayar apa pun.',
    },
    localContextHeading: 'Kenapa usaha di sekitar Lebak Bulus terbantu oleh AI agent WhatsApp',
    localContextParagraphs: [
      'Kelurahan Lebak Bulus di Kecamatan Cilandak, Jakarta Selatan berada di sisi barat daya Jakarta dekat perbatasan Tangerang Selatan dan menjadi titik ramai karena keberadaan Stasiun MRT Jakarta Lebak Bulus. Banyak kafe, usaha katering, bisnis online, jasa servis, klinik, serta kantor jasa profesional di kawasan ini melayani pelanggan yang bergerak cepat dan mengandalkan komunikasi lewat WhatsApp.',
      'Pada jam sibuk pagi maupun sore hari, pesan pesanan makanan, pertanyaan jadwal servis, atau permintaan janji temu klinik sering masuk secara beruntun. Jika staf harus membalas pertanyaan umum satu per satu lalu mengetik ulang daftar pesanan harian dari WhatsApp ke dalam spreadsheet pada malam hari, waktu kerja tim habis untuk pekerjaan salin-tempel dan rawan terjadi salah catat.',
      'Dengan memasang AI agent WhatsApp untuk bisnis di Lebak Bulus, pesan pelanggan dibaca sesuai konteksnya: agent menjawab pertanyaan umum, memeriksa jadwal atau aturan harga, mencatat pesanan harian ke tabel, dan mengirim rekap untuk pemilik. Bila muncul permintaan di luar aturan atau komplain, agent langsung menyerahkannya ke staf manusia lengkap dengan ringkasan percakapan.',
    ],
    businessMixList: [
      'Kafe dan usaha katering yang menerima pesanan harian lewat WhatsApp',
      'Jasa servis dan klinik di sekitar permukiman Lebak Bulus yang mengatur jadwal booking serta pengingat',
      'Konsultan dan kantor jasa profesional yang menjadwalkan pertemuan awal di kalender',
      'Bisnis online yang mencatat pesanan dan menjawab pertanyaan berulang setiap hari',
    ],
    scenarios: [
      {
        label: 'Contoh skenario',
        title: 'Kafe atau katering dengan pencatatan pesanan harian dan rekap untuk pemilik',
        businessType: 'Kafe & Katering di Lebak Bulus',
        challenge:
          'Setiap hari pelanggan mengirim pesanan paket makanan atau minuman lewat chat WhatsApp, dan staf harus menyalin nama, item pesanan, jam ambil, serta catatan khusus ke spreadsheet satu per satu.',
        solution:
          'AI agent yang menjawab pertanyaan menu dan jam operasional, mencatat rincian pesanan harian dari percakapan WhatsApp langsung ke tabel pesanan, serta menyiapkan rekap harian untuk pemilik.',
        expectedOutcome:
          'Pesanan harian tercatat rapi tanpa salin manual yang berulang, dan pemilik dapat memeriksa rekap pesanan serta log tindakan kapan saja.',
      },
      {
        label: 'Contoh skenario',
        title: 'Jasa servis atau klinik dengan booking jadwal dan pengingat otomatis',
        businessType: 'Jasa Servis & Klinik di Lebak Bulus',
        challenge:
          'Pelanggan sering menanyakan jam kosong untuk servis atau kunjungan klinik di luar jam operasional, sementara admin juga harus mengirim pengingat jadwal agar pelanggan tidak lupa datang.',
        solution:
          'AI agent yang menjawab pertanyaan umum layanan, memeriksa slot kosong di kalender untuk membuat booking, mengirim pengingat jadwal otomatis, dan meneruskan kasus di luar aturan ke staf beserta ringkasan chat.',
        expectedOutcome:
          'Booking terjadwal rapi di kalender tanpa bentrok dan staf hanya perlu menangani pertanyaan khusus yang sudah dirangkum oleh agent.',
      },
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien di Lebak Bulus',
    collaborationParagraphs: [
      'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani klien di Tangerang Selatan serta Jabodetabek, termasuk Lebak Bulus di Jakarta Selatan. Pekerjaan utama mulai dari sesi audit, perancangan aturan tindakan, pengujian percakapan nyata, hingga pemantauan log dilakukan secara online lewat WhatsApp dan video call.',
      'Karena Lebak Bulus dekat dengan perbatasan Tangerang Selatan, pertemuan tatap muka juga dimungkinkan sesuai kesepakatan bersama. Kami menerapkan empat tahapan kerja berikut pada setiap proyek AI agent.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Audit gratis (30 menit)',
        sentence:
          'Kami memetakan percakapan dan tugas berulang di bisnismu di Lebak Bulus, lalu menyampaikan secara jujur mana yang layak diserahkan ke agent.',
      },
      {
        stepNumber: '2',
        title: 'Rancang dan prototipe',
        sentence:
          'Kamu melihat contoh alur percakapan dan daftar aturan tindakan agent sebelum kami membangunnya secara penuh.',
      },
      {
        stepNumber: '3',
        title: 'Bangun dan uji',
        sentence:
          'Agent dihubungkan ke WhatsApp Business dan tool yang kamu pakai, kemudian diuji dengan percakapan nyata dari bisnismu.',
      },
      {
        stepNumber: '4',
        title: 'Rilis dan rawat',
        sentence:
          'Kami memantau log tindakan, memperbaiki jawaban yang meleset, dan menyesuaikan aturan seiring dipakai oleh timmu.',
      },
    ],
    priceHeading: 'Harga dan cakupan AI agent di Lebak Bulus',
    priceCopy:
      'Biaya AI agent dihitung setelah audit gratis 30 menit, karena bergantung pada jumlah tool yang terhubung, banyaknya aturan bisnis, dan volume pesan. Kamu menerima angkanya sebelum membayar apa pun. Pengerjaan sistem dan AI agent biasanya memakan waktu dalam hitungan minggu, dengan estimasi pasti setelah audit.',
    priceNote: {
      startingPrice: 'Dihitung setelah audit gratis',
      timeline: 'Hitungan minggu; estimasi pasti setelah audit 30 menit',
      note: 'Data bisnismu tetap milikmu; dilengkapi log tindakan dan serah ke manusia.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Apakah agent bisa mencatat pesanan harian dari WhatsApp ke spreadsheet?',
        answer:
          'Bisa. Agent membaca rincian pesanan dari percakapan WhatsApp sesuai aturan yang kita tentukan, lalu mencatatnya langsung ke tabel spreadsheet atau database dan menyimpan jejaknya di dalam log tindakan.',
      },
      {
        question: 'Apa saja yang perlu saya siapkan sebelum audit?',
        answer:
          'Siapkan sepuluh pertanyaan yang paling sering masuk dari pelanggan, jam operasional dan aturan harga, daftar tindakan yang boleh dilakukan agent, serta siapa staf yang menangani kasus di luar aturan. Empat hal ini sudah cukup untuk kami bahas bersama dalam audit gratis 30 menit.',
      },
      {
        question: 'Apakah pengerjaan untuk bisnis di Lebak Bulus dilakukan secara online atau tatap muka?',
        answer:
          'Pekerjaan utama kami jalankan secara online lewat WhatsApp dan video call supaya efisien. Namun karena Lebak Bulus dekat dengan perbatasan Tangerang Selatan, pertemuan tatap muka juga dimungkinkan sesuai kesepakatan bersama.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaLebakBulus',
  },
];

// Generate prepared non-indexable area records (indexable: false) for alam-sutera, bintaro, gading-serpong, serpong, ciputat
const NON_INDEXABLE_SLUGS: NonIndexableAreaSlug[] = [
  'alam-sutera',
  'bintaro',
  'gading-serpong',
  'serpong',
  'ciputat',
];

export const PREPARED_NON_INDEXABLE_PAGES_ID: ServiceAreaPageData[] =
  NON_INDEXABLE_SLUGS.flatMap((areaSlug) => {
    const area = AREAS[areaSlug];
    return (['pembuatan-website', 'ai-agent'] as const).map((serviceSlug) => {
      const isWeb = serviceSlug === 'pembuatan-website';
      return {
        serviceSlug,
        serviceName: isWeb ? 'Pembuatan website dan landing page' : 'AI agent',
        areaSlug,
        areaName: area.name,
        indexable: false,
        eyebrow: `${isWeb ? 'Pembuatan website' : 'AI agent'} · ${area.name}`,
        metaTitle: isWeb
          ? `Jasa Pembuatan Website di ${area.name} | CHESTAADOTCOM`
          : `Jasa AI Agent untuk Bisnis di ${area.name} | CHESTAADOTCOM`,
        metaDescription: isWeb
          ? `Pembuatan website dan landing page untuk bisnis di ${area.name} dan Tangerang Selatan. Cepat dibuka di HP, mulai Rp1.200.000.`
          : `AI agent untuk bisnis di ${area.name} dan Tangerang Selatan: balas WhatsApp, booking, dan follow-up otomatis. Audit gratis.`,
        h1: isWeb
          ? `Jasa pembuatan website untuk bisnis di ${area.name}`
          : `Jasa AI agent untuk bisnis di ${area.name}`,
        quickSummary: isWeb
          ? `Pembuatan website dan landing page dari CHESTAADOTCOM untuk bisnis di ${area.name} dan Tangerang Selatan. Cepat dibuka di HP dan punya satu tujuan jelas. Harga mulai Rp1.200.000, tergantung kompleksitas.`
          : `AI agent dari CHESTAADOTCOM untuk bisnis di ${area.name} dan Tangerang Selatan: memahami pesan pelanggan, memakai kalender atau database, dan menyerahkan kasus khusus ke manusia. Biaya dihitung setelah audit gratis.`,
        cekCepat: {
          cocokKalau: isWeb
            ? `Bisnismu di ${area.name} butuh halaman cepat untuk iklan atau pencarian lokal.`
            : `Timmu di ${area.name} sering membalas pertanyaan WhatsApp yang sama setiap hari.`,
          mulaiDari: 'Audit gratis 30 menit sebelum kamu membayar apa pun.',
          harga: isWeb ? 'Mulai Rp1.200.000 tergantung kompleksitas.' : 'Dihitung setelah audit gratis.',
        },
        localContextHeading: `Layanan untuk bisnis di ${area.name}`,
        localContextParagraphs: [area.factsSummaryId],
        businessMixList: area.typicalBusinessesId,
        scenarios: [
          {
            label: 'Contoh skenario',
            title: isWeb ? 'Halaman layanan dan booking WhatsApp' : 'Booking dan tanya-jawab WhatsApp',
            businessType: `Bisnis di ${area.name}`,
            challenge: 'Calon pelanggan membutuhkan informasi layanan yang jelas di HP.',
            solution: isWeb
              ? 'Halaman statis yang cepat dibuka dengan tombol WhatsApp.'
              : 'AI agent yang terhubung ke WhatsApp Business dan kalender.',
            expectedOutcome: 'Pelanggan terlayani dengan cepat dan terarah.',
          },
          {
            label: 'Contoh skenario',
            title: isWeb ? 'Profil layanan dan formulir konsultasi' : 'Pencatatan data dan serah ke staf',
            businessType: `Jasa di ${area.name}`,
            challenge: 'Pertanyaan berulang menyita waktu tim setiap hari.',
            solution: isWeb
              ? 'Halaman layanan dengan alur kerja dan formulir kontak.'
              : 'Agent mencatat informasi awal dan meneruskan kasus khusus ke staf.',
            expectedOutcome: 'Tim menerima pesan yang sudah jelas kebutuhannya.',
          },
        ],
        collaborationHeading: `Cara kami bekerja dengan klien di ${area.name}`,
        collaborationParagraphs: [
          'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani klien secara online lewat WhatsApp dan video call maupun tatap muka di area Tangerang Selatan sesuai kesepakatan.',
        ],
        processSteps: [
          {
            stepNumber: '1',
            title: 'Audit gratis (30 menit)',
            sentence: 'Kami melihat tujuan bisnismu dan alur yang berjalan saat ini.',
          },
          {
            stepNumber: '2',
            title: 'Rancang dan prototipe',
            sentence: 'Kamu meninjau rancangan sebelum dibangun penuh.',
          },
          {
            stepNumber: '3',
            title: 'Bangun dan uji',
            sentence: 'Sistem dibangun dan diuji sebelum rilis.',
          },
          {
            stepNumber: '4',
            title: 'Rilis dan rawat',
            sentence: 'Dipantau dan disesuaikan setelah berjalan.',
          },
        ],
        priceHeading: 'Harga dan cakupan',
        priceCopy: isWeb
          ? 'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas. Angka pasti disampaikan setelah audit gratis.'
          : 'Biaya dihitung setelah audit gratis 30 menit, sebelum kamu membayar apa pun.',
        priceNote: {
          startingPrice: isWeb ? 'Mulai Rp1.200.000' : 'Dihitung setelah audit gratis',
          timeline: isWeb ? 'Hitungan hari' : 'Hitungan minggu',
          note: 'Estimasi pasti setelah audit gratis.',
        },
        relatedProjectSlugs: isWeb
          ? ['landing-klinik-estetika', 'chestaa-v2']
          : ['wa-concierge-klinik', 'pemroses-dokumen'],
        relatedBlogSlug: isWeb
          ? 'berapa-biaya-bikin-website-bisnis-panduan-harga'
          : 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
        faqs: [
          {
            question: 'Bagaimana cara memulai?',
            answer: 'Mulai dari audit gratis 30 menit via WhatsApp atau video call.',
          },
          {
            question: 'Berapa biayanya?',
            answer: isWeb
              ? 'Landing page mulai Rp1.200.000 tergantung kompleksitas.'
              : 'Dihitung setelah audit gratis sesuai jumlah tool dan aturan.',
          },
          {
            question: 'Bagaimana kepemilikan data?',
            answer: 'Data tetap milikmu, dan domain serta hosting terdaftar atas namamu.',
          },
        ],
        updatedAt: '2026-03-20',
        ogImageKey: 'ogDefault',
      };
    });
  });

export const ALL_SERVICE_AREA_PAGES_ID: ServiceAreaPageData[] = [
  ...SERVICE_AREA_PAGES_ID,
  ...PREPARED_NON_INDEXABLE_PAGES_ID,
];

export function getAreaBySlug(slug: string): AreaDefinition | undefined {
  return AREAS[slug as AreaSlug];
}

