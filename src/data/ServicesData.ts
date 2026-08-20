import { Bot, Monitor, Search, ShoppingCart, Layout, TrendingUp, Wrench, Database, Globe, Code } from 'lucide-react';

export const SERVICES_DATA = [
  {
    slug: 'pembuatan-website',
    name: 'Jasa Pembuatan Website',
    title: 'Website Premium untuk Bisnis Anda',
    desc: 'Kami membangun website kustom yang cepat, SEO-friendly, dan didesain khusus untuk meningkatkan konversi dan kredibilitas brand Anda.',
    buttonText: 'Konsultasi Pembuatan Website',
    icon: Monitor,
    points: [
      { title: 'Desain Kustom', desc: 'UI/UX eksklusif tanpa menggunakan template pasaran.' },
      { title: 'Performa Tinggi', desc: 'Loading sangat cepat di bawah 2 detik untuk pengalaman terbaik.' },
      { title: 'SEO Optimized', desc: 'Struktur kode yang mudah dibaca oleh Google untuk ranking.' },
      { title: 'Mobile Responsive', desc: 'Tampil sempurna di berbagai ukuran layar smartphone.' }
    ],
    comparison: {
      title: 'Website Premium vs Template Murahan',
      theirs: {
        title: 'Biasa',
        items: ['Desain pasaran dan kaku', 'Loading lambat', 'Sulit ditemukan di Google', 'Keamanan rentan', 'Tidak responsif di HP']
      },
      ours: {
        title: 'CHESTADOTCOM',
        items: ['Desain kustom eksklusif', 'Performa ultra-ringan', 'Struktur SEO-ready', 'Keamanan tingkat tinggi', 'Mobile-first perfection']
      }
    },
    benefits: [
      { title: 'Kredibilitas Meningkat', desc: 'Desain profesional membuat klien langsung percaya.' },
      { title: 'Konversi Tinggi', desc: 'Alur yang jelas memandu pengunjung untuk menghubungi Anda.' },
      { title: 'Aset Jangka Panjang', desc: 'Website menjadi investasi yang terus mendatangkan traffic.' }
    ],
    faqs: [
      { q: 'Berapa lama proses pembuatannya?', a: 'Tergantung kompleksitas, biasanya memakan waktu 2 hingga 4 minggu.' },
      { q: 'Apakah saya bisa mengubah konten sendiri?', a: 'Tentu, kami menyediakan sistem CMS yang mudah digunakan.' },
      { q: 'Apakah ada biaya perpanjangan tahunan?', a: 'Ya, untuk domain dan hosting yang dibayarkan setiap tahun agar website tetap aktif.' },
      { q: 'Apakah sudah termasuk email bisnis (@nama-bisnis.com)?', a: 'Ya, kami menyediakan setup email bisnis sesuai dengan paket yang dipilih.' }
    ]
  },
  {
    slug: 'toko-online',
    name: 'Jasa Toko Online',
    title: 'Kembangkan Bisnis E-Commerce Anda',
    desc: 'Toko online berkecepatan tinggi dengan fitur checkout mulus yang dirancang untuk memaksimalkan penjualan dan memudahkan pengelolaan.',
    buttonText: 'Konsultasi Toko Online',
    icon: ShoppingCart,
    points: [
      { title: 'Sistem Katalog', desc: 'Manajemen produk, stok, dan variasi yang mudah.' },
      { title: 'Payment Gateway', desc: 'Terima pembayaran via bank transfer, e-wallet, dsb.' },
      { title: 'Ongkir Otomatis', desc: 'Integrasi dengan ekspedisi lokal secara real-time.' },
      { title: 'Notifikasi Order', desc: 'Pemberitahuan otomatis ke WhatsApp/Email pelanggan.' }
    ],
    comparison: {
      title: 'Toko Online Sendiri vs Marketplace',
      theirs: {
        title: 'Marketplace',
        items: ['Perang harga sangat ketat', 'Potongan biaya admin', 'Data pelanggan bukan milik Anda', 'Sewaktu-waktu akun bisa diblokir']
      },
      ours: {
        title: 'Toko Sendiri (Website)',
        items: ['Bangun brand eksklusif tanpa kompetitor di sebelah', 'Tanpa potongan admin', 'Kumpulkan database pelanggan 100%', 'Aset sepenuhnya milik Anda']
      }
    },
    benefits: [
      { title: 'Brand Lebih Premium', desc: 'Toko online sendiri memberikan kesan jauh lebih profesional.' },
      { title: 'Kontrol Penuh', desc: 'Atur diskon, promo, dan tampilan sesuka Anda.' },
      { title: 'Retargeting Mudah', desc: 'Pasang pixel untuk mengiklan kembali ke pengunjung.' }
    ],
    faqs: [
      { q: 'Platform apa yang digunakan?', a: 'Kami menggunakan Next.js / React untuk custom, atau Shopify / WooCommerce sesuai kebutuhan.' },
      { q: 'Berapa kapasitas produk yang bisa ditampung?', a: 'Tergantung paket hosting, namun pada dasarnya bisa ribuan produk.' },
      { q: 'Apakah bisa terintegrasi dengan WhatsApp?', a: 'Ya, kami bisa menambahkan fitur checkout via WhatsApp agar pembeli bisa langsung menghubungi Anda.' },
      { q: 'Apakah pembayaran otomatis (Payment Gateway)?', a: 'Bisa. Kami akan mengintegrasikan payment gateway agar Anda bisa menerima berbagai metode pembayaran.' }
    ]
  },
  {
    slug: 'sistem-informasi',
    name: 'Sistem Informasi',
    title: 'Sistem Informasi Manajemen Terintegrasi',
    desc: 'Bangun sistem informasi internal yang terstruktur, aman, dan dirancang khusus untuk mengotomatisasi proses operasional bisnis atau organisasi Anda.',
    buttonText: 'Konsultasi Sistem Informasi',
    icon: Bot,
    points: [
      { title: 'Database Relasional', desc: 'Penyimpanan data yang konsisten, aman, dan mudah diakses.' },
      { title: 'Dasbor Analitik', desc: 'Visualisasi grafik interaktif untuk keputusan bisnis cepat.' },
      { title: 'Manajemen Pengguna', desc: 'Sistem hak akses bertingkat dengan keamanan ketat (RBAC).' },
      { title: 'Ekspor Data Mudah', desc: 'Fitur ekpor laporan ke format Excel, PDF, atau CSV.' }
    ],
    comparison: {
      title: 'Sistem Terintegrasi vs Pembukuan Manual',
      theirs: {
        title: 'Buku & Spreadsheet Manual',
        items: ['Sering terjadi salah ketik (human error)', 'Rawan kehilangan atau kerusakan data', 'Sulit diakses di luar kantor', 'Memakan waktu lama untuk membuat rekap laporan']
      },
      ours: {
        title: 'Sistem Informasi CHESTA',
        items: ['Validasi data otomatis secara real-time', 'Pencadangan awan otomatis & aman', 'Akses instan dari berbagai perangkat (Mobile/PC)', 'Laporan analitis dihasilkan dalam satu detik']
      }
    },
    benefits: [
      { title: 'Efisiensi Operasional', desc: 'Kurangi pekerjaan berulang hingga lebih dari 60% dengan sistem otomatis.' },
      { title: 'Data Mutlak Akurat', desc: 'Menghindari duplikasi dan menjaga integritas laporan penting.' },
      { title: 'Keamanan Berlapis', desc: 'Perlindungan enkripsi end-to-end untuk semua data sensitif Anda.' }
    ],
    faqs: [
      { q: 'Apakah sistem bisa disesuaikan dengan alur bisnis kami?', a: 'Ya, kami merancang sistem 100% kustom sesuai SOP yang berjalan di bisnis Anda.' },
      { q: 'Berapa lama pengerjaan sistem informasi?', a: 'Pengerjaan sistem informasi berkisar antara 4 hingga 8 minggu tergantung pada skala kompleksitas modul.' },
      { q: 'Bagaimana dengan hak milik data?', a: 'Database sepenuhnya milik Anda. Kami membantu mengamankan server dan database di bawah akun Anda.' }
    ]
  },
  {
    slug: 'company-profile',
    name: 'Company Profile',
    title: 'Website Company Profile Kelas Dunia',
    desc: 'Ubah profil perusahaan Anda menjadi magnet kepercayaan visual. Desain elegan, responsif, dan performa tinggi untuk meyakinkan klien besar.',
    buttonText: 'Konsultasi Company Profile',
    icon: Globe,
    points: [
      { title: 'Storytelling Visual', desc: 'Desain editorial yang mempresentasikan visi, misi, dan nilai perusahaan.' },
      { title: 'Galeri Proyek Elegan', desc: 'Showcase portofolio kerja dengan motion yang imersif.' },
      { title: 'Optimasi Kecepatan Ekstrim', desc: 'Load time instan di bawah 1 detik untuk menyambut investor.' },
      { title: 'Formulir Kontak Profesional', desc: 'Integrasi WA dan email korporat untuk lead capture.' }
    ],
    comparison: {
      title: 'Company Profile Premium vs Profil PDF Biasa',
      theirs: {
        title: 'Profil PDF',
        items: ['Boring, tidak ada interaksi dinamis', 'Sulit diperbarui isinya dengan cepat', 'Tidak bisa dirayapi oleh mesin pencari Google', 'Ukuran file besar & memakan kuota klien']
      },
      ours: {
        title: 'Web Company Profile',
        items: ['Interaktif, modern, dan berkelas dunia', 'Modifikasi instan melalui panel CMS', 'SEO-ready untuk memenangkan tender regional', 'Akses instan tanpa download, ramah mobile']
      }
    },
    benefits: [
      { title: 'Kredibilitas Instant', desc: 'Membantu meyakinkan klien korporat dengan wajah digital berkelas.' },
      { title: 'Branding Mutakhir', desc: 'Menampilkan keunggulan brand Anda di atas kompetitor di industri.' },
      { title: 'Siap Iklan B2B', desc: 'Sempurna untuk landing page kampanye LinkedIn Ads atau Google Ads.' }
    ],
    faqs: [
      { q: 'Apakah kami dibantu menulis konten?', a: 'Ya! Tim kami membantu memoles struktur konten dan copywriting agar terlihat formal sekaligus memikat.' },
      { q: 'Apakah ada integrasi bahasa (multilingual)?', a: 'Bisa sekali. Kami mendukung setup multi-bahasa sesuai dengan target audiens global Anda.' }
    ]
  },
  {
    slug: 'landing-page',
    name: 'Landing Page',
    title: 'Halaman Konversi Penjualan Tinggi',
    desc: 'Landing page dengan copywriting tajam dan desain psikologis yang mengubah pengunjung menjadi pembeli langsung atau klien prospektif.',
    buttonText: 'Konsultasi Landing Page',
    icon: Layout,
    points: [
      { title: 'Copywriting Persuasif', desc: 'Menggunakan teknik copywriting untuk memicu tindakan.' },
      { title: 'Desain Fokus Konversi', desc: 'Tidak ada gangguan, satu tujuan jelas: konversi.' },
      { title: 'Integrasi WhatsApp', desc: 'Tombol yang langsung mengarahkan leads ke WA.' },
      { title: 'Fast Loading', desc: 'Loading instan untuk mencegah pengunjung pergi.' }
    ],
    comparison: {
      title: 'Landing Page vs Website Biasa',
      theirs: {
        title: 'Website Biasa',
        items: ['Banyak menu mengganggu', 'Informasi terpencar', 'Tidak spesifik untuk satu promo', 'Tingkat konversi (CTR) cenderung rendah']
      },
      ours: {
        title: 'Landing Page (LP)',
        items: ['Fokus pada 1 tujuan tindakan', 'Alur baca yang runtut dan persuasif', 'Sangat cocok untuk iklan berbayar (Ads)', 'Conversion rate sangat tinggi']
      }
    },
    benefits: [
      { title: 'ROAS Iklan Meningkat', desc: 'Traffic dari Ads tidak akan terbuang sia-sia.' },
      { title: 'Launch Cepat', desc: 'Dapat diselesaikan dalam waktu yang sangat singkat.' },
      { title: 'Testing Lebih Mudah', desc: 'Gampang di-split test (A/B testing) demi performa maksimal.' }
    ],
    faqs: [
      { q: 'Apakah landing page ini bisa untuk banyak produk?', a: 'Landing page idealnya digunakan untuk 1 produk spesifik agar fokus.' },
      { q: 'Apakah sudah termasuk copywriting?', a: 'Ya, kami membantu merangkai copywriting persuasif berdasarkan data produk Anda.' },
      { q: 'Apakah landing page ini mobile-friendly?', a: 'Pasti. Traffic iklan didominasi pengguna mobile, sehingga kami memprioritaskan performa di layar HP.' },
      { q: 'Apakah saya bisa melacak pengunjung?', a: 'Ya, kami akan memasang Meta Pixel / Google Analytics agar semua pengunjung dapat dilacak untuk retargeting.' }
    ]
  },
  {
    slug: 'aplikasi-web',
    name: 'Aplikasi Web',
    title: 'SaaS & Custom Web Application',
    desc: 'Kami merealisasikan ide digital inovatif Anda menjadi aplikasi berbasis web yang kuat, dinamis, aman, dan mudah diskalakan.',
    buttonText: 'Konsultasi Aplikasi Web',
    icon: Code,
    points: [
      { title: 'Teknologi Modern', desc: 'Dibangun menggunakan React, Next.js, dan Node.js terbaru.' },
      { title: 'Arsitektur Cloud', desc: 'Sanggup memproses trafik tinggi tanpa kendala performa.' },
      { title: 'Integrasi API Ketat', desc: 'Terhubung mulus ke payment gateway, logistik, atau SMS.' },
      { title: 'Desain GUI/UX Terbaik', desc: 'Sistem desain modern yang ramah pengguna dan atraktif.' }
    ],
    comparison: {
      title: 'Aplikasi Web Modern vs Software Desktop Konvensional',
      theirs: {
        title: 'Software Desktop',
        items: ['Harus diinstal secara manual pada setiap OS', 'Update sering rumit dan mengganggu', 'Sulit untuk sinkronisasi data antar cabang', 'Batas lisensi kaku dan rentan crash']
      },
      ours: {
        title: 'Aplikasi Web (SaaS)',
        items: ['Akses instan dari peramban di HP maupun Laptop', 'Pembaruan otomatis di background tanpa downtime', 'Sinkronisasi instan real-time via Cloud', 'Skalabilitas tak terbatas secara global']
      }
    },
    benefits: [
      { title: 'Model Bisnis Digital', desc: 'Siap digunakan untuk produk SaaS (Software-as-a-Service) yang menghasilkan pendapatan berulang.' },
      { title: 'Otomatisasi Penuh', desc: 'Hemat waktu & biaya overhead operasional.' },
      { title: 'Aset Berharga', desc: 'Aplikasi berteknologi tingkat tinggi menjadi IP perusahaan berharga.' }
    ],
    faqs: [
      { q: 'Dapatkah aplikasi web ini diunggah di Play Store?', a: 'Bisa. Kami dapat membungkus aplikasi web Anda menjadi format PWA (Progressive Web App) atau aplikasi mobile hybrid.' },
      { q: 'Apakah ada kontrak pemeliharaan bulanan-tahunan?', a: 'Kami menawarkan support pasca rilis 3 bulan gratis, setelah itu tersedia skema paket maintenance bulanan yang fleksibel.' }
    ]
  },
  {
    slug: 'seo',
    name: 'Jasa SEO',
    title: 'Dominasi Halaman Pertama Google',
    desc: 'Tingkatkan visibilitas organik bisnis Anda dan dapatkan calon pelanggan tertarget secara berkelanjutan tanpa biaya iklan terus-menerus.',
    buttonText: 'Konsultasi Jasa SEO',
    icon: Search,
    points: [
      { title: 'Keyword Research', desc: 'Mencari kata kunci spesifik yang paling menguntungkan.' },
      { title: 'On-Page SEO', desc: 'Optimasi struktur, meta tags, dan kecepatan website.' },
      { title: 'Off-Page SEO', desc: 'Membangun backlink berkualitas untuk menaikkan otoritas.' },
      { title: 'Laporan Transparan', desc: 'Pantau posisi keyword Anda setiap saat.' }
    ],
    comparison: {
      title: 'SEO vs Iklan Berbayar',
      theirs: {
        title: 'Iklan Berbayar',
        items: ['Traffic berhenti jika budget habis', 'Biaya klik semakin mahal', 'Persaingan harga (bidding)', 'Kurang membangun otoritas jangka panjang']
      },
      ours: {
        title: 'SEO (Organik)',
        items: ['Traffic terus berjalan 24/7', 'Investasi jangka panjang yang stabil', 'Membangun otoritas brand', 'Tingkat konversi lebih tinggi dan terpercaya']
      }
    },
    benefits: [
      { title: 'Traffic Gratis Setiap Hari', desc: 'Tidak perlu membayar per klik untuk setiap pengunjung.' },
      { title: 'Target Market Akurat', desc: 'Hanya mendatangkan orang yang sedang mencari solusi Anda.' },
      { title: 'Aset Digital Kuat', desc: 'Website Anda semakin tak terkalahkan di masa depan.' }
    ],
    faqs: [
      { q: 'Berapa lama agar bisa masuk halaman pertama?', a: 'Biasanya terlihat hasil signifikan dalam 3 hingga 6 bulan.' },
      { q: 'Apakah ada garansi halaman pertama?', a: 'Kami memberikan strategi terbaik, tapi tidak bisa memberi jaminan instan karena algoritma Google dinamis.' },
      { q: 'Apakah metode SEO yang digunakan aman?', a: 'Sangat aman. Kami hanya menggunakan metode White Hat SEO yang sesuai dengan pedoman Google.' },
      { q: 'Laporan apa saja yang akan saya terima?', a: 'Anda akan menerima laporan bulanan berupa peringkat kata kunci, jumlah trafik organik, dan evaluasi performa website.' }
    ]
  },
  {
    slug: 'digital-marketing',
    name: 'Jasa Digital Marketing',
    title: 'Strategi Marketing Berbasis Data',
    desc: 'Kami merancang dan mengeksekusi kampanye Meta Ads & Google Ads untuk menghasilkan leads atau penjualan yang terukur.',
    buttonText: 'Konsultasi Digital Marketing',
    icon: TrendingUp,
    points: [
      { title: 'Targeting Akurat', desc: 'Iklan hanya tayang ke orang yang benar-benar berminat.' },
      { title: 'Creative Ads', desc: 'Pembuatan gambar atau video untuk iklan.' },
      { title: 'Pixel & Tracking', desc: 'Pelacakan konversi yang presisi dan retargeting.' },
      { title: 'Scale Up', desc: 'Melipatgandakan budget saat kampanye terbukti profit.' }
    ],
    comparison: {
      title: 'Marketing Digital vs Tradisional',
      theirs: {
        title: 'Brosur/Baliho',
        items: ['Susah mengukur hasil jualan', 'Target pasar acak', 'Biaya awal sangat besar', 'Tidak bisa retargeting orang yang sudah lihat']
      },
      ours: {
        title: 'Digital Marketing',
        items: ['Angka penjualan bisa diukur (ROAS)', 'Mampu menargetkan minat dan demografi', 'Budget bisa dimulai dari kecil', 'Retargeting menghantui pelanggan terus']
      }
    },
    benefits: [
      { title: 'Hasil Cepat', desc: 'Traffic langsung datang begitu iklan aktif.' },
      { title: 'Biaya Terkontrol', desc: 'Bisa mengatur batas budget harian agar tidak jebol.' },
      { title: 'Omset Maksimal', desc: 'Kemudahan menjangkau seluruh Indonesia tanpa buka cabang.' }
    ],
    faqs: [
      { q: 'Budget iklan minimal berapa?', a: 'Sangat kami sarankan minimal Rp50.000 - Rp100.000 per hari untuk mendapatkan data.' },
      { q: 'Apakah ada jaminan penjualan?', a: 'Marketing adalah proses. Kami menjamin trafik yang relevan, tapi penjualan bergantung juga pada penawaran produk.' },
      { q: 'Platform apa saja yang digunakan?', a: 'Fokus utama kami adalah Meta Ads (Facebook & Instagram) dan Google Ads.' },
      { q: 'Apakah materi iklan dari saya atau agensi?', a: 'Kami bisa membantu membuatkan creative sederhana, namun amunisi video dari Anda akan jauh lebih natural dan efektif.' }
    ]
  },
  {
    slug: 'maintenance',
    name: 'Jasa Maintenance',
    title: 'Rawat Website Tetap Optimal',
    desc: 'Pastikan website Anda selalu dalam kondisi terbaik, aman dari serangan, dan terus up-to-date tanpa perlu Anda pikirkan pusingnya.',
    buttonText: 'Konsultasi Maintenance',
    icon: Wrench,
    points: [
      { title: 'Backup Rutin', desc: 'Penyimpanan data berkala agar file tidak hilang.' },
      { title: 'Update Keamanan', desc: 'Penutupan celah keamanan terhadap serangan hacker.' },
      { title: 'Monitoring Uptime', desc: 'Pemantauan 24/7 agar web tidak down tanpa disadari.' },
      { title: 'Optimasi Kecepatan', desc: 'Pembersihan file cache secara berkala agar tidak lambat.' }
    ],
    comparison: {
      title: 'Dikelola Ahli vs Dibiarkan Saja',
      theirs: {
        title: 'Dibiarkan Saja',
        items: ['Rentan diretas virus/malware', 'Loading makin lama berminggu-minggu lambatnya', 'Plugin/sistem usang/rusak', 'Kehilangan data jika server down']
      },
      ours: {
        title: 'Dimaintenance Kami',
        items: ['Aman 100% dari celah baru', 'Kecepatan terjaga optimal', 'Sistem paling mutakhir dan aman', 'Tersedia backup harian/mingguan']
      }
    },
    benefits: [
      { title: 'Fokus Berbisnis', desc: 'Serahkan pusingnya urusan teknis ke kami.' },
      { title: 'Performa Konsisten', desc: 'Pengunjung tetap merasakan website yang cepat kapanpun.' },
      { title: 'Penanganan Darurat', desc: 'Jika error, kami selesaikan dengan prioritas pertama.' }
    ],
    faqs: [
      { q: 'Berapa biaya maintenance bulanan?', a: 'Biaya tegantung jenis website, hubungi kami untuk rincian paketnya dimulai dari Rp250K.' },
      { q: 'Apakah termasuk update artikel?', a: 'Ya, pada paket tertentu, kami juga memasukkan upload artikel bulanan.' },
      { q: 'Apa bedanya dengan hosting biasa?', a: 'Kami tidak sekadar menyewakan server, tapi juga memastikan software, plugin, dan keamanan selalu update.' },
      { q: 'Bagaimana jika website terkena hack/error?', a: 'Jika berlangganan, kami akan segera melakukan perbaikan dan restorasi data dari backup terbaru tanpa biaya tambahan.' }
    ]
  }
  ,
  {
    slug: 'ai-agentic-dan-automation',
    name: 'AI Agentic & Automation',
    title: 'Otomatisasi Bisnis dengan AI (Kecerdasan Buatan)',
    desc: 'Tingkatkan efisiensi bisnis Anda dengan agen AI cerdas yang mampu bekerja 24/7 dan mengotomatiskan tugas-tugas repetitif.',
    buttonText: 'Konsultasi Implementasi AI',
    icon: Bot,
    points: [
      { title: 'AI Customer Service', desc: 'Chatbot pintar yang merespon pelanggan 24/7 seperti manusia.' },
      { title: 'Workflow Automation', desc: 'Otomatisasi pekerjaan repetitif antar aplikasi.' },
      { title: 'Data Analysis', desc: 'AI untuk menganalisa data bisnis dan memberikan insight strategis.' },
      { title: 'Agentic AI', desc: 'Sistem cerdas yang bisa mengambil tindakan mandiri sesuai aturan bisnis.' }
    ],
    comparison: {
      title: 'Kerja Manual vs Otomatisasi AI',
      theirs: {
        title: 'Manual',
        items: ['Jam kerja terbatas', 'Biaya operasional tinggi', 'Rentan human error', 'Proses lambat dan repetitif', 'Tergantung pada mood karyawan']
      },
      ours: {
        title: 'Otomatisasi AI',
        items: ['Siap bekerja 24/7 non-stop', 'Menghemat biaya operasional', 'Akurasi tinggi dan konsisten', 'Proses instan dan skalabel', 'Fokus pada pekerjaan strategis']
      }
    },
    benefits: [
      { title: 'Penghematan Waktu', desc: 'Bebaskan tim Anda dari tugas administratif repetitif.' },
      { title: 'Efisiensi Biaya', desc: 'Kurangi biaya operasional secara signifikan dalam jangka panjang.' },
      { title: 'Skalabilitas', desc: 'Siap menangani ratusan interaksi atau tugas secara bersamaan.' }
    ],
    faqs: [
      { q: 'Apakah AI bisa diintegrasikan dengan sistem yang sudah ada?', a: 'Sangat bisa. Kami merancang solusi AI yang terhubung langsung dengan sistem bisnis Anda seperti WhatsApp, CRM, atau ERP.' },
      { q: 'Berapa biaya untuk mengimplementasikan AI?', a: 'Biaya sangat bervariasi bergantung pada kompleksitas solusi. Mulai dari Rp 2.500.000 untuk AI sederhana.' },
      { q: 'Apakah data saya aman?', a: 'Ya, privasi dan keamanan data adalah prioritas kami dalam merancang solusi AI.' },
      { q: 'Apakah butuh keahlian khusus untuk menggunakan AI ini?', a: 'Tidak. Solusi kami didesain agar mudah dioperasikan oleh siapapun.' }
    ]
  }
];
