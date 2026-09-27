export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  category: string;
  shortDesc: string;
  image: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'rumah-tropis',
    title: 'Tropical Architecture Portfolio & Showcase',
    client: 'Boutique Architecture Studio',
    category: 'Web Architecture',
    shortDesc: 'Etalase portofolio arsitektur premium dengan fokus pada estetika hunian tropis berkelas, transisi sinematik, dan optimasi gambar 4K sub-detik.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Next.js 15', 'Framer Motion', 'Tailwind CSS', 'Image CDN'],
    metrics: [
      { label: 'Kecepatan Render', value: '< 0.3s' },
      { label: 'Lonjakan Booking', value: '+180%' },
      { label: 'Skor Estetika', value: '100%' }
    ],
    featured: true
  },
  {
    slug: 'ai-omnichannel-bsd',
    title: 'AI Omnichannel Customer Service & Lead Scoring',
    client: 'Enterprise Retailer BSD City',
    category: 'AI Automation',
    shortDesc: 'Sistem customer service otomatis berbasis Agentic AI yang memproses 10,000+ tiket per hari dari WhatsApp, Email, dan Web.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Next.js 15', 'Google Gemini Pro', 'WhatsApp API', 'Cloud SQL'],
    metrics: [
      { label: 'Resolusi Instan', value: '78%' },
      { label: 'Efisiensi Biaya', value: '45%' },
      { label: 'CSAT Score', value: '4.8/5' }
    ],
    featured: true
  }
];
