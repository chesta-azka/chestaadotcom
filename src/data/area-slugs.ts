/**
 * Ultra-lightweight area slug constants and helpers.
 * Decouples navigation, routing, and redirects from the 30 massive area datasets.
 */

export const CANONICAL_AREA_SLUGS = [
  'tangerang-selatan',
  'bsd-city',
  'pamulang',
  'jurang-mangu',
  'lebak-bulus',
  'alam-sutera',
  'bintaro',
  'gading-serpong',
  'serpong',
  'ciputat',
  'serpong-utara',
  'setu',
  'ciputat-timur',
  'pondok-aren',
  'pondok-cabe',
  'pondok-ranji',
  'summarecon-serpong',
  'cisauk',
  'pagedangan',
  'ciledug',
  'karang-tengah',
  'karawaci',
  'kota-tangerang',
  'cinere',
  'depok',
  'cilandak',
  'tb-simatupang',
  'pondok-indah',
  'kebayoran-lama',
  'jakarta-selatan',
] as const;

export type CanonicalAreaSlug = (typeof CANONICAL_AREA_SLUGS)[number];

const CANONICAL_AREA_SET = new Set<string>(CANONICAL_AREA_SLUGS);

export function isValidAreaSlug(slug: string): boolean {
  return CANONICAL_AREA_SET.has(slug);
}

export const TOP_10_FOOTER_AREA_SLUGS: readonly CanonicalAreaSlug[] = [
  'tangerang-selatan',
  'bsd-city',
  'serpong',
  'alam-sutera',
  'bintaro',
  'gading-serpong',
  'pamulang',
  'ciputat',
  'pondok-aren',
  'lebak-bulus',
] as const;

export const LEGACY_AREA_SLUG_ALIASES: Record<string, string> = {
  bsd: 'bsd-city',
  'rawa-buntu': 'bsd-city',
  'pasar-modern-bsd': 'bsd-city',
  tangsel: 'tangerang-selatan',
  'bintaro-sektor-9': 'bintaro',
  'gading-serpong-ruko': 'gading-serpong',
  'pamulang-barat': 'pamulang',
};

export function getUnifiedAreaPath(
  areaSlug: string,
  locale: 'id' | 'en' = 'id'
): string {
  if (locale === 'en') {
    return `/en/areas/${areaSlug}`;
  }
  return `/id/area/${areaSlug}`;
}
