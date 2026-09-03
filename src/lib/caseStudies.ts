export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  client: string;
  impact: string;
  desc: string;
  roi: string;
  image?: string;
  generated_by_ai?: boolean;
}

export const caseStudyDB: CaseStudy[] = [
  { id: 1, slug: 'nexus-bank', title: 'Fintech Scaling', client: 'Nexus Bank', impact: '+340% Conversions', desc: 'Rewriting a fragile legacy SPA into a robust Next.js App Router architecture, eliminating hydration errors and drastically improving SEO.', roi: 'Saved $2.4M in annual server operational costs by transitioning to Edge caching.', image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, slug: 'aura-store', title: 'Global E-Commerce', client: 'Aura Store', impact: '-80% Load Time', desc: 'Implemented edge caching, optimized image delivery, and aggressive static generation to ensure instant load times globally.', roi: 'Mobile checkout abandonment dropped by 45% within the first month.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200' },
  { id: 3, slug: 'caresync', title: 'Healthcare Portal', client: 'CareSync', impact: 'Zero Downtime', desc: 'Migrated monolithic infrastructure to decoupled microservices with strict HIPAA-compliant data layers.', roi: 'Improved patient onboarding speed by 60%, increasing clinic throughput.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200' },
  { id: 4, slug: 'metricflow', title: 'SaaS Dashboard', client: 'MetricFlow', impact: 'Sub-50ms TTFB', desc: 'Re-architected client-side heavy dashboards into Server Components, streaming data directly to the view.', roi: 'Enterprise retention increased by 15% due to improved perceived performance.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200', generated_by_ai: true },
  { id: 5, slug: 'lumina-tech', title: 'AI Integration', client: 'Lumina Tech', impact: '2.5x Engagement', desc: 'Embedded contextual AI models directly into the workflow using server-side Gemini API streams.', roi: 'User session length increased from 4 minutes to 11 minutes on average.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200', generated_by_ai: true },
  { id: 6, slug: 'freightx', title: 'Logistics Tracker', client: 'FreightX', impact: 'Real-time Sync', desc: 'Built a globally distributed WebSocket layer replacing legacy long-polling systems.', roi: 'Reduced dispatch errors by 92% saving $800k in misrouting.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200' },
  { id: 7, slug: 'learnsmart', title: 'EdTech Platform', client: 'LearnSmart', impact: '1M+ Concurrent', desc: 'Scaled the video delivery and interactive quiz modules using Next.js caching and CDN edge networks.', roi: 'Supported a 10x traffic spike during national exams flawlessly.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200' },
  { id: 8, slug: 'estatehub', title: 'PropTech CRM', client: 'EstateHub', impact: 'Automated Workflows', desc: 'Integrated robust headless CMS capabilities with dynamic routing for tens of thousands of properties.', roi: 'Agent listing time reduced from 2 hours to 15 minutes per property.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200' },
];

