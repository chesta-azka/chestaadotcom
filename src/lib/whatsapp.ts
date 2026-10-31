import { SITE_URL, parseLocalizedPath, type SupportedLocale } from './i18n';

export const WHATSAPP_NUMBER = '6282125447232';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export type WhatsAppPageType =
  | 'service'
  | 'area'
  | 'article'
  | 'blog'
  | 'case-study'
  | 'audit-composed'
  | 'audit'
  | 'home'
  | 'about'
  | 'blog-index'
  | '404'
  | 'custom'
  | 'faq'
  | 'default';

export interface WhatsAppContext {
  type?: WhatsAppPageType;
  locale?: SupportedLocale;
  /** Service name (Indonesian or English) for service / area pages */
  serviceName?: string;
  /** Area name (e.g., BSD, Bintaro, Alam Sutera) for area pages */
  areaName?: string;
  /** Article or case study title */
  title?: string;
  /** Custom direct message */
  message?: string;
  /** Canonical page URL or pathname (any query/UTM params are stripped automatically) */
  url?: string;
  pageUrl?: string;
  /** Top-level or nested compose-only form fields from Audit Gratis page */
  name?: string;
  business?: string;
  need?: string;
  story?: string;
  auditForm?: {
    name?: string;
    business?: string;
    need?: string;
    story?: string;
  };
}

/**
 * Locked visible button label for all primary WhatsApp CTAs across the site.
 */
export function getWhatsAppCtaLabel(locale: SupportedLocale = 'id'): string {
  return locale === 'en'
    ? 'Free consultation on WhatsApp'
    : 'Konsultasi gratis via WhatsApp';
}

/**
 * Ensures any page URL passed into a WhatsApp message is a clean absolute URL
 * with zero UTM or query parameters and no hash fragment.
 */
export function cleanWhatsAppPageUrl(rawUrl?: string): string {
  if (!rawUrl || !rawUrl.trim()) {
    if (typeof window !== 'undefined' && window.location) {
      return `${SITE_URL}${window.location.pathname || '/'}`;
    }
    return SITE_URL;
  }
  const trimmed = rawUrl.trim();
  const withoutHash = trimmed.split('#')[0];
  const withoutQuery = withoutHash.split('?')[0];

  if (withoutQuery.startsWith('http://') || withoutQuery.startsWith('https://')) {
    try {
      const parsed = new URL(withoutQuery);
      return `${SITE_URL}${parsed.pathname}`;
    } catch {
      return withoutQuery;
    }
  }

  const normalizedPath = withoutQuery.startsWith('/')
    ? withoutQuery
    : `/${withoutQuery}`;
  return `${SITE_URL}${normalizedPath}`;
}

/**
 * Builds the localized plain-text WhatsApp message from the page context.
 */
