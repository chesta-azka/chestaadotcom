/**
 * Centralized 301 Redirect Configuration & Route Canonicalizer
 * Enforces the strict /id and /en route map across Express SSR (server.ts)
 * and React Router client navigation (src/App.tsx).
 */

import {
  SERVICE_ID_TO_EN_SLUG,
  resolveCanonicalServiceSlug,
} from '../data/service-slugs';
import {
  isValidAreaSlug,
  LEGACY_AREA_SLUG_ALIASES,
} from '../data/area-slugs';
import {
  BLOG_SLUGS_ID,
  BLOG_SLUGS_EN,
  resolveBlogAlternateSlug,
} from '../data/blog-slugs';

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * Legacy service slug aliases mapped to the 4 canonical ID service slugs
 */
export const LEGACY_SERVICE_REDIRECT_MAP: Record<string, string> = {
  'web-landing-page': 'pembuatan-website',
  'custom-web-development': 'pembuatan-website',
  'landing-page': 'pembuatan-website',
  'website-mesin-konversi': 'pembuatan-website',
  'jasa-pembuatan-website-toko-online': 'pembuatan-website',
  'arsitektur-headless-ecommerce': 'pembuatan-website',
  'dominasi-pencarian-seo-aeo': 'pembuatan-website',
  'website-development': 'pembuatan-website',
  'ai-integration': 'ai-agent',
  'whatsapp-ai-agent': 'ai-agent',
  'karyawan-digital-ai': 'ai-agent',
  'jasa-admin-whatsapp-ai-otomatis': 'ai-agent',
  'konsultan-integrasi-ai-korporat': 'ai-agent',
  'ai-agents': 'ai-agent',
  'custom-software': 'software-custom',
  'infrastruktur-digital-enterprise': 'software-custom',
  'pembuatan-erp-kustom-manufaktur': 'software-custom',
  'arsitektur-modernisasi-sistem-it': 'software-custom',
  'vendor-portal-b2b-distributor': 'software-custom',
  'aplikasi-kasir-pos-waralaba': 'software-custom',
  'sistem-antrean-klinik-kecantikan': 'software-custom',
  'software-akuntansi-umkm-tanpa-langganan': 'software-custom',
  'workflow-automation': 'otomasi-workflow',
};


/**
 * Legacy /area/:cityName consolidation map to canonical /id/area/:areaSlug
 */
export const LEGACY_AREA_REDIRECT_MAP: Record<string, string> = {
  'bsd-city': '/area/bsd-city',
  bsd: '/area/bsd-city',
  cisauk: '/area/cisauk',
  'rawa-buntu': '/area/bsd-city',
  'alam-sutera': '/area/alam-sutera',
  bintaro: '/area/bintaro',
  'bintaro-sektor-9': '/area/bintaro',
  'gading-serpong': '/area/gading-serpong',
  'gading-serpong-ruko': '/area/gading-serpong',
  'tangerang-selatan': '/area/tangerang-selatan',
  tangsel: '/area/tangerang-selatan',
  pamulang: '/area/pamulang',
  'pamulang-barat': '/area/pamulang',
  'jurang-mangu': '/area/jurang-mangu',
  'lebak-bulus': '/area/lebak-bulus',
  ciputat: '/area/ciputat',
  serpong: '/area/serpong',
  'serpong-utara': '/area/serpong-utara',
  'pasar-modern-bsd': '/area/bsd-city',
};

export const STATIC_REDIRECT_RULES: RedirectRule[] = [
  { source: '/', destination: '/id', permanent: true },
  { source: '/ind', destination: '/id', permanent: true },
  { source: '/eng', destination: '/en', permanent: true },
  { source: '/layanan', destination: '/id#layanan', permanent: true },
  { source: '/services', destination: '/en#layanan', permanent: true },
  { source: '/id/layanan', destination: '/id#layanan', permanent: true },
  { source: '/en/services', destination: '/en#layanan', permanent: true },
  { source: '/area', destination: '/id/area', permanent: true },
  { source: '/areas', destination: '/en/areas', permanent: true },
];

/**
 * Resolves whether an incoming request pathname must 301-redirect to a canonical /id or /en target.
 */
