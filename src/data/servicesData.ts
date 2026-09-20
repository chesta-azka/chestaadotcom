export interface ServiceDetailData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  heroHeadline: string;
  heroDescription: string;
  coreMetrics: {
    label: string;
    value: string;
    desc: string;
  }[];
  problemStatement: {
    title: string;
    points: string[];
  };
  solutionOverview: {
    title: string;
    description: string;
    benefits: string[];
  };
  processSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  guarantee: string;
  investment: {
    price: string;
    duration: string;
    features: string[];
  };
  faqs: {
    q: string;
    a: string;
  }[];
}

export const SERVICES_DATA: Record<string, ServiceDetailData> = {

  'jasa-pembuatan-website-bsd-cisauk': {
    slug: 'jasa-pembuatan-website-bsd-cisauk',
    title: 'Bikin Bisnis Muncul di Google (BSD & Tangerang)',
    subtitle: 'Bantu pelanggan di sekitar Anda nemuin bisnis Anda lebih gampang dengan website yang dioptimalkan khusus untuk wilayah lokal.',
    category: 'SEO Lokal & Website',
    badge: 'Spesialis BSD & Tangerang',
    heroHeadline: 'Jadilah Nomor 1 di Wilayah Anda. Biar Pelanggan Gampang Nemu Toko Anda.',
    heroDescription: 'Pengen bisnis Anda muncul paling atas saat orang cari jasa atau produk di Google sekitar BSD, Cisauk, atau Tangerang? Kami buatkan website yang ga cuma keren, tapi emang dirancang supaya gampang diranking Google buat pelanggan di deket Anda.',
    coreMetrics: [
      { label: 'Ranking di Google Maps', value: 'Top #3', desc: 'Muncul di barisan atas peta Google saat orang cari jasa Anda' },
      { label: 'Penemuan di Peta', value: '+85%', desc: 'Meningkatkan jumlah orang yang nemuin lokasi bisnis Anda' },
      { label: 'Pelanggan Baru', value: '+40%', desc: 'Kenaikan jumlah orang yang nanya-nanya atau datang langsung' },
      { label: 'Kesehatan Website', value: '100/100', desc: 'Website lancar jaya dan gampang dibaca Google' }
    ],
    problemStatement: {
      title: 'Kenapa Bisnis Anda Masih Sepi?',
      points: [
        'Bisnis Ga Kelihatan: Kalo orang cari di Google Maps tapi bisnis Anda ga ada, berarti Anda kehilangan banyak calon pembeli.',
        'Informasi Salah: Alamat atau nomor telepon di internet berantakan bikin pelanggan bingung dan ga percaya.',
        'Kalah Sama Kompetitor: Padahal jasa Anda lebih bagus, tapi pelanggan lari ke sebelah karena website mereka lebih gampang dicari.',
        'Iklan Mubazir: Sayang uang iklan kalo websitenya ga pas buat narik orang di sekitar lokasi Anda.'
      ]
    },
    solutionOverview: {
      title: 'Solusi Biar Bisnis Jadi "Raja Lokal"',
      description: 'Kami ga cuma bikin website biasa. Kami bikin website yang jadi "lampu sorot" buat bisnis Anda. Kita setting supaya Google tau persis di mana lokasi Anda dan kenapa orang harus pilih Anda.',
      benefits: [
        'Setting Google Maps Akurat: Biar Google makin yakin buat rekomendasiin bisnis Anda.',
        'Website HP Super Cepat: Kebanyakan orang cari lewat HP sambil jalan, jadi website harus langsung buka.',
        'Tampil Terpercaya: Pelanggan bakal lebih yakin transaksi kalo liat tampilan website yang rapi dan profesional.',
        'Pancing Pembeli Serius: Fokus narik orang-orang yang emang niat beli di sekitar Anda.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cek Kompetitor', desc: 'Kita liat lawan Anda di Google dan cari cara biar Anda bisa nyalip mereka.' },
      { step: '02', title: 'Bikin Website', desc: 'Proses pembuatan website yang tampilannya pas sama brand Anda dan cepat dibuka.' },
      { step: '03', title: 'Daftarin ke Google', desc: 'Kita bantu daftarin dan setting supaya bisnis Anda muncul di hasil pencarian lokal.' },
      { step: '04', title: 'Pantau Hasil', desc: 'Kita jagain supaya websitenya tetap di atas dan makin banyak yang nanya.' }
    ],
    guarantee: 'Website dijamin cepat dibuka dan langsung bisa muncul di Google dalam waktu singkat.',
    investment: {
      price: 'Investasi Mulai dari Rp 6.000.000',
      duration: 'Siklus Pengerjaan 2 Minggu',
      features: [
        'Website Khusus Biar Gampang Dicari (SEO Lokal)',
        'Tampilan Khusus Buat Pelanggan Sekitar',
        'Setting Profil Google Bisnis (Maps)',
        'Bantuan Muncul di Google Paling Depan',
        'Laporan Hasil Ranking Tiap Bulan'
      ]
    },
    faqs: [
      {
        q: 'Kenapa harus fokus di BSD City?',
        a: 'BSD itu rame banget bisnisnya. Kalo Anda ga muncul di Google, calon pelanggan yang punya uang bakal lari ke bisnis lain yang lebih kelihatan di internet.'
      },
      {
        q: 'Berapa lama sampe bisnis saya muncul di atas?',
        a: 'Websitenya kita buat supaya Google cepet nangkep. Biasanya dalam 2-4 minggu Anda udah mulai liat bisnis Anda naik di hasil pencarian.'
      }
    ]
  },

  'web-development-nextjs': {
    slug: 'web-development-nextjs',
    title: 'Website Canggih & Anti-Lemot (Sistem Custom)',
    subtitle: 'Jangan pake template yang bikin pusing. Lindungi penghasilan Anda dengan website yang dibuat khusus supaya super cepat dan aman.',
    category: 'Teknologi & Developer',
    badge: 'Kualitas Perusahaan Besar',
    heroHeadline: 'Website Super Cepat: Dibangun Khusus Biar Bisnis Bisa Maju Pesat.',
    heroDescription: 'Lupakan website yang sering error atau lemot. Kami buatkan sistem website khusus yang emang dirancang buat nampung banyak pengunjung, data aman, dan ga bikin ribet di masa depan—tanpa lemot kayak pake cara lama.',
    coreMetrics: [
      { label: 'Kecepatan Buka Web', value: '< 0.8 detik', desc: 'Web kebuka instan, pelanggan ga keburu kabur karena nunggu' },
      { label: 'Website Jarang Error', value: '99.99%', desc: 'Website siap melayani pelanggan kapan pun tanpa gangguan' },
      { label: 'Nilai Kualitas Google', value: '100/100', desc: 'Sempurna di mata Google, bikin ranking makin bagus' },
      { label: 'Kenaikan Penjualan', value: '+45%', desc: 'Rata-rata kenaikan orang yang beli karena webnya nyaman dipake' }
    ],
    problemStatement: {
      title: 'Bahaya Kalo Website Anda Lemot & Murahan',
      points: [
        'Pelanggan Kabur: Tiap detik web telat kebuka, makin banyak orang yang batal beli.',
        'Template Kaku: Pake template pasaran bikin web Anda keliatan sama kayak yang lain dan susah diubah.',
        'Data Ga Aman: Sistem lama gampang kena hack, bisa bahayain data pelanggan Anda.',
        'Ribet Kalo Bisnis Gede: Website lama bakal sering error pas pengunjung mulai banyak.'
      ]
    },
    solutionOverview: {
      title: 'Kenapa Harus Buat Website Custom?',
      description: 'Kami ga cuma bikin tampilan, tapi kami bangun "mesin" buat bisnis Anda. Websitenya dibuat dari nol biar pas banget sama apa yang bisnis Anda butuhin, jadi lebih lancar dan awet.',
      benefits: [
        'Akses Tanpa Menunggu: Pelanggan pindah halaman berasa kayak ga pake loading sama sekali.',
        'Data Aman Terlindungi: Keamanan standar bank supaya bisnis Anda tenang dari serangan hacker.',
        'Milik Anda Sepenuhnya: Anda dapet semua kode sumbernya, jadi ga ada biaya sewa atau keterikatan.',
        'Bisa Tambah Fitur Apa Saja: Bisnis makin gede? Websitenya gampang ditambahin fitur baru kapan aja.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Diskusi & Rencana', desc: 'Kita dengerin apa mau Anda dan kita buatkan blueprint teknis yang pas.' },
      { step: '02', title: 'Proses Coding', desc: 'Membangun website pake teknologi paling baru (Next.js 15) biar hasilnya mantap.' },
      { step: '03', title: 'Cek Keamanan', desc: 'Web disiksa dulu buat pastiin ga ada celah dan ga bakalan mati pas rame.' },
      { step: '04', title: 'Serah Terima', desc: 'Website live dan kita ajarin cara makenya supaya Anda mandiri.' }
    ],
    guarantee: 'Jaminan website super cepat. Kalo ga sesuai target kecepatan, kami kerjain sampe dapet tanpa biaya tambahan.',
    investment: {
      price: 'Investasi Mulai dari Rp 12.000.000',
      duration: 'Siklus Pengerjaan 4 Minggu',
      features: [
        'Website Custom (Bukan Template Murahan)',
        'Teknologi Paling Baru & Super Cepat',
        'Keamanan Tingkat Tinggi & Enkripsi Data',
        'Hak Milik Kode 100% Jadi Milik Anda',
        'Bantuan Teknis Setelah Website Jadi'
      ]
    },
    faqs: [
      {
        q: 'Kok harganya lebih mahal dibanding developer biasa?',
        a: 'Karena Anda bukan beli "halaman web" doang, tapi bangun aset bisnis. Website ini dibuat supaya ga perlu bongkar pasang lagi di masa depan, jadi sebenernya jauh lebih hemat.'
      },
      {
        q: 'Bisa disambungin ke sistem yang udah ada?',
        a: 'Bisa banget. Karena kita coding sendiri, kita bisa sambungin ke aplikasi atau database apa pun yang Anda udah punya.'
      },
      {
        q: 'Apa itu "Pajak Kelemotan"?',
        a: 'Itu biaya rugi yang ga keliatan. Kalo web Anda lemot, orang ga jadi beli. Dengan web kami, kerugian itu ilang dan berubah jadi untung.'
      }
    ]
  },

  'ai-integration': {
    slug: 'ai-integration',
    title: 'Karyawan Digital AI (Tanya Jawab Otomatis)',
    subtitle: 'Pasang sistem pintar yang bisa belajar dan kerja sendiri. Selesaikan urusan pelanggan 24 jam tanpa harus nambah orang.',
    category: 'Kecerdasan Buatan (AI)',
    badge: 'Hemat Biaya 80%',
    heroHeadline: 'Urusan Ribet Jadi Otomatis. Bisnis Makin Pinter 24 Jam.',
    heroDescription: 'Capek balesin chat yang itu-itu aja atau input data manual? Kami buatkan Asisten AI pintar yang bisa jawab chat, bantu urus data, dan ngambil keputusan cepet kayak manusia—tapi ga pernah tidur dan tau semua isi bisnis Anda.',
    coreMetrics: [
      { label: 'Kecepatan Jawab', value: '< 2 detik', desc: 'Jawaban instan buat tiap pertanyaan pelanggan' },
      { label: 'Hemat Biaya', value: '75%', desc: 'Kurangi biaya admin buat tugas-tugas yang membosankan' },
      { label: 'Akurasi Jawaban', value: '98.5%', desc: 'AI pinter karena diajarin pake data asli bisnis Anda' },
      { label: 'Selalu Aktif', value: '100%', desc: 'Bisnis jalan terus biarpun Anda lagi tidur atau liburan' }
    ],
    problemStatement: {
      title: 'Masalah Kalo Bisnis Masih Pake Cara Manual',
      points: [
        'Admin Kewalahan: Kalo pelanggan makin banyak, biaya buat gaji admin juga makin bengkak.',
        'Salah Input Data: Manusia bisa capek dan salah nulis, bisa bikin rugi bisnis Anda.',
        'Data Berantakan: Info penting bisnis ketumpuk di file atau chat, susah dicari pas butuh.',
        'Pelanggan Kabur: Orang jaman sekarang mau jawaban cepet. Telat dikit, mereka pindah ke lain hati.'
      ]
    },
    solutionOverview: {
      title: 'AI Bukan Cuma Chatbot Biasa',
      description: 'Kami ga cuma bikin robot chat yang jawabannya kaku. Kami bikin Asisten Pintar (pake teknologi Google Gemini) yang bener-bener ngerti produk Anda, cara kerja Anda, dan bisa bantuin pelanggan di mana aja.',
      benefits: [
        'AI yang "Kenal" Bisnis Anda: Ga asal jawab, tapi pake data dan aturan dari Anda sendiri.',
        'Bisa di WhatsApp & Web: Pelanggan bisa tanya di mana aja dan dapet jawaban yang sama pinter.',
        'Bantu Olah Data Otomatis: Bisa bantuin baca laporan, invoice, atau data ribet jadi ringkasan mudah.',
        'Tim Tetap Aman: AI bakal oper ke manusia cuma kalo emang ada masalah yang bener-bener butuh bantuan orang.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Belajar Data Anda', desc: 'Kita kumpulin aturan dan data bisnis Anda buat "diajarin" ke AI.' },
      { step: '02', title: 'Setting Si Pintar', desc: 'Proses merancang gimana cara AI Anda ngomong dan bantu pelanggan.' },
      { step: '03', title: 'Sambungin ke Sistem', desc: 'Kita pasang AI-nya di WhatsApp, Web, atau aplikasi kantor Anda.' },
      { step: '04', title: 'Uji Coba & Aman', desc: 'Tes biar jawabannya bener-bener pas dan ga ngaco sebelum dipake umum.' }
    ],
    guarantee: 'Jaminan AI yang pinter dan data bisnis Anda aman 100%. Data Anda ga bakal disebar ke mana-mana.',
    investment: {
      price: 'Investasi Mulai dari Rp 10.000.000',
      duration: 'Siklus Pengerjaan 3-4 Minggu',
      features: [
        'Sistem AI Pintar Custom (Bukan AI Pasaran)',
        'Pake Teknologi Google Gemini Terbaru',
        'Input Data Bisnis Anda Jadi Pengetahuan AI',
        'Bisa Dipasang di WhatsApp & Website',
        'Setting Keamanan Biar AI Ga Ngasal Jawab'
      ]
    },
    faqs: [
      {
        q: 'AI-nya bakal ngaco atau salah jawab ga?',
        a: 'Kami pake sistem khusus yang "ngunci" AI cuma boleh jawab pake data yang Anda kasih. Jadi dia ga bakal ngarang bebas di luar urusan bisnis Anda.'
      },
      {
        q: 'Data saya aman ga dipake buat latihan AI lain?',
        a: 'Aman 100%. Kita pake jalur khusus perusahaan yang jamin data Anda cuma dipake buat bisnis Anda sendiri, bukan buat umum.'
      }
    ]
  },

  'ecommerce-automation': {
    slug: 'ecommerce-automation',
    title: 'Toko Online yang Jualan Sendiri (Tanpa Ribet)',
    subtitle: 'Bikin toko online super cepat yang urusin stok dan pesanan otomatis. Ga usah bayar komisi ke marketplace lagi.',
    category: 'Solusi E-Commerce',
    badge: 'Bebas Komisi 0%',
    heroHeadline: 'Punya Toko Sendiri. Ambil Untung 100% Tanpa Potongan.',
    heroDescription: 'Jualan di marketplace makin mahal karena potongannya gede? Kami buatkan toko online khusus brand Anda yang super cepat dibuka di HP, gampang dipake pembeli, dan semua urusan pesanan sampe pengiriman jadi otomatis.',
    coreMetrics: [
      { label: 'Potongan Penjualan', value: '0%', desc: 'Semua hasil jualan 100% masuk ke kantong Anda sendiri' },
      { label: 'Kecepatan Beli', value: '1-Klik', desc: 'Pembeli ga ribet, sekali klik langsung bisa bayar' },
      { label: 'Kecepatan Web', value: '< 1 detik', desc: 'Web ga lemot biarpun diakses pas lagi jam sibuk' },
      { label: 'Efisiensi Kerja', value: '+55%', desc: 'Ngurus pesanan jadi lebih cepet dan ga capek' }
    ],
    problemStatement: {
      title: 'Kenapa Jualan di Marketplace Sering Bikin Rugi?',
      points: [
        'Potongan Gede: Marketplace ambil komisi banyak banget, untung Anda jadi tipis.',
        'Web Lambat: Kalo jualan pake web gratisan, pembeli sering kabur karena loadingnya lama.',
        'Capek Update Stok: Harus gonta-ganti stok manual di web, WA, sama toko fisik.',
        'Data Pembeli Hilang: Anda ga tau siapa pembeli Anda, jadi susah buat tawarin produk lagi.'
      ]
    },
    solutionOverview: {
      title: 'Toko Online Canggih Masa Kini',
      description: 'Kami bangun sistem toko online yang misahin tampilan sama mesin penjualannya. Hasilnya? Web Anda bakal jadi yang paling cepet, paling gampang diatur, dan bisa nyambung ke kurir atau bank apa aja.',
      benefits: [
        'Belanja Langsung Bayar: Support QRIS, Transfer Bank otomatis, sampe kartu kredit.',
        'Cetak Resi Otomatis: Ga perlu tulis manual lagi, tinggal cetak dan kirim.',
        'Notifikasi WhatsApp: Pembeli dapet info status pesanan langsung di WA mereka.',
        'Data Pelanggan Milik Anda: Anda punya daftar pembeli buat dikasih promo di masa depan.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Atur Katalog', desc: 'Kita rapikan data produk Anda biar gampang dicari pelanggan.' },
      { step: '02', title: 'Bikin Sistem Bayar', desc: 'Pasang gerbang pembayaran biar Anda dapet duit otomatis tiap ada yang beli.' },
      { step: '03', title: 'Sambungin Kurir', desc: 'Setting ongkir otomatis dan sistem pelacakan paket buat pembeli.' },
      { step: '04', title: 'Tes Jualan', desc: 'Uji coba transaksi buat pastiin sistemnya lancar jaya pas launching.' }
    ],
    guarantee: 'Jaminan toko online super cepat dan tanpa biaya komisi tiap jualan.',
    investment: {
      price: 'Investasi Mulai dari Rp 15.000.000',
      duration: 'Siklus Pengerjaan 4-6 Minggu',
      features: [
        'Website Toko Online Custom Premium',
        'Optimasi Kecepatan Super di HP',
        'Sistem Pembayaran & Ongkir Otomatis',
        'Notifikasi WA Buat Setiap Pesanan',
        'Laporan Penjualan yang Gampang Dibaca'
      ]
    },
    faqs: [
      {
        q: 'Bisa gantiin toko saya di Shopee atau Tokopedia?',
        a: 'Bisa banget. Kita pindahin datanya ke web sendiri biar Anda ga perlu bayar biaya admin marketplace yang mahal tiap ada penjualan.'
      },
      {
        q: 'Nambah barangnya susah ga?',
        a: 'Gampang banget. Kami buatin panel admin yang simpel, jauh lebih gampang daripada jualan di marketplace.'
      }
    ]
  },

  'landing-page': {
    slug: 'landing-page',
    title: 'Halaman Promosi yang Bikin Laris (Landing Page)',
    subtitle: 'Iklan mahal jangan dibuang percuma. Kami buatkan halaman khusus yang emang dirancang buat bikin orang langsung klik beli.',
    category: 'Optimasi Penjualan',
    badge: 'Iklan Jadi Untung',
    heroHeadline: 'Ubah Klik Jadi Duit. Stop Buang-buang Uang Iklan.',
    heroDescription: 'Kalo Anda pasang iklan tapi websitenya biasa aja, orang cuma bakal liat-liat terus kabur. Kami buatkan satu halaman promosi khusus (Landing Page) yang pinter ngerayu pengunjung supaya jadi pembeli setia.',
    coreMetrics: [
      { label: 'Kenaikan Pembeli', value: '12% - 25%', desc: 'Kenaikan jumlah orang yang beli dibanding web biasa' },
      { label: 'Hasil Iklan (ROAS)', value: '3.5x+', desc: 'Dapet untung berkali lipat dari modal iklan Anda' },
      { label: 'Kecepatan Buka', value: '< 0.4 detik', desc: 'Halaman langsung kebuka pas iklan diklik' },
      { label: 'Skor HP', value: '100%', desc: 'Tampilan sempurna buat orang yang scroll di HP' }
    ],
    problemStatement: {
      title: 'Kenapa Iklan Anda Masih Rugi?',
      points: [
        'Web Lambat: Orang klik iklan tapi webnya ga buka-buka, akhirnya mereka kabur.',
        'Isinya Bingungin: Orang masuk ke web tapi gatau harus klik apa atau beli di mana.',
        'Ga Narik Perhatian: Bahasanya terlalu teknis atau kaku, ga bikin orang pengen beli.',
        'Formulir Ribet: Mau nanya atau beli tapi harus isi banyak data, akhirnya males.'
      ]
    },
    solutionOverview: {
      title: 'Halaman Yang Pinter Jualan',
      description: 'Setiap baris kalimat dan gambar di halaman ini diatur supaya bisa "menghipnotis" pengunjung. Kita pastiin ga ada hambatan teknis yang bikin orang ragu buat beli produk Anda.',
      benefits: [
        'Kalimat Rayuan Maut: Tulisan yang emang dibuat buat nyelesein masalah pelanggan.',
        'Buka Tanpa Nunggu: Klik iklan, halaman langsung nongol di layar.',
        'Desain Terpercaya: Tampilan mewah yang bikin bisnis Anda keliatan bonafide.',
        'Tombol Beli Jelas: Tombol WhatsApp atau order yang selalu kelihatan dan gampang diklik.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cari Ide Jualan', desc: 'Kita cari tau apa yang bikin orang mau beli produk Anda.' },
      { step: '02', title: 'Bikin Tulisan', desc: 'Nulis kalimat promosi yang ngerayu dan bikin orang yakin.' },
      { step: '03', title: 'Bikin Web Cepat', desc: 'Coding halamannya biar super ringan dan lancar di HP.' },
      { step: '04', title: 'Pasang Tracker', desc: 'Pasang alat buat liat siapa aja yang klik biar iklannya makin pinter.' }
    ],
    guarantee: 'Jaminan halaman super cepat dan struktur yang emang fokus buat jualan.',
    investment: {
      price: 'Investasi Mulai dari Rp 5.000.000',
      duration: 'Siklus Pengerjaan 7 Hari Kerja',
      features: [
        'Desain Landing Page yang Fokus Jualan',
        'Kalimat Promosi (Copywriting) Profesional',
        'Pasang Alat Lacak (Pixel) Facebook/Google',
        'Kecepatan Super di Seluruh Dunia',
        'Konsultasi Cara Pasang Iklan yang Bener'
      ]
    },
    faqs: [
      {
        q: 'Cuma buat jualan barang aja?',
        a: 'Enggak, bisa buat jasa, kursus online, atau cari orang buat daftar acara. Pokoknya semua yang butuh orang buat ambil tindakan.'
      },
      {
        q: 'Apa bedanya sama web biasa?',
        a: 'Web biasa itu kayak toko gede yang orang bebas muter-muter. Landing page itu kayak sales pinter yang nuntun orang langsung ke kasir buat bayar.'
      }
    ]
  },

  'pembuatan-website': {
    slug: 'pembuatan-website',
    title: 'Sistem Bisnis Terpusat & Aman (Digital Infrastructure)',
    subtitle: 'Amankan masa depan bisnis Anda dengan sistem yang rapi dan kuat. Bangun tulang punggung digital untuk operasional Anda.',
    category: 'Sistem Perusahaan (Enterprise)',
    badge: 'Sistem Anti-Macet',
    heroHeadline: 'Sistem yang Bisa Tumbuh Terus. Hilangkan Ribet di Kantor.',
    heroDescription: 'Sering pusing karena data kantor berantakan atau aplikasi yang dipake ga nyambung satu sama lain? Kami bangunkan sistem pusat yang nyatuin semua urusan bisnis Anda jadi satu "mesin" yang lancar, aman, dan siap dipake sampe kapan pun.',
    coreMetrics: [
      { label: 'Website Selalu Nyala', value: '99.99%', desc: 'Sistem dirancang buat urusan penting yang ga boleh mati' },
      { label: 'Keamanan Data', value: '100%', desc: 'Data transaksi aman dan ga bakal ketuker-tuker' },
      { label: 'Kecepatan Kerja', value: '+60%', desc: 'Kerjaan kantor jadi jauh lebih cepet dan efisien' },
      { label: 'Bebas Hutang Teknis', value: '0%', desc: 'Sistem rapi, terdokumentasi, dan milik Anda sepenuhnya' }
    ],
    problemStatement: {
      title: 'Bahayanya Kalo Sistem Kantor Masih Berantakan',
      points: [
        'Data Pindah Manual: Karyawan buang waktu mindahin data dari satu aplikasi ke aplikasi lain.',
        'Celah Keamanan: Sistem lama gampang dijebol, data rahasia bisnis bisa bocor.',
        'Gampang Error: Sistem sering ngehang atau lemot pas bisnis mulai berkembang pesat.',
        'Biaya Rawat Mahal: Habis banyak uang cuma buat benerin error yang itu-itu aja.'
      ]
    },
    solutionOverview: {
      title: 'Sistem Kerja Yang Rapi & Modern',
      description: 'Kami ga cuma bikin "aplikasi", tapi kami bangun pondasi bisnis Anda. Sistem kami bakal nyambungin semua bagian kantor Anda jadi satu aliran yang otomatis dan aman.',
      benefits: [
        'Sesuai Cara Kerja Anda: Software yang ngikutin aturan bisnis Anda, bukan Anda yang ngikut sistem.',
        'Bisa Nyambung ke Mana Aja: Sambungin sistem pusat Anda ke alat apa pun dengan aman.',
        'Laporan Otomatis: Liat kesehatan bisnis Anda secara langsung (real-time) tanpa perlu rekap manual.',
        'Keamanan Standar Industri: Enkripsi data tingkat tinggi dan akses yang dijagain ketat.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cek Cara Kerja', desc: 'Kita audit cara kerja kantor Anda sekarang dan cari apa yang bisa diperbaiki.' },
      { step: '02', title: 'Rancang Sistem', desc: 'Bikin rencana database dan struktur sistem biar kuat buat jangka panjang.' },
      { step: '03', title: 'Proses Bangun', desc: 'Coding sistemnya pake alat paling canggih biar hasilnya pinter dan cepat.' },
      { step: '04', title: 'Pindah Data', desc: 'Bantu pindahin data lama Anda ke sistem baru dengan aman dan teliti.' }
    ],
    guarantee: 'Jaminan sistem yang selalu aktif dan dapet panduan lengkap buat tim Anda.',
    investment: {
      price: 'Investasi Mulai dari Rp 25.000.000',
      duration: 'Siklus Pengerjaan 8-12 Minggu',
      features: [
        'Sistem Perusahaan Custom (Bukan Rakitan)',
        'Desain Database Kuat & Aman',
        'Koneksi Sistem (API) yang Terlindungi',
        'Bantu Pindah Data dari Sistem Lama',
        'Bantuan & Perawatan Setelah Sistem Jadi'
      ]
    },
    faqs: [
      {
        q: 'Sistemnya jadi milik kami?',
        a: 'Iya. Anda dapet semua hak milik dan kodenya. Ini jadi aset bisnis Anda, bukan cuma sewa aplikasi bulanan.'
      },
      {
        q: 'Bisa buat jutaan orang?',
        a: 'Bisa banget. Kita pake teknologi awan (cloud) yang otomatis melebar kalo penggunanya makin banyak.'
      }
    ]
  },

  'cloud-infrastructure': {
    slug: 'cloud-infrastructure',
    title: 'Server Kuat Anti-Down (Cloud Infrastructure)',
    subtitle: 'Bangun pondasi digital yang tahan banting. Kami atur server yang otomatis nambah kuat saat rame, jaga data, dan tetep cepet.',
    category: 'Teknik Server (Cloud)',
    badge: 'Selalu Aktif 99.99%',
    heroHeadline: 'Server Fleksibel. Pasti Aman. Ga Perlu Khawatir Down.',
    heroDescription: 'Hosting yang sering mati atau server yang ringkih itu bahaya buat omzet. Kami buatkan rumah digital (server cloud) di AWS atau Google Cloud yang jamin website Anda selalu bisa dibuka, selalu cepat, dan selalu aman dari gangguan.',
    coreMetrics: [
      { label: 'Waktu Aktif', value: '99.99%', desc: 'Website dijamin hampir ga pernah mati atau down' },
      { label: 'Kecepatan Akses', value: '-65%', desc: 'Akses lebih cepet dari mana aja di seluruh dunia' },
      { label: 'Kapasitas Otomatis', value: 'Instan', desc: 'Server otomatis makin kuat pas pengunjung lagi membludak' },
      { label: 'Pemulihan Data', value: 'Otomatis', desc: 'Data cadangan (backup) aman dan bisa balik instan kalo ada masalah' }
    ],
    problemStatement: {
      title: 'Bahaya Kalo Server Anda Murahan',
      points: [
        'Tiba-tiba Down: Pengunjung lagi rame eh server malah mati, rugi jutaan rupiah.',
        'Akses Lemot: Website berasa berat dibuka karena servernya jauh atau speknya rendah.',
        'Data Hilang: Ga ada sistem cadangan yang bener, data bisnis bisa ilang selamanya.',
        'Biaya Mahal tapi Ga Guna: Bayar server mahal tapi kinerjanya tetep jelek karena ga diatur bener.'
      ]
    },
    solutionOverview: {
      title: 'Server Canggih & Tahan Banting',
      description: 'Kami ga cuma "sewa" hosting. Kami bangun ekosistem server yang pinter dan bisa jaga dirinya sendiri, jadi Anda bisa fokus jualan tanpa mikirin server lagi.',
      benefits: [
        'Akses Terdekat: Data dikirim dari server yang paling deket sama pengunjung Anda.',
        'Setting Server Rapi: Pengaturan server yang terdokumentasi dan gampang dipindahin.',
        'Benteng Keamanan: Dilengkapi tameng anti serangan (DDoS) dan enkripsi data.',
        'Pantau 24 Jam: Sistem otomatis yang lapor kalo ada yang ga beres sama server.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cek Traffic', desc: 'Liat berapa banyak pengunjung Anda buat nentuin spek server yang pas.' },
      { step: '02', title: 'Setting Keamanan', desc: 'Pasang tembok api (firewall) dan kunci akses biar server ga bisa ditembus.' },
      { step: '03', title: 'Pasang Jalur Otomatis', desc: 'Setting supaya update website bisa langsung masuk tanpa bikin web mati.' },
      { step: '04', title: 'Serah Terima', desc: 'Kasih semua akses dan dokumentasi biar Anda pegang kendali penuh.' }
    ],
    guarantee: 'Jaminan website hampir ga pernah mati dan data ga bakal ilang.',
    investment: {
      price: 'Investasi Mulai dari Rp 18.000.000',
      duration: 'Siklus Pengerjaan 3-5 Minggu',
      features: [
        'Sistem Server Cloud Banyak Wilayah',
        'Tameng Keamanan & Anti Serangan Cyber',
        'Sistem Server yang Bisa Nambah Kuat Otomatis',
        'Cadangan Data (Backup) & Pemulihan Otomatis',
        'Laporan Kesehatan Server Tiap Bulan'
      ]
    },
    faqs: [
      {
        q: 'Pake server apa yang paling bagus?',
        a: 'Tergantung kebutuhan. Kita bakal cek Google Cloud atau AWS mana yang paling murah tapi tetep kenceng buat bisnis Anda.'
      },
      {
        q: 'Bisa pindah dari hosting biasa?',
        a: 'Bisa banget. Kita bantu pindahin semua datanya dari hosting lama yang sering lemot ke server cloud yang super kuat tanpa bikin web mati.'
      }
    ]
  },

  'security-audit': {
    slug: 'security-audit',
    title: 'Cek Keamanan & Anti-Hacker (Security Audit)',
    subtitle: 'Temukan celah sebelum hacker masuk. Kami berikan audit keamanan standar bank dan perkuat sistem Anda.',
    category: 'Keamanan Digital',
    badge: 'Catatan Bersih 0 Bobol',
    heroHeadline: 'Amankan Aset Digital. Jaga Kepercayaan Pelanggan Anda.',
    heroDescription: 'Satu kali aja data bocor, reputasi bisnis yang dibangun bertahun-tahun bisa ancur. Kami cek semua celah di website atau aplikasi Anda dan kita tutup rapat-rapat biar aman dari serangan hacker jaman sekarang.',
    coreMetrics: [
      { label: 'Deteksi Celah', value: '100%', desc: 'Cek semua bagian web dan server sampe ke akarnya' },
      { label: 'Aturan Hukum', value: 'Sesuai', desc: 'Pastiin sistem Anda udah sesuai aturan privasi data' },
      { label: 'Kurangi Resiko', value: '99.9%', desc: 'Hapus semua pintu masuk yang bisa dipake hacker' },
      { label: 'Standar Enkripsi', value: 'AES-256', desc: 'Data dikunci rapat pake standar keamanan bank' }
    ],
    problemStatement: {
      title: 'Bahaya Yang Ngincer Bisnis Online Anda',
      points: [
        'Robot Hacker: Ada robot yang nyari website lemah 24 jam penuh buat dicuri datanya.',
        'Celah di Kode: Tulisan kode lama atau asal-asalan sering punya "pintu belakang" buat hacker.',
        'Data Terbuka: Informasi pelanggan atau keuangan yang ga dikunci bisa dimaling orang.',
        'Karyawan Ceroboh: Ga ada aturan keamanan bikin orang dalem ga sengaja buka celah buat hacker.'
      ]
    },
    solutionOverview: {
      title: 'Tutup Celah Sebelum Kejadian',
      description: 'Kami ga cuma pake alat scan otomatis. Kami coba "nyerang" sistem Anda sendiri (sebagai hacker baik) buat cari celah yang alat biasa ga bisa temuin.',
      benefits: [
        'Tes Serangan (Hacker Baik): Kita simulasiin serangan asli buat liat seberapa kuat web Anda.',
        'Cek Tulisan Kode: Cari bagian kode yang bahaya atau pancingan buat hacker.',
        'Setting Server Aman: Bikin server Anda "ga kelihatan" atau susah ditembus bot.',
        'Aturan Aman Buat Tim: Kita buatin panduan supaya tim Anda juga pinter jaga data.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cek dari Luar', desc: 'Scan semua bagian luar bisnis Anda buat liat pintu yang kebuka.' },
      { step: '02', title: 'Coba Jebol', desc: 'Kita coba masuk secara paksa (aman) buat cari kelemahan sistem.' },
      { step: '03', title: 'Tutup Celah', desc: 'Langsung kita perbaiki, pasang patch, dan kunci semua data.' },
      { step: '04', title: 'Laporan Lengkap', desc: 'Kasih daftar apa aja yang udah diperbaiki dan cara biar tetep aman.' }
    ],
    guarantee: 'Jaminan celah bahaya hilang dan dapet sertifikat bukti keamanan sistem.',
    investment: {
      price: 'Investasi Mulai dari Rp 15.000.000',
      duration: 'Siklus Audit 2-3 Minggu',
      features: [
        'Tes Jebol Sistem (Penetration Test) Manual',
        'Audit Keamanan Database & Jalur Data (API)',
        'Perkuat Server & Kunci Data (Enkripsi)',
        'Cek Aturan Privasi Data (Compliance)',
        'Rencana Darurat Kalo Ada Serangan'
      ]
    },
    faqs: [
      {
        q: 'Udah punya SSL (Gembok Hijau), masih butuh audit?',
        a: 'SSL itu cuma buat amanin data pas lagi dikirim. Itu ga jaga database atau mesin web Anda dari serangan langsung. Jadi tetep wajib diaudit.'
      },
      {
        q: 'Seberapa sering harus audit?',
        a: 'Minimal setahun sekali atau tiap ada update fitur gede-gedean, biar pastiin kode baru ga bawa penyakit baru.'
      }
    ]
  },

  'seo-aeo': {
    slug: 'seo-aeo',
    title: 'Ranking 1 Google & Rekomendasi AI (SEO & AEO)',
    subtitle: 'Jangan cuma kejar kata kunci. Muncul di ChatGPT, Perplexity, dan Google sekaligus supaya bisnis Anda makin dipercaya.',
    category: 'Strategi Maju',
    badge: 'Siap Era AI',
    heroHeadline: 'Jaga Nama Baik Bisnis. Jadi Referensi Utama di Jaman AI.',
    heroDescription: 'Cara orang cari barang udah berubah. Sekarang orang ga cuma pake Google, tapi tanya ke AI kayak ChatGPT. Kami buat supaya bisnis Anda bukan cuma ranking di Google, tapi juga direkomendasiin sama AI sebagai pilihan nomor satu.',
    coreMetrics: [
      { label: 'Tampilan Organik', value: '+120%', desc: 'Kenaikan jumlah orang yang liat bisnis Anda secara gratis' },
      { label: 'Rekomendasi AI', value: 'Kelas Atas', desc: 'Muncul saat orang tanya ke AI (ChatGPT, dll)' },
      { label: 'Skor Teknis SEO', value: '100/100', desc: 'Website sempurna di mata mesin pencari' },
      { label: 'Kepercayaan AI', value: 'Tinggi', desc: 'AI anggap bisnis Anda adalah sumber info paling bener' }
    ],
    problemStatement: {
      title: 'Perubahan Cara Orang Cari Bisnis',
      points: [
        'SEO Lama Udah Mati: Masukin banyak kata kunci doang udah ga mempan buat Google jaman sekarang.',
        'Orang Pindah ke AI: Banyak orang mulai pake AI buat nanya rekomendasi, bukan scroll Google lagi.',
        'Data Ga Kebaca: Kalo info bisnis Anda berantakan, AI ga bakal mau rekomendasiin Anda.',
        'Web Lemot Dibuang: Google makin tegas nendang website lambat dari halaman depan.'
      ]
    },
    solutionOverview: {
      title: 'Jadi Sumber Info Terpercaya',
      description: 'Kami ga cuma "nambahin kata kunci". Kami bangun struktur informasi supaya Google dan AI tau kalo Anda adalah ahlinya di bidang ini, buat manusia maupun buat robot.',
      benefits: [
        'Muncul di Jawaban AI: Bikin ChatGPT atau Gemini sebut nama bisnis Anda pas orang nanya.',
        'Peta Data Buat Google: Kasih panduan jelas buat Google biar gampang ngerti isi web Anda.',
        'Bangun Nama Besar: Bikin isi web yang nunjukin kalo Anda emang paling jago di bidangnya.',
        'Tanpa Hambatan Teknis: Website super cepat yang bikin Google seneng buat majuin rankingnya.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cari Topik Utama', desc: 'Cari tau apa aja yang pelanggan Anda sering tanyain di internet.' },
      { step: '02', title: 'Perbaiki Struktur Web', desc: 'Bikin struktur website yang pinter dan gampang dibaca robot pencari.' },
      { step: '03', title: 'Siapkan Info Buat AI', desc: 'Atur info bisnis Anda biar gampang diambil dan disebut sama AI.' },
      { step: '04', title: 'Pantau Ranking', desc: 'Terus liat perkembangan dan sesuaikan kalo ada update dari Google.' }
    ],
    guarantee: 'Perfect technical SEO scores (100/100) and guaranteed indexing for core authority pillars.',
    investment: {
      price: 'Investasi Mulai dari Rp 12.000.000',
      duration: 'Siklus Optimasi 4-6 Minggu',
      features: [
        'Complete Semantic SEO Strategy',
        'AEO & AI Search Recommendation Setup',
        'Advanced Schema Markup Implementation',
        'Topical Authority Content Blueprint',
        'Monthly Algorithm Impact Reports'
      ]
    },
    faqs: [
      {
        q: 'Apa itu AEO?',
        a: 'Simpelnya, gimana caranya biar pas orang nanya ke AI (kayak ChatGPT), AI itu bakal jawab pake info bisnis Anda dan nyaranin orang buat pake jasa Anda.'
      },
      {
        q: 'Butuh web baru buat ini?',
        a: 'Seringkali iya. Web lama kayak WordPress biasanya keberatan kode yang bikin robot susah baca. Web kami yang pake Next.js emang dirancang buat jaman ini.'
      }
    ]
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    title: 'Iklan yang Bikin Untung (Digital Marketing)',
    subtitle: 'Lupakan iklan yang cuma dapet "like". Kami buatkan iklan yang bener-bener datengin penjualan dan bisa dihitung untungnya.',
    category: 'Strategi Maju',
    badge: 'Iklan Fokus Jualan',
    heroHeadline: 'Iklan Yang Terukur. Hasil Nyata. Ga Pake Omong Kosong.',
    heroDescription: 'Iklan itu harusnya jadi investasi, bukan buang uang. Kami gabungin data pembeli sama halaman promosi yang canggih supaya tiap rupiah yang Anda keluarin buat iklan berubah jadi untung yang jelas—dan bisa dilacak asalnya.',
    coreMetrics: [
      { label: 'Akurasi Data', value: '100%', desc: 'Tahu persis dari mana asal tiap pembeli atau calon klien' },
      { label: 'Biaya Cari Pelanggan', value: '-35%', desc: 'Lebih hemat dapet pelanggan baru dibanding cara lama' },
      { label: 'Untung Iklan (ROAS)', value: '4.0x+', desc: 'Target balik modal 4 kali lipat dari biaya iklan' },
      { label: 'Kecepatan Jualan', value: 'Tinggi', desc: 'Bikin proses orang dari liat iklan sampe beli jadi lebih cepet' }
    ],
    problemStatement: {
      title: 'Kenapa Iklan Anda Masih Boncos?',
      points: [
        'Cuma Dapet Like: Bayar agensi mahal-mahal tapi cuma dapet "jempol" bukan dapet duit.',
        'Data Ga Jelas: Ga tau iklan yang mana yang sebenernya bikin orang beli.',
        'Salah Sasaran: Iklan tayang ke orang yang ga butuh produk Anda, jadi buang uang.',
        'Alat Lacak Rusak: Data iklan ga akurat bikin Anda salah ambil keputusan.'
      ]
    },
    solutionOverview: {
      title: 'Iklan Pake Cara "Teknik"',
      description: 'Kami ngurus iklan kayak ngurus mesin. Dengan alat pelacak yang kuat dan halaman jualan yang bagus, kita ubah budget iklan Anda jadi mesin pencetak untung yang bisa ditebak.',
      benefits: [
        'Lacak Untung Rugi: Liat secara langsung berapa untung Anda dari tiap iklan.',
        'Incer Orang Yang Tepat: Jangkau orang yang emang lagi niat beli berdasarkan data.',
        'Bahasa Jualan Yang Pas: Tulisan iklan yang bikin orang pengen langsung klik.',
        'Alat Lacak Canggih: Tetap bisa baca data biarpun browser sekarang makin ketat penjagaannya.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cek Data & Rencana', desc: 'Bersihin data lama and cari tau di mana iklan Anda bocor selama ini.' },
      { step: '02', title: 'Bikin Jalur Jualan', desc: 'Siapkan halaman promosi and gambar iklan yang paling bikin orang mau beli.' },
      { step: '03', title: 'Jalanin Iklan', desc: 'Pasang iklan di Facebook, Instagram, Google, sampe TikTok.' },
      { step: '04', title: 'Pilih Yang Untung', desc: 'Terus pantau, matiin iklan yang rugi and gedein iklan yang paling untung.' }
    ],
    guarantee: 'Laporan jujur apa adanya and jaminan data pelacakan pembeli 100% akurat.',
    investment: {
      price: 'Investasi Mulai dari Rp 10.000.000/bln',
      duration: 'Minimal Kerjasama 3 Bulan',
      features: [
        'Strategi Iklan Lengkap di Berbagai Medsos',
        'Setting Alat Lacak Pembeli Paling Canggih',
        'Bikin Halaman Promosi yang Fokus Jualan',
        'Laporan Hasil & Untung Tiap Minggu',
        'Konsultan Strategi Pertumbuhan Bisnis Khusus'
      ]
    },
    faqs: [
      {
        q: 'Urusin budget iklan juga?',
        a: 'Iya. Kami yang kelola budget Anda di Facebook, Google, atau TikTok dengan fokus cuma satu: dapet untung, bukan cuma dapet klik.'
      },
      {
        q: 'Apa bedanya sama agensi biasa?',
        a: 'Kami ini orang teknik. Kami bangun infrastrukturnya (halaman jualan, alat lacak, sistem data) yang bikin iklan itu bener-bener kerja, bukan cuma bikin gambar bagus.'
      }
    ]
  },

  'maintenance': {
    slug: 'maintenance',
    title: 'Rawat Website & Update Terus (Maintenance)',
    subtitle: 'Website yang didiemin bakal lama-lama rusak dan ditinggal pelanggan. Kami jagain supaya website Anda tetep baru, cepet, dan aman.',
    category: 'Bantuan Teknik',
    badge: 'Jagaan Ahli',
    heroHeadline: 'Nol Error. Nol Ribet. Website Update Terus.',
    heroDescription: 'Bikin website itu baru langkah awal. Biar tetep menang lawan saingan, website Anda butuh dicek rutin, diperbaiki keamanannya, dan ditingkatin kecepatannya. Kami urusin semua bagian ribetnya biar Anda bisa fokus jualan aja.',
    coreMetrics: [
      { label: 'Respon Bantuan', value: '< 4 jam', desc: 'Akses prioritas ke tim teknis utama kami' },
      { label: 'Kesehatan Sistem', value: '100%', desc: 'Dicek terus tiap hari supaya ga ada yang error' },
      { label: 'Update Keamanan', value: 'Instan', desc: 'Langsung ditutup celahnya kalo ada bahaya baru' },
      { label: 'Performa Stabil', value: 'Selalu', desc: 'Website tetep kenceng biarpun teknologi makin maju' }
    ],
    problemStatement: {
      title: 'Bahayanya Kalo Website Didiemin Aja',
      points: [
        'Website Karatan: Fitur lama-lama bisa mati sendiri karena teknologi internet berubah terus.',
        'Jendela Hacker: Server yang ga pernah diupdate gampang banget dijebol robot hacker.',
        'Makin Lemot: Website berasa makin berat karena data numpuk tapi ga pernah dirapiin.',
        'Makin Mahal Nanti: Kalo dibiarin rusak parah, benerinnya bakal jauh lebih mahal dan lama.'
      ]
    },
    solutionOverview: {
      title: 'Website Yang Selalu Fresh',
      description: 'Kami ga nunggu sampe rusak baru benerin. Kami jagain, tambal, dan optimasin terus supaya website Anda selalu jadi yang terbaik tanpa Anda perlu pusing mikirin teknisnya.',
      benefits: [
        'Tanya Langsung ke Ahlinya: Bisa nanya apa aja langsung ke orang yang bikin website Anda.',
        'Kecepatan Dijagain Terus: Kita pastiin website tetep super cepat kayak baru jadi.',
        'Tutup Celah Bahaya: Selalu pasang tameng keamanan terbaru biar bisnis tenang.',
        'Konsultasi Fitur Baru: Bisa diskusi kapan waktu yang pas buat nambah menu atau fitur baru.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Cek Rutin Bulanan', desc: 'Liat semua catatan web dan performanya biar ketauan kalo ada yang ga beres.' },
      { step: '02', title: 'Perkuat Keamanan', desc: 'Update semua bagian web dan tutup celah di server biar aman.' },
      { step: '03', title: 'Rapikan Data', desc: 'Bersihin database biar website tetep ringan dan kenceng dibuka.' },
      { step: '04', title: 'Diskusi Kedepan', desc: 'Ngobrolin apa lagi yang bisa ditambahin biar bisnis Anda makin maju.' }
    ],
    guarantee: 'Jaminan website selalu aktif and dapet prioritas utama pas butuh bantuan.',
    investment: {
      price: 'Mulai dari Rp 3.000.000/bln',
      duration: 'Bantuan Terus Menerus',
      features: [
        'Update Keamanan & Perbaikan Rutin',
        'Jam Konsultasi Langsung sama Ahli Teknik',
        'Pantau Website Aktif 24 Jam Penuh',
        'Laporan Bulanan Keamanan & Kecepatan',
        'Antrean Utama Kalo Mau Nambah Fitur Baru'
      ]
    },
    faqs: [
      {
        q: 'Bisa rawat web yang bukan buatan Anda?',
        a: 'Bisa, tapi kita harus cek dulu (audit) buat pastiin "rumahnya" masih layak dan kuat buat dirawat.'
      },
      {
        q: 'Sama biaya server juga?',
        a: 'Kami yang urusin servernya (di AWS/Google), tapi biaya sewa servernya langsung ke akun Anda supaya Anda tetep punya kendali penuh.'
      }
    ]
  }
};

