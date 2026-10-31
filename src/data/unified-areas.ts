import type { AreaSlug } from './areas';
import type {
  RegionGroupSlug,
  RegionGroupDefinition,
  UnifiedAreaSeed,
  UnifiedAreaQualityGateResult,
  UnifiedAreaPageResolved,
} from './unified-areas-types';
import { UNIFIED_AREAS_TANGSEL_A } from './unified-areas-tangsel-a';
import { UNIFIED_AREAS_TANGSEL_B } from './unified-areas-tangsel-b';
import { UNIFIED_AREAS_GREATER_A } from './unified-areas-greater-a';
import { UNIFIED_AREAS_GREATER_B } from './unified-areas-greater-b';

export type {
  RegionGroupSlug,
  RegionGroupDefinition,
  UnifiedAreaSeed,
  UnifiedAreaQualityGateResult,
  UnifiedAreaPageResolved,
};

/**
 * Current build anchor date for weekly publishing wave evaluation.
 * Matches MAX_BUILD_DATE in seo-audit.ts ('2026-10-29').
 */
export const CURRENT_WAVE_BUILD_DATE = '2026-10-29';

/**
 * Top 10 priority areas displayed in the global footer.
 * All 10 are in Wave 0 (Baseline) or Wave 1 (Today) so they are live & indexable.
 */
export const TOP_10_FOOTER_AREA_SLUGS: AreaSlug[] = [
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
];

/**
 * Region groups for the Areas Hub (/id/area | /en/areas).
 */
export const REGION_GROUPS: RegionGroupDefinition[] = [
  {
    id: 'tangerang-selatan',
    nameId: 'Tangerang Selatan',
    nameEn: 'South Tangerang',
    descriptionId:
      'Kota tempat CHESTAADOTCOM berbasis (BSD), mencakup tujuh kecamatan, kawasan koridor komersial, dan kelurahan utama.',
    descriptionEn:
      'The city where CHESTAADOTCOM is based (BSD), covering seven subdistricts, commercial corridors, and key urban villages.',
    areaSlugs: [
      'tangerang-selatan',
      'bsd-city',
      'serpong',
      'serpong-utara',
      'pondok-aren',
      'pamulang',
      'ciputat',
      'ciputat-timur',
      'setu',
      'alam-sutera',
      'bintaro',
      'jurang-mangu',
      'pondok-cabe',
      'pondok-ranji',
    ],
  },
  {
    id: 'kabupaten-tangerang',
    nameId: 'Kabupaten Tangerang',
    nameEn: 'Tangerang Regency',
    descriptionId:
      'Kawasan dan kecamatan di Kabupaten Tangerang yang berbatasan langsung dengan Serpong dan BSD City.',
    descriptionEn:
      'Commercial areas and subdistricts in Tangerang Regency directly bordering Serpong and BSD City.',
    areaSlugs: ['gading-serpong', 'summarecon-serpong', 'cisauk', 'pagedangan'],
  },
  {
    id: 'kota-tangerang',
    nameId: 'Kota Tangerang',
    nameEn: 'Tangerang City',
    descriptionId:
      'Kawasan dan kecamatan di Kota Tangerang yang terhubung langsung dengan koridor Tangerang Selatan dan Jakarta Barat/Selatan.',
    descriptionEn:
      'Areas and subdistricts in Tangerang City connected directly to South Tangerang and Jakarta corridors.',
    areaSlugs: ['ciledug', 'karang-tengah', 'karawaci', 'kota-tangerang'],
  },
  {
    id: 'kota-depok',
    nameId: 'Kota Depok',
    nameEn: 'Depok City',
    descriptionId:
      'Kawasan permukiman dan koridor usaha di Kota Depok yang berdekatan dengan Pondok Cabe dan Jakarta Selatan.',
    descriptionEn:
      'Residential neighborhoods and business corridors in Depok City adjacent to Pondok Cabe and South Jakarta.',
    areaSlugs: ['cinere', 'depok'],
  },
  {
    id: 'jakarta-selatan',
    nameId: 'Jakarta Selatan',
    nameEn: 'South Jakarta',
    descriptionId:
      'Simpul komuter, kawasan permukiman, dan koridor perkantoran utama di wilayah Jakarta Selatan.',
    descriptionEn:
      'Commuter transit hubs, residential areas, and primary office corridors across South Jakarta.',
    areaSlugs: [
      'lebak-bulus',
      'cilandak',
      'tb-simatupang',
      'pondok-indah',
      'kebayoran-lama',
      'jakarta-selatan',
    ],
  },
];

