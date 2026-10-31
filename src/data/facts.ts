import { SITE_METADATA } from './seo-metadata';
import { REAL_PROJECTS_EXPERIENCE } from './experience';
import { getAllServices } from './services';

export const REAL_PROJECTS_EXPERIENCE_SUMMARY = {
  count: REAL_PROJECTS_EXPERIENCE.length,
  confidentialityNoteId: 'Semua proyek nyata dikerjakan dengan standar kerahasiaan klien.',
  confidentialityNoteEn: 'All real projects are executed with client confidentiality standards.',
};

const CANONICAL_SERVICES = getAllServices();

/**
 * Single source of truth for verified CHESTAADOTCOM facts (`data/facts`).
 * All editorial content, founder notes, case study references, and stack claims
 * must align with these verified facts.
 */
export const CHESTAA_FACTS = {
  brandName: SITE_METADATA.brandName,
  siteUrl: SITE_METADATA.siteUrl,
  startingPriceRp: 1200000,
  startingPriceFormatted: 'Rp1.200.000',
  founders: [
    {
      name: 'Muhammadabid',
      role: 'Founder & AI Agentic Engineer',
      background: 'D4 Teknologi Rekayasa Perangkat Lunak — Politeknik Negeri Padang (2022–2026)',
    },
    {
      name: 'Farel',
      role: 'Co-Founder & Lead Developer',
      background: 'S1 Informatika — Universitas Pembangunan Jaya (2023–2027)',
    },
  ],
  location: {
    area: 'Jurang Mangu Barat, Pondok Aren, Tangerang Selatan, Banten 15223',
    corridor: 'Bintaro — BSD City — Tangerang Selatan — Jakarta',
  },
  verifiedExperienceCount: REAL_PROJECTS_EXPERIENCE_SUMMARY.count,
  verifiedExperienceConfidential: REAL_PROJECTS_EXPERIENCE_SUMMARY.confidentialityNoteId,
  verifiedExperience: REAL_PROJECTS_EXPERIENCE,
  services: CANONICAL_SERVICES.map((s) => ({
    id: s.slug,
    slugId: s.slug,
    slugEn: s.enSlug,
    startingPrice: s.pricingNote?.startingPriceNumeric || 1200000,
  })),
  /**
   * Verified core stack offered and documented by CHESTAADOTCOM in official service specs.
   * Unverified stack claims in illustrative client stories must not be presented as past client audits.
   */
  verifiedCoreCapabilities: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'WhatsApp Cloud API',
    'OpenAI & Gemini APIs',
    'PostgreSQL / Supabase / Drizzle ORM',
    'Docker & Vercel Edge',
  ],
};
