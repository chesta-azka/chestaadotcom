/**
 * Centralized 301 Redirect Configuration & Route Canonicalizer
 * Enforces the strict /id and /en route map across Express SSR (server.ts)
 * and React Router client navigation (src/App.tsx).
 */

import {
  SERVICE_ID_TO_EN_SLUG,
  resolveCanonicalServiceSlug,
} from '../data/services';
import { AREAS } from '../data/service-areas';

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
 * Legacy /area/:cityName consolidation map to canonical /id/jasa/pembuatan-website/:areaSlug
 */
export const LEGACY_AREA_REDIRECT_MAP: Record<string, string> = {
  'bsd-city': '/jasa/pembuatan-website/bsd-city',
  bsd: '/jasa/pembuatan-website/bsd-city',
  cisauk: '/jasa/pembuatan-website/bsd-city',
  'rawa-buntu': '/jasa/pembuatan-website/bsd-city',
  'alam-sutera': '/jasa/pembuatan-website/alam-sutera',
  bintaro: '/jasa/pembuatan-website/bintaro',
  'bintaro-sektor-9': '/jasa/pembuatan-website/bintaro',
  'gading-serpong': '/jasa/pembuatan-website/gading-serpong',
  'gading-serpong-ruko': '/jasa/pembuatan-website/gading-serpong',
  'tangerang-selatan': '/jasa/pembuatan-website/tangerang-selatan',
  tangsel: '/jasa/pembuatan-website/tangerang-selatan',
  pamulang: '/jasa/pembuatan-website/pamulang',
  'pamulang-barat': '/jasa/pembuatan-website/pamulang',
  'jurang-mangu': '/jasa/pembuatan-website/jurang-mangu',
  'lebak-bulus': '/jasa/pembuatan-website/lebak-bulus',
  ciputat: '/jasa/pembuatan-website/ciputat',
  serpong: '/jasa/pembuatan-website/serpong',
  'serpong-utara': '/jasa/pembuatan-website/alam-sutera',
  'pasar-modern-bsd': '/jasa/pembuatan-website/bsd-city',
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

  if (cleanPath === '/ind' || cleanPath.startsWith('/ind/')) {
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
    const rawSlug = blogDetailMatch[1];
    // Special explicit handling for the reported failing slug
    if (rawSlug === 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula') {
      const target = '/id/blog/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula';
      if (cleanPath !== target) return target;
      return null;
    }
    if (rawSlug === 'guide-how-agentic-ai-works-for-beginners') {
      const target = '/en/blog/guide-how-agentic-ai-works-for-beginners';
      if (cleanPath !== target) return target;
      return null;
    }
    if (!hadValidPrefix || hadLegacyPrefix) {
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
    const slug = csDetailMatch[2];
    const expectedCsDetail =
      locale === 'en' ? `/en/case-studies/${slug}` : `/id/studi-kasus/${slug}`;
    if (cleanPath !== expectedCsDetail) {
      return expectedCsDetail;
    }
    return null;
  }

  // 4. Legacy /area/:cityName consolidation
  const areaOnlyMatch = barePath.match(/^\/area\/([^/]+)$/i);
  if (areaOnlyMatch) {
    const citySlug = areaOnlyMatch[1].toLowerCase();
    const mappedTarget = LEGACY_AREA_REDIRECT_MAP[citySlug];
    if (mappedTarget) {
      const areaSlug = mappedTarget.split('/').pop()!;
      return locale === 'en'
        ? `/en/services/website-development/${areaSlug}`
        : `/id/jasa/pembuatan-website/${areaSlug}`;
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

    if (canonicalService && rawAreaSlug in AREAS) {
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

  // 6C. Portfolio detail legacy alias mapping
  const portfolioMatch = barePath.match(/^\/portfolio\/([^/]+)$/i);
  if (portfolioMatch) {
    const rawProjSlug = portfolioMatch[1].toLowerCase();
    const legacyProjectMap: Record<string, string> = {
      'wa-concierge': 'wa-concierge-klinik',
      'dashboard-operasional-kafe': 'dashboard-kafe',
      'alur-lead-properti': 'lead-properti',
    };
    const canonicalProjSlug = legacyProjectMap[rawProjSlug] || rawProjSlug;
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
