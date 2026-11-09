import fs from 'fs';
import path from 'path';
import { getPublishedProjects } from '../src/data/projects';
import { getPublishedCaseStudies } from '../src/data/case-studies';
import { REAL_PROJECTS_EXPERIENCE } from '../src/data/experience';
import { BLOG_POSTS, ENGLISH_BLOG_POSTS } from '../src/data/blog-posts';
import { getAllServices } from '../src/data/services';
import { FAQ_THREADS } from '../src/data/faq';
import { HOME_FAQS, ROUTES_SEO_MAP } from '../src/data/seo-metadata';
import { ENGLISH_HOME_FAQS, ENGLISH_ROUTES_SEO } from '../src/lib/i18n-content';
import { getAllUnifiedAreaPages } from '../src/data/unified-areas';
import {
  getAllSitemapRoutes,
  generateRssXml,
  generateLlmsTxt,
  generateLlmsFullTxt,
} from '../src/utils/sitemapGenerator';
import { getMetaTagsForUrl, injectSocialMeta } from '../src/lib/social-meta';

const FORBIDDEN_FIELDS = [
  'client',
  'clientName',
  'clientLogo',
  'testimonial',
  'testimonials',
  'quote',
  'rating',
  'review',
  'aggregateRating',
  'measuredResults',
  'roi',
  'metrics',
  'internal',
  'internalBadgeLabel',
];

const BANNED_INTERNAL_REGEX = /\b(proyek\s+internal|internal\s+project|studi\s+kasus\s+internal|internal\s+case\s+study)\b/i;

const SAMPLE_NOTE_ID =
  'Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.';
const SAMPLE_NOTE_EN =
  'Sample project designed to show our workflow. Not a client project.';

const CASE_STUDY_INDEX_SUB_ID =
  'Contoh studi kasus yang memperlihatkan cara kami menganalisis masalah, mengambil keputusan, dan menimbang kompromi. Pengalaman proyek nyata kami ada di halaman Tentang dan Proyek.';
const CASE_STUDY_INDEX_SUB_EN =
  'Sample case studies that show how we analyze problems, make decisions, and weigh trade-offs. Our real project experience is on the About and Projects pages.';

function checkForbiddenFields(
  entry: Record<string, unknown>,
  entryName: string,
  errors: string[]
) {
  for (const field of FORBIDDEN_FIELDS) {
    if (field in entry && entry[field] !== undefined) {
      errors.push(
        `[Schema Violation] ${entryName} contains forbidden field "${field}".`
      );
    }
  }
}

function scanObjectForInternal(
  value: unknown,
  pathLabel: string,
  errors: string[]
) {
  if (typeof value === 'string') {
    if (BANNED_INTERNAL_REGEX.test(value)) {
      errors.push(
        `[Banned Word "internal"] Found in ${pathLabel}: "${value.slice(0, 140)}"`
      );
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, idx) =>
      scanObjectForInternal(item, `${pathLabel}[${idx}]`, errors)
    );
    return;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      scanObjectForInternal(v, `${pathLabel}.${k}`, errors);
    }
  }
}

