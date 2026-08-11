export interface Article {
  slug: string;
  title: string;
  cat: string;
  date: string;
  readTime: string; // e.g. "7 MIN READ"
  readTimeMinutes: number; // e.g. 7
  desc: string;
  featured?: boolean;
  content: (string | { type: 'image'; url: string; alt: string })[];
  image?: string;
}

export const ALL_ARTICLES: Article[] = [
  {
    slug: 'jasa-website-premium-cisauk-bsd-gading-serpong',
    title: 'Jasa Pembuatan Website Premium di Cisauk, BSD, & Gading Serpong',
    cat: 'SEO & LOCAL',
    date: '02 JUN 2026',
    readTime: '4 MIN READ',
    readTimeMinutes: 4,
    desc: 'Mencari jasa pembuatan website profesional di area Cisauk, BSD City, atau Gading Serpong? CHESTADOTCOM by Chesta Azka Sofyan hadir menawarkan arsitektur digital kelas atas untuk UMKM.',
    featured: true,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    content: [
      "Halo para pemilik bisnis lokal! Perkenalkan, saya Chesta Azka Sofyan, founder dari CHESTADOTCOM, sebuah studio arsitektur digital yang mendedikasikan diri untuk merancang website berkinerja tinggi bagi bisnis dan UMKM.",
      "Jika Anda sedang mencari jasa pembuatan website premium di sekitar wilayah Cisauk, BSD City, hingga Gading Serpong, Anda berada di tempat yang tepat. Di era digital 2026, memiliki sekadar 'halaman web' tidak lagi cukup. Anda membutuhkan aset digital yang dirancang khusus untuk memukau calon klien sejak detik pertama.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', alt: 'Digital Agency Strategy' },
      "Melalui CHESTADOTCOM, saya membawa standar korporat multinasional ke dalam skala bisnis lokal. Fokus utama kami bukan hanya estetika belaka, melainkan performa esktrem (load time di bawah satu detik), integrasi SEO tingkat lanjut yang patuh pada standar algoritma Google terbaru, serta alur konversi (UX) yang secara psikologis mampu mendatangkan klien berkualitas.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop', alt: 'Web Design Process' },
      "Mengapa harus memilih layanan kami di area Cisauk dan sekitarnya? Karena komunikasi tatap muka bagi brand lokal terkadang jauh lebih efektif. Namun bagi Anda yang berada di luar daerah, seluruh alur diskusi kami dapat dilakukan 100% online secara profesional tanpa hambatan.",
      "Jangan biarkan bisnis Anda tertinggal karena representasi visual yang berantakan. Percayakan arsitektur digital Anda kepada Chesta Azka Sofyan dan biarkan nama brand Anda bersinar di halaman pertama mesin pencari."
    ]
  },
  {
    slug: 'mengenal-chestadotcom-chesta-azka-sofyan',
    title: 'Mengenal CHESTADOTCOM: Visi Digital Premium Chesta Azka Sofyan',
    cat: 'PERSONAL',
    date: '01 JUN 2026',
    readTime: '5 MIN READ',
    readTimeMinutes: 5,
    desc: 'Kisah di balik terbentuknya CHESTADOTCOM. Visi besar Chesta Azka Sofyan dalam mendigitalisasikan bisnis Indonesia dengan arsitektur web berkualitas tinggi namun terjangkau.',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1200&auto=format&fit=crop',
    content: [
      "Selamat datang di CHESTADOTCOM. Saya Chesta Azka Sofyan, sosok di balik layar yang merancang pengalaman UI/UX sinematik dan arsitektur kode di setiap baris proyek yang kami kerjakan.",
      "Visi di balik CHESTADOTCOM sangat sederhana namun fundamental: Saya, Chesta Azka Sofyan, ingin menjembatani para pemilik UMKM, kreator, dan entitas profesional dengan standar teknologi tingkat dunia. Seringkali, pembuatan website kelas korporat membutuhkan biaya puluhan juta. Kami hadir untuk mendisrupsi itu—menyediakan produk super premium dengan aksesibilitas harga yang wajar (mulai dari Rp540K).",
      { type: 'image', url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop', alt: 'Business Meeting' },
      "Nama CHESTADOTCOM dibangun atas semangat kerajinan digital (digital craftsmanship). Menggunakan ekosistem web modern (seperti Next.js dan Framer Motion), kami memastikan setiap desain yang diluncurkan tidak hanya cantik di permukaan, namun juga kokoh secara infrastruktur.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop', alt: 'Coding Workspace' },
      "Selain melayani jasa desain UI/UX dan web engineering, devlog ini akan menjadi tempat di mana saya membagikan riset terbaru seputar optimasi SEO, kiat-kiat memaksimalkan performa situs, hingga cara memanfaatkan AI guna mendominasi persaingan di Google pencarian.",
      "Komitmen saya adalah mengubah bisnis 'biasa' menjadi brand digital yang berwibawa tinggi. Mari berkolaborasi dan mendefinisikan ulang masa depan bisnis Anda bersama CHESTADOTCOM."
    ]
  },
  {
    slug: 'framework-seo-2026',
    title: 'Framework SEO 2026: Mengapa Desain UI Mempengaruhi Peringkat Google',
    cat: 'SEO',
    date: '15 MEI 2026',
    readTime: '7 MIN READ',
    readTimeMinutes: 7,
    desc: 'Google mulai memberi penalti pada website yang terlihat seperti template. Data menunjukkan desain kustom meningkatkan engagement 300% dan on-page time, faktor utama algoritma baru Google.',
    featured: true,
    image: 'https://placehold.co/800x400/131825/D4FF00?text=SEO+2026',
    content: [
      "Di tahun 2026, taktik optimasi SEO lawas seperti spamming kata kunci atau penumpukan backlink massal sudah tidak lagi relevan. Algoritma modern Google yang bertenaga AI kini berfokus sepenuhnya pada satu hal krusial: Signal Kepuasan Pengguna Nyata (Real User Engagement Signals).",
      "Perubahan terbesar dalam algoritma pencarian Google tahun ini adalah penalti otomatis terhadap website yang menggunakan template generik yang berulang. Sistem Chrome secara anonim mengumpulkan data perilaku pengguna, mendeteksi elemen 'pola bosan' (dwell fatigue). Website yang tampak identik dengan ribuan situs web lain di internet akan langsung tergeser oleh situs dengan pengalaman visual yang unik dan kustom.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', alt: 'SEO Data Analysis' },
      "Hasil penelitian independen terhadap startup di Jakarta membuktikan bahwa desain UI kustom yang orisinal mampu meningkatkan rata-rata waktu kunjungan (dwell time) hingga 300%. Pengunjung betah berlama-lama karena tata letak yang adaptif, transisi micro-interaction yang halus, dan tipografi yang sangat nyaman dibaca.",
      "Google mengukur interaksi ini melalui representasi Bounce-Back timing. Jika pengguna mengetik pencarian, mengklik situs Anda, lalu langsung menekan tombol kembali dalam waktu kurang dari 15 detik, hal tersebut mengirimkan sinyal kuat bahwa halaman Anda 'tidak berbobot'. Sebaliknya, website kustom premium yang memikat mata sejak detik pertama berhasil menjangkau on-page time di atas 2 menit secara stabil.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop', alt: 'Analytics Dashboard' },
      "Oleh karena itu, arsitektur visual bukan lagi urusan estetika belaka. Mendesain website dari nol berarti menanam fondasi SEO terkuat. Ketika performa loading di bawah satu detik berpadu dengan kepribadian visual yang kuat, Google mendeteksi tingginya loyalitas brand Anda — dan memberikan upvote organik ke halaman pertama."
    ]
  },
  {
    slug: 'kenapa-instagram-saja-tidak-cukup',
    title: 'Kenapa Instagram Saja Tidak Cukup untuk Bisnis Kamu',
    cat: 'STRATEGY',
    date: '12 MEI 2026',
    readTime: '5 MIN READ',
    readTimeMinutes: 5,
    desc: 'Algoritma Instagram berubah liar. Bisnis yang bertumpu 100% pada media sosial kehilangan kendali atas pelanggan mereka.',
    content: [
      "Media sosial adalah rumah kontrakan. Menggantungkan seluruh masa depan bisnis Anda pada Instagram atau TikTok berarti Anda siap menghadapi risiko digusur kapan saja tanpa peringatan terlebih dahulu.",
      "Dalam setahun terakhir, jangkauan organik (organic reach) Instagram kembali menyusut drastis demi memaksa pemilik bisnis membelanjakan lebih banyak uang untuk iklan Meta Ads. Postingan produk yang biasanya dilihat oleh ribuan pengikut kini hanya sampai ke layar segelintir orang. Perubahan algoritma secara tiba-tiba dapat langsung menghentikan arus masuk prospek bisnis Anda dalam semalam.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop', alt: 'Social Media App' },
      "Selain hilangnya kendali jangkauan, media sosial memiliki batasan fungsional yang fatal. Anda tidak dapat mengatur alur navigasi pelanggan Anda secara fleksibel. Mereka akan selalu dikelilingi oleh notifikasi pesan, iklan kompetitor, dan distraksi video menarik lainnya tepat saat mereka melihat halaman profil Instagram Anda.",
      "Kehadiran website kustom premium bertindak sebagai 'Hub Utama' dari bisnis Anda. Di sini, Anda memegang 100% kontrol atas narasi, psikologi, dan alur konversi. Pengunjung tidak akan diganggu oleh kompetitor. Mereka mengalami perjalanan brand yang konsisten, profesional, dan tepercaya dari atas hingga bawah.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop', alt: 'Professional Workspace' },
      "Mari jadikan media sosial sebagai 'Spoke' (saluran penarik perhatian) dan website premium sebagai 'Hub' (mesin penutup penjualan). Itulah cara brand papan atas mengamankan stabilitas bisnis jangka panjang mereka di era digital."
    ],
    image: 'https://placehold.co/800x400/131825/D4FF00?text=Instagram+vs+Website'
  },
  {
    slug: 'website-lemot-kehilangan-pembeli',
    title: 'Website Lemot = Kehilangan 40% Calon Pembeli',
    cat: 'PERFORMANCE',
    date: '08 MEI 2026',
    readTime: '4 MIN READ',
    readTimeMinutes: 4,
    desc: 'Google sekarang membunuh peringkat website yang load time-nya di atas 2 detik. Ini arsitektur modern kita mengatasinya.',
    content: [
      "Satu detik pertama menentukan uang Anda. Statistik konversi digital global membuktikan bahwa setiap tambahan delay selama 100 milidetik pada saat loading website, akan langsung memotong tingkat konversi penjualan hingga sebesar 7%.",
      "Jika proses memuat website Anda membutuhkan waktu di atas 3 detik, sekitar 40% calon pelanggan Anda akan langsung menutup tab browser dan berpindah ke website kompetitor yang merespons lebih gesit. Pasar modern tidak memiliki ruang toleransi untuk keterlambatan informasi.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop', alt: 'Server Infrastructure' },
      "Di chestaadotcom, kami mengadopsi standar performa ekstrem. Kami menolak penggunaan framework berat yang menyisipkan ribuan baris sampah kode CSS dan Javascript yang tidak diperlukan. Dengan arsitektur modern berbasis Vite, aset gambar WebP terkompresi super ringkas, dan hosting CDN tier-1, kami memastikan website Anda tuntas dimuat dalam waktu kurang dari 1 detik.",
      { type: 'image', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop', alt: 'High Performance Tech' },
      "Kecepatan superior ini juga disenangi oleh Google Core Web Vitals (terutama metrik LCP dan INP). Website yang gesit akan diberikan kenaikan prioritas indeks pencarian secara signifikan dibandingkan website milik kompetitor Anda yang lambat dan penuh muatan overhead.",
      "Jangan biarkan konsep penawaran hebat produk Anda terbuang sia-sia hanya karena pengunjung tidak sabar menunggu loading layar kosong website Anda. Kinerja tinggi adalah syarat mutlak profesionalisme."
    ],
    image: 'https://placehold.co/800x400/131825/D4FF00?text=Website+Performance'
  },
  {
    slug: 'desain-murahan-merusak-profesionalisme',
    title: 'Desain Murahan Membuat Bisnis Terlihat Tidak Profesional',
    cat: 'DESIGN',
    date: '01 MEI 2026',
    readTime: '3 MIN READ',
    readTimeMinutes: 3,
    desc: 'Kesan pertama menentukan harga. Klien bersedia membayar mahal jika profil digital Anda terlihat sangat serius.',
    content: [
      "UI/UX yang buruk adalah pengusir prospek terandalkan. Psikologi konsumen menunjukkan bahwa keputusan pembelian bernilai tinggi (high-ticket sales) selalu dilandasi oleh rasa aman dan tingkat kepercayaan (trust).",
      "Ketika calon pembeli kelas atas mengunjungi website bisnis yang tampak murahan, menggunakan template asal jadi, dengan kombinasi warna acak, font default, dan tata letak berantakan, mereka akan langsung mengasosiasikan hal tersebut dengan kualitas layanan Anda.",
      "Formula logika pembeli sangat simpel: 'Jika website perusahaannya saja dikerjakan setengah hati, maka produk dan layanannya pun pasti berantakan.' Sebaliknya, desain kustom yang presisi, memiliki harmoni warna yang indah, dan layout yang seimbang memancarkan wibawa bisnis berkelas tinggi.",
      "Klien tidak lagi tawar-menawar harga jika sejak awal mereka disuguhi oleh presentasi digital premium yang berkelas. Investasi pada estetika eksklusif adalah jembatan tercepat mewujudkan positioning harga premium bagi produk UMKM unggulan Anda."
    ],
    image: 'https://placehold.co/800x400/131825/D4FF00?text=Professional+Design'
  },
  {
    slug: 'micro-interactions-rahasia-konversi',
    title: 'Micro-Interactions: Rahasia Konversi E-Commerce Premium',
    cat: 'UI/UX',
    date: '24 APR 2026',
    readTime: '6 MIN READ',
    readTimeMinutes: 6,
    desc: 'Bukan sekadar hiasan. Animasi kecil yang tepat dapat membimbing mata audiens langsung ke tombol checkout.',
    content: [
      "Banyak desainer mengira animasi adalah sarana kosmetik belaka untuk mempercantik tampilan luar halaman. Padahal, animasi fungsional berskala mikro (micro-interactions) adalah asisten pemandu bawah sadar yang sangat tepercaya.",
      "Saat pengguna menggerakkan kursor atau menyentuh layar, umpan balik (feedback) visual langsung harus diberikan secara instan namun berkelas. Misalnya, perubahan warna tombol yang halus, glow samar di tepian form aktif, atau gerakan ikon panah yang maju perlahan saat di-hover.",
      "Interaksi ini memicu dopamin positif di otak pengguna. Hal ini menciptakan kepuasan sensorik kecil yang membuat interaksi terasa hidup dan responsif. Pengguna merasa memiliki kendali penuh atas sistem digital yang sedang mereka operasikan.",
      "Selain kepuasan psikologis, micro-interactions bertugas mengalihkan arah mata audiens (eye-gaze control) langsung menuju elemen pemicu aksi (Call-To-Action/CTA) penting seperti tombol checkout atau form konsultasi secara natural.",
      "Kami menyusun animasi ini secara cermat menggunakan mesin performa ultra tinggi (Motion React). Tidak ada stutter, tidak ada pelambatan performa, murni dinamika interaksi kelas premium."
    ],
    image: 'https://placehold.co/800x400/131825/D4FF00?text=Micro+Interactions'
  },
  {
    slug: 'menulis-copywriting-membujuk',
    title: 'Menulis Copywriting yang Membujuk (Tanpa Terlihat Menjual)',
    cat: 'COPYWRITING',
    date: '18 APR 2026',
    readTime: '5 MIN READ',
    readTimeMinutes: 5,
    desc: 'Orang benci dijual, tapi suka membeli. Cara menggunakan brand storytelling untuk memicu keputusan emosional.',
    content: [
      "Di saat kotak masuk surel dan lini masa penuh dengan kepungan kata 'Beli Sekarang' atau 'Promo Terbatas', audiens Anda telah mengembangkan imunitas bawah sadar terhadap pesan promosi yang agresif.",
      "Strategi penulisan naskah (copywriting) modern beralih total ke arah penyelesaian masalah (problem-solving copywriting). Fokuslah pada transformasi hidup pelanggan Anda, bukan sekadar menjabarkan daftar panjang fitur teknis yang membosankan.",
      "Alih-alih menulis 'Kami menjual hosting 10GB super cepat', tulislah 'Kecepatan loading website kami memastikan calon pembeli Anda tidak akan menutup tab sebelum transaksi selesai.' Kaitkan spesifikasi produk langsung ke hasil akhir emosional dan finansial.",
      "Buatlah audiens merasa dipahami rasa frustrasinya sejak awal paragraf. Ketika mereka merasa empati Anda tulus, rasa waspada mereka akan melunak, digantikan oleh antusiasme alami untuk mengeksplorasi solusi yang Anda tawarkan.",
      "Teknik brand storytelling yang anggun ini tidak memaksa audiens bertindak, tetapi menyodorkan panggung logika rasional yang membuat pembelian terasa seperti keputusan cerdas mereka sendiri."
    ],
    image: 'https://placehold.co/800x400/131825/D4FF00?text=Copywriting'
  },
];
