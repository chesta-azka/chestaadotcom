/**
 * Centralized 301 Redirect Configuration & Route Canonicalizer
 * Shared across Express SSR server (server.ts), Vercel edge config (vercel.json),
 * and React Router client navigation (src/App.tsx).
 */

import { resolveCanonicalServiceSlug } from '../data/services';
import { AREAS } from '../data/service-areas';

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

/**
 * Legacy service slug aliases mapped to the 4 canonical /jasa/:slug routes
 */
export const LEGACY_SERVICE_REDIRECT_MAP: Record<string, string> = {
  'web-landing-page': 'pembuatan-website',
  'custom-web-development': 'pembuatan-website',
  'landing-page': 'pembuatan-website',
  'website-mesin-konversi': 'pembuatan-website',
  'jasa-pembuatan-website-toko-online': 'pembuatan-website',
  'arsitektur-headless-ecommerce': 'pembuatan-website',
  'dominasi-pencarian-seo-aeo': 'pembuatan-website',
  'ai-integration': 'ai-agent',
  'whatsapp-ai-agent': 'ai-agent',
  'karyawan-digital-ai': 'ai-agent',
  'jasa-admin-whatsapp-ai-otomatis': 'ai-agent',
  'konsultan-integrasi-ai-korporat': 'ai-agent',
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
 * Legacy /area/:cityName consolidation map to canonical /jasa/pembuatan-website/:areaSlug
 * Prevents thin doorway city pages from competing with rich service-area pages.
 */
export const LEGACY_AREA_REDIRECT_MAP: Record<string, string> = {
  'bsd-city': '/jasa/pembuatan-website/bsd-city',
  'bsd': '/jasa/pembuatan-website/bsd-city',
  'cisauk': '/jasa/pembuatan-website/bsd-city',
  'rawa-buntu': '/jasa/pembuatan-website/bsd-city',
  'alam-sutera': '/jasa/pembuatan-website/alam-sutera',
  'bintaro': '/jasa/pembuatan-website/bintaro',
  'bintaro-sektor-9': '/jasa/pembuatan-website/bintaro',
  'gading-serpong': '/jasa/pembuatan-website/gading-serpong',
  'gading-serpong-ruko': '/jasa/pembuatan-website/gading-serpong',
  'tangerang-selatan': '/jasa/pembuatan-website/tangerang-selatan',
  'tangsel': '/jasa/pembuatan-website/tangerang-selatan',
  'ciputat': '/jasa/pembuatan-website/tangerang-selatan',
  'pamulang-barat': '/jasa/pembuatan-website/tangerang-selatan',
  'serpong-utara': '/jasa/pembuatan-website/alam-sutera',
  'pasar-modern-bsd': '/jasa/pembuatan-website/bsd-city',
};

/**
 * Static redirect rules exported for vercel.json synchronization and documentation
 */
export const STATIC_REDIRECT_RULES: RedirectRule[] = [
  { source: '/layanan', destination: '/#layanan', permanent: true },
  { source: '/services', destination: '/#layanan', permanent: true },
  { source: '/ind/layanan', destination: '/ind/#layanan', permanent: true },
  { source: '/ind/services', destination: '/ind/#layanan', permanent: true },
  { source: '/eng/layanan', destination: '/eng/#layanan', permanent: true },
  { source: '/eng/services', destination: '/eng/#layanan', permanent: true },
  { source: '/layanan/:slug', destination: '/jasa/:slug', permanent: true },
  { source: '/services/:slug', destination: '/jasa/:slug', permanent: true },
  { source: '/layanan/:serviceSlug/:areaSlug', destination: '/jasa/:serviceSlug/:areaSlug', permanent: true },
  { source: '/services/:serviceSlug/:areaSlug', destination: '/jasa/:serviceSlug/:areaSlug', permanent: true },
];

/**
 * Resolves whether an incoming request pathname must 301-redirect to a canonical target.
 * Supports unprefixed default ID routes as well as /ind and /eng language prefixes.
 * Returns the canonical target path (e.g. "/jasa/pembuatan-website") or null if no redirect is needed.
 */
export function resolveRedirectTarget(rawPathname: string): string | null {
  if (!rawPathname) return null;

  const cleanPath = rawPathname.replace(/\/+$/, '') || '/';

  // Extract optional language prefix (/ind or /eng)
  let langPrefix = '';
  let barePath = cleanPath;

  if (cleanPath === '/ind' || cleanPath.startsWith('/ind/')) {
    langPrefix = '/ind';
    barePath = cleanPath.slice(4) || '/';
  } else if (cleanPath === '/eng' || cleanPath.startsWith('/eng/')) {
    langPrefix = '/eng';
    barePath = cleanPath.slice(4) || '/';
  }

  // 1. /layanan or /services index -> /#layanan (there is no service index page)
  if (barePath === '/layanan' || barePath === '/services') {
    return `${langPrefix}/#layanan`;
  }

  // 2. /harga, /cara-kerja, /faq standalone paths -> anchor on home page
  if (barePath === '/harga' || barePath === '/pricing') {
    return `${langPrefix}/#harga`;
  }
  if (barePath === '/cara-kerja') {
    return `${langPrefix}/#cara-kerja`;
  }
  if (barePath === '/faq') {
    return `${langPrefix}/#faq`;
  }

  // 3. Legacy /area/:cityName consolidation
  const areaOnlyMatch = barePath.match(/^\/area\/([^/]+)$/i);
  if (areaOnlyMatch) {
    const citySlug = areaOnlyMatch[1].toLowerCase();
    const mappedTarget = LEGACY_AREA_REDIRECT_MAP[citySlug];
    if (mappedTarget) {
      return `${langPrefix}${mappedTarget}`;
    }
  }

  // 4. Service + Area route: /(layanan|services|jasa)/:serviceSlug/:areaSlug
  const serviceAreaMatch = barePath.match(/^\/(layanan|services|jasa)\/([^/]+)\/([^/]+)$/i);
  if (serviceAreaMatch) {
    const routePrefix = serviceAreaMatch[1].toLowerCase();
    const rawServiceSlug = serviceAreaMatch[2];
    const rawAreaSlug = serviceAreaMatch[3].toLowerCase();

    const canonicalService =
      resolveCanonicalServiceSlug(rawServiceSlug) ||
      LEGACY_SERVICE_REDIRECT_MAP[rawServiceSlug.toLowerCase()];

    if (canonicalService && rawAreaSlug in AREAS) {
      if (
        routePrefix !== 'jasa' ||
        rawServiceSlug !== canonicalService ||
        serviceAreaMatch[3] !== rawAreaSlug
      ) {
        return `${langPrefix}/jasa/${canonicalService}/${rawAreaSlug}`;
      }
    }
  }

  // 5. Service Detail route: /(layanan|services|jasa)/:slug
  const serviceDetailMatch = barePath.match(/^\/(layanan|services|jasa)\/([^/]+)$/i);
  if (serviceDetailMatch) {
    const routePrefix = serviceDetailMatch[1].toLowerCase();
    const rawSlug = serviceDetailMatch[2];
    const canonicalService =
      resolveCanonicalServiceSlug(rawSlug) ||
      LEGACY_SERVICE_REDIRECT_MAP[rawSlug.toLowerCase()];

    if (canonicalService) {
      if (routePrefix !== 'jasa' || rawSlug !== canonicalService) {
        return `${langPrefix}/jasa/${canonicalService}`;
      }
    }
  }

  return null;
}
