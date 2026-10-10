import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  ChevronDown, 
  FolderGit2, 
  ArrowUpRight 
} from 'lucide-react';
import FAQSchema from '../components/atoms/FAQSchema';
import SEOMetadata from '../components/atoms/SEOMetadata';

interface ServiceContent {
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

const DEFAULT_AI_CONTENT: ServiceContent = {
  metaTitle: 'Jasa Integrasi AI & Otomasi Alur Kerja Bisnis B2B & UMKM | CHESTAADOTCOM',
  metaDescription: 'Jasa integrasi AI praktis untuk B2B Enterprise dan UMKM komersial. Otomasi alur kerja, chatbot WhatsApp 24/7, knowledge base internal, dan rekomendasi hemat ratusan jam kerja tanpa vendor lock-in.',
  commercialKeywords: 'jasa integrasi AI, chatbot customer service B2B, automasi workflow UMKM, AI korporasi, konsultan AI enterprise, efisiensi operasional AI',
  tagline: 'Konsultasi Gratis',
  h1: 'Jasa Integrasi AI & Otomasi Alur Kerja Perusahaan (B2B & UMKM Komersial)',
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
    { num: '03', title: 'Sentuhan manusia', desc: 'Memastikan hasil akhir aman, beretika, dan dapat dipertanggungjawabkan.' },
  ],
  techStackHeading: 'Dipilih karena reliabilitas, bukan sekadar tren.',
  techStack: [
    { name: 'OpenAI', role: 'LLM & Reasoning' },
    { name: 'Anthropic', role: 'Claude Engine' },
    { name: 'Node.js', role: 'High-Concurrency API' },
    { name: 'n8n', role: 'Workflow Automation' },
    { name: 'PostgreSQL', role: 'Vector DB & Relational' },
  ],
  faqHeading: 'Pertanyaan seputar jasa Integrasi AI.',
  faqs: [
    {
      q: 'Model AI apa yang digunakan untuk integrasi bisnis B2B dan UMKM?',
      a: 'Model dipilih berdasarkan kebutuhan bisnis, privasi data, latency, dan efisiensi biaya—termasuk OpenAI GPT-4o, Anthropic Claude 3.5, atau open-source LLM terisolasi on-premise tanpa melatih model publik.',
    },
    {
      q: 'Apakah data rahasia perusahaan aman saat dihubungkan ke sistem AI?',
      a: 'Sangat aman. Seluruh data diproses melalui arsitektur terisolasi dengan enkripsi end-to-end dan zero-data-retention policy. Data proprietary Anda tidak pernah bocor atau digunakan untuk training model publik.',
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
      q: 'Bagaimana cara menghitung ROI konkret dari integrasi AI ini?',
      a: 'ROI dihitung secara transparan dari penghematan ratusan jam kerja manual admin per bulan, penurunan biaya penanganan tiket komplain hingga 65%, serta percepatan siklus closing prospek 24 jam nonstop.',
    },
  ],
  ctaHeading: 'Apa hambatan operasional yang ingin Anda hancurkan?',
  ctaSubText: 'Ceritakan tantangan yang perusahaan Anda hadapi. Kami bantu memetakan arsitektur dan menentukan langkah digitalisasi yang tepat.',
};