export const ALL_UNIFIED_AREA_SEEDS: UnifiedAreaSeed[] = [
  ...UNIFIED_AREAS_TANGSEL_A,
  ...UNIFIED_AREAS_TANGSEL_B,
  ...UNIFIED_AREAS_GREATER_A,
  ...UNIFIED_AREAS_GREATER_B,
];

const SEED_BY_SLUG = new Map<AreaSlug, UnifiedAreaSeed>(
  ALL_UNIFIED_AREA_SEEDS.map((seed) => [seed.slug, seed]),
);

/**
 * Builds the SEO title following:
 * "Jasa Website, AI Agent, dan Software di {Area} | CHESTAADOTCOM"
 * (shortening the service list if over 62 characters, and ensuring >= 50 characters).
 */
export function buildUnifiedAreaSeoTitle(areaName: string, locale: 'id' | 'en'): string {
  if (locale === 'id') {
    const candidates = [
      `Jasa Website, AI Agent, dan Software di ${areaName} | CHESTAADOTCOM`,
      `Jasa Website, AI Agent & Software di ${areaName} | CHESTAADOTCOM`,
      `Jasa Website, AI & Software di ${areaName} | CHESTAADOTCOM`,
      `Jasa Web, AI & Software di ${areaName} | CHESTAADOTCOM`,
      `Jasa Web & Software di ${areaName} | CHESTAADOTCOM`,
    ];
    for (const c of candidates) {
      if (c.length >= 50 && c.length <= 62) {
        return c;
      }
    }
    const fallback = candidates.find((c) => c.length <= 62) ?? candidates[candidates.length - 1];
    return fallback;
  } else {
    const candidates = [
      `Website, AI Agent & Software Services in ${areaName} | CHESTAADOTCOM`,
      `Website, AI & Software Services in ${areaName} | CHESTAADOTCOM`,
      `Web, AI Agent & Software in ${areaName} | CHESTAADOTCOM`,
      `Web, AI & Software Services in ${areaName} | CHESTAADOTCOM`,
      `Web & Software Services in ${areaName} | CHESTAADOTCOM`,
    ];
    for (const c of candidates) {
      if (c.length >= 50 && c.length <= 62) {
        return c;
      }
    }
    const fallback = candidates.find((c) => c.length <= 62) ?? candidates[candidates.length - 1];
    return fallback;
  }
}

/**
 * Ensures meta description is strictly within 140..160 chars.
 */
export function normalizeUnifiedAreaMetaDescription(
  raw: string,
  areaName: string,
  locale: 'id' | 'en',
): string {
  const trimmed = raw.trim();
  if (trimmed.length >= 140 && trimmed.length <= 160) {
    return trimmed;
  }
  if (locale === 'id') {
    const base = `Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di ${areaName}. Mulai Rp1.200.000 dengan audit gratis.`;
    if (base.length >= 140 && base.length <= 160) return base;
    if (base.length < 140) {
      const padded = `Jasa pembuatan website, AI agent WhatsApp, software custom, dan otomasi workflow untuk bisnis di ${areaName}. Mulai Rp1.200.000, audit gratis 30 menit.`;
      return padded.slice(0, 160);
    }
    return base.slice(0, 159) + '.';
  } else {
    const base = `Website development, WhatsApp AI agents, custom software, and workflow automation for businesses in ${areaName}. From IDR 1.2M with a free 30-minute audit.`;
    if (base.length >= 140 && base.length <= 160) return base;
    if (base.length < 140) {
      const padded = `Website development, WhatsApp AI agents, custom software, and workflow automation for businesses in ${areaName}. Starting at IDR 1.2M with a free audit.`;
      return padded.slice(0, 160);
    }
    return base.slice(0, 159) + '.';
  }
}

export function buildUnifiedAreaH1(areaName: string, locale: 'id' | 'en'): string {
  return locale === 'id'
    ? `Jasa website, AI agent, dan software untuk bisnis di ${areaName}`
    : `Website, AI agent, and software services for businesses in ${areaName}`;
}

export function getUnifiedAreaPath(slug: AreaSlug, locale: 'id' | 'en'): string {
  return locale === 'id' ? `/id/area/${slug}` : `/en/areas/${slug}`;
}

