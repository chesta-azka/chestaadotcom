export interface B2BServiceContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  commercialKeywords: string;
  tagline: string;
  h1: string;
  subText: string;
  miniFeatures: { num: string; title: string; subtitle: string }[];
  problemHeading: string;
  problemSubText: string;
  problemPoints: { num: string; text: string }[];
  resultStatement: string;
  componentsHeading: string;
  components: { num: string; title: string; desc: string }[];
  processHeading: string;
  processSubText: string;
  processSteps: { num: string; title: string; desc: string }[];
  workProofHeading: string;
  workProofProject: string;
  workProofDesc: string;
  workProofTags: string[];
  partnerValuesHeading: string;
  partnerValues: { num: string; title: string; desc: string }[];
  aiMethodologyHeading: string;
  aiMethodologySubText: string;
  aiMethodologySteps: { num: string; title: string; desc: string }[];
  techStackHeading: string;
  techStack: { name: string; role: string }[];
  faqHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubText: string;
}

export const DEFAULT_AI_SERVICE: B2BServiceContent = {
  slug: 'ai-integration',
  metaTitle: 'Jasa Integrasi AI & Otomasi Alur Kerja Bisnis B2B Enterprise & UMKM | CHESTAADOTCOM',
  metaDescription: 'Jasa integrasi AI praktis untuk B2B Enterprise dan UMKM komersial. Otomasi alur kerja, chatbot WhatsApp 24/7, knowledge base internal, dan rekomendasi hemat ratusan jam kerja tanpa vendor lock-in.',
  commercialKeywords: 'jasa integrasi AI, chatbot customer service B2B, automasi workflow UMKM, AI korporasi, konsultan AI enterprise, efisiensi operasional AI',
  tagline: 'Konsultasi Gratis',
  h1: 'Jasa Integrasi AI & Otomasi Alur Kerja Perusahaan (B2B Enterprise & UMKM Komersial)',
  subText: 'Kami mengintegrasikan AI praktis untuk chatbot, automasi alur kerja, knowledge base, dan rekomendasi bagi korporasi enterprise dan UMKM komersial.',
  miniFeatures: [
    { num: '01', title: 'Tujuan bisnis', subtitle: 'Business Goal' },
    { num: '02', title: 'Pengalaman pengguna', subtitle: 'User Experience' },
    { num: '03', title: 'Fondasi teknis', subtitle: 'Technical Foundation' },
  ],
  problemHeading: 'Kedengarannya familiar?',
  problemSubText: 'Kami memulai dari hambatan operasional yang dirasakan bisnis—bukan dari daftar teknologi.',
  problemPoints: [
    { num: '01', text: 'Tim layanan pelanggan menghabiskan waktu menjawab pertanyaan berulang yang seharusnya dijawab otomatis oleh AI.' },
    { num: '02', text: 'Banyak proses administratif manual yang sebenarnya dapat berjalan otomatis 24 jam nonstop.' },
    { num: '03', text: 'Bisnis ingin mengadopsi AI, tetapi belum menemukan titik mulai yang aman, terukur, dan bernilai ROI nyata.' },
  ],
  resultStatement: 'Tim Anda menghemat ratusan jam pada pekerjaan berulang tanpa kehilangan kontrol absolut atas kualitas dan kepuasan pelanggan.',
  componentsHeading: 'Komponen yang Dihadirkan',
  components: [
    { num: '01', title: 'Chatbot Customer Service', desc: 'Menjawab pertanyaan umum dengan konteks, batasan, dan jalur eskalasi manusia yang jelas.' },
    { num: '02', title: 'Automasi Workflow', desc: 'Menghubungkan berbagai perangkat lunak agar tugas administratif berjalan otomatis (Zero-Touch).' },
    { num: '03', title: 'Sistem Rekomendasi', desc: 'Menyajikan produk atau konten hiper-relevan berdasarkan konteks pengguna.' },
    { num: '04', title: 'Ringkasan Otomatis', desc: 'Mengubah dokumen atau percakapan panjang menjadi data yang dapat ditindaklanjuti.' },
    { num: '05', title: 'Knowledge Base', desc: 'Karyawan AI yang menjawab murni berdasarkan dokumen dan sumber data perusahaan yang telah disetujui.' },
    { num: '06', title: 'Proof of Concept', desc: 'Menguji nilai, risiko, dan ROI sebelum integrasi diperluas ke seluruh perusahaan.' },
  ],
  processHeading: 'Proses transparan dari inisiasi hingga rilis.',
  processSubText: 'Setiap tahap memiliki keluaran pasti, momen peninjauan, dan keputusan yang disepakati bersama.',
  processSteps: [
    { num: '01', title: 'Identifikasi', desc: 'Mencari proses repetitif bernilai tinggi untuk diotomatisasi.' },
    { num: '02', title: 'Proof of Concept', desc: 'Membangun versi terbatas untuk menguji akurasi dan kelayakan.' },
    { num: '03', title: 'Integrasi', desc: 'Menghubungkan model AI dengan sistem, database, dan workflow perusahaan Anda.' },
    { num: '04', title: 'Ukur & Skala', desc: 'Memantau kualitas, biaya server, dan dampak operasional sebelum memperluas skala.' },
  ],
  workProofHeading: 'Integrasi AI · Selected Work',
  workProofProject: 'Enterprise Knowledge Assistant & Smart Sales Agent',
  workProofDesc: 'Implementasi AI terkontrol yang mencari jawaban eksklusif dari dokumen internal, menampilkan rujukan sumber, dan secara cerdas meneruskan kasus sensitif kepada agen manusia.',
  workProofTags: ['OpenAI', 'Vector Database', 'Node.js', 'n8n'],
  partnerValuesHeading: 'Bukan sekadar selesai. Dibangun agar berhasil.',
  partnerValues: [
    { num: '01', title: 'Proses transparan', desc: 'Progres dan arsitektur terlihat di setiap tahap.' },
    { num: '02', title: 'Timeline jelas', desc: 'Fase, keluaran, dan checkpoint disepakati sejak hari pertama.' },
    { num: '03', title: 'Hasil terukur', desc: 'Metrik kesuksesan ditentukan berdasarkan efisiensi uang dan waktu.' },
    { num: '04', title: 'Milik Anda', desc: 'Kode sumber dan aset final diserahkan sepenuhnya. Tidak ada vendor lock-in.' },
  ],
  aiMethodologyHeading: 'Dipercepat oleh AI. Disempurnakan oleh Pakar Manusia.',
  aiMethodologySubText: 'AI mengotomatisasi proses repetitif, sementara keputusan strategis, keamanan, dan kesesuaian bisnis dieksekusi langsung oleh arsitek kami.',
  aiMethodologySteps: [
    { num: '01', title: 'Draf awal', desc: 'Mempercepat eksplorasi arsitektur.' },
    { num: '02', title: 'Kurasi', desc: 'Menyaring logika dan hasil yang paling efisien.' },
    { num: '03', title: 'Penyempurnaan', desc: 'Memastikan standar keamanan, reliabilitas kode, dan integrasi enterprise.' },
  ],
  techStackHeading: 'Fondasi teknis yang teruji.',
  techStack: [
    { name: 'OpenAI API', role: 'LLM Engine' },
    { name: 'Vector DB', role: 'Knowledge Store' },
    { name: 'LangChain', role: 'Orchestration' },
    { name: 'Node.js', role: 'Backend API' },
    { name: 'Next.js', role: 'Front-end' },
  ],
  faqHeading: 'Pertanyaan yang sering diajukan mengenai integrasi AI.',
  faqs: [
    {
      q: 'Bagaimana keamanan data sensitif perusahaan saat menggunakan AI?',
      a: 'Kami menjamin kerahasiaan penuh. Model AI dijalankan dengan arsitektur private enterprise atau isolasi VPC. Data internal Anda tidak pernah digunakan untuk melatih model publik.',
    },
    {
      q: 'Berapa lama fase Proof of Concept (PoC) untuk mengukur kelayakan ROI?',
      a: 'Fase PoC berjalan selama 7 hingga 14 hari kerja untuk menguji akurasi, waktu respon, dan kepuasan tim sebelum investasi skala penuh diperluas ke seluruh perusahaan.',
    },
    {
      q: 'Bisakah sistem AI dihubungkan ke database dan aplikasi yang sudah kami gunakan?',
      a: 'Bisa. Kami membangun konektor REST API, webhook aman, dan integrasi langsung ke PostgreSQL, MySQL, SAP, ERP, Odoo, WhatsApp Business API, CRM, hingga spreadsheet internal.',
    },
    {
      q: 'Bagaimana cara menghitung ROI konkret dari integrasi AI bagi B2B Enterprise dan UMKM?',
      a: 'ROI dihitung secara transparan dari penghematan ratusan jam kerja manual admin per bulan, penurunan biaya penanganan tiket komplain hingga 65%, serta percepatan siklus closing prospek 24 jam nonstop.',
    },
  ],
  ctaHeading: 'Apa hambatan operasional yang ingin Anda hancurkan?',
  ctaSubText: 'Ceritakan tantangan yang perusahaan Anda hadapi. Kami bantu memetakan arsitektur dan menentukan langkah digitalisasi yang tepat.',
};

