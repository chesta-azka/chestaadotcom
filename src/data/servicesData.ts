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
  'web-development-nextjs': {
    slug: 'web-development-nextjs',
    title: 'Web Development Next.js & Enterprise Stack',
    subtitle: 'Solusi Website Korporat Super Cepat & Skalabel',
    category: 'Engineering & Development',
    badge: 'Standar Emas Enterprise',
    heroHeadline: 'Jangan Biarkan Website Lambat Membunuh Kredibilitas & Omset Bisnis Anda.',
    heroDescription: 'Di era digital saat ini, keterlambatan 1 detik pada loading website dapat memangkas konversi hingga 27%. Kami merancang ulang website perusahaan Anda menggunakan Next.js App Router, menjamin kecepatan sub-0.5 detik, SEO Google PageSpeed 99+, dan keamanan tingkat enterprise.',
    coreMetrics: [
      { label: 'PageSpeed Score', value: '99 - 100', desc: 'Performa maksimal di Google Lighthouse' },
      { label: 'Load Speed', value: '< 0.5s', desc: 'Akses kilat tanpa jeda di mobile & desktop' },
      { label: 'Conversion Lift', value: '+34%', desc: 'Peningkatan rata-rata prospek masuk' },
      { label: 'Uptime SLA', value: '99.98%', desc: 'Infrastruktur cloud tangguh anti down' }
    ],
    problemStatement: {
      title: 'Apakah Bisnis Anda Mengalami Hal Ini?',
      points: [
        'Website lama lambat dibuka di smartphone, membuat calon klien langsung kabur (bounce rate tinggi).',
        'Tidak muncul di halaman pertama Google, kalah telak dari kompetitor.',
        'Sering down saat mendapat lonjakan trafik iklan atau promosi besar-besaran.',
        'Desain kaku, tidak profesional, dan tidak mencerminkan nilai premium produk/jasa Anda.'
      ]
    },
    solutionOverview: {
      title: 'Solusi Total dari ChestaAzka: Next.js Enterprise Architecture',
      description: 'Kami tidak sekadar membuat website yang indah dipandang. Kami membangun mesin konversi digital yang bekerja 24/7 untuk menghasilkan leads dan penjualan nyata bagi bisnis Anda.',
      benefits: [
        'Kecepatan Super Cepat (LCP < 0.5s) berkat Server-Side Rendering (SSR) & Edge Caching.',
        'Dominasi SEO Organik Google untuk kata kunci profitabel di industri Anda.',
        'Keamanan ketat dengan enkripsi tingkat lanjut dan perlindungan DDoS.',
        '100% Hak Milik Source Code di tangan Anda tanpa ada biaya lisensi tersembunyi.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Audit & Deep Strategy', desc: 'Analisis mendalam terhadap kompetitor, target audiens, dan kelemahan website lama Anda.' },
      { step: '02', title: 'UI/UX & High-End Design', desc: 'Perancangan antarmuka premium yang berfokus pada psikologi pembeli dan konversi tinggi.' },
      { step: '03', title: 'Agile Coding & Optimization', desc: 'Eksekusi pemrograman bersih dengan TypeScript & Next.js, diuji ketat untuk Core Web Vitals.' },
      { step: '04', title: 'Launch & Guaranteed Support', desc: 'Deploy ke cloud enterprise dengan garansi pemeliharaan penuh dan training admin.' }
    ],
    guarantee: 'Garansi 30 Hari Uang Kembali jika kecepatan website tidak mencapai standar PageSpeed 90+ dan komitmen waktu pendaratan terpenuhi.',
    investment: {
      price: 'Mulai dari Rp 4.500.000',
      duration: 'Pengerjaan 7 - 14 Hari Kerja',
      features: [
        'Custom Desain Eksklusif (Tanpa Template Murahan)',
        'Next.js 15 App Router & React Server Components',
        'Integrasi Analytics & WhatsApp Lead Capture',
        'Optimasi SEO On-Page Lengkap',
        'Garansi Teknis & Maintenance 1 Bulan Penuh'
      ]
    },
    faqs: [
      {
        q: 'Berapa lama waktu pengerjaan rata-rata?',
        a: 'Untuk website company profile / business standard, pengerjaan memakan waktu antara 7 hingga 14 hari kerja sejak data dan materi lengkap diterima.'
      },
      {
        q: 'Apakah saya memiliki hak penuh atas website?',
        a: 'Ya, 100%. Seluruh source code, domain, dan hosting berada di bawah kepemilikan mutlak Anda tanpa ada ikatan vendor lock-in.'
      },
      {
        q: 'Apakah bisa diupdate sendiri isinya?',
        a: 'Tentu. Kami menyediakan panel admin yang sangat mudah digunakan (user-friendly) disertai video panduan eksklusif.'
      }
    ]
  },
  'ai-integration': {
    slug: 'ai-integration',
    title: 'AI Integration & Google Gemini Automation',
    subtitle: 'Otomatisasi Bisnis & Chatbot Cerdas Berbasis AI',
    category: 'Artificial Intelligence',
    badge: 'Efisiensi Operasional 80%',
    heroHeadline: 'Pangkas 80% Beban Operasional Customer Service dengan AI Assistant 24/7.',
    heroDescription: 'Jangan biarkan calon pelanggan menunggu balasan chat berjam-jam. Kami mengintegrasikan model AI termutakhir (Google Gemini SDK & LLM Custom) langsung ke sistem bisnis Anda untuk melayani klien, merangkum dokumen, dan mengotomatisasi alur kerja secara instan.',
    coreMetrics: [
      { label: 'Response Time', value: '< 2 detik', desc: 'Balasan instan siang & malam' },
      { label: 'Cost Saving', value: '75%', desc: 'Efisiensi anggaran operasional CS' },
      { label: 'Accuracy', value: '98.5%', desc: 'Jawaban sesuai SOP perusahaan' },
      { label: 'Availability', value: '24 / 7', desc: 'Selalu siaga melayani prospek' }
    ],
    problemStatement: {
      title: 'Tantangan Operasional Tanpa AI:',
      points: [
        'Tim CS kewalahan melipatgandakan jumlah chat masuk di luar jam operasional.',
        'Proses rekap data, laporan, dan analisis dokumen memakan waktu berhari-hari.',
        'Kehilangan calon pembeli potensial karena lambat merespons dini hari.',
        'Biaya operasional membengkak untuk merekrut staf tambahan.'
      ]
    },
    solutionOverview: {
      title: 'Transformasi Bisnis dengan AI Autonomous Workflow',
      description: 'Kami membangun asisten AI custom yang memahami seluk-beluk produk dan SOP perusahaan Anda, siap menjawab ribuan pertanyaan pelanggan secara akurat dalam hitungan detik.',
      benefits: [
        'Respon Instan 24 Jam Non-Stop di WhatsApp & Web Chat.',
        'Akurasi Tinggi berbasis RAG (Retrieval-Augmented Generation) dari data perusahaan Anda.',
        'Otomatisasi Ekstraksi Dokumen, Invoice, dan Laporan Keuangan.',
        'Integrasi mulus dengan database dan CRM yang sudah Anda miliki.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Knowledge Base Mapping', desc: 'Mengumpulkan SOP, FAQ, dan katalog produk Anda sebagai sumber pengetahuan AI.' },
      { step: '02', title: 'Model Fine-Tuning & Prompting', desc: 'Konfigurasi prompt engineering lanjutan menggunakan Google Gemini API.' },
      { step: '03', title: 'API & Channel Integration', desc: 'Menghubungkan AI ke WhatsApp Business API, Web Chat, atau internal dashboard.' },
      { step: '04', title: 'Testing & Deployment', desc: 'Simulasi ribuan skenario percakapan untuk memastikan keakuratan mutlak.' }
    ],
    guarantee: 'Garansi akurasi respon dan pendampingan setup penuh hingga sistem AI berjalan otomatis tanpa kendala.',
    investment: {
      price: 'Mulai dari Rp 6.000.000',
      duration: 'Pengerjaan 10 - 21 Hari Kerja',
      features: [
        'Custom AI Prompt & Persona Sesuai Brand',
        'Integrasi WhatsApp Business & Web Widget',
        'Dashboard Monitoring Percakapan',
        'Sistem Keamanan Data Klien Terenkripsi',
        'Training Tim Internal Perusahaan'
      ]
    },
    faqs: [
      {
        q: 'Apakah AI bisa salah menjawab?',
        a: 'Kami menggunakan teknik guardrails dan basis pengetahuan terstruktur (RAG) sehingga AI hanya menjawab berdasarkan data valid perusahaan Anda.'
      },
      {
        q: 'Apakah butuh biaya langganan API yang mahal?',
        a: 'Biaya API Google Gemini sangat efisien, umumnya kurang dari $10 - $20 per bulan untuk ribuan percakapan.'
      }
    ]
  },
  'ecommerce-automation': {
    slug: 'ecommerce-automation',
    title: 'E-Commerce & Retail Automation',
    subtitle: 'Toko Online Berkecepatan Tinggi & Konversi Maksimal',
    category: 'E-Commerce Solutions',
    badge: '0% Potongan Komisi',
    heroHeadline: 'Ubah Pengunjung Toko Online Menjadi Pembeli Setia dengan Check-out Kilat.',
    heroDescription: 'Kebanyakan toko online gagal karena proses checkout yang berbelit-belit dan halaman produk yang lambat. Kami membangun platform e-commerce kustom dengan sistem keranjang cerdas, integrasi payment gateway lokal (Midtrans/Xendit), dan manajemen stok otomatis.',
    coreMetrics: [
      { label: 'Komisi Platform', value: '0%', desc: '100% keuntungan murni milik Anda' },
      { label: 'Checkout Speed', value: '1-Klik', desc: 'Proses pembayaran tanpa hambatan' },
      { label: 'Courier Sync', value: 'Real-time', desc: 'Cek ongkir otomatis seluruh kurir' },
      { label: 'Sales Lift', value: '+45%', desc: 'Peningkatan transaksi rata-rata' }
    ],
    problemStatement: {
      title: 'Kenapa Toko Online Anda Belum Melejit?',
      points: [
        'Cart abandonment rate (keranjang ditinggalkan) sangat tinggi karena lemot.',
        'Integrasi ongkir manual yang merepotkan dan sering salah hitung.',
        'Manajemen stok berantakan antara toko fisik, marketplace, dan website.',
        'Tampilan tidak optimal di handphone padahal 90% pembeli berasal dari mobile.'
      ]
    },
    solutionOverview: {
      title: 'E-Commerce Berstandar Internasional untuk Brand Lokal',
      description: 'Platform belanja mandiri (D2C) yang memberikan kendali penuh atas data pelanggan dan margin keuntungan tanpa potongan komisi marketplace yang tinggi.',
      benefits: [
        'Proses Check-out 1-Klik yang super cepat dan mulus.',
        'Otomatisasi Cek Ongkir Seluruh Kurir (JNE, J&T, SiCepat, GoSend).',
        'Payment Gateway Otomatis (QRIS, VA, Kartu Kredit, E-Wallet).',
        'Dashboard Admin untuk laporan penjualan dan analisis produk terlaris.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Catalog & Inventory Strategy', desc: 'Penyusunan struktur produk, varian, dan kategori agar mudah ditemukan.' },
      { step: '02', title: 'Payment & Courier API Setup', desc: 'Integrasi sistem pembayaran instan dan kalkulator ongkir real-time.' },
      { step: '03', title: 'Conversion Rate Optimization', desc: 'Desain keranjang belanja persuasif yang mendorong pembelian impulsif.' },
      { step: '04', title: 'Stress Test & Launch', desc: 'Uji beban transaksi untuk memastikan server stabil saat flash sale.' }
    ],
    guarantee: 'Garansi berfungsinya seluruh alur transaksi dari keranjang hingga notifikasi WhatsApp pembeli secara instan.',
    investment: {
      price: 'Mulai dari Rp 5.500.000',
      duration: 'Pengerjaan 10 - 18 Hari Kerja',
      features: [
        'Sistem Keranjang & Checkout Profesional',
        'Integrasi Payment Gateway & Kurir Lokal',
        'Manajemen Produk & Diskon Kupon',
        'Notifikasi Otomatis via WhatsApp',
        'Panduan Operasional & Garansi 1 Bulan'
      ]
    },
    faqs: [
      {
        q: 'Apakah ada potongan komisi dari penjualan?',
        a: 'Tidak ada sama sekali! 100% keuntungan penjualan masuk ke rekening Anda (hanya potongan standar dari payment gateway pilihan Anda).'
      },
      {
        q: 'Berapa banyak produk yang bisa dimasukkan?',
        a: 'Tidak ada batasan produk. Sistem kami sanggup menampung ribuan produk dengan performa tetap stabil.'
      }
    ]
  },
  'landing-page': {
    slug: 'landing-page',
    title: 'High-Conversion Landing Page',
    subtitle: 'Satu Halaman Khusus untuk Melejitkan Penjualan Iklan Anda',
    category: 'Conversion Rate Optimization',
    badge: 'ROI Iklan Maksimal',
    heroHeadline: 'Habis Budget Iklan tapi Leads Sepi? Saatnya Gunakan High-Conversion Landing Page.',
    heroDescription: 'Jangan arahkan trafik iklan mahal Anda ke beranda (homepage) yang membingungkan. Kami merancang landing page persuasi tinggi dengan teknik copywriting teruji, desain memukau, dan form pendaftaran instan yang mengubah klik iklan menjadi uang.',
    coreMetrics: [
      { label: 'Conversion Rate', value: '12% - 25%', desc: 'Rata-rata konversi prospek iklan' },
      { label: 'ROAS Boost', value: '3.5x+', desc: 'Return on Ad Spend meningkat tajam' },
      { label: 'Load Time', value: '< 0.4s', desc: 'Iklan langsung terbuka tanpa loading' },
      { label: 'Mobile Optimized', value: '100%', desc: 'Sempurna di semua layar smartphone' }
    ],
    problemStatement: {
      title: 'Penyebab Iklan Anda Boncos:',
      points: [
        'Pengunjung bingung harus klik apa begitu membuka website Anda.',
        'Waktu loading halaman terlalu lama sehingga iklan keburu ditutup.',
        'Tidak ada penawaran (offer) yang kuat dan mendesak (urgency).',
        'Formulir pendaftaran ribet dan banyak isian yang tidak perlu.'
      ]
    },
    solutionOverview: {
      title: 'Formula Landing Page Persuasif ChestaAzka',
      description: 'Setiap piksel dan kalimat dirancang secara ilmiah untuk memandu psikologi pengunjung dari rasa ingin tahu hingga akhirnya melakukan transaksi atau mengisi data.',
      benefits: [
        'Copywriting berstandar direct-response marketing yang menghipnotis pembaca.',
        'Desain visual ultra-modern dengan animasi smooth yang elegan.',
        'Kecepatan muat kilat (Load time < 0.4 detik).',
        'Tombol CTA (Call to Action) mengambang yang mudah dijangkau di mobile.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Angle & Offer Research', desc: 'Menemukan sudut pandang unik dan penawaran tak tertolak untuk produk Anda.' },
      { step: '02', title: 'Persuasive Copywriting', desc: 'Menyusun naskah penjualan terstruktur dari Headline hingga Guarantee.' },
      { step: '03', title: 'Speed & Mobile Optimization', desc: 'Coding presisi tinggi yang 100% ramah pengguna smartphone.' },
      { step: '04', title: 'A/B Testing Ready & Launch', desc: 'Siap langsung dipakai untuk beriklan di Meta Ads, TikTok Ads, atau Google Ads.' }
    ],
    guarantee: 'Garansi struktur halaman sesuai standar best-practice digital marketing internasional dan loading secepat kilat.',
    investment: {
      price: 'Mulai dari Rp 3.500.000',
      duration: 'Pengerjaan 4 - 7 Hari Kerja',
      features: [
        'Struktur Copywriting Persuasif Berbasis Konversi',
        'Desain Eksklusif Sesuai Identitas Brand',
        'Integrasi Pixel (Meta, TikTok, Google Analytics)',
        'Formulir Leads Langsung ke WhatsApp / Email',
        'Pengerjaan Super Cepat (Express Delivery)'
      ]
    },
    faqs: [
      {
        q: 'Apakah cocok untuk produk fizikal maupun jasa?',
        a: 'Sangat cocok! Baik Anda menjual produk skincare, fashion, jasa konsultasi, properti, maupun seminar/course online.'
      },
      {
        q: 'Apakah bisa dihubungkan langsung ke Meta Ads Pixel?',
        a: 'Ya, kami memasang seluruh tracking pixel dan event tracking secara akurat untuk kebutuhan optimasi iklan Anda.'
      }
    ]
  }
};