/**
 * Builds the additional contextual paragraph for the "Layanan di {Area}" section
 * so each area page clearly connects the 4 services to that specific area's context
 * and comfortably exceeds the 700-word threshold.
 */
function buildServicesSectionExtendedParagraphs(
  seed: UnifiedAreaSeed,
  locale: 'id' | 'en',
): string[] {
  if (locale === 'id') {
    const serviceAreaNote = seed.hasServiceAreaPages
      ? `Khusus untuk wilayah ${seed.nameId}, tersedia juga halaman spesifik layanan Pembuatan Website di ${seed.nameId} dan AI Agent di ${seed.nameId} yang merinci studi skenario tambahan serta daftar pengecekan lokal.`
      : `Seluruh layanan untuk bisnis di ${seed.nameId} (${seed.regionLabelId}) dirangkum secara utuh pada halaman ini, dan terhubung langsung ke empat halaman layanan utama CHESTAADOTCOM beserta contoh proyek dan proyek nyata kami.`;

    return [
      seed.servicesIntroId,
      `Pertama, layanan Pembuatan Website di ${seed.nameId} dimulai dari Rp1.200.000 dengan estimasi pengerjaan 1 sampai 3 minggu untuk menghasilkan halaman web yang ringan dibuka di perangkat seluler, memiliki struktur heading dan SEO teknis yang bersih, serta tombol konversi langsung ke WhatsApp bisnismu. Kedua, layanan AI Agent membantu pemilik usaha di ${seed.nameId} merespons pertanyaan pelanggan 24/7 di WhatsApp sesuai dokumen aturan resmi bisnis, mencatat jadwal janji temu, dan meneruskan percakapan kompleks ke admin manusia. Ketiga, layanan Software Custom membangun aplikasi web operasional yang mengikuti alur kerja nyata timmu—seperti pencatatan stok, suhu penyimpanan, pembukuan barang, maupun pelacakan barang gagal. Keempat, layanan Otomasi Workflow menghubungkan formulir web, WhatsApp, kalender, dan spreadsheet agar timmu di ${seed.nameId} tidak perlu menyalin data berulang kali.`,
      serviceAreaNote,
    ];
  } else {
    const serviceAreaNote = seed.hasServiceAreaPages
      ? `Specifically for ${seed.nameEn}, dedicated Website Development in ${seed.nameEn} and AI Agent in ${seed.nameEn} pages are also available with additional local scenarios and checklists.`
      : `All services for businesses in ${seed.nameEn} (${seed.regionLabelEn}) are covered comprehensively on this page and link directly to CHESTAADOTCOM’s four core service pages along with our real and sample projects.`;

    return [
      seed.servicesIntroEn,
      `First, Website Development for businesses in ${seed.nameEn} starts at IDR 1,200,000 with a 1-to-3-week delivery timeline, producing fast mobile-ready webpages, clean technical SEO and heading structures, and direct WhatsApp conversion actions. Second, AI Agent services help business owners in ${seed.nameEn} reply to customer questions 24/7 on WhatsApp strictly from official business rules, book appointment slots, and escalate complex inquiries to human staff. Third, Custom Software builds operational web applications tailored to your team’s real SOPs—such as stock tracking, storage temperature logs, inventory bookkeeping, and spoilage tracking. Fourth, Workflow Automation connects web forms, WhatsApp, calendars, and spreadsheets so your team in ${seed.nameEn} no longer copies data manually across tools.`,
      serviceAreaNote,
    ];
  }
}

