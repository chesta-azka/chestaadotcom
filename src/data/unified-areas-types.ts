import type { AreaSlug, AreaQuickCheck, LocalFAQ, ProcessStepSummary } from './areas';
import type { ServiceSlug } from './services';

export type RegionGroupSlug =
  | 'tangerang-selatan'
  | 'kabupaten-tangerang'
  | 'kota-tangerang'
  | 'kota-depok'
  | 'jakarta-selatan';

export interface RegionGroupDefinition {
  id: RegionGroupSlug;
  nameId: string;
  nameEn: string;
  descriptionId: string;
  descriptionEn: string;
  areaSlugs: AreaSlug[];
}

export interface UnifiedAreaScenario {
  serviceSlug: ServiceSlug;
  serviceLabelId: string;
  serviceLabelEn: string;
  titleId: string;
  titleEn: string;
  businessTypeId: string;
  businessTypeEn: string;
  narrativeId: string;
  narrativeEn: string;
}

export interface UnifiedAreaSeed {
  slug: AreaSlug;
  nameId: string;
  nameEn: string;
  regionGroup: RegionGroupSlug;
  regionLabelId: string;
  regionLabelEn: string;
  schemaType: 'City' | 'AdministrativeArea';
  wave: number;
  publishAt: string;
  hasServiceAreaPages: boolean;
  nearbySlugs: AreaSlug[];
  factsSummaryId: string;
  factsSummaryEn: string;
  metaDescriptionId: string;
  metaDescriptionEn: string;
  quickSummaryId: string; // 40-60 words
  quickSummaryEn: string;
  cekCepatId: {
    cocokKalau: string;
    mulaiDari: string;
    harga: string;
  };
  cekCepatEn: {
    cocokKalau: string;
    mulaiDari: string;
    harga: string;
  };
  whyNeedHeadingId: string;
  whyNeedHeadingEn: string;
  whyNeedParagraphsId: string[];
  whyNeedParagraphsEn: string[];
  typicalBusinessMixId: string[];
  typicalBusinessMixEn: string[];
  scenarios: [
    UnifiedAreaScenario,
    UnifiedAreaScenario,
    UnifiedAreaScenario,
    UnifiedAreaScenario,
  ];
  howWeWorkHeadingId: string;
  howWeWorkHeadingEn: string;
  howWeWorkParagraphsId: string[];
  howWeWorkParagraphsEn: string[];
  processStepsId: [
    ProcessStepSummary,
    ProcessStepSummary,
    ProcessStepSummary,
    ProcessStepSummary,
  ];
  processStepsEn: [
    ProcessStepSummary,
    ProcessStepSummary,
    ProcessStepSummary,
    ProcessStepSummary,
  ];
  servicesIntroId: string;
  servicesIntroEn: string;
  faqsId: [LocalFAQ, LocalFAQ, LocalFAQ];
  faqsEn: [LocalFAQ, LocalFAQ, LocalFAQ];
  ctaHeadingId: string;
  ctaHeadingEn: string;
  ctaBodyId: string;
  ctaBodyEn: string;
}

export interface UnifiedAreaQualityGateResult {
  slug: AreaSlug;
  wordCountId: number;
  wordCountEn: number;
  quickSummaryWordsId: number;
  maxSimilarityId: number;
  mostSimilarSlugId: string;
  uniqueTitle: boolean;
  uniqueH1: boolean;
  uniqueDescription: boolean;
  inlinkCount: number;
  clickDepth: number;
  passesQualityGate: boolean;
  isPublished: boolean;
  indexable: boolean;
  failureReasons: string[];
}

export interface UnifiedAreaPageResolved {
  slug: AreaSlug;
  locale: 'id' | 'en';
  name: string;
  regionGroup: RegionGroupSlug;
  regionLabel: string;
  schemaType: 'City' | 'AdministrativeArea';
  wave: number;
  publishAt: string;
  updatedAt: string;
  hasServiceAreaPages: boolean;
  indexable: boolean;
  passesQualityGate: boolean;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  factsSummary: string;
  quickSummary: string;
  cekCepat: AreaQuickCheck;
  whyNeedHeading: string;
  whyNeedParagraphs: string[];
  typicalBusinessMix: string[];
  scenarios: Array<{
    serviceSlug: ServiceSlug;
    serviceLabel: string;
    title: string;
    businessType: string;
    narrative: string;
  }>;
  howWeWorkHeading: string;
  howWeWorkParagraphs: string[];
  processSteps: ProcessStepSummary[];
  servicesIntro: string;
  faqs: LocalFAQ[];
  nearbySlugs: AreaSlug[];
  ctaHeading: string;
  ctaBody: string;
  qualityGate: UnifiedAreaQualityGateResult;
}
