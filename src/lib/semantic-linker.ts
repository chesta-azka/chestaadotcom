import { GEO_LOCATIONS, AEO_SERVICES } from '../data/pseo-matrix';

// Conversational keyword to service slug mapping
const KEYWORD_TO_SERVICE: Record<string, string> = {
  'karyawan ai': 'jasa-karyawan-digital',
  'konsultan ai': 'konsultan-ai-automation',
  'headless ecommerce': 'arsitektur-headless-ecommerce',
  'erp perusahaan': 'pengembangan-erp-perusahaan',
  'cto agency': 'fractional-cto-agency',
  'super app': 'jasa-pembuatan-super-app'
};

const GEO_DISPLAY_NAMES: Record<string, string> = {
  'bsd-city': 'BSD City',
  'jakarta-selatan': 'Jakarta Selatan',
  'scbd': 'SCBD',
  'senopati': 'Senopati',
  'gading-serpong': 'Gading Serpong',
  'alam-sutera': 'Alam Sutera',
  'pik': 'PIK',
  'surabaya-barat': 'Surabaya Barat'
};

export function injectSemanticLinks(rawHtml: string): string {
  if (!rawHtml || typeof rawHtml !== 'string') return '';

  let processedHtml = rawHtml;
  const linkedPhrases = new Set<string>();

  // Iterate through service mappings and geo locations to create semantic phrases
  for (const [keyword, serviceSlug] of Object.entries(KEYWORD_TO_SERVICE)) {
    for (const geo of GEO_LOCATIONS) {
      const geoName = GEO_DISPLAY_NAMES[geo] || geo;
      // Target phrase e.g., "karyawan ai di bsd city"
      const targetPhrase = `${keyword} di ${geoName}`.toLowerCase();
      
      if (linkedPhrases.has(targetPhrase)) continue;

      const pSEOslug = `${serviceSlug}-${geo}`;
      const anchorHtml = `<a href="/area/${pSEOslug}" class="text-purple-600 font-semibold underline decoration-purple-500/30 hover:decoration-purple-600 transition-all">${keyword} di ${geoName}</a>`;

      // Regex pattern to match only text outside HTML tags and existing <a> tags
      const escapedPhrase = targetPhrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?![^<]*>|[^<>]*<\\/a>)(\\b${escapedPhrase}\\b)`, 'i');

      if (regex.test(processedHtml)) {
        // Replace ONLY the FIRST occurrence to prevent spam penalty
        processedHtml = processedHtml.replace(regex, anchorHtml);
        linkedPhrases.add(targetPhrase);
      }
    }
  }

  return processedHtml;
}