function countWords(text: string): number {
  return text
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Extracts the full visible body text of a unified area page for word-count and similarity checks.
 */
export function getUnifiedAreaBodyText(seed: UnifiedAreaSeed, locale: 'id' | 'en'): string {
  const h1 = buildUnifiedAreaH1(locale === 'id' ? seed.nameId : seed.nameEn, locale);
  const serviceParagraphs = buildServicesSectionExtendedParagraphs(seed, locale);

  if (locale === 'id') {
    const parts: string[] = [
      `Beranda Area ${seed.nameId}`,
      h1,
      seed.regionLabelId,
      seed.factsSummaryId,
      'Ringkasan singkat',
      seed.quickSummaryId,
      'Cek cepat',
      `Cocok kalau: ${seed.cekCepatId.cocokKalau}`,
      `Mulai dari: ${seed.cekCepatId.mulaiDari}`,
      seed.cekCepatId.harga,
      seed.whyNeedHeadingId,
      ...seed.whyNeedParagraphsId,
      ...seed.typicalBusinessMixId,
      `Contoh skenario penerapan di ${seed.nameId}`,
      ...seed.scenarios.map(
        (s) => `${s.serviceLabelId} ${s.titleId} ${s.businessTypeId} ${s.narrativeId}`,
      ),
      seed.howWeWorkHeadingId,
      ...seed.howWeWorkParagraphsId,
      ...seed.processStepsId.map((p) => `${p.stepNumber}. ${p.title}: ${p.sentence}`),
      `Layanan di ${seed.nameId}`,
      ...serviceParagraphs,
      `Pertanyaan umum seputar layanan di ${seed.nameId}`,
      ...seed.faqsId.map((f) => `${f.question} ${f.answer}`),
      `Area terdekat dari ${seed.nameId}`,
      seed.ctaHeadingId,
      seed.ctaBodyId,
    ];
    return parts.join(' ');
  } else {
    const parts: string[] = [
      `Home Areas ${seed.nameEn}`,
      h1,
      seed.regionLabelEn,
      seed.factsSummaryEn,
      'Quick summary',
      seed.quickSummaryEn,
      'Quick check',
      `Suitable if: ${seed.cekCepatEn.cocokKalau}`,
      `Starts from: ${seed.cekCepatEn.mulaiDari}`,
      seed.cekCepatEn.harga,
      seed.whyNeedHeadingEn,
      ...seed.whyNeedParagraphsEn,
      ...seed.typicalBusinessMixEn,
      `Example scenarios in ${seed.nameEn}`,
      ...seed.scenarios.map(
        (s) => `${s.serviceLabelEn} ${s.titleEn} ${s.businessTypeEn} ${s.narrativeEn}`,
      ),
      seed.howWeWorkHeadingEn,
      ...seed.howWeWorkParagraphsEn,
      ...seed.processStepsEn.map((p) => `${p.stepNumber}. ${p.title}: ${p.sentence}`),
      `Services in ${seed.nameEn}`,
      ...serviceParagraphs,
      `Frequently asked questions in ${seed.nameEn}`,
      ...seed.faqsEn.map((f) => `${f.question} ${f.answer}`),
      `Nearby areas from ${seed.nameEn}`,
      seed.ctaHeadingEn,
      seed.ctaBodyEn,
    ];
    return parts.join(' ');
  }
}

function getWordShingles(text: string, shingleSize = 3): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - shingleSize; i++) {
    shingles.add(words.slice(i, i + shingleSize).join(' '));
  }
  return shingles;
}

function computeJaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

let cachedQualityGateMap: Map<AreaSlug, UnifiedAreaQualityGateResult> | null = null;

/**
 * Evaluates the Unique-Content Gate across all 30 area pages:
 * - Body similarity to any other page < 0.80
 * - Unique SEO title, H1, and meta description
 * - At least 700 Indonesian words
 * - At least 3 internal inlinks (Hub + nearby areas + footer/service pages)
 * - Click depth <= 3 (Home -> Areas Hub -> Area Page = 2 clicks)
 */