const SERVICES_REGISTRY: Record<string, Partial<ServiceContent>> = {
  'web-development-nextjs': {
    metaTitle: 'Jasa Pembuatan Website Next.js 15 Enterprise & UMKM | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website modern berbasis Next.js 15 App Router & Edge Caching untuk korporasi B2B dan UMKM komersial. Loading sub-detik, Core Web Vitals 100, dan dominasi SEO Google.',
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
    metaTitle: 'Jasa Pembuatan Website Mesin Konversi & Penjualan B2B | CHESTAADOTCOM',
    metaDescription: 'Ubah pengunjung menjadi klien loyal dengan website mesin konversi B2B dan UMKM komersial. Dioptimalkan dengan psikologi penawaran, kecepatan sub-detik, dan pelacakan funnel presisi.',
    commercialKeywords: 'website mesin konversi, jasa bikin website sales b2b, funnel landing page umkm, optimasi conversion rate website, arsitektur penjualan digital',
    h1: 'Jasa Pembuatan Website Mesin Penjualan & Konversi B2B',
    subText: 'Platform web berorientasi ROI yang dirancang khusus untuk mengubah lalu lintas pengunjung menjadi peluang bisnis bernilai tinggi dengan kecepatan rendering instan.',
    workProofProject: 'B2B Lead Acquisition Machine & Conversion Funnel',
    workProofTags: ['Next.js 15', 'Funnel Analytics', 'Conversion Rate Optimization', 'Speed 100'],
    faqHeading: 'Pertanyaan seputar Website Mesin Konversi B2B.',
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
    metaTitle: 'Vendor Karyawan Digital AI Otonom 24/7 B2B & Bisnis | CHESTAADOTCOM',
    metaDescription: 'Solusi karyawan digital AI cerdas yang bekerja 24 jam nonstop menjawab pelanggan, memproses pesanan, dan menyinkronkan data internal tanpa risiko human error untuk enterprise dan UMKM.',
    commercialKeywords: 'karyawan digital ai, agen ai otonom bisnis, chatbot ai whatsapp 24 jam, customer service otomatis ai, vendor ai indonesia',
    h1: 'Vendor Karyawan Digital AI Otonom 24/7 untuk Korporat & Bisnis',
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
        q: 'Berapa penghematan biaya operasional yang dapat dicapai?',
        a: 'Klien kami mencatat penurunan beban operasional customer service hingga 70% dan lonjakan respon prospek di luar jam kerja (malam/akhir pekan) hingga 100%.',
      },
    ],
  },
  'toko-online-otonom': {
    metaTitle: 'Jasa Pembuatan Toko Online Headless & E-Commerce Otonom | CHESTAADOTCOM',
    metaDescription: 'Bangun platform e-commerce mandiri tanpa komisi marketplace. Dilengkapi checkout kilat sub-detik, integrasi payment gateway otomatis, dan sinkronisasi stok real-time untuk retail & distributor.',
    commercialKeywords: 'jasa pembuatan toko online, headless ecommerce indonesia, website toko online b2b, sistem e-commerce tanpa komisi, web toko online cepat',
    h1: 'Jasa Pembuatan Toko Online Headless & E-Commerce Otonom',
    subText: 'Toko online berkecepatan sub-detik dengan checkout instan, rekomendasi produk cerdas, dan sinkronisasi inventaris otomatis tanpa potongan komisi marketplace.',
    workProofProject: 'High-Volume Headless Commerce & Order Hub',
    workProofTags: ['Next.js Commerce', 'Edge Checkout', 'Midtrans / Xendit', 'Automated Logistics'],
    faqHeading: 'Pertanyaan seputar Toko Online Headless.',
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
    metaTitle: 'Jasa Pembuatan Landing Page Konversi Tinggi & Iklan B2B | CHESTAADOTCOM',
    metaDescription: 'Tingkatkan ROAS iklan Google & Meta Ads dengan landing page konversi tinggi berkecepatan sub-detik. Dirancang dengan formula copywriting persuasif dan tracking pixel presisi.',
    commercialKeywords: 'jasa pembuatan landing page, landing page konversi tinggi, landing page iklan google ads, jasa landing page murah berkualitas, bikin landing page bsd',
    h1: 'Jasa Pembuatan Landing Page Konversi Tinggi & Iklan B2B',
    subText: 'Halaman penawaran dengan arsitektur psikologi persuasi, kecepatan rendering instan, dan pelacakan konversi presisi untuk melipatgandakan efektivitas anggaran iklan Anda.',
    workProofProject: 'High-Converting Corporate Campaign & Lead Capture Page',
    workProofTags: ['Next.js 15', 'Conversion Copywriting', 'A/B Testing Framework', 'Sub-0.8s Load'],
    faqHeading: 'Pertanyaan seputar Landing Page Konversi.',
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
  'jasa-pembuatan-website-bsd-cisauk': {
    metaTitle: 'Jasa Pembuatan Website BSD City, Cisauk & Tangerang | CHESTAADOTCOM',
    metaDescription: 'Jasa pembuatan website profesional dan SEO Google Maps lokal untuk bisnis, ruko, dan UMKM di BSD City, Cisauk, Serpong, dan Tangerang Selatan. Siap konsultasi tatap muka langsung.',
    commercialKeywords: 'jasa pembuatan website bsd city, web developer cisauk, bikin website tangerang selatan, jasa seo lokal bsd, web designer serpong',
    h1: 'Jasa Pembuatan Website BSD City, Cisauk & Tangerang Selatan',
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
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug?: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const matchedContent = slug && SERVICES_REGISTRY[slug] 
    ? { ...DEFAULT_AI_CONTENT, ...SERVICES_REGISTRY[slug] }
    : DEFAULT_AI_CONTENT;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const industries = [
    { number: '01', name: 'Company Profile', href: '/industri/company-profile' },
    { number: '02', name: 'Rental Mobil', href: '/industri/rental-mobil' },
    { number: '03', name: 'Klinik & Kesehatan', href: '/industri/klinik-kesehatan' },
    { number: '04', name: 'Virtual Office', href: '/industri/virtual-office' },
    { number: '05', name: 'Tour & Travel', href: '/industri/tour-travel' },
    { number: '06', name: 'Fashion', href: '/industri/fashion' },
    { number: '07', name: 'Kontraktor', href: '/industri/kontraktor' },
    { number: '08', name: 'Konsultan', href: '/industri/konsultan' },
    { number: '09', name: 'Legalitas Usaha', href: '/industri/legalitas-usaha' },
    { number: '10', name: 'Perhiasan', href: '/industri/perhiasan' },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900 font-sans">
      <SEOMetadata 
        title={matchedContent.metaTitle}
        description={matchedContent.metaDescription}
        keywords={matchedContent.commercialKeywords}
        currentRoute={`/services/${slug || 'ai-integration'}`}
      />
      
      <FAQSchema faqs={matchedContent.faqs} />

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative py-24 md:py-32 bg-gradient-to-b from-purple-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="space-y-8 max-w-4xl">
            
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/6282125447232?text=Halo%20chestaadotcom,%20saya%20ingin%20konsultasi%20gratis%20mengenai%20integrasi%20AI%20dan%20layanan%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-900 font-medium text-xs hover:bg-purple-200/80 transition-colors"
              >
                <Sparkles size={13} className="text-purple-700" />
                <span>{matchedContent.tagline}</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="#components"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 transition-colors"
              >
                <span>Lihat lingkup ↓</span>
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              {matchedContent.h1}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl">
              {matchedContent.subText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              {matchedContent.miniFeatures.map((feat) => (
                <div key={feat.num} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-mono font-bold text-purple-700">{feat.num}</span>
                  <div className="font-bold text-sm text-slate-950">{feat.title}</div>
                  <div className="text-xs text-slate-500 font-normal">{feat.subtitle}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section id="problem" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.problemHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {matchedContent.problemSubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedContent.problemPoints.map((point) => (
              <div key={point.num} className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-purple-300 transition-all">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md inline-block">
                  {point.num}
                </span>
                <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: RESULT */}
      <section id="result" className="py-24 bg-purple-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-4xl space-y-6">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold leading-tight text-white tracking-tight">
              &ldquo;{matchedContent.resultStatement}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMPONENTS */}
      <section id="components" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.componentsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedContent.components.map((comp) => (
              <div key={comp.num} className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700">{comp.num}</span>
                <h3 className="font-bold text-base text-slate-950">{comp.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: PROCESS */}
      <section id="process" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.processHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {matchedContent.processSubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedContent.processSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md inline-block">
                  {step.num}
                </span>
                <h3 className="font-bold text-base text-slate-950">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: WORK PROOF */}
      <section id="work-proof" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8">
          
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.workProofHeading}
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6">
            <div className="space-y-3 max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-950">
                {matchedContent.workProofProject}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {matchedContent.workProofDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {matchedContent.workProofTags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
              >
                <span>Lihat portofolio</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: PARTNER VALUES */}
      <section id="partner-values" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.partnerValuesHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchedContent.partnerValues.map((val) => (
              <div key={val.num} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-mono font-bold text-purple-700">{val.num}</span>
                <h3 className="font-bold text-base text-slate-950">{val.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: AI METHODOLOGY */}
      <section id="ai-methodology" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.aiMethodologyHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {matchedContent.aiMethodologySubText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedContent.aiMethodologySteps.map((step) => (
              <div key={step.num} className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-purple-300 transition-all">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md inline-block">
                  {step.num}
                </span>
                <h3 className="font-bold text-base text-slate-950">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: INDUSTRY CONTEXT (WITH RICH PURPLE HOVER & AUDIT TOOLTIP) */}
      <section id="industry-context" className="py-24 bg-slate-50 border-b border-slate-200/80 overflow-visible">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              Konteks industri mengubah solusinya.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Jelajahi bagaimana arsitektur AI kami disesuaikan dengan alur konversi di sektor spesifik Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
            {industries.map((ind) => (
              <div key={ind.number} className="relative group">
                {/* Audit Industry Needs Tooltip */}
                <div 
                  role="tooltip"
                  className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 z-30 whitespace-nowrap"
                >
                  <div className="px-2.5 py-1 rounded-md bg-purple-950 text-white text-[11px] font-mono font-medium shadow-xl border border-purple-400/40 flex items-center gap-1.5">
                    <Sparkles size={11} className="text-purple-300" />
                    <span>Audit Industry Needs</span>
                  </div>
                  <div className="w-2 h-2 bg-purple-950 rotate-45 mx-auto -mt-1 border-r border-b border-purple-400/40" />
                </div>

                <Link
                  to={ind.href}
                  className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 group-hover:border-purple-600 group-hover:bg-purple-900 transition-all duration-300 shadow-2xs group-hover:shadow-xl group-hover:shadow-purple-900/20 flex flex-col justify-between min-h-[104px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-purple-700 group-hover:text-purple-300 transition-colors">
                      {ind.number}
                    </span>
                    <ArrowUpRight size={14} className="text-slate-400 group-hover:text-purple-200 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-white leading-tight transition-colors">
                    {ind.name}
                  </div>
                  <div className="text-[10px] text-slate-400 group-hover:text-purple-300/80 transition-colors">
                    Solusi Khusus Sektor
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: TECH STACK */}
      <section id="tech-stack" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.techStackHeading}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {matchedContent.techStack.map((tech) => (
              <div key={tech.name} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-purple-300 transition-colors">
                <div className="font-display font-bold text-base text-slate-950">{tech.name}</div>
                <div className="text-[11px] font-mono text-slate-500">{tech.role}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11: FAQ */}
      <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-950 tracking-tight">
              {matchedContent.faqHeading}
            </h2>
          </div>

          <div className="space-y-3">
            {matchedContent.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-purple-700 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaqIndex === index ? 'rotate-180 text-purple-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-purple-950 text-white space-y-6 shadow-2xl shadow-purple-950/20">
            <div className="space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                Langkah Berikutnya
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                {matchedContent.ctaHeading}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-purple-200 leading-relaxed">
                {matchedContent.ctaSubText}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-3.5">
              <a
                href="https://wa.me/6282125447232?text=Halo%20chestaadotcom!%20Saya%20ingin%20diskusikan%20kebutuhan%20integrasi%20AI%20dan%20otomatisasi%20bisnis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-purple-950 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={16} className="text-purple-900" />
                <span>Diskusikan Kebutuhan Anda</span>
                <ArrowRight size={14} />
              </a>

              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-purple-900/60 hover:bg-purple-900 text-white rounded-full font-semibold text-xs sm:text-sm border border-purple-700/60 transition-colors"
              >
                <FolderGit2 size={15} />
                <span>Lihat Karya Kami</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