export function buildWhatsAppMessage(
  context: WhatsAppContext = {},
  explicitLocale?: SupportedLocale,
): string {
  const locale: SupportedLocale = explicitLocale || context.locale || 'id';
  const type: WhatsAppPageType = context.type || 'default';
  const pageUrl = cleanWhatsAppPageUrl(context.url || context.pageUrl);

  if (type === 'audit-composed') {
    const name = (context.auditForm?.name ?? context.name)?.trim();
    const business = (context.auditForm?.business ?? context.business)?.trim();
    const need = (context.auditForm?.need ?? context.need)?.trim();
    const story = (context.auditForm?.story ?? context.story)?.trim();

    if (!name && !business && !need && !story) {
      return locale === 'en'
        ? 'Hello CHESTAADOTCOM, I would like a free consultation.'
        : 'Halo CHESTAADOTCOM, saya ingin konsultasi gratis.';
    }

    if (locale === 'en') {
      const parts: string[] = [
        'Hello CHESTAADOTCOM, I would like to book a free 30-minute audit.',
      ];
      if (name) parts.push(`Name: ${name}`);
      if (business) parts.push(`Business / sector: ${business}`);
      if (need) parts.push(`Main need: ${need}`);
      if (story) parts.push(`Current challenge: ${story}`);
      return parts.join('\n');
    }

    const parts: string[] = [
      'Halo CHESTAADOTCOM, saya ingin jadwal audit gratis 30 menit.',
    ];
    if (name) parts.push(`Nama: ${name}`);
    if (business) parts.push(`Jenis usaha: ${business}`);
    if (need) parts.push(`Kebutuhan utama: ${need}`);
    if (story) parts.push(`Cerita singkat: ${story}`);
    return parts.join('\n');
  }

  if (type === 'area') {
    const service =
      context.serviceName?.trim() ||
      (locale === 'en'
        ? 'website, software, and AI agent development'
        : 'pembuatan website, software, dan AI agent');
    const area =
      context.areaName?.trim() ||
      (locale === 'en' ? 'South Tangerang' : 'Tangerang Selatan');

    return locale === 'en'
      ? `Hello CHESTAADOTCOM, I would like a consultation about ${service} for a business in ${area}. I was viewing: ${pageUrl}`
      : `Halo CHESTAADOTCOM, saya mau konsultasi soal ${service} untuk bisnis di ${area}. Saya melihat halaman: ${pageUrl}`;
  }

  if (type === 'service') {
    const service =
      context.serviceName?.trim() ||
      (locale === 'en' ? 'digital services' : 'layanan digital');

    return locale === 'en'
      ? `Hello CHESTAADOTCOM, I would like a consultation about ${service}. I was viewing: ${pageUrl}`
      : `Halo CHESTAADOTCOM, saya mau konsultasi soal ${service}. Saya melihat halaman: ${pageUrl}`;
  }

  if (type === 'article' || type === 'blog') {
    const title = context.title?.trim();
    if (title) {
      return locale === 'en'
        ? `Hello CHESTAADOTCOM, I just read the article "${title}" and would like to discuss. Link: ${pageUrl}`
        : `Halo CHESTAADOTCOM, saya baru membaca artikel "${title}" dan ingin berdiskusi. Link: ${pageUrl}`;
    }
  }

  if (type === 'case-study') {
    const title = context.title?.trim();
    if (title) {
      return locale === 'en'
        ? `Hello CHESTAADOTCOM, I am interested in the case study "${title}" and would like to know if the workflow fits my business.`
        : `Halo CHESTAADOTCOM, saya tertarik dengan studi kasus "${title}" dan ingin tahu apakah alurnya cocok untuk bisnis saya.`;
    }
  }

  return locale === 'en'
    ? 'Hello CHESTAADOTCOM, I would like a free consultation.'
    : 'Halo CHESTAADOTCOM, saya ingin konsultasi gratis.';
}

/**
 * Primary helper used by every WhatsApp CTA on the site.
 * Returns the full `https://wa.me/6282125447232?text=...` URL with a URL-encoded
 * message in the active language and zero UTM parameters on the embedded page URL.
 */