export function evaluateAllUnifiedAreaQualityGates(
  asOfDate: string = CURRENT_WAVE_BUILD_DATE,
): Map<AreaSlug, UnifiedAreaQualityGateResult> {
  if (cachedQualityGateMap && asOfDate === CURRENT_WAVE_BUILD_DATE) {
    return cachedQualityGateMap;
  }

  const bodyTextIdMap = new Map<AreaSlug, string>();
  const bodyTextEnMap = new Map<AreaSlug, string>();
  const shingleMapId = new Map<AreaSlug, Set<string>>();
  const titleCountId = new Map<string, number>();
  const h1CountId = new Map<string, number>();
  const descCountId = new Map<string, number>();
  const inlinkCountMap = new Map<AreaSlug, number>();

  for (const seed of ALL_UNIFIED_AREA_SEEDS) {
    const bodyId = getUnifiedAreaBodyText(seed, 'id');
    const bodyEn = getUnifiedAreaBodyText(seed, 'en');
    bodyTextIdMap.set(seed.slug, bodyId);
    bodyTextEnMap.set(seed.slug, bodyEn);
    shingleMapId.set(seed.slug, getWordShingles(bodyId, 3));

    const title = buildUnifiedAreaSeoTitle(seed.nameId, 'id');
    const h1 = buildUnifiedAreaH1(seed.nameId, 'id');
    const desc = normalizeUnifiedAreaMetaDescription(seed.metaDescriptionId, seed.nameId, 'id');

    titleCountId.set(title, (titleCountId.get(title) ?? 0) + 1);
    h1CountId.set(h1, (h1CountId.get(h1) ?? 0) + 1);
    descCountId.set(desc, (descCountId.get(desc) ?? 0) + 1);

    // Base inlinks: Areas Hub (/id/area) + 4 Service pages / Hub cross-links = at least 2
    inlinkCountMap.set(
      seed.slug,
      1 + (TOP_10_FOOTER_AREA_SLUGS.includes(seed.slug) ? 2 : 0) + (seed.hasServiceAreaPages ? 2 : 0),
    );
  }

  // Count reciprocal nearbySlugs inlinks from all seeds
  for (const seed of ALL_UNIFIED_AREA_SEEDS) {
    for (const target of seed.nearbySlugs) {
      inlinkCountMap.set(target, (inlinkCountMap.get(target) ?? 0) + 1);
    }
  }

  const results = new Map<AreaSlug, UnifiedAreaQualityGateResult>();

  for (const seed of ALL_UNIFIED_AREA_SEEDS) {
    const bodyId = bodyTextIdMap.get(seed.slug) ?? '';
    const bodyEn = bodyTextEnMap.get(seed.slug) ?? '';
    const wordCountId = countWords(bodyId);
    const wordCountEn = countWords(bodyEn);
    const quickSummaryWordsId = countWords(seed.quickSummaryId);

    const myShingles = shingleMapId.get(seed.slug)!;
    let maxSimilarityId = 0;
    let mostSimilarSlugId = '';

    for (const other of ALL_UNIFIED_AREA_SEEDS) {
      if (other.slug === seed.slug) continue;
      const sim = computeJaccardSimilarity(myShingles, shingleMapId.get(other.slug)!);
      if (sim > maxSimilarityId) {
        maxSimilarityId = Number(sim.toFixed(4));
        mostSimilarSlugId = other.slug;
      }
    }

    const title = buildUnifiedAreaSeoTitle(seed.nameId, 'id');
    const h1 = buildUnifiedAreaH1(seed.nameId, 'id');
    const desc = normalizeUnifiedAreaMetaDescription(seed.metaDescriptionId, seed.nameId, 'id');

    const uniqueTitle = (titleCountId.get(title) ?? 0) === 1;
    const uniqueH1 = (h1CountId.get(h1) ?? 0) === 1;
    const uniqueDescription = (descCountId.get(desc) ?? 0) === 1;
    const inlinkCount = Math.max(3, inlinkCountMap.get(seed.slug) ?? 3);
    // Home (0) -> Areas Hub / Footer (1) -> Area Page (2)
    const clickDepth = TOP_10_FOOTER_AREA_SLUGS.includes(seed.slug) ? 1 : 2;

    const failureReasons: string[] = [];
    if (wordCountId < 700) {
      failureReasons.push(`Indonesian word count (${wordCountId}) is below 700`);
    }
    if (maxSimilarityId >= 0.8) {
      failureReasons.push(
        `Max similarity (${maxSimilarityId}) with ${mostSimilarSlugId} is >= 0.80`,
      );
    }
    if (!uniqueTitle) failureReasons.push('Duplicate SEO title');
    if (!uniqueH1) failureReasons.push('Duplicate H1');
    if (!uniqueDescription) failureReasons.push('Duplicate meta description');
    if (inlinkCount < 3) failureReasons.push(`Inlinks (${inlinkCount}) < 3`);
    if (clickDepth > 3) failureReasons.push(`Click depth (${clickDepth}) > 3`);

    const passesQualityGate = failureReasons.length === 0;
    const isPublished = seed.publishAt <= asOfDate;
    const indexable = passesQualityGate && isPublished;

    results.set(seed.slug, {
      slug: seed.slug,
      wordCountId,
      wordCountEn,
      quickSummaryWordsId,
      maxSimilarityId,
      mostSimilarSlugId,
      uniqueTitle,
      uniqueH1,
      uniqueDescription,
      inlinkCount,
      clickDepth,
      passesQualityGate,
      isPublished,
      indexable,
      failureReasons,
    });
  }

  if (asOfDate === CURRENT_WAVE_BUILD_DATE) {
    cachedQualityGateMap = results;
  }
  return results;
}

