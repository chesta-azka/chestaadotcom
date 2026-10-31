/**
 * ============================================================================
 * REAL PROJECT EXPERIENCE DATASET: data/experience — CHESTAADOTCOM
 * ============================================================================
 * Contains strictly verified facts for real projects ("Proyek nyata · klien dirahasiakan").
 * Never invent outcomes, tech stacks, durations, or numbers beyond the verified facts below.
 *
 * HOW TO TURN A REAL PROJECT INTO A FULL CASE STUDY LATER (ONCE CLIENT GRANTS WRITTEN PERMISSION):
 * 1. Obtain written permission from the client specifying whether the client name may be disclosed
 *    or kept as an industry descriptor, and which operational outcomes are approved for publication.
 * 2. Add the following fields to the entry (or create a linked entry in `src/data/case-studies.ts`):
 *    - `clientName` (string): Verified client name or approved industry descriptor.
 *    - `clientPermissionDate` (string, ISO YYYY-MM-DD): Date written permission was granted.
 *    - `timeline` / `duration` (string): Actual build duration (e.g., "6 minggu" / "6 weeks").
 *    - `stack` (string[]): Verified production technology stack used in the build.
 *    - `problem` (string): Detailed operational problem before the system was built.
 *    - `solutionSteps` (Array<{ title: string; body: string }>): Step-by-step architecture and workflow built.
 *    - `tradeOffs` (Array<{ decision: string; chosen: string; skipped: string; why: string }>): Architectural compromises.
 *    - `verifiedOutcomes` (Array<{ metric: string; label: string; context: string }>): Measured, client-approved results.
 *    - `screenshots` (Array<{ src: string; alt: string; caption: string }>): Approved production screenshots.
 * 3. Change the visible label from `"Proyek nyata · klien dirahasiakan"` to `"Studi kasus proyek nyata"`
 *    (or keep `"klien dirahasiakan"` if the client approves the case study under an NDA).
 */

import type { ServiceSlug } from './services';

export interface RealProjectExperience {
  id: 'minuman' | 'pesantren' | 'gudang';
  slugId: string;
  slugEn: string;
  tagId: string;
  tagEn: string;
  titleId: string;
  titleEn: string;
  oneLinerId: string;
  oneLinerEn: string;
  descriptionId: string;
  descriptionEn: string;
  valueNoteId?: string;
  valueNoteEn?: string;
  projectValueNoteId?: string;
  projectValueNoteEn?: string;
  workItemsId: string[];
  workItemsEn: string[];
  confidentialLabelId: string;
  confidentialLabelEn: string;
  ctaPromptId: string;
  ctaPromptEn: string;
  seoTitleId: string;
  seoTitleEn: string;
  seoDescriptionId: string;
  seoDescriptionEn: string;
  illustrationVariant: 'software' | 'automation' | 'ai-agent' | 'website';
  serviceSlugs: ServiceSlug[];
}

export const REAL_PROJECT_BADGE = {
  id: 'Proyek nyata · klien dirahasiakan',
  en: 'Real project · client kept confidential',
} as const;

export const REAL_PROJECT_BADGE_ID = REAL_PROJECT_BADGE.id;
export const REAL_PROJECT_BADGE_EN = REAL_PROJECT_BADGE.en;

