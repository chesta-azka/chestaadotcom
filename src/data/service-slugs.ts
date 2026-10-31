/**
 * Ultra-lightweight service slug constants and path helpers.
 * Decouples navigation, routing, and redirects from the full service page copy.
 */

export type ServiceSlug =
  | 'pembuatan-website'
  | 'ai-agent'
  | 'software-custom'
  | 'otomasi-workflow';

export type EnglishServiceSlug =
  | 'website-development'
  | 'ai-agents'
  | 'custom-software'
  | 'workflow-automation';

export const SERVICE_ID_TO_EN_SLUG: Record<ServiceSlug, EnglishServiceSlug> = {
  'pembuatan-website': 'website-development',
  'ai-agent': 'ai-agents',
  'software-custom': 'custom-software',
  'otomasi-workflow': 'workflow-automation',
};

export const SERVICE_EN_TO_ID_SLUG: Record<EnglishServiceSlug, ServiceSlug> = {
  'website-development': 'pembuatan-website',
  'ai-agents': 'ai-agent',
  'custom-software': 'software-custom',
  'workflow-automation': 'otomasi-workflow',
};

export const LEGACY_SERVICE_SLUG_ALIASES: Record<string, ServiceSlug> = {
  'website-development': 'pembuatan-website',
  'web-development': 'pembuatan-website',
  'landing-page': 'pembuatan-website',
  'web-landing-page': 'pembuatan-website',
  'ai-agents': 'ai-agent',
  'ai-agentic': 'ai-agent',
  'custom-software': 'software-custom',
  'custom-app': 'software-custom',
  'workflow-automation': 'otomasi-workflow',
  'automation': 'otomasi-workflow',
};

export function resolveCanonicalServiceSlug(slug?: string): ServiceSlug | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  if (
    clean === 'pembuatan-website' ||
    clean === 'ai-agent' ||
    clean === 'software-custom' ||
    clean === 'otomasi-workflow'
  ) {
    return clean;
  }
  return LEGACY_SERVICE_SLUG_ALIASES[clean];
}

export function getLocalizedServiceUrlSlug(
  serviceSlug: ServiceSlug,
  locale: 'id' | 'en' = 'id'
): string {
  return locale === 'en' ? SERVICE_ID_TO_EN_SLUG[serviceSlug] : serviceSlug;
}

export function getServicePath(
  serviceSlug: ServiceSlug,
  locale: 'id' | 'en' = 'id'
): string {
  if (locale === 'en') {
    return `/en/services/${SERVICE_ID_TO_EN_SLUG[serviceSlug]}`;
  }
  return `/id/jasa/${serviceSlug}`;
}

export function getServiceAreaPath(
  serviceSlug: ServiceSlug,
  areaSlug: string,
  locale: 'id' | 'en' = 'id'
): string {
  if (locale === 'en') {
    return `/en/services/${SERVICE_ID_TO_EN_SLUG[serviceSlug]}/${areaSlug}`;
  }
  return `/id/jasa/${serviceSlug}/${areaSlug}`;
}
