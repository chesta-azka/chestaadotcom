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
    slug: 'ai-omnichannel-bsd',
    title: 'AI Omnichannel Customer Service',
    client: 'Enterprise Retailer BSD',
    category: 'AI Automation',
    shortDesc: 'Sistem customer service otomatis berbasis Agentic AI yang memproses 10,000+ tiket per hari dari WhatsApp, Email, dan Web.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Node.js', 'Gemini Pro', 'WhatsApp API', 'Cloud SQL'],
    metrics: [
      { label: 'Resolusi Instan', value: '78%' },
      { label: 'Efisiensi Biaya', value: '45%' },
      { label: 'CSAT Score', value: '4.8/5' }
    ],
    featured: true
  },
  {
    slug: 'nextjs-ecommerce-cisauk',
    title: 'High-Performance E-Commerce',
    client: 'Local Fashion Brand',
    category: 'Web Development',
    shortDesc: 'Platform e-commerce modern dengan arsitektur headless yang meningkatkan conversion rate melalui kecepatan load sub-detik.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    techStack: ['Next.js', 'Tailwind', 'Stripe', 'Zustand'],
    metrics: [
      { label: 'Load Time', value: '< 0.8s' },
      { label: 'Conversion Rate', value: '+32%' },
      { label: 'Mobile Traffic', value: '85%' }
    ],
    featured: true
  }
];
