export const ROUTES = {
  CORE: {
    HOME: '/id',
    HOME_EN: '/en',
    ABOUT: '/id/about',
    ABOUT_EN: '/en/about',
    WORKFLOW: '/id/workflow',
    WORKFLOW_EN: '/en/workflow',
    TRUST: '/id/trust',
  },
  SERVICES: {
    HUB: '/id#layanan',
    LAYANAN: '/id#layanan',
    PEMBUATAN_WEBSITE: '/id/jasa/pembuatan-website',
    AI_AGENT: '/id/jasa/ai-agent',
    SOFTWARE_CUSTOM: '/id/jasa/software-custom',
    OTOMASI_WORKFLOW: '/id/jasa/otomasi-workflow',
    WEBSITE_DEVELOPMENT_EN: '/en/services/website-development',
    AI_AGENTS_EN: '/en/services/ai-agents',
    CUSTOM_SOFTWARE_EN: '/en/services/custom-software',
    WORKFLOW_AUTOMATION_EN: '/en/services/workflow-automation',
    // Legacy aliases retained for compatibility
    WEB_BSD: '/id/jasa/pembuatan-website/bsd-city',
    CONVERSION_MACHINE: '/id/jasa/pembuatan-website',
    AI_EMPLOYEE: '/id/jasa/ai-agent',
    AUTONOMOUS_ECOMMERCE: '/id/jasa/pembuatan-website',
    LANDING_PAGE: '/id/jasa/pembuatan-website',
    ENTERPRISE_INFRA: '/id/jasa/software-custom',
    CLOUD_ANTI_DOWN: '/id/jasa/software-custom',
    CYBERSECURITY: '/id/jasa/software-custom',
    SEO_AEO: '/id/jasa/pembuatan-website',
    PERFORMANCE_MARKETING: '/id/jasa/pembuatan-website',
    ASSET_PROTECTION: '/id/jasa/software-custom',
    SUPER_APP: '/id/jasa/software-custom',
    FRACTIONAL_CTO: '/id/jasa/software-custom',
    PROGRAMMATIC_SEO: '/id/jasa/pembuatan-website',
  },
  PORTFOLIO: {
    HUB: '/id/portfolio',
    HUB_EN: '/en/portfolio',
    CASE_STUDIES: '/id/case-studies',
    CASE_STUDIES_EN: '/en/case-studies',
  },
  KNOWLEDGE: {
    BLOG: '/id/blog',
    BLOG_EN: '/en/blog',
    INSIGHTS: '/id/blog',
    GLOSSARY: '/id/kamus-ai-teknologi',
  },
  ACADEMY: {
    HUB: '/id/academy',
    RESOURCES: '/id/academy/resources',
    QUIZ: '/id/quiz',
  },
  AREA: {
    BASE: '/id/area',
    BASE_EN: '/en/areas',
  },
  MANAGEMENT: {
    ADMIN: '/admin',
    AI_AUDIT: '/admin/ai-audit',
    PORTAL: '/portal',
  },
} as const;

export type AppRoute =
  (typeof ROUTES)[keyof typeof ROUTES][keyof (typeof ROUTES)[keyof typeof ROUTES]];
