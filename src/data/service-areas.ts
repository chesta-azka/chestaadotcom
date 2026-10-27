/**
 * ============================================================================
 * SERVICE AREAS BRIDGE & QUERY LAYER — CHESTAADOTCOM
 * ============================================================================
 * Re-exports the single source of truth from src/data/areas.ts and src/data/areas.en.ts
 * while preserving full compatibility across pages, sitemap, and SEO builders.
 */

import {
  AREAS,
  INDEXABLE_AREA_SLUGS,
  NON_INDEXABLE_AREA_SLUGS,
  SERVICE_AREA_PAGES_ID,
  ALL_SERVICE_AREA_PAGES_ID,
  type AreaDefinition,
  type AreaQuickCheck,
  type AreaSlug,
  type IndexableAreaSlug,
  type LocalFAQ,
  type LocalScenario,
  type NonIndexableAreaSlug,
  type ProcessStepSummary,
  type ServiceAreaPageData,
} from './areas';
import {
  SERVICE_AREA_PAGES_EN,
  ALL_SERVICE_AREA_PAGES_EN,
} from './areas.en';
import { resolveCanonicalServiceSlug, getServiceAreaPath } from './services';

export {
  AREAS,
  INDEXABLE_AREA_SLUGS,
  NON_INDEXABLE_AREA_SLUGS,
  SERVICE_AREA_PAGES_ID,
  ALL_SERVICE_AREA_PAGES_ID,
  SERVICE_AREA_PAGES_EN,
  ALL_SERVICE_AREA_PAGES_EN,
  getServiceAreaPath,
};

export type {
  AreaDefinition,
  AreaQuickCheck,
  AreaSlug,
  IndexableAreaSlug,
  LocalFAQ,
  LocalScenario,
  NonIndexableAreaSlug,
  ProcessStepSummary,
  ServiceAreaPageData,
};

export const SERVICE_AREA_PAGES: ServiceAreaPageData[] = ALL_SERVICE_AREA_PAGES_ID;

export function getIndexableAreas(): AreaDefinition[] {
  return INDEXABLE_AREA_SLUGS.map((slug) => AREAS[slug]);
}

export function getAllAreas(): AreaDefinition[] {
  return Object.values(AREAS);
}

export function getAreaBySlug(areaSlug: string): AreaDefinition | undefined {
  const normalized = (areaSlug || '').toLowerCase().trim() as AreaSlug;
  return AREAS[normalized];
}

export function getServiceAreaPage(
  serviceSlug: string,
  areaSlug: string,
  locale: 'id' | 'en' = 'id'
): ServiceAreaPageData | undefined {
  const canonicalService = resolveCanonicalServiceSlug(serviceSlug);
  const normalizedArea = (areaSlug || '').toLowerCase().trim();
  if (!canonicalService) return undefined;

  const list = locale === 'en' ? ALL_SERVICE_AREA_PAGES_EN : ALL_SERVICE_AREA_PAGES_ID;
  return list.find(
    (p) => p.serviceSlug === canonicalService && p.areaSlug === normalizedArea
  );
}

export function getIndexableServiceAreaPages(
  locale: 'id' | 'en' = 'id'
): ServiceAreaPageData[] {
  const list = locale === 'en' ? SERVICE_AREA_PAGES_EN : SERVICE_AREA_PAGES_ID;
  return list.filter((p) => p.indexable);
}

export function getServiceAreasByServiceSlug(
  serviceSlug: string,
  onlyIndexable = true,
  locale: 'id' | 'en' = 'id'
): ServiceAreaPageData[] {
  const canonicalService = resolveCanonicalServiceSlug(serviceSlug);
  if (!canonicalService) return [];
  const list = locale === 'en' ? ALL_SERVICE_AREA_PAGES_EN : ALL_SERVICE_AREA_PAGES_ID;
  return list.filter(
    (p) => p.serviceSlug === canonicalService && (!onlyIndexable || p.indexable)
  );
}

export function getServiceAreasByAreaSlug(
  areaSlug: string,
  onlyIndexable = true,
  locale: 'id' | 'en' = 'id'
): ServiceAreaPageData[] {
  const normalizedArea = (areaSlug || '').toLowerCase().trim();
  const list = locale === 'en' ? ALL_SERVICE_AREA_PAGES_EN : ALL_SERVICE_AREA_PAGES_ID;
  return list.filter(
    (p) => p.areaSlug === normalizedArea && (!onlyIndexable || p.indexable)
  );
}