export function buildWhatsAppLink(
  context: WhatsAppContext = {},
  explicitLocale?: SupportedLocale,
): string {
  const message = buildWhatsAppMessage(context, explicitLocale);
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

// Backwards-compatible alias for any existing imports
export const buildWhatsAppUrl = buildWhatsAppLink;

const SERVICE_NAMES: Record<string, { id: string; en: string }> = {
  'pembuatan-website': { id: 'jasa pembuatan website', en: 'website development' },
  'website-development': { id: 'jasa pembuatan website', en: 'website development' },
  'ai-agent': { id: 'jasa AI agent', en: 'AI agent development' },
  'ai-agents': { id: 'jasa AI agent', en: 'AI agent development' },
  'software-custom': { id: 'jasa software custom', en: 'custom software development' },
  'custom-software': { id: 'jasa software custom', en: 'custom software development' },
  'otomasi-workflow': { id: 'jasa otomasi workflow', en: 'workflow automation' },
  'workflow-automation': { id: 'jasa otomasi workflow', en: 'workflow automation' },
};

function getServiceNameFromSlug(slug: string, locale: SupportedLocale): string {
  const clean = slug.toLowerCase().trim();
  const found = SERVICE_NAMES[clean];
  if (found) return found[locale] || found.id;
  return locale === 'en' ? 'digital services' : 'layanan digital';
}

function formatAreaName(slug: string): string {
  const map: Record<string, string> = {
    'bsd-city': 'BSD City',
    'tangerang-selatan': 'Tangerang Selatan',
    'lebak-bulus': 'Lebak Bulus',
    'alam-sutera': 'Alam Sutera',
    'gading-serpong': 'Gading Serpong',
    'serpong-utara': 'Serpong Utara',
    'ciputat-timur': 'Ciputat Timur',
    'pondok-aren': 'Pondok Aren',
    'pondok-cabe': 'Pondok Cabe',
    'pondok-ranji': 'Pondok Ranji',
    'summarecon-serpong': 'Summarecon Serpong',
    'karang-tengah': 'Karang Tengah',
    'kota-tangerang': 'Kota Tangerang',
    'tb-simatupang': 'TB Simatupang',
    'pondok-indah': 'Pondok Indah',
    'kebayoran-lama': 'Kebayoran Lama',
    'jakarta-selatan': 'Jakarta Selatan',
    'jurang-mangu': 'Jurang Mangu',
  };
  if (map[slug]) return map[slug];
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Automatically derives the WhatsAppContext from any route pathname so shared
 * chrome (Header, MenuOverlayPanel, FooterSection, StickyMobileWhatsApp)
 * produces the exact contextual prefilled message for the current page.
 */
export function resolveWhatsAppContextFromPathname(
  rawPathname: string,
  explicitLocale?: SupportedLocale,
): WhatsAppContext {
  const { locale: parsedLocale, barePath } = parseLocalizedPath(rawPathname);
  const locale = explicitLocale || parsedLocale;
  const cleanUrl = cleanWhatsAppPageUrl(rawPathname);

  // 1. Service + Area page: /jasa/:serviceSlug/:areaSlug
  const serviceAreaMatch = barePath.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (serviceAreaMatch) {
    const rawService = serviceAreaMatch[2];
    const rawArea = serviceAreaMatch[3].toLowerCase();
    const serviceName = getServiceNameFromSlug(rawService, locale);
    const areaName = formatAreaName(rawArea);
    return {
      type: 'area',
      locale,
      serviceName,
      areaName,
      url: cleanUrl,
    };
  }

  // Unified area page: /area/:areaSlug
  const unifiedAreaMatch = barePath.match(/^\/(area|areas)\/([^/]+)$/i);
  if (unifiedAreaMatch) {
    const rawArea = unifiedAreaMatch[2].toLowerCase();
    const areaName = formatAreaName(rawArea);
    return {
      type: 'area',
      locale,
      areaName,
      url: cleanUrl,
    };
  }

  // 2. Service page: /jasa/:serviceSlug
  const serviceMatch = barePath.match(/^\/(jasa|layanan|services)\/([^/]+)$/i);
  if (serviceMatch) {
    const serviceName = getServiceNameFromSlug(serviceMatch[2], locale);
    return {
      type: 'service',
      locale,
      serviceName,
      url: cleanUrl,
    };
  }

  // 3. Blog article: /blog/:slug
  if (
    barePath.startsWith('/blog/') &&
    !barePath.startsWith('/blog/topik/') &&
    !barePath.startsWith('/blog/topic/') &&
    !barePath.startsWith('/blog/halaman/') &&
    !barePath.startsWith('/blog/page/') &&
    !barePath.startsWith('/blog/kategori/')
  ) {
    const title = typeof document !== 'undefined' ? document.title.split('|')[0].trim() : undefined;
    return {
      type: 'article',
      locale,
      title,
      url: cleanUrl,
    };
  }

  // 4. Case study detail: /case-studies/:slug
  if (barePath.startsWith('/case-studies/')) {
    const title = typeof document !== 'undefined' ? document.title.split('|')[0].trim() : undefined;
    return {
      type: 'case-study',
      locale,
      title,
      url: cleanUrl,
    };
  }

  // 5. Default (home, about, blog index, audit, privacy, 404)
  return {
    type: 'default',
    locale,
    url: cleanUrl,
  };
}