export const B2B_SERVICES_MAP: Record<string, B2BServiceContent> = {
  'ai-integration': DEFAULT_AI_SERVICE,

  'web-development-nextjs': {
    ...DEFAULT_AI_SERVICE,
    slug: 'web-development-nextjs',
    metaTitle: 'Jasa Pembuatan Website Next.js 15 Enterprise & UMKM Komersial | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website modern berbasis Next.js 15 App Router & Edge Caching untuk korporasi B2B Enterprise dan UMKM komersial. Loading sub-detik, Core Web Vitals 100, dan dominasi SEO Google.',
    commercialKeywords: 'jasa pembuatan website nextjs, web development enterprise b2b, website umkm cepat, developer react nextjs tangerang bsd, bikin website profesional',
    h1: 'Jasa Pembuatan Website Next.js 15 Enterprise & UMKM Komersial',
    subText: 'Arsitektur website super cepat dengan Next.js 15 App Router, Edge Caching global, dan integrasi API skala enterprise untuk melipatgandakan konversi penjualan.',
    workProofProject: 'Enterprise Corporate Portal & Sales Hub Next.js 15',
    workProofTags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Edge SSR'],
    techStack: [
      { name: 'Next.js 15', role: 'App Router & SSR' },
      { name: 'React 19', role: 'Client UI Runtime' },
      { name: 'TypeScript', role: 'Type-Safe Logic' },
      { name: 'Tailwind CSS', role: 'Design System' },
      { name: 'PostgreSQL', role: 'Core Database' },
    ],
    faqHeading: 'Pertanyaan seputar Jasa Web Development Next.js 15.',
    faqs: [
      {
        q: 'Mengapa memilih Next.js 15 dibanding platform website konvensional?',
        a: 'Next.js 15 menghadirkan rendering sub-detik melalui Server Components, Edge Caching global, dan skor Core Web Vitals 100 tanpa ketergantungan plugin pihak ketiga yang rentan lambat atau diretas.',
      },
      {
        q: 'Apakah website cocok untuk skala UMKM komersial maupun korporat besar?',
        a: 'Sangat cocok. Arsitektur modular kami dirancang fleksibel dari landing page UMKM berkonversi tinggi hingga portal korporat enterprise dengan ribuan halaman dinamis.',
      },
      {
        q: 'Apakah kami mendapatkan akses penuh ke source code website?',
        a: 'Ya. 100% kepemilikan source code diserahkan ke tim Anda tanpa biaya sewa platform bulanan tersembunyi (zero vendor lock-in).',
      },
      {
        q: 'Berapa lama waktu pengerjaan pembuatan website Next.js 15?',
        a: 'Pengerjaan landing page siap rilis dalam 7-14 hari kerja, sedangkan portal enterprise skala besar berkisar 3-6 minggu dengan milestone transparan.',
      },
      {
        q: 'Apakah website sudah dioptimasi untuk SEO Google dan mobile?',
        a: 'Sudah terintegrasi penuh dengan Schema.org JSON-LD, semantic HTML5, sitemap otomatis, dan responsive design mobile-first yang disukai algoritma Google.',
      },
    ],
  },

  'website-mesin-konversi': {
    ...DEFAULT_AI_SERVICE,
    slug: 'website-mesin-konversi',
    metaTitle: 'Jasa Pembuatan Website Mesin Konversi B2B Enterprise & UMKM | CHESTAADOTCOM',
    metaDescription: 'Ubah pengunjung menjadi klien loyal dengan website mesin konversi B2B Enterprise dan UMKM komersial. Dioptimalkan dengan psikologi penawaran, kecepatan sub-detik, dan pelacakan funnel presisi.',
    commercialKeywords: 'website mesin konversi, jasa bikin website sales b2b, funnel landing page umkm, optimasi conversion rate website, arsitektur penjualan digital',
    h1: 'Jasa Pembuatan Website Mesin Penjualan & Konversi (B2B Enterprise & UMKM)',
    subText: 'Platform web berorientasi ROI yang dirancang khusus untuk mengubah lalu lintas pengunjung menjadi peluang bisnis bernilai tinggi dengan kecepatan rendering instan.',
    workProofProject: 'B2B Lead Acquisition Machine & Conversion Funnel',
    workProofTags: ['Next.js 15', 'Funnel Analytics', 'Conversion Rate Optimization', 'Speed 100'],
    faqHeading: 'Pertanyaan seputar Website Mesin Konversi B2B & UMKM.',
    faqs: [
      {
        q: 'Apa perbedaan website mesin konversi dengan website profil perusahaan biasa?',
        a: 'Website mesin konversi dirancang menggunakan psikologi penawaran berorientasi closing, navigasi terarah tanpa distraksi, serta copy persuasif yang mendorong pengunjung langsung menghubungi tim sales Anda.',
      },
      {
        q: 'Bagaimana cara mengukur peningkatan konversi penjualan?',
        a: 'Kami memasang sistem event tracking presisi (Google Tag Manager, Meta Pixel, heatmap) untuk memantau rasio klik WhatsApp, formulir prospek, dan nilai transaksi secara real-time.',
      },
      {
        q: 'Apakah cocok untuk bisnis jasa, B2B, dan UMKM produk komersial?',
        a: 'Ya. Kami telah mengimplementasikannya untuk kontraktor, klinik kesehatan, rental mobil, konsultan, hingga distributor produk komersial dengan peningkatan leads rata-rata di atas 180%.',
      },
      {
        q: 'Apakah website mesin konversi terhubung langsung ke WhatsApp tim sales?',
        a: 'Ya, terhubung langsung dengan pesan prefilled cerdas yang mencatat sumber kampanye iklan dan halaman asal prospek.',
      },
      {
        q: 'Bagaimana garansi performa kecepatan aksesnya?',
        a: 'Kami menggaransi skor performa Core Web Vitals hijau (>90) untuk memastikan pengunjung tidak kabur akibat loading lambat.',
      },
    ],
  },

  'karyawan-digital-ai': {
    ...DEFAULT_AI_SERVICE,
    slug: 'karyawan-digital-ai',
    metaTitle: 'Vendor Karyawan Digital AI Otonom 24/7 B2B Enterprise & UMKM | CHESTAADOTCOM',
    metaDescription: 'Solusi karyawan digital AI cerdas yang bekerja 24 jam nonstop menjawab pelanggan, memproses pesanan, dan menyinkronkan data internal tanpa risiko human error untuk B2B Enterprise dan UMKM.',
    commercialKeywords: 'karyawan digital ai, agen ai otonom bisnis, chatbot ai whatsapp 24 jam, customer service otomatis ai, vendor ai indonesia, efisiensi gaji admin b2b',
    h1: 'Vendor Karyawan Digital AI Otonom 24/7 (B2B Enterprise & UMKM Komersial)',
    subText: 'Otomatisasi tugas operasional, rekonsiliasi data, dan interaksi prospek 24 jam nonstop tanpa kelelahan dengan akurasi jawaban tingkat enterprise.',
    workProofProject: 'Autonomous Multi-Agent AI Operations Assistant',
    workProofTags: ['Multi-Agent LLM', 'WhatsApp Cloud API', 'RAG Pipeline', 'n8n'],
    faqHeading: 'Pertanyaan seputar Karyawan Digital AI.',
    faqs: [
      {
        q: 'Apa yang dimaksud dengan Karyawan Digital AI?',
        a: 'Karyawan Digital AI adalah agen otonom terintegrasi yang mampu memahami konteks percakapan manusia, mengecek database stok secara langsung, dan menyelesaikan tugas administrasi secara otomatis 24 jam sehari.',
      },
      {
        q: 'Apakah Karyawan Digital AI dapat berinteraksi di WhatsApp Business resmi?',
        a: 'Ya, kami mengintegrasikannya langsung dengan WhatsApp Cloud API resmi sehingga nomor bisnis Anda aman dari risiko pemblokiran.',
      },
      {
        q: 'Bagaimana cara Karyawan Digital AI menghindari jawaban salah atau halusinasi?',
        a: 'Sistem kami menggunakan RAG (Retrieval-Augmented Generation) berbasis dokumen SOP perusahaan Anda dengan guardrails ketat dan jalur eskalasi otomatis ke admin manusia saat menghadapi kasus sensitif.',
      },
      {
        q: 'Apakah ada batasan jumlah percakapan yang dapat ditangani secara bersamaan?',
        a: 'Tidak ada batasan. Arsitektur cloud kami mampu merespons ribuan chat prospek secara simultan dalam hitungan milidetik.',
      },
      {
        q: 'Berapa penghematan biaya operasional yang dapat dicapai oleh UMKM dan Enterprise?',
        a: 'Klien kami mencatat penurunan beban operasional customer service hingga 70% dan lonjakan respon prospek di luar jam kerja (malam/akhir pekan) hingga 100%.',
      },
    ],
  },

  'toko-online-otonom': {
    ...DEFAULT_AI_SERVICE,
    slug: 'toko-online-otonom',
    metaTitle: 'Jasa Pembuatan Toko Online Headless & E-Commerce Otonom B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Bangun platform e-commerce mandiri tanpa komisi marketplace untuk B2B Enterprise dan UMKM komersial. Dilengkapi checkout kilat sub-detik, integrasi payment gateway otomatis, dan sinkronisasi stok real-time.',
    commercialKeywords: 'jasa pembuatan toko online, headless ecommerce indonesia, website toko online b2b, sistem e-commerce tanpa komisi, web toko online cepat',
    h1: 'Jasa Pembuatan Toko Online Headless & E-Commerce Otonom (B2B & UMKM)',
    subText: 'Toko online berkecepatan sub-detik dengan checkout instan, rekomendasi produk cerdas, dan sinkronisasi inventaris otomatis tanpa potongan komisi marketplace.',
    workProofProject: 'High-Volume Headless Commerce & Order Hub',
    workProofTags: ['Next.js Commerce', 'Edge Checkout', 'Midtrans / Xendit', 'Automated Logistics'],
    faqHeading: 'Pertanyaan seputar Toko Online Headless B2B & UMKM.',
    faqs: [
      {
        q: 'Mengapa beralih ke Toko Online Headless mandiri dibanding marketplace?',
        a: 'Toko online headless memberi Anda 100% kepemilikan data pelanggan, nol potongan komisi transaksi marketplace, kecepatan checkout instan, dan kebebasan membangun program loyalitas eksklusif.',
      },
      {
        q: 'Payment gateway apa saja yang didukung untuk pembayaran otomatis?',
        a: 'Mendukung seluruh metode pembayaran lokal Indonesia seperti QRIS, Virtual Account bank besar, e-wallet (GoPay, OVO, ShopeePay), serta kartu kredit melalui Midtrans, Xendit, atau Doku.',
      },
      {
        q: 'Apakah ongkos kirim dihitung otomatis dari kurir logistik?',
        a: 'Ya, terintegrasi otomatis dengan API kurir nasional (JNE, J&T, SiCepat, Anteraja, GoSend) dengan pelacakan nomor resi otomatis via WhatsApp/email.',
      },
      {
        q: 'Bisakah terhubung ke sistem ERP atau aplikasi kasir (POS) kami?',
        a: 'Sangat bisa. Kami membangun sinkronisasi stok dua arah secara real-time agar inventaris toko fisik dan toko online selalu akurat.',
      },
      {
        q: 'Apakah ada biaya langganan bulanan dari CHESTAADOTCOM?',
        a: 'Tidak ada. Sistem e-commerce diserahkan sebagai aset milik Anda seutuhnya tanpa biaya lisensi bulanan.',
      },
    ],
  },

  'landing-page-konversi': {
    ...DEFAULT_AI_SERVICE,
    slug: 'landing-page-konversi',
    metaTitle: 'Jasa Pembuatan Landing Page Konversi Tinggi B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Tingkatkan ROAS iklan Google & Meta Ads dengan landing page konversi tinggi berkecepatan sub-detik untuk B2B Enterprise dan UMKM komersial. Dirancang dengan formula copywriting persuasif dan tracking pixel presisi.',
    commercialKeywords: 'jasa pembuatan landing page, landing page konversi tinggi, landing page iklan google ads, jasa landing page murah berkualitas, bikin landing page bsd',
    h1: 'Jasa Pembuatan Landing Page Konversi Tinggi (B2B Enterprise & UMKM)',
    subText: 'Halaman penawaran dengan arsitektur psikologi persuasi, kecepatan rendering instan, dan pelacakan konversi presisi untuk melipatgandakan efektivitas anggaran iklan Anda.',
    workProofProject: 'High-Converting Corporate Campaign & Lead Capture Page',
    workProofTags: ['Next.js 15', 'Conversion Copywriting', 'A/B Testing Framework', 'Sub-0.8s Load'],
    faqHeading: 'Pertanyaan seputar Landing Page Konversi B2B & UMKM.',
    faqs: [
      {
        q: 'Mengapa landing page khusus lebih efektif untuk kampanye iklan dibanding website biasa?',
        a: 'Landing page memfokuskan audiens pada satu tawaran spesifik tanpa tombol navigasi yang membingungkan, menghasilkan tingkat konversi (Conversion Rate) hingga 3-5x lebih tinggi dibanding halaman beranda umum.',
      },
      {
        q: 'Berapa lama waktu pembuatan satu landing page siap pakai?',
        a: 'Landing page lengkap dengan copy persuasif, integrasi pixel iklan, dan tombol WhatsApp siap tayang dalam 3 hingga 7 hari kerja.',
      },
      {
        q: 'Apakah landing page sudah termasuk setup Google Ads & Meta Pixel?',
        a: 'Ya, sudah kami konfigurasi lengkap dengan event tracking standard (ViewContent, Lead, Contact) agar kampanye iklan Anda dapat mengoptimalkan algoritma penargetan dengan akurat.',
      },
      {
        q: 'Bagaimana dengan optimasi tampilan di smartphone (mobile)?',
        a: 'Lebih dari 85% traffic iklan berasal dari smartphone, sehingga desain kami 100% mobile-first dengan tombol CTA mengambang yang mudah dijangkau jempol pengguna.',
      },
      {
        q: 'Apakah landing page dijamin cepat saat dibuka oleh calon pembeli?',
        a: 'Kami menjamin kecepatan rendering sub-0.8 detik dengan kompresi gambar modern WebP/AVIF dan caching edge server.',
      },
    ],
  },

  'dominasi-pencarian-seo-aeo': {
    ...DEFAULT_AI_SERVICE,
    slug: 'dominasi-pencarian-seo-aeo',
    metaTitle: 'Jasa Dominasi Pencarian SEO & AEO (AI Engine Optimization) B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Jasa optimasi SEO & AEO generatif untuk B2B Enterprise dan UMKM komersial. Dominasi ranking Google organik, Google Maps lokal, dan jawaban AI (ChatGPT, Perplexity, Gemini).',
    commercialKeywords: 'jasa seo bsd tangerang, answer engine optimization aeo, dominasi pencarian chatgpt gemini, programmatic seo indonesia, optimasi google ai overviews',
    h1: 'Jasa Dominasi Pencarian SEO & AEO Generatif (B2B Enterprise & UMKM)',
    subText: 'Tinggalkan metode SEO kuno. Kami merakit pangkalan data pSEO terstruktur dan optimasi semantik untuk mendominasi peringkat Google serta rujukan mesin AI generatif.',
    workProofProject: 'Programmatic SEO & Knowledge Graph Semantic Authority Hub',
    workProofTags: ['Programmatic SEO', 'JSON-LD Graph', 'AEO Optimization', 'Cloud DB'],
    faqHeading: 'Pertanyaan seputar SEO & AEO Generatif B2B & UMKM.',
    faqs: [
      {
        q: 'Apa itu AEO (Answer Engine Optimization) dan mengapa penting sekarang?',
        a: 'AEO adalah optimasi agar profil dan layanan bisnis Anda dikutip langsung sebagai jawaban rekomendasi utama oleh AI search engine seperti ChatGPT Search, Perplexity, dan Google AI Overviews.',
      },
      {
        q: 'Apa perbedaan Programmatic SEO dengan SEO konvensional?',
        a: 'Programmatic SEO memanfaatkan database terstruktur untuk menghasilkan ratusan halaman landing page spesifik secara otomatis, menjaring pencarian berniat beli tinggi di berbagai wilayah tanpa penulisan manual satu per satu.',
      },
      {
        q: 'Berapa lama waktu yang dibutuhkan untuk melihat hasil kenaikan ranking?',
        a: 'Indeks awal dan peringkat kata kunci lokal umumnya mulai terlihat dalam 3 hingga 6 minggu, dengan otoritas semantik penuh terbentuk dalam 3 bulan.',
      },
      {
        q: 'Apakah sistem pSEO aman dari sanksi penalti algoritma Google?',
        a: 'Sangat aman karena setiap halaman dihasilkan dengan data entitas riil yang unik, Schema.org terverifikasi, dan struktur UX yang memberikan nilai nyata bagi pencari informasi.',
      },
      {
        q: 'Apakah layanan ini sudah mencakup optimasi Google Maps lokal?',
        a: 'Ya, sudah termasuk integrasi Google Business Profile, Local Business Schema, dan geotagging untuk memastikan dominasi di area target operasional Anda.',
      },
    ],
  },

  'jasa-pembuatan-website-bsd-cisauk': {
    ...DEFAULT_AI_SERVICE,
    slug: 'jasa-pembuatan-website-bsd-cisauk',
    metaTitle: 'Jasa Pembuatan Website BSD City, Cisauk & Tangerang Selatan B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website profesional dan SEO Google Maps lokal untuk B2B Enterprise, ruko komersial, dan UMKM di BSD City, Cisauk, Serpong, dan Tangerang Selatan. Siap konsultasi tatap muka langsung.',
    commercialKeywords: 'jasa pembuatan website bsd city, web developer cisauk, bikin website tangerang selatan, jasa seo lokal bsd, web designer serpong',
    h1: 'Jasa Pembuatan Website BSD City, Cisauk & Tangerang (B2B & UMKM)',
    subText: 'Bantu pelanggan di sekitar Anda menemukan bisnis Anda lebih cepat di Google Maps dan pencarian lokal dengan website modern berkecepatan tinggi.',
    workProofProject: 'Local Enterprise & Commercial Business Hub BSD',
    workProofTags: ['Local SEO', 'Google Business Profile', 'Next.js 15', 'Mobile Responsive'],
    faqHeading: 'Pertanyaan seputar Jasa Website BSD City & Cisauk.',
    faqs: [
      {
        q: 'Apakah tim CHESTAADOTCOM dapat diajak meeting tatap muka di area BSD dan Cisauk?',
        a: 'Tentu saja. Basecamp kami berada di Cisauk & BSD City, siap bertemu langsung di Digital Hub, Intermoda, BSD Green Office Park, atau kantor Anda untuk diskusi mendalam.',
      },
      {
        q: 'Apakah website yang dibuat langsung muncul di Google Maps area Tangerang?',
        a: 'Ya, kami menyertakan paket optimasi Google Business Profile dan Local Schema JSON-LD agar bisnis Anda mudah ditemukan pelanggan sekitar saat mencari di Google dan Maps.',
      },
      {
        q: 'Apa saja yang perlu disiapkan oleh pemilik usaha sebelum pembuatan website?',
        a: 'Cukup siapkan informasi dasar usaha, daftar produk/layanan, dan foto dokumentasi. Tim kami yang akan menyusun copywriting profesional dan arsitektur visualnya.',
      },
      {
        q: 'Apakah ada garansi maintenance dan perawatan setelah website online?',
        a: 'Kami memberikan garansi perbaikan bug dan pemeliharaan teknis gratis selama 3 bulan pertama setelah peluncuran.',
      },
      {
        q: 'Berapa biaya pembuatan website untuk bisnis lokal di BSD?',
        a: 'Kami menyediakan paket fleksibel mulai dari landing page UMKM terjangkau hingga sistem custom korporat dengan rincian biaya transparan tanpa biaya siluman.',
      },
    ],
  },

  'infrastruktur-digital-enterprise': {
    ...DEFAULT_AI_SERVICE,
    slug: 'infrastruktur-digital-enterprise',
    metaTitle: 'Jasa Implementasi ERP Kustom & Infrastruktur Digital B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Arsitektur ERP modern dan private cloud tanpa biaya lisensi per user untuk B2B Enterprise dan UMKM komersial. Integrasi multi-divisi, keamanan isolasi data, dan efisiensi operasional 60%.',
    commercialKeywords: 'implementasi erp kustom, sistem informasi enterprise b2b, software operasional umkm, private cloud database, konsolidasi aplikasi bisnis',
    h1: 'Jasa Implementasi ERP Kustom & Infrastruktur Digital (B2B & UMKM)',
    subText: 'Koneksikan seluruh rantai operasional perusahaan Anda dalam satu platform terpadu. Tanpa biaya lisensi bulanan per user, data terisolasi mandiri, dan integrasi otonom.',
    workProofProject: 'Custom Enterprise ERP & Automated Supply Chain Dashboard',
    workProofTags: ['PostgreSQL', 'Node.js', 'React', 'Docker VPC', 'Multi-Tenant'],
    faqHeading: 'Pertanyaan seputar ERP Kustom & Infrastruktur Digital.',
    faqs: [
      {
        q: 'Mengapa memilih ERP kustom dibanding software berlangganan bulanan (SaaS)?',
        a: 'Software SaaS mengenakan biaya per pengguna yang semakin membengkak seiring bertambahnya tim Anda. ERP kustom dari chestaadotcom adalah aset milik Anda seutuhnya dengan nol biaya lisensi per user tambahan.',
      },
      {
        q: 'Bagaimana keamanan data bisnis kami dijamin?',
        a: 'Data bisnis Anda ditempatkan dalam arsitektur Private Cloud atau Virtual Private Cloud (VPC) terenkripsi tanpa berbagi database dengan perusahaan lain (Dedicated Tenant Isolation).',
      },
      {
        q: 'Berapa lama proses implementasi dan migrasi dari sistem lama?',
        a: 'Implementasi bertahap memakan waktu 3-8 minggu dengan proses migrasi data paralel sehingga operasional harian perusahaan tidak pernah terganggu (Zero-Downtime Migration).',
      },
      {
        q: 'Apakah tim kami akan mendapatkan pelatihan penggunaan sistem?',
        a: 'Ya, kami menyertakan sesi pelatihan komprehensif untuk staf operasional dan manajemen, lengkap dengan buku panduan SOP dan video tutorial interaktif.',
      },
    ],
  },

  'security-audit': {
    ...DEFAULT_AI_SERVICE,
    slug: 'security-audit',
    metaTitle: 'Jasa Audit Keamanan Siber & Proteksi Aset Digital B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Lindungi aset digital dan data sensitif pelanggan perusahaan dari ancaman siber untuk B2B Enterprise dan UMKM komersial. Audit penetrasi, enkripsi database, dan kepatuhan regulasi.',
    commercialKeywords: 'jasa audit keamanan website, cybersecurity b2b indonesia, proteksi aset digital umkm, penetration testing korporat, enkripsi database cloud',
    h1: 'Jasa Audit Keamanan Siber & Proteksi Aset Digital (B2B Enterprise & UMKM)',
    subText: 'Bentengi infrastruktur web, API, dan basis data perusahaan Anda dari kebocoran data, serangan DDoS, serta kerentanan zero-day dengan standar pengujian berstandar global.',
    workProofProject: 'Enterprise Vulnerability Assessment & Cloud Hardening',
    workProofTags: ['OWASP Top 10', 'Cloudflare WAF', 'VPC Isolation', 'TLS 1.3 Encryption'],
    faqHeading: 'Pertanyaan seputar Audit Keamanan Siber & Proteksi Digital.',
    faqs: [
      {
        q: 'Mengapa perusahaan membutuhkan audit keamanan siber berkala?',
        a: 'Satu celah keamanan dapat merusak reputasi bisnis bernilai miliaran rupiah dan mendatangkan sanksi kepatuhan hukum data pribadi (UU PDP). Audit berkala mendeteksi celah sebelum dieksploitasi peretas.',
      },
      {
        q: 'Apa saja yang diuji dalam proses audit keamanan siber?',
        a: 'Kami menguji kerentanan OWASP Top 10, konfigurasi server cloud, integritas autentikasi API, proteksi injeksi SQL, serta potensi kebocoran data pengguna.',
      },
      {
        q: 'Berapa lama waktu yang dibutuhkan untuk audit lengkap?',
        a: 'Audit komprehensif diselesaikan dalam 5-10 hari kerja, diikuti penyerahan laporan eksekutif dan rekomendasi penambalan celah (remediation guidance).',
      },
      {
        q: 'Apakah tim chestaadotcom juga membantu menambal kerentanan yang ditemukan?',
        a: 'Ya, arsitek keamanan kami siap langsung mengeksekusi penambalan kode dan penguatan firewall server untuk memastikan aset Anda 100% aman.',
      },
    ],
  },

  'fractional-cto': {
    ...DEFAULT_AI_SERVICE,
    slug: 'fractional-cto',
    metaTitle: 'Jasa Fractional CTO & Arsitek Teknologi Strategis B2B & UMKM | CHESTAADOTCOM',
    metaDescription: 'Dapatkan arahan kepemimpinan teknologi level direksi tanpa biaya gaji penuh untuk B2B Enterprise dan UMKM bertumbuh. Roadmap teknologi 5 tahun, audit vendor, dan efisiensi belanja IT.',
    commercialKeywords: 'jasa fractional cto indonesia, konsultan teknologi eksekutif b2b, strategic tech leadership, audit vendor software, arsitek sistem korporat',
    h1: 'Jasa Fractional CTO & Kepemimpinan Teknologi Strategis (B2B & UMKM)',
    subText: 'Pandu transformasi digital bisnis Anda bersama pemimpin teknologi senior. Selaraskan anggaran IT dengan pertumbuhan omzet tanpa beban gaji eksekutif penuh waktu.',
    workProofProject: 'Strategic IT Modernization & Technology Roadmap Governance',
    workProofTags: ['Tech Due Diligence', 'Executive Advisory', 'Cost Optimization', 'System Architecture'],
    faqHeading: 'Pertanyaan seputar Jasa Fractional CTO.',
    faqs: [
      {
        q: 'Apa bedanya Fractional CTO dengan menyewa agensi software biasa?',
        a: 'Agensi software fokus menjual jam kerja pembuatan aplikasi. Fractional CTO duduk bersama pimpinan perusahaan Anda untuk menentukan teknologi apa yang benar-benar memberikan laba, menolak pengeluaran sia-sia, dan mengawal vendor.',
      },
      {
        q: 'Berapa jam komitmen kerja Fractional CTO per bulan?',
        a: 'Komitmen fleksibel antara 10 hingga 40 jam per bulan, mencakup rapat direksi mingguan, audit kode berkala, dan konsultasi strategis darurat.',
      },
      {
        q: 'Apakah Fractional CTO cocok untuk UMKM berkembang?',
        a: 'Sangat cocok untuk bisnis yang sedang scaling up dan ingin menghindari salah beli software mahal bernilai ratusan juta rupiah.',
      },
    ],
  },
};

