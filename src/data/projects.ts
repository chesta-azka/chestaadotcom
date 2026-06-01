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