export function resolveRedirectTarget(rawPathname: string): string | null {
  if (!rawPathname) return null;

  const cleanPath = rawPathname.replace(/\/+$/, '') || '/';

  // Root redirect -> /id
  if (cleanPath === '/') {
    return '/id';
  }

  // Legacy /ind or /eng prefix -> /id or /en
  let locale: 'id' | 'en' = 'id';
  let hadLegacyPrefix = false;
  let hadValidPrefix = false;
  let barePath = cleanPath;

  if (cleanPath.startsWith('/en/eng/')) {
    locale = 'en';
    hadLegacyPrefix = true;
    barePath = cleanPath.slice('/en/eng'.length) || '/';
  } else if (cleanPath.startsWith('/id/ind/')) {
    locale = 'id';
    hadLegacyPrefix = true;
    barePath = cleanPath.slice('/id/ind'.length) || '/';
  } else if (cleanPath === '/ind' || cleanPath.startsWith('/ind/')) {
    locale = 'id';
    hadLegacyPrefix = true;
    barePath = cleanPath.slice(4) || '/';
  } else if (cleanPath === '/eng' || cleanPath.startsWith('/eng/')) {
    locale = 'en';
    hadLegacyPrefix = true;
    barePath = cleanPath.slice(4) || '/';
  } else if (cleanPath === '/id' || cleanPath.startsWith('/id/')) {
    locale = 'id';
    hadValidPrefix = true;
    barePath = cleanPath.slice(3) || '/';
  } else if (cleanPath === '/en' || cleanPath.startsWith('/en/')) {
    locale = 'en';
    hadValidPrefix = true;
    barePath = cleanPath.slice(3) || '/';
  } else if (
    cleanPath === '/areas' ||
    cleanPath === '/free-audit' ||
    cleanPath === '/privacy' ||
    cleanPath.startsWith('/services/')
  ) {
    locale = 'en';
  }

  const targetPrefix = locale === 'en' ? '/en' : '/id';

  // 1. /layanan or /services index -> anchor on home page
  if (barePath === '/layanan' || barePath === '/services') {
    return `${targetPrefix}#layanan`;
  }

  // 1A. /audit-gratis & /free-audit canonicalization
  if (barePath === '/audit-gratis' || barePath === '/free-audit') {
    const canonicalAudit = locale === 'en' ? '/en/free-audit' : '/id/audit-gratis';
    if (cleanPath !== canonicalAudit) {
      return canonicalAudit;
    }
    return null;
  }

  // 1B. /about & /tentang canonicalization: Indonesian -> /id/tentang, English -> /en/about
  if (
    barePath === '/about' ||
    barePath === '/tentang' ||
    barePath === '/tentang-kami' ||
    barePath === '/about-us'
  ) {
    const canonicalAbout = locale === 'en' ? '/en/about' : '/id/tentang';
    if (cleanPath !== canonicalAbout) {
      return canonicalAbout;
    }
    return null;
  }

  // 1B-Privacy. /privasi & /privacy canonicalization: Indonesian -> /id/privasi, English -> /en/privacy
  if (barePath === '/privasi' || barePath === '/privacy') {
    const canonicalPrivacy = locale === 'en' ? '/en/privacy' : '/id/privasi';
    if (cleanPath !== canonicalPrivacy) {
      return canonicalPrivacy;
    }
    return null;
  }

  // 1C. Blog index, pagination, legacy category redirects, and single-hop detail routing
  if (barePath === '/blog') {
    const canonicalBlogHub = locale === 'en' ? '/en/blog' : '/id/blog';
    if (cleanPath !== canonicalBlogHub) {
      return canonicalBlogHub;
    }
    return null;
  }

  const blogPaginationMatch = barePath.match(/^\/blog\/(halaman|page)\/(\d+)$/i);
  if (blogPaginationMatch) {
    const pageNum = parseInt(blogPaginationMatch[2], 10);
    if (!pageNum || pageNum <= 1) {
      return locale === 'en' ? '/en/blog' : '/id/blog';
    }
    const canonicalPaginated =
      locale === 'en' ? `/en/blog/page/${pageNum}` : `/id/blog/halaman/${pageNum}`;
    if (cleanPath !== canonicalPaginated) {
      return canonicalPaginated;
    }
    return null;
  }

  const blogCategoryMatch = barePath.match(/^\/blog\/kategori\/([^/]+)$/i);
  if (blogCategoryMatch) {
    const catSlug = blogCategoryMatch[1].toLowerCase().trim();
    const categoryToClusterMap: Record<string, string> = {
      'performa-web': 'website-dan-performa',
      'konversi-ux': 'website-dan-performa',
      'investasi-web': 'biaya-dan-memilih-vendor',
      'otomasi-ai': 'agentic-ai',
      'seo-lokal': 'seo-lokal-dan-geo',
      'operasional-bisnis': 'otomasi-dan-software',
    };
    const targetCluster = categoryToClusterMap[catSlug] || 'agentic-ai';
    return locale === 'en'
      ? `/en/blog/topic/${targetCluster}`
      : `/id/blog/topik/${targetCluster}`;
  }

  const blogClusterMatch = barePath.match(/^\/blog\/(topik|topic)\/([^/]+)$/i);
  if (blogClusterMatch) {
    const clusterSlug = blogClusterMatch[2].toLowerCase().trim();
    const canonicalCluster =
      locale === 'en'
        ? `/en/blog/topic/${clusterSlug}`
        : `/id/blog/topik/${clusterSlug}`;
    if (cleanPath !== canonicalCluster) {
      return canonicalCluster;
    }
    return null;
  }

  const blogDetailMatch = barePath.match(/^\/blog\/([^/]+)$/i);
  if (blogDetailMatch) {
    const rawSlug = blogDetailMatch[1].toLowerCase().trim();
    const legacyBlogSlugMap: Record<string, { id: string; en: string }> = {
      'mcp-model-context-protocol-bisnis': {
        id: 'mcp-model-context-protocol-untuk-pemilik-bisnis',
        en: 'mcp-model-context-protocol-for-business-owners',
      },
      'mcp-model-context-protocol-business': {
        id: 'mcp-model-context-protocol-untuk-pemilik-bisnis',
        en: 'mcp-model-context-protocol-for-business-owners',
      },
      'apa-itu-mcp-model-context-protocol-panduan-bisnis': {
        id: 'mcp-model-context-protocol-untuk-pemilik-bisnis',
        en: 'mcp-model-context-protocol-for-business-owners',
      },
      'keamanan-ai-agent-prompt-injection': {
        id: 'keamanan-ai-agent-prompt-injection-data-pelanggan',
        en: 'ai-agent-security-prompt-injection-customer-data',
      },
      'kepatuhan-uu-pdp-whatsapp-dan-ai-bisnis': {
        id: 'uu-pdp-bisnis-whatsapp-ai-panduan-praktis',
        en: 'pdp-law-indonesia-business-whatsapp-ai',
      },
      'otomasi-whatsapp-ai-agent-untuk-klinik-dan-fnb': {
        id: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
        en: 'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
      },
      'otomasi-workflow-bisnis-n8n-make-tanpa-ganti-sistem': {
        id: 'otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif',
        en: 'business-workflow-automation-n8n-make-repetitive-tasks',
      },
      'otomasi-workflow-bisnis-tanpa-ganti-sistem-lama': {
        id: 'otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif',
        en: 'business-workflow-automation-n8n-make-repetitive-tasks',
      },
      'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula': {
        id: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
        en: 'guide-how-agentic-ai-works-for-beginners',
      },
      'guide-how-agentic-ai-works-for-beginners': {
        id: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
        en: 'guide-how-agentic-ai-works-for-beginners',
      },
    };

    if (rawSlug in legacyBlogSlugMap) {
      const mapped = legacyBlogSlugMap[rawSlug];
      if (!hadValidPrefix) {
        const target =
          rawSlug === 'guide-how-agentic-ai-works-for-beginners' ||
          rawSlug === 'mcp-model-context-protocol-business'
            ? `/en/blog/${mapped.en}`
            : `/id/blog/${mapped.id}`;
        if (cleanPath !== target) return target;
        return null;
      }
      const canonicalSlug = locale === 'en' ? mapped.en : mapped.id;
      const target = `${targetPrefix}/blog/${canonicalSlug}`;
      if (cleanPath !== target) return target;
      return null;
    }

    // Cross-language blog post slug resolution (e.g. /id/blog/<en-slug> -> /id/blog/<id-slug> or /en/blog/<id-slug> -> /en/blog/<en-slug>)
    if (locale === 'id') {
      const isId = (BLOG_SLUGS_ID as readonly string[]).includes(rawSlug);
      if (!isId) {
        const alt = resolveBlogAlternateSlug(rawSlug, 'id');
        if (alt) return `/id/blog/${alt}`;
      }
    } else {
      const isEn = (BLOG_SLUGS_EN as readonly string[]).includes(rawSlug);
      if (!isEn) {
        const alt = resolveBlogAlternateSlug(rawSlug, 'en');
        if (alt) return `/en/blog/${alt}`;
      }
    }

    if (!hadValidPrefix || hadLegacyPrefix) {
      if ((BLOG_SLUGS_EN as readonly string[]).includes(rawSlug) && !(BLOG_SLUGS_ID as readonly string[]).includes(rawSlug)) {
        return `/en/blog/${rawSlug}`;
      }
      return `${targetPrefix}/blog/${rawSlug}`;
    }
  }

  // 2. /harga, /pricing, /cara-kerja, /how-it-works, /faq canonicalization
  if (barePath === '/harga' || barePath === '/pricing') {
    const canonicalPricing = locale === 'en' ? '/en/pricing' : '/id/harga';
    if (cleanPath !== canonicalPricing) return canonicalPricing;
    return null;
  }
  if (barePath === '/cara-kerja' || barePath === '/how-it-works' || barePath === '/how-we-work') {
    const canonicalProcess = locale === 'en' ? '/en/how-it-works' : '/id/cara-kerja';
    if (cleanPath !== canonicalProcess) return canonicalProcess;
    return null;
  }
  if (barePath === '/faq') {
    const canonicalFaq = locale === 'en' ? '/en/faq' : '/id/faq';
    if (cleanPath !== canonicalFaq) return canonicalFaq;
    return null;
  }

  // 3. Areas Hub: /id/area or /en/areas
  if (barePath === '/area' || barePath === '/areas') {
    const expectedHub = locale === 'en' ? '/en/areas' : '/id/area';
    if (cleanPath !== expectedHub) {
      return expectedHub;
    }
    return null;
  }

  const legacyProjectAndCaseStudySlugMap: Record<string, string> = {
    'wa-concierge': 'wa-concierge-klinik',
    'wa-concierge-clinic': 'wa-concierge-klinik',
    'otomasi-reservasi-klinik-estetika': 'wa-concierge-klinik',
    'klinik-gigi-bsd': 'wa-concierge-klinik',
    'dashboard-operasional-kafe': 'dashboard-kafe',
    'cafe-dashboard': 'dashboard-kafe',
    'sinkronisasi-rekap-pos-fnb-multi-cabang': 'dashboard-kafe',
    'alur-lead-properti': 'lead-properti',
    'property-lead-flow': 'lead-properti',
    'lead-properti-crm': 'lead-properti',
    'chestaa-v2-architecture': 'chestaa-v2',
    'sentralisasi-operasional-armada-logistik': 'pemroses-dokumen',
  };

  // 3B. Case Studies Index & Detail: /id/studi-kasus <-> /en/case-studies
  if (barePath === '/studi-kasus' || barePath === '/case-studies') {
    const expectedCsIndex = locale === 'en' ? '/en/case-studies' : '/id/studi-kasus';
    if (cleanPath !== expectedCsIndex) {
      return expectedCsIndex;
    }
    return null;
  }

  const csDetailMatch = barePath.match(/^\/(studi-kasus|case-studies)\/([^/]+)$/i);
  if (csDetailMatch) {
    const rawCsSlug = csDetailMatch[2].toLowerCase().trim();
    const canonicalCsSlug = legacyProjectAndCaseStudySlugMap[rawCsSlug] || rawCsSlug;
    const expectedCsDetail =
      locale === 'en'
        ? `/en/case-studies/${canonicalCsSlug}`
        : `/id/studi-kasus/${canonicalCsSlug}`;
    if (cleanPath !== expectedCsDetail) {
      return expectedCsDetail;
    }
    return null;
  }

  // 4. Unified Area Page: /id/area/:areaSlug <-> /en/areas/:areaSlug
  const areaOnlyMatch = barePath.match(/^\/(area|areas)\/([^/]+)$/i);
  if (areaOnlyMatch) {
    const rawAreaSlug = areaOnlyMatch[2].toLowerCase().trim();
    const canonicalAreaSlug = LEGACY_AREA_SLUG_ALIASES[rawAreaSlug] || rawAreaSlug;
    if (isValidAreaSlug(canonicalAreaSlug)) {
      const expectedAreaPath =
        locale === 'en'
          ? `/en/areas/${canonicalAreaSlug}`
          : `/id/area/${canonicalAreaSlug}`;
      if (cleanPath !== expectedAreaPath) {
        return expectedAreaPath;
      }
      return null;
    }
  }

  // 5. Service + Area route: /(layanan|services|jasa)/:serviceSlug/:areaSlug
  const serviceAreaMatch = barePath.match(/^\/(layanan|services|jasa)\/([^/]+)\/([^/]+)$/i);
  if (serviceAreaMatch) {
    const rawServiceSlug = serviceAreaMatch[2];
    const rawAreaSlug = serviceAreaMatch[3].toLowerCase();

    const canonicalService =
      resolveCanonicalServiceSlug(rawServiceSlug) ||
      resolveCanonicalServiceSlug(
        LEGACY_SERVICE_REDIRECT_MAP[rawServiceSlug.toLowerCase()] || ''
      );

    if (canonicalService && isValidAreaSlug(rawAreaSlug)) {
      const expectedPath =
        locale === 'en'
          ? `/en/services/${SERVICE_ID_TO_EN_SLUG[canonicalService]}/${rawAreaSlug}`
          : `/id/jasa/${canonicalService}/${rawAreaSlug}`;
      if (cleanPath !== expectedPath) {
        return expectedPath;
      }
      return null;
    }
  }

  // 6. Service Detail route: /(layanan|services|jasa)/:slug
  const serviceDetailMatch = barePath.match(/^\/(layanan|services|jasa)\/([^/]+)$/i);
  if (serviceDetailMatch) {
    const rawSlug = serviceDetailMatch[2];
    const canonicalService =
      resolveCanonicalServiceSlug(rawSlug) ||
      resolveCanonicalServiceSlug(
        LEGACY_SERVICE_REDIRECT_MAP[rawSlug.toLowerCase()] || ''
      );

    if (canonicalService) {
      const expectedPath =
        locale === 'en'
          ? `/en/services/${SERVICE_ID_TO_EN_SLUG[canonicalService]}`
          : `/id/jasa/${canonicalService}`;
      if (cleanPath !== expectedPath) {
        return expectedPath;
      }
      return null;
    }
  }

  // 6C. Portfolio detail & legacy /proyek or /projects alias mapping
  const portfolioMatch = barePath.match(/^\/(portfolio|proyek|projects)\/([^/]+)$/i);
  if (portfolioMatch) {
    const rawProjSlug = portfolioMatch[2].toLowerCase().trim();
    const canonicalProjSlug = legacyProjectAndCaseStudySlugMap[rawProjSlug] || rawProjSlug;
    const expectedPortfolioPath = `${targetPrefix}/portfolio/${canonicalProjSlug}`;
    if (cleanPath !== expectedPortfolioPath) {
      return expectedPortfolioPath;
    }
    return null;
  }

  // 7. Redirect unprefixed or legacy-prefixed core pages (/portfolio, /case-studies, /blog, /about, /workflow)
  const coreMatch = barePath.match(
    /^\/(portfolio|case-studies|studi-kasus|blog|about|workflow|trust|academy|quiz|kamus-ai-teknologi)(\/.*)?$/i
  );
  if (coreMatch && (!hadValidPrefix || hadLegacyPrefix)) {
    return `${targetPrefix}${barePath}`;
  }

  if (hadLegacyPrefix) {
    return barePath === '/' ? targetPrefix : `${targetPrefix}${barePath}`;
  }

  return null;
}