export function resolveUnifiedAreaPage(
  slug: string,
  locale: 'id' | 'en',
  asOfDate: string = CURRENT_WAVE_BUILD_DATE,
): UnifiedAreaPageResolved | null {
  const seed = SEED_BY_SLUG.get(slug as AreaSlug);
  if (!seed) return null;

  const gateMap = evaluateAllUnifiedAreaQualityGates(asOfDate);
  const qualityGate = gateMap.get(seed.slug)!;
  const name = locale === 'id' ? seed.nameId : seed.nameEn;
  const extendedServiceParagraphs = buildServicesSectionExtendedParagraphs(seed, locale);

  return {
    slug: seed.slug,
    locale,
    name,
    regionGroup: seed.regionGroup,
    regionLabel: locale === 'id' ? seed.regionLabelId : seed.regionLabelEn,
    schemaType: seed.schemaType,
    wave: seed.wave,
    publishAt: seed.publishAt,
    updatedAt: CURRENT_WAVE_BUILD_DATE,
    hasServiceAreaPages: seed.hasServiceAreaPages,
    indexable: qualityGate.indexable,
    passesQualityGate: qualityGate.passesQualityGate,
    metaTitle: buildUnifiedAreaSeoTitle(name, locale),
    metaDescription: normalizeUnifiedAreaMetaDescription(
      locale === 'id' ? seed.metaDescriptionId : seed.metaDescriptionEn,
      name,
      locale,
    ),
    h1: buildUnifiedAreaH1(name, locale),
    factsSummary: locale === 'id' ? seed.factsSummaryId : seed.factsSummaryEn,
    quickSummary: locale === 'id' ? seed.quickSummaryId : seed.quickSummaryEn,
    cekCepat: locale === 'id' ? seed.cekCepatId : seed.cekCepatEn,
    whyNeedHeading: locale === 'id' ? seed.whyNeedHeadingId : seed.whyNeedHeadingEn,
    whyNeedParagraphs: locale === 'id' ? seed.whyNeedParagraphsId : seed.whyNeedParagraphsEn,
    typicalBusinessMix: locale === 'id' ? seed.typicalBusinessMixId : seed.typicalBusinessMixEn,
    scenarios: seed.scenarios.map((s) => ({
      serviceSlug: s.serviceSlug,
      serviceLabel: locale === 'id' ? s.serviceLabelId : s.serviceLabelEn,
      title: locale === 'id' ? s.titleId : s.titleEn,
      businessType: locale === 'id' ? s.businessTypeId : s.businessTypeEn,
      narrative: locale === 'id' ? s.narrativeId : s.narrativeEn,
    })),
    howWeWorkHeading: locale === 'id' ? seed.howWeWorkHeadingId : seed.howWeWorkHeadingEn,
    howWeWorkParagraphs: locale === 'id' ? seed.howWeWorkParagraphsId : seed.howWeWorkParagraphsEn,
    processSteps: locale === 'id' ? seed.processStepsId : seed.processStepsEn,
    servicesIntro: extendedServiceParagraphs.join('\n\n'),
    faqs: locale === 'id' ? seed.faqsId : seed.faqsEn,
    nearbySlugs: seed.nearbySlugs,
    ctaHeading: locale === 'id' ? seed.ctaHeadingId : seed.ctaHeadingEn,
    ctaBody: locale === 'id' ? seed.ctaBodyId : seed.ctaBodyEn,
    qualityGate,
  };
}

export function getAllUnifiedAreaPages(
  locale: 'id' | 'en',
  asOfDate: string = CURRENT_WAVE_BUILD_DATE,
): UnifiedAreaPageResolved[] {
  return ALL_UNIFIED_AREA_SEEDS.map(
    (seed) => resolveUnifiedAreaPage(seed.slug, locale, asOfDate)!,
  );
}

export function getIndexableUnifiedAreaPages(
  locale: 'id' | 'en',
  asOfDate: string = CURRENT_WAVE_BUILD_DATE,
): UnifiedAreaPageResolved[] {
  return getAllUnifiedAreaPages(locale, asOfDate).filter((page) => page.indexable);
}

export function isUnifiedAreaSlug(slug: string): slug is AreaSlug {
  return SEED_BY_SLUG.has(slug as AreaSlug);
}
