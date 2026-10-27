export interface SeoTargetQuery {
  id: string;
  query: string;
  category: 'brand' | 'local' | 'service';
  targetUrl: string;
  targetLocale: 'id' | 'en';
  expectedKeywords: string[];
  minInlinksRequired: number;
}

export const TARGET_QUERIES: SeoTargetQuery[] = [
  // 1-4. Brand Queries
  {
    id: 'brand-chestaa',
    query: 'chestaa',
    category: 'brand',
    targetUrl: '/id',
    targetLocale: 'id',
    expectedKeywords: ['chestaa', 'chestaa.com'],
    minInlinksRequired: 5,
  },
  {
    id: 'brand-chestaa-com',
    query: 'chestaa.com',
    category: 'brand',
    targetUrl: '/id',
    targetLocale: 'id',
    expectedKeywords: ['chestaa.com', 'chestaa'],
    minInlinksRequired: 5,
  },
  {
    id: 'brand-chesta-azka',
    query: 'chesta azka',
    category: 'brand',
    targetUrl: '/id/tentang',
    targetLocale: 'id',
    expectedKeywords: ['chesta azka', 'chesta azka sofyan'],
    minInlinksRequired: 3,
  },
  {
    id: 'brand-chesta-azka-sofyan',
    query: 'chesta azka sofyan',
    category: 'brand',
    targetUrl: '/id/tentang',
    targetLocale: 'id',
    expectedKeywords: ['chesta azka sofyan', 'chesta azka'],
    minInlinksRequired: 3,
  },

  // 5-9. Local High-Intent Queries
  {
    id: 'local-jasa-web-bsd',
    query: 'jasa pembuatan website bsd',
    category: 'local',
    targetUrl: '/id/jasa/pembuatan-website/bsd-city',
    targetLocale: 'id',
    expectedKeywords: ['jasa pembuatan website bsd', 'website bsd'],
    minInlinksRequired: 3,
  },
  {
    id: 'local-jasa-web-tangsel',
    query: 'jasa pembuatan website tangerang selatan',
    category: 'local',
    targetUrl: '/id/jasa/pembuatan-website/tangerang-selatan',
    targetLocale: 'id',
    expectedKeywords: ['jasa pembuatan website tangerang selatan', 'website tangsel'],
    minInlinksRequired: 3,
  },
  {
    id: 'local-jasa-web-bsd-city',
    query: 'jasa website bsd city',
    category: 'local',
    targetUrl: '/id/jasa/pembuatan-website/bsd-city',
    targetLocale: 'id',
    expectedKeywords: ['jasa website bsd city', 'bsd city'],
    minInlinksRequired: 3,
  },
  {
    id: 'local-jasa-web-pamulang',
    query: 'jasa website pamulang',
    category: 'local',
    targetUrl: '/id/jasa/pembuatan-website/pamulang',
    targetLocale: 'id',
    expectedKeywords: ['jasa website pamulang', 'pamulang'],
    minInlinksRequired: 3,
  },
  {
    id: 'local-jasa-ai-agent-bsd',
    query: 'jasa ai agent whatsapp bsd',
    category: 'local',
    targetUrl: '/id/jasa/ai-agent/bsd-city',
    targetLocale: 'id',
    expectedKeywords: ['jasa ai agent whatsapp bsd', 'ai agent whatsapp bsd'],
    minInlinksRequired: 3,
  },

  // 10-14. Broad Service Queries
  {
    id: 'service-jasa-pembuatan-website',
    query: 'jasa pembuatan website',
    category: 'service',
    targetUrl: '/id/jasa/pembuatan-website',
    targetLocale: 'id',
    expectedKeywords: ['jasa pembuatan website', 'pembuatan website'],
    minInlinksRequired: 5,
  },
  {
    id: 'service-jasa-ai-agent',
    query: 'jasa ai agent',
    category: 'service',
    targetUrl: '/id/jasa/ai-agent',
    targetLocale: 'id',
    expectedKeywords: ['jasa ai agent', 'ai agent whatsapp'],
    minInlinksRequired: 5,
  },
  {
    id: 'service-jasa-software-custom',
    query: 'jasa software custom',
    category: 'service',
    targetUrl: '/id/jasa/software-custom',
    targetLocale: 'id',
    expectedKeywords: ['jasa software custom', 'software custom'],
    minInlinksRequired: 5,
  },
  {
    id: 'service-jasa-otomasi-workflow',
    query: 'jasa otomasi workflow',
    category: 'service',
    targetUrl: '/id/jasa/otomasi-workflow',
    targetLocale: 'id',
    expectedKeywords: ['jasa otomasi workflow', 'otomasi workflow'],
    minInlinksRequired: 4,
  },
  {
    id: 'service-konsultan-ai-agent-indonesia',
    query: 'konsultan ai agent indonesia',
    category: 'service',
    targetUrl: '/id/jasa/ai-agent',
    targetLocale: 'id',
    expectedKeywords: ['konsultan ai agent indonesia', 'ai agent indonesia'],
    minInlinksRequired: 3,
  },
];
