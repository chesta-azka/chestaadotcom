export interface Project {
  id: string;
  title: string;
  client?: string;
  duration?: string;
  category: 'Website' | 'Landing Page' | 'Company Profile' | 'AI' | 'Enterprise';
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
    id: 'tanya-seo',
    title: 'TanyaSeo (Internal AI SEO Engine)',
    client: 'Chestaa Proprietary IP',
    duration: '1 Minggu',
    category: 'AI',
    description: 'Dikembangkan sebagai infrastruktur proprietary Chestaa. TanyaSeo adalah mesin intelijen berbasis kecerdasan buatan yang mengotomatisasi analisis kata kunci dan injeksi skema SEO.',
    techStack: ['Next.js 15', 'Google Gemini AI', 'TypeScript', 'Vercel Edge'],
    features: [
      'Automated SEO Keyword Intent Analysis',
      'Dynamic JSON-LD Schema Injection at Edge',
      'Sub-0.2s Query Latency Response',
      'Real-time Content Ranking Optimization'
    ],
    liveLink: 'https://chestaa.com/portfolio/tanya-seo',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    overview: 'TanyaSeo adalah mesin intelijen proprietary Chestaa yang mengotomatisasi analisis kata kunci dan injeksi skema SEO menggunakan kecerdasan buatan.',
    challenges: 'Memproses jutaan titik data kueri mesin pencari dengan latensi sub-detik tanpa membebani server utama.',
    solution: 'Implementasi arsitektur edge computing Next.js 15 dengan model Gemini 2.5 Flash yang sangat optimal.',
    impact: 'Pencapaian 0.2s query latency dan 100% indeksasi otomatis seluruh halaman sitemap.'
  },
  {
    id: 'rumah-tropis',
    title: 'Rumah Tropis (PropTech Web Architecture)',
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
    overview: 'Sebuah biro arsitektur butik elit yang mengkhususkan diri pada perancangan hunian tropis mewah, vila privat, dan resor komersial di kawasan perbukitan Bogor, BSD City, dan Pondok Indah Jakarta Selatan.',
    challenges: 'Manajemen aset gambar 4K tanpa lag dengan transisi galeri yang mulus dan instan.',
    solution: 'Galeri layar penuh sinematik dengan progressive blur-up loading dan optimasi edge cdn.',
    impact: 'Durasi sesi pengunjung meningkat lebih dari 4 menit per kunjungan dengan lonjakan konsultasi 180%.'
  },
  {
    id: 'chestaa-nexus',
    title: 'Chestaa Nexus (Autonomous B2B CRM)',
    client: 'Chestaa Internal Infrastructure',
    duration: '3 Minggu',
    category: 'Enterprise',
    description: 'Sistem CRM internal yang ditenagai Karyawan AI untuk mengotomatisasi kualifikasi prospek B2B dan sinkronisasi real-time ke Firestore.',
    techStack: ['React 19', 'Firebase Firestore', 'Gemini AI', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Autonomous B2B Lead Qualification',
      'Real-time Firestore State Sync',
      '60-Second Instant WhatsApp Handover',
      'Automated Profit Leakage Calculation'
    ],
    liveLink: 'https://chestaa.com/portfolio/chestaa-nexus',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    overview: 'Sistem CRM internal yang ditenagai Karyawan AI untuk mengotomatisasi kualifikasi prospek B2B dan sinkronisasi data secara real-time.',
    challenges: 'Menghilangkan biaya administrasi manual dalam kualifikasi prospek inbound harian.',
    solution: 'Infrastruktur Karyawan AI otonom yang merespons prospek dalam waktu di bawah 60 detik.',
    impact: 'Pengurangan biaya administrasi 100% dan respon prospek instan 60 detik.'
  }
];
