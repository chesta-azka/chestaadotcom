export interface Project {
  id: string;
  title: string;
  client?: string;
  duration?: string;
  category: 'Website' | 'Landing Page' | 'Company Profile';
  description: string;
  techStack: string[];
  features: string[];
  liveLink: string;
  thumbnail: string;
  overview?: string;
  challenges?: string;
  solution?: string;
  impact?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'rumah-tropis',
    title: 'Tropical Architecture Portfolio & Showcase',
    client: 'Boutique Architecture Studio (Bogor & BSD City)',
    duration: '2 Minggu',
    category: 'Website',
    description: 'Etalase portofolio arsitektur premium dengan fokus pada estetika hunian tropis berkelas. Desain imersif dengan transisi sinematik untuk memanjakan mata calon klien elit.',
    techStack: ['Next.js 15', 'Framer Motion', 'Tailwind CSS', 'Image CDN', 'TypeScript'],
    features: [
      'Cinematic Portfolio Showcase with Full-Screen Galleries',
      'Smooth Page Transitions & Asymmetrical Grid Layout',
      'High-Resolution Image Optimization & Lazy Loading',
      'Architectural Detail Breakdown & Material Specs',
      'Conversion-Ready Consultation Booking Funnel'
    ],
    liveLink: 'https://chestaa.com/portfolio/rumah-tropis',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    overview: `Sebuah biro arsitektur butik elit yang mengkhususkan diri pada perancangan hunian tropis mewah, vila privat, dan resor komersial di kawasan perbukitan Bogor, BSD City, dan Pondok Indah Jakarta Selatan, mempercayakan pengembangan etalase digital mereka kepada kami. Karya-karya rancangan mereka memiliki nilai estetika seni tinggi dengan detail material kayu alami, kolam renang infinity, dan sirkulasi udara silang yang memukau.

    Namun, portofolio fisik mereka selama ini hanya tersimpan di dalam majalah cetak atau akun Instagram yang terfragmentasi. Klien membutuhkan sebuah website portofolio digital berkelas museum seni yang mampu membius calon klien dari kalangan konglomerat dan high-net-worth individuals (HNWI) sejak pandangan pertama.`,
    challenges: `Tantangan kreatif dan teknis dalam proyek arsitektur mewah ini adalah:
    1. Filosofi "Invisible UI": Mendesain antarmuka yang sangat bersih dan senyap, di mana garis grid tipis 1px dan tipografi sans-serif geometris bertindak sebagai bingkai bagi karya arsitektur tanpa mengalihkan perhatian penonton.
    2. Manajemen Aset Gambar 4K Tanpa Lag: Menampilkan ratusan render arsitektur 3D dan foto as-built beresolusi tinggi dengan perpindahan galeri yang mulus dan instan.
    3. Eksklusivitas Pengalaman: Menciptakan kesan privasi dan prestise tinggi yang selaras dengan profil klien kelas atas mereka.`,
    solution: `Kami merancang platform web dengan standar galeri seni digital kelas dunia:
    - Full-Screen Cinematic Galleries: Memanfaatkan komponen galeri layar penuh dengan transisi pudar (*fade transitions*) yang dikurasi khusus menggunakan Framer Motion.
    - Progressive Blur-Up Loading: Setiap foto arsitektur dimuat menggunakan placeholder buram berkualitas rendah sebelum gambar asli beresolusi tinggi muncul tanpa jeda canggung.
    - Architectural Detail Breakdown: Setiap proyek dilengkapi dengan penjelasan mendalam mengenai filosofi desain tropis, material lokal yang digunakan, dan tantangan kontur tanah di lokasi pembangunan.`,
    impact: `Transformasi digital etalase arsitektur ini menghasilkan pencapaian luar biasa:
    - Durasi rata-rata sesi pengunjung menjelajahi galeri proyek meningkat hingga lebih dari 4 menit per kunjungan.
    - Permintaan jadwal konsultasi privat untuk perancangan hunian mewah melonjak sebesar 180% dari kalangan elit Jakarta dan Tangerang.`
  },
  {
    id: 'ai-omnichannel-bsd',
    title: 'AI Omnichannel Customer Service & Lead Scoring',
    client: 'Enterprise Retail Conglomerate (BSD City)',
    duration: '4 Minggu',
    category: 'Company Profile',
    description: 'Sistem customer service otomatis berbasis Agentic AI yang memproses ribuan tiket per hari dari berbagai kanal komunikasi dengan integrasi perpesanan instan korporat & arsitektur berperforma tinggi.',
    techStack: ['Next.js 15', 'Google Gemini AI', 'WhatsApp Business API', 'PostgreSQL Edge', 'TypeScript'],
    features: [
      'Automated Ticket Routing & Intent Classification',
      'Context-Aware AI Responses in Natural Bahasa',
      'WhatsApp Business API Real-time Integration',
      'Predictive Lead Scoring & Sentiment Analysis',
      'Real-time Analytics Dashboard for Supervisors'
    ],
    liveLink: 'https://chestaa.com/portfolio/ai-omnichannel-bsd',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    overview: `Klien kami, sebuah konglomerat retail berskala besar yang mengoperasikan puluhan pusat perbelanjaan dan jaringan distribusi di kawasan BSD City Tangerang Selatan, Jakarta Selatan, serta Depok, menghadapi tantangan operasional harian yang sangat masif. Lonjakan volume pertanyaan pelanggan mencapai lebih dari 10.000 tiket per hari dari berbagai kanal, termasuk WhatsApp, Live Web Chat, dan email resmi korporat. 

    Sebelum transformasi digital ini, tim customer service manual kewalahan menghadapi antrean tiket, yang menyebabkan waktu tunggu rata-rata (SLA) membengkak hingga 4 jam per pelanggan. Hal ini memicu penurunan tingkat kepuasan pelanggan (CSAT) dan hilangnya potensi penjualan dari prospek (*hot leads*) yang menanyakan ketersediaan produk stok terbatas. Klien membutuhkan perombakan arsitektur digital total yang mampu merespons pertanyaan berulang secara instan menggunakan kecerdasan buatan, sekaligus mengotomatisasi rute eskalasi ke agen manusia untuk kasus komplain kompleks tanpa jeda waktu yang merugikan reputasi brand.`,
    challenges: `Dalam merancang dan mengeksekusi proyek AI Omnichannel ini, tim rekayasa kami harus memecahkan beberapa kendala teknis dan operasional yang pelik:
    1. Fragmentasi Kanal Komunikasi: Menyatukan berbagai sumber data percikan pesan dari gateway perpesanan instan, widget interaktif web, dan sistem tiket internal ke dalam satu single-source-of-truth database secara real-time tanpa latensi.
    2. Kontekstualisasi Bahasa Alami (Natural Bahasa Indonesia): Model AI konvensional sering kali gagal memahami singkatan bahasa gaul, istilah slang retail lokal, dan konteks spesifik inventaris gudang di Jabodetabek.
    3. Mitigasi Risiko Halusinasi AI: Dalam transaksi komersial bernilai tinggi, kesalahan informasi harga atau garansi oleh AI dapat berdampak hukum dan kerugian finansial langsung bagi korporat.
    4. Skalabilitas Saat Flash Sale: Lonjakan trafik hingga 500% saat event diskon besar wajib ditangani oleh arsitektur serverless edge tanpa mengalami downtime sesaat pun.`,
    solution: `Kami membangun solusi enterprise berstandar tinggi menggunakan arsitektur web berperforma tinggi dan Google Gemini AI otonom yang di-host di infrastruktur cloud global dengan redundansi tinggi:
    - Mesin Klasifikasi Intent Berbasis AI: Setiap pesan masuk langsung dianalisis oleh model Gemini Pro untuk mendeteksi maksud pengguna—apakah itu cek status pengiriman, klaim garansi, atau pertanyaan spesifikasi produk.
    - Modul Predictive Lead Scoring: Algoritma cerdas memindai riwayat chat dan durasi kunjungan katalog untuk memberikan skor probabilitas pembelian (*lead score*). Prospek dengan skor tinggi langsung di-routing ke nomor WhatsApp sales eksekutif senior secara otomatis.
    - Dashboard Supervisor Real-Time: Kami merancang antarmuka bento grid bagi supervisor customer service untuk memantau performa bot, mengambil alih percakapan (*human takeover*) kapan pun dibutuhkan, dan melihat analisis sentimen pelanggan secara visual.`,
    impact: `Transformasi digital ini memberikan dampak finansial dan operasional yang sangat masif bagi klien dalam kurun waktu 30 hari pertama:
    - Waktu respons pertama (*First Response Time*) terpangkas drastis dari 4 jam menjadi kurang dari 1.2 detik (penurunan 99.9%).
    - Otomatisasi AI sukses menangani 82% dari total 10.000+ tiket harian tanpa intervensi agen manusia.
    - Peningkatan rasio konversi prospek menjadi pembeli (*lead-to-customer conversion rate*) melonjak sebesar 43% berkat kecepatan penanganan hot lead yang sangat presisi di wilayah Jabodetabek.`
  }
];