export const REAL_PROJECTS_EXPERIENCE: RealProjectExperience[] = [
  {
    id: 'minuman',
    slugId: 'sistem-pencatatan-brand-minuman',
    slugEn: 'beverage-brand-recording-system',
    tagId: REAL_PROJECT_BADGE.id,
    tagEn: REAL_PROJECT_BADGE.en,
    titleId: 'Sistem pencatatan untuk brand minuman',
    titleEn: 'Recording system for a beverage brand',
    oneLinerId:
      'Sistem yang mencatat dan menghitung suhu, membukukan barang, dan melacak barang yang gagal untuk sebuah brand minuman.',
    oneLinerEn:
      'A system that records and calculates temperature, logs inventory, and tracks defective items for a beverage brand.',
    descriptionId:
      'Sistem yang mencatat dan menghitung suhu, membukukan barang, dan melacak barang yang gagal untuk sebuah brand minuman. Nilai proyek di atas Rp100 juta.',
    descriptionEn:
      'A system that records and calculates temperature, logs inventory, and tracks defective items for a beverage brand. Project value above IDR 100 million.',
    valueNoteId: 'Nilai proyek di atas Rp100 juta',
    valueNoteEn: 'Project value above IDR 100 million',
    projectValueNoteId: 'Nilai proyek di atas Rp100 juta',
    projectValueNoteEn: 'Project value above IDR 100 million',
    workItemsId: [
      'Pencatatan dan perhitungan suhu',
      'Pembukuan barang',
      'Pelacakan barang gagal',
    ],
    workItemsEn: [
      'Temperature recording and calculation',
      'Inventory bookkeeping',
      'Defective item tracking',
    ],
    confidentialLabelId: 'Klien dirahasiakan',
    confidentialLabelEn: 'Client kept confidential',
    ctaPromptId: 'Punya kebutuhan serupa? Ceritakan ke kami.',
    ctaPromptEn: 'Have a similar need? Tell us about it.',
    seoTitleId: 'Sistem Pencatatan Brand Minuman — Proyek Nyata | CHESTAADOTCOM',
    seoTitleEn: 'Beverage Brand Recording System — Real Project | CHESTAADOTCOM',
    seoDescriptionId:
      'Proyek nyata klien dirahasiakan: sistem pencatatan dan perhitungan suhu, pembukuan barang, serta pelacakan barang gagal untuk brand minuman.',
    seoDescriptionEn:
      'Real project (client kept confidential): a system that records and calculates temperature, logs inventory, and tracks defective beverage items.',
    illustrationVariant: 'software',
    serviceSlugs: ['software-custom', 'otomasi-workflow', 'ai-agent', 'pembuatan-website'],
  },
  {
    id: 'pesantren',
    slugId: 'sistem-pondok-pesantren',
    slugEn: 'islamic-boarding-school-system',
    tagId: REAL_PROJECT_BADGE.id,
    tagEn: REAL_PROJECT_BADGE.en,
    titleId: 'Sistem operasional pondok pesantren',
    titleEn: 'Operational system for an Islamic boarding school (pesantren)',
    oneLinerId: 'Sistem untuk menunjang operasional sebuah pondok pesantren.',
    oneLinerEn: 'A system to support operations for an Islamic boarding school (pesantren).',
    descriptionId: 'Sistem untuk menunjang operasional sebuah pondok pesantren.',
    descriptionEn: 'A system to support operations for an Islamic boarding school (pesantren).',
    workItemsId: ['Sistem untuk operasional pondok pesantren'],
    workItemsEn: ['System for boarding school operations'],
    confidentialLabelId: 'Klien dirahasiakan',
    confidentialLabelEn: 'Client kept confidential',
    ctaPromptId: 'Punya kebutuhan serupa? Ceritakan ke kami.',
    ctaPromptEn: 'Have a similar need? Tell us about it.',
    seoTitleId: 'Sistem Operasional Pesantren — Proyek Nyata | CHESTAADOTCOM',
    seoTitleEn: 'Pesantren Operations System — Real Project | CHESTAADOTCOM',
    seoDescriptionId:
      'Proyek nyata klien dirahasiakan: pengembangan sistem untuk menunjang operasional pondok pesantren oleh tim rekayasa CHESTAADOTCOM di Tangsel.',
    seoDescriptionEn:
      'Real project (client kept confidential): an operational software system built to support an Islamic boarding school (pesantren) by CHESTAADOTCOM.',
    illustrationVariant: 'software',
    serviceSlugs: ['software-custom', 'pembuatan-website'],
  },
  {
    id: 'gudang',
    slugId: 'sistem-gudang-logistik',
    slugEn: 'logistics-warehouse-system',
    tagId: REAL_PROJECT_BADGE.id,
    tagEn: REAL_PROJECT_BADGE.en,
    titleId: 'Sistem gudang logistik',
    titleEn: 'Logistics warehouse management system',
    oneLinerId: 'Sistem untuk mengelola operasional sebuah gudang logistik.',
    oneLinerEn: 'A system to manage operations for a logistics warehouse.',
    descriptionId: 'Sistem untuk mengelola operasional sebuah gudang logistik.',
    descriptionEn: 'A system to manage operations for a logistics warehouse.',
    workItemsId: ['Sistem untuk operasional gudang'],
    workItemsEn: ['System for warehouse operations'],
    confidentialLabelId: 'Klien dirahasiakan',
    confidentialLabelEn: 'Client kept confidential',
    ctaPromptId: 'Punya kebutuhan serupa? Ceritakan ke kami.',
    ctaPromptEn: 'Have a similar need? Tell us about it.',
    seoTitleId: 'Sistem Gudang Logistik — Proyek Nyata | CHESTAADOTCOM',
    seoTitleEn: 'Logistics Warehouse System — Real Project | CHESTAADOTCOM',
    seoDescriptionId:
      'Proyek nyata klien dirahasiakan: pengembangan sistem untuk mengelola operasional gudang logistik oleh tim rekayasa CHESTAADOTCOM di Tangsel.',
    seoDescriptionEn:
      'Real project (client kept confidential): an operational software system built to manage a logistics warehouse by the CHESTAADOTCOM team in BSD.',
    illustrationVariant: 'automation',
    serviceSlugs: ['software-custom', 'otomasi-workflow'],
  },
];

export function getRealProjectBySlug(slug: string): RealProjectExperience | undefined {
  const clean = slug.trim().toLowerCase();
  return REAL_PROJECTS_EXPERIENCE.find(
    (item) =>
      item.slugId === clean ||
      item.slugEn === clean ||
      item.id === clean
  );
}

export function getRealProjectHref(
  item: RealProjectExperience,
  locale: 'id' | 'en' = 'id'
): string {
  return locale === 'en'
    ? `/en/portfolio/${item.slugEn}`
    : `/id/portfolio/${item.slugId}`;
}

export function getRealProjectsByServiceSlug(
  serviceSlug: ServiceSlug
): RealProjectExperience[] {
  return REAL_PROJECTS_EXPERIENCE.filter((item) =>
    item.serviceSlugs.includes(serviceSlug)
  );
}

export const EXPERIENCE_FOOTER_NOTE = {
  id: 'Masih ada beberapa proyek lain. Kami ceritakan detailnya saat audit gratis, sesuai izin klien.',
  en: 'We have built several other projects. We share details during the free audit, subject to client permission.',
};

export const EXPERIENCE_DISCLOSURE_NOTE = {
  id: 'Nama klien tidak kami tampilkan tanpa izin tertulis. Studi kasus bernama kami tambahkan setelah klien mengizinkan.',
  en: 'Client names are not displayed without written permission. Named case studies are added once clients grant permission.',
};
