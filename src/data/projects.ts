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
}

export const PROJECTS: Project[] = [
  {
    id: 'sentra-publishing',
    title: 'Sentra Publishing Jurnal',
    client: 'Sentra Publishing',
    duration: '2 Minggu',
    category: 'Website',
    description: 'Transformasi digital website akademik publikasi jurnal. Dirancang minim distraksi, mempercepat proses submission naskah, dan 100% SEO-optimized untuk indek Google Scholar.',
    techStack: ['Next.js 15', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Academic Minimalist Interface',
      'Article Search & Filtering',
      'Submission Portal Integrations',
      'Mobile-First Layout',
      'Speed-Optimized Architecture'
    ],
    overview: 'Sentra Publishing membutuhkan sebuah ekosistem digital untuk menampilkan katalog jurnal dan paper secara bersih, terbaca, dan elegan, sekaligus mengundang pemikir untuk menyerahkan naskahnya tanpa fiksi.',
    challenges: 'Membuat antarmuka akademik yang seringkali kaku menjadi modern, estetik, dan meningkatkan persentase konversi submission penulis serta sitasi literatur.',
    solution: 'Membangun arsitektur website dengan fondasi Next.js 15 untuk load secepat kilat (0.8s) berbekal struktur data skema jurnal yang mendukung Rich Snippet SEO.',
    liveLink: 'https://www.dytama.com/portofolio/sentra-publishing-website-publikasi-jurnal',
    thumbnail: 'https://mczjhlevgmvtdndemjxw.supabase.co/storage/v1/object/public/dytamastorage/portofolio/kXTNQS3EzNpHyRbnCBzsG.png'
  },
  {
    id: 'y-not-tech',
    title: 'Y Not Tech Company Profile',
    client: 'Y Not Tech',
    duration: '1 Minggu',
    category: 'Company Profile',
    description: 'Website company profile agency digital dan IT solutions. Nuansa dark-mode eksklusif, micro-interactions, serta positioning copywriter yang super tajam untuk mengonversi prospek enterprise.',
    techStack: ['React', 'TypeScript', 'Lucide Icons'],
    features: [
      'Dark Mode Signature Design',
      'Services Bento-Grid',
      'Persuasive Copywriting Structure',
      'Responsive B2B Portfolio',
      'Direct WhatsApp Connect'
    ],
    overview: 'Y Not Tech hadir menyapa pasar IT dan digital dengan kebutuhan fondasi kredibilitas instan. Website ini diciptakan khusus menjadi armada "silent-salesman" yang bekerja 24 jam penuh.',
    challenges: 'Pasar IT Agency lokal sudah sangat jenuh. Y Not Tech membutuhkan pembeda yang mengomunikasikan kualitas premium dan kepercayaan elit hanya dari 3 detik pertama load.',
    solution: 'Mendisrupsi desain standar dengan "Coding-Minimalist Aesthetic". Warna hitam dominan dengan tipografi High-Contrast "Space Grotesk" yang berteriak inovasi mutakhir tanpa perlu banyak metafora.',
    liveLink: 'https://www.dytama.com/portofolio/y-not-tech',
    thumbnail: 'https://mczjhlevgmvtdndemjxw.supabase.co/storage/v1/object/public/dytamastorage/portofolio/mV_cIbrn4g_3EvlKpyXGN.png'
  },
  {
    id: 'seino-indomobil',
    title: 'Website Perusahaan Logistik Seino Indomobil',
    client: 'PT Seino Indomobil Logistics',
    duration: '1 Minggu',
    category: 'Website',
    description: 'Pengembangan website corporate logistik dengan desain modern, atau yang sering Anda dengar sebagai Seino Mobil. Dilengkapi navigasi seksi, bento-grid, dan performa loading super responsif.',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Modern Hero Section & Visual Skala',
      'Company Overview & Profil',
      'Logistics Services Showcase',
      'Operational Statistics',
      'Nationwide Coverage Section',
      'Responsive Design & SEO Friendly'
    ],
    overview: 'Kami mengembangkan website corporate untuk Seino Indomobil Logistics, sebuah perusahaan logistik raksasa yang melayani distribusi dan transportasi di berbagai wilayah Indonesia. Website ini dirancang untuk memperkuat citra perusahaan, meningkatkan kredibilitas bisnis, serta memudahkan calon klien dalam memahami layanan logistik yang ditawarkan dengan kecepatan muat halaman luar biasa.',
    challenges: 'Meningkatkan kredibilitas digital korporasi logistik nasional, menyampaikan informasi operasional dan skala armada secara jelas, serta memastikan website optimal untuk mesin pencari (SEO).',
    solution: 'Merancang website dengan pendekatan modern kelas dunia yang menonjolkan armada logistik, jaringan distribusi nasional, dan layanan pengiriman yang jelas. Dioptimalkan untuk performa tinggi dan pencarian pelanggan lokal.',
    liveLink: 'https://www.dytama.com/portofolio/website-logistik-seino-indomobil',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop'
  }
];