// Aliases for seamless route resolution
B2B_SERVICES_MAP['ecommerce-automation'] = B2B_SERVICES_MAP['toko-online-otonom'];
B2B_SERVICES_MAP['landing-page'] = B2B_SERVICES_MAP['landing-page-konversi'];
B2B_SERVICES_MAP['pembuatan-website'] = B2B_SERVICES_MAP['website-mesin-konversi'];
B2B_SERVICES_MAP['seo-aeo'] = B2B_SERVICES_MAP['dominasi-pencarian-seo-aeo'];
B2B_SERVICES_MAP['cloud-infrastructure'] = B2B_SERVICES_MAP['infrastruktur-digital-enterprise'];
B2B_SERVICES_MAP['digital-marketing'] = B2B_SERVICES_MAP['landing-page-konversi'];
B2B_SERVICES_MAP['performance-marketing'] = B2B_SERVICES_MAP['landing-page-konversi'];
B2B_SERVICES_MAP['digital-asset-protection'] = B2B_SERVICES_MAP['security-audit'];
B2B_SERVICES_MAP['cybersecurity'] = B2B_SERVICES_MAP['security-audit'];

export function getServiceContentBySlug(slug?: string): B2BServiceContent {
  if (!slug) return DEFAULT_AI_SERVICE;
  return B2B_SERVICES_MAP[slug] || DEFAULT_AI_SERVICE;
}
