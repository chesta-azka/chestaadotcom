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
    title: 'Jasa Pembuatan Website BSD & Solusi IT Cisauk',
    subtitle: 'Dominasi Pasar Lokal Tangerang dengan SEO & High-Performance Web',
    category: 'Local SEO & Web Development',
    badge: 'Spesialis BSD & Cisauk',
    heroHeadline: 'Jadilah Nomor Satu di BSD City dan Cisauk. Tinggalkan Kompetitor Anda di Belakang.',
    heroDescription: 'Mencari Jasa Pembuatan Website BSD City atau Solusi IT Cisauk yang benar-benar memberikan hasil? Kami membangun website berkecepatan tinggi dengan integrasi SEO Lokal (Geo-Targeting) mutakhir. Website Anda tidak hanya tampil memukau, tapi mendominasi hasil pencarian Google di radius Tangerang dan sekitarnya.',
    coreMetrics: [
      { label: 'Local SEO Ranking', value: 'Top #3', desc: 'Dominasi pencarian lokal di area BSD & Cisauk' },
      { label: 'Loading Speed', value: '< 0.8s', desc: 'Akses instan memaksimalkan retensi pengunjung' },
      { label: 'Lead Generation', value: '+45%', desc: 'Lonjakan interaksi WhatsApp & Form masuk' },
      { label: 'Geo-Targeting', value: 'Akurat', desc: 'Sistem skema lokasi terstruktur standar Google' }
    ],
    problemStatement: {
      title: 'Tantangan Bisnis Lokal di Era Digital',
      points: [
        'Bisnis fisik Anda di BSD City atau Cisauk sepi karena sulit ditemukan di Google Maps dan Penelusuran.',
        'Website Anda lambat, menggunakan template usang, dan tidak responsif saat dibuka di smartphone.',
        'Kompetitor lokal dengan layanan lebih buruk justru mendapatkan semua pelanggan dari internet.',
        'Sudah menghabiskan banyak biaya iklan (Ads) namun hasil penjualan tidak sebanding (ROI rendah).'
      ]
    },
    solutionOverview: {
      title: 'Strategi Agresif CHESTAADOTCOM: SEO Lokal & Arsitektur Elite',
      description: 'Sebagai Elite Software House dan pakar Solusi IT Cisauk, kami menggabungkan web development super cepat (Next.js) dengan optimasi SEO On-Page dan Local Business Schema. Kami memastikan setiap calon pelanggan di radius Tangerang yang mencari layanan Anda akan berujung di website bisnis Anda.',
      benefits: [
        'Injeksi Meta Schema "LocalBusiness" spesifik untuk target pasar Tangerang, BSD, dan Cisauk.',
        'Desain profesional tingkat korporat yang meyakinkan klien B2B maupun konsumen akhir (B2C).',
        'Struktur URL dan konten yang secara agresif menargetkan kata kunci komersial tinggi (High-Intent).',
        'Arsitektur cloud yang menjamin performa website tidak tumbang walau dilanda lonjakan trafik.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Riset Kata Kunci Lokal', desc: 'Menganalisis volume pencarian spesifik area BSD, Cisauk, Gading Serpong, dan sekitarnya.' },
      { step: '02', title: 'Pembuatan Web & Copywriting', desc: 'Mengembangkan website custom dengan konten berbasis SEO yang menjual (Conversion Copywriting).' },
      { step: '03', title: 'Injeksi Teknis SEO & Geo-Tags', desc: 'Menerapkan markup Schema.org, sitemap dinamis, dan optimasi Core Web Vitals tingkat ekstrim.' },
      { step: '04', title: 'Monitoring & Scaling', desc: 'Pelacakan ranking berkala, integrasi Google Analytics 4, dan penyempurnaan conversion rate.' }
    ],
    guarantee: 'Kami memberikan jaminan optimasi skor Google PageSpeed di atas 90+ dan indeksasi Google yang sempurna dalam waktu kurang dari 7 hari setelah website tayang.',
    investment: {
      price: 'Mulai dari Rp 4.500.000',
      duration: 'Pengerjaan 7 - 14 Hari Kerja',
      features: [
        'Desain Website Khusus Bisnis Lokal (Tangerang Raya)',
        'Full Optimasi Local SEO (Geo-Targeting)',
        'Gratis Instalasi Google Search Console & Analytics',
        'Formulir Leads Langsung ke WhatsApp',
        'Infrastruktur Next.js + Tailwind CSS Anti Lemot'
      ]
    },
    faqs: [
      {
        q: 'Mengapa bisnis di BSD City dan Cisauk sangat membutuhkan Local SEO & Geo-Targeting?',
        a: 'BSD City dan Cisauk berkembang pesat sebagai tech dan business hub di Tangerang Selatan. Dengan Local SEO terstruktur (skema LocalBusiness JSON-LD, koordinat GPS terverifikasi, dan konten berbasis geografi), bisnis Anda akan menduduki peringkat teratas Google Search dan Google Maps saat prospek mencari layanan spesifik seperti "Jasa Pembuatan Website BSD" atau "Solusi IT Cisauk", mendatangkan lead berkualitas tinggi tanpa bergantung pada biaya iklan terus-menerus.'
      },
      {
        q: 'Apakah solusi IT Cisauk dari CHESTAADOTCOM hanya melayani pembuatan website?',
        a: 'Tidak. CHESTAADOTCOM adalah boutique IT consultancy dan software house komprehensif. Selain website performa tinggi, kami menyediakan audit arsitektur cloud, integrasi sistem kasir/POS, web app bisnis kustom (CRM/ERP), otomatisasi alur kerja AI Agent otonom, dan dukungan pemeliharaan SLA 24/7.'
      },
      {
        q: 'Berapa lama waktu yang dibutuhkan hingga website terindeks dan mendominasi kata kunci lokal?',
        a: 'Struktur kode Next.js 15 dan Schema.org kami memungkinkan bot Google mengindeks halaman dalam waktu 24 hingga 72 jam. Untuk kata kunci lokal spesifik di Tangerang Selatan, peningkatan peringkat organik rata-rata tercapai dalam 2 hingga 4 minggu berkat optimasi Core Web Vitals (< 0.8s) dan relevansi hyper-local.'
      },
      {
        q: 'Apakah CHESTAADOTCOM melayani konsultasi langsung tatap muka (in-person) di BSD City dan Cisauk?',
        a: 'Ya, tim teknis kami berdomisili dan beroperasi aktif di koridor BSD Green Office Park dan Cisauk. Kami siap mengadakan pertemuan konsultasi langsung (on-site) di kantor Anda untuk kawasan BSD City, Cisauk, Gading Serpong, Karawaci, dan Alam Sutera, maupun via Google Meet untuk fleksibilitas.'
      }
    ]
  },

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
        q: 'Mengapa Next.js 15 lebih unggul dibanding WordPress untuk website bisnis dan SEO?',
        a: 'Next.js 15 menggunakan arsitektur modern Server-Side Rendering (SSR) dan Edge Caching yang menghasilkan waktu muat sub-detik (< 0.8s) dengan skor Google Lighthouse 99+. Berbeda dengan WordPress yang sering melambat akibat plugin menumpuk dan rentan malware, Next.js dibangun dengan kode bersih, keamanan tingkat enterprise, dan otomatis diprioritaskan Google Core Web Vitals.'
      },
      {
        q: 'Berapa lama estimasi waktu pengerjaan website sampai siap live?',
        a: 'Untuk landing page konversi cepat dan website company profile esensial, pengerjaan memakan waktu 3 hingga 7 hari kerja. Untuk platform web custom dengan integrasi API, database, atau e-commerce, waktu pengerjaan rata-rata antara 7 hingga 14 hari kerja.'
      },
      {
        q: 'Apakah website sudah otomatis dilengkapi optimasi SEO On-Page dan Schema LocalBusiness?',
        a: 'Ya, 100%. Setiap website otomatis kami bekali dengan metadata SEO lengkap, OpenGraph, sitemap XML, dan markup Schema.org (LocalBusiness, Service, FAQPage, BreadcrumbList) yang ditargetkan untuk wilayah BSD City, Cisauk, Tangerang, dan Jabodetabek agar cepat tampil di Google Knowledge Graph dan Google Maps.'
      },
      {
        q: 'Apakah saya dan tim bisa mengupdate konten teks atau produk sendiri secara mandiri?',
        a: 'Tentu saja. Kami menyediakan panel admin atau CMS headless modern yang sangat mudah digunakan tanpa perlu keahlian teknis atau coding. Kami juga menyertakan sesi training singkat dan video panduan eksklusif.'
      },
      {
        q: 'Berapa biaya pembuatan website di CHESTAADOTCOM dan apa saja fasilitas yang didapat?',
        a: 'Paket investasi kami sangat transparan: mulai dari Starter (Rp 540.000) untuk landing page konversi, Essential (Rp 1.150.000) untuk 3 halaman brand authority, Growth (Rp 2.250.000) hingga 7 halaman dengan formulir API otomatis, dan Enterprise (Rp 5.500.000) untuk database kustom dan payment gateway.'
      },
      {
        q: 'Apakah seluruh source code dan aset website menjadi milik saya 100%?',
        a: 'Ya, mutlak. Seluruh hak cipta source code, repositori Git, domain, dan konfigurasi hosting diserahkan penuh kepada Anda tanpa adanya ikatan vendor lock-in maupun biaya lisensi tersembunyi.'
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
        q: 'Apakah AI Agent bisa salah menjawab (halusinasi)?',
        a: 'Tidak, kami menggunakan teknik Enterprise Guardrails yang ketat dikombinasikan dengan arsitektur RAG (Retrieval-Augmented Generation). AI hanya diperbolehkan menjawab berdasarkan dokumen SOP, database inventaris, dan basis data resmi perusahaan Anda tanpa membuat asumsi fiktif.'
      },
      {
        q: 'Bagaimana integrasi AI Agent dengan WhatsApp Business dan CRM bisnis?',
        a: 'Kami mengintegrasikan model Google Gemini dan LLM enterprise melalui WhatsApp Business Cloud API resmi atau webhook CRM internal. Sistem mampu melayani percakapan pelanggan 24/7, melakukan kualifikasi prospek otomatis, dan mencatat data tiket langsung ke dashboard bisnis Anda.'
      },
      {
        q: 'Berapa biaya operasional pemakaian API Google Gemini?',
        a: 'Biaya API Google Gemini (Flash series) sangat terjangkau, rata-rata kurang dari $5 - $20 USD per bulan untuk puluhan ribu percakapan. CHESTAADOTCOM melakukan caching token pintar untuk meminimalkan pengeluaran API hingga 60%.'
      },
      {
        q: 'Apakah data rahasia perusahaan aman saat menggunakan AI?',
        a: 'Ya, 100% aman. Data bisnis Anda tidak pernah digunakan untuk melatih model publik. Kami menerapkan enkripsi end-to-end (AES-256) serta isolasi environment data sesuai standar privasi GDPR dan regulasi perlindungan data pribadi (UU PDP).'
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
        q: 'Apakah ada potongan komisi platform per transaksi di website toko online ini?',
        a: 'Sama sekali tidak ada potongan komisi dari CHESTAADOTCOM (0% Platform Fee). Seluruh hasil penjualan 100% masuk langsung ke rekening bank Anda, hanya dikenakan biaya gateway standar resmi (seperti QRIS ~0.7% oleh Bank Indonesia/Midtrans).'
      },
      {
        q: 'Berapa banyak produk yang dapat ditampung di sistem e-commerce ini?',
        a: 'Sistem arsitektur database modern yang kami bangun sanggup menampung puluhan ribu SKU produk dengan performa pencarian instan (< 100ms) menggunakan teknologi indexing teroptimasi.'
      },
      {
        q: 'Apakah toko online ini terhubung dengan sistem notifikasi WhatsApp otomatis?',
        a: 'Ya, begitu pembeli menyelesaikan pembayaran, invoice dan detail pesanan otomatis terkirim ke nomor WhatsApp pelanggan serta alert notifikasi ke tim gudang Anda untuk segera diproses.'
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
        q: 'Apakah landing page ini cocok untuk iklan produk fisik maupun jasa B2B?',
        a: 'Sangat cocok. Format landing page disesuaikan secara spesifik: checkout cepat (1-click direct purchase) untuk produk fisik/retail dan formulir kualifikasi leads interaktif terhubung langsung ke WhatsApp untuk penawaran jasa korporat B2B.'
      },
      {
        q: 'Bagaimana integrasi tracking iklan (Meta Pixel, Google Tag, TikTok Pixel)?',
        a: 'Kami mengintegrasikan seluruh conversion pixel dan Conversions API (CAPI) di tingkat server-side untuk memastikan pelacakan data konversi 100% akurat meskipun pengguna mengaktifkan fitur iOS ATT AdBlock.'
      },
      {
        q: 'Mengapa kecepatan loading di bawah 0.4 detik sangat menentukan keberhasilan iklan?',
        a: 'Data industri membuktikan 53% calon pelanggan meninggalkan halaman jika loading lebih dari 3 detik. Dengan kecepatan di bawah 0.4 detik pada Next.js, Quality Score Google Ads dan relevansi Meta Ads meningkat, memangkas biaya per klik (CPC) dan melipatgandakan Return on Ad Spend (ROAS).'
      }
    ]
  },

  'jasa-it': {
    slug: 'jasa-it',
    title: 'Jasa IT & Solusi Infrastruktur Enterprise',
    subtitle: 'Audit Arsitektur Cloud, Automasi AI & IT Consulting di BSD City',
    category: 'IT Infrastructure & Consulting',
    badge: 'Enterprise SLA 99.98%',
    heroHeadline: 'Infrastruktur IT Tangguh, Aman, dan Siap Berskala Eksponensial.',
    heroDescription: 'Mengelola sistem IT bisnis modern tidak boleh mengandalkan coba-coba. CHESTAADOTCOM menyediakan Jasa IT profesional, konsultasi cloud DevOps (AWS/GCP/Cloudflare), audit keamanan zero-trust, serta otomasi alur kerja AI untuk perusahaan dan startup di BSD City, Cisauk, dan Jabodetabek.',
    coreMetrics: [
      { label: 'Uptime SLA', value: '99.98%', desc: 'Keandalan infrastruktur cloud tingkat enterprise' },
      { label: 'Response Time', value: '< 15 Mins', desc: 'Tanggap darurat teknis prioritas VIP' },
      { label: 'Cost Optimization', value: '-40%', desc: 'Pemangkasan biaya cloud yang tidak efisien' },
      { label: 'Service Coverage', value: 'BSD & Global', desc: 'On-site di BSD City/Cisauk & remote worldwide' }
    ],
    problemStatement: {
      title: 'Tantangan Infrastruktur IT Bisnis Modern',
      points: [
        'Downtime server dan aplikasi sering terjadi tanpa peringatan dini, menghentikan transaksi operasional bisnis.',
        'Tagihan cloud membengkak drastis akibat arsitektur sistem yang tidak teroptimasi dengan efisien.',
        'Sistem digital rentan terhadap ancaman ransomware, kebocoran data klien, dan serangan siber DDoS.',
        'Ketergantungan pada tim internal yang kewalahan mengadopsi teknologi modern seperti CI/CD dan AI Agent.'
      ]
    },
    solutionOverview: {
      title: 'Pendekatan Komprehensif Jasa IT CHESTAADOTCOM',
      description: 'Kami bertindak sebagai mitra teknologi strategis jangka panjang Anda. Kami merancang, mengamankan, dan mengotomatiskan seluruh ekosistem komputasi bisnis Anda dengan standar industri internasional.',
      benefits: [
        'Audit mendalam arsitektur cloud untuk memangkas pemborosan resource hingga 40%.',
        'Implementasi keamanan siber Zero-Trust dan enkripsi data end-to-end berstandar global.',
        'Automasi alur kerja operasional menggunakan integrasi API & AI Agent otonom 24/7.',
        'Monitoring proaktif dengan jaminan Service Level Agreement (SLA) uptime 99.98%.'
      ]
    },
    processSteps: [
      { step: '01', title: 'Audit Komprehensif & Diagnosis', desc: 'Pemetaan mendalam terhadap arsitektur jaringan, cloud server, dan risiko keamanan sistem Anda.' },
      { step: '02', title: 'Perancangan Blueprint & Arsitektur', desc: 'Penyusunan peta jalan perbaikan teknis, efisiensi biaya infrastruktur, dan mitigasi downtime.' },
      { step: '03', title: 'Migrasi & Implementasi Zero-Downtime', desc: 'Eksekusi deployment dan konfigurasi server di environment terisolasi tanpa mengganggu operasional harian.' },
      { step: '04', title: 'Monitoring Proaktif & SLA 24/7', desc: 'Dukungan teknis berkelanjutan, backup berkala, dan respon cepat tanggap darurat teknis.' }
    ],
    guarantee: 'Jaminan Uptime 99.98% dan respon darurat teknis di bawah 15 menit dengan kontrak SLA resmi.',
    investment: {
      price: 'Mulai dari Rp 5.500.000',
      duration: 'Audit & Implementasi 7 - 21 Hari Kerja',
      features: [
        'Cloud Infrastructure Design (AWS, GCP, Cloudflare)',
        'Zero-Trust Security Audit & Vulnerability Assessment',
        'Automated CI/CD Deployment Pipeline Setup',
        'Real-time Uptime Monitoring & Alerting 24/7',
        '100% Hak Milik Repositori & Dokumentasi Arsitektur'
      ]
    },
    faqs: [
      {
        q: 'Apa saja cakupan Jasa IT & Solusi Enterprise yang disediakan CHESTAADOTCOM di area BSD City dan Tangerang?',
        a: 'Layanan Jasa IT kami mencakup konsultasi arsitektur cloud (AWS, GCP, Cloudflare), audit keamanan siber zero-trust, otomatisasi alur kerja AI Agent, continuous integration & deployment (CI/CD), setup server performa tinggi, hingga monitoring dan pemeliharaan teknis sistem 24/7 dengan Service Level Agreement (SLA) terjamin untuk korporasi dan startup di BSD City, Cisauk, dan Jabodetabek.'
      },
      {
        q: 'Bagaimana metode integrasi dan implementasi IT untuk sistem bisnis yang sudah berjalan?',
        a: 'Kami menerapkan metodologi non-disruptive migration. Tahap awal dimulai dengan audit komprehensif arsitektur eksisting, dilanjutkan dengan pembuatan staging environment, rekayasa API middleware untuk sinkronisasi data real-time, dan migrasi bertahap tanpa downtime operasional bisnis Anda.'
      },
      {
        q: 'Berapa estimasi biaya dan durasi pengerjaan solusi IT enterprise?',
        a: 'Biaya investasi disesuaikan dengan skala kompleksitas sistem, mulai dari paket Starter Rp 540.000 untuk integrasi otomatisasi esensial, hingga level Enterprise kustom (Rp 5.500.000+) untuk infrastruktur berskala besar. Durasi implementasi berkisar antara 7 hingga 21 hari kerja dengan roadmap timeline yang transparan.'
      },
      {
        q: 'Apakah tersedia garansi pemeliharaan (maintenance SLA) dan respons cepat?',
        a: 'Ya, seluruh kontrak Jasa IT dilengkapi dengan garansi pemeliharaan 30 hari pasca-peluncuran, pemantauan uptime 99.98%, serta opsi SLA prioritas VIP dengan waktu respons teknis darurat di bawah 15 menit.'
      },
      {
        q: 'Apakah hak cipta dan source code sistem diserahkan 100% kepada klien?',
        a: 'Ya, 100% kepemilikan source code, konfigurasi cloud, repositori Git, dan dokumentasi arsitektur diserahkan seutuhnya kepada klien tanpa adanya sistem vendor lock-in maupun royalti tersembunyi.'
      },
      {
        q: 'Apakah CHESTAADOTCOM melayani konsultasi tatap muka (on-site) di BSD City dan Cisauk?',
        a: 'Ya, tim teknis senior kami berbasis langsung di koridor BSD Green Office Park dan Cisauk. Kami siap mengadakan sesi audit dan konsultasi langsung (on-site) di kantor Anda untuk area Tangerang Selatan, Tangerang Kota, dan Jakarta Selatan.'
      }
    ]
  }
};

// Aliases for SEO-friendly and localized URLs
SERVICES_DATA['it-solutions'] = SERVICES_DATA['jasa-it'];
SERVICES_DATA['it-consulting'] = SERVICES_DATA['jasa-it'];
SERVICES_DATA['maintenance'] = SERVICES_DATA['jasa-it'];
SERVICES_DATA['web-development'] = SERVICES_DATA['web-development-nextjs'];
SERVICES_DATA['pembuatan-website'] = SERVICES_DATA['web-development-nextjs'];
SERVICES_DATA['website-company-profile'] = SERVICES_DATA['web-development-nextjs'];
SERVICES_DATA['website-toko-online'] = SERVICES_DATA['ecommerce-automation'];
SERVICES_DATA['jasa-seo'] = SERVICES_DATA['jasa-pembuatan-website-bsd-cisauk'];
SERVICES_DATA['agentic-ai-automation'] = SERVICES_DATA['ai-integration'];
SERVICES_DATA['digital-marketing'] = SERVICES_DATA['landing-page'];

