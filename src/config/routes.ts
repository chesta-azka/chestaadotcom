export const ROUTES = {
  CORE: {
    HOME: '/',
    ABOUT: '/about',
    WORKFLOW: '/workflow',
    TRUST: '/trust'
  },
  SERVICES: {
    HUB: '/services',
    LAYANAN: '/layanan',
    WEB_BSD: '/services/jasa-pembuatan-website-bsd-cisauk',
    CONVERSION_MACHINE: '/services/website-mesin-konversi',
    AI_EMPLOYEE: '/services/karyawan-digital-ai',
    AUTONOMOUS_ECOMMERCE: '/services/toko-online-otonom',
    LANDING_PAGE: '/services/landing-page-konversi',
    ENTERPRISE_INFRA: '/services/infrastruktur-digital-enterprise',
    CLOUD_ANTI_DOWN: '/services/infrastruktur-cloud-anti-down',
    CYBERSECURITY: '/services/keamanan-data-korporat',
    SEO_AEO: '/services/dominasi-pencarian-seo-aeo',
    PERFORMANCE_MARKETING: '/services/mesin-pelipatganda-roas',
    ASSET_PROTECTION: '/services/proteksi-aset-digital-sla',
    SUPER_APP: '/services/pengembangan-super-app-custom',
    FRACTIONAL_CTO: '/services/konsultasi-cto-eksekutif',
    PROGRAMMATIC_SEO: '/services/programmatic-seo-skala-besar'
  },
  PORTFOLIO: {
    HUB: '/portfolio',
    CASE_STUDIES: '/case-studies'
  },
  KNOWLEDGE: {
    BLOG: '/blog',
    INSIGHTS: '/insights',
    GLOSSARY: '/kamus-ai-teknologi'
  },
  ACADEMY: {
    HUB: '/academy',
    RESOURCES: '/academy/resources',
    QUIZ: '/quiz'
  },
  AREA: {
    BASE: '/area'
  },
  MANAGEMENT: {
    ADMIN: '/admin',
    AI_AUDIT: '/admin/ai-audit',
    PORTAL: '/portal'
  }
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES][keyof typeof ROUTES[keyof typeof ROUTES]];
