export interface AreaDefinition {
  slug: 'bsd-city' | 'alam-sutera' | 'bintaro' | 'gading-serpong' | 'tangerang-selatan';
  name: string;
  shortName: string;
  regionLabel: string;
  nearbySlugs: ('bsd-city' | 'alam-sutera' | 'bintaro' | 'gading-serpong' | 'tangerang-selatan')[];
  isBaseArea?: boolean;
}

export interface LocalScenario {
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

export interface ServiceAreaPageData {
  serviceSlug: 'pembuatan-website' | 'ai-agent' | 'software-custom' | 'otomasi-workflow';
  serviceName: string;
  areaSlug: AreaDefinition['slug'];
  areaName: string;
  indexable: boolean;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  quickSummary: string; // 40-60 words answering the page's question directly
  localContextHeading: string;
  localContextParagraphs: string[]; // Deep unique local context (200+ words)
  businessMixList: string[];
  scenarios: [LocalScenario, LocalScenario]; // 2 concrete scenarios written for that area's business mix
  collaborationHeading: string;
  collaborationParagraphs: string[]; // Honest explanation of remote vs tatap muka from BSD base
  deliverablesSummary: string[];
  priceNote: {
    startingPrice: string;
    timeline: string;
    note: string;
  };
  caseStudyReference: {
    title: string;
    summary: string;
    metricNote: string;
    relatedBlogSlug: string;
    relatedBlogTitle: string;
  };
  faqs: [LocalFAQ, LocalFAQ, LocalFAQ];
  updatedAt: string;
}

export const AREAS: Record<AreaDefinition['slug'], AreaDefinition> = {
  'bsd-city': {
    slug: 'bsd-city',
    name: 'BSD City',
    shortName: 'BSD',
    regionLabel: 'BSD City, Tangerang Selatan',
    nearbySlugs: ['gading-serpong', 'alam-sutera', 'bintaro', 'tangerang-selatan'],
    isBaseArea: true,
  },
  'alam-sutera': {
    slug: 'alam-sutera',
    name: 'Alam Sutera',
    shortName: 'Alam Sutera',
    regionLabel: 'Alam Sutera, Tangerang & Tangerang Selatan',
    nearbySlugs: ['bsd-city', 'gading-serpong', 'tangerang-selatan'],
  },
  'bintaro': {
    slug: 'bintaro',
    name: 'Bintaro',
    shortName: 'Bintaro',
    regionLabel: 'Bintaro Jaya, Tangerang Selatan',
    nearbySlugs: ['bsd-city', 'tangerang-selatan', 'alam-sutera'],
  },
  'gading-serpong': {
    slug: 'gading-serpong',
    name: 'Gading Serpong',
    shortName: 'Gading Serpong',
    regionLabel: 'Gading Serpong, Tangerang',
    nearbySlugs: ['bsd-city', 'alam-sutera', 'tangerang-selatan'],
  },
  'tangerang-selatan': {
    slug: 'tangerang-selatan',
    name: 'Tangerang Selatan',
    shortName: 'Tangsel',
    regionLabel: 'Kota Tangerang Selatan, Banten',
    nearbySlugs: ['bsd-city', 'bintaro', 'alam-sutera', 'gading-serpong'],
    isBaseArea: true,
  },
};

export const SERVICE_AREA_PAGES: ServiceAreaPageData[] = [
  // ============================================================================
  // 1. PEMBUATAN WEBSITE — 5 INDEXABLE PAGES
  // ============================================================================
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan Website & Landing Page',
    areaSlug: 'bsd-city',
    areaName: 'BSD City',
    indexable: true,
    metaTitle: 'Jasa Pembuatan Website di BSD City, Tangsel | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website bisnis & landing page cepat di BSD City, Tangerang Selatan. Kode rapi, SEO lokal siap pakai, mulai dari Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di BSD City',
    quickSummary: 'CHESTAADOTCOM membangun website perusahaan, katalog layanan, dan landing page konversi tinggi untuk bisnis di BSD City, Tangerang Selatan. Karena tim kami berbasis langsung di BSD, kamu mendapatkan website cepat berstandar Core Web Vitals dengan biaya transparan mulai dari Rp1.200.000 dan alur diskusi langsung maupun daring.',
    localContextHeading: 'Mengapa bisnis di BSD City membutuhkan website yang cepat dan langsung ke inti penawaran',
    localContextParagraphs: [
      'BSD City berkembang sebagai pusat komersial, perkantoran korporat, klinik kesehatan spesialis, hingga institusi pendidikan dan ruko layanan profesional yang tersebar dari area BSD Timur hingga BSD Barat. Calon pelanggan di kawasan ini memiliki kebiasaan riset yang sangat spesifik: mereka mencari penyedia jasa melalui ponsel di sela waktu kerja atau perjalanan komuter, membandingkan dua hingga tiga vendor sekaligus, lalu menghubungi pihak yang informasinya paling jelas.',
      'Sayangnya, banyak bisnis di kawasan ruko komersial maupun gedung perkantoran BSD masih mengandalkan tautan bio media sosial atau website berbasis template berat yang membutuhkan waktu lebih dari lima detik untuk dimuat di jaringan seluler. Ketika halaman gagal menampilkan informasi layanan, lokasi operasional, dan tombol konsultasi secara instan, calon klien korporat maupun residensial langsung berpindah ke kompetitor terdekat.',
      'Website yang kami rancang untuk bisnis di BSD City tidak sekadar berfungsi sebagai brosur digital pasif. Kami menyusun arsitektur halaman berdasarkan pertanyaan nyata yang diajukan calon pembeli sebelum mereka menekan tombol WhatsApp—mulai dari rincian paket layanan, alur kerja, estimasi biaya, hingga kejelasan domisili operasional. Dengan struktur HTML semantik dan optimasi kecepatan pemuatan dari sisi server, halaman bisnismu siap bersaing di pencarian organik lokal maupun saat dibagikan di grup komunitas warga dan rekanan B2B.'
    ],
    businessMixList: [
      'Perusahaan konsultan B2B, agensi profesional, dan kantor cabang di kawasan perkantoran BSD',
      'Klinik gigi, klinik estetika, fisioterapi, dan layanan kesehatan keluarga',
      'Lembaga kursus, bimbingan belajar, pelatihan keterampilan, dan sekolah swasta',
      'Kontraktor interior, arsitek, dan penyedia jasa renovasi hunian klaster baru',
      'Showroom otomotif, bengkel spesialis, dan distributor peralatan komersial'
    ],
    scenarios: [
      {
        title: 'Klinik Spesialis & Layanan Kesehatan di Kawasan Komersial BSD',
        businessType: 'Klinik Kesehatan & Estetika',
        challenge: 'Pasien baru sering menanyakan jam praktik dokter, kisaran biaya tindakan dasar, dan ketersediaan slot via WhatsApp berulang-ulang karena informasi di media sosial tenggelam oleh unggahan harian.',
        solution: 'Membangun website terstruktur dengan halaman khusus per tindakan medis, tabel transparansi kisaran biaya dasar, profil tenaga medis, serta tombol reservasi WhatsApp yang otomatis menyertakan pilihan jadwal dan jenis keluhan pasien.',
        expectedOutcome: 'Tim resepsionis tidak lagi menjawab pertanyaan dasar dari nol, dan calon pasien datang dengan ekspektasi layanan serta jadwal yang sudah terfilter rapi.'
      },
      {
        title: 'Perusahaan Jasa B2B & Kontraktor Interior Hunian Klaster',
        businessType: 'Kontraktor Interior & B2B Services',
        challenge: 'Calon klien pemilik rumah klaster atau pengelola kantor di BSD membutuhkan bukti portofolio pengerjaan dan spesifikasi material sebelum bersedia mengundang survei lokasi, namun file katalog PDF terlalu besar untuk dikirim via chat.',
        solution: 'Merancang website company profile ringan dengan galeri proyek terkompresi (WebP), rincian tahapan kerja dari survei hingga serah terima, dan formulir permintaan estimasi awal berdasarkan luas ruangan.',
        expectedOutcome: 'Kredibilitas di mata klien meningkat sejak klik pertama, mempercepat proses kualifikasi prospek sebelum tim teknis turun melakukan survei lapangan.'
      }
    ],
    collaborationHeading: 'Cara kami bekerja bersama klien di BSD City (Tatap Muka & Remote)',
    collaborationParagraphs: [
      'Basis operasional CHESTAADOTCOM berada langsung di kawasan BSD, Tangerang Selatan. Kedekatan lokasi ini memberikan fleksibilitas penuh bagi kamu: seluruh proses mulai dari bedah kebutuhan (discovery), penyusunan struktur konten, hingga peluncuran dapat dijalankan 100% secara remote melalui Google Meet dan WhatsApp untuk menghemat waktumu.',
      'Namun, apabila proyek membutuhkan diskusi arsitektur yang lebih mendalam, penyelarasan dengan beberapa pengambil keputusan sekaligus, atau peninjauan alur operasional di tempat usahamu, kami dapat menjadwalkan sesi tatap muka langsung di area BSD City sesuai kesepakatan jadwal terlebih dahulu. Kamu tetap mendapatkan dokumentasi tertulis, tautan staging langsung, dan laporan progres terstruktur di setiap tahap pengerjaan.'
    ],
    deliverablesSummary: [
      'Desain antarmuka bersih (mobile-first) yang menyesuaikan identitas visual bisnismu tanpa template pasaran',
      'Kecepatan muat tinggi (target LCP < 2,5 detik) dengan optimasi gambar modern dan kode bebas skrip membebani',
      'Struktur SEO lokal & schema JSON-LD (LocalBusiness, Service, FAQPage) agar mudah dikenali mesin pencari dan AI',
      'Integrasi alur konversi WhatsApp dengan format pesan terstruktur serta pemasangan pelacakan analitik dasar',
      'Kepemilikan penuh atas source code, domain, serta sesi panduan pengelolaan konten mandiri setelah rilis'
    ],
    priceNote: {
      startingPrice: 'Mulai dari Rp1.200.000',
      timeline: 'Estimasi 5–14 hari kerja (bergantung pada kesiapan materi & jumlah halaman)',
      note: 'Biaya pasti disepakati di awal berdasarkan cakupan halaman dan fitur sebelum pengerjaan dimulai, tanpa biaya tersembunyi.'
    },
    caseStudyReference: {
      title: 'Referensi Implementasi Website & Katalog Digital',
      summary: 'Kami telah membantu berbagai pelaku usaha menata ulang kehadiran web mereka dari sekadar halaman profil statis menjadi kanal akuisisi prospek yang terukur. Rincian metrik klien spesifik dicantumkan sesuai izin publikasi.',
      metricNote: 'Metrik konversi proyek spesifik klien tersedia saat sesi konsultasi.',
      relatedBlogSlug: 'Jasa-Pembuatan-Website-Bisnis-di-Tangerang-Selatan',
      relatedBlogTitle: 'Panduan Memilih Jasa Pembuatan Website Bisnis di Tangerang Selatan'
    },
    faqs: [
      {
        question: 'Apakah tim CHESTAADOTCOM bisa bertemu langsung di area BSD City sebelum proyek dimulai?',
        answer: 'Bisa. Karena tim kami berbasis di BSD, Tangerang Selatan, kami dapat menjadwalkan pertemuan tatap muka di area BSD setelah sesi penyaringan kebutuhan awal via WhatsApp atau Google Meet selesai dilakukan.'
      },
      {
        question: 'Berapa biaya pembuatan website untuk bisnis yang baru buka cabang di BSD?',
        answer: 'Paket pembuatan landing page dan website bisnis kami dimulai dari Rp1.200.000. Untuk website korporat multi-halaman atau katalog dengan sistem filter khusus, estimasi biaya akan dirinci secara transparan setelah kami memahami daftar halaman yang kamu butuhkan.'
      },
      {
        question: 'Bagaimana jika bisnis saya di BSD belum memiliki foto profesional atau draf tulisan lengkap?',
        answer: 'Kami membantu menyusun kerangka copywriting (struktur kalimat penawaran, keunggulan layanan, dan alur CTA) agar komunikatif dan bebas kalimat klise. Untuk aset visual, kami memberikan panduan pengambilan foto yang tepat agar tetap autentik mewakili operasional bisnismu.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan Website & Landing Page',
    areaSlug: 'alam-sutera',
    areaName: 'Alam Sutera',
    indexable: true,
    metaTitle: 'Jasa Pembuatan Website di Alam Sutera, Tangsel | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website profesional & landing page untuk bisnis di Alam Sutera. Desain rapi, loading cepat, SEO lokal siap pakai, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Alam Sutera',
    quickSummary: 'CHESTAADOTCOM melayani pembuatan website perusahaan, showroom digital, dan landing page untuk bisnis di kawasan Alam Sutera. Dari basis operasional kami di BSD, Tangerang Selatan, kami merancang website berkecepatan tinggi dengan struktur SEO yang jujur dan harga jelas mulai dari Rp1.200.000.',
    localContextHeading: 'Karakteristik pasar Alam Sutera dan pentingnya presentasi web yang presisi',
    localContextParagraphs: [
      'Kawasan Alam Sutera dikenal dengan perpaduan gedung perkantoran, showroom furnitur dan bahan bangunan premium, pusat kebugaran dan wellness, restoran keluarga, serta deretan ruko komersial yang melayani segmen konsumen menengah ke atas. Pelanggan yang bertransaksi di Alam Sutera sangat memperhatikan kerapian visual, kejelasan spesifikasi produk, serta kemudahan menghubungi tim penjualan sebelum mereka memutuskan datang ke lokasi fisik.',
      'Masalah yang sering dialami pemilik showroom, studio desain, maupun distributor B2B di Alam Sutera adalah ketimpangan antara kualitas tempat usaha fisik mereka yang sangat rapi dengan tampilan website yang lambat, tidak responsif di layar ponsel, atau memiliki tautan rusak. Ketika kamu menjalankan iklan berbayar (Google Ads atau Meta Ads) yang menargetkan audiens di sekitar Serpong Utara dan koridor tol Jakarta–Merak, halaman tujuan (landing page) yang lambat akan membuang anggaran iklan secara percuma.',
      'Kami membangun website untuk pelaku usaha di Alam Sutera dengan pendekatan rekayasa perangkat lunak yang berfokus pada kejelasan informasi dan performa teknis. Setiap halaman dirancang agar koleksi produk, jadwal layanan, atau portofolio proyekmu tampil tajam tanpa mengorbankan kecepatan muat halaman. Hasilnya adalah pengalaman digital yang setara dengan standar pelayanan fisik bisnismu di lapangan.'
    ],
    businessMixList: [
      'Showroom furnitur, material bangunan, kitchen set, dan studio arsitektur interior',
      'Klinik kecantikan, studio pilates/wellness, dan layanan perawatan kesehatan',
      'Kantor distributor B2B, importir, dan perusahaan jasa korporat di gedung perkantoran',
      'Bisnis F&B, katering korporat, dan penyedia ruang acara (venue/event space)',
      'Akademi pendidikan, kursus bahasa, dan pusat pengembangan anak'
    ],
    scenarios: [
      {
        title: 'Showroom Interior & Material Bangunan di Kawasan Komersial Alam Sutera',
        businessType: 'Showroom Furnitur & Material',
        challenge: 'Pengunjung iklan digital sering keluar dari halaman sebelum gambar katalog selesai dimuat, sementara tim sales kesulitan membagikan spesifikasi teknis produk secara ringkas kepada arsitek atau pemilik rumah.',
        solution: 'Membuat website katalog terstruktur dengan kategori produk yang mudah difilter, lembar spesifikasi yang dapat diakses cepat di layar HP, dan tombol penjadwalan kunjungan showroom (book a visit) via WhatsApp.',
        expectedOutcome: 'Durasi baca katalog meningkat drastis karena gambar teroptimasi penuh, dan prospek yang datang ke showroom sudah mengetahui seri produk yang ingin mereka lihat.'
      },
      {
        title: 'Kantor Distributor & Penyedia Layanan B2B di Alam Sutera',
        businessType: 'Distributor & Layanan Korporat',
        challenge: 'Tim pengadaan (procurement) dari perusahaan klien membutuhkan profil perusahaan resmi, daftar sertifikasi/kemitraan, dan formulir permintaan penawaran (RFQ) yang kredibel untuk proses verifikasi vendor.',
        solution: 'Membangun website korporat dengan arsitektur informasi yang tegas, halaman lini produk industri, unduhan dokumen spesifikasi resmi, serta alur formulir RFQ yang langsung meneruskan data ke tim sales.',
        expectedOutcome: 'Proses verifikasi vendor oleh klien korporat berjalan lebih lancar dan tim penjualan menerima data kebutuhan prospek yang jauh lebih lengkap.'
      }
    ],
    collaborationHeading: 'Cara kami melayani klien di Alam Sutera',
    collaborationParagraphs: [
      'Kami tidak mengklaim memiliki kantor cabang di Alam Sutera; basis kerja tim CHESTAADOTCOM berada di BSD, Tangerang Selatan, yang berjarak tempuh singkat melalui jalur Serpong–Alam Sutera. Mayoritas klien kami di Alam Sutera memilih kolaborasi secara remote melalui panggilan video terjadwal dan grup koordinasi WhatsApp karena jauh lebih efisien bagi jadwal operasional mereka.',
      'Apabila dibutuhkan sesi tatap muka untuk menyamakan persepsi desain, meninjau produk fisik di showroom, atau berdiskusi langsung dengan manajemen di Alam Sutera, tim kami dapat menjadwalkan kunjungan langsung sesuai kesepakatan waktu. Seluruh tahapan revisi dan persetujuan tetap terdokumentasi rapi secara digital.'
    ],
    deliverablesSummary: [
      'Halaman web responsif dengan tipografi bersih dan tata letak yang menonjolkan kejelasan produk/jasa',
      'Optimasi gambar katalog resolusi tinggi ke format generasi baru agar tetap tajam namun sangat ringan',
      'Konfigurasi teknis SEO on-page (meta tag, canonical, sitemap, dan schema markup terstruktur)',
      'Integrasi tombol konsultasi/kunjungan ke WhatsApp dengan teks pembuka otomatis sesuai halaman yang dilihat',
      'Panduan pembaruan konten dan dukungan teknis pasca-peluncuran'
    ],
    priceNote: {
      startingPrice: 'Mulai dari Rp1.200.000',
      timeline: 'Estimasi 5–14 hari kerja sesuai kompleksitas halaman',
      note: 'Rincian fitur dan total investasi dikunci dalam dokumen ruang lingkup kerja sebelum pembayaran tahap awal.'
    },
    caseStudyReference: {
      title: 'Transformasi Landing Page & Profil Perusahaan B2B',
      summary: 'Pendekatan kami menggabungkan kecepatan pemuatan halaman dengan struktur argumen penjualan yang terukur, sehingga anggaran iklan maupun trafik pencarian organik menghasilkan diskusi bisnis yang nyata.',
      metricNote: 'Data perbandingan kecepatan dan rasio kontak prospek tersedia pada sesi bedah portofolio.',
      relatedBlogSlug: 'Jasa-Pembuatan-Website-Bisnis-di-Tangerang-Selatan',
      relatedBlogTitle: 'Panduan Memilih Jasa Pembuatan Website Bisnis di Tangerang Selatan'
    },
    faqs: [
      {
        question: 'Apakah CHESTAADOTCOM berkantor di Alam Sutera?',
        answer: 'Basis kami berada di BSD, Tangerang Selatan, dan kami secara aktif melayani klien bisnis di kawasan Alam Sutera baik melalui koordinasi online maupun pertemuan tatap muka terjadwal di lokasi usahamu.'
      },
      {
        question: 'Apakah website yang dibuat cocok untuk dijadikan landing page iklan Google Ads atau Instagram Ads?',
        answer: 'Sangat cocok. Kami merancang struktur halaman dengan pesan utama di paruh atas layar (above the fold), waktu muat cepat untuk menekan rasio pentalan (bounce rate), serta struktur tombol CTA yang jelas untuk memaksimalkan konversi iklan.'
      },
      {
        question: 'Bisakah website menampilkan katalog produk tanpa fitur keranjang belanja e-commerce yang rumit?',
        answer: 'Bisa. Banyak bisnis showroom dan B2B di Alam Sutera lebih membutuhkan katalog spesifikasi produk yang rapi dengan tombol "Tanya Stok / Minta Penawaran via WhatsApp" per item dibandingkan checkout otomatis.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan Website & Landing Page',
    areaSlug: 'bintaro',
    areaName: 'Bintaro',
    indexable: true,
    metaTitle: 'Jasa Pembuatan Website di Bintaro, Tangsel | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website & landing page untuk bisnis, klinik, dan studio kreatif di Bintaro, Tangerang Selatan. Cepat, rapi, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Bintaro',
    quickSummary: 'CHESTAADOTCOM membantu bisnis, klinik, konsultan, dan studio kreatif di kawasan Bintaro memiliki website yang cepat, rapi, dan menghasilkan prospek berkualitas. Berbasis di BSD, Tangerang Selatan, kami menawarkan pengembangan web berstandar modern dengan harga mulai dari Rp1.200.000.',
    localContextHeading: 'Membantu bisnis di kawasan Bintaro mengubah pencarian lokal menjadi pelanggan',
    localContextParagraphs: [
      'Bintaro (khususnya sektor-sektor yang masuk dalam wilayah administratif Tangerang Selatan hingga perbatasan Jakarta Selatan) memiliki ekosistem bisnis yang sangat khas: perpaduan antara hunian mapan, studio arsitektur dan kreatif, klinik kesehatan keluarga, sekolah dan lembaga kursus, hingga bisnis kuliner dan jasa perawatan rumah. Karakter warga dan pelaku bisnis di Bintaro sangat mengandalkan rekomendasi komunitas yang kemudian selalu diverifikasi ulang melalui pencarian Google.',
      'Ketika seseorang direkomendasikan sebuah klinik terapi anak, biro arsitek, atau jasa katering di Bintaro, langkah pertama yang mereka lakukan adalah mengetik nama bisnis tersebut di mesin pencari. Jika yang muncul hanyalah akun media sosial yang sulit dinavigasi untuk mencari daftar harga atau penjelasan layanan lengkap, tingkat kepercayaan calon pelanggan akan turun, terutama untuk layanan bernilai jutaan hingga puluhan juta rupiah.',
      'Kami merancang website bagi pelaku usaha di Bintaro agar mampu menjawab rasa ingin tahu calon pelanggan secara tuntas dalam waktu kurang dari satu menit baca. Mulai dari penjelasan masalah yang diselesaikan, rincian paket layanan, profil tim atau tenaga ahli, hingga jawaban atas pertanyaan umum (FAQ) disajikan dengan bahasa yang lugas dan tampilan yang nyaman dibaca di layar ponsel maupun laptop.'
    ],
    businessMixList: [
      'Biro arsitektur, desainer interior, dan kontraktor renovasi rumah di Bintaro',
      'Klinik psikologi, tumbuh kembang anak, klinik gigi, dan praktik kesehatan mandiri',
      'Studio kreatif, rumah produksi, agensi butik, dan konsultan profesional',
      'Lembaga pendidikan non-formal, kursus musik/olahraga, dan prasekolah',
      'Jasa pemeliharaan rumah (home services), katering harian/acara, dan bisnis ritel lokal'
    ],
    scenarios: [
      {
        title: 'Biro Arsitek & Renovasi Rumah di Kawasan Bintaro Jaya',
        businessType: 'Arsitektur & Konstruksi Hunian',
        challenge: 'Pemilik rumah di sektor-sektor Bintaro yang ingin merenovasi hunian sering ragu menghubungi kontraktor karena tidak adanya kejelasan alur desain, transparansi tahapan pembayaran, dan contoh proyek nyata.',
        solution: 'Membangun website portofolio arsitektur dengan studi kasus per proyek (masalah ruang, pendekatan desain, hasil akhir), penjelasan transparan alur kerja 4 tahap, dan formulir konsultasi rencana renovasi.',
        expectedOutcome: 'Menyaring calon klien yang serius dan menghargai proses desain, sekaligus memangkas waktu edukasi awal saat diskusi pertama.'
      },
      {
        title: 'Klinik Tumbuh Kembang & Layanan Konsultasi Keluarga di Bintaro',
        businessType: 'Klinik Kesehatan & Terapi',
        challenge: 'Orang tua membutuhkan penjelasan mendalam mengenai metode terapi, kualifikasi terapis, dan prosedur asesmen awal sebelum mendaftarkan anak, yang tidak muat dijelaskan lewat caption media sosial.',
        solution: 'Merancang website yang hangat dan informatif dengan halaman penjelasan tiap program terapi, profil terapis berlisensi, panduan kunjungan pertama, dan tombol pendaftaran asesmen via WhatsApp.',
        expectedOutcome: 'Orang tua merasa tenang dan terinformasi dengan baik sebelum datang, meningkatkan rasio kehadiran jadwal konsultasi.'
      }
    ],
    collaborationHeading: 'Kolaborasi fleksibel untuk klien di Bintaro',
    collaborationParagraphs: [
      'Tim CHESTAADOTCOM beroperasi dari basis kami di BSD, Tangerang Selatan, yang berada dalam satu wilayah kota madya dengan sebagian besar kawasan Bintaro. Kami merancang alur kerja agar kamu tidak perlu meninggalkan rutinitas bisnis: pengumpulan materi, peninjauan draf antarmuka, hingga uji coba fungsional dapat diselesaikan sepenuhnya secara daring.',
      'Jika proyekmu memerlukan sesi diskusi tatap muka di area Bintaro atau BSD untuk membedah alur layanan yang kompleks, kami siap menjadwalkan pertemuan langsung. Setiap keputusan desain dan teknis dicatat secara jelas agar proyek selesai tepat waktu sesuai kesepakatan.'
    ],
    deliverablesSummary: [
      'Website kustom dengan struktur konten yang fokus pada edukasi pelanggan dan konversi konsultasi',
      'Performa halaman optimal untuk pengguna jaringan seluler dengan skor Core Web Vitals yang sehat',
      'Implementasi SEO lokal (judul halaman natural, meta description akurat, dan schema JSON-LD)',
      'Integrasi formulir atau tombol WhatsApp langsung ke admin dengan format pesan yang sudah dikategorikan',
      'Dokumentasi singkat penggunaan dan jaminan perbaikan bug teknis pasca-rilis'
    ],
    priceNote: {
      startingPrice: 'Mulai dari Rp1.200.000',
      timeline: 'Estimasi 5–14 hari kerja',
      note: 'Harga disesuaikan secara adil dengan jumlah halaman dan fitur yang benar-benar dibutuhkan bisnismu.'
    },
    caseStudyReference: {
      title: 'Studi Kasus Penataan Struktur Informasi Layanan Lokal',
      summary: 'Website yang baik menyederhanakan keputusan pembelian pelanggan. Kami menyusun ulang alur informasi agar pengunjung langsung memahami nilai layananmu tanpa harus bertanya hal dasar berulang kali.',
      metricNote: 'Contoh hasil implementasi dan metrik performa teknis dapat ditinjau saat sesi konsultasi.',
      relatedBlogSlug: 'Jasa-Pembuatan-Website-Bisnis-di-Tangerang-Selatan',
      relatedBlogTitle: 'Panduan Memilih Jasa Pembuatan Website Bisnis di Tangerang Selatan'
    },
    faqs: [
      {
        question: 'Apakah saya perlu menyiapkan teks lengkap untuk seluruh halaman website sebelum menghubungi CHESTAADOTCOM?',
        answer: 'Tidak harus lengkap dari awal. Cukup ceritakan layanan utamamu, target pelanggan di Bintaro, dan pertanyaan yang paling sering diajukan klien. Tim kami akan membantu merapikan struktur kalimatnya agar enak dibaca.'
      },
      {
        question: 'Apakah domain (.com atau .co.id) dan hosting akan menjadi milik bisnis saya sendiri?',
        answer: 'Ya, 100%. Kami memastikan akses domain, akun pengelolaan, dan kode sumber tercatat atas nama bisnismu atau diserahkan penuh sehingga kamu tidak terkunci pada satu vendor.'
      },
      {
        question: 'Berapa lama waktu pembuatan landing page untuk kampanye layanan baru di Bintaro?',
        answer: 'Untuk landing page satu halaman dengan fokus konversi yang materinya sudah jelas, pengerjaan rata-rata membutuhkan waktu 5 hingga 7 hari kerja hingga siap dipublikasikan.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan Website & Landing Page',
    areaSlug: 'gading-serpong',
    areaName: 'Gading Serpong',
    indexable: true,
    metaTitle: 'Jasa Pembuatan Website di Gading Serpong | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website bisnis, katalog ruko komersial, dan landing page di Gading Serpong. Desain bersih, cepat, SEO lokal siap, mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Gading Serpong',
    quickSummary: 'CHESTAADOTCOM menyediakan jasa pembuatan website bisnis dan landing page bagi pelaku usaha di Gading Serpong. Dari basis kami yang bersebelahan langsung di BSD, Tangerang Selatan, kami membangun website ringan, teroptimasi SEO lokal, dan siap mengonversi pengunjung menjadi prospek mulai dari Rp1.200.000.',
    localContextHeading: 'Menangkan persaingan padat di ruko komersial Gading Serpong lewat website yang terarah',
    localContextParagraphs: [
      'Gading Serpong merupakan salah satu kawasan dengan kepadatan ruko komersial dan pertumbuhan bisnis baru paling dinamis di koridor barat Jakarta. Dalam satu deretan ruko saja, bisa terdapat beberapa klinik kecantikan, kursus edukasi, bengkel modifikasi, agensi properti, hingga penyedia jasa profesional yang membidik pasar serupa. Persaingan yang sangat rapat ini membuat pelanggan memiliki banyak sekali pilihan dalam radius beberapa kilometer.',
      'Di tengah padatnya pilihan tersebut, mengandalkan spanduk fisik dan unggahan media sosial saja sering kali membuat bisnismu sulit dibedakan dari kompetitor sebelah. Ketika calon pelanggan di Gading Serpong mencari layanan spesifik di Google atau mengklik iklan lokasimu, mereka membutuhkan alasan kuat dan informasi yang terstruktur rapi untuk memilih tempatmu dibandingkan tempat lain di blok ruko yang sama.',
      'Kami membantu bisnis di Gading Serpong membangun pembeda tersebut melalui website yang cepat, jujur, dan terfokus pada kejelasan penawaran. Kami tidak menggunakan gimik animasi berat yang memperlambat layar; sebaliknya, kami menonjolkan keunggulan paketmu, transparansi proses layanan, petunjuk lokasi yang jelas, serta alur konsultasi instan via WhatsApp agar pengunjung tidak beralih ke tab kompetitor.'
    ],
    businessMixList: [
      'Bisnis ruko komersial: klinik kecantikan, dental care, optik, dan studio kebugaran',
      'Pusat kursus, bimbingan belajar, pelatihan bahasa, dan persiapan studi luar negeri',
      'Agensi pemasaran properti independen, konsultan pajak/hukum, dan jasa pembukuan',
      'Bengkel perawatan mobil/detailing, aksesoris otomotif, dan penyewaan peralatan',
      'Grosir, supplier bahan baku F&B, dan katering di sekitar Gading Serpong'
    ],
    scenarios: [
      {
        title: 'Lembaga Kursus & Pelatihan Edukasi di Ruko Gading Serpong',
        businessType: 'Pendidikan & Kursus Keterampilan',
        challenge: 'Calon siswa dan orang tua bingung membedakan kurikulum antar level kelas, jadwal gelombang baru, dan rincian biaya pendaftaran karena informasi tersebar di puluhan sorotan cerita (story highlights) media sosial.',
        solution: 'Membangun website terstruktur dengan halaman kurikulum per program, tabel perbandingan kelas reguler vs privat, jadwal pendaftaran terbaru, dan tombol klaim kelas percobaan (trial class) via WhatsApp.',
        expectedOutcome: 'Jumlah pendaftaran kelas percobaan meningkat karena orang tua dapat mempelajari kurikulum secara utuh dan mendaftar dalam dua kali klik.'
      },
      {
        title: 'Bengkel Detailing Otomotif & Layanan Spesialis di Gading Serpong',
        businessType: 'Otomotif & Layanan Spesialis',
        challenge: 'Pemilik kendaraan ingin mengetahui perbedaan spesifikasi paket coating/detailing berdasarkan ukuran mobil dan durasi pengerjaan sebelum melakukan booking slot harian.',
        solution: 'Merancang landing page dan halaman katalog paket dengan tabel perbandingan layanan berdasarkan ukuran kendaraan, galeri hasil pengerjaan asli, dan tombol cek ketersediaan slot harian langsung ke admin bengkel.',
        expectedOutcome: 'Mengurangi antrean tanya-jawab dasar di chat dan meningkatkan kepastian jadwal pengerjaan harian di workshop.'
      }
    ],
    collaborationHeading: 'Cara kerja kami dengan pelaku usaha di Gading Serpong',
    collaborationParagraphs: [
      'Kawasan Gading Serpong berbatasan langsung dengan basis operasional CHESTAADOTCOM di BSD, Tangerang Selatan. Kedekatan geografis ini memudahkan kami memahami lanskap persaingan lokal di Gading Serpong. Seluruh alur pembuatan website tetap kami rancang agar praktis dan dapat diselesaikan secara remote tanpa mengganggu jam sibuk operasional tokomu.',
      'Apabila diperlukan pertemuan langsung untuk mendiskusikan struktur katalog layanan atau meninjau operasional di ruko/kantormu di Gading Serpong, tim kami dapat menjadwalkan kunjungan tatap muka. Setiap tahap pengerjaan memiliki jadwal yang terukur mulai dari penyusunan kerangka konten hingga peluncuran resmi.'
    ],
    deliverablesSummary: [
      'Desain website modern dengan hierarki visual yang jelas untuk membedakan paket layananmu',
      'Kecepatan muat instan di perangkat mobile untuk meminimalkan kehilangan trafik iklan lokal',
      'Penerapan struktur SEO lokal dan FAQ terstruktur untuk menangkap pencarian berniat beli tinggi',
      'Alur CTA WhatsApp terarah yang memudahkan tim admin mengenali layanan yang diminati pengunjung',
      'Sesi serah terima penuh beserta panduan praktis jika kamu ingin memperbarui info promo/jadwal'
    ],
    priceNote: {
      startingPrice: 'Mulai dari Rp1.200.000',
      timeline: 'Estimasi 5–14 hari kerja',
      note: 'Estimasi biaya bersifat tetap sesuai kesepakatan ruang lingkup di awal proyek.'
    },
    caseStudyReference: {
      title: 'Optimalisasi Konversi untuk Bisnis Komersial Lokal',
      summary: 'Di area dengan persaingan sepadat Gading Serpong, kecepatan akses dan kejelasan tabel paket layanan menjadi penentu utama apakah pengunjung menghubungi adminmu atau menutup halaman.',
      metricNote: 'Metrik peningkatan rasio klik WhatsApp dari proyek sebelumnya dapat didiskusikan saat sesi konsultasi.',
      relatedBlogSlug: 'Jasa-Pembuatan-Website-Bisnis-di-Tangerang-Selatan',
      relatedBlogTitle: 'Panduan Memilih Jasa Pembuatan Website Bisnis di Tangerang Selatan'
    },
    faqs: [
      {
        question: 'Seberapa dekat tim CHESTAADOTCOM dengan area Gading Serpong?',
        answer: 'Kami berbasis di BSD, Tangerang Selatan, tepat bersebelahan dengan kawasan Gading Serpong. Kami melayani klien di Gading Serpong baik secara online penuh maupun dengan pertemuan terjadwal bila dibutuhkan.'
      },
      {
        question: 'Apakah website saya nantinya bisa diintegrasikan dengan AI Agent untuk membalas chat pelanggan?',
        answer: 'Sangat bisa. Arsitektur website yang kami bangun sudah siap dihubungkan dengan layanan AI Agent maupun otomasi workflow kapan pun bisnismu siap meningkatkan kapasitas penanganan prospek.'
      },
      {
        question: 'Apakah ada biaya bulanan wajib setelah website selesai dibuat?',
        answer: 'Tidak ada biaya langganan bulanan yang mengikat untuk kode websitenya. Biaya rutin tahunan hanyalah perpanjangan nama domain dan infrastruktur hosting sesuai kapasitas yang kamu gunakan, atau paket pemeliharaan opsional jika kamu memilihnya.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Pembuatan Website & Landing Page',
    areaSlug: 'tangerang-selatan',
    areaName: 'Tangerang Selatan',
    indexable: true,
    metaTitle: 'Jasa Pembuatan Website di Tangerang Selatan | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website bisnis, company profile, dan landing page di Tangerang Selatan (BSD, Bintaro, Serpong, Ciputat, Pamulang). Mulai Rp1.200.000.',
    h1: 'Jasa pembuatan website untuk bisnis di Tangerang Selatan',
    quickSummary: 'CHESTAADOTCOM adalah partner teknis pembuatan website bisnis, company profile, dan landing page yang berbasis di BSD, Tangerang Selatan. Kami melayani perusahaan dan UMKM di seluruh wilayah Tangerang Selatan dengan standar kode modern, SEO lokal terukur, dan harga transparan mulai dari Rp1.200.000.',
    localContextHeading: 'Membangun fondasi digital yang kredibel untuk bisnis di Kota Tangerang Selatan',
    localContextParagraphs: [
      'Kota Tangerang Selatan—yang mencakup Serpong, Serpong Utara, Pondok Aren, Ciputat, Ciputat Timur, Pamulang, dan Setu—memiliki spektrum bisnis yang sangat luas. Mulai dari pabrik skala ringan dan distributor di area Setu dan Pamulang, institusi akademik dan layanan mahasiswa di sekitar Ciputat, hingga pusat komersial modern di koridor Serpong dan Bintaro. Pertumbuhan ekonomi kota ini mendorong semakin ketatnya kompetisi pencarian di internet untuk hampir semua kategori jasa lokal.',
      'Banyak pelaku usaha di Tangerang Selatan sudah menyadari pentingnya kehadiran online, namun terjebak pada dua ekstrem: membuat website seadanya yang tidak pernah muncul di pencarian karena struktur teknisnya buruk, atau membayar mahal untuk fitur rumit yang sebenarnya tidak pernah dipakai oleh tim operasional mereka. Padahal, yang paling dibutuhkan oleh mayoritas bisnis lokal adalah website yang cepat diakses, menjelaskan layanan secara jujur, mudah ditemukan di Google untuk kata kunci lokal, dan mengarahkan pengunjung langsung ke kanal komunikasi penjualan.',
      'Sebagai tim rekayasa perangkat lunak yang tumbuh dan beroperasi di Tangerang Selatan, kami merancang website dengan memprioritaskan hasil bisnis nyata. Setiap proyek dimulai dengan memetakan siapa target pembeli utamamu di Tangsel dan Jabodetabek, kata kunci apa yang mereka gunakan saat mencari solusi, serta informasi krusial apa yang harus terpampang jelas agar mereka yakin menghubungi timmu.'
    ],
    businessMixList: [
      'Perusahaan jasa B2B, supplier industri, dan distributor di wilayah Tangerang Selatan',
      'Klinik kesehatan, laboratorium medis, apotek terpadu, dan layanan homecare',
      'Institusi pendidikan, sekolah swasta, yayasan sosial, dan lembaga pelatihan kerja',
      'Jasa konstruksi, bengkel fabrikasi, perawatan gedung (pest control, cleaning, HVAC)',
      'UMKM bertumbuh, katering, konveksi/produksi, dan layanan profesional (hukum, akuntansi)'
    ],
    scenarios: [
      {
        title: 'Penyedia Jasa Perawatan Gedung & Teknis Rumah Tangga di Tangerang Selatan',
        businessType: 'Jasa Teknis & Perawatan Properti',
        challenge: 'Pelanggan yang mengalami masalah darurat (seperti perbaikan AC sentral, instalasi listrik, atau waterproofing) mencari vendor terdekat di Tangsel via Google, namun website lama perusahaan tidak mencantumkan cakupan kecamatan dan daftar layanan secara jelas.',
        solution: 'Membangun website layanan yang terstruktur berdasarkan jenis pengerjaan dan cakupan area layanan di Tangerang Selatan, dilengkapi estimasi biaya kunjungan dasar serta tombol panggilan/WhatsApp darurat yang selalu terlihat di layar HP.',
        expectedOutcome: 'Website menangkap trafik pencarian lokal dengan niat beli tinggi (high-intent search) dan langsung mengonversinya menjadi jadwal kunjungan teknisi.'
      },
      {
        title: 'Perusahaan Manufaktur Ringan, Konveksi, atau Supplier B2B di Ciputat & Pamulang',
        businessType: 'Produksi & Supplier B2B',
        challenge: 'Calon pembeli grosir dari luar daerah ragu melakukan pemesanan partai besar karena perusahaan belum memiliki profil digital resmi yang menjelaskan kapasitas produksi, minimum order (MOQ), dan alur pengiriman.',
        solution: 'Merancang website company profile & katalog produksi yang menampilkan fasilitas kerja asli, rincian MOQ per kategori barang, alur pemesanan B2B, serta formulir permintaan sampel/penawaran harga.',
        expectedOutcome: 'Meningkatkan kepercayaan pembeli B2B dari seluruh Jabodetabek dan luar kota tanpa harus selalu mengandalkan perantara marketplace.'
      }
    ],
    collaborationHeading: 'Partner teknologi lokalmu di Tangerang Selatan',
    collaborationParagraphs: [
      'Dengan basis operasional di BSD, Tangerang Selatan, kami memahami ritme kerja pelaku usaha di wilayah ini—baik yang berada di Serpong, Pondok Aren, Ciputat, maupun Pamulang. Kami mengutamakan komunikasi yang lugas tanpa istilah teknis yang membingungkan: kamu berdiskusi langsung dengan tim yang merancang dan menulis kode websitemu.',
      'Proses pengerjaan dapat dilakukan 100% secara daring melalui WhatsApp dan Google Meet untuk efisiensi waktu, maupun dikombinasikan dengan sesi tatap muka di wilayah Tangerang Selatan sesuai kesepakatan jadwal. Setelah website meluncur, kami memastikan timmu memiliki kendali penuh atas aset digital tersebut.'
    ],
    deliverablesSummary: [
      'Arsitektur website kustom yang ringan, aman, dan dirancang khusus untuk kebutuhan pasar lokal & B2B',
      'Skor performa teknis tinggi dengan struktur heading (H1–H3) dan meta tag yang rapi untuk SEO lokal Tangsel',
      'Integrasi schema JSON-LD lengkap (LocalBusiness, Service, FAQPage, BreadcrumbList)',
      'Tombol konversi WhatsApp & formulir prospek yang terhubung langsung ke alur kerja adminmu',
      'Kepemilikan penuh aset digital beserta sesi pelatihan singkat pengelolaan konten'
    ],
    priceNote: {
      startingPrice: 'Mulai dari Rp1.200.000',
      timeline: 'Estimasi 5–14 hari kerja',
      note: 'Tersedia opsi pengembangan bertahap: mulai dari landing page inti hingga website multi-halaman seiring pertumbuhan bisnismu.'
    },
    caseStudyReference: {
      title: 'Rekayasa Website Berorientasi Konversi Lokal',
      summary: 'Kami membangun website sebagai aset akuisisi prospek jangka panjang bagi bisnis di Tangerang Selatan, bukan sekadar pengeluaran desain satu kali.',
      metricNote: 'Studi kasus teknis dan rincian performa halaman tersedia untuk ditinjau bersama saat konsultasi awal.',
      relatedBlogSlug: 'Jasa-Pembuatan-Website-Bisnis-di-Tangerang-Selatan',
      relatedBlogTitle: 'Panduan Memilih Jasa Pembuatan Website Bisnis di Tangerang Selatan'
    },
    faqs: [
      {
        question: 'Apakah layanan pembuatan website ini mencakup seluruh kecamatan di Tangerang Selatan?',
        answer: 'Ya. Dari basis kami di BSD, Tangerang Selatan, kami melayani klien di seluruh kecamatan Tangerang Selatan (Serpong, Serpong Utara, Pondok Aren, Ciputat, Ciputat Timur, Pamulang, dan Setu) serta area Jabodetabek.'
      },
      {
        question: 'Apa bedanya membuat website di CHESTAADOTCOM dibanding jasa website murah yang memakai template instan?',
        answer: 'Kami menulis kode dengan arsitektur modern yang ringan, menyusun struktur kalimat penjualan yang spesifik untuk bisnismu, dan menerapkan standar teknis SEO serta JSON-LD secara presisi—bukan sekadar mengganti logo pada template berat yang dipakai ratusan bisnis lain.'
      },
      {
        question: 'Jika ke depannya bisnis saya di Tangsel butuh sistem kasir kustom, dashboard internal, atau AI Agent, apakah bisa dikembangkan lanjut?',
        answer: 'Tentu. Karena CHESTAADOTCOM adalah tim rekayasa perangkat lunak dan AI Agent, website yang kami bangun memiliki fondasi teknis yang siap diintegrasikan dengan sistem internal maupun otomasi operasional kapan pun kamu membutuhkannya.'
      }
    ],
    updatedAt: '2026-04-01'
  },

  // ============================================================================
  // 2. AI AGENT — 5 INDEXABLE PAGES
  // ============================================================================
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI Agent & Otomasi Chat',
    areaSlug: 'bsd-city',
    areaName: 'BSD City',
    indexable: true,
    metaTitle: 'Jasa AI Agent & Otomasi Chat Bisnis di BSD City | CHESTAADOTCOM',
    metaDescription: 'Implementasi AI Agent WhatsApp & asisten operasional untuk bisnis di BSD City, Tangsel. Kualifikasi leads 24/7 berbasis SOP resmi. Audit alur gratis.',
    h1: 'Implementasi AI Agent untuk operasional bisnis di BSD City',
    quickSummary: 'CHESTAADOTCOM merancang dan mengintegrasikan AI Agent kustom (WhatsApp & web) untuk bisnis di BSD City, Tangerang Selatan. Berbasis langsung di BSD, kami membantu klinik, properti, dan perusahaan B2B merespons prospek 24/7 berdasarkan basis pengetahuan (SOP) resmi dengan biaya yang dihitung transparan setelah sesi audit gratis.',
    localContextHeading: 'Mengatasi tumpukan chat di luar jam kerja bagi bisnis di BSD City',
    localContextParagraphs: [
      'Di kawasan bisnis yang bergerak cepat seperti BSD City, calon pelanggan sering kali mengirim pesan WhatsApp di luar jam operasional kantor—misalnya pukul 8 malam sepulang kerja atau di akhir pekan saat mereka sedang merencanakan kunjungan keluarga. Bagi klinik spesialis, agensi pemasaran properti, lembaga edukasi, maupun penyedia jasa B2B di BSD, keterlambatan merespons pesan hingga keesokan paginya sering berarti kehilangan prospek ke kompetitor yang merespons lebih dulu.',
      'Namun, memasang fitur auto-reply kaku berbasis tombol angka ("Ketik 1 untuk harga, ketik 2 untuk alamat") justru sering membuat pelanggan kelas menengah-atas di BSD merasa frustrasi karena pertanyaan spesifik mereka tidak terjawab. Di sisi lain, mempekerjakan staf admin shift malam penuh membutuhkan biaya tetap bulanan yang besar dan pengawasan operasional tambahan.',
      'Kami membangun AI Agent yang bekerja menggunakan pendekatan Retrieval-Augmented Generation (RAG) di atas dokumen resmi perusahaanmu—mulai dari katalog layanan, daftar harga, jadwal operasional, hingga aturan kualifikasi prospek. AI Agent ini mampu memahami bahasa percakapan natural pelanggan, menjawab pertanyaan sesuai batasan SOP tanpa mengarang informasi (anti-halusinasi), mengumpulkan data kebutuhan awal, dan menyerahkan percakapan (handover) secara mulus kepada admin manusia ketika prospek sudah siap bertransaksi.'
    ],
    businessMixList: [
      'Klinik kesehatan, dental care, dan pusat estetika di kawasan komersial BSD City',
      'Tim pemasaran properti klaster, ruang kantor, dan konsultan interior di BSD',
      'Lembaga pendidikan, kursus, dan penyelenggara pelatihan korporat',
      'Perusahaan teknologi, distributor B2B, dan layanan pelanggan korporat',
      'Showroom otomotif, bengkel spesialis, dan penyedia layanan reservasi terjadwal'
    ],
    scenarios: [
      {
        title: 'Klinik Estetika & Kesehatan dengan Volume Pertanyaan Jadwal Tinggi di BSD',
        businessType: 'Klinik Kesehatan & Reservasi',
        challenge: 'Admin klinik kewalahan membalas ratusan chat harian yang menanyakan kisaran biaya perawatan, persiapan sebelum tindakan, dan slot jadwal dokter, sehingga pasien yang ingin konfirmasi kehadiran justru tertunda.',
        solution: 'Menerapkan AI Agent WhatsApp yang terhubung ke basis pengetahuan layanan klinik dan kalender ketersediaan slot. Agent menjawab pertanyaan edukasi tindakan secara akurat, mendata nama serta keluhan pasien, lalu meneruskan ringkasan reservasi ke resepsionis.',
        expectedOutcome: 'Waktu respons pesan baru turun menjadi hitungan detik selama 24 jam, dan beban kerja repetitif admin berkurang signifikan.'
      },
      {
        title: 'Tim Pemasaran Properti & Interior di Kawasan Klaster BSD City',
        businessType: 'Properti & Interior',
        challenge: 'Iklan digital menghasilkan banyak pesan masuk di malam hari, tetapi banyak prospek dingin (sekadar tanya harga kasar) bercampur dengan pembeli serius yang ingin menjadwalkan survei akhir pekan.',
        solution: 'Merancang AI Agent kualifikasi prospek yang menanyakan tipe properti, estimasi anggaran, dan target waktu pengerjaan secara sopan, mengirimkan brosur yang relevan, lalu menjadwalkan sesi panggilan dengan konsultan senior untuk prospek yang memenuhi kriteria.',
        expectedOutcome: 'Tim sales fokus melayani prospek yang sudah terkualifikasi di pagi hari lengkap dengan ringkasan kebutuhan yang sudah terdata rapi.'
      }
    ],
    collaborationHeading: 'Pendekatan implementasi AI Agent bersama tim kami di BSD City',
    collaborationParagraphs: [
      'Karena CHESTAADOTCOM berbasis di BSD, Tangerang Selatan, kami dapat membedah alur percakapan pelangganmu secara mendalam—baik melalui sesi bedah SOP secara daring maupun diskusi langsung di kantormu di BSD City. Kami tidak menjual langganan chatbot generik lepas tangan; kami merancang arsitektur prompt, batasan keamanan (guardrails), dan integrasi data yang spesifik untuk proses bisnismu.',
      'Sebelum masuk ke tahap pengembangan berbayar, kami melakukan audit alur komunikasi gratis untuk menilai apakah masalah operasionalmu benar-benar membutuhkan AI Agent atau cukup diselesaikan dengan otomasi alur kerja sederhana. Setelah implementasi, setiap respons AI diuji terhadap skenario pertanyaan sulit sebelum dihubungkan ke nomor operasional utamamu.'
    ],
    deliverablesSummary: [
      'Pemetaan alur percakapan (conversation flow) dan kurasi basis pengetahuan (Knowledge Base/RAG) dari dokumen resmimu',
      'Konfigurasi guardrails ketat agar AI Agent hanya menjawab berdasarkan fakta perusahaan dan tidak menjanjikan hal di luar SOP',
      'Mekanisme human-in-the-loop (eskalasi otomatis ke staf admin manusia untuk negosiasi khusus atau komplain)',
      'Integrasi ke WhatsApp Business / widget web serta pencatatan data prospek otomatis ke Google Sheets atau CRM internal',
      'Masa pemantauan pasca-rilis (tuning respons berdasarkan log percakapan nyata) dan pelatihan tim admin'
    ],
    priceNote: {
      startingPrice: 'Dihitung setelah audit alur gratis',
      timeline: 'Estimasi 2–4 minggu (termasuk kurasi knowledge base & pengujian skenario)',
      note: 'Biaya implementasi disesuaikan dengan kompleksitas dokumen SOP, kanal integrasi (WhatsApp/Web/CRM), dan volume transaksi.'
    },
    caseStudyReference: {
      title: 'Otomasi Kualifikasi Prospek & Layanan Pelanggan Berbasis SOP',
      summary: 'AI Agent yang efektif bukan yang paling banyak bicara, melainkan yang paling patuh pada SOP perusahaan dan tahu kapan harus mengarahkan pelanggan ke tim manusia.',
      metricNote: 'Simulasi langsung dan metrik penghematan waktu respons dapat diuji saat sesi audit alur gratis.',
      relatedBlogSlug: 'Mengapa-Bisnis-Lokal-di-BSD-Membutuhkan-AI-Agent-Sekarang',
      relatedBlogTitle: 'Mengapa Bisnis Lokal di BSD Membutuhkan AI Agent untuk Operasional Harian'
    },
    faqs: [
      {
        question: 'Bagaimana cara mencegah AI Agent memberikan informasi harga atau janji yang salah kepada pelanggan saya di BSD?',
        answer: 'Kami menggunakan arsitektur Retrieval-Augmented Generation (RAG) dengan instruksi pembatas (system guardrails) yang ketat. AI hanya diizinkan mengutip data dari dokumen SOP dan daftar harga resmi yang telah disetujui. Jika ada pertanyaan di luar dokumen tersebut, AI akan dengan sopan mengalihkan percakapan ke admin manusia.'
      },
      {
        question: 'Apakah admin manusia tetap bisa mengambil alih chat WhatsApp kapan saja?',
        answer: 'Ya, sepenuhnya. Sistem dirancang dengan prinsip human-in-the-loop: begitu admin manusia masuk ke ruang percakapan atau ketika pelanggan meminta diskusi khusus, AI Agent akan berhenti membalas otomatis dan menyerahkan konteks percakapan kepada timmu.'
      },
      {
        question: 'Berapa biaya implementasi AI Agent untuk bisnis di BSD City?',
        answer: 'Biaya dihitung secara transparan setelah sesi audit gratis selama 30 menit, karena kebutuhan tiap bisnis berbeda—mulai dari sekadar asisten penjawab FAQ dan penjadwalan hingga agen yang terhubung langsung ke database stok atau CRM.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI Agent & Otomasi Chat',
    areaSlug: 'alam-sutera',
    areaName: 'Alam Sutera',
    indexable: true,
    metaTitle: 'Jasa AI Agent & Chatbot WhatsApp di Alam Sutera | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan AI Agent WhatsApp & otomasi layanan pelanggan untuk bisnis, showroom, dan klinik di Alam Sutera. Berbasis SOP resmi, audit gratis.',
    h1: 'Implementasi AI Agent untuk bisnis dan showroom di Alam Sutera',
    quickSummary: 'CHESTAADOTCOM membangun AI Agent kustom untuk menangani konsultasi awal pelanggan, katalog spesifikasi produk, dan penjadwalan kunjungan bagi bisnis di Alam Sutera. Dari basis kami di BSD, Tangerang Selatan, kami merancang asisten AI yang patuh SOP dengan perhitungan investasi setelah audit gratis.',
    localContextHeading: 'Menjaga standar pelayanan responsif bagi segmen pelanggan Alam Sutera',
    localContextParagraphs: [
      'Pelaku usaha di Alam Sutera—mulai dari showroom furnitur dan bahan bangunan premium, klinik perawatan kesehatan, studio olahraga/wellness, hingga distributor korporat—melayani segmen pelanggan yang mengharapkan respons cepat sekaligus sopan. Ketika calon pembeli melihat produk di katalog atau iklan digital, mereka sering mengajukan pertanyaan detail seputar dimensi barang, ketersediaan varian, syarat garansi, atau slot jadwal kunjungan showroom.',
      'Keterbatasan jumlah staf admin sering kali membuat pesan yang masuk saat jam sibuk showroom atau di malam hari baru terjawab berjam-jam kemudian. Di sisi lain, staf penjualan di lapangan kerap kehilangan fokus melayani pengunjung fisik karena harus terus-menerus mengetik jawaban yang sama di WhatsApp untuk pertanyaan spesifikasi dasar.',
      'Melalui implementasi AI Agent yang terhubung langsung ke dokumen spesifikasi produk dan panduan layananmu, bisnis di Alam Sutera dapat memberikan respons instan yang akurat setiap saat. AI Agent bertugas menjawab pertanyaan teknis berulang, membantu pelanggan memilih kategori produk yang sesuai dengan kebutuhan ruangan atau kondisi mereka, serta menjadwalkan janji temu di lokasi fisik untuk ditindaklanjuti oleh tim sales senior.'
    ],
    businessMixList: [
      'Showroom furnitur, interior, perlengkapan rumah, dan material bangunan di Alam Sutera',
      'Pusat kebugaran (pilates, gym butik), klinik kecantikan, dan layanan kesehatan',
      'Perusahaan distributor B2B, importir, dan kantor perwakilan di gedung perkantoran',
      'Pengelola venue acara, restoran reservasi, dan layanan katering korporat',
      'Lembaga pendidikan bahasa, akademi keterampilan, dan layanan konsultasi'
    ],
    scenarios: [
      {
        title: 'Showroom Furnitur & Material Interior di Kawasan Alam Sutera',
        businessType: 'Showroom & Retail Terkurasi',
        challenge: 'Calon pelanggan dan desainer interior sering menanyakan ukuran seri produk, opsi material, dan ketersediaan barang siap kirim via chat di luar jam operasional showroom.',
        solution: 'Membangun AI Agent yang mengindeks seluruh lembar spesifikasi katalog produk. Agent dapat menjawab detail ukuran dan material secara instan, mengirimkan tautan halaman produk terkait, dan mencatat jadwal kunjungan pribadi ke showroom.',
        expectedOutcome: 'Tim sales showroom menerima daftar pengunjung terjadwal setiap pagi lengkap dengan daftar item yang sudah diminati calon pembeli.'
      },
      {
        title: 'Studio Wellness, Pilates & Klinik Perawatan di Alam Sutera',
        businessType: 'Wellness & Klinik',
        challenge: 'Resepsionis menghabiskan sebagian besar waktu untuk menjelaskan perbedaan paket keanggotaan (membership), aturan pembatalan sesi, dan jadwal instruktur/terapis kepada penanya baru.',
        solution: 'Mengintegrasikan AI Agent pada WhatsApp yang memandu calon anggota baru memahami pilihan paket berdasarkan tujuan mereka, menjawab aturan studio sesuai SOP, dan mengarahkan konfirmasi pembayaran ke admin.',
        expectedOutcome: 'Resepsionis dapat fokus memberikan pelayanan prima kepada pelanggan yang hadir di studio tanpa mengabaikan pesan masuk di WhatsApp.'
      }
    ],
    collaborationHeading: 'Cara kami bekerja dengan klien AI Agent di Alam Sutera',
    collaborationParagraphs: [
      'Kami melayani perusahaan dan pemilik usaha di Alam Sutera dari basis operasional kami di BSD, Tangerang Selatan. Seluruh proses mulai dari pemetaan alur percakapan, pengumpulan dokumen katalog/SOP, hingga pengujian di lingkungan sandbox dapat dilakukan secara remote dengan sangat efisien.',
      'Apabila tim manajemen atau operasionalmu di Alam Sutera membutuhkan sesi diskusi tatap muka untuk menyelaraskan alur serah-terima chat (handover) antar divisi sales, kami siap menjadwalkan pertemuan langsung di lokasi usahamu. Kami memastikan staf adminmu benar-benar nyaman mengoperasikan sistem sebelum diluncurkan ke publik.'
    ],
    deliverablesSummary: [
      'Penyusunan arsitektur Knowledge Base (RAG) dari katalog produk, daftar harga, dan SOP layanan bisnismu',
      'Penyesuaian gaya bahasa (tone of voice) AI Agent agar sopan, profesional, dan sesuai citra brand di Alam Sutera',
      'Sistem filter dan kualifikasi prospek otomatis sebelum diteruskan ke tim sales manusia',
      'Integrasi pencatatan prospek otomatis ke spreadsheet atau sistem CRM yang sudah kamu gunakan',
      'Evaluasi berkala pada minggu-minggu awal peluncuran untuk menyempurnakan akurasi jawaban'
    ],
    priceNote: {
      startingPrice: 'Dihitung setelah audit alur gratis',
      timeline: 'Estimasi 2–4 minggu pengerjaan & pengujian',
      note: 'Rincian biaya pengembangan dan estimasi pemakaian token API dijelaskan secara transparan di awal.'
    },
    caseStudyReference: {
      title: 'Implementasi Asisten Penjualan & Katalog Berbasis AI',
      summary: 'Dengan menghubungkan AI Agent ke data katalog terstruktur, bisnis dapat memangkas waktu tunggu pelanggan dari hitungan jam menjadi hitungan detik tanpa mengorbankan akurasi teknis.',
      metricNote: 'Demo interaktif dan metrik efisiensi operasional tersedia pada sesi konsultasi awal.',
      relatedBlogSlug: 'Mengapa-Bisnis-Lokal-di-BSD-Membutuhkan-AI-Agent-Sekarang',
      relatedBlogTitle: 'Mengapa Bisnis Lokal di BSD Membutuhkan AI Agent untuk Operasional Harian'
    },
    faqs: [
      {
        question: 'Apakah gaya bahasa AI Agent bisa diatur agar tidak terdengar seperti robot kaku?',
        answer: 'Bisa. Kami merancang instruksi sistem menggunakan gaya bahasa yang natural, sopan, dan ringkas sesuai standar komunikasi bisnismu—misalnya menggunakan sapaan Bapak/Ibu atau Kakak sesuai segmen pelanggan di Alam Sutera.'
      },
      {
        question: 'Bagaimana jika katalog produk atau harga layanan di showroom kami berubah setiap bulan?',
        answer: 'Kami menyediakan alur pembaruan dokumen atau tabel referensi yang mudah. Begitu data harga atau ketersediaan diperbarui pada sumber data yang disepakati, AI Agent akan langsung mengacu pada informasi terbaru tersebut.'
      },
      {
        question: 'Apakah CHESTAADOTCOM memiliki kantor fisik di Alam Sutera?',
        answer: 'Basis operasional kami berada di BSD, Tangerang Selatan, tidak jauh dari Alam Sutera. Kami melayani klien di Alam Sutera secara remote maupun melalui kunjungan tatap muka terjadwal.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI Agent & Otomasi Chat',
    areaSlug: 'bintaro',
    areaName: 'Bintaro',
    indexable: true,
    metaTitle: 'Jasa AI Agent & Otomasi WhatsApp di Bintaro | CHESTAADOTCOM',
    metaDescription: 'Jasa pengembangan AI Agent WhatsApp & asisten reservasi untuk klinik, konsultan, dan bisnis jasa di Bintaro, Tangsel. Dihitung setelah audit gratis.',
    h1: 'Implementasi AI Agent untuk bisnis jasa dan klinik di Bintaro',
    quickSummary: 'CHESTAADOTCOM membantu klinik, biro arsitek/konsultan, dan bisnis layanan di Bintaro mengotomasi tanya-jawab awal serta penjadwalan konsultasi menggunakan AI Agent berbasis SOP. Berbasis di BSD, Tangerang Selatan, kami merancang solusi terukur yang biayanya dihitung setelah audit alur gratis.',
    localContextHeading: 'Membantu bisnis berbasis konsultasi di Bintaro menyaring dan melayani prospek lebih rapi',
    localContextParagraphs: [
      'Banyak bisnis di kawasan Bintaro bergerak di sektor layanan berbasis keahlian dan kepercayaan: klinik kesehatan dan psikologi, biro desain dan renovasi, lembaga pendidikan anak, hingga jasa perawatan rumah. Dalam model bisnis seperti ini, setiap transaksi hampir selalu diawali dengan sesi tanya-jawab panjang di WhatsApp. Calon pelanggan ingin memastikan apakah layananmu cocok dengan kondisi spesifik mereka sebelum memutuskan memesan jadwal.',
      'Tantangannya, pemilik bisnis atau tenaga ahli di Bintaro sering kali merangkap tugas menjawab chat di sela-sela waktu praktik atau survei lapangan, atau menyerahkannya kepada satu staf admin yang harus menangani urusan operasional sekaligus membalas pesan. Akibatnya, respons menjadi lambat saat jam sibuk, atau penjelasan yang diberikan kurang mendalam karena admin terburu-buru.',
      'AI Agent yang kami rancang berfungsi sebagai asisten garis depan (front-desk digital) yang terlatih khusus memahami dokumen layananmu. Ia mampu menjawab pertanyaan seputar prosedur layanan, kisaran biaya, dan syarat penjadwalan secara sabar dan konsisten 24/7. Lebih penting lagi, AI Agent dapat mengajukan 3–4 pertanyaan penyaringan awal (seperti lokasi rumah, jenis keluhan, atau preferensi jadwal) sehingga ketika staf manusia mengambil alih, seluruh informasi dasar sudah siap.'
    ],
    businessMixList: [
      'Klinik gigi, klinik tumbuh kembang anak, praktik psikologi, dan fisioterapi di Bintaro',
      'Biro arsitek, kontraktor renovasi rumah, dan studio desain interior',
      'Lembaga kursus, bimbingan belajar, sekolah musik, dan klub olahraga anak',
      'Jasa layanan rumah tangga (home care, deep cleaning, perawatan AC, lansekap)',
      'Bisnis katering keluarga/event dan penyedia layanan gaya hidup di Bintaro'
    ],
    scenarios: [
      {
        title: 'Klinik Terapi & Konsultasi Kesehatan Keluarga di Bintaro',
        businessType: 'Klinik & Layanan Konsultasi',
        challenge: 'Calon pasien sering menghubungi di malam hari untuk menanyakan perbedaan jenis asesmen dan ketersediaan jadwal akhir pekan, sementara admin klinik hanya bertugas pada jam kerja reguler.',
        solution: 'Membangun AI Agent WhatsApp yang menjelaskan tahapan asesmen awal berdasarkan panduan resmi klinik, mendata usia serta ringkasan kebutuhan pasien, dan mencatat permintaan slot jadwal untuk dikonfirmasi admin esok pagi.',
        expectedOutcome: 'Pasien merasa langsung terlayani saat mereka membutuhkan informasi, dan tingkat kehilangan calon pasien akibat respons lambat di malam hari berkurang drastis.'
      },
      {
        title: 'Penyedia Jasa Perawatan & Renovasi Hunian di Bintaro Jaya',
        businessType: 'Home Services & Renovasi',
        challenge: 'Admin harus berulang kali menanyakan alamat sektor di Bintaro, foto kondisi kerusakan/ruangan, dan jadwal kunjungan yang diinginkan kepada puluhan penanya setiap minggunya.',
        solution: 'Merancang AI Agent yang memandu pelanggan mengirimkan detail keluhan rumah, lokasi area, dan preferensi waktu kunjungan teknisi, sekaligus memberikan estimasi biaya survei/layanan dasar sesuai tabel harga resmi.',
        expectedOutcome: 'Data pesanan masuk ke dashboard tim operasional dalam keadaan lengkap dan siap dijadwalkan tanpa bolak-balik chat panjang.'
      }
    ],
    collaborationHeading: 'Kolaborasi terstruktur untuk pelaku usaha di Bintaro',
    collaborationParagraphs: [
      'Tim CHESTAADOTCOM berbasis di BSD, Tangerang Selatan, masih dalam satu wilayah administratif dengan kawasan Bintaro di Tangerang Selatan. Kami mengutamakan pendekatan rekayasa yang jujur: kami memulai setiap proyek dengan memetakan percakapan nyata yang paling sering menguras waktu adminmu.',
      'Proses konsultasi, pengumpulan SOP, hingga demonstrasi prototipe AI Agent dapat dilakukan sepenuhnya secara daring melalui Google Meet, atau melalui pertemuan tatap muka terjadwal di area Bintaro maupun BSD. Kami juga melatih tim adminmu cara memantau percakapan dan mengambil alih chat kapan pun diperlukan.'
    ],
    deliverablesSummary: [
      'Audit alur chat masuk dan penyusunan struktur Knowledge Base dari FAQ serta SOP layananmu',
      'Pengembangan AI Agent dengan batasan konteks yang jelas agar tidak memberikan diagnosis medis atau janji di luar wewenang',
      'Alur pengumpulan data prospek terstruktur (nama, kebutuhan, lokasi, jadwal) sebelum eskalasi ke admin',
      'Integrasi ke kanal komunikasi bisnis dan rekapitulasi data prospek otomatis',
      'Dokumentasi operasional dan pendampingan penyesuaian respons pasca-peluncuran'
    ],
    priceNote: {
      startingPrice: 'Dihitung setelah audit alur gratis',
      timeline: 'Estimasi 2–4 minggu',
      note: 'Tidak ada paket paksaan; lingkup fitur disesuaikan dengan volume chat harian dan kesiapan SOP bisnismu.'
    },
    caseStudyReference: {
      title: 'Studi Kasus Asisten Penerimaan Prospek & Penjadwalan',
      summary: 'Otomasi percakapan yang dirancang dengan batasan tegas membantu bisnis jasa di Bintaro menjaga kualitas komunikasi personal sembari memangkas beban kerja administratif.',
      metricNote: 'Rincian alur teknis dan contoh percakapan dapat ditinjau pada sesi audit gratis.',
      relatedBlogSlug: 'Mengapa-Bisnis-Lokal-di-BSD-Membutuhkan-AI-Agent-Sekarang',
      relatedBlogTitle: 'Mengapa Bisnis Lokal di BSD Membutuhkan AI Agent untuk Operasional Harian'
    },
    faqs: [
      {
        question: 'Untuk klinik atau layanan konsultasi di Bintaro, apakah AI Agent aman dan tidak melanggar batas konsultasi?',
        answer: 'Sangat aman karena kami menerapkan pembatas tegas (guardrails): AI Agent diprogram hanya untuk memberikan informasi administratif, penjelasan layanan umum sesuai dokumen resmi, dan penjadwalan—bukan memberikan diagnosis medis atau nasihat teknis di luar SOP.'
      },
      {
        question: 'Apakah bisnis saya harus memiliki dokumen SOP tebal sebelum menggunakan layanan AI Agent ini?',
        answer: 'Tidak perlu dokumen tebal. Kami membantu mengekstrak pengetahuan dari riwayat chat WhatsApp adminmu selama ini dan merapikannya menjadi dokumen referensi terstruktur yang siap digunakan oleh AI Agent.'
      },
      {
        question: 'Bagaimana proses serah terima dari AI Agent ke admin manusia saat pelanggan ingin negosiasi atau komplain?',
        answer: 'Ketika AI mendeteksi permintaan khusus, negosiasi di luar daftar harga standar, atau sentimen keluhan, sistem otomatis menandai percakapan dan mengirimkan notifikasi beserta ringkasan konteks kepada admin manusia untuk segera ditindaklanjuti.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI Agent & Otomasi Chat',
    areaSlug: 'gading-serpong',
    areaName: 'Gading Serpong',
    indexable: true,
    metaTitle: 'Jasa AI Agent & Otomasi Chat di Gading Serpong | CHESTAADOTCOM',
    metaDescription: 'Implementasi AI Agent WhatsApp & kualifikasi leads otomatis untuk bisnis komersial di Gading Serpong. Respons instan 24/7 sesuai SOP. Audit gratis.',
    h1: 'Implementasi AI Agent untuk bisnis komersial di Gading Serpong',
    quickSummary: 'CHESTAADOTCOM merancang AI Agent WhatsApp dan web untuk membantu bisnis komersial di Gading Serpong merespons pertanyaan pelanggan secara instan 24/7. Berbasis tepat di sebelahnya di BSD, Tangerang Selatan, kami menghadirkan solusi AI berbasis SOP resmi dengan biaya yang dihitung setelah audit gratis.',
    localContextHeading: 'Kecepatan respons sebagai pembeda utama di pasar kompetitif Gading Serpong',
    localContextParagraphs: [
      'Di kawasan komersial Gading Serpong yang sangat padat, pelanggan yang mencari layanan kursus, perawatan klinik, bengkel spesialis, maupun produk komersial biasanya menghubungi tiga hingga empat tempat sekaligus melalui WhatsApp. Dalam situasi seperti ini, bisnis yang mampu memberikan jawaban jelas, sopan, dan lengkap dalam dua menit pertama memiliki peluang jauh lebih besar untuk mengamankan kunjungan pelanggan dibandingkan bisnis yang baru membalas dua jam kemudian.',
      'Masalahnya, lonjakan pesan di Gading Serpong sering terjadi secara bersamaan—misalnya saat jam istirahat siang, sore hari sepulang kerja, atau sesaat setelah kamu menayangkan promosi dan iklan lokal. Staf admin manusia yang harus melayani pelanggan kasir di ruko sekaligus membalas puluhan chat masuk hampir pasti mengalami kewalahan, sehingga banyak pertanyaan prospek terjawab sepotong-sepotong atau terlewat.',
      'Kami mengimplementasikan AI Agent yang bertindak sebagai anggota tim digital tambahan bagi bisnismu di Gading Serpong. Dengan mengacu langsung pada daftar harga paket, jadwal kelas/slot layanan, dan ketentuan promo terbarumu, AI Agent melayani setiap pesan masuk secara simultan tanpa antrean. Pengunjung mendapatkan informasi akurat seketika, sementara tim adminmu di ruko dapat memfokuskan perhatian pada penyelesaian transaksi dan pelayanan di tempat.'
    ],
    businessMixList: [
      'Lembaga kursus, bimbingan belajar, dan pusat edukasi di ruko Gading Serpong',
      'Klinik kecantikan, dental care, barbershop premium, dan studio kebugaran',
      'Bengkel detailing otomotif, aksesoris kendaraan, dan layanan perawatan berkala',
      'Agensi properti lokal, konsultan bisnis, dan penyedia jasa B2B',
      'Supplier F&B, katering harian, dan toko spesialis komersial'
    ],
    scenarios: [
      {
        title: 'Pusat Kursus & Bimbel dengan Musim Pendaftaran Padat di Gading Serpong',
        businessType: 'Pendidikan & Kursus',
        challenge: 'Saat masa kenaikan kelas atau kampanye iklan berjalan, ratusan orang tua menanyakan biaya per level, jadwal kelas kosong, dan syarat trial class secara bersamaan.',
        solution: 'Menerapkan AI Agent WhatsApp yang menanyakan usia siswa dan mata pelajaran yang diminati, lalu langsung menyajikan pilihan jadwal serta rincian biaya resmi dan mendaftarkan jadwal trial class ke tabel admin.',
        expectedOutcome: 'Seluruh penanya terlayani dalam hitungan detik tanpa antrean, meningkatkan konversi pendaftaran kelas percobaan secara terukur.'
      },
      {
        title: 'Klinik Kecantikan & Perawatan Diri di Kawasan Ruko Gading Serpong',
        businessType: 'Klinik Estetika & Perawatan',
        challenge: 'Pelanggan sering menanyakan detail promo bulanan, kecocokan treatment untuk jenis kulit tertentu, dan slot jam kosong di akhir pekan.',
        solution: 'Menghubungkan AI Agent ke katalog treatment dan ketentuan promo aktif. Agent menjelaskan pilihan perawatan sesuai panduan resmi klinik, mengecek preferensi jam kedatangan pelanggan, dan meneruskan data booking ke kasir.',
        expectedOutcome: 'Kapasitas penanganan chat meningkat berkali-kali lipat saat periode promo tanpa perlu menambah jumlah staf admin baru.'
      }
    ],
    collaborationHeading: 'Cara kami mendampingi bisnis di Gading Serpong',
    collaborationParagraphs: [
      'Beroperasi dari basis kami di BSD, Tangerang Selatan yang bersebelahan langsung dengan Gading Serpong, tim CHESTAADOTCOM sangat mudah dijangkau untuk kolaborasi. Kami dapat menjalankan seluruh tahapan audit alur chat, pembangunan basis pengetahuan, hingga integrasi sistem secara remote agar tidak menyita waktu operasionalmu.',
      'Jika kamu membutuhkan pertemuan langsung di tempat usahamu di Gading Serpong untuk memetakan alur kerja admin kasir dan staf sales, kami siap menjadwalkan sesi tatap muka. Setiap implementasi dilengkapi dengan masa uji coba menyeluruh sebelum diaktifkan penuh.'
    ],
    deliverablesSummary: [
      'Rancangan alur percakapan AI Agent yang disesuaikan dengan jenis layanan dan promo bisnismu di Gading Serpong',
      'Integrasi basis data dokumen (RAG) agar jawaban harga, paket, dan jadwal selalu akurat sesuai sumber resmi',
      'Fitur pengalihan otomatis (handover) ke staf admin ketika pelanggan siap membayar atau membutuhkan diskusi khusus',
      'Otomasi pencatatan data prospek dan riwayat minat layanan ke spreadsheet/CRM operasional',
      'Sesi pelatihan penggunaan bagi staf admin serta dukungan penyesuaian pasca-rilis'
    ],
    priceNote: {
      startingPrice: 'Dihitung setelah audit alur gratis',
      timeline: 'Estimasi 2–4 minggu',
      note: 'Skema investasi dihitung berdasarkan cakupan integrasi dan kompleksitas alur operasional setelah sesi bedah kebutuhan.'
    },
    caseStudyReference: {
      title: 'Penanganan Lonjakan Chat Kampanye Lokal dengan AI Agent',
      summary: 'Bisnis komersial yang memadukan iklan lokal dengan AI Agent respons instan mampu mengamankan prospek sebelum mereka berpindah ke kompetitor di blok ruko sebelah.',
      metricNote: 'Simulasi alur percakapan untuk industri spesifikmu dapat dicoba pada sesi audit gratis.',
      relatedBlogSlug: 'Mengapa-Bisnis-Lokal-di-BSD-Membutuhkan-AI-Agent-Sekarang',
      relatedBlogTitle: 'Mengapa Bisnis Lokal di BSD Membutuhkan AI Agent untuk Operasional Harian'
    },
    faqs: [
      {
        question: 'Apakah AI Agent bisa menangani puluhan chat yang masuk di detik yang sama saat kami pasang iklan promo di Gading Serpong?',
        answer: 'Bisa. Berbeda dengan manusia yang hanya bisa mengetik satu per satu, AI Agent dapat memproses dan membalas puluhan percakapan berbeda secara paralel dalam waktu beberapa detik dengan kualitas jawaban yang tetap konsisten.'
      },
      {
        question: 'Bagaimana jika bisnis kami sering mengganti paket promo bulanan?',
        answer: 'Kami menyiapkan struktur dokumen referensi promo yang terpisah dan mudah diperbarui. Kamu atau adminmu cukup mengganti teks/tabel promo bulanan pada dokumen acuan, dan AI Agent akan langsung mengikuti ketentuan promo terbaru.'
      },
      {
        question: 'Apakah kami bisa berdiskusi tatap muka dulu di Gading Serpong atau BSD?',
        answer: 'Bisa. Setelah sesi perkenalan dan pemetaan awal singkat via WhatsApp/Google Meet, tim kami yang berbasis di BSD, Tangerang Selatan dapat menjadwalkan pertemuan tatap muka di Gading Serpong atau BSD.'
      }
    ],
    updatedAt: '2026-04-01'
  },
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI Agent & Otomasi Chat',
    areaSlug: 'tangerang-selatan',
    areaName: 'Tangerang Selatan',
    indexable: true,
    metaTitle: 'Jasa AI Agent & Otomasi Bisnis di Tangerang Selatan | CHESTAADOTCOM',
    metaDescription: 'Partner implementasi AI Agent WhatsApp & asisten operasional untuk perusahaan dan UMKM di Tangerang Selatan. Berbasis di BSD. Audit alur gratis.',
    h1: 'Implementasi AI Agent untuk operasional bisnis di Tangerang Selatan',
    quickSummary: 'CHESTAADOTCOM adalah partner rekayasa AI Agent dan otomasi percakapan bisnis yang berbasis di BSD, Tangerang Selatan. Kami membantu perusahaan B2B, klinik, institusi pendidikan, dan UMKM di seluruh Tangerang Selatan mengotomasi layanan pelanggan serta kualifikasi prospek 24/7 dengan biaya yang dihitung setelah audit gratis.',
    localContextHeading: 'Membawa efisiensi AI Agent yang praktis dan terukur bagi bisnis di Tangerang Selatan',
    localContextParagraphs: [
      'Banyak pemilik usaha dan manajer operasional di Kota Tangerang Selatan (mulai dari koridor Serpong, Bintaro, hingga Ciputat, Pamulang, dan Setu) mendengar tentang kecerdasan buatan (AI), namun bingung bagaimana menerapkannya secara nyata untuk mengurangi beban kerja harian. Di lapangan, masalah terbesar yang menggerus produktivitas tim bukanlah kurangnya ide pemasaran, melainkan waktu staf yang habis untuk menjawab pertanyaan berulang di WhatsApp, mencari dokumen harga di tumpukan file, dan menyalin data pesanan secara manual ke tabel laporan.',
      'Implementasi AI Agent yang tepat di Tangerang Selatan bukan tentang mengikuti tren teknologi yang rumit, melainkan membangun sistem kerja yang patuh pada aturan perusahaanmu. Baik untuk melayani pertanyaan pelanggan eksternal di WhatsApp maupun membantu staf internal mencari informasi teknis/SOP produk dengan cepat, AI Agent bekerja sebagai jembatan pintar antara pertanyaan manusia dan data resmi perusahaan.',
      'Sebagai tim engineering yang berbasis langsung di Tangerang Selatan, kami merancang solusi AI Agent dengan prinsip pragmatis: sistem harus mudah diawasi oleh pemilik bisnis, memiliki batasan jawaban yang ketat agar tidak mengarang data, terhubung langsung dengan alat kerja yang sudah akrab dipakai timmu (seperti WhatsApp dan Google Workspace), serta memberikan pengembalian investasi berupa penghematan jam kerja yang nyata.'
    ],
    businessMixList: [
      'Perusahaan jasa B2B, distributor, dan supplier industri di wilayah Tangerang Selatan',
      'Jaringan klinik kesehatan, laboratorium, apotek, dan layanan kesehatan keluarga',
      'Sekolah swasta, perguruan tinggi, yayasan pendidikan, dan lembaga kursus di Tangsel',
      'Jasa teknis properti (kontraktor, perawatan AC, pest control, kebersihan gedung)',
      'Bisnis produksi/konveksi, katering korporat, dan ritel bertumbuh di Ciputat, Pamulang & Serpong'
    ],
    scenarios: [
      {
        title: 'Distributor B2B & Produksi Garmen/Konveksi di Tangerang Selatan',
        businessType: 'Produksi & Distributor B2B',
        challenge: 'Tim admin penjualan harus melayani ratusan chat penanya grosir yang menanyakan katalog bahan, minimum order (MOQ), estimasi waktu produksi, dan simulasi harga bertingkat (tier pricing).',
        solution: 'Membangun AI Agent yang terhubung ke tabel harga grosir dan spesifikasi bahan. Agent menghitungkan estimasi awal berdasarkan jumlah pesanan yang diketik pelanggan, menjelaskan syarat MOQ, dan meneruskan prospek siap pesan ke tim sales B2B.',
        expectedOutcome: 'Tim sales tidak lagi terkuras waktunya melayani penanya eceran yang di bawah MOQ dan dapat fokus menutup transaksi partai besar.'
      },
      {
        title: 'Institusi Pendidikan & Layanan Pendaftaran Siswa di Tangerang Selatan',
        businessType: 'Institusi Pendidikan & Pelatihan',
        challenge: 'Panitia penerimaan siswa baru kewalahan menjawab pertanyaan berulang dari orang tua seputar rincian uang pangkal, jalur pendaftaran, jadwal tes, dan persyaratan berkas.',
        solution: 'Mengintegrasikan AI Agent informasi pendaftaran yang mampu menjawab seluruh rincian biaya dan prosedur berdasarkan buku panduan resmi sekolah 24/7, serta memandu orang tua mengisi data peminat awal.',
        expectedOutcome: 'Orang tua mendapatkan informasi resmi secara instan kapan saja, dan panitia sekolah menerima daftar calon pendaftar yang sudah terdata rapi.'
      }
    ],
    collaborationHeading: 'Didukung langsung oleh tim engineering lokal di Tangerang Selatan',
    collaborationParagraphs: [
      'Keunggulan utama bekerja bersama CHESTAADOTCOM adalah kamu berkolaborasi langsung dengan co-founder dan engineer yang berbasis di BSD, Tangerang Selatan. Kami memahami dinamika operasional bisnis lokal di Tangsel dan tidak meninggalkanmu dengan sistem yang membingungkan.',
      'Kami menyediakan alur kerja yang transparan: dimulai dari sesi audit gratis (online maupun tatap muka terjadwal di wilayah Tangerang Selatan), penyusunan cetak biru alur percakapan, pengujian akurasi jawaban, hingga pendampingan tim admin saat sistem mulai berjalan.'
    ],
    deliverablesSummary: [
      'Sesi audit operasional dan perancangan arsitektur AI Agent khusus untuk alur kerja bisnismu di Tangsel',
      'Pembangunan sistem RAG (Retrieval-Augmented Generation) berbasis dokumen SOP, katalog, dan FAQ resmi',
      'Penerapan guardrails keamanan respons dan alur eskalasi mulus (human handover) ke staf admin',
      'Integrasi ke WhatsApp/Web serta sinkronisasi data otomatis ke Google Sheets, database, atau CRM',
      'Pelatihan tim internal dan dukungan pemeliharaan berkala'
    ],
    priceNote: {
      startingPrice: 'Dihitung setelah audit alur gratis',
      timeline: 'Estimasi 2–4 minggu',
      note: 'Setiap penawaran disusun secara modular sesuai skala operasional bisnismu—tanpa biaya fitur yang tidak kamu perlukan.'
    },
    caseStudyReference: {
      title: 'Transformasi Operasional Layanan Pelanggan dengan AI Agent',
      summary: 'Kami membantu bisnis di Tangerang Selatan mengubah proses tanya-jawab manual yang memakan waktu menjadi sistem kualifikasi terukur yang bekerja 24 jam sehari.',
      metricNote: 'Data metrik proyek dan demonstrasi sistem langsung tersedia saat sesi konsultasi.',
      relatedBlogSlug: 'Mengapa-Bisnis-Lokal-di-BSD-Membutuhkan-AI-Agent-Sekarang',
      relatedBlogTitle: 'Mengapa Bisnis Lokal di BSD Membutuhkan AI Agent untuk Operasional Harian'
    },
    faqs: [
      {
        question: 'Bagaimana cara memulai audit gratis untuk mengetahui apakah bisnis saya di Tangsel cocok memakai AI Agent?',
        answer: 'Kamu cukup menghubungi kami melalui tombol WhatsApp di halaman ini. Kami akan menjadwalkan sesi diskusi singkat 20–30 menit untuk memetakan alur chat dan operasionalmu, lalu memberikan rekomendasi jujur beserta estimasi biayanya.'
      },
      {
        question: 'Apakah data pelanggan dan dokumen SOP perusahaan saya aman?',
        answer: 'Ya. Dokumen pengetahuan bisnismu hanya digunakan secara terisolasi untuk menjawab konteks layanan perusahaanmu sendiri dan tidak pernah dibagikan ke pihak lain.'
      },
      {
        question: 'Bisakah AI Agent dihubungkan dengan sistem software internal atau otomasi laporan yang sudah ada?',
        answer: 'Sangat bisa. Tim kami juga menangani pengembangan Software Custom dan Otomasi Workflow, sehingga AI Agent dapat dihubungkan langsung ke database stok, sistem penjadwalan, maupun laporan otomatis harian.'
      }
    ],
    updatedAt: '2026-04-01'
  },

  // ============================================================================
  // 3. SOFTWARE CUSTOM — 5 DRAFT PAGES (indexable: false, noindex)
  // ============================================================================
  ...(['bsd-city', 'alam-sutera', 'bintaro', 'gading-serpong', 'tangerang-selatan'] as const).map((areaSlug): ServiceAreaPageData => {
    const area = AREAS[areaSlug];
    return {
      serviceSlug: 'software-custom',
      serviceName: 'Pengembangan Software Custom',
      areaSlug,
      areaName: area.name,
      indexable: false,
      metaTitle: `Jasa Pembuatan Software Custom di ${area.name} | CHESTAADOTCOM`,
      metaDescription: `Layanan pengembangan aplikasi web internal, dashboard operasional, dan software custom untuk bisnis di ${area.name}. Berbasis di BSD, Tangerang Selatan.`,
      h1: `Pengembangan software custom untuk operasional bisnis di ${area.name}`,
      quickSummary: `CHESTAADOTCOM merancang aplikasi web internal, sistem manajemen operasional, dan dashboard kustom untuk bisnis di ${area.name}. Halaman spesifik area ini masih dalam tahap kurasi studi kasus lokal; untuk informasi lengkap layanan pengembangan sistem kami, silakan kunjungi halaman utama layanan Software Custom.`,
      localContextHeading: `Solusi sistem internal sesuai alur kerja bisnis di ${area.name}`,
      localContextParagraphs: [
        `Setiap bisnis yang berkembang di ${area.name} pada akhirnya menghadapi batas kemampuan spreadsheet manual atau software langganan (SaaS) generik yang tidak sesuai dengan SOP lapangan. CHESTAADOTCOM membangun perangkat lunak kustom yang mengikuti alur kerja unik perusahaanmu—bukan memaksa timmu mengubah cara kerja demi menyesuaikan diri dengan aplikasi pasaran.`,
        `Dari basis operasional kami di BSD, Tangerang Selatan, kami melayani perancangan sistem inventaris, portal klien, manajemen pesanan B2B, hingga dashboard eksekutif dengan kolaborasi secara remote maupun tatap muka terjadwal.`
      ],
      businessMixList: [
        `Perusahaan distribusi, logistik, dan pengelolaan stok di ${area.name}`,
        `Layanan profesional dan operasional multi-cabang`,
        `Bisnis yang membutuhkan integrasi database internal dan pelaporan real-time`
      ],
      scenarios: [
        {
          title: `Dashboard Operasional & Pelacakan Pesanan Internal`,
          businessType: 'Operasional B2B & Jasa',
          challenge: 'Data pesanan dan status pengerjaan tersebar di banyak file spreadsheet sehingga rawan selisih data antar divisi.',
          solution: 'Membangun aplikasi web terpusat dengan hak akses per peran (role-based access control) dan jejak audit otomatis.',
          expectedOutcome: 'Manajemen dapat memantau status operasional harian secara real-time dari satu layar.'
        },
        {
          title: `Portal Klien & Manajemen Dokumen Proyek`,
          businessType: 'Konsultan & Kontraktor',
          challenge: 'Riwayat revisi dokumen, tagihan termin, dan progres proyek sulit dilacak oleh klien maupun tim internal.',
          solution: 'Merancang portal khusus tempat klien dan tim internal memantau milestone, mengunduh dokumen resmi, dan menyetujui tahapan kerja.',
          expectedOutcome: 'Komunikasi proyek menjadi jauh lebih rapi dan transparan.'
        }
      ],
      collaborationHeading: `Kolaborasi dari basis kami di BSD, Tangerang Selatan`,
      collaborationParagraphs: [
        `Kami melayani klien di ${area.name} dari basis operasional kami di BSD, Tangerang Selatan melalui sesi pemetaan spesifikasi (blueprint) yang terstruktur.`
      ],
      deliverablesSummary: [
        'Dokumen spesifikasi teknis dan desain arsitektur basis data',
        'Aplikasi web kustom dengan manajemen hak akses pengguna (RBAC)',
        'Integrasi API dengan sistem pihak ketiga yang sudah digunakan',
        'Dokumentasi teknis, pengujian, dan serah terima kode sumber sesuai kesepakatan'
      ],
      priceNote: {
        startingPrice: 'Dihitung setelah pemetaan ruang lingkup (discovery)',
        timeline: 'Estimasi 4–12 minggu (bertahap per modul MVP)',
        note: 'Investasi disesuaikan dengan jumlah modul, integrasi, dan kompleksitas logika bisnis.'
      },
      caseStudyReference: {
        title: 'Arsitektur Sistem Internal & Web Application',
        summary: 'Kami mengutamakan pengiriman bertahap (MVP) agar sistem dapat segera digunakan oleh tim operasionalmu.',
        metricNote: 'Detail studi kasus khusus area ini sedang dalam tahap pembaruan.',
        relatedBlogSlug: 'Panduan-Memilih-Software-House-di-Tangerang-Selatan',
        relatedBlogTitle: 'Panduan Memilih Software House di Tangerang Selatan'
      },
      faqs: [
        {
          question: `Bagaimana tahapan awal pembuatan software custom untuk bisnis di ${area.name}?`,
          answer: 'Kami memulai dengan sesi bedah alur kerja (discovery) untuk menyusun daftar modul prioritas (MVP) sebelum memberikan estimasi biaya dan jadwal pengerjaan.'
        },
        {
          question: 'Apakah sistem bisa dikembangkan secara bertahap?',
          answer: 'Ya, kami sangat menyarankan pendekatan bertahap dimulai dari modul paling krusial agar tim operasional cepat merasakan manfaatnya.'
        },
        {
          question: 'Apakah tim CHESTAADOTCOM bisa berdiskusi langsung?',
          answer: 'Bisa, kami berbasis di BSD, Tangerang Selatan dan melayani diskusi daring maupun tatap muka terjadwal.'
        }
      ],
      updatedAt: '2026-04-01'
    };
  }),

  // ============================================================================
  // 4. OTOMASI WORKFLOW — 5 DRAFT PAGES (indexable: false, noindex)
  // ============================================================================
  ...(['bsd-city', 'alam-sutera', 'bintaro', 'gading-serpong', 'tangerang-selatan'] as const).map((areaSlug): ServiceAreaPageData => {
    const area = AREAS[areaSlug];
    return {
      serviceSlug: 'otomasi-workflow',
      serviceName: 'Otomasi Workflow & Integrasi API',
      areaSlug,
      areaName: area.name,
      indexable: false,
      metaTitle: `Jasa Otomasi Workflow Bisnis di ${area.name} | CHESTAADOTCOM`,
      metaDescription: `Integrasi aplikasi, sinkronisasi data otomatis, dan otomasi laporan untuk bisnis di ${area.name}. Berbasis di BSD, Tangerang Selatan.`,
      h1: `Otomasi workflow dan integrasi data untuk bisnis di ${area.name}`,
      quickSummary: `CHESTAADOTCOM membantu bisnis di ${area.name} menghilangkan pekerjaan input data berulang dengan menghubungkan WhatsApp, Google Workspace, CRM, dan sistem keuangan secara otomatis. Halaman area ini berstatus draf; kunjungi halaman utama layanan Otomasi Workflow untuk detail lengkap.`,
      localContextHeading: `Menghapus pekerjaan salin-tempel manual pada operasional harian di ${area.name}`,
      localContextParagraphs: [
        `Banyak tim admin dan operasional di ${area.name} menghabiskan berjam-jam setiap minggu hanya untuk memindahkan data yang sama dari formulir web atau WhatsApp ke spreadsheet, membuat draf invoice, lalu mengirim rekap laporan harian ke manajemen. Selain membuang waktu produktif, proses manual sangat rentan terhadap salah ketik.`,
        `Dari basis kami di BSD, Tangerang Selatan, kami merancang pipa integrasi antar-aplikasi (webhook & API) agar data mengalir secara instan dan akurat di belakang layar.`
      ],
      businessMixList: [
        `Tim operasional dan admin penjualan di ${area.name}`,
        `Bisnis layanan dengan proses booking, penagihan, dan pengingat jadwal rutin`,
        `Perusahaan yang menggunakan beberapa aplikasi terpisah tanpa sinkronisasi otomatis`
      ],
      scenarios: [
        {
          title: 'Sinkronisasi Prospek Masuk ke CRM & Notifikasi Tim Sales',
          businessType: 'Tim Penjualan & Pemasaran',
          challenge: 'Data prospek dari website dan iklan harus disalin manual ke tabel laporan sebelum dibagikan ke staf sales.',
          solution: 'Membangun workflow otomatis yang langsung mencatat prospek baru, membagi giliran sales, dan mengirim notifikasi WhatsApp instan.',
          expectedOutcome: 'Waktu tindak lanjut prospek jauh lebih cepat tanpa input manual.'
        },
        {
          title: 'Otomasi Rekap Laporan Harian & Pengingat Jadwal Layanan',
          businessType: 'Bisnis Jasa & Klinik',
          challenge: 'Admin sering lupa mengirim pengingat jadwal H-1 kepada pelanggan dan harus merekap transaksi harian secara manual setiap sore.',
          solution: 'Menjadwalkan pemicu otomatis untuk pengiriman pengingat pelanggan dan kompilasi laporan ringkas harian ke manajemen.',
          expectedOutcome: 'Tingkat ketidakhadiran pelanggan (no-show) turun dan laporan selalu siap tepat waktu.'
        }
      ],
      collaborationHeading: `Kolaborasi dari basis kami di BSD, Tangerang Selatan`,
      collaborationParagraphs: [
        `Kami melayani audit alur kerja bagi bisnis di ${area.name} dari basis kami di BSD, Tangerang Selatan, baik secara daring maupun tatap muka terjadwal.`
      ],
      deliverablesSummary: [
        'Pemetaan alur data (workflow mapping) dari pemicu awal hingga tindakan akhir',
        'Integrasi API/Webhook antar aplikasi operasional (WhatsApp, Google Sheets, CRM, Email)',
        'Sistem penanganan error (error handling & alert) jika salah satu layanan pihak ketiga gangguan',
        'Dokumentasi alur otomasi dan serah terima akses kepada tim internal'
      ],
      priceNote: {
        startingPrice: 'Dihitung setelah audit alur kerja gratis',
        timeline: 'Estimasi 1–3 minggu per alur otomasi',
        note: 'Biaya disesuaikan dengan jumlah titik integrasi aplikasi dan kompleksitas aturan bisnis.'
      },
      caseStudyReference: {
        title: 'Otomasi Proses Administrasi & Pelaporan',
        summary: 'Otomasi workflow membantu tim kecil menangani volume transaksi yang lebih besar tanpa menambah beban administratif.',
        metricNote: 'Studi kasus khusus area ini sedang dalam tahap kurasi.',
        relatedBlogSlug: 'Cara-Otomasi-Bisnis-Menghemat-20-Jam-Kerja-Per-Minggu',
        relatedBlogTitle: 'Cara Otomasi Workflow Menghemat Jam Kerja Operasional'
      },
      faqs: [
        {
          question: 'Apakah otomasi workflow mengharuskan kami mengganti aplikasi yang sudah dipakai saat ini?',
          answer: 'Tidak. Justru tujuan otomasi workflow adalah menghubungkan aplikasi yang sudah akrab digunakan oleh timmu (seperti Google Sheets, WhatsApp, atau software akuntansi) agar saling bertukar data secara otomatis.'
        },
        {
          question: 'Berapa lama proses pemasangan satu alur otomasi?',
          answer: 'Untuk alur integrasi standar, proses perancangan hingga pengujian biasanya memakan waktu 1 hingga 3 minggu kerja.'
        },
        {
          question: 'Bagaimana jika ada perubahan format tabel atau alur kerja di kemudian hari?',
          answer: 'Kami menyertakan dokumentasi yang jelas dan siap membantu penyesuaian skema alur kerja kapan pun proses bisnismu berkembang.'
        }
      ],
      updatedAt: '2026-04-01'
    };
  })
];

export function getServiceAreaPage(serviceSlug: string, areaSlug: string): ServiceAreaPageData | undefined {
  return SERVICE_AREA_PAGES.find(
    (p) => p.serviceSlug === serviceSlug && p.areaSlug === areaSlug
  );
}

export function getIndexableServiceAreaPages(): ServiceAreaPageData[] {
  return SERVICE_AREA_PAGES.filter((p) => p.indexable);
}

export function getServiceAreasByServiceSlug(serviceSlug: string, onlyIndexable = true): ServiceAreaPageData[] {
  return SERVICE_AREA_PAGES.filter(
    (p) => p.serviceSlug === serviceSlug && (!onlyIndexable || p.indexable)
  );
}

export function getServiceAreasByAreaSlug(areaSlug: string, onlyIndexable = true): ServiceAreaPageData[] {
  return SERVICE_AREA_PAGES.filter(
    (p) => p.areaSlug === areaSlug && (!onlyIndexable || p.indexable)
  );
}