function main() {
  const errors: string[] = [];

  console.log('======================================================================');
  console.log(' CHESTAADOTCOM — PORTFOLIO & CASE STUDY LABELING & BANNED-WORD GATE');
  console.log('======================================================================\n');

  // 1. Validate Real Projects (3 entries in data/experience)
  if (REAL_PROJECTS_EXPERIENCE.length !== 3) {
    errors.push(
      `Expected exactly 3 real projects in REAL_PROJECTS_EXPERIENCE, found ${REAL_PROJECTS_EXPERIENCE.length}.`
    );
  }
  for (const rp of REAL_PROJECTS_EXPERIENCE) {
    const label = `RealProject[${rp.id}]`;
    checkForbiddenFields(rp as unknown as Record<string, unknown>, label, errors);
    scanObjectForInternal(rp, label, errors);

    if (rp.tagId !== 'Proyek nyata · klien dirahasiakan') {
      errors.push(
        `${label} tagId must be "Proyek nyata · klien dirahasiakan", got "${rp.tagId}".`
      );
    }
    if (rp.tagEn !== 'Real project · client kept confidential') {
      errors.push(
        `${label} tagEn must be "Real project · client kept confidential", got "${rp.tagEn}".`
      );
    }
    if (rp.confidentialLabelId !== 'Klien dirahasiakan') {
      errors.push(
        `${label} confidentialLabelId must be "Klien dirahasiakan", got "${rp.confidentialLabelId}".`
      );
    }
    if (rp.confidentialLabelEn !== 'Client kept confidential') {
      errors.push(
        `${label} confidentialLabelEn must be "Client kept confidential", got "${rp.confidentialLabelEn}".`
      );
    }
    if (rp.ctaPromptId !== 'Punya kebutuhan serupa? Ceritakan ke kami.') {
      errors.push(
        `${label} ctaPromptId must be "Punya kebutuhan serupa? Ceritakan ke kami.", got "${rp.ctaPromptId}".`
      );
    }
    if (rp.ctaPromptEn !== 'Have a similar need? Tell us about it.') {
      errors.push(
        `${label} ctaPromptEn must be "Have a similar need? Tell us about it.", got "${rp.ctaPromptEn}".`
      );
    }
  }

  // 2. Validate Sample Projects (ID & EN)
  for (const proj of getPublishedProjects('id')) {
    const label = `SampleProjectID[${proj.slug}]`;
    checkForbiddenFields(proj as unknown as Record<string, unknown>, label, errors);
    scanObjectForInternal(proj, label, errors);

    if (proj.badgeLabel !== 'Contoh proyek') {
      errors.push(
        `${label} missing visible label "Contoh proyek" (got "${proj.badgeLabel}").`
      );
    }
    if (proj.sampleNote !== SAMPLE_NOTE_ID) {
      errors.push(
        `${label} missing or invalid sampleNote (got "${proj.sampleNote}").`
      );
    }
  }

  for (const proj of getPublishedProjects('en')) {
    const label = `SampleProjectEN[${proj.slug}]`;
    checkForbiddenFields(proj as unknown as Record<string, unknown>, label, errors);
    scanObjectForInternal(proj, label, errors);

    if (proj.badgeLabel !== 'Sample project') {
      errors.push(
        `${label} missing visible label "Sample project" (got "${proj.badgeLabel}").`
      );
    }
    if (proj.sampleNote !== SAMPLE_NOTE_EN) {
      errors.push(
        `${label} missing or invalid sampleNote (got "${proj.sampleNote}").`
      );
    }
  }

  // 3. Validate Sample Case Studies (ID & EN)
  for (const cs of getPublishedCaseStudies('id')) {
    const label = `SampleCaseStudyID[${cs.slug}]`;
    checkForbiddenFields(cs as unknown as Record<string, unknown>, label, errors);
    scanObjectForInternal(cs, label, errors);

    if (cs.badgeLabel !== 'Studi kasus contoh') {
      errors.push(
        `${label} missing visible label "Studi kasus contoh" (got "${cs.badgeLabel}").`
      );
    }
    if (cs.sampleNote !== SAMPLE_NOTE_ID) {
      errors.push(
        `${label} missing or invalid sampleNote (got "${cs.sampleNote}").`
      );
    }
    if (!cs.targetsBadgeLabel.toLowerCase().includes('target desain')) {
      errors.push(
        `${label} must use "Target desain" instead of results (got "${cs.targetsBadgeLabel}").`
      );
    }
  }

  for (const cs of getPublishedCaseStudies('en')) {
    const label = `SampleCaseStudyEN[${cs.slug}]`;
    checkForbiddenFields(cs as unknown as Record<string, unknown>, label, errors);
    scanObjectForInternal(cs, label, errors);

    if (cs.badgeLabel !== 'Sample case study') {
      errors.push(
        `${label} missing visible label "Sample case study" (got "${cs.badgeLabel}").`
      );
    }
    if (cs.sampleNote !== SAMPLE_NOTE_EN) {
      errors.push(
        `${label} missing or invalid sampleNote (got "${cs.sampleNote}").`
      );
    }
    if (!cs.targetsBadgeLabel.toLowerCase().includes('design target')) {
      errors.push(
        `${label} must use "Design target" instead of results (got "${cs.targetsBadgeLabel}").`
      );
    }
  }

  // 4. Scan Blog Posts, Services, FAQs, and SEO Metadata for "internal"
  BLOG_POSTS.forEach((p) => scanObjectForInternal(p, `BlogID[${p.slug}]`, errors));
  ENGLISH_BLOG_POSTS.forEach((p) =>
    scanObjectForInternal(p, `BlogEN[${p.slug}]`, errors)
  );
  getAllServices('id').forEach((s) => scanObjectForInternal(s, `ServiceID[${s.slug}]`, errors));
  getAllServices('en').forEach((s) => scanObjectForInternal(s, `ServiceEN[${s.slug}]`, errors));
  FAQ_THREADS.forEach((f) => scanObjectForInternal(f, `FAQ[${f.id}]`, errors));
  scanObjectForInternal(HOME_FAQS, 'HOME_FAQS', errors);
  scanObjectForInternal(ENGLISH_HOME_FAQS, 'ENGLISH_HOME_FAQS', errors);
  scanObjectForInternal(ROUTES_SEO_MAP, 'ROUTES_SEO_MAP', errors);
  scanObjectForInternal(ENGLISH_ROUTES_SEO, 'ENGLISH_ROUTES_SEO', errors);
  getAllUnifiedAreaPages('id').forEach((a) =>
    scanObjectForInternal(a, `UnifiedAreaID[${a.areaSlug}]`, errors)
  );
  getAllUnifiedAreaPages('en').forEach((a) =>
    scanObjectForInternal(a, `UnifiedAreaEN[${a.areaSlug}]`, errors)
  );
  getAllUnifiedAreaPages('id').forEach((a) =>
    scanObjectForInternal(a, `UnifiedAreaID[${a.slug}]`, errors)
  );
  getAllUnifiedAreaPages('en').forEach((a) =>
    scanObjectForInternal(a, `UnifiedAreaEN[${a.slug}]`, errors)
  );

  // 5. Scan all rendered routes (HTML, Meta Tags, JSON-LD Schema)
  const htmlTemplate = fs.readFileSync(
    path.resolve(process.cwd(), 'index.html'),
    'utf8'
  );
  const allRoutes = getAllSitemapRoutes();

  for (const route of allRoutes) {
    const meta = getMetaTagsForUrl(route.path);
    const rendered = injectSocialMeta(htmlTemplate, route.path);

    // Check meta title, description, imageAlt
    for (const [field, val] of [
      ['title', meta.title],
      ['description', meta.description],
      ['imageAlt', meta.imageAlt],
    ] as const) {
      if (BANNED_INTERNAL_REGEX.test(val)) {
        errors.push(
          `[Route Meta ${route.path}] ${field} contains banned word "internal": "${val}"`
        );
      }
    }

    // Check JSON-LD for "internal" and for banned Review / AggregateRating
    const jsonLdStr = JSON.stringify(meta.jsonLd);
    if (BANNED_INTERNAL_REGEX.test(jsonLdStr)) {
      errors.push(
        `[Route JSON-LD ${route.path}] JSON-LD contains banned word "internal".`
      );
    }
    if (/"@type"\s*:\s*"(Review|AggregateRating)"/i.test(jsonLdStr)) {
      errors.push(
        `[Route JSON-LD ${route.path}] JSON-LD contains forbidden Review or AggregateRating schema.`
      );
    }

    // Check visible rendered body HTML and alt attributes for "internal"
    const bodyTextAndAlts = rendered
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ');
    if (BANNED_INTERNAL_REGEX.test(bodyTextAndAlts)) {
      const match = bodyTextAndAlts.match(/.{0,40}\binternal\b.{0,40}/i);
      errors.push(
        `[Rendered HTML ${route.path}] Contains banned word "internal": "${
          match ? match[0].trim() : ''
        }"`
      );
    }

    // Specific route checks for portfolio & case studies
    if (route.path === '/id/studi-kasus') {
      if (!rendered.includes(CASE_STUDY_INDEX_SUB_ID)) {
        errors.push(`[${route.path}] Missing required case studies index subheader.`);
      }
      if (!rendered.includes(SAMPLE_NOTE_ID)) {
        errors.push(`[${route.path}] Missing required sample disclosure note.`);
      }
    }
    if (route.path === '/en/case-studies') {
      if (!rendered.includes(CASE_STUDY_INDEX_SUB_EN)) {
        errors.push(`[${route.path}] Missing required English case studies index subheader.`);
      }
      if (!rendered.includes(SAMPLE_NOTE_EN)) {
        errors.push(`[${route.path}] Missing required English sample disclosure note.`);
      }
    }
  }

  // 6. Verify RSS, llms.txt, and llms-full.txt
  const rssXml = generateRssXml();
  const llmsTxt = generateLlmsTxt();
  const llmsFullTxt = generateLlmsFullTxt();

  for (const [docName, content] of [
    ['rss.xml', rssXml],
    ['llms.txt', llmsTxt],
    ['llms-full.txt', llmsFullTxt],
  ] as const) {
    if (BANNED_INTERNAL_REGEX.test(content)) {
      const match = content.match(/.{0,50}\binternal\b.{0,50}/i);
      errors.push(
        `[${docName}] Contains banned word "internal": "${
          match ? match[0].trim() : ''
        }"`
      );
    }
  }

  if (errors.length > 0) {
    console.error(`\n❌ PORTFOLIO & LABEL VERIFICATION FAILED WITH ${errors.length} ERROR(S):`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log(
    `✅ Verified 3 real projects ("Proyek nyata · klien dirahasiakan"), 6 sample projects ("Contoh proyek"), 5 sample case studies ("Studi kasus contoh"), ${allRoutes.length} routes, JSON-LD, RSS, and llms.txt with 0 "internal" occurrences and 0 forbidden client/result fields!`
  );
}

main();
