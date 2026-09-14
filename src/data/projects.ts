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
    id: 'contractor-rebranding-milyaran',
    title: "Mengubah Website 'Asal Ada' Menjadi Magnet Klien Kontrak Milyaran: Strategi Rebranding Digital untuk Perusahaan Jasa Konstruksi",
    client: 'PT Nusanta Graha Megatama (Fictional Case Study / Portfolio Showcase)',
    duration: '2 Minggu',
    category: 'Company Profile',
    description: 'Transformasi digital dan rebranding high-ticket website untuk perusahaan kontraktor konstruksi. Menghilangkan kesan "asal ada", beralih ke identitas visual korporat elit yang langsung memenangkan tender proyek miliaran rupiah.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'],
    features: [
      'High-Ticket Executive Carbon & Steel Design System',
      'Interactive Past Projects & Heavy Equipment Matrix',
      'Tender-Ready Technical Credentials & ISO Vault',
      'Immersive Project Gallery with Cinematic Transitions',
      'Direct Procurement Director Inquiry & WhatsApp Funnel'
    ],
    liveLink: 'https://chestaa.com/portfolio/contractor-rebranding-milyaran',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15d2?q=80&w=1200&auto=format&fit=crop',
    overview: `[Catatan Studi Kasus Konseptual / Simulasi Portofolio Portfolio] PT Nusanta Graha Megatama adalah representasi studi kasus fiktif dari tipikal perusahaan general contractor dan penyedia jasa konstruksi industrial berskala besar yang berbasis di kawasan CBD Jakarta Selatan dan BSD City Tangerang. Perusahaan dengan profil serupa sering kali menghadapi dilema klasik yang kerap menghancurkan peluang bisnis bernilai tinggi: perusahaan mereka memiliki pengalaman operasional bertahun-tahun dan portofolio pembangunan gedung bertingkat serta pabrik di berbagai kawasan industri di Jabodetabek, namun website perusahaan mereka tergolong 'asal ada'—dibangun secara sembarangan bertahun-tahun lalu dengan tampilan usang, lambat, dan tidak responsif.

    Dalam dunia jasa konstruksi high-ticket bernilai kontrak miliaran hingga ratusan miliar rupiah, direktur pengadaan korporat (*procurement directors*), investor real estate, dan konsultan perencana sangat memperhatikan kredibilitas visual. Ketika mereka melakukan due diligence digital dan menemukan website kontraktor yang berantakan, keraguan langsung muncul. Klien malu membagikan tautan company profile mereka kepada calon investor besar karena takut merusak citra profesional. Mereka membutuhkan transformasi digital total yang memancarkan keperkasaan, presisi teknik, dan otoritas mutlak dalam industri konstruksi modern.`,
    challenges: `Dalam mengeksekusi proyek rebranding digital ini, tim kami harus memecahkan beberapa tantangan arsitektural dan psikologis bisnis yang krusial:
    1. Mengikis Mentalitas 'Website Asal Ada': Mengedukasi manajemen senior bahwa di era digital modern, website korporat adalah 'kantor pusat virtual' pertama yang dinilai oleh direktur korporat sebelum mereka memutuskan mengundang perusahaan ke meja tender.
    2. Visualisasi Portofolio Berat Tanpa Lag: Menampilkan puluhan foto proyek konstruksi berat, struktur baja, dan rendering arsitektur 3D beresolusi tinggi tanpa mengorbankan kecepatan muat halaman (*page speed*).
    3. Struktur Copywriting B2B High-Ticket: Menyusun narasi pemasaran yang langsung menyasar poin krusial direktur pengadaan—seperti ketepatan waktu pengerjaan (*On-Time Delivery*), kepatuhan standar keselamatan K3 ISO, dan transparansi anggaran.
    4. Optimalisasi SEO Lokal Korporat: Memastikan website menduduki peringkat teratas pencarian Google untuk kata kunci spesifik seperti 'kontraktor gudang industri Jakarta', 'jasa konstruksi BSD', dan 'kontraktor high-rise building Bogor'.`,
    solution: `Kami merancang dan mengeksekusi arsitektur web modern menggunakan Next.js 15 App Router dengan pendekatan desain "Executive Carbon & Industrial Steel":
    - Estetika Korporat Elit: Menggunakan palet warna deep carbon, abu-abu baja, dan aksen garis arsitektural tipis yang memberikan kesan kokoh, mewah, dan sangat profesional.
    - Matriks Proyek & Kapasitas Infrastruktur: Menyajikan rekam jejak proyek masa lalu ke dalam bento-grid interaktif yang memuat metrik tonase baja, luas area terbangun, dan nilai kontrak secara elegan.
    - Funnel Tender Langsung: Menghilangkan formulir kontak umum dan menggantinya dengan jalur komunikasi khusus bagi direktur pengadaan untuk langsung terhubung dengan estimator senior via WhatsApp atau penjadwalan meeting kalender.`,
    impact: `Hasil dari transformasi digital dan rebranding ini langsung membuahkan pencapaian finansial yang luar biasa bagi klien:
    - Durasi kunjungan rata-rata (*User Engagement*) melonjak drastis hingga **4x lipat** dibanding website lama.
    - Sebanyak **3 leads korporat berskala besar** langsung masuk dan meminta penawaran tender dalam minggu pertama peluncuran website baru.
    - Klien berhasil memenangkan kontrak pembangunan gudang logistik senilai Rp 45 miliar di kawasan industri Cikarang setelah pihak pemberi tender memuji profesionalisme portofolio digital mereka.`
  },
  {
    id: 'ai-omnichannel-bsd',
    title: 'AI Omnichannel Customer Service & Lead Scoring',
    client: 'Enterprise Retail Conglomerate (BSD City)',
    duration: '4 Minggu',
    category: 'Website',
    description: 'Sistem customer service otomatis berbasis Agentic AI yang memproses ribuan tiket per hari dari berbagai kanal komunikasi dengan integrasi WhatsApp API & Next.js 15.',
    techStack: ['Node.js', 'Google Gemini Pro', 'Firebase Firestore', 'Next.js 15', 'Tailwind CSS'],
    features: [
      'Automated Ticket Routing & Intent Classification',
      'Context-Aware AI Responses in Natural Bahasa',
      'WhatsApp Business API Real-time Integration',
      'Predictive Lead Scoring & Sentiment Analysis',
      'Real-time Analytics Dashboard for Supervisors'
    ],
    liveLink: '#',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    overview: `Klien kami, sebuah konglomerat retail berskala besar yang mengoperasikan puluhan pusat perbelanjaan dan jaringan distribusi di kawasan BSD City Tangerang Selatan, Jakarta Selatan, serta Depok, menghadapi tantangan operasional harian yang sangat masif. Lonjakan volume pertanyaan pelanggan mencapai lebih dari 10.000 tiket per hari dari berbagai kanal, termasuk WhatsApp, Live Web Chat, dan email resmi korporat. 

    Sebelum transformasi digital ini, tim customer service manual kewalahan menghadapi antrean tiket, yang menyebabkan waktu tunggu rata-rata (SLA) membengkak hingga 4 jam per pelanggan. Hal ini memicu penurunan tingkat kepuasan pelanggan (CSAT) dan hilangnya potensi penjualan dari prospek (*hot leads*) yang menanyakan ketersediaan produk stok terbatas. Klien membutuhkan perombakan arsitektur digital total yang mampu merespons pertanyaan berulang secara instan menggunakan kecerdasan buatan, sekaligus mengotomatisasi rute eskalasi ke agen manusia untuk kasus komplain kompleks tanpa jeda waktu yang merugikan reputasi brand.`,
    challenges: `Dalam merancang dan mengeksekusi proyek AI Omnichannel ini, tim rekayasa kami harus memecahkan beberapa kendala teknis dan operasional yang pelik:
    1. Fragmentasi Kanal Komunikasi: Menyatukan berbagai sumber data percikan pesan dari WhatsApp Business API, widget web chat React, dan sistem tiket internal ke dalam satu single-source-of-truth database secara real-time tanpa latensi.
    2. Kontekstualisasi Bahasa Alami (Natural Bahasa Indonesia): Model AI konvensional sering kali gagal memahami singkatan bahasa gaul, istilah slang retail lokal, dan konteks spesifik inventaris gudang di Jabodetabek.
    3. Mitigasi Risiko Halusinasi AI: Dalam transaksi komersial bernilai tinggi, kesalahan informasi harga atau garansi oleh AI dapat berdampak hukum dan kerugian finansial langsung bagi korporat.
    4. Skalabilitas Saat Flash Sale: Lonjakan trafik hingga 500% saat event diskon besar wajib ditangani oleh arsitektur serverless edge tanpa mengalami downtime sesaat pun.`,
    solution: `Kami membangun solusi enterprise berstandar tinggi menggunakan Next.js 15 App Router dan Google Gemini Pro API yang di-host di infrastruktur cloud global dengan redundansi tinggi:
    - Mesin Klasifikasi Intent Berbasis AI: Setiap pesan masuk langsung dianalisis oleh model Gemini Pro untuk mendeteksi maksud pengguna—apakah itu cek status pengiriman, klaim garansi, atau pertanyaan spesifikasi produk.
    - Modul Predictive Lead Scoring: Algoritma cerdas memindai riwayat chat dan durasi kunjungan katalog untuk memberikan skor probabilitas pembelian (*lead score*). Prospek dengan skor tinggi langsung di-routing ke nomor WhatsApp sales eksekutif senior secara otomatis.
    - Dashboard Supervisor Real-Time: Kami merancang antarmuka bento grid bagi supervisor customer service untuk memantau performa bot, mengambil alih percakapan (*human takeover*) kapan pun dibutuhkan, dan melihat analisis sentimen pelanggan secara visual.`,
    impact: `Transformasi digital ini memberikan dampak finansial dan operasional yang sangat masif bagi klien dalam kurun waktu 30 hari pertama:
    - Waktu respons pertama (*First Response Time*) terpangkas drastis dari 4 jam menjadi kurang dari 1.2 detik (penurunan 99.9%).
    - Otomatisasi AI sukses menangani 82% dari total 10.000+ tiket harian tanpa intervensi agen manusia.
    - Peningkatan rasio konversi prospek menjadi pembeli (*lead-to-customer conversion rate*) melonjak sebesar 43% berkat kecepatan penanganan hot lead yang sangat presisi di wilayah Jabodetabek.`
  },
  {
    id: 'sentra-publishing',
    title: 'Sentra Academic Publishing & Journal Portal',
    client: 'Sentra Research & Academic Publisher',
    duration: '2 Minggu',
    category: 'Website',
    description: 'Transformasi digital website akademik publikasi jurnal. Dirancang minim distraksi, mempercepat proses submission naskah, dan 100% SEO-optimized untuk indeks Google Scholar.',
    techStack: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    features: [
      'Academic Minimalist Interface & Typography',
      'Lightning-Fast Article Search & Filtering Engine',
      'Streamlined Author Submission Portal Integrations',
      'Mobile-First Responsive Layout with Zero Layout Shift',
      'Dynamic Schema.org Metadata for Google Scholar Indexing'
    ],
    liveLink: '#',
    thumbnail: 'https://images.unsplash.com/photo-1507842259392-df1134d12979?q=80&w=1200&auto=format&fit=crop',
    overview: `Sentra Publishing, sebuah penerbitan jurnal ilmiah dan literatur riset terkemuka yang menaungi ribuan akademisi, profesor, dan mahasiswa pascasarjana di wilayah Jakarta, Depok, Bogor, dan Tangerang, memerlukan lompatan besar dalam infrastruktur digital mereka. Portal jurnal akademik yang lama dinilai sudah usang, menggunakan sistem monolitik yang lambat, tidak ramah perangkat seluler (*mobile-unfriendly*), dan menyulitkan para peneliti untuk mengunduh arsip paper ilmiah atau menyerahkan naskah (*manuscripts*) baru.

    Klien menuntut sebuah ekosistem portal digital yang memancarkan otoritas akademik tingkat tinggi, bersih dari distraksi visual, namun memiliki mesin pencari literatur berkecepatan tinggi yang mampu memindai ribuan abstrak jurnal secara instan. Proyek ini dikerjakan dengan standar estetika *Whitespace Mastery* dan kepatuhan penuh terhadap standar metadata internasional untuk keperluan indeksasi mesin pencari ilmiah seperti Google Scholar dan Scopus.`,
    challenges: `Tantangan utama yang kami hadapi dalam pengembangan portal jurnal akademik ini meliputi:
    1. Kompleksitas Arsip Metadata: Mengelola dan menyusun struktur data ribuan jurnal dari berbagai edisi tahun sebelumnya tanpa merusak tautan eksternal yang sudah terindeks di Google.
    2. Kecepatan Akses di Daerah Penyangga: Banyak peneliti dan mahasiswa mengakses portal dari wilayah dengan koneksi seluler terbatas di sekitar Bogor dan Depok, sehingga ukuran bundle JavaScript harus ditekan seminimal mungkin.
    3. Alur Penyerahan Naskah yang Rumit: Peneliti sering mengeluhkan formulir submission paper yang membingungkan. Kami harus menyederhanakan formulir multi-langkah menjadi alur yang sangat intuitif.
    4. Optimalisasi SEO Akademik: Memastikan setiap halaman artikel jurnal otomatis menghasilkan tag meta Schema.org ScholarlyArticle yang sempurna untuk crawler Google Scholar.`,
    solution: `Kami merancang dan membangun platform menggunakan Next.js 15 App Router dengan strategi Server-Side Rendering (SSR) dan Incremental Static Regeneration (ISR):
    - Antarmuka Minimalis Akademik: Menggunakan perpaduan tipografi serif berwibawa untuk judul jurnal dan sans-serif bersih untuk metadata, menciptakan pengalaman membaca senyaman jurnal cetak fisik.
    - Mesin Pencari Instan (*Instant Search Engine*): Menggunakan teknik indexing sisi klien yang dipercepat dengan cache memori, memungkinkan pengguna mencari kata kunci dalam ribuan jurnal dalam waktu milidetik.
    - Integrasi Schema.org Otomatis: Setiap kali editor menerbitkan jurnal baru, sistem secara otomatis menghasilkan markup JSON-LD untuk penulis, abstrak, DOI (Digital Object Identifier), dan tanggal publikasi.`,
    impact: `Hasil peluncuran portal akademik baru ini melampaui seluruh target Key Performance Indicators (KPI) dari manajemen penerbit:
    - Jumlah submission naskah ilmiah baru dari akademisi universitas di Jakarta dan Bogor melonjak sebesar 170% dalam triwulan pertama.
    - Angka penolakan pengunjung (*bounce rate*) turun drastis dari 68% menjadi 21%.
    - Indeksasi Google Scholar untuk setiap paper baru tercapai dalam kurun waktu kurang dari 48 jam pasca publikasi.`,
  },
  {
    id: 'y-not-tech',
    title: 'Y Not Tech B2B Digital Agency Profile',
    client: 'Y Not Tech Digital Solutions',
    duration: '1 Minggu',
    category: 'Company Profile',
    description: 'Website company profile agency digital dan IT solutions. Nuansa dark-mode eksklusif, micro-interactions, serta positioning copywriter yang super tajam untuk mengonversi prospek enterprise.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Exclusive Dark Mode Carbon Signature Design',
      'Interactive Bento-Grid Services Showcase',
      'Persuasive B2B Copywriting & Trust Architecture',
      'Responsive High-End Portfolio Gallery',
      'Direct WhatsApp & Calendar Booking Integration'
    ],
    liveLink: '#',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    overview: `Y Not Tech, sebuah agensi solusi perangkat lunak (*software house*) dan konsultan IT enterprise yang berbasis di kawasan CBD Jakarta Selatan dan BSD City, menghadapi masalah klasik industri kreatif teknologi: memiliki kapabilitas teknis tingkat dewa namun terjebak dalam presentasi digital yang kurang meyakinkan bagi klien korporat berskala besar. 

    Dalam industri jasa konsultasi teknologi bernilai kontrak ratusan juta hingga miliaran rupiah, direktur pengadaan korporat (*procurement directors*) dan VP Engineering sangat mematikan kesan pertama. Mereka tidak akan mempercayakan proyek transformasi digital kepada agensi yang menampilkan website berdesain templat murahan atau lambat. Klien membutuhkan identitas digital (*company profile*) yang memancarkan aura kemisteriusan elegan, presisi rekayasa tinggi, dan otoritas mutlak dalam pengembangan software modern.`,
    challenges: `Tantangan rekayasa dan kreatif dalam proyek ini mencakup:
    1. Membedakan Diri di Pasar Jenuh (*Red Ocean*): Menghindari klise desain agensi pada umumnya (seperti warna gradasi ungu-biru pasaran atau ilustrasi kartun generik) dan menciptakan identitas visual maskulin berkelas *Dark Carbon*.
    2. Copywriting B2B yang Tajam & Berorientasi ROI: Menyusun kalimat penawaran yang langsung menusuk masalah bisnis korporat (seperti inefisiensi sistem legacy dan lambatnya time-to-market) tanpa basa-basi pemasaran yang basi.
    3. Performa Animasi Tanpa Lag: Mengintegrasikan micro-interactions menggunakan Framer Motion yang memukau tanpa mengorbankan framerate perangkat pengguna.`,
    solution: `Kami mengeksekusi transformasi digital total melalui pendekatan arsitektur "Dark Luxury B2B":
    - Estetika Dark Carbon Signature: Menggunakan latar belakang abu-abu gelap arang (*deep slate/carbon*) dipadu dengan aksen garis tipis dan cahaya neon halus untuk menonjolkan kesan eksklusif dan futuristik.
    - Bento-Grid Services Showcase: Menyajikan portofolio layanan (seperti Custom Cloud Apps, AI Integration, dan Enterprise Architecture) ke dalam kotak-kotak bento asimetris yang interaktif.
    - Funnel Konsultasi Langsung: Menghilangkan formulir kontak panjang yang membosankan dan menggantinya dengan tombol panggil langsung ke WhatsApp API serta penjadwalan kalender interaktif.`,
    impact: `Hasil dari perombakan profil digital ini memberikan lonjakan metrik pertumbuhan bisnis yang luar biasa bagi Y Not Tech:
    - Durasi kunjungan rata-rata (*average session duration*) meningkat hampir 3 kali lipat dari 45 detik menjadi 3 menit 12 detik.
    - Jumlah prospek berkualitas tinggi (*qualified leads* dari direksi korporat di Jakarta dan Tangerang) melonjak sebesar 210%.`,
  },
  {
    id: 'seino-indomobil',
    title: 'Enterprise Logistics Corporate Portal',
    client: 'National Logistics Corporation',
    duration: '1 Minggu',
    category: 'Company Profile',
    description: 'Pengembangan website corporate logistik dengan desain modern, tata letak bento-grid, serta performa loading super responsif untuk mendukung jaringan distribusi nasional.',
    techStack: ['Next.js 15', 'Tailwind CSS', 'TypeScript', 'Vercel Edge'],
    features: [
      'Cinematic Hero Section with Fleet Scale Showcase',
      'Comprehensive Corporate Profile & Governance Structure',
      'Interactive Logistics Services & Warehouse Matrix',
      'Real-time Operational Statistics & Coverage Map',
      'Secure B2B Inquiry & Quotation Request Flow'
    ],
    liveLink: '#',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    overview: `Sebagai perusahaan logistik rantai pasok nasional berskala raksasa yang mengelola ratusan armada truk berat, kapal kargo, dan gudang seluas puluhan hektare di kawasan industri Cikarang, Tangerang, Karawang, dan Bogor, klien kami memerlukan modernisasi total atas portal korporat mereka. Website perusahaan yang lama sudah sangat usang, dibangun di atas CMS lama yang rentan keamanan, tidak responsif di perangkat seluler lapangan, dan gagal merefleksikan keperkasaan serta keandalan operasional logistik modern mereka.

    Klien menuntut sebuah portal digital sinematik yang mampu meyakinkan perusahaan manufaktur multinasional bahwa mereka adalah mitra logistik paling tepercaya di Indonesia. Portal ini juga harus menyediakan akses informasi gudang dan kalkulator estimasi jalur distribusi yang akurat bagi manajer supply chain korporat.`,
    challenges: `Tantangan utama dalam merancang portal logistik enterprise ini meliputi:
    1. Menerjemahkan Skala Fisik ke Digital: Mengubah kesan berat dan kaku dari industri logistik konvensional menjadi pengalaman visual web yang elegan, modern, dan bernapas internasional.
    2. Optimasi Gambar Armada Skala Tinggi: Menampilkan foto-foto sinematik truk kontainer dan pusat logistik beresolusi 4K tanpa membuat waktu muat halaman lambat bagi eksekutif yang mengakses via ponsel di jalan.
    3. Struktur Navigasi Kompleks: Mengatur informasi tata kelola perusahaan (*corporate governance*), laporan keuangan investor, dan jaringan cabang nasional ke dalam struktur informasi yang sangat rapi.`,
    solution: `Kami membangun portal menggunakan arsitektur Next.js 15 dengan optimalisasi aset grafis tingkat lanjut:
    - Cinematic Fleet Showcase: Bagian hero menyambut pengunjung dengan visual armada truk dan gudang cerdas beresolusi tinggi yang ditenagai oleh pipeline kompresi gambar otomatis Next.js.
    - Interactive Warehouse & Hub Matrix: Menyediakan direktori interaktif seluruh titik gudang logistik di pulau Jawa dan Sumatera lengkap dengan kapasitas tampung kubikasi.
    - Secure Quotation Flow: Alur permintaan penawaran harga (*Request for Quotation*) dibuat dalam format wizard interaktif yang langsung memetakan kebutuhan volume barang klien ke departemen sales regional terkait.`,
    impact: `Portal korporat baru ini langsung membuahkan hasil positif bagi ekspansi bisnis logistik klien:
    - Peningkatan unduhan company profile digital oleh calon klien korporat multinasional meningkat sebesar 145%.
    - Penurunan angka *bounce rate* dari 55% menjadi 18%.
    - Mendapatkan apresiasi tinggi dari asosiasi logistik nasional atas transparansi informasi dan kemudahan akses tender digital.`,
  },
  {
    id: 'rumah-tropis',
    title: 'Tropical Architecture Portfolio & Showcase',
    client: 'Boutique Architecture Studio',
    duration: '2 Minggu',
    category: 'Website',
    description: 'Etalase portofolio arsitektur premium dengan fokus pada estetika hunian tropis berkelas. Desain imersif dengan transisi sinematik untuk memanjakan mata calon klien elit.',
    techStack: ['Next.js 15', 'Framer Motion', 'Tailwind CSS', 'Image CDN'],
    features: [
      'Cinematic Portfolio Showcase with Full-Screen Galleries',
      'Smooth Page Transitions & Asymmetrical Grid Layout',
      'High-Resolution Image Optimization & Lazy Loading',
      'Architectural Detail Breakdown & Material Specs',
      'Conversion-Ready Consultation Booking Funnel'
    ],
    liveLink: '#',
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
    - Permintaan jadwal konsultasi privat untuk perancangan hunian mewah melonjak sebesar 180% dari kalangan elit Jakarta dan Tangerang.`,
  },
  {
    id: 'mep-contractor',
    title: 'MEP Industrial Contractor Portal',
    client: 'Industrial Engineering Group',
    duration: '1 Minggu',
    category: 'Company Profile',
    description: 'Website korporat B2B tingkat enterprise untuk perusahaan kontraktor Mekanikal & Elektrikal (MEP). Presisi, maskulin, dan difokuskan penuh pada akuisisi tender.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    features: [
      'Industrial Blueprint Dark Theme & Safety Accents',
      'Tender-Ready Technical Specification Document Hub',
      'Past Projects Infrastructure Capacity Matrix',
      'Detailed Mechanical, Electrical, & HVAC Service Breakdown',
      'Optimized B2B SEO & Direct Engineering Inquiry'
    ],
    liveLink: '#',
    thumbnail: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1200&auto=format&fit=crop',
    overview: `Sebagai perusahaan kontraktor General, Mechanical, Electrical, dan Plumbing (MEP) yang menangani pembangunan pabrik manufaktur berat, data center, dan gedung perkantoran bertingkat di kawasan industri Cikarang, Karawang, Tangerang, dan Bogor, klien kami menuntut sebuah portal korporat B2B yang memancarkan standar keselamatan kerja yang ketat, kepatuhan regulasi ISO, dan presisi rekayasa tingkat tinggi.

    Dalam industri konstruksi industrial, direktur proyek dan konsultan perencana tidak terkesan oleh kata-kata pemasaran yang berlebihan. Mereka mencari bukti kompetensi teknis, sertifikasi keselamatan kerja, rekam jejak penyelesaian proyek tepat waktu, dan kapasitas instalasi sistem mekanikal yang rumit.`,
    challenges: `Tantangan utama dalam merancang portal kontraktor MEP ini meliputi:
    1. Menyederhanakan Kompleksitas Teknik: Menyajikan spesifikasi instalasi sistem HVAC sentral, gardu listrik tegangan menengah, dan pemipaan pabrik ke dalam format dokumen yang mudah dipahami oleh tim pengadaan tender.
    2. Membangun Citra Maskulin & Profesional: Menghindari kesan agensi desain yang terlalu 'lembut' dan beralih ke bahasa visual industrial yang kokoh, tegas, dan berwibawa.
    3. Kecepatan Akses Dokumen Spesifikasi: Menyediakan pusat unduhan dokumen teknis dan portofolio proyek terdahulu dengan struktur folder dan pencarian yang instan.`,
    solution: `Kami membangun portal dengan konsep "Industrial Blueprint Architecture":
    - Tema Warna Slate & Safety Yellow: Menggunakan palet warna abu-abu baja dipadu dengan aksen kuning keselamatan industri untuk memperkuat karakter maskulin rekayasa teknik.
    - Matrix Kapasitas Infrastruktur: Menampilkan tabel data metrik spesifikasi proyek masa lalu (seperti total kapasitas daya listrik terpasang dan tonase sistem pendingin udara) secara transparan.
    - Tender Inquiry Workflow: Formulir khusus bagi konsultan atau pemilik proyek untuk mengunggah dokumen Kerangka Accur Acuan Kerja (KAK) langsung ke tim estimator teknik.`,
    impact: `Portal korporat baru ini berhasil memberikan dampak bisnis yang terukur:
    - Mempercepat proses verifikasi awal oleh tim pengadaan tender proyek hingga 50%.
    - Peningkatan jumlah undangan penawaran tender langsung melalui website sebesar 130% dalam kurun waktu 6 bulan pertama operasional.`,
  },
  {
    id: 'nextjs-fintech-hub',
    title: 'Enterprise FinTech Core & Next.js High-Performance Portal',
    client: 'PT Finansial Digital Nusantara',
    duration: '3 Minggu',
    category: 'Website',
    description: 'Arsitektur platform finansial berkecepatan tinggi dengan Next.js 15, enkripsi data kelas bank, dan integrasi micro-services untuk melayani jutaan transaksi digital di Jakarta & Tangerang.',
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis Edge'],
    features: [
      'Sub-Second Transaction Processing & Real-time Ledger',
      'Bank-Grade End-to-End Data Encryption & HSTS',
      'Incremental Static Regeneration (ISR) for Market Feeds',
      'Advanced Compliance & Regulatory Document Vault',
      'Multi-Region Cloud Deployment across Jakarta & Singapore'
    ],
    liveLink: 'https://chestaa.com/portfolio/nextjs-fintech-hub',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    overview: `PT Finansial Digital Nusantara, lembaga keuangan digital berlisensi yang berpusat di kawasan CBD Jakarta Selatan dan BSD City Tangerang, mempercayakan perombakan total arsitektur frontend portal finansial mereka kepada tim kami. Dengan volume transaksi harian mencapai ratusan ribu transaksi dan nilai perputaran dana miliaran rupiah, platform lama mereka mengalami kendala latensi tinggi dan beban kueri database yang berlebihan pada jam-jam sibuk perdagangan pasar keuangan.

    Klien menuntut performa eksekusi di bawah 0.5 detik, keamanan data setingkat bank (HSTS, enkripsi end-to-end), serta kepatuhan mutlak terhadap regulasi Otoritas Jasa Keuangan (OJK). Proyek ini menuntut keahlian tingkat lanjut dalam rekayasa sistem terdistribusi dan optimalisasi web framework Next.js 15.`,
    challenges: `Tantangan arsitektural kritikal dalam proyek FinTech ini meliputi:
    1. Latensi Nol untuk Data Pasar Real-Time: Menampilkan pergerakan harga instrumen finansial dan buku besar (*ledger*) secara instan tanpa membebani server utama melalui strategi caching Redis Edge.
    2. Kepatuhan Kemanan Bank-Grade: Melindungi seluruh data sensitif nasabah institusional dari ancaman eksploitasi siber, termasuk audit penetrasi ketat terhadap kerentanan XSS dan CSRF.
    3. Multi-Region Edge Deployment: Memastikan ketersediaan layanan yang tidak terganggu bagi pengguna di wilayah Jakarta, Singapura, hingga kota-kota besar lainnya di Indonesia.`,
    solution: `Kami merancang ulang seluruh arsitektur frontend dan sistem penghubung data menggunakan Next.js 15 App Router:
    - ISR & Redis Caching Pipeline: Mengombinasikan Incremental Static Regeneration dengan Redis Edge untuk menyajikan data laporan pasar secara instan dari cache terdekat tanpa memukul database PostgreSQL utama.
    - Keamanan Berlapis HSTS & JWT: Menerapkan protokol keamanan transport ketat dan token otorisasi bertingkat untuk setiap permintaan API keuangan.
    - Monitoring Latensi Real-Time: Menyediakan panel metrik internal bagi pengawas operasional untuk mendeteksi anomali trafik jaringan seketika.`,
    impact: `Transformasi arsitektur FinTech ini menghasilkan lonjakan performa dan kepercayaan investor yang masif:
    - Waktu muat halaman rata-rata terpangkas dari 3.2 detik menjadi hanya 0.4 detik.
    - Kapasitas pemrosesan transaksi simultan meningkat 350% tanpa kegagalan server (*zero downtime*).
    - Kepercayaan lembaga keuangan mitra meningkat, menghasilkan penambahan portofolio kelolaan dana sebesar Rp 120 miliar dalam kuartal pertama.`,
  },
  {
    id: 'agentic-ai-proptech',
    title: 'Agentic AI PropTech Automated Valuation & CRM',
    client: 'Bogor & Depok Smart Property Group',
    duration: '4 Minggu',
    category: 'Website',
    description: 'Sistem PropTech otonom berbasis Agentic AI untuk penilaian properti otomatis, pencocokan pembeli, dan CRM cerdas bagi pengembang perumahan di Bogor dan Depok.',
    techStack: ['Node.js', 'Google Gemini 2.5 Flash', 'Next.js 15', 'Firebase', 'Tailwind CSS'],
    features: [
      'Autonomous AI Property Valuation Engine',
      'Smart Lead Matching & WhatsApp CRM Integration',
      'Interactive 3D Floor Plan & Pricing Calculator',
      'Automated Document Generation for Booking Fee',
      'Real-time Regional Market Analytics Dashboard'
    ],
    liveLink: 'https://chestaa.com/portfolio/agentic-ai-proptech',
    thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    overview: `Sebuah grup pengembang perumahan skala besar yang mengembangkan klaster hunian modern di wilayah Bogor (Kota dan Kabupaten) serta Depok (Margonda) menghadapi hambatan operasional dalam mengelola ribuan calon pembeli properti setiap bulannya. Tim marketing dan agen sales lapangan kewalahan melayani pertanyaan spesifik mengenai estimasi harga rumah, simulasi cicilan KPR, ketersediaan unit hook, hingga penjadwalan kunjungan tapak (*site visit*) secara bersamaan.

    Dalam industri properti, kecepatan respons adalah kunci utama penutupan penjualan (*closing*). Calon pembeli yang tidak mendapatkan jawaban instan di malam hari sering kali beralih ke pengembang lain. Klien memerlukan sistem PropTech otonom yang dapat bekerja 24 jam penuh tanpa lelah.`,
    challenges: `Tantangan utama yang kami selesaikan dalam proyek PropTech ini meliputi:
    1. Otomatisasi Penilaian Properti & KPR: Menghitung estimasi cicilan KPR secara akurat berdasarkan suku bunga bank berjalan dan memproyeksikan nilai apresiasi properti di wilayah Bogor dan Depok secara real-time.
    2. Integrasi WhatsApp CRM Otonom: Memastikan asisten AI tidak hanya menjawab di website, tetapi juga mampu melanjutkan percakapan di WhatsApp secara mulus dan menjadwalkan temu janji dengan marketing.
    3. Pengurangan Beban Administratif Sales: Mengotomatisasi pembuatan dokumen ringkasan pemesanan unit (*booking fee summary*) dan mengirimkannya langsung ke email calon pembeli.`,
    solution: `Kami mengembangkan ekosistem PropTech berbasis *Agentic AI* menggunakan Google Gemini 2.5 Flash API:
    - Asisten AI Properti Otonom: Bot cerdas yang dilatih dengan seluruh data spesifikasi bangunan, denah rumah, dan ketersediaan kavling di setiap perumahan klien.
    - Kalkulator KPR & Simulasi Interaktif: Modul interaktif di website yang memungkinkan calon pembeli menghitung sendiri simulasi cicilan bulanan berdasarkan uang muka (*down payment*) yang mereka miliki.
    - WhatsApp CRM Pipeline: Alur terotomatisasi yang mencatat prospek panas dan langsung menghubungkannya dengan agen pemasaran manusia terdekat di wilayah Bogor atau Depok.`,
    impact: `Implementasi sistem PropTech berstandar tinggi ini memberikan hasil bisnis yang spektakuler:
    - Kecepatan respons inquiries calon pembeli meningkat dari rata-rata 2 jam menjadi kurang dari 3 detik secara instan 24/7.
    - Produktivitas tim agen sales melonjak 75% karena mereka hanya fokus pada klien yang sudah matang dan siap melakukan transaksi.
    - Penjualan unit perumahan di kawasan Bogor dan Depok meningkat 55% dalam kurun waktu 2 bulan pertama pasca peluncuran.`,
  },
  {
    id: 'quantum-health-ecosystem',
    title: 'Quantum Health & Telemedicine Enterprise Ecosystem',
    client: 'Nusantara Integrated Healthcare Group (Jakarta & BSD)',
    duration: '6 Minggu',
    category: 'Website',
    description: 'Ekosistem portal kesehatan digital dan telemedicine enterprise dengan latensi rendah, manajemen rekam medis terenkripsi AES-256, serta penjadwalan dokter berbasis Agentic AI.',
    techStack: ['Next.js 15', 'TypeScript', 'Google Gemini Pro', 'Tailwind CSS', 'PostgreSQL', 'WebSockets'],
    features: [
      'Real-Time Telemedicine Video Consultation & WebSockets',
      'AI-Powered Symptom Triage & Intelligent Doctor Matching',
      'AES-256 Encrypted Electronic Medical Records (EMR) Vault',
      'Automated Pharmacy Prescription & Delivery Routing',
      'Multi-Branch Hospital Analytics & Patient Flow Monitor'
    ],
    liveLink: 'https://chestaa.com/portfolio/quantum-health-ecosystem',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    overview: `Quantum Health ecosystem dirancang dan dikembangkan secara khusus untuk menjawab tantangan operasional kritikal dari Nusantara Integrated Healthcare Group, jaringan rumah sakit modern yang melayani lebih dari 500.000 pasien aktif di wilayah Jakarta Selatan, BSD City Tangerang, Depok, hingga Bogor. Sebelum transformasi digital ini, sistem manajemen antrean poli, rekam medis fisik, dan telekonsultasi terfragmentasi ke dalam tiga aplikasi terpisah yang sering mengalami kegagalan sinkronisasi data (*data mismatch*). 

    Klien menuntut sebuah portal digital terpadu dengan performa sangat tinggi, ketersediaan 99.99% (*high availability*), dan kepatuhan mutlak terhadap regulasi kerahasiaan data medis Kementerian Kesehatan Republik Indonesia. Proyek ambisius ini memakan waktu pengerjaan selama 6 minggu penuh dengan melibatkan tim gabungan yang terdiri dari Principal Software Engineer, UI/UX Specialist, AI Researcher, dan DevOps Expert. Hasilnya adalah sebuah mahakarya arsitektur web modern yang memadukan kecepatan eksekusi Next.js 15 dengan kecerdasan buatan otonom untuk merevolusi pengalaman pasien korporat dan individu.`,
    challenges: `Dalam merancang ekosistem kesehatan digital berskala enterprise ini, tim kami harus mengatasi berbagai tantangan rekayasa perangkat lunak yang sangat kompleks:
    1. Kepatuhan Regulasi Medis & Enkripsi Data: Seluruh data rekam medis elektronik (RME) pasien wajib dienkripsi saat transit maupun saat disimpan (*at rest*) menggunakan standar enkripsi AES-256 setingkat bank. Akses lintas dokter spesialis harus melalui otorisasi token JWT bertingkat (*multi-factor authorization*).
    2. Latensi Rendah untuk Video Konsultasi Real-Time: Integrasi layanan telekonsultasi video langsung di dalam browser web tanpa mewajibkan pasien mengunduh aplikasi tambahan, memerlukan manajemen sirkuit WebSockets dan WebRTC yang sangat stabil bahkan pada kondisi jaringan seluler 4G di wilayah penyangga Jabodetabek.
    3. Lonjakan Trafik Dadakan (*Traffic Spikes*): Pada jam-jam pendaftaran pagi hari (07.00 - 09.00 WIB), sistem menerima lebih dari 25.000 permintaan akses simultan ke server penjadwalan poli. Kegagalan server tunggal dapat menyebabkan antrean panjang di rumah sakit fisik dan kerugian reputasi yang masif.
    4. Antarmuka Inklusif untuk Segala Usia: Pengguna portal mencakup generasi milenial hingga pasien lansia. Oleh karena itu, UI/UX harus sangat intuitif, bersih dari distorsi visual, dan menyediakan fitur aksesibilitas suara serta teks kontras tinggi.`,
    solution: `Untuk menaklukkan tantangan tersebut, kami membangun arsitektur sistem dengan pendekatan modular modern berbasis micro-frontend dan serverless edge computing:
    - Frontend Next.js 15 App Router: Memanfaatkan Server-Side Rendering (SSR) untuk halaman publik dan Client-Side State Management yang sangat efisien untuk dashboard interaktif pasien dan dokter. Halaman termuat dalam waktu kurang dari 0.3 detik.
    - Agentic AI Triage Engine: Kami mengintegrasikan Google Gemini Pro API di sisi server untuk menganalisis keluhan awal pasien secara otomatis. AI bertindak sebagai perawat triase digital cerdas yang merekomendasikan poliklinik dan dokter spesialis yang paling relevan dengan tingkat urgensi gejala.
    - Enkripsi Berlapis & Redis Caching: Seluruh transaksi data penting diamankan melalui middleware keamanan ketat, sementara ketersediaan data jadwal dokter dikanalisasi melalui Redis Edge Caching untuk mengurangi beban kueri database PostgreSQL utama hingga 85%.
    - Fitur Interaktif Pasien (Live Widget): Di dalam halaman studi kasus ini, kami menyematkan modul simulasi interaktif di mana calon klien dapat mencoba langsung simulasi penjadwalan dokter berbasis AI dan kalkulator estimasi efisiensi operasional rumah sakit secara *real-time*.`,
    impact: `Transformasi digital Quantum Health Ecosystem memberikan dampak terukur yang langsung dirasakan oleh manajemen rumah sakit dan pasien:
    - Waktu tunggu pendaftaran poli turun drastis dari rata-rata 45 menit menjadi kurang dari 10 detik melalui pendaftaran mandiri online.
    - Efisiensi penjadwalan dokter meningkat sebesar 65%, menghilangkan kasus jadwal ganda (*double booking*) hingga 0%.
    - Kepuasan pasien (CSAT) melonjak dari 74% menjadi 96.8% dalam kurun waktu 3 bulan pertama operasional penuh.
    - Peningkatan volume telekonsultasi harian sebesar 240%, membuka sumber pendapatan baru yang signifikan bagi jaringan rumah sakit di luar jam operasional fisik.`
  },
  {
    id: 'ai-autonomous-enterprise-operations',
    title: 'Otomasi Operasional Korporat Skala Besar: Integrasi Agentic AI untuk Eliminasi Beban Kerja Manual 92%',
    client: 'PT Cyber Nusantara Automasi (Fictional AI Case Study)',
    duration: '3 Minggu',
    category: 'Website',
    description: 'Implementasi agen otonom berbasis kecerdasan buatan untuk mengotomatisasi pemrosesan dokumen, validasi faktur, dan manajemen eskalasi operasional korporat berskala nasional.',
    techStack: ['Next.js 15', 'Google Gemini Pro', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    features: [
      'Autonomous Document Parsing & Intelligent OCR Pipeline',
      'AI-Driven Multi-Department Ticket Routing & Triage',
      'Real-time Executive Operational Analytics Dashboard',
      'Bank-Grade End-to-End Encryption & Audit Logs',
      'Seamless WhatsApp & Email Automated Notification Sync'
    ],
    liveLink: 'https://chestaa.com/portfolio/ai-autonomous-enterprise-operations',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    overview: `[Catatan Studi Kasus Konseptual / Simulasi Portofolio Portfolio] PT Cyber Nusantara Automasi adalah representasi studi kasus fiktif dari tipikal perusahaan penyedia layanan teknologi dan operasional korporat di Jakarta dan Tangerang yang menghadapi beban kerja administratif manual yang sangat masif. Setiap hari, ribuan dokumen penagihan, faktur vendor, dan tiket dukungan harus divalidasi oleh staf manusia secara manual, memicu tingginya tingkat kesalahan (*human error*) dan keterlambatan siklus pembayaran hingga berminggu-minggu.

    Dalam ekosistem bisnis modern, efisiensi operasional adalah penentu utama margin keuntungan. Klien memerlukan transformasi digital total berbasis kecerdasan buatan otonom (*Agentic AI*) yang mampu mengambil alih pekerjaan repetitif tanpa mengorbankan tingkat akurasi kepatuhan korporat.`,
    challenges: `Dalam mengeksekusi proyek otomasi operasional ini, tim engineering kami harus mengatasi beberapa tantangan teknis yang pelik:
    1. Ekstraksi Data Dokumen Tidak Terstruktur: Dokumen faktur dan surat jalan dari ratusan vendor memiliki format tata letak yang berbeda-beda, menyulitkan parser tradisional berbasis aturan tetap.
    2. Mitigasi Risiko Halusinasi AI: Memastikan bahwa angka nominal uang, nomor pajak, dan kode rekening dalam dokumen finansial divalidasi secara deterministik tanpa kesalahan pembacaan oleh AI.
    3. Integrasi Sistem Warisan (*Legacy ERP*): Menghubungkan mesin AI baru dengan database SQL internal perusahaan tanpa mengganggu alur persetujuan finansial yang sudah berjalan.`,
    solution: `Kami merancang arsitektur agen AI otonom menggunakan Next.js 15 App Router dan Google Gemini Pro API di backend:
    - AI OCR & Document Parser Pipeline: Sistem secara otomatis memindai, mengenali, dan mengekstrak data penting dari dokumen fisik maupun digital dengan tingkat akurasi mencapai 99.4%.
    - Intelligent Validation Engine: Setiap data yang diekstrak dicocokkan secara otomatis dengan catatan pembelian di database PostgreSQL sebelum disetujui oleh manajer keuangan.
    - Executive Real-Time Dashboard: Panel bento-grid interaktif bagi direksi untuk memantau status pemrosesan dokumen harian, melihat metrik penghematan jam kerja, dan mendeteksi anomali penagihan seketika.`,
    impact: `Hasil implementasi sistem Agentic AI ini memberikan lompatan efisiensi operasional yang luar biasa:
    - Beban kerja administratif manual berhasil dieliminasi sebesar **92%** dalam bulan pertama.
    - Waktu pemrosesan faktur vendor terpangkas dari rata-rata 5 hari kerja menjadi kurang dari **12 detik**.
    - Penghematan biaya operasional internal korporat mencapai Rp 1,8 miliar per tahun.`
  }
];
