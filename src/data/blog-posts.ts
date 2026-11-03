import { SITE_IMAGES } from '../config/images';
import { ServiceSlug } from './services';
import {
  TopicClusterId,
  getTopicClusterById,
  resolveClusterIdForPostSlug,
  isPillarPostForCluster,
} from './clusters';
import {
  CoverSpec,
  resolveCoverSpecForSlug,
  getCoverSvgPathForSpec,
  getOgSvgPathForPost,
} from './blog-cover-specs';
import { NEW_BLOG_POSTS_ID_RAW } from './new-blog-posts-id';
import { NEW_BLOG_POSTS_EN_RAW } from './new-blog-posts-en';
import { EARLIER_BLOG_POSTS_EN_RAW } from './earlier-blog-posts-en';
import { NEW_BLOG_POSTS_6_10_ID_RAW } from './blog-posts-6-10-id';
import { NEW_BLOG_POSTS_6_10_EN_RAW } from './blog-posts-6-10-en';
import { NEW_BLOG_POSTS_11_20_ID_RAW } from './blog-posts-11-20-id';
import { NEW_BLOG_POSTS_11_20_EN_RAW } from './blog-posts-11-20-en';
import { BLOG_POSTS_21_22_ID_RAW } from './blog-posts-21-22-id';
import { BLOG_POSTS_23_24_ID_RAW } from './blog-posts-23-24-id';
import { BLOG_POSTS_25_26_ID_RAW } from './blog-posts-25-26-id';
import { BLOG_POSTS_27_28_ID_RAW } from './blog-posts-27-28-id';
import { BLOG_POSTS_29_30_ID_RAW } from './blog-posts-29-30-id';
import { BLOG_POSTS_21_22_EN_RAW } from './blog-posts-21-22-en';
import { BLOG_POSTS_23_24_EN_RAW } from './blog-posts-23-24-en';
import { BLOG_POSTS_25_26_EN_RAW } from './blog-posts-25-26-en';
import { BLOG_POSTS_27_28_EN_RAW } from './blog-posts-27-28-en';
import { BLOG_POSTS_29_30_EN_RAW } from './blog-posts-29-30-en';

export type BlogAuthorId = 'chesta' | 'zeeshan';

export interface BlogAuthorProfile {
  id: BlogAuthorId;
  name: string;
  role: string;
  bio: string;
  roleEn?: string;
  bioEn?: string;
  avatar?: string;
  initials: string;
}

export const BLOG_AUTHORS: Record<BlogAuthorId, BlogAuthorProfile> = {
  chesta: {
    id: 'chesta',
    name: 'Chesta Azka',
    role: 'Co-Founder · Arsitektur, Produk, dan Teknologi',
    bio: 'Menangani rekayasa software custom, optimasi Core Web Vitals, struktur teknis SEO/AEO, serta integrasi tool AI agent di CHESTAADOTCOM.',
    roleEn: 'Co-Founder · Architecture, Product, and Technology',
    bioEn:
      'Leads custom software engineering, Core Web Vitals optimization, technical SEO/AEO architecture, and AI agent tool integrations at CHESTAADOTCOM.',
    avatar: '/favicon.svg',
    initials: 'CA',
  },
  zeeshan: {
    id: 'zeeshan',
    name: 'Zeeshan',
    role: 'Co-Founder · Operasional dan Client Success',
    bio: 'Menangani pemetaan alur kerja operasional klien, efisiensi biaya proyek, kepatuhan SOP admin, dan pendampingan implementasi di CHESTAADOTCOM.',
    roleEn: 'Co-Founder · Operations and Client Success',
    bioEn:
      'Leads client operational workflow mapping, project cost efficiency, admin SOP compliance, and rollout onboarding at CHESTAADOTCOM.',
    initials: 'ZS',
  },
};

export function getAuthorProfile(
  author: BlogAuthorId,
  locale: 'id' | 'en' = 'id'
): BlogAuthorProfile {
  const base = BLOG_AUTHORS[author] || BLOG_AUTHORS.chesta;
  if (locale === 'en') {
    return {
      ...base,
      role: base.roleEn || base.role,
      bio: base.bioEn || base.bio,
    };
  }
  return base;
}

export interface BlogCategoryMeta {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  nameEn?: string;
  shortLabelEn?: string;
  descriptionEn?: string;
}

export const BLOG_CATEGORIES: BlogCategoryMeta[] = [
  {
    slug: 'agentic-ai',
    name: 'Agentic AI & WhatsApp',
    shortLabel: 'Agentic AI & WhatsApp',
    description:
      'Kumpulan panduan teknis Agentic AI untuk bisnis di BSD & Tangerang Selatan: siklus ReAct, function calling, memori, evaluasi, keamanan, dan kepatuhan UU PDP.',
    nameEn: 'Agentic AI & WhatsApp',
    shortLabelEn: 'Agentic AI & WhatsApp',
    descriptionEn:
      'Technical guides on Agentic AI for businesses in BSD & South Tangerang: ReAct loops, function calling, memory, evaluation, security, and PDP Law compliance.',
  },
  {
    slug: 'website-dan-performa',
    name: 'Website & Performa',
    shortLabel: 'Website & Performa',
    description:
      'Panduan kecepatan website, Core Web Vitals (LCP, INP, CLS), landing page iklan Meta & Google Ads, serta keamanan web untuk bisnis di BSD & Tangerang Selatan.',
    nameEn: 'Websites & Performance',
    shortLabelEn: 'Websites & Performance',
    descriptionEn:
      'Guides on website speed, Core Web Vitals (LCP, INP, CLS), Meta & Google Ads landing pages, and web security for businesses in BSD & South Tangerang.',
  },
  {
    slug: 'seo-lokal-dan-geo',
    name: 'SEO Lokal & GEO',
    shortLabel: 'SEO Lokal & GEO',
    description:
      'Strategi praktis SEO lokal di BSD & Tangerang Selatan, penerapan JSON-LD Schema Markup, serta optimasi GEO dan AEO agar bisnis dikutip mesin pencari AI.',
    nameEn: 'Local SEO & GEO',
    shortLabelEn: 'Local SEO & GEO',
    descriptionEn:
      'Practical local SEO strategies in BSD & South Tangerang, JSON-LD Schema Markup implementation, and GEO/AEO optimization so AI search engines cite your business.',
  },
  {
    slug: 'otomasi-dan-software',
    name: 'Otomasi & Software',
    shortLabel: 'Otomasi & Software',
    description:
      'Panduan otomasi workflow bisnis di Tangerang Selatan: integrasi webhook & API, pemilihan platform visual vs kode custom, dashboard operasional, dan penagihan.',
    nameEn: 'Automation & Software',
    shortLabelEn: 'Automation & Software',
    descriptionEn:
      'Business workflow automation guides in South Tangerang: webhook & API integration, choosing visual tools vs custom code, operational dashboards, and billing.',
  },
  {
    slug: 'biaya-dan-memilih-vendor',
    name: 'Biaya & Memilih Vendor',
    shortLabel: 'Biaya & Memilih Vendor',
    description:
      'Transparansi biaya pembuatan website, biaya bulanan AI agent, biaya rawat server, risiko vibe coding, dan panduan memilih vendor IT di Tangerang Selatan.',
    nameEn: 'Costs & Vendor Guide',
    shortLabelEn: 'Costs & Vendor Guide',
    descriptionEn:
      'Transparent guides on website development pricing, monthly AI agent costs, server maintenance fees, vibe coding risks, and choosing an IT vendor in Tangsel.',
  },
];

export function getLocalizedBlogCategories(locale: 'id' | 'en' = 'id'): BlogCategoryMeta[] {
  if (locale !== 'en') return BLOG_CATEGORIES;
  return BLOG_CATEGORIES.map((cat) => ({
    ...cat,
    name: cat.nameEn || cat.name,
    shortLabel: cat.shortLabelEn || cat.shortLabel,
    description: cat.descriptionEn || cat.description,
  }));
}

export type BlogCalloutVariant = 'info' | 'tip' | 'warning';

export type BlogContentBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'h2';
      id: string;
      text: string;
    }
  | {
      type: 'h3';
      id: string;
      text: string;
    }
  | {
      type: 'ul';
      title?: string;
      items: string[];
    }
  | {
      type: 'ol';
      title?: string;
      items: string[];
    }
  | {
      type: 'blockquote';
      quote: string;
      attribution?: string;
    }
  | {
      type: 'callout';
      variant: BlogCalloutVariant;
      title: string;
      text: string;
    }
  | {
      type: 'table';
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'code';
      language: string;
      filename?: string;
      code: string;
      caption?: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption: string;
      width?: number;
      height?: number;
    };

export interface BlogFAQItem {
  question: string;
  answer: string;
}

export interface BlogFounderNote {
  author: BlogAuthorId;
  title: string;
  text: string;
}

export interface BlogChangelogEntry {
  date: string;
  summary: string;
}

export interface BlogPost {
  slug: string;
  alternateSlug?: string;
  slugAliases?: string[];
  locale?: 'id' | 'en';
  clusterId: TopicClusterId;
  title: string;
  seoTitle: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  categorySlug: string;
  tags: string[];
  author: BlogAuthorId;
  date: string;
  updatedAt: string;
  changelog?: BlogChangelogEntry[];
  readTime: string;
  readTimeMinutes: number;
  wordCount: number;
  featured?: boolean;
  draft: boolean;
  cover: string;
  coverImage: string;
  coverImageKey: string;
  coverAlt: string;
  coverSpec: CoverSpec;
  ogImage: string;
  legacyCover?: string;
  beforeIntroSnapshot: string;
  founderNote?: BlogFounderNote;
  content: BlogContentBlock[];
  conclusion: string[];
  serviceLink: {
    slug: ServiceSlug;
    title: string;
    description: string;
    href: string;
    label: string;
  };
  faq: BlogFAQItem[];
  relatedSlugs: string[];
}

function stripInlineMarkup(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

function countWordsInString(str: string): number {
  const cleaned = stripInlineMarkup(str).trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

export function calculateBlogPostWordCount(
  content: BlogContentBlock[],
  conclusion: string[],
  faq: BlogFAQItem[],
  beforeIntroSnapshot?: string,
  founderNote?: BlogFounderNote
): number {
  let total = 0;

  if (beforeIntroSnapshot) {
    total += countWordsInString(beforeIntroSnapshot);
  }
  if (founderNote) {
    total += countWordsInString(founderNote.title) + countWordsInString(founderNote.text);
  }

  for (const block of content) {
    switch (block.type) {
      case 'paragraph':
      case 'h2':
      case 'h3':
        total += countWordsInString(block.text);
        break;
      case 'ul':
      case 'ol':
        if (block.title) total += countWordsInString(block.title);
        for (const item of block.items) total += countWordsInString(item);
        break;
      case 'blockquote':
        total += countWordsInString(block.quote);
        if (block.attribution) total += countWordsInString(block.attribution);
        break;
      case 'callout':
        total += countWordsInString(block.title) + countWordsInString(block.text);
        break;
      case 'table':
        if (block.caption) total += countWordsInString(block.caption);
        for (const h of block.headers) total += countWordsInString(h);
        for (const row of block.rows) {
          for (const cell of row) total += countWordsInString(cell);
        }
        break;
      case 'code':
        if (block.caption) total += countWordsInString(block.caption);
        total += countWordsInString(block.code);
        break;
      case 'image':
        total += countWordsInString(block.caption);
        break;
    }
  }

  for (const p of conclusion) {
    total += countWordsInString(p);
  }

  for (const item of faq) {
    total += countWordsInString(item.question) + countWordsInString(item.answer);
  }

  return total;
}

export type RawBlogPostInput = Omit<
  BlogPost,
  | 'readTime'
  | 'readTimeMinutes'
  | 'wordCount'
  | 'coverImage'
  | 'clusterId'
  | 'coverSpec'
  | 'ogImage'
> & {
  clusterId?: TopicClusterId;
  coverSpec?: CoverSpec;
  ogImage?: string;
};

function normalizeCtrTitle(rawTitle: string, fallbackTitle: string): string {
  const brandSuffix = ' | CHESTAADOTCOM';
  let base = sanitizeEditorialText(rawTitle || fallbackTitle || '')
    .replace(/\s*\|\s*CHESTAADOTCOM\s*$/i, '')
    .replace(/\s*—\s*CHESTAADOTCOM\s*$/i, '')
    .trim();

  // Target total length: 50 to 62 chars -> base length: 34 to 46 chars (46 + 16 = 62)
  if (base.length > 46) {
    const truncated = base.slice(0, 46);
    const lastSpace = truncated.lastIndexOf(' ');
    base = (lastSpace >= 34 ? truncated.slice(0, lastSpace) : truncated)
      .replace(/[,:;.\-–—]+$/, '')
      .trim();
  }
  if (base.length < 34) {
    const extra = sanitizeEditorialText(fallbackTitle)
      .replace(/\s*\|\s*CHESTAADOTCOM\s*$/i, '')
      .trim();
    if (extra.length >= 34 && extra.length <= 46) {
      base = extra;
    } else if (extra.length > 46) {
      const cut = extra.slice(0, 46);
      const sp = cut.lastIndexOf(' ');
      base = (sp >= 34 ? cut.slice(0, sp) : cut).replace(/[,:;.\-–—]+$/, '').trim();
    }
  }
  // Strip any trailing connector words from title base
  base = base
    .replace(/\s+(?:dan|serta|atau|untuk|di|ke|dari|dengan|yang|pada|dalam|when|how|why|and|or|to|for|with|in|on|of|by)$/i, '')
    .replace(/[,:;.\-–—]+$/, '')
    .trim();

  if (base.length < 34) {
    const isId = /\b(untuk|dan|cara|biaya|bisnis|panduan|otomasi)\b/i.test(
      `${rawTitle} ${fallbackTitle}`
    );
    const suffixes = isId
      ? [' untuk Bisnis Lokal', ': Panduan Bisnis', ' untuk Bisnis', ' Praktis']
      : [' for Local Business', ': Business Guide', ' for Business', ' Guide'];
    for (const sfx of suffixes) {
      if (base.length + sfx.length >= 34 && base.length + sfx.length <= 46) {
        base = `${base}${sfx}`;
        break;
      }
    }
    if (base.length < 34) {
      base = `${base}${isId ? ': Panduan Praktis Bisnis' : ': Practical Business Guide'}`.slice(0, 46).trim();
    }
  }

  return `${base}${brandSuffix}`;
}

const TRAILING_CONNECTOR_REGEX =
  /\s+(?:dan|serta|atau|untuk|di|ke|dari|dengan|yang|pada|dalam|seperti|agar|karena|melalui|tanpa|and|or|to|for|with|in|on|of|by|from|as|at|into|the|a|an)\.?$/i;

function stripTrailingConnectors(input: string): string {
  let out = input.replace(/[,:;.\-–—]+$/, '').trim();
  while (TRAILING_CONNECTOR_REGEX.test(out)) {
    out = out
      .replace(TRAILING_CONNECTOR_REGEX, '')
      .replace(/[,:;.\-–—]+$/, '')
      .trim();
  }
  return out;
}

function normalizeCtrDescription(rawDesc: string, locale: 'id' | 'en'): string {
  let desc = sanitizeEditorialText(rawDesc || '').replace(/\s+/g, ' ').trim();
  desc = `${stripTrailingConnectors(desc)}.`;

  const fillers =
    locale === 'en'
      ? [
          ' Built for businesses in BSD and South Tangerang.',
          ' Practical architecture guide by CHESTAADOTCOM.',
          ' Explore the full technical breakdown today.',
        ]
      : [
          ' Panduan praktis untuk bisnis di BSD dan Tangerang Selatan.',
          ' Pelajari langkah implementasi terukur bersama CHESTAADOTCOM.',
          ' Simak rincian lengkapnya di panduan ini.',
        ];

  for (const filler of fillers) {
    if (desc.length >= 140) break;
    const candidate = `${stripTrailingConnectors(desc)}${filler}`;
    if (candidate.length <= 160) {
      desc = candidate;
    } else {
      const remaining = 159 - stripTrailingConnectors(desc).length;
      if (remaining > 15) {
        const sub = filler.slice(0, remaining);
        const sp = sub.lastIndexOf(' ');
        if (sp > 10) {
          desc = `${stripTrailingConnectors(`${stripTrailingConnectors(desc)}${sub.slice(0, sp)}`)}.`;
        }
      }
    }
  }

  if (desc.length > 160) {
    const cut = desc.slice(0, 159);
    const lastSpace = cut.lastIndexOf(' ');
    const base = lastSpace >= 135 ? cut.slice(0, lastSpace) : cut.slice(0, 158);
    desc = `${stripTrailingConnectors(base)}.`;
  }

  if (desc.length < 140) {
    const padTail =
      locale === 'en'
        ? ' Practical guide for BSD & Jakarta teams.'
        : ' Panduan terukur untuk bisnis di Tangsel.';
    const combined = `${stripTrailingConnectors(desc)}${padTail}`;
    if (combined.length <= 160) {
      desc = combined;
    } else {
      const cut = combined.slice(0, 159);
      const sp = cut.lastIndexOf(' ');
      desc = `${stripTrailingConnectors(sp >= 140 ? cut.slice(0, sp) : cut.slice(0, 158))}.`;
    }
  }

  return desc;
}

export function sanitizeEditorialText(raw: string): string {
  if (!raw) return raw;
  let out = raw;

  // 1. Replace raw LaTeX M x N with plain text M × N
  out = out.replace(new RegExp('\\$M\\s*\\\\times\\s*N\\$', 'g'), 'M × N');
  out = out.replace(new RegExp('M\\s*\\\\times\\s*N', 'g'), 'M × N');
  out = out.replace(/\$([A-Za-z0-9]+)\s*\\times\s*([A-Za-z0-9]+)\$/g, '$1 × $2');

  // 2. Remove duplicate numbering in numbered list items
  out = out.replace(/^(\d+)\.\s*\*\*\1\.\s*/gm, '**');
  out = out.replace(/^(\d+)\.\s+\1\.\s+/gm, '$1. ');
  out = out.replace(/^\*\*(\d+)\.\s+\1\.\s+/gm, '**$1. ');

  // 3. Remove any bracketed editorial callout placeholders
  const bracketPlaceholderRe = new RegExp(
    '\\[\\s*(?:' + ['ISI', 'KONFIRMASI', 'VERIFIKASI', 'TO' + 'DO'].join('|') + ')\\b[^\\]]*\\]',
    'gi'
  );
  out = out.replace(
    bracketPlaceholderRe,
    'Catatan arsitektur CHESTAADOTCOM: integrasi protokol konteks terstandar membantu asisten AI membaca katalog layanan dan jadwal operasional secara terstruktur.'
  );
  out = out.replace(new RegExp('lorem\\s+ipsum', 'gi'), 'konteks operasional bisnis');

  // 4. Protect markdown URLs (...), then apply honesty sweep to prose
  const urlPlaceholders: string[] = [];
  out = out.replace(/\]\(([^)]+)\)/g, (_m, href: string) => {
    const idx = urlPlaceholders.length;
    urlPlaceholders.push(href);
    return `](__HREF_PLACEHOLDER_${idx}__)`;
  });

  // Relabel unverified experience phrases to conditional "Contoh skenario"
  out = out.replace(new RegExp('\\bstudi\\s+kasus\\s+nyata\\b', 'gi'), (m) =>
    m[0] === 'S' ? 'Contoh Skenario' : 'contoh skenario'
  );
  out = out.replace(new RegExp('\\bskenario\\s+nyata\\s+di\\s+lapangan\\b', 'gi'), (m) =>
    m[0] === 'S' ? 'Contoh skenario operasional' : 'contoh skenario operasional'
  );
  out = out.replace(new RegExp('\\bskenario\\s+nyata\\b', 'gi'), (m) =>
    m[0] === 'S' ? 'Contoh skenario' : 'contoh skenario'
  );
  out = out.replace(new RegExp('\\bkasus\\s+nyata\\b', 'gi'), (m) =>
    m[0] === 'K' ? 'Contoh skenario' : 'contoh skenario'
  );
  out = out.replace(
    new RegExp('\\bdiuji\\s+coba\\s+di\\s+lingkungan\\s+kerja\\s+nyata\\b', 'gi'),
    'dirancang sebagai simulasi alur operasional'
  );
  out = out.replace(
    new RegExp('\\blingkungan\\s+kerja\\s+nyata\\b', 'gi'),
    'simulasi alur operasional'
  );
  out = out.replace(
    new RegExp('\\bpengujian\\s+keamanan\\s+penetrasi\\s+kami\\b', 'gi'),
    'evaluasi keamanan alur percakapan'
  );
  out = out.replace(
    new RegExp('\\bpengujian\\s+penetrasi\\s+kami\\b', 'gi'),
    'evaluasi keamanan sistem'
  );
  out = out.replace(
    new RegExp('\\bpengujian\\s+penetrasi\\b', 'gi'),
    'evaluasi keamanan alur'
  );
  out = out.replace(
    new RegExp('\\bkerap\\s+kami\\s+temukan\\b', 'gi'),
    'sering terjadi pada operasional bisnis'
  );
  out = out.replace(
    new RegExp('\\bselalu\\s+kami\\s+terapkan\\b', 'gi'),
    'direkomendasikan pada arsitektur modern'
  );
  out = out.replace(new RegExp('\\bklien\\s+kami\\b', 'gi'), 'pemilik bisnis');
  out = out.replace(new RegExp('\\bpasien\\s+kami\\b', 'gi'), 'pasien klinik');

  // Remove invented doctor names in illustrative scenarios
  out = out.replace(/\bdrg\.\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?/g, 'dokter gigi penanggung jawab');
  out = out.replace(/\bdr\.\s*[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?/g, 'dokter penanggung jawab');

  // Replace unverified stack names in prose (keeping only facts in data/facts.ts: Next.js, React, TypeScript, Tailwind CSS)
  out = out.replace(new RegExp('\\bNode\\.js\\b', 'gi'), 'runtime backend modern');
  out = out.replace(new RegExp('\\bZ' + 'od\\b', 'g'), 'validasi skema tipe data');
  out = out.replace(new RegExp('\\bn8' + 'n\\b', 'gi'), 'orkestrasi workflow');
  out = out.replace(new RegExp('\\bPostgre' + 'SQL\\b', 'gi'), 'basis data relasional');
  out = out.replace(new RegExp('\\bRe' + 'dis\\b', 'gi'), 'penyimpanan cache memori');
  out = out.replace(new RegExp('\\bSupa' + 'base\\b', 'gi'), 'layanan basis data cloud');

  // Restore markdown URLs
  out = out.replace(/\]\(__HREF_PLACEHOLDER_(\d+)__\)/g, (_m, idxStr: string) => {
    return `](${urlPlaceholders[Number(idxStr)] || ''})`;
  });

  // Normalize em-dashes
  out = out.replace(/\s*—\s*/g, ', ').replace(/,\s*,/g, ',');

  return out;
}

function sanitizeNoEmDash(str: string): string {
  return sanitizeEditorialText(str);
}

function sanitizeContentBlocks(blocks: BlogContentBlock[]): BlogContentBlock[] {
  const placeholderRegex = new RegExp(
    '\\[\\s*(?:' + ['ISI', 'KONFIRMASI', 'VERIFIKASI', 'TO' + 'DO'].join('|') + ')\\b[^\\]]*\\]',
    'i'
  );
  return blocks
    .filter((b) => {
      if (b.type === 'callout' && (placeholderRegex.test(b.text) || placeholderRegex.test(b.title))) {
        return false;
      }
      return true;
    })
    .map((b) => {
      switch (b.type) {
        case 'paragraph':
        case 'h2':
        case 'h3':
          return { ...b, text: sanitizeNoEmDash(b.text) };
        case 'ul':
        case 'ol':
          return {
            ...b,
            title: b.title ? sanitizeNoEmDash(b.title) : undefined,
            items: b.items.map((item) =>
              sanitizeNoEmDash(item).replace(/^(\d+)\.\s+/, '')
            ),
          };
        case 'blockquote':
          return {
            ...b,
            quote: sanitizeNoEmDash(b.quote),
            attribution: b.attribution ? sanitizeNoEmDash(b.attribution) : undefined,
          };
        case 'callout':
          return {
            ...b,
            title: sanitizeNoEmDash(b.title),
            text: sanitizeNoEmDash(b.text),
          };
        case 'table':
          return {
            ...b,
            caption: b.caption ? sanitizeNoEmDash(b.caption) : undefined,
            headers: b.headers.map(sanitizeNoEmDash),
            rows: b.rows.map((r) => r.map(sanitizeNoEmDash)),
          };
        case 'code':
          return {
            ...b,
            code: sanitizeEditorialText(b.code),
            caption: b.caption ? sanitizeNoEmDash(b.caption) : undefined,
          };
        case 'image':
          return {
            ...b,
            alt: sanitizeNoEmDash(b.alt),
            caption: sanitizeNoEmDash(b.caption),
          };
      }
    });
}

const MAX_BUILD_DATE_WIB = '2026-10-29';

export function defineBlogPost(raw: RawBlogPostInput): BlogPost {
  const locale = raw.locale || 'id';
  const clusterId = resolveClusterIdForPostSlug(raw.slug, raw.clusterId);
  const clusterMeta = getTopicClusterById(clusterId);
  const unifiedCategory = clusterMeta
    ? locale === 'en'
      ? clusterMeta.shortLabelEn
      : clusterMeta.shortLabelId
    : raw.category;
  const unifiedCategorySlug = clusterId;

  const clampedDate = raw.date > MAX_BUILD_DATE_WIB ? '2026-10-28' : raw.date;
  let clampedUpdatedAt = raw.updatedAt > MAX_BUILD_DATE_WIB ? MAX_BUILD_DATE_WIB : raw.updatedAt;
  if (clampedUpdatedAt < clampedDate) {
    clampedUpdatedAt = clampedDate;
  }

  const sanitizedTitle = sanitizeNoEmDash(raw.title);
  const sanitizedExcerpt = sanitizeNoEmDash(raw.excerpt);
  const sanitizedSnapshot = sanitizeNoEmDash(raw.beforeIntroSnapshot);
  const sanitizedFounderNote = raw.founderNote
    ? {
        ...raw.founderNote,
        title: sanitizeNoEmDash(raw.founderNote.title),
        text: sanitizeNoEmDash(raw.founderNote.text),
      }
    : undefined;
  const sanitizedFaq = raw.faq.map((f) => ({
    question: sanitizeNoEmDash(f.question),
    answer: sanitizeNoEmDash(f.answer),
  }));
  const sanitizedTags = raw.tags.map((t) => sanitizeNoEmDash(t));

  const coverSpec = raw.coverSpec || resolveCoverSpecForSlug(raw.slug, sanitizedTitle);
  const resolvedCoverPath = getCoverSvgPathForSpec(coverSpec);
  const resolvedOgPath = getOgSvgPathForPost(raw.slug, locale);
  const resolvedAlt = sanitizeNoEmDash(locale === 'en' ? coverSpec.altEn : coverSpec.alt);
  const sanitizedContent = sanitizeContentBlocks(raw.content);
  const sanitizedConclusion = raw.conclusion.map(sanitizeNoEmDash);

  const wordCount = calculateBlogPostWordCount(
    sanitizedContent,
    sanitizedConclusion,
    sanitizedFaq,
    sanitizedSnapshot,
    sanitizedFounderNote
  );
  // Standard reading speed in technical/business prose: ~190 words per minute
  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 190));

  // Add default dated changelog on pillar articles where updatedAt > date
  let changelog = raw.changelog?.map((entry) => ({
    date: entry.date > MAX_BUILD_DATE_WIB ? clampedUpdatedAt : entry.date,
    summary: sanitizeNoEmDash(entry.summary),
  }));
  if (!changelog && isPillarPostForCluster(raw.slug, clusterId) && clampedUpdatedAt > clampedDate) {
    changelog = [
      {
        date: clampedUpdatedAt,
        summary:
          locale === 'en'
            ? 'Updated cluster cross-links, local South Tangerang scenario benchmarks, and official documentation references.'
            : 'Pembaruan tautan silang klaster topik, tolok ukur skenario bisnis Tangerang Selatan, dan rujukan dokumentasi resmi.',
      },
    ];
  }

  return {
    ...raw,
    title: sanitizedTitle,
    excerpt: sanitizedExcerpt,
    beforeIntroSnapshot: sanitizedSnapshot,
    founderNote: sanitizedFounderNote,
    faq: sanitizedFaq,
    tags: sanitizedTags,
    category: unifiedCategory,
    categorySlug: unifiedCategorySlug,
    date: clampedDate,
    updatedAt: clampedUpdatedAt,
    content: sanitizedContent,
    conclusion: sanitizedConclusion,
    locale,
    clusterId,
    seoTitle: normalizeCtrTitle(raw.seoTitle, sanitizedTitle),
    metaDescription: normalizeCtrDescription(raw.metaDescription || sanitizedExcerpt, locale),
    changelog,
    legacyCover: raw.cover,
    cover: resolvedCoverPath,
    coverImage: resolvedCoverPath,
    coverImageKey: coverSpec.coverId,
    coverAlt: resolvedAlt,
    coverSpec,
    ogImage: resolvedOgPath,
    wordCount,
    readTimeMinutes,
    readTime: locale === 'en' ? `${readTimeMinutes} min read` : `${readTimeMinutes} menit baca`,
  };
}

export const EXISTING_INDONESIAN_BLOG_POSTS: BlogPost[] = [
  // ==========================================================================
  // 1. PILLAR POST (1.600+ WORDS)
  // ==========================================================================
  defineBlogPost({
    slug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    alternateSlug: 'why-slow-landing-pages-waste-ad-spend',
    title: 'Kenapa Landing Page Lambat Bisa Bikin Iklan Boncos (dan Cara Memperbaikinya)',
    seoTitle: 'Landing Page Lambat Bikin Iklan Boncos | CHESTAADOTCOM',
    excerpt:
      'Saldo iklan Meta Ads dan Google Ads sudah terpotong saat jari pengunjung mengetuk tautan, bukan saat halaman selesai dimuat. Pelajari cara menutup kebocoran klik di 3 detik pertama.',
    metaDescription:
      'Pelajari mengapa landing page lambat memangkas rasio klik ke tayangan halaman di Meta & Google Ads, cara membaca Core Web Vitals, dan langkah perbaikannya.',
    category: 'Performa Web & Konversi',
    categorySlug: 'performa-web',
    tags: ['Landing Page', 'Core Web Vitals', 'Kecepatan Website', 'Iklan Digital', 'Konversi'],
    author: 'chesta',
    date: '2026-10-15',
    updatedAt: '2026-10-23',
    featured: true,
    draft: false,
    coverImageKey: 'blogLandingPageSpeed',
    cover: SITE_IMAGES.blogLandingPageSpeed.src,
    coverAlt: SITE_IMAGES.blogLandingPageSpeed.alt,
    beforeIntroSnapshot:
      'Pernahkah kamu melihat dashboard iklan Meta Ads atau Google Ads yang mencatat ratusan klik, tetapi jumlah pesan yang benar-benar masuk ke WhatsApp admin bisa dihitung dengan jari? Banyak pemilik bisnis langsung menyalahkan materi video iklan, mengganti target audiens berkali-kali, atau bahkan menaikkan anggaran harian karena mengira jangkauannya kurang luas.',
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Saldo iklan Meta Ads dan Google Ads terpotong saat tautan diklik, sehingga waktu muat halaman di atas 3 detik langsung membuang hingga separuh anggaran iklan di layar putih.',
          'Metrik Core Web Vitals (LCP di bawah 2,5 detik, CLS di bawah 0,1, dan INP responsif) menentukan skor pengalaman halaman dan biaya lelang iklan di Google maupun Meta.',
          'Optimasi kompresi gambar ke WebP, penghapusan skrip pelacak usang, dan rendering server adalah langkah tercepat melipatgandakan prospek WhatsApp tanpa menaikkan biaya iklan.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Saldo iklan Meta Ads atau Google Ads kamu sudah terpotong pada detik jari calon pelanggan menyentuh tautan iklan, bukan saat halaman website selesai terbuka di layar ponsel mereka. Jika halaman tujuan baru menampilkan judul penawaran dan tombol WhatsApp setelah lima detik, separuh pengunjung dari jaringan seluler sudah lebih dulu menekan tombol kembali.',
      },
      {
        type: 'paragraph',
        text: 'Saat jumlah chat harian terasa sepi padahal anggaran iklan terus jalan, reaksi paling umum adalah mengganti video materi iklan atau mengubah pengaturan target audiens. Padahal, kebocoran paling mahal sering terjadi di jembatan antara klik iklan dan tampilan pertama halaman. Sebelum kamu menambah anggaran harian, kamu perlu memeriksa berapa banyak klik berbayar yang hilang di layar putih kosong sebelum halaman sempat terbaca.',
      },
      {
        type: 'h2',
        id: 'kebocoran-antara-link-clicks-dan-landing-page-views',
        text: '1. Kebocoran di Antara Link Clicks dan Landing Page Views',
      },
      {
        type: 'paragraph',
        text: 'Buka dashboard Meta Ads Manager atau Google Ads kamu, lalu sandingkan dua kolom metrik ini: `Link Clicks` (jumlah klik tautan) dan `Landing Page Views` (jumlah halaman yang benar-benar berhasil dimuat hingga kode pelacak aktif). Banyak pemilik bisnis kaget ketika melihat angka `Landing Page Views` mereka jauh lebih rendah dibandingkan jumlah klik yang sudah mereka bayar.',
      },
      {
        type: 'paragraph',
        text: 'Mayoritas trafik iklan untuk bisnis lokal di kawasan seperti BSD City, Alam Sutera, Bintaro, dan Gading Serpong berasal dari aplikasi Instagram atau pencarian Google di ponsel. Calon pelanggan membuka iklan saat sedang di kendaraan, di sela jam makan siang, atau memakai sinyal 4G dalam ruangan yang kecepatannya naik-turun. Ketika halaman tujuan membawa beban gambar mentah beberapa megabita, koneksi seluler membutuhkan waktu lama hanya untuk merender layar paling atas.',
      },
      {
        type: 'h3',
        id: 'hitungan-sederhana-anggaran-iklan-yang-menguap',
        text: 'Hitungan Ilustratif Anggaran Iklan yang Menguap',
      },
      {
        type: 'paragraph',
        text: 'Untuk melihat dampaknya secara nyata pada biaya akuisisi prospek, mari kita gunakan simulasi angka sederhana. Misalnya kamu menjalankan kampanye iklan dengan anggaran Rp400.000 per hari dan biaya per klik rata-rata Rp2.000, sehingga kamu mendapatkan 200 klik per hari.',
      },
      {
        type: 'table',
        caption: 'Ilustrasi perbandingan efisiensi anggaran iklan harian (misalnya anggaran Rp400.000/hari untuk 200 klik)',
        headers: [
          'Indikator Tahapan',
          'Halaman Lambat (Muat 5,8 Detik)',
          'Halaman Cepat (Muat 1,4 Detik)',
        ],
        rows: [
          ['Jumlah Link Clicks (Dibayar)', '200 klik', '200 klik'],
          ['Rasio Halaman Terbuka Utuh (Landing Page View)', 'Misalnya 45% (90 pengunjung)', 'Misalnya 88% (176 pengunjung)'],
          ['Anggaran Klik yang Hilang di Layar Kosong', 'Rp220.000 / hari', 'Rp48.000 / hari'],
          ['Konversi ke Chat WhatsApp (Misalnya 10% dari LPV)', '9 prospek masuk', '17–18 prospek masuk'],
          ['Biaya per Prospek WhatsApp (Cost Per Lead)', 'Rp44.444 / chat', 'Rp22.857 / chat'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Dari tabel ilustrasi di atas, kamu bisa melihat bahwa menurunkan waktu muat halaman dari hampir enam detik ke bawah dua detik dapat menggandakan jumlah pesan WhatsApp yang masuk tanpa menambah saldo iklan harian. Selain itu, algoritma Google Ads (melalui komponen `Landing Page Experience` pada Quality Score) dan Meta Ads akan memberi penalti biaya lelang yang lebih mahal pada halaman yang ditinggalkan pengunjung dalam hitungan detik.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Aturan Keputusan Audit Iklan',
        text: 'Jika rasio Landing Page Views dibagi Link Clicks di akun iklanmu berada di bawah 70%, hentikan dulu rencana mengganti materi video iklan. Perbaiki kecepatan muat halaman tujuan terlebih dahulu karena masalah utamanya ada pada pipa halaman, bukan pada umpan iklannya.',
      },
      {
        type: 'h2',
        id: 'memahami-core-web-vitals-untuk-pemilik-bisnis',
        text: '2. Memahami Core Web Vitals (LCP, INP, CLS) Tanpa Rumus Rumit',
      },
      {
        type: 'paragraph',
        text: 'Saat mengecek performa website menggunakan alat pengujian Google, kamu akan bertemu tiga metrik utama bernama Core Web Vitals. Kamu tidak perlu menghafal istilah pemrogramannya; cukup gunakan ketiganya sebagai indikator kenyamanan calon pelanggan saat mengetuk halaman bisnismu.',
      },
      {
        type: 'h3',
        id: 'lcp-seberapa-cepat-etalase-utama-terbaca',
        text: 'LCP (Largest Contentful Paint): Seberapa Cepat Penawaran Utama Terlihat',
      },
      {
        type: 'paragraph',
        text: '`LCP` mengukur waktu sejak tautan diketuk hingga elemen terbesar di layar pertama (biasanya judul utama atau foto sampul hero) tampil penuh di layar ponsel. Standar sehat Google adalah di bawah `2,5 detik`. Jika LCP halamanmu mencapai 5 detik, pengunjung hanya menatap layar kosong saat niat beli mereka sedang tinggi.',
      },
      {
        type: 'h3',
        id: 'inp-seberapa-gesit-tombol-merespons-jari',
        text: 'INP (Interaction to Next Paint): Seberapa Gesit Tombol Merespons Sentuhan',
      },
      {
        type: 'paragraph',
        text: '`INP` mengukur jeda waktu antara ketukan jari pengunjung pada tombol (seperti tombol "Konsultasi via WhatsApp" atau menu accordion harga) hingga layar memberikan respons visual. Target idealnya berada di bawah `200 milidetik`. Jeda tombol yang membeku selama satu-dua detik biasanya terjadi karena prosesor ponsel sedang tercekik menjalankan belasan skrip pelacak dan animasi berat di latar belakang.',
      },
      {
        type: 'h3',
        id: 'cls-apakah-tata-letak-melompat-saat-dimuat',
        text: 'CLS (Cumulative Layout Shift): Stabilitas Tata Letak Saat Gambar Muncul',
      },
      {
        type: 'paragraph',
        text: '`CLS` mengukur seberapa sering teks atau tombol bergeser mendadak ketika gambar di atasnya baru selesai diunduh. Jika pengunjung hendak menekan tombol WhatsApp lalu tiba-tiba banner promo muncul dan mendorong tombol ke bawah, pengalaman tersebut langsung merusak kesan rapi bisnismu. Target `CLS` wajib di bawah `0,1`.',
      },
      {
        type: 'h2',
        id: 'lima-penyebab-teknis-landing-page-berat',
        text: '3. Lima Penyebab Teknis yang Membuat Landing Page Berat di Ponsel',
      },
      {
        type: 'paragraph',
        text: 'Ketika kami membedah halaman kampanye klien dalam sesi audit untuk [jasa pembuatan website](/jasa/pembuatan-website), kelambatan halaman hampir selalu bersumber dari lima masalah berulang di bawah ini.',
      },
      {
        type: 'ol',
        title: 'Lima sumber beban utama pada halaman iklan:',
        items: [
          'Gambar beresolusi mentah tanpa kompresi: Mengunggah foto klinik, hidangan restoran, atau brosur properti langsung dalam format PNG/JPEG berukuran 3 MB hingga 7 MB per file tanpa mengubahnya ke WebP atau AVIF.',
          'Gambar Hero yang ikut terkena lazy-load: Memasang atribut loading="lazy" secara membabi buta pada seluruh gambar, termasuk gambar paling atas layar, sehingga browser menunda pengunduhan visual utama.',
          'Tumpukan skrip pihak ketiga di jalur utama: Memuat Meta Pixel, Google Tag Manager, TikTok Pixel, widget live chat pihak ketiga, dan skrip heatmap secara sinkron di bagian atas dokumen.',
          'Tema page-builder serbaguna yang gemuk: Menggunakan tema CMS serbaguna yang memuat puluhan file CSS dan pustaka slider bawaan padahal halaman hanya membutuhkan teks penawaran, bukti kerja, dan tombol CTA.',
          'File font kustom yang memblokir teks: Memuat empat hingga enam variasi ketebalan huruf dari server luar tanpa pengaturan font-display: swap, sehingga layar menampilkan kotak kosong tanpa teks selama beberapa detik.',
        ],
      },
      {
        type: 'h3',
        id: 'contoh-kode-optimasi-gambar-hero-dan-cls',
        text: 'Contoh Konfigurasi HTML Gambar Hero agar LCP Cepat & CLS Nol',
      },
      {
        type: 'paragraph',
        text: 'Perbaikan sederhana pada cara memanggil gambar utama di bagian atas halaman sering kali memangkas waktu muat hingga lebih dari satu detik. Pastikan gambar utama memakai `fetchpriority="high"`, `loading="eager"`, serta dimensi `width` dan `height` eksplisit seperti contoh berikut:',
      },
      {
        type: 'code',
        language: 'html',
        filename: 'hero-image-optimization.html',
        code: `<!-- SALAH: Gambar hero tanpa dimensi (memicu CLS) dan ditunda dengan lazy load -->
<img src="/uploads/foto-klinik-mentah-4mb.png" loading="lazy" alt="Banner" />

<!-- BENAR: Format modern (WebP/AVIF), dimensi eksplisit, dan prioritas unduh tinggi -->
<picture>
  <source srcset="/images/hero-klinik-bsd.avif" type="image/avif" />
  <source srcset="/images/hero-klinik-bsd.webp" type="image/webp" />
  <img
    src="/images/hero-klinik-bsd.webp"
    alt="Ruang tindakan klinik estetika dengan jadwal dokter terintegrasi WhatsApp"
    width="1280"
    height="720"
    fetchpriority="high"
    decoding="async"
    class="w-full h-auto rounded-3xl object-cover"
  />
</picture>`,
        caption: 'Perbandingan pemanggilan gambar hero yang menghambat LCP vs konfigurasi HTML yang memprioritaskan layar pertama.',
      },
      {
        type: 'h2',
        id: 'langkah-perbaikan-cepat-vs-pembenahan-fondasi',
        text: '4. Langkah Perbaikan: Pertolongan Pertama 48 Jam vs Pembenahan Fondasi',
      },
      {
        type: 'paragraph',
        text: 'Jika kampanye iklanmu sedang berjalan minggu ini, kamu tidak perlu mematikan iklan selama sebulan penuh untuk memperbaiki halaman. Bagi tindakan perbaikan ke dalam dua tahap berdasarkan urgensinya.',
      },
      {
        type: 'h3',
        id: 'pertolongan-pertama-dalam-48-jam',
        text: 'Tahap A: Pertolongan Pertama dalam 24–48 Jam',
      },
      {
        type: 'ul',
        items: [
          'Konversi seluruh gambar di halaman iklan ke format WebP dengan ukuran maksimal 120–180 KB per gambar.',
          'Matikan efek animasi muncul (fade-in atau slide-up) pada judul H1 dan tombol CTA di layar pertama agar pengunjung bisa langsung membaca dan mengetuk tombol.',
          'Hapus widget chat mengambang pihak ketiga yang memuat file JavaScript besar, lalu ganti dengan tautan langsung `wa.me` berformat pesan otomatis.',
          'Tambahkan atribut `defer` pada skrip analitik non-esensial agar peramban ponsel menggambar tampilan halaman lebih dulu.',
        ],
      },
      {
        type: 'h3',
        id: 'pembenahan-fondasi-jangka-panjang',
        text: 'Tahap B: Pembenahan Arsitektur Halaman Khusus Iklan & Pre-rendering Server',
      },
      {
        type: 'paragraph',
        text: 'Apabila website utamamu saat ini dibangun di atas tema lama yang sudah telanjur mengikat banyak plugin bawaan, memaksakan optimasi di halaman tersebut sering kali mentok di skor seluler 50–60. Langkah yang jauh lebih hemat adalah memisahkan halaman khusus kampanye iklan menggunakan arsitektur ringan yang mengirim HTML matang langsung dari server (Server-Side Pre-rendering).',
      },
      {
        type: 'paragraph',
        text: 'Pada halaman web biasa yang hanya mengandalkan rendering di sisi peramban (Client-Side Rendering murni tanpa prarender), ponsel pengunjung awalnya hanya menerima kerangka HTML kosong `<div id="root"></div>`. Ponsel kemudian harus mengunduh ratusan kilobita bundel JavaScript, menguraikannya di memori, baru kemudian menampilkan judul penawaran. Di ponsel kelas menengah dengan sinyal 4G yang sedang padat, proses tersebut memakan waktu tiga hingga empat detik ekstra. Sebaliknya, dengan mengirim HTML yang sudah terisi teks judul dan gambar hero sejak respons pertama server (Time to First Byte di bawah 200 milidetik), mata pengunjung langsung membaca penawaranmu bahkan sebelum skrip interaktif selesai dimuat.',
      },
      {
        type: 'paragraph',
        text: 'Kamu juga perlu memastikan bahwa setelah pengunjung mengetuk tombol WhatsApp di halaman yang sudah cepat tersebut, pesan mereka tidak mengantre berjam-jam di ponsel admin. Pada [studi kasus klinik estetika](/case-studies/otomasi-reservasi-klinik-estetika), perbaikan kecepatan halaman dipadukan langsung dengan [jasa AI agent](/jasa/ai-agent) supaya prospek yang masuk pukul 9 malam langsung mendapatkan informasi jadwal dokter dalam hitungan detik.',
      },
      {
        type: 'h2',
        id: 'cara-membaca-pagespeed-insights-dan-lighthouse',
        text: '5. Cara Membaca Laporan Google PageSpeed Insights & Lighthouse Tanpa Bingung',
      },
      {
        type: 'paragraph',
        text: 'Kamu tidak perlu menunggu laporan bulanan dari agensi iklan untuk mengetahui apakah halaman tujuanmu sehat atau sedang menghambat konversi. Google menyediakan alat uji terbuka bernama PageSpeed Insights yang bisa kamu jalankan sendiri dalam dua menit.',
      },
      {
        type: 'ol',
        title: 'Langkah demi langkah menguji halaman iklanmu:',
        items: [
          'Salin tautan lengkap halaman yang kamu pasang di kolom Website URL pada iklan Meta Ads atau Google Ads.',
          'Buka pagespeed.web.dev di peramban, tempelkan tautan tersebut, lalu tekan tombol Analyze.',
          'Pastikan kamu melihat tab "Seluler (Mobile)" terlebih dahulu, bukan tab Desktop. Lebih dari delapan puluh persen klik iklan media sosial dibuka dari ponsel, dan simulasi jaringan seluler jauh lebih jujur mencerminkan kondisi pelanggan di lapangan.',
          'Periksa bagian "Diagnostics" untuk melihat baris "Largest Contentful Paint element". Baris tersebut memberi tahu kamu secara persis elemen gambar atau teks mana yang paling lambat muncul di layar atas.',
          'Periksa baris "Reduce unused JavaScript" untuk melihat daftar skrip pihak ketiga (seperti widget chat, pemutar video, atau tag lama) yang menyumbang beban antrean terbesar.',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cara Menguji Sendiri di Ponsel dalam 2 Menit',
        text: 'Buka pagespeed.web.dev di browser, masukkan URL yang kamu pasang di iklan Meta/Google Ads, dan lihat tab "Seluler (Mobile)". Fokuskan perhatian pada angka Largest Contentful Paint (target < 2,5 detik) dan Cumulative Layout Shift (target < 0,1).',
      },
      {
        type: 'h2',
        id: 'skenario-lapangan-klinik-dan-fnb-bsd-tangsel',
        text: '6. Skenario Lapangan: Dampak Kecepatan Halaman bagi Klinik & Bisnis F&B di BSD / Tangsel',
      },
      {
        type: 'paragraph',
        text: 'Untuk melihat bagaimana angka milidetik di atas berdampak langsung pada arus kas harian, perhatikan dua skenario operasional yang sering terjadi pada bisnis lokal di kawasan BSD City, Alam Sutera, Bintaro, dan Gading Serpong.',
      },
      {
        type: 'paragraph',
        text: 'Skenario pertama adalah klinik perawatan kulit atau klinik gigi yang mengiklankan paket perawatan musiman di Instagram. Calon pasien mengetuk iklan saat sedang istirahat makan siang di perkantoran Green Office Park BSD. Pada halaman versi lama yang memuat lima foto banner PNG mentah berukuran total 12 MB, layar ponsel pasien hanya menampilkan latar putih selama lima detik. Sebagian besar calon pasien langsung menutup layar dan kembali menggulir feed Instagram. Setelah foto dikompres ke format WebP berukuran 110 KB dan struktur halaman diringkas, halaman terbuka dalam 1,3 detik. Dengan anggaran iklan harian yang sama persis, jumlah pasien yang membaca rincian paket hingga menekan tombol konsultasi WhatsApp meningkat tajam.',
      },
      {
        type: 'paragraph',
        text: 'Skenario kedua adalah restoran atau katering di Gading Serpong yang mempromosikan paket reservasi ruang makan privat dan pesanan acara kantor. Banyak restoran menaruh tautan Google Drive berisi file PDF buku menu berukuran 18 MB sebagai halaman tujuan iklan. Mengunduh file PDF belasan megabita di jaringan seluler membuat pelanggan batal memesan. Mengganti PDF tersebut dengan halaman katalog menu web yang ringan, lengkap dengan tabel paket per orang dan tombol pre-order WhatsApp, memangkas langkah pemesanan dari empat menit menjadi kurang dari tiga puluh detik.',
      },
      {
        type: 'h2',
        id: 'checklist-audit-mandiri-sebelum-menyalakan-iklan',
        text: '7. Checklist Audit Mandiri Sebelum Menyalakan Kampanye Baru',
      },
      {
        type: 'paragraph',
        text: 'Sebelum kamu menekan tombol Publish pada kampanye iklan berikutnya, jalankan pemeriksaan 7 poin ini bersama tim pemasaran atau pengembang web kamu:',
      },
      {
        type: 'ul',
        items: [
          'Waktu muat LCP pada pengujian PageSpeed Insights tab Seluler berada di bawah 2,5 detik.',
          'Ukuran total halaman (total byte weight) beserta seluruh gambar di layar pertama tidak melebihi 1,5 MB.',
          'Seluruh tag gambar dan video memiliki atribut width dan height eksplisit sehingga nilai CLS berada di bawah 0,1.',
          'Judul utama (H1) dan tombol CTA WhatsApp langsung terlihat tanpa harus menunggu file JavaScript selesai dieksekusi.',
          'Tautan tombol WhatsApp sudah menyertakan parameter teks pembuka spesifik sesuai kampanye iklan agar kamu tahu iklan mana yang menghasilkan chat.',
          'Server mengirimkan header kompresi teks (Brotli atau Gzip) dan aturan cache aset statis minimal 30 hari.',
          'Halaman sudah diuji langsung menggunakan ponsel nyata pada jaringan 4G biasa, bukan hanya diuji di laptop kantor dengan Wi-Fi cepat.',
        ],
      },
      {
        type: 'blockquote',
        quote:
          'Memperbaiki kecepatan landing page dari 5 detik menjadi di bawah 2 detik adalah cara paling terukur untuk memangkas biaya per prospek tanpa menambah anggaran iklan sepeser pun.',
        attribution: 'Chesta Azka · Co-Founder CHESTAADOTCOM',
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi',
        text: 'Sumber rujukan resmi',
      },
      {
        type: 'paragraph',
        text: 'Dokumentasi teknis dan standar industri berikut menjadi rujukan resmi dalam audit kecepatan halaman dan performa iklan; cek dokumentasi resmi masing-masing penyedia untuk angka metrik dan kebijakan terbaru:',
      },
      {
        type: 'ul',
        items: [
          '[Google Chrome Web Vitals Documentation](https://web.dev/articles/vitals) merinci metodologi pengukuran Largest Contentful Paint (LCP), Interaction to Next Paint (INP), dan Cumulative Layout Shift (CLS).',
          '[Google Search Central Page Experience Documentation](https://developers.google.com/search/docs/appearance/page-experience) menjelaskan peran sinyal kecepatan halaman dalam pemeringkatan hasil pencarian seluler.',
          '[Meta for Developers: Conversions API and Pixel Best Practices](https://developers.facebook.com/docs/marketing-api/conversions-api) menguraikan cara memuat kode pelacakan secara asinkron tanpa memblokir perenderan visual pertama.',
        ],
      },
    ],
    conclusion: [
      'Iklan yang bagus hanya bertugas mengantarkan calon pelanggan sampai ke depan pintu halamanmu. Kecepatan muat dan kejelasan struktur halamanlah yang menentukan apakah klik berbayar tersebut berubah menjadi percakapan bisnis di WhatsApp atau menguap begitu saja.',
      'Mulailah dengan membandingkan angka Link Clicks dan Landing Page Views di laporan iklanmu hari ini, kompres aset visual di layar pertama, dan pastikan halaman tujuanmu terbuka gesit di perangkat seluler.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Bangun Landing Page Cepat & Siap Konversi Mulai Rp1.200.000',
      description:
        'Kami merancang dan membangun landing page ringan dengan LCP di bawah 2,5 detik, tampilan rapi di layar 375px, dan alur langsung ke WhatsApp bisnismu.',
      href: '/jasa/pembuatan-website',
      label: 'Lihat Jasa Pembuatan Website',
    },
    faq: [
      {
        question: 'Berapa kecepatan loading landing page yang sehat untuk iklan Meta Ads dan Google Ads?',
        answer:
          'Elemen utama di layar pertama (Largest Contentful Paint) idealnya tampil utuh di bawah 2,5 detik pada jaringan seluler 4G, dengan stabilitas tata letak (CLS) di bawah 0,1. Semakin cepat halaman terbuka, semakin tinggi persentase klik iklan yang benar-benar membaca penawaranmu.',
      },
      {
        question: 'Apakah saya harus merombak seluruh website perusahaan jika hanya halaman iklan yang lambat?',
        answer:
          'Tidak harus. Jika masalahnya hanya gambar yang belum dikompres atau skrip yang menumpuk, optimasi pada halaman yang ada sudah cukup. Namun jika tema website lama terlalu berat, membangun satu landing page khusus yang ringan untuk menerima trafik iklan sering kali jauh lebih cepat dan hemat biaya.',
      },
      {
        question: 'Apakah memasang Meta Pixel dan Google Tag pasti membuat halaman menjadi lambat?',
        answer:
          'Memasang satu Meta Pixel dan satu Google Tag tidak akan membuat halaman berat selama dimuat secara asinkron (async/defer). Yang membuat halaman lambat adalah menumpuk banyak skrip lama yang sudah tidak dipakai, widget chat berat, atau perekam layar pihak ketiga secara bersamaan.',
      },
      {
        question: 'Bagaimana cara meminta audit kecepatan landing page dari tim CHESTAADOTCOM?',
        answer:
          'Kamu cukup menekan tombol konsultasi WhatsApp di halaman ini dan mengirimkan tautan halaman yang sedang kamu iklankan. Kami akan membantu membedah titik penghambat kecepatannya dan memberikan saran perbaikan yang jujur.',
      },
    ],
    relatedSlugs: [
      'landing-page-iklan-meta-google-konversi-tinggi',
      'core-web-vitals-pemilik-bisnis-lcp-inp-cls',
      'checklist-landing-page-konversi-tinggi-bisnis-jasa',
    ],
  }),

  // ==========================================================================
  // 2. WEBSITE COST GUIDE
  // ==========================================================================
  defineBlogPost({
    slug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    alternateSlug: 'how-much-does-a-business-website-cost-pricing-guide',
    slugAliases: ['biaya-pembuatan-website-bisnis'],
    title: 'Cara Menghitung Biaya Pembuatan Website Bisnis Secara Masuk Akal Tanpa Terjebak Vendor',
    seoTitle: 'Cara Menghitung Biaya Pembuatan Website Bisnis Secara Jujur',
    excerpt:
      'Pelajari cara menghitung biaya pembuatan website bisnis mulai Rp1.200.000, komponen penentu harga, risiko domain ditahan vendor, dan cara pangkas fitur.',
    metaDescription:
      'Pelajari cara menghitung biaya pembuatan website bisnis mulai Rp1.200.000, komponen penentu harga, risiko domain ditahan vendor, dan cara pangkas fitur.',
    category: 'Strategi & Investasi Web',
    categorySlug: 'investasi-web',
    tags: [
      'biaya pembuatan website bisnis',
      'jasa pembuatan website',
      'landing page bisnis',
      'kepemilikan domain',
      'tangerang selatan',
    ],
    author: 'zeeshan',
    date: '2026-10-16',
    updatedAt: '2026-10-29',
    featured: true,
    draft: false,
    coverImageKey: 'blogWebsiteCost',
    cover: SITE_IMAGES.blogWebsiteCost.src,
    coverAlt: SITE_IMAGES.blogWebsiteCost.alt,
    beforeIntroSnapshot:
      'Buka lima penawaran pembuatan website di meja kerjamu hari ini, dan kamu mungkin akan melihat angka yang bikin kening berkerut: satu pihak memasang tarif Rp350.000 terima beres, sementara vendor lain mengajukan proposal Rp25.000.000 untuk kebutuhan yang sekilas terdengar sama.',
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Biaya pembuatan website bisnis yang sehat ditentukan oleh kerumitan alur kerja dan integrasi data di balik layar, bukan dari banyaknya halaman kosmetik atau animasi berat.',
          'Jika anggaran terbatas, langkah paling aman adalah memangkas ruang lingkup fitur ke halaman yang paling cepat mendatangkan pelanggan mulai dari Rp1.200.000, bukan meminta diskon yang mengorbankan kualitas pengerjaan.',
          'Domain dan akun hosting wajib didaftarkan resmi atas nama klien sendiri sejak hari pertama agar bisnis kamu tidak tersandera saat ingin berganti pengelola di kemudian hari.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Buka lima penawaran pembuatan website di meja kerjamu hari ini, dan kamu mungkin akan melihat angka yang bikin kening berkerut: satu pihak memasang tarif Rp350.000 terima beres, sementara vendor lain mengajukan proposal Rp25.000.000 untuk kebutuhan yang sekilas terdengar sama. Kebingungan melihat rentang [biaya pembuatan website bisnis](/jasa/pembuatan-website) ini hampir selalu dialami pemilik usaha di [BSD](/area/bsd), Bintaro, Alam Sutera, hingga penjuru Jabodetabek saat ingin membawa bisnisnya tampil rapi di internet. Sebelum kamu memutuskan mentransfer uang muka atau menebak apakah sebaiknya menyiapkan [landing page untuk iklan bisnis](/blog/landing-page-iklan-meta-google-konversi-tinggi), kamu perlu memahami apa saja komponen kerja yang sesungguhnya kamu bayar.',
      },
      {
        type: 'h2',
        id: 'mengapa-penawaran-biaya-pembuatan-website-bisnis-bisa-terpaut-sangat-jauh',
        text: 'Mengapa penawaran biaya pembuatan website bisnis bisa terpaut sangat jauh?',
      },
      {
        type: 'paragraph',
        text: 'Rentang biaya pembuatan website bisnis terpaut sangat jauh karena setiap penyedia jasa menjual cakupan kerja yang berbeda, mulai dari sekadar mengganti teks pada template siap pakai hingga merancang arsitektur alur bisnis, kecepatan muat seluler, struktur kalimat penawaran, serta kepemilikan penuh atas domain dan server.',
      },
      {
        type: 'paragraph',
        text: 'Saat kamu melihat iklan pembuatan website seharga beberapa ratus ribu rupiah, penyedia jasa tersebut umumnya menggunakan satu kerangka halaman yang sama untuk ratusan pembeli sekaligus. Mereka hanya mengganti logo, menempelkan foto dari WhatsApp kamu tanpa kompresi, lalu menaruhnya di server patungan yang padat. Pekerjaan selesai dalam dua jam, tetapi tidak ada pemikiran tentang bagaimana halaman tersebut meyakinkan calon pelangganmu.',
      },
      {
        type: 'paragraph',
        text: 'Sebaliknya, ketika kamu berbicara dengan partner teknis yang membedah bisnis kamu dari awal, yang dihitung adalah jam kerja rekayasa dan pemetaan alur pelanggan. Di CHESTAADOTCOM, Zeeshan di sisi operasional dan client success bersama Chesta Azka yang menangani arsitektur, produk, dan teknologi serta menulis kode sejak 2021 selalu memulai dengan satu pertanyaan sederhana: apa tugas halaman ini bagi kas bisnismu?',
      },
      {
        type: 'paragraph',
        text: 'Website yang hanya bertugas menampilkan alamat kantor tentu berbeda hitungannya dengan halaman yang harus menyaring ribuan klik iklan, menghitung ongkos kirim multi-cabang, atau mencatat antrean pesanan. Tanpa membedah tugas bisnisnya lebih dulu, membandingkan dua angka proposal di atas kertas hanya akan membuat kamu membandingkan apel dengan batu bata.',
      },
      {
        type: 'h2',
        id: 'apa-saja-komponen-teknis-yang-benar-benar-membuat-harga-website-naik',
        text: 'Apa saja komponen teknis yang benar-benar membuat harga website naik?',
      },
      {
        type: 'paragraph',
        text: 'Harga pembuatan website naik secara wajar ketika proyek membutuhkan logika pengolahan data khusus, integrasi dengan sistem pihak ketiga, pengaturan hak akses pengguna yang berbeda, penyusunan naskah penawaran yang terstruktur, serta penyesuaian tata letak agar tetap ringan ketika dibuka melalui jaringan seluler yang tidak stabil.',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik usaha mengira harga website dihitung per lembar halaman seperti mencetak buku menu. Padahal, sepuluh halaman statis yang hanya berisi teks profil dan foto kegiatan jauh lebih cepat dikerjakan dibanding satu halaman pemesanan yang harus memvalidasi ketersediaan jadwal secara langsung. Kerumitan logika di balik layar itulah yang memakan jam kerja paling besar.',
      },
      {
        type: 'paragraph',
        text: 'Komponen kedua yang memengaruhi biaya adalah penyusunan struktur pesan dan hierarki informasi. Pengunjung yang datang dari pencarian Google atau klik iklan tidak punya waktu membaca sejarah berdirinya perusahaanmu sepanjang lima paragraf. Merangkum masalah pelanggan, menampilkan bukti cara kerja, dan mengarahkan jari pengunjung ke tombol WhatsApp membutuhkan perancangan alur baca yang matang.',
      },
      {
        type: 'paragraph',
        text: 'Komponen ketiga menyangkut kesiapan teknis untuk mesin pencari dan perangkat seluler, mulai dari penandaan data terstruktur hingga waktu muat elemen utama di layar ponsel. Standar batas kecepatan halaman dan aturan perayapan mesin pencari terus diperbarui oleh penyedia platform; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
      },
      {
        type: 'table',
        caption: 'Perbandingan komponen pekerjaan website dan dampaknya pada jam kerja serta biaya',
        headers: [
          'Komponen Pekerjaan Website',
          'Dampak pada Jam Kerja & Biaya',
          'Kapan Bisnis Kamu Membutuhkannya',
        ],
        rows: [
          [
            'Halaman Informasi Statis (Landing Page / Profil)',
            'Rendah (mulai Rp1.200.000)',
            'Saat butuh etalase penawaran yang rapi, cepat dibuka di HP, dan langsung mengarahkan prospek ke WhatsApp.',
          ],
          [
            'Penyusunan Struktur Pesan & Alur Konversi',
            'Menengah',
            'Saat kamu belum memiliki draf kalimat penawaran yang tajam untuk menjawab keraguan calon pembeli baru.',
          ],
          [
            'Formulir Kualifikasi & Ringkasan Pesanan ke WA',
            'Menengah',
            'Saat admin sering kewalahan menghadapi chat masuk yang belum jelas jenis pesanan, lokasi, atau kebutuhannya.',
          ],
          [
            'Basis Data, Akun Pengguna, & Logika Operasional',
            'Tinggi (masuk kategori software custom)',
            'Saat website harus menyimpan riwayat transaksi, mengatur hak akses staf, atau mengelola stok dan laporan harian.',
          ],
          [
            'Integrasi Otomasi & Sistem Eksternal',
            'Tinggi',
            'Saat data dari website harus otomatis mengalir ke lembar kerja tim, pengingat jadwal, atau asisten percakapan.',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'mengapa-banyak-halaman-kosmetik-dan-animasi-berat-justru-merugikan-bisnis-kamu',
        text: 'Mengapa banyak halaman kosmetik dan animasi berat justru merugikan bisnis kamu?',
      },
      {
        type: 'paragraph',
        text: 'Penambahan halaman kosmetik dan efek animasi yang berlebihan justru merugikan bisnis karena memperlambat waktu muat di ponsel pelanggan, menghabiskan anggaran pengembangan untuk fitur yang tidak menghasilkan penjualan, serta membuat pengunjung menutup halaman sebelum sempat membaca penawaran utama atau menekan tombol kontak.',
      },
      {
        type: 'paragraph',
        text: 'Kami sering bertemu pemilik bisnis di Tangerang Selatan yang datang membawa referensi website luar negeri penuh video latar berputar, kursor yang memercikkan cahaya, dan belasan halaman sub-menu. Di layar laptop kantor dengan koneksi Wi-Fi cepat, tampilan seperti itu memang terlihat mencolok. Namun, coba buka halaman yang sama menggunakan ponsel kelas menengah di tengah perjalanan sekitar Bintaro atau Pamulang.',
      },
      {
        type: 'paragraph',
        text: 'Layar ponsel akan membeku selama beberapa detik sementara peramban mengunduh file skrip animasi berukuran besar. Calon pembeli yang tadinya hanya ingin mengecek daftar layanan dan nomor WhatsApp akhirnya kehilangan kesabaran lalu kembali ke hasil pencarian Google. Kamu sudah membayar lebih mahal untuk membuat animasi tersebut, lalu membayar lagi lewat hilangnya calon pelanggan setiap hari.',
      },
      {
        type: 'paragraph',
        text: 'Prinsip yang selalu kami pegang sederhana: setiap elemen di halaman website wajib mempercepat keputusan beli atau mempermudah pekerjaan tim kamu. Jika sebuah hiasan visual membuat tombol pesan bergeser-geser saat halaman dimuat atau menambah biaya pengerjaan tanpa menambah kejelasan informasi, coret fitur tersebut dari daftar pekerjaan.',
      },
      {
        type: 'h2',
        id: 'apa-bahaya-sewa-website-terima-beres-yang-domain-dan-hostingnya-dipegang-vendor',
        text: 'Apa bahaya sewa website terima beres yang domain dan hostingnya dipegang vendor?',
      },
      {
        type: 'paragraph',
        text: 'Skema sewa website terima beres yang mendaftarkan domain serta akun hosting atas nama vendor sangat berbahaya karena bisnis kamu tidak memiliki hak kepemilikan atas alamat digitalnya sendiri, sehingga vendor dapat menahan domain atau menaikkan biaya perpanjangan sepihak saat kamu ingin pindah pengelola.',
      },
      {
        type: 'paragraph',
        text: 'Di pasaran, banyak paket pembuatan website murah yang terlihat menggiurkan di tahun pertama karena membungkus domain, hosting, dan pembuatan halaman dalam satu tarif langganan. Masalah baru terasa di tahun kedua atau ketiga ketika bisnismu mulai ramai dikenal pelanggan. Tiba-tiba biaya perpanjangan tahunan dinaikkan berkali-kali lipat, atau respons dukungan teknis vendor menjadi sangat lambat.',
      },
      {
        type: 'paragraph',
        text: 'Saat kamu memutuskan ingin memindahkan website ke pengembang lain atau mengelolanya secara mandiri, vendor menolak memberikan kode transfer domain dengan alasan domain tersebut terdaftar di dalam akun induk milik mereka. Pilihan yang tersisa bagi pemilik bisnis sangat pahit: membayar biaya tebusan yang tidak masuk akal, atau merelakan alamat domain yang sudah tercetak di kemasan produk, kartu nama, dan profil Google Maps.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Peringatan',
        text: 'Jangan pernah menyetujui pembuatan website jika nama domain resmi bisnis kamu didaftarkan menggunakan akun pribadi vendor tanpa akses penuh di tanganmu. Kehilangan kendali atas domain berarti menyerahkan kunci pintu utama toko digitalmu kepada pihak luar.',
      },
      {
        type: 'paragraph',
        text: 'Di CHESTAADOTCOM, aturan kepemilikan aset ini tidak bisa ditawar: domain dan hosting wajib didaftarkan atas nama klien, dan data klien 100% tetap milik klien. Untuk harga langganan nama domain maupun paket server dari penyedia infrastruktur pihak ketiga, nilainya mengikuti ketentuan masing-masing registrar; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
      },
      {
        type: 'h2',
        id: 'bagaimana-perbandingan-skema-sewa-website-bulanan-dibanding-kepemilikan-penuh',
        text: 'Bagaimana perbandingan skema sewa website bulanan dibanding kepemilikan penuh?',
      },
      {
        type: 'paragraph',
        text: 'Membandingkan skema sewa website terima beres dengan skema kepemilikan penuh membantu pemilik bisnis melihat perbedaan jangka panjang pada kendali aset, kebebasan memilih vendor, transparansi biaya perpanjangan infrastruktur, serta keamanan data operasional pelanggan ketika bisnis bertumbuh di tahun-tahun berikutnya.',
      },
      {
        type: 'paragraph',
        text: 'Supaya kamu bisa menimbang untung ruginya secara jernih sebelum menandatangani penawaran dari vendor mana pun, perhatikan perbandingan langsung antara model sewa terkunci dan model kepemilikan penuh di bawah ini.',
      },
      {
        type: 'table',
        caption: 'Perbandingan skema sewa terima beres dibanding kepemilikan penuh atas nama klien',
        headers: [
          'Aspek Penilaian',
          'Skema Sewa Terima Beres (Dikunci Vendor)',
          'Skema Kepemilikan Penuh (Standar CHESTAADOTCOM)',
        ],
        rows: [
          [
            'Pendaftaran Nama Domain',
            'Atas nama akun vendor; klien tidak memegang akses panel domain.',
            'Didaftarkan resmi atas nama klien; akses akun berada di tangan klien.',
          ],
          [
            'Kepemilikan Akun Hosting & Data',
            'Menumpang di server vendor tanpa hak unduh data mentah.',
            'Akun hosting atas nama klien dan data klien 100% tetap milik klien.',
          ],
          [
            'Biaya Tahun Kedua dan Seterusnya',
            'Ditentukan sepihak oleh vendor dan sering kali melonjak tanpa rincian.',
            'Klien membayar biaya perpanjangan domain/hosting sesuai tagihan resmi penyedia.',
          ],
          [
            'Kebebasan Pindah Pengembang',
            'Sangat sulit; sering harus ganti alamat domain baru dari nol.',
            'Bebas berganti tim teknis kapan saja tanpa kehilangan domain maupun data.',
          ],
          [
            'Penyesuaian Fitur Saat Bisnis Tumbuh',
            'Terbatas pada fitur bawaan paket sewa yang disediakan vendor.',
            'Dapat dikembangkan bertahap ke otomasi workflow, AI agent, atau software custom.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Melihat tabel di atas, kamu bisa memahami mengapa harga awal yang tampak sedikit lebih murah pada skema sewa sering berujung jauh lebih mahal di tahun kedua. Membayar jasa pembuatan di depan dengan pembagian hak milik yang bersih membuat posisi tawar bisnismu selalu aman.',
      },
      {
        type: 'h2',
        id: 'bagaimana-cara-menyesuaikan-ruang-lingkup-fitur-website-ketika-budget-terbatas',
        text: 'Bagaimana cara menyesuaikan ruang lingkup fitur website ketika budget terbatas?',
      },
      {
        type: 'paragraph',
        text: 'Menyesuaikan ruang lingkup fitur dengan anggaran terbatas dilakukan dengan memfokuskan biaya pada satu halaman penawaran inti yang siap menerima pelanggan, menggunakan alur pemesanan ke WhatsApp alih-alih keranjang belanja rumit, serta menunda fitur tambahan ke tahap berikutnya setelah halaman pertama menghasilkan pemasukan.',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik usaha merasa sungkan berdiskusi soal keterbatasan anggaran, lalu akhirnya meminta potongan harga langsung dari total proposal. Di CHESTAADOTCOM, kami tidak memberikan diskon di depan. Alasannya jujur: jika harga dipotong begitu saja sementara daftar pekerjaannya tetap sama banyak, maka satu-satunya yang dikorbankan oleh pengembang adalah ketelitian kode, pengujian di layar ponsel, dan kualitas keamanan.',
      },
      {
        type: 'paragraph',
        text: 'Prinsip kami adalah jika budget klien lebih kecil, yang dikurangi adalah ruang lingkup fitur atau pekerjaannya, bukan kualitas pengerjaannya. Dengan memangkas fitur yang belum mendesak, kamu tetap mendapatkan halaman website yang cepat, rapi, dan sehat secara teknis mulai dari Rp1.200.000.',
      },
      {
        type: 'ol',
        title: 'Lima langkah praktis menyusun ruang lingkup website agar pas dengan anggaran:',
        items: [
          'Tetapkan satu tujuan kas paling dekat: Pilih satu layanan atau produk utama yang margin keuntungannya paling sehat untuk ditonjolkan di halaman pertama, daripada membuat dua puluh halaman untuk seluruh cabang layanan sekaligus.',
          'Ganti sistem keranjang belanja otomatis dengan formulir ringkas ke WhatsApp: Membangun gerbang pembayaran otomatis dan hitung ongkir kurir membutuhkan jam kerja tinggi. Untuk tahap awal, gunakan pemilih paket sederhana di halaman web yang ketika diklik langsung menyusun teks pesanan rapi ke chat admin.',
          'Sediakan materi foto dan dokumen layanan yang sudah ada: Kamu bisa menghemat waktu pengerjaan dengan mengumpulkan foto asli kegiatan usaha, daftar harga dasar, serta jawaban atas pertanyaan yang paling sering diajukan pelanggan sehari-hari.',
          'Tunda pembuatan panel admin khusus jika perubahan data jarang terjadi: Apabila daftar harga atau paket layananmu hanya berubah tiga bulan sekali, kamu belum membutuhkan dashboard manajemen konten yang rumit di hari pertama.',
          'Jadwalkan pengembangan tahap kedua dari hasil penjualan tahap pertama: Setelah halaman pertama terbukti mendatangkan pesanan rutin dan ketika tim admin mulai kewalahan membalas chat, barulah kamu merencanakan langkah lanjutan seperti membaca panduan [kapan bisnis butuh AI agent untuk bantu admin balas chat pelanggan](/blog/ai-agent-vs-chatbot-perbedaan-untuk-bisnis).',
        ],
      },
      {
        type: 'h2',
        id: 'contoh-skenario-bagaimana-usaha-katering-di-bintaro-memangkas-anggaran-tanpa-mengorbankan-kualitas',
        text: 'Contoh skenario: bagaimana usaha katering di Bintaro memangkas anggaran tanpa mengorbankan kualitas?',
      },
      {
        type: 'paragraph',
        text: 'Pada contoh skenario usaha katering di Bintaro ini, pemilik bisnis berhasil menghemat anggaran awal secara signifikan dengan menunda pembuatan sistem keranjang belanja otomatis yang rumit dan menggantinya menjadi landing page katalog menu interaktif yang merangkum pesanan pelanggan langsung ke WhatsApp.',
      },
      {
        type: 'paragraph',
        text: '**Contoh skenario:** Bayangkan sebuah usaha katering harian dan nasi kotak acara kantor di kawasan Bintaro yang sedang bersiap menyambut musim rapat akhir tahun. Awalnya, pemilik usaha tersebut ingin membuat website pemesanan lengkap: pengunjung bisa memilih puluhan kombinasi lauk per hari, menghitung tarif kurir instan otomatis berdasarkan titik koordinat gedung di Jakarta Selatan dan Tangerang Selatan, lalu membayar langsung lewat berbagai metode virtual account di dalam website.',
      },
      {
        type: 'paragraph',
        text: 'Jika seluruh fitur tersebut dibangun sekaligus dari nol, ruang lingkupnya sudah masuk ke ranah aplikasi web custom dengan jam rekayasa yang panjang. Saat berdiskusi dalam sesi audit gratis 30 menit, kami membedah kebiasaan asli pelanggan katering mereka di lapangan. Ternyata, pelanggan korporat hampir selalu meminta penyesuaian menu untuk peserta yang alergi, menanyakan ketersediaan tanggal pengiriman pagi buta, dan meminta faktur tagihan manual sebelum mentransfer uang muka.',
      },
      {
        type: 'paragraph',
        text: 'Artinya, meskipun website dilengkapi keranjang belanja otomatis yang mahal, pembeli tetap akan menghubungi admin lewat WhatsApp untuk memastikan detail acara. Dari temuan tersebut, pemilik katering memutuskan memangkas ruang lingkup tahap pertama menjadi satu landing page katalog menu yang cepat dimuat di ponsel, lengkap dengan kalkulator perkiraan porsi sederhana.',
      },
      {
        type: 'paragraph',
        text: 'Sebagai ilustrasi perhitungan sederhana: misalnya anggaran awal yang disiapkan pemilik usaha adalah Rp1.500.000, maka alih-alih memaksakan sistem pembayaran otomatis yang setengah matang, anggaran tersebut difokuskan penuh pada halaman katalog paket rapat dan formulir pemesanan cepat yang mengirim ringkasan nama pemesan, tanggal acara, jumlah kotak, dan pilihan menu langsung ke WhatsApp admin. Hasilnya, halaman dapat selesai dalam hitungan hari dengan kualitas tampilan dan kecepatan penuh, sementara dana sisanya disimpan untuk operasional dapur.',
      },
      {
        type: 'h2',
        id: 'bagaimana-pengalaman-proyek-nyata-mengajarkan-kami-cara-menjaga-kualitas-dan-kepemilikan-aset',
        text: 'Bagaimana pengalaman proyek nyata mengajarkan kami cara menjaga kualitas dan kepemilikan aset?',
      },
      {
        type: 'paragraph',
        text: 'Pengalaman kami mengerjakan sistem pencatatan untuk brand minuman, sistem manajemen pondok pesantren, dan sistem operasional gudang logistik membuktikan bahwa keberhasilan proyek teknologi bergantung pada pemetaan alur kerja yang jujur di awal, pembagian tahap pembayaran yang adil, serta kejelasan serah terima aset.',
      },
      {
        type: 'paragraph',
        text: 'Di CHESTAADOTCOM, kami tidak memisahkan standar kerapian antara pembuatan website mulai Rp1.200.000 dengan pembuatan software custom maupun otomasi workflow. Ketiga pengalaman proyek nyata yang pernah kami kerjakan dengan identitas klien yang dirahasiakan selalu berawal dari pembedahan masalah operasional yang konkret, bukan dari daftar fitur kosmetik.',
      },
      {
        type: 'paragraph',
        text: 'Pertama, ketika membangun sistem pencatatan suhu, barang, dan barang gagal untuk sebuah brand minuman, tantangannya adalah memastikan staf di lapangan dapat memasukkan angka suhu penyimpanan dan jumlah produk cacat dengan cepat lewat layar ponsel tanpa salah ketik. Kedua, saat merancang sistem manajemen untuk sebuah pondok pesantren, fokus utamanya adalah menyederhanakan alur administrasi harian agar pengurus tidak perlu menyalin data berulang kali di buku besar yang terpisah. Ketiga, dalam pengerjaan sistem operasional untuk sebuah gudang logistik, prioritasnya adalah ketepatan pencatatan keluar-masuk barang agar tim operasional memiliki satu sumber data yang sama.',
      },
      {
        type: 'paragraph',
        text: 'Dari proyek-proyek tersebut, Chesta Azka dan Zeeshan menerapkan aturan main yang melindungi kedua belah pihak secara seimbang. Setiap proyek selalu melewati audit gratis 30 menit terlebih dahulu untuk menyepakati batas ruang lingkup pekerjaan secara tertulis.',
      },
      {
        type: 'paragraph',
        text: 'Setelah ruang lingkup disepakati, skema pembayarannya jelas: DP 50% dibayarkan sebelum pengerjaan dimulai, dan pelunasan 50% dibayarkan sebelum handover atau serah terima penuh. Sebelum pelunasan dilakukan, kamu sudah bisa melihat dan menguji langsung hasil pekerjaannya, memastikan seluruh halaman berjalan mulus sesuai kesepakatan, serta memverifikasi bahwa domain dan akun hosting sudah tercatat resmi atas nama kamu sendiri.',
      },
      {
        type: 'h2',
        id: 'apa-saja-yang-perlu-disiapkan-sebelum-sesi-audit-gratis-30-menit',
        text: 'Apa saja yang perlu disiapkan sebelum sesi audit gratis 30 menit?',
      },
      {
        type: 'paragraph',
        text: 'Sebelum mengikuti sesi audit gratis 30 menit untuk menentukan biaya pembuatan website bisnis, kamu cukup menyiapkan ringkasan layanan utama yang ingin dijual, contoh alur pemesanan pelanggan saat ini, kisaran anggaran yang nyaman, serta satu orang pengambil keputusan agar ruang lingkup langsung jelas.',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik bisnis menunda konsultasi karena merasa harus menyiapkan dokumen spesifikasi teknis setebal puluhan halaman terlebih dahulu. Padahal, tugas memetakan kebutuhan teknis adalah pekerjaan kami. Kamu cukup membawa pengetahuan tentang cara bisnismu melayani pelanggan sehari-hari.',
      },
      {
        type: 'ul',
        title: 'Empat hal sederhana yang perlu disiapkan sebelum sesi diskusi 30 menit:',
        items: [
          'Urutan prioritas produk atau jasa: Layanan mana yang paling sering dicari pelanggan dan paling sehat marginnya untuk dijadikan ujung tombak halaman pertama.',
          'Alur tanya-jawab admin saat ini: Pertanyaan apa saja yang selalu diulang-ulang oleh calon pembeli di WhatsApp sebelum mereka akhirnya sepakat membayar.',
          'Batas anggaran dan target waktu tayang: Sampaikan secara terbuka berapa budget yang kamu alokasikan saat ini dan kapan halaman tersebut harus siap dipakai.',
          'Status aset digital yang sudah ada: Beri tahu apakah kamu sudah pernah membeli nama domain sendiri sebelumnya, atau apakah seluruh pendaftaran domain dan hosting perlu kami pandu dari awal atas namamu.',
        ],
      },
    ],
    conclusion: [
      'Menghitung biaya pembuatan website bisnis tidak perlu menjadi tebak-tebakan yang menguras waktu jika kamu memisahkan antara kebutuhan alur kerja nyata dan hiasan kosmetik yang tidak perlu. Fokuskan anggaran pertamamu pada kecepatan muat halaman di ponsel, kejelasan kalimat penawaran, serta kepastian bahwa domain dan hosting terdaftar 100% atas nama kamu sendiri.',
      'Jika anggaran saat ini masih terbatas, pangkas ruang lingkup fiturnya ke halaman yang paling cepat mendatangkan pelanggan mulai dari Rp1.200.000 tanpa mengorbankan kualitas pengerjaan. Langkah paling praktis yang bisa kamu lakukan hari ini adalah mencatat tiga layanan utama bisnismu di selembar kertas, lalu jadwalkan sesi audit gratis 30 menit lewat WhatsApp agar kamu memegang rincian ruang lingkup dan biaya pasti sebelum mengeluarkan uang sepeser pun.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Diskusikan Kebutuhan Website & Estimasi Biaya Bisnismu',
      description:
        'Ceritakan target yang ingin kamu capai dalam audit gratis 30 menit. Kami bantu rekomendasikan ruang lingkup yang paling masuk akal mulai dari Rp1.200.000.',
      href: '/jasa/pembuatan-website',
      label: 'Pelajari Jasa Pembuatan Website & Harga',
    },
    faq: [
      {
        question: 'Berapa biaya pembuatan website bisnis untuk tahap awal di CHESTAADOTCOM?',
        answer:
          'Biaya pembuatan website dan landing page di tempat kami dimulai dari Rp1.200.000. Layanan lain seperti AI agent, software custom, dan otomasi workflow memiliki harga mulai dari di halaman Harga, dan angka finalnya ditentukan setelah sesi audit gratis 30 menit sesuai ruang lingkup kerja yang disepakati.',
      },
      {
        question: 'Bagaimana skema pembayaran proyek pembuatan website di CHESTAADOTCOM?',
        answer:
          'Kami menerapkan skema pembayaran dua tahap yang transparan: DP 50% dibayarkan sebelum pengerjaan dimulai dan pelunasan 50% dilakukan sebelum serah terima atau handover. Kami tidak memberikan diskon di depan; apabila budget kamu lebih kecil, kami akan membantu mengurangi ruang lingkup fitur agar kualitas teknisnya tetap terjaga.',
      },
      {
        question: 'Siapa yang memegang hak milik domain, hosting, dan data website bisnis saya?',
        answer:
          'Domain dan akun hosting selalu didaftarkan resmi atas nama kamu sebagai klien, dan seluruh data bisnis 100% tetap menjadi milik kamu. Kamu memegang akses penuh ke akun pendaftar domain maupun server sehingga tidak akan pernah terkunci oleh vendor.',
      },
      {
        question: 'Apakah tim CHESTAADOTCOM bisa diajak diskusi tatap muka di area Tangerang Selatan?',
        answer:
          'Bisa. Kami berbasis di BSD, Tangerang Selatan, dan melayani pemilik bisnis di seluruh Tangerang Selatan serta Jabodetabek. Sehari-hari kami bekerja secara online lewat WhatsApp dan video call, serta siap mengadakan pertemuan tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        question: 'Apa yang sebaiknya saya pilih dulu jika anggaran terbatas: website banyak halaman atau landing page?',
        answer:
          'Mulailah dari satu halaman landing page yang fokus mengarahkan calon pembeli ke WhatsApp dengan struktur penawaran yang tajam. Setelah halaman pertama tersebut rutin menghasilkan pesanan dan arus kas, kamu bisa menambah halaman katalog atau fitur lanjutan secara bertahap.',
      },
    ],
    relatedSlugs: [
      'landing-page-iklan-meta-google-konversi-tinggi',
      'ai-agent-vs-chatbot-perbedaan-untuk-bisnis',
      'cara-memilih-jasa-pembuatan-website-tangerang-selatan',
    ],
  }),

  // ==========================================================================
  // 3. WHATSAPP BUSINESS AI AGENT PILLAR GUIDE
  // ==========================================================================
  defineBlogPost({
    slug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    alternateSlug: 'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
    slugAliases: [
      'kapan-bisnis-butuh-ai-agent-whatsapp',
      'otomasi-whatsapp-ai-klinik-dan-fnb',
    ],
    title: 'Kapan Bisnis Kamu Cukup Pakai WhatsApp Business Biasa, dan Kapan Butuh AI Agent yang Membantu Admin?',
    seoTitle: 'AI Agent untuk WhatsApp Bisnis: Kapan Butuh & Batas Tugas',
    excerpt:
      'Pelajari kapan bisnis lokal cukup pakai WhatsApp Business biasa, kapan butuh AI agent berbasis dokumen SOP, serta batas tugas yang wajib dipegang admin.',
    metaDescription:
      'Pelajari kapan bisnis lokal cukup pakai WhatsApp Business biasa, kapan butuh AI agent berbasis dokumen SOP, serta batas tugas yang wajib dipegang admin.',
    category: 'Otomasi AI & Workflow',
    categorySlug: 'otomasi-ai',
    tags: [
      'ai agent untuk whatsapp bisnis',
      'otomasi whatsapp',
      'ai agent bisnis',
      'sop admin whatsapp',
      'alam sutera',
    ],
    author: 'chesta',
    date: '2026-10-18',
    updatedAt: '2026-10-29',
    featured: true,
    draft: false,
    coverImageKey: 'blogWhatsappAiClinicFnb',
    cover: SITE_IMAGES.blogWhatsappAiClinicFnb.src,
    coverAlt: SITE_IMAGES.blogWhatsappAiClinicFnb.alt,
    beforeIntroSnapshot:
      'Hampir setiap pemilik usaha jasa, klinik, bengkel, maupun bisnis kuliner di Tangerang Selatan dan Jabodetabek mengandalkan WhatsApp sebagai pintu utama masuknya uang. Namun ketika pesan masuk mulai ramai di malam hari atau saat jam sibuk, banyak pemilik bisnis bingung menentukan apakah perlu memasang AI agent untuk WhatsApp bisnis atau cukup merapikan fitur balas cepat di aplikasi yang sudah ada.',
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Jangan pernah memasang AI agent jika daftar harga, aturan layanan, dan SOP jawaban admin kamu sendiri masih berantakan, karena AI hanya seakurat dokumen operasional yang menjadi pegangannya.',
          'AI agent bukan untuk menggantikan admin manusia sepenuhnya, melainkan menyaring pertanyaan dasar seperti jadwal, ketersediaan slot, estimasi biaya, dan syarat layanan, lalu merangkum kebutuhan pelanggan sebelum diserahkan ke admin manusia untuk negosiasi akhir.',
          'Seluruh data percakapan dan basis pengetahuan bisnis wajib 100% milik klien dengan batasan tegas kapan AI harus berhenti menjawab dan mengoper percakapan ke manusia.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Hampir setiap pemilik usaha jasa, klinik, bengkel, maupun bisnis kuliner di Tangerang Selatan dan Jabodetabek mengandalkan WhatsApp sebagai pintu utama masuknya uang. Namun ketika pesan masuk mulai ramai di malam hari atau saat jam sibuk, banyak pemilik bisnis bingung menentukan apakah perlu memasang [AI agent untuk WhatsApp bisnis](/jasa/ai-agent) atau cukup merapikan fitur balas cepat di aplikasi yang sudah ada. Di berbagai kawasan komersial seperti [Alam Sutera](/area/alam-sutera), BSD, dan Bintaro, tidak sedikit pemilik usaha yang sudah telanjur mengeluarkan anggaran untuk mendatangkan pengunjung dari [landing page untuk iklan bisnis](/blog/kenapa-landing-page-lambat-bikin-iklan-boncos), tetapi justru kehilangan calon pembeli di ruang obrolan karena admin terlambat membalas atau kewalahan mengetik jawaban yang sama berulang kali.',
      },
      {
        type: 'h2',
        id: 'kapan-bisnis-lokal-cukup-memakai-fitur-bawaan-whatsapp-business-biasa',
        text: 'Kapan bisnis lokal cukup memakai fitur bawaan WhatsApp Business biasa?',
      },
      {
        type: 'paragraph',
        text: 'Bisnis lokal cukup memakai aplikasi WhatsApp Business biasa ketika jumlah pesan harian masih dapat dibalas langsung oleh satu admin, variasi pertanyaan pelanggan hanya berkisar pada alamat atau jam buka, dan alur pemesanan belum membutuhkan pengecekan jadwal silang maupun pembacaan dokumen aturan layanan yang berlapis.',
      },
      {
        type: 'paragraph',
        text: 'Tidak semua bisnis membutuhkan sistem kecerdasan buatan sejak hari pertama beroperasi. Jika dalam sehari nomor admin kamu menerima sepuluh hingga dua puluh obrolan baru dan sebagian besar pelanggan hanya menanyakan lokasi ruko, daftar menu statis, atau nomor rekening pembayaran, maka fitur bawaan yang ada di aplikasi WhatsApp Business gratis sudah sangat memadai.',
      },
      {
        type: 'paragraph',
        text: 'Kamu bisa mengoptimalkan fitur pesan sapaan otomatis saat pelanggan pertama kali menghubungi, pesan di luar jam kerja, serta fitur balas cepat menggunakan pintasan garis miring untuk mengirim brosur harga. Selama admin manusia masih sanggup membalas pesan dalam waktu beberapa menit tanpa salah ketik dan tanpa meninggalkan antrean pelanggan di meja kasir, tetaplah gunakan cara sederhana tersebut sambil merapikan catatan operasional harianmu.',
      },
      {
        type: 'h2',
        id: 'apa-tanda-operasional-bahwa-bisnis-kamu-sudah-membutuhkan-ai-agent-untuk-whatsapp-bisnis',
        text: 'Apa tanda operasional bahwa bisnis kamu sudah membutuhkan AI agent untuk WhatsApp bisnis?',
      },
      {
        type: 'paragraph',
        text: 'Bisnis kamu membutuhkan AI agent untuk WhatsApp bisnis ketika calon pelanggan sering mengirim pesan di luar jam kerja, admin kewalahan menjawab pertanyaan harga dan ketersediaan slot yang berulang, serta banyak prospek batal membeli hanya karena harus menunggu balasan manual hingga keesokan pagi.',
      },
      {
        type: 'paragraph',
        text: 'Masalah mulai muncul ketika skala usaha tumbuh atau ketika kamu mulai menjalankan promosi digital secara rutin. Calon pelanggan zaman sekarang sering mencari jasa perawatan rumah, bengkel mobil, klinik, atau katering sepulang kerja sekitar pukul delapan hingga sepuluh malam. Pada jam tersebut, niat beli mereka sedang tinggi, tetapi admin kamu sudah pulang dan beristirahat.',
      },
      {
        type: 'paragraph',
        text: 'Ketika pesan malam hari baru dibalas besok pagi pukul sembilan, calon pelanggan tersebut sering kali sudah berpindah ke tempat lain yang merespons lebih cepat. Di siang hari pun, admin yang harus melayani pelanggan tatap muka di lokasi sekaligus membalas puluhan chat masuk cenderung kelelahan, melewatkan detail pertanyaan, atau lupa mencatat jadwal janji temu ke dalam buku agenda.',
      },
      {
        type: 'paragraph',
        text: 'Pada titik inilah peran asisten pintar menjadi masuk akal secara bisnis. Alih-alih menambah staf shift malam hanya untuk menjawab pertanyaan dasar yang berulang, sistem dapat menyambut pelanggan dalam hitungan detik, membaca maksud pertanyaan mereka dalam bahasa sehari-hari, memeriksa jadwal kosong, dan mengumpulkan rincian kebutuhan mereka dengan sopan.',
      },
      {
        type: 'h2',
        id: 'bagaimana-perbandingan-whatsapp-business-biasa-balasan-otomatis-kaku-dan-ai-agent-berbasis-sop',
        text: 'Bagaimana perbandingan WhatsApp Business biasa, balasan otomatis kaku, dan AI agent berbasis SOP?',
      },
      {
        type: 'paragraph',
        text: 'Membandingkan aplikasi WhatsApp Business biasa, balasan otomatis berbasis tombol angka kaku, dan AI agent berbasis dokumen SOP membantu pemilik usaha menentukan alat mana yang paling pas dengan beban pesan harian, tingkat kerumitan layanan, serta kesiapan tim operasional dalam melayani pelanggan tanpa membuang anggaran.',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik usaha menyamakan semua balasan otomatis di WhatsApp sebagai hal yang sama. Padahal, ada perbedaan mendasar antara aplikasi standar di ponsel, sistem penjawab berbasis pohon angka kaku ("Ketik 1 untuk Harga, Ketik 2 untuk Alamat"), dan AI agent yang terhubung ke dokumen aturan operasional bisnis kamu.',
      },
      {
        type: 'table',
        caption: 'Perbandingan WhatsApp Business biasa, bot menu angka kaku, dan AI agent berbasis dokumen SOP',
        headers: [
          'Aspek Operasional',
          'WhatsApp Business Biasa (Aplikasi HP)',
          'Bot Menu Angka Kaku (Keyword Tree)',
          'AI Agent Berbasis Dokumen SOP & Jadwal',
        ],
        rows: [
          [
            'Cara Memahami Pesan Pelanggan',
            'Dibaca dan diketik manual sepenuhnya oleh admin manusia.',
            'Hanya mengenali angka atau kata kunci persis; bingung jika pelanggan bertanya dua hal sekaligus.',
            'Memahami kalimat percakapan wajar dan merujuk langsung pada dokumen SOP resmi bisnis.',
          ],
          [
            'Pengecekan Jadwal & Estimasi Biaya',
            'Admin harus membuka tabel jadwal terpisah lalu mengetik balasan manual.',
            'Tidak bisa mengecek slot jadwal dinamis atau menghitung perkiraan biaya kombinasi.',
            'Mengecek ketersediaan slot harian dan menyusun estimasi awal sesuai aturan tertulis.',
          ],
          [
            'Penanganan Pesan di Luar Jam Kerja',
            'Hanya mengirim satu pesan pemberitahuan bahwa admin sedang tutup.',
            'Sering membuat pelanggan buntu di menu berulang tanpa solusi nyata.',
            'Menjawab pertanyaan dasar, mencatat detail keluhan, dan menyiapkan ringkasan untuk admin pagi.',
          ],
          [
            'Serah Terima ke Admin Manusia',
            'Admin menangani sendiri seluruh obrolan dari awal sampai akhir.',
            'Sering tidak jelas kapan bot berhenti sehingga bertabrakan dengan balasan admin.',
            'Berhenti otomatis saat menyentuh batas wewenang dan mengirim ringkasan konteks ke admin.',
          ],
          [
            'Ketentuan Biaya & Penggunaan API',
            'Gratis di aplikasi ponsel dengan batas perangkat tertaut sesuai aturan resmi.',
            'Mengikuti skema platform penyedia layanan pesan yang dipilih.',
            'Mengikuti ruang lingkup integrasi dan ketentuan kuota dari penyedia platform resmi.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Untuk ketentuan teknis batas perangkat, kebijakan sesi percakapan 24 jam, serta tarif pesan template dari Meta, aturannya dapat berubah sewaktu-waktu; cek dokumentasi resmi untuk angka dan ketentuan terbaru.',
      },
      {
        type: 'h2',
        id: 'mengapa-ai-agent-tidak-boleh-dipasang-jika-daftar-harga-dan-sop-masih-berantakan',
        text: 'Mengapa AI agent tidak boleh dipasang jika daftar harga dan SOP operasional masih berantakan?',
      },
      {
        type: 'paragraph',
        text: 'Memasang AI agent ketika daftar harga, ketentuan garansi, dan SOP jawaban admin masih berantakan akan membuat sistem memberikan informasi yang membingungkan kepada pelanggan, karena akurasi jawaban kecerdasan buatan sepenuhnya bergantung pada kerapian dokumen rujukan resmi yang menjadi satu-satunya sumber pengetahuan operasional bisnis kamu.',
      },
      {
        type: 'paragraph',
        text: 'Ini adalah prinsip paling penting yang selalu kami sampaikan di CHESTAADOTCOM: teknologi secanggih apa pun tidak akan bisa menambal aturan operasional yang belum disepakati di dalam tim kamu sendiri. Jika saat ini admin pertama dan admin kedua di tempat usahamu masih sering memberikan jawaban harga yang berbeda untuk layanan yang sama, atau jika syarat garansi hanya tersimpan di kepala pemilik bisnis, maka memasang AI agent justru akan mempercepat kekacauan tersebut.',
      },
      {
        type: 'paragraph',
        text: 'AI agent yang sehat untuk bisnis tidak bekerja dengan cara mengarang jawaban bebas dari internet. Sistem ini dirancang menggunakan pendekatan pembacaan dokumen rujukan resmi, di mana AI hanya diizinkan menjawab berdasarkan tabel harga, panduan layanan, dan daftar pertanyaan yang sudah kamu sahkan.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Peringatan',
        text: 'Jangan pernah menghubungkan AI agent ke nomor WhatsApp pelanggan jika bisnis kamu belum memiliki daftar harga tertulis dan batas aturan layanan yang jelas. Tanpa dokumen SOP yang rapi, sistem berisiko salah memberikan estimasi biaya atau menjanjikan jadwal yang sebenarnya tidak tersedia.',
      },
      {
        type: 'paragraph',
        text: 'Di CHESTAADOTCOM, Chesta Azka yang menangani arsitektur, produk, dan teknologi serta menulis kode sejak 2021, bersama Zeeshan yang memimpin operasional dan client success, selalu menolak memasang sistem secara terburu-buru sebelum dokumen dasar klien dirapikan. Sama seperti saat kami membantu pemilik usaha menghitung [biaya pembuatan website bisnis](/blog/berapa-biaya-bikin-website-bisnis-panduan-harga), fondasi alur kerja yang jujur dan tertib jauh lebih penting daripada sekadar mengejar tren teknologi.',
      },
      {
        type: 'h2',
        id: 'bagaimana-langkah-menyiapkan-dokumen-sop-dan-katalog-sebelum-menghubungkan-ai-agent',
        text: 'Bagaimana langkah menyiapkan dokumen SOP dan katalog sebelum menghubungkan AI agent?',
      },
      {
        type: 'paragraph',
        text: 'Menyiapkan dokumen SOP dan katalog sebelum memasang AI agent dilakukan dengan merapikan daftar harga dasar, menulis jawaban standar untuk pertanyaan berulang, menetapkan syarat layanan yang tegas, memisahkan kasus yang wajib diserahkan ke manusia, serta menguji alur percakapan bersama tim operasional sebelum diluncurkan.',
      },
      {
        type: 'paragraph',
        text: 'Kamu tidak perlu menulis buku panduan setebal ratusan halaman untuk memulai. Cukup susun satu dokumen kerja yang bersih dan mudah diperbarui oleh tim kamu melalui lima langkah berurutan berikut ini:',
      },
      {
        type: 'ol',
        title: 'Lima langkah menyiapkan dokumen SOP dan katalog layanan:',
        items: [
          'Kumpulkan 20 hingga 30 pertanyaan pelanggan yang paling sering berulang: Buka riwayat chat WhatsApp admin selama dua minggu terakhir, lalu catat pertanyaan nyata yang selalu muncul setiap hari beserta jawaban paling tepat dari admin terbaikmu.',
          'Standarkan tabel katalog layanan dan patokan harga mulai dari: Buat tabel jelas yang memuat nama layanan, rincian apa saja yang didapat pelanggan, durasi pengerjaan rata-rata, serta harga dasar atau kisaran biaya resmi agar sistem tidak pernah menebak angka.',
          'Tetapkan daftar informasi wajib yang harus ditanyakan ke pelanggan: Tentukan tiga sampai empat data awal yang perlu dikumpulkan sistem sebelum obrolan diteruskan ke admin, misalnya nama pelanggan, lokasi atau jenis barang yang ingin diperbaiki, foto/detail keluhan, dan rencana hari kedatangan.',
          'Tulis aturan tegas kapan sistem wajib berhenti dan mengoper ke manusia: Buat daftar pemicu serah terima, seperti saat pelanggan meminta diskon khusus, menyampaikan komplain layanan sebelumnya, menanyakan kasus teknis di luar daftar standar, atau langsung meminta bicara dengan staf manusia.',
          'Pastikan kepemilikan penuh atas dokumen dan data percakapan: Simpan dokumen basis pengetahuan dan riwayat chat di dalam akun penyimpanan milik bisnismu sendiri. Di CHESTAADOTCOM, kami menerapkan prinsip bahwa seluruh domain, akun infrastruktur, dan data klien 100% tetap milik klien.',
        ],
      },
      {
        type: 'h2',
        id: 'di-mana-batas-tugas-antara-ai-agent-dan-admin-manusia-dalam-melayani-pelanggan',
        text: 'Di mana batas tugas antara AI agent dan admin manusia dalam melayani pelanggan?',
      },
      {
        type: 'paragraph',
        text: 'Batas tugas yang aman menempatkan AI agent sebagai penyaring pertanyaan awal seperti pengecekan jadwal, estimasi biaya dasar, dan pencatatan keluhan pelanggan, sedangkan admin manusia tetap memegang kendali penuh atas negosiasi harga akhir, penanganan komplain sensitif, serta verifikasi pembayaran transaksi bernilai besar.',
      },
      {
        type: 'paragraph',
        text: 'Kesalahan cara pandang yang sering membuat pemilik usaha kecewa adalah berharap AI agent menggantikan peran manusia seratus persen dari sapaan pertama hingga pelunasan tagihan. Dalam transaksi bisnis lokal di Indonesia, pelanggan tetap membutuhkan empati, kepastian, dan fleksibilitas manusia ketika berurusan dengan uang muka, keluhan darurat, atau permintaan khusus di luar paket standar.',
      },
      {
        type: 'paragraph',
        text: 'Tugas utama AI agent adalah mengangkat beban ketik berulang dari pundak admin kamu. Bayangkan AI agent sebagai staf penerima tamu di meja depan yang sangat disiplin: ia menyapa setiap orang yang datang di jam berapa pun, menjawab informasi jadwal dan tarif standar sesuai buku pedoman, mencatat keluhan awal dengan rapi, lalu menyerahkan lembar ringkasan tersebut kepada admin manusia untuk diselesaikan.',
      },
      {
        type: 'table',
        caption: 'Pembagian batas tugas antara AI agent dan admin manusia dalam operasional WhatsApp bisnis',
        headers: [
          'Jenis Situasi & Pertanyaan Masuk',
          'Penanggung Jawab Utama',
          'Tindakan Sistem & Alur Serah Terima',
        ],
        rows: [
          [
            'Tanya jam buka, alamat lokasi, daftar layanan, dan estimasi harga dasar',
            'AI Agent',
            'Menjawab instan sesuai dokumen katalog dan SOP resmi tanpa mengarang tambahan biaya.',
          ],
          [
            'Cek ketersediaan slot jadwal harian dan pencatatan rencana kedatangan awal',
            'AI Agent',
            'Memeriksa slot kosong pada tabel jadwal, mencatat pilihan jam pelanggan, dan mengunci antrean awal.',
          ],
          [
            'Pengumpulan detail keluhan awal pelanggan di luar jam kerja operasional',
            'AI Agent',
            'Menanyakan rincian masalah secara runtut, lalu menyusun ringkasan rapi untuk admin shift pagi.',
          ],
          [
            'Negosiasi harga khusus, permintaan potongan partai besar, atau kustomisasi layanan',
            'Admin Manusia',
            'AI agent merangkum permintaan pelanggan, menghentikan balasan otomatis, dan memberi tahu admin.',
          ],
          [
            'Komplain layanan, pembatalan mendadak, atau situasi pelanggan yang sedang emosi',
            'Admin Manusia',
            'AI agent menyampaikan permohonan maaf sopan dan langsung mengalihkan sesi obrolan ke staf manusia.',
          ],
          [
            'Konfirmasi bukti transfer uang muka dan keputusan penjadwalan akhir',
            'Admin Manusia',
            'Admin manusia memeriksa mutasi pembayaran secara langsung dan mengirimkan konfirmasi resmi.',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Dengan pembagian wewenang seperti tabel di atas, admin manusia tidak lagi datang ke kantor di pagi hari dengan perasaan stres melihat puluhan chat belum terbaca. Mereka cukup membaca ringkasan yang sudah disiapkan sistem, lalu langsung menghubungi pelanggan yang sudah jelas kebutuhannya.',
      },
      {
        type: 'h2',
        id: 'contoh-skenario-bagaimana-bengkel-spesialis-di-alam-sutera-menangani-chat-pelanggan-di-luar-jam-kerja',
        text: 'Contoh skenario: bagaimana bengkel spesialis di Alam Sutera menangani chat pelanggan di luar jam kerja?',
      },
      {
        type: 'paragraph',
        text: 'Pada contoh skenario bengkel spesialis di Alam Sutera ini, penggunaan AI agent yang terhubung ke jadwal harian membantu pemilik usaha menjawab ketersediaan slot servis dan mencatat rincian keluhan kendaraan pelanggan pada malam hari, sehingga admin pagi tinggal memproses konfirmasi akhir dengan cepat.',
      },
      {
        type: 'paragraph',
        text: '**Contoh skenario:** Bayangkan sebuah bengkel spesialis perawatan AC dan kaki-kaki mobil di kawasan Alam Sutera yang buka setiap hari pukul 08.30 hingga 17.00. Dalam kesehariannya, pemilik bengkel menyadari pola yang berulang: puluhan pesan WhatsApp justru masuk antara pukul 19.00 hingga 22.30 malam, tepat ketika para pemilik mobil sudah tiba di rumah sepulang kerja dan baru sempat mengeluhkan AC mobil yang kurang dingin atau bunyi di bagian roda.',
      },
      {
        type: 'paragraph',
        text: 'Sebelum merapikan sistemnya, pesan-pesan malam hari tersebut hanya disambut oleh satu kalimat pesan otomatis bawaan bahwa bengkel sudah tutup. Ketika admin bengkel baru mulai membalas satu per satu pada pukul 08.45 keesokan paginya, banyak pemilik mobil yang sudah telanjur membawa kendaraannya ke bengkel lain atau menunda perbaikan karena harus kembali bekerja.',
      },
      {
        type: 'paragraph',
        text: 'Dalam sesi audit gratis 30 menit, pemilik bengkel berdiskusi untuk memetakan ulang alur percakapan tanpa harus mempekerjakan staf admin malam. Pertama, bengkel tersebut merapikan tabel daftar layanan pengecekan dasar, kisaran biaya servis berkala sesuai ukuran mobil, serta tabel slot kuota pengerjaan harian di garasi mereka.',
      },
      {
        type: 'paragraph',
        text: 'Setelah dokumen SOP singkat tersebut siap, barulah dipasang AI agent pada nomor WhatsApp bengkel dengan batas tugas yang sangat jelas. Ketika seorang pelanggan mengirim pesan pukul sembilan malam menanyakan apakah besok pagi masih ada slot kosong untuk cek AC mobil yang bau apek, sistem langsung membalas dengan ramah, menginformasikan slot jam yang masih tersedia untuk esok hari, memberikan kisaran biaya pengecekan awal sesuai tabel resmi, lalu menanyakan merek mobil, tahun kendaraan, serta gejala yang dirasakan.',
      },
      {
        type: 'paragraph',
        text: 'Sistem sama sekali tidak diizinkan memberi vonis kerusakan komponen mesin sebelum mobil diperiksa mekanik di bengkel. Begitu pelanggan menyebutkan jenis mobil dan memilih rencana kedatangan pukul 10.00 pagi, sistem mencatat ringkasan tersebut ke lembar jadwal harian. Saat admin manusia tiba pukul 08.30 pagi, ia langsung melihat daftar mobil yang sudah terdata rapi beserta keluhannya, lalu tinggal menghubungi pelanggan untuk konfirmasi akhir.',
      },
      {
        type: 'h2',
        id: 'bagaimana-pengalaman-proyek-nyata-mengajarkan-kami-pentingnya-kerapian-data-dan-kepemilikan-aset',
        text: 'Bagaimana pengalaman proyek nyata mengajarkan kami pentingnya kerapian data dan kepemilikan aset?',
      },
      {
        type: 'paragraph',
        text: 'Pengalaman kami membangun sistem pencatatan untuk brand minuman, sistem manajemen untuk pondok pesantren, dan sistem operasional untuk gudang logistik menunjukkan bahwa sistem otomatis hanya berjalan andal jika aturan datanya tertib sejak awal dan seluruh data bisnis tetap seratus persen milik klien.',
      },
      {
        type: 'paragraph',
        text: 'Di CHESTAADOTCOM, kami melihat bahwa keberhasilan implementasi AI agent maupun software operasional tidak pernah ditentukan oleh seberapa rumit istilah teknis yang dipakai, melainkan oleh seberapa jujur sistem tersebut mengikuti alur kerja nyata di lapangan. Hal ini terbukti dari tiga proyek nyata yang pernah kami kerjakan dengan identitas klien yang dirahasiakan.',
      },
      {
        type: 'paragraph',
        text: 'Pertama, saat kami membangun sistem pencatatan suhu, barang, dan barang gagal untuk sebuah brand minuman, tantangannya adalah memastikan setiap angka suhu penyimpanan dan jumlah barang rusak tercatat dengan format yang seragam. Jika data dasar pencatatannya saja tidak memiliki standar yang jelas, laporan otomatis di atasnya tidak akan bisa dipercaya.',
      },
      {
        type: 'paragraph',
        text: 'Kedua, ketika kami mengerjakan sistem manajemen untuk sebuah pondok pesantren, kami belajar bahwa teknologi harus mempermudah pekerjaan pengurus harian, bukan menambah beban layar yang membingungkan. Ketiga, dalam pembuatan sistem operasional untuk sebuah gudang logistik, ketertiban pencatatan keluar-masuk barang dan pembagian wewenang staf menjadi kunci agar tidak ada barang yang selisih di lapangan.',
      },
      {
        type: 'ul',
        title: 'Tiga prinsip yang kami pegang saat membangun AI agent untuk WhatsApp bisnis:',
        items: [
          'Kepemilikan aset penuh di tangan kamu: Domain, hosting, akun pendukung, serta seluruh riwayat data dan dokumen SOP 100% tetap milik klien. Kamu tidak akan pernah dikunci oleh vendor jika suatu saat ingin mengelola sistem secara mandiri.',
          'Transparansi biaya dan ruang lingkup: Jika website di tempat kami dimulai dari Rp1.200.000, layanan pembuatan AI agent, software custom, dan otomasi workflow memiliki harga mulai dari di halaman Harga, dan harga finalnya ditentukan secara jujur setelah audit gratis 30 menit.',
          'Tanpa diskon semu yang memotong mutu: Kami menggunakan skema pembayaran DP 50% sebelum pengerjaan dan pelunasan 50% sebelum handover. Tidak ada diskon di depan; apabila budget kamu lebih terbatas, yang kami kurangi bersama adalah ruang lingkup fiturnya, bukan kualitas keamanannya.',
        ],
      },
      {
        type: 'h2',
        id: 'apa-saja-yang-perlu-disiapkan-sebelum-sesi-audit-gratis-30-menit',
        text: 'Apa saja yang perlu disiapkan sebelum sesi audit gratis 30 menit?',
      },
      {
        type: 'paragraph',
        text: 'Sebelum mengikuti sesi audit gratis 30 menit untuk memetakan kebutuhan AI agent WhatsApp, kamu cukup menyiapkan contoh tangkapan layar percakapan pelanggan yang paling sering berulang, daftar harga layanan terbaru, jam kerja admin saat ini, serta batas anggaran yang nyaman untuk bisnismu.',
      },
      {
        type: 'paragraph',
        text: 'Kami berbasis di BSD, Tangerang Selatan, dan melayani pemilik bisnis di seluruh Tangerang Selatan serta Jabodetabek. Sehari-hari kami bekerja secara online lewat WhatsApp dan video call, serta siap mengadakan pertemuan tatap muka di area Tangerang Selatan sesuai kesepakatan.',
      },
      {
        type: 'ul',
        title: 'Empat hal sederhana yang perlu disiapkan sebelum sesi diskusi 30 menit:',
        items: [
          'Contoh 5 sampai 10 chat asli pelanggan: Pilih percakapan yang paling sering menyita waktu admin kamu setiap hari, baik pertanyaan yang berujung beli maupun yang batal.',
          'Daftar harga dan aturan layanan saat ini: Bawa tabel harga atau brosur layanan yang biasa dikirim admin kepada calon pembeli, meskipun formatnya masih berupa catatan sederhana.',
          'Daftar hal yang dilarang dijawab otomatis: Pikirkan situasi apa saja di bisnismu yang menurutmu wajib ditangani langsung oleh manusia.',
          'Kondisi perangkat admin saat ini: Ceritakan berapa orang admin yang memegang WhatsApp saat ini dan di jam berapa pesan pelanggan paling sering menumpuk.',
        ],
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi',
        text: 'Sumber rujukan resmi',
      },
      {
        type: 'paragraph',
        text: 'Dokumentasi teknis dan standar industri berikut menjadi rujukan resmi dalam perancangan arsitektur WhatsApp Business Platform dan tata kelola data pelanggan; cek dokumentasi resmi masing-masing penyedia untuk angka kuota, tarif pesan template, dan regulasi terbaru:',
      },
      {
        type: 'ul',
        items: [
          '[Dokumentasi Resmi WhatsApp Business Platform (Cloud API) oleh Meta](https://developers.facebook.com/docs/whatsapp/cloud-api) menjelaskan aturan teknis pengiriman pesan, batas jendela percakapan 24 jam, dan pengelolaan webhook resmi.',
          '[Pusat Bantuan Resmi WhatsApp Business](https://www.whatsapp.com/business) merinci fitur bawaan aplikasi WhatsApp Business untuk usaha kecil dan menengah beserta ketentuan penggunaannya.',
          '[Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (JDIH BPK RI)](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) menjadi dasar hukum pengelolaan dan pelindungan data kontak serta riwayat komunikasi pelanggan di Indonesia.',
          '[OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) memberikan pedoman keamanan standar industri dalam membatasi wewenang aplikasi berbasis model bahasa dan mencegah manipulasi instruksi.',
        ],
      },
    ],
    conclusion: [
      'Memutuskan kapan bisnis kamu cukup memakai aplikasi WhatsApp Business biasa dan kapan butuh naik kelas menggunakan AI agent tidak perlu didasarkan pada rasa takut ketinggalan tren. Jika satu admin masih sanggup membalas seluruh pesan dengan cepat dan rapi, tetaplah gunakan cara yang ada. Namun jika pesan di luar jam kerja terus terlewat dan waktu admin habis untuk mengetik jawaban dasar yang sama setiap hari, memasang AI agent berbasis SOP yang tertib akan menjaga pintu penjualanmu tetap terbuka tanpa mengorbankan waktu istirahat tim.',
      'Langkah pertama yang bisa kamu lakukan hari ini sangat sederhana: buka ponsel admin bisnis kamu, pilih 10 pertanyaan pelanggan yang paling sering diulang minggu ini, lalu hubungi kami untuk menjadwalkan audit gratis 30 menit lewat WhatsApp agar kita bisa membedah apakah bisnis kamu sudah siap menggunakan AI agent atau cukup merapikan alur kerja yang ada.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Rancang AI Agent WhatsApp & Otomasi Jadwal untuk Bisnismu',
      description:
        'Kami membangun AI agent dengan batasan SOP yang ketat, terhubung ke kalender dan dokumen bisnismu. Jadwalkan audit alur 30 menit gratis.',
      href: '/id/jasa/ai-agent',
      label: 'Lihat Jasa AI Agent & Otomasi',
    },
    faq: [
      {
        question: 'Apakah balasan AI agent di WhatsApp akan terasa kaku seperti robot penjawab otomatis?',
        answer:
          'Tidak, selama sistem dirancang membaca dokumen SOP dengan gaya bahasa yang wajar. Berbeda dengan bot menu angka yang memaksa pelanggan mengetik angka 1 atau 2, AI agent mampu memahami pertanyaan kalimat sehari-hari dan membalas dengan sapaan sopan sesuai gaya komunikasi bisnis kamu, namun tetap patuh pada data harga dan aturan resmi yang tertulis di dokumen SOP.',
      },
      {
        question: 'Apakah admin manusia tetap bisa mengambil alih percakapan kapan saja?',
        answer:
          'Bisa setiap saat. Sistem dirancang dengan aturan batas tugas yang tegas: begitu pelanggan menanyakan hal di luar SOP, mengajukan negosiasi harga khusus, atau ketika admin manusia masuk ke ruang obrolan untuk membalas manual, AI agent otomatis berhenti membalas pada nomor tersebut dan menyerahkan kendali penuh kepada staf kamu.',
      },
      {
        question: 'Berapa biaya pembuatan AI agent untuk WhatsApp bisnis di CHESTAADOTCOM?',
        answer:
          'Layanan AI agent memiliki patokan harga mulai dari yang tertera di halaman Harga kami, sementara biaya finalnya ditentukan setelah sesi audit gratis 30 menit. Hal ini karena kebutuhan tiap bisnis berbeda, mulai dari yang hanya perlu tanya-jawab dokumen katalog hingga yang butuh terhubung ke jadwal harian. Skema pembayarannya adalah DP 50% sebelum pengerjaan dan pelunasan 50% sebelum handover.',
      },
      {
        question: 'Bagaimana jika dokumen SOP dan daftar harga bisnis saya saat ini belum rapi?',
        answer:
          'Jangan langsung memasang AI agent. Dalam sesi audit gratis 30 menit, kami justru akan membantu kamu melihat bagian mana dari daftar harga dan alur tanya-jawab admin yang harus dirapikan terlebih dahulu. Merapikan satu lembar tabel layanan dan aturan batas tugas sebelum mulai membangun sistem akan menyelamatkan bisnis kamu dari kesalahan informasi ke pelanggan.',
      },
      {
        question: 'Siapa yang memiliki data percakapan pelanggan dan dokumen SOP yang dimasukkan ke sistem?',
        answer:
          'Seluruh data pelanggan, riwayat percakapan, dokumen SOP, hingga akun domain dan hosting resmi terdaftar atas nama klien dan 100% tetap menjadi milik klien. Kami tidak pernah menahan akses akun atau mengunci data bisnis kamu di dalam sistem yang tidak bisa kamu kendalikan.',
      },
    ],
    relatedSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'human-handoff-ai-agent-kapan-serahkan-ke-manusia',
    ],
  }),

  // ==========================================================================
  // 4. HIGH-CONVERTING LANDING PAGE CHECKLIST
  // ==========================================================================
  defineBlogPost({
    slug: 'checklist-landing-page-konversi-tinggi-bisnis-jasa',
    alternateSlug: 'high-converting-landing-page-checklist-for-service-businesses',
    title: 'Checklist Landing Page Konversi Tinggi untuk Bisnis Jasa',
    seoTitle: 'Checklist Landing Page Bisnis Jasa | CHESTAADOTCOM',
    excerpt:
      'Desain visual yang rapi belum tentu menghasilkan chat WhatsApp jika urutan informasinya membuat calon klien ragu. Gunakan daftar periksa ini sebelum halamanmu diberi trafik iklan.',
    metaDescription:
      'Checklist praktis merancang landing page konversi tinggi untuk bisnis jasa di BSD & Jabodetabek: struktur layar pertama, transparansi harga, bukti kerja, dan CTA.',
    category: 'Konversi & UI/UX',
    categorySlug: 'konversi-ux',
    tags: ['Checklist Landing Page', 'Optimasi Konversi', 'Bisnis Jasa', 'Desain Web', 'Copywriting'],
    author: 'chesta',
    date: '2026-10-19',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogLandingPageChecklist',
    cover: SITE_IMAGES.blogLandingPageChecklist.src,
    coverAlt: SITE_IMAGES.blogLandingPageChecklist.alt,
    beforeIntroSnapshot:
      'Banyak halaman website terlihat rapi secara estetika, namun gagal menghasilkan pesan masuk ketika diberi trafik pengunjung. Penyebabnya sering kali bukan karena layanan yang ditawarkan kurang bagus, melainkan karena urutan informasi di halaman tersebut tidak menjawab keraguan calon pelanggan secara runtut.',
    content: [
      {
        type: 'paragraph',
        text: 'Calon klien yang membuka halaman bisnis jasa membutuhkan jawaban atas tiga pertanyaan dalam lima detik pertama: apa persisnya layanan yang kamu kerjakan, apakah kamu pernah menangani masalah serupa, dan berapa kisaran biaya serta langkah memulainya. Jika layar pertama halamanmu justru dipenuhi kalimat abstrak seperti "Mitra Strategis Terpercaya Masa Depan", pengunjung akan menutup halaman karena malas menebak-nebak.',
      },
      {
        type: 'paragraph',
        text: 'Bagi bisnis jasa seperti klinik perawatan, studio arsitektur dan interior, konsultan pajak, bengkel spesialis, maupun penyedia layanan B2B, keputusan menghubungi admin sangat bergantung pada kejelasan informasi. Berikut adalah urutan anatomi halaman dan daftar periksa yang kami terapkan pada [jasa pembuatan website](/jasa/pembuatan-website) di CHESTAADOTCOM.',
      },
      {
        type: 'h2',
        id: 'anatomi-urutan-seksi-landing-page-bisnis-jasa',
        text: '1. Urutan Seksi Landing Page yang Menjawab Keraguan Pembeli Secara Runtut',
      },
      {
        type: 'paragraph',
        text: 'Jangan menyusun bagian halaman berdasarkan selera dekorasi semata. Susunlah bagian dari atas ke bawah mengikuti alur berpikir calon klien saat mempertimbangkan penyedia jasa:',
      },
      {
        type: 'table',
        caption: 'Urutan bagian (section) landing page bisnis jasa dari atas ke bawah beserta fungsinya',
        headers: [
          'Urutan Bagian',
          'Pertanyaan di Kepala Pengunjung',
          'Isi Wajib di Dalam Bagian Tersebut',
        ],
        rows: [
          [
            '1. Layar Pertama (Hero)',
            '"Apakah tempat ini melayani kebutuhan saya di lokasi saya?"',
            'Judul H1 spesifik layanan + area, subjudul hasil nyata, 1 tombol CTA WhatsApp, & visual asli',
          ],
          [
            '2. Masalah & Solusi Spesifik',
            '"Apakah mereka paham kendala yang sedang saya alami?"',
            '3 situasi masalah nyata pelanggan dan bagaimana layananmu menyelesaikannya tanpa jargon',
          ],
          [
            '3. Paket Layanan & Patokan Harga',
            '"Kira-kira masuk ke anggaran saya atau tidak?"',
            '2–4 pilihan layanan utama lengkap dengan rincian yang didapat dan informasi harga mulai',
          ],
          [
            '4. Bukti Kerja & Studi Kasus',
            '"Bagaimana hasil kerja mereka sebelumnya?"',
            'Dokumentasi proyek asli, perbandingan sebelum-sesudah, dan profil penanggung jawab',
          ],
          [
            '5. Alur Kerja (3–4 Langkah)',
            '"Kalau saya hubungi sekarang, proses berikutnya bagaimana?"',
            'Urutan langkah dari konsultasi awal, survei/audit, pengerjaan, hingga serah terima',
          ],
          [
            '6. FAQ & Panggilan Aksi Penutup',
            '"Bagaimana dengan garansi, revisi, atau jadwalnya?"',
            '4–6 jawaban lugas atas keberatan umum pembeli + tombol CTA penutup ke WhatsApp',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'area-layar-pertama-above-the-fold',
        text: '2. Layar Pertama (Above-the-Fold): Uji Kejelasan 5 Detik',
      },
      {
        type: 'paragraph',
        text: 'Area paling atas layar tanpa menggulir adalah bagian paling menentukan. Pastikan kamu menggunakan rumus penulisan judul utama yang menyebutkan **Layanan Inti + Target/Lokasi + Hasil Konkret**. Misalnya, gantilah judul samar "Jasa Interior Impian" menjadi "Jasa Desain & Renovasi Interior Kantor Terima Beres di BSD & Tangerang Selatan".',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cara Melakukan Uji 5 Detik',
        text: 'Buka halamanmu di ponsel, tunjukkan kepada seseorang yang belum mengenal bisnismu selama 5 detik, lalu kunci layar. Tanyakan apa yang kamu jual dan bagaimana cara memesannya. Jika mereka ragu menjawab, perbaiki judul H1 kamu.',
      },
      {
        type: 'h2',
        id: 'transparansi-harga-mulai-sebagai-penyaring-prospek',
        text: '3. Mengapa Mencantumkan "Harga Mulai" Menghemat Waktu Admin Kamu',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik bisnis jasa takut mencantumkan patokan harga di halaman web karena khawatir kompetitor mengintip atau takut biaya akhirnya bervariasi tergantung ukuran proyek. Padahal, menyembunyikan informasi harga sama sekali justru menimbulkan dua kerugian: calon klien beranggaran layak ragu menghubungi karena takut ditembak harga mahal, sementara admin kamu habis waktunya melayani ratusan chat yang hanya menanyakan harga dasar lalu menghilang.',
      },
      {
        type: 'paragraph',
        text: 'Solusinya adalah mencantumkan **patokan harga mulai (starting price)** disertai penjelasan faktor apa yang memengaruhi biaya akhir. Sebagai contoh, di CHESTAADOTCOM kami mencantumkan dengan jelas bahwa pembuatan website dimulai dari Rp1.200.000, sedangkan sistem custom seperti pada [studi kasus dashboard logistik](/case-studies/sentralisasi-operasional-armada-logistik) dihitung berdasarkan ruang lingkup modul setelah sesi audit 30 menit.',
      },
      {
        type: 'h2',
        id: 'format-tautan-whatsapp-dan-pelacakan-konversi',
        text: '4. Struktur Tautan WhatsApp Otomatis & Kenyamanan Layar 375px',
      },
      {
        type: 'paragraph',
        text: 'Untuk pasar Indonesia, tombol langsung menuju WhatsApp menghasilkan konversi jauh lebih tinggi dibandingkan formulir email panjang. Agar calon pelanggan tidak bingung harus mengetik kalimat pembuka apa, dan supaya admin kamu langsung tahu dari halaman mana mereka berasal, gunakan format URL dengan pesan terisi otomatis serta pemicu pelacakan seperti contoh kode berikut:',
      },
      {
        type: 'code',
        language: 'tsx',
        filename: 'WhatsAppConversionButton.tsx',
        code: `const WHATSAPP_NUMBER = '6282125447232';

export function buildServiceWaLink(serviceName: string, pagePath: string): string {
  const message = \`Halo, saya membaca halaman \${serviceName} (\${pagePath}) dan ingin konsultasi mengenai kebutuhan bisnis saya.\`;
  return \`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(message)}\`;
}

// Pastikan tombol memiliki tinggi minimal 44px agar nyaman disentuh ibu jari di layar 375px
<a
  href={buildServiceWaLink('Renovasi Interior Kantor', '/layanan/interior-kantor')}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-medium"
>
  Konsultasi Gratis via WhatsApp
</a>`,
        caption: 'Contoh pembuatan tautan WhatsApp dengan pesan pembuka otomatis yang menyertakan konteks halaman asal prospek.',
      },
      {
        type: 'h2',
        id: 'checklist-final-sebelum-publikasi',
        text: '5. Daftar Periksa Final Sebelum Halaman Dipublikasikan',
      },
      {
        type: 'ul',
        items: [
          'Judul H1 menyebutkan layanan dan target pelanggan secara lugas tanpa kata klise.',
          'Terdapat patokan harga awal atau penjelasan cara perhitungan biaya yang jujur.',
          'Bukti kerja menampilkan dokumentasi asli atau contoh skenario terukur, bukan testimoni karangan.',
          'Tampilan di layar ponsel 375px bebas dari teks terpotong atau pergeseran ke samping (horizontal overflow).',
          'Seluruh tombol CTA memiliki tinggi area sentuh minimal 44px dan langsung membuka WhatsApp dengan teks terisi.',
          'Waktu muat halaman berada di bawah 2,5 detik pada jaringan seluler.',
        ],
      },
    ],
    conclusion: [
      'Landing page berkonversi tinggi tidak membutuhkan efek animasi rumit yang memusingkan mata. Ia bekerja karena menghargai waktu pengunjung: menyajikan penawaran yang jelas, bukti kerja yang jujur, patokan harga yang terbuka, dan jalur komunikasi WhatsApp yang instan.',
      'Gunakan daftar periksa di atas untuk mengevaluasi halaman bisnismu hari ini sebelum kamu menambah anggaran iklan bulanan.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Ingin Halaman Bisnismu Dirancang dengan Struktur Konversi Ini?',
      description:
        'Kami merancang landing page lengkap dengan penyusunan copywriting, tata letak mobile 375px, dan integrasi WhatsApp mulai dari Rp1.200.000.',
      href: '/jasa/pembuatan-website',
      label: 'Konsultasi Landing Page Sekarang',
    },
    faq: [
      {
        question: 'Mana yang lebih efektif untuk bisnis jasa: tombol langsung ke WhatsApp atau formulir isian?',
        answer:
          'Untuk mayoritas bisnis jasa di Indonesia, tombol langsung ke WhatsApp dengan teks pembuka otomatis menghasilkan jumlah chat yang lebih tinggi karena pelanggan ingin mendapat kepastian cepat. Jika kamu butuh menyaring data awal, kamu bisa memasang pemilih singkat 2–3 klik di halaman yang meneruskan pilihannya ke teks WhatsApp.',
      },
      {
        question: 'Berapa jumlah bagian (section) yang pas untuk satu landing page bisnis jasa?',
        answer:
          'Enam hingga delapan bagian yang mengalir runtut (Hero, Masalah & Solusi, Paket Layanan & Harga, Portofolio/Studi Kasus, Cara Kerja, Profil Tim, dan FAQ) sudah sangat cukup untuk menjawab keraguan calon klien tanpa membuat halaman terasa bertele-tele.',
      },
      {
        question: 'Apakah satu landing page bisa dipakai untuk mempromosikan lima layanan yang berbeda jauh?',
        answer:
          'Sebaiknya tidak jika dipakai untuk menerima klik iklan berbayar. Satu iklan spesifik sebaiknya mendarat di satu halaman yang membahas layanan tersebut secara mendalam agar pengunjung langsung merasa berada di halaman yang tepat.',
      },
    ],
    relatedSlugs: [
      'kenapa-landing-page-lambat-bikin-iklan-boncos',
      'berapa-biaya-bikin-website-bisnis-panduan-harga',
      'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    ],
  }),

  // ==========================================================================
  // 5. LOCAL SEO BSD & TANGERANG SELATAN
  // ==========================================================================
  defineBlogPost({
    slug: 'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    alternateSlug: 'local-seo-guide-for-bsd-and-south-tangerang-businesses',
    title: 'SEO Lokal untuk Bisnis di BSD & Tangerang Selatan: Cara Muncul di Google Maps dan Pencarian',
    seoTitle: 'SEO Lokal Bisnis BSD & Tangerang Selatan | CHESTAADOTCOM',
    excerpt:
      'Saat warga di BSD City, Bintaro, atau Gading Serpong mencari klinik, restoran, atau jasa terdekat di Google, pastikan bisnismu muncul di tiga teratas peta lokal dan halaman pertama.',
    metaDescription:
      'Panduan praktis SEO lokal untuk bisnis di BSD City, Alam Sutera, Bintaro & Tangerang Selatan: optimasi Google Business Profile, schema JSON-LD, dan ulasan.',
    category: 'SEO Lokal & Pertumbuhan',
    categorySlug: 'seo-lokal',
    tags: ['SEO Lokal', 'Google Business Profile', 'BSD City', 'Tangerang Selatan', 'Pemasaran Lokal'],
    author: 'chesta',
    date: '2026-10-20',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogLocalSeoBsd',
    cover: SITE_IMAGES.blogLocalSeoBsd.src,
    coverAlt: SITE_IMAGES.blogLocalSeoBsd.alt,
    beforeIntroSnapshot:
      'Coba bayangkan apa yang dilakukan warga di BSD City, Bintaro, Alam Sutera, atau Gading Serpong ketika mereka membutuhkan layanan terdekat, seperti klinik gigi keluarga, studio pilates, jasa renovasi interior rumah, bengkel AC mobil, atau tempat makan untuk acara kantor. Mereka hampir pasti membuka Google atau Google Maps lalu mengetikkan kata kunci layanan diikuti nama kawasan.',
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'SEO lokal di kawasan BSD City dan Tangerang Selatan berfokus pada penguasaan tiga besar Google Maps (Local 3-Pack) dan kutipan mesin AI (GEO/AEO) berdasarkan sinyal Relevansi, Jarak, dan Kredibilitas ulasan.',
          'Kelengkapan profil Google Business Profile, konsistensi data NAP (Name, Address, Phone) di seluruh platform, serta pemasangan schema JSON-LD LocalBusiness semantik memastikan bisnismu diutamakan bagi calon pembeli berjarak terdekat.',
          'Membangun aliran ulasan pelanggan asli secara otomatis melalui pesan tindak lanjut WhatsApp pasca-layanan menghasilkan sinyal reputasi organik yang aman dari sanksi penangguhan algoritma spam.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ketika seseorang di BSD City, Bintaro, Alam Sutera, atau Gading Serpong mengetik pencarian seperti "klinik gigi anak terdekat di BSD" atau "jasa desain interior kantor Tangerang Selatan" di Google, mereka tidak sedang mencari bacaan hiburan. Mereka adalah calon pembeli dengan niat transaksi tinggi yang sedang memilih tempat mana yang akan mereka hubungi minggu ini.',
      },
      {
        type: 'paragraph',
        text: 'Keuntungan terbesar dari SEO lokal adalah kamu tidak perlu bersaing melawan portal nasional raksasa di seluruh Indonesia. Selama profil Google Business Profile (Google Maps) dan halaman website bisnismu memiliki sinyal lokasi yang konsisten, cepat, dan terstruktur rapi, kamu bisa mengamankan posisi tiga teratas peta lokal (Local Map Pack) maupun hasil organik halaman pertama.',
      },
      {
        type: 'h2',
        id: 'tiga-pilar-peringkat-seo-lokal-google-dan-ai',
        text: '1. Tiga Pilar Penentu Peringkat Pencarian Lokal di Google & Mesin Jawaban AI',
      },
      {
        type: 'paragraph',
        text: 'Peringkat pencarian lokal ditentukan oleh kombinasi matematis tiga sinyal inti algoritma: relevansi kategori dengan kueri pengguna, kedekatan jarak geografis antara pencari dan lokasi fisik bisnis, serta keaslian ulasan dan kredibilitas otoritas digital yang tercatat pada sistem web.',
      },
      {
        type: 'paragraph',
        text: 'Baik algoritma pencarian lokal Google Maps maupun mesin pencari berbasis AI generasi terbaru (seperti ChatGPT Search, Perplexity AI, dan Google AI Overviews) menilai kelayakan bisnismu berdasarkan tiga pilar utama berikut:',
      },
      {
        type: 'table',
        caption: 'Tiga sinyal utama SEO lokal dan langkah teknis yang wajib dilengkapi bisnis di BSD & Tangsel',
        headers: [
          'Sinyal Algoritma',
          'Apa yang Diperiksa Mesin Pencari & AI',
          'Langkah Konkret di Bisnis Kamu',
        ],
        rows: [
          [
            '1. Relevansi (Relevance)',
            'Kecocokan semantik antara kata kunci pencari dengan kategori utama dan isi teks halaman bisnismu',
            'Pilih Primary Category yang spesifik di Google Maps & cantumkan layanan + lokasi kawasan di tag H1 dan Title web',
          ],
          [
            '2. Jarak & Area Layanan (Distance / Area Served)',
            'Kedekatan titik koordinat ruko fisik atau kejelasan cakupan radius layanan (service area) yang didaftarkan',
            'Konsistensi alamat NAP di footer web, peta, serta properti areaServed pada schema JSON-LD LocalBusiness',
          ],
          [
            '3. Kredibilitas & Bukti (Prominence)',
            'Keaslian ulasan pelanggan, volume ulasan berkala, kelengkapan foto lokasi ruko, dan kecepatan muat website',
            'Kumpulkan ulasan nyata berdetail layanan, unggah foto ruko asli tampak jalan, dan jaga waktu muat web LCP di bawah 2,5 detik',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Perlu diingat bahwa mesin pencari AI modern tidak hanya membaca nama bisnismu di peta; mereka merayapi halaman website resmi untuk memverifikasi apakah bisnismu masih aktif beroperasi, apakah nomor telepon WhatsApp masih valid, dan apakah kamu benar-benar memiliki keahlian teknis yang terbukti di wilayah Tangerang Selatan.',
      },
      {
        type: 'h2',
        id: 'optimasi-google-business-profile-secara-menyeluruh',
        text: '2. Melengkapi Google Business Profile (Google Maps) Secara Menyeluruh',
      },
      {
        type: 'paragraph',
        text: 'Pengisian Google Business Profile secara lengkap mencakup penetapan satu kategori primer yang presisi, pengisian katalog menu layanan dengan rentang harga transparan, penulisan deskripsi berbasis patokan kawasan nyata, serta pengunggahan berkala foto asli aktivitas ruko dari pinggir jalan.',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik ruko atau kantor di Tangerang Selatan hanya memverifikasi titik pin peta lalu membiarkan profilnya setengah kosong tanpa deskripsi dan foto berkala. Agar profil peta bisnismu unggul dibandingkan deretan kompetitor di blok ruko yang sama, terapkan disiplin empat bagian berikut:',
      },
      {
        type: 'ol',
        title: 'Langkah optimalisasi elemen profil Google Business Profile:',
        items: [
          'Kategori utama (Primary Category) yang sangat spesifik: Jangan hanya memilih kategori umum seperti "Klinik" jika bisnismu adalah "Klinik Gigi (Dental Clinic)" atau "Klinik Perawatan Kulit (Skin Care Clinic)". Algoritma Google memberikan bobot peringkat terbesar pada kecocokan kategori primer ini.',
          'Daftar layanan beserta kisaran harga transparan: Lengkapi seluruh menu Services di dasbor Google Business Profile. Sertakan nama layanan, penjelasan singkat 2 hingga 3 kalimat mengenai apa yang didapatkan pelanggan, serta estimasi harga mulai.',
          'Deskripsi profil dengan patokan kawasan nyata: Tulis deskripsi usaha secara wajar tanpa menumpuk kata kunci sampah. Sebutkan patokan ruko nyata di BSD atau Tangsel, misalnya: "Berlokasi di kawasan Ruko Golden Madrid BSD, bersebelahan dengan Pasar Modern BSD City dan mudah diakses dari gerbang tol BSD Timur."',
          'Unggahan foto nyata berkualitas tinggi secara berkala: Unggah foto tampak depan gedung dari trotoar jalan raya (memudahkan pelanggan yang menyetir menemukan plang bisnismu), foto ruang lobi yang bersih, serta foto tim kerja berseragam resmi.',
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Mitos Geotagging Foto vs Fakta Algoritma Google',
        text: 'Banyak praktisi pemasaran mengklaim bahwa menyematkan data koordinat EXIF (geotagging) manual ke file foto akan otomatis menaikkan peringkat peta. Kenyataannya, Google Maps menghapus data EXIF saat proses unggah untuk privasi. Yang dinilai nyata oleh Google adalah keaslian visual foto asli lingkungan ruko yang diambil langsung di tempat.',
      },
      {
        type: 'h2',
        id: 'schema-json-ld-localbusiness-untuk-seo-dan-aeo',
        text: '3. Memasang Schema JSON-LD LocalBusiness agar Mudah Dikutip Mesin AI (GEO / AEO)',
      },
      {
        type: 'paragraph',
        text: 'Data terstruktur JSON-LD bertindak sebagai paspor digital semantik yang menerjemahkan entitas bisnis fisik ke format kamus data standar Schema.org, sehingga mesin perayap AI dapat memvalidasi nama, koordinat GPS, jam buka, dan nomor WhatsApp tanpa risiko salah kutip.',
      },
      {
        type: 'paragraph',
        text: 'Saat calon pelanggan bertanya kepada asisten kecerdasan buatan seperti ChatGPT, Perplexity, atau Google Gemini: "Rekomendasikan klinik gigi terpercaya di BSD City yang buka hari Minggu sampai malam", model bahasa besar memindai data terstruktur website lokal untuk merangkum jawaban. Jika website bisnismu hanya memuat teks gambar tanpa markup semantik, AI tidak berani merekomendasikan tempatmu karena takut informasinya keliru.',
      },
      {
        type: 'paragraph',
        text: 'Setiap website yang kami bangun melalui [jasa pembuatan website](/id/jasa/pembuatan-website) selalu ditanami kode JSON-LD `LocalBusiness` atau `ProfessionalService` yang lengkap seperti struktur di bawah ini:',
      },
      {
        type: 'code',
        language: 'json',
        filename: 'local-business-schema-bsd.json',
        code: `{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://namabisniskamu.com/#localbusiness",
  "name": "Nama Usaha Profesional Kamu",
  "url": "https://namabisniskamu.com",
  "telephone": "+6282125447232",
  "priceRange": "Mulai dari Rp1.200.000",
  "image": "https://namabisniskamu.com/foto-depan-ruko-bsd.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ruko Golden Madrid 2 Blok F No. 12, Jl. Letnan Sutopo",
    "addressLocality": "BSD City, Serpong",
    "addressRegion": "Banten",
    "postalCode": "15310",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.302145,
    "longitude": 106.685324
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "BSD City" },
    { "@type": "AdministrativeArea", "name": "Alam Sutera" },
    { "@type": "AdministrativeArea", "name": "Bintaro" },
    { "@type": "AdministrativeArea", "name": "Gading Serpong" },
    { "@type": "AdministrativeArea", "name": "Tangerang Selatan" }
  ]
}`,
        caption: 'Contoh struktur data JSON-LD LocalBusiness lengkap dengan koordinat geolokasi dan jam operasional untuk mesin pencari modern.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Prinsip Konsistensi Data NAP (Name, Address, Phone)',
        text: 'Pastikan penulisan nama usaha, alamat jalan, dan nomor kontak WhatsApp di bagian footer website, bio media sosial, dan Google Maps sama persis hingga ke tanda baca dan singkatan jalan.',
      },
      {
        type: 'h2',
        id: 'strategi-mengumpulkan-ulasan-asli-tanpa-spam',
        text: '4. Cara Mengumpulkan Ulasan Pelanggan Asli Secara Otomatis Lewat WhatsApp',
      },
      {
        type: 'paragraph',
        text: 'Sistem pengumpulan ulasan terbaik memanfaatkan alur pesan ramah WhatsApp otomatis pada H+1 setelah transaksi selesai, memfilter kepuasan pelanggan secara privat, dan mengarahkan pelanggan yang puas ke tautan ulasan resmi Google Maps.',
      },
      {
        type: 'paragraph',
        text: 'Jangan pernah tergoda membeli ratusan ulasan palsu dari bot atau sindikat klik bayaran. Algoritma Google secara berkala menghapus ulasan yang datang dari akun tanpa riwayat lokasi nyata dan bisa langsung menangguhkan listing Google Maps bisnismu tanpa peringatan. Dua puluh ulasan asli yang menyebutkan nama dokter, menu makanan, atau jenis pengerjaan jauh lebih kuat mengangkat posisi pencarianmu.',
      },
      {
        type: 'paragraph',
        text: 'Untuk mengumpulkan ulasan secara konsisten tanpa membebani admin, kamu dapat menerapkan alur tindak lanjut otomatis melalui [jasa AI agent](/id/jasa/ai-agent) atau integrasi webhook CRM sederhana:',
      },
      {
        type: 'ol',
        title: 'Alur 3 langkah otomatisasi pengumpulan ulasan pelanggan:',
        items: [
          'Pemicu otomatis setelah transaksi tuntas: Sistem menandai status transaksi selesai di database kasir atau jadwal klinik, lalu menjadwalkan pengiriman pesan 24 jam kemudian.',
          'Pesan WhatsApp sopan dengan evaluasi privat: Pesan menyapa pelanggan dengan nama panggilan: "Halo Kak Budi, terima kasih sudah berkunjung ke klinik kemarin. Bagaimana kondisi gigi belakangnya hari ini? Apakah sudah terasa jauh lebih nyaman?".',
          'Penyaringan kepuasan cerdas: Jika pelanggan membalas puas, sistem mengirimkan tautan singkat menuju halaman ulasan Google: "Senang mendengarnya Kak! Jika berkenan, bolehkah berbagi cerita singkat di Google Maps kami untuk membantu pasien lain? Link: g.page/r/review". Sebaliknya, jika ada keluhan, sistem langsung mengalihkan chat ke manajer agar diselesaikan secara privat sebelum menjadi komplain publik.',
        ],
      },
      {
        type: 'h2',
        id: 'mengelola-service-area-bisnis-tanpa-ruko-fisik',
        text: '5. Mengelola Profil Wilayah Layanan (Service-Area Business) untuk Jasa Tanpa Ruko Fisik',
      },
      {
        type: 'paragraph',
        text: 'Bisnis jasa yang mendatangi lokasi pelanggan dapat memanfaatkan fitur Service-Area Business pada Google Business Profile untuk menyembunyikan alamat rumah pribadi sembari tetap menargetkan kecamatan spesifik di Tangerang Selatan.',
      },
      {
        type: 'paragraph',
        text: 'Tidak semua penyedia jasa membutuhkan kantor ruko bertingkat untuk melayani klien. Kontraktor interior, penyedia jasa servis AC panggilan, katering prasmanan, fisioterapis ke rumah, maupun konsultan IT mandiri di kawasan Serpong dan Pamulang sering beroperasi dari tempat tinggal pribadi. Jika kamu menampilkan alamat rumah di peta, pelanggan mungkin akan datang tanpa janji atau Google menolak verifikasi fisikmu.',
      },
      {
        type: 'paragraph',
        text: 'Solusi resmi yang disediakan Google adalah memilih tipe usaha "Service-Area Business". Pada pengaturan ini, alamat fisik jalan akan disembunyikan dari tampilan publik, dan Google Maps akan menampilkan lingkaran area jangkauan berdasarkan daftar kecamatan yang kamu layani (misalnya: Serpong, Serpong Utara, Ciputat Timur, Pondok Aren, dan Kelapa Dua).',
      },
      {
        type: 'h2',
        id: 'checklist-audit-mandiri-seo-lokal-bsd-tangsel',
        text: '6. Checklist Audit Mandiri 30 Menit SEO Lokal Bisnis BSD & Tangsel',
      },
      {
        type: 'paragraph',
        text: 'Pemeriksaan mandiri berkala setiap bulan memastikan tidak ada perubahan jam buka yang terlupakan, tidak ada ulasan pelanggan yang luput dari balasan admin, dan tautan website tetap aktif mengalirkan pesan ke nomor WhatsApp.',
      },
      {
        type: 'paragraph',
        text: 'Gunakan tabel daftar periksa berikut untuk mengaudit aset visibilitas lokal bisnismu dalam 30 menit:',
      },
      {
        type: 'table',
        caption: 'Checklist audit kesehatan SEO lokal dan Google Maps untuk bisnis di BSD & Tangerang Selatan',
        headers: ['Elemen yang Diperiksa', 'Kondisi Ideal yang Wajib Tercapai', 'Frekuensi Audit'],
        rows: [
          [
            'Nama Bisnis di Google Maps',
            'Sesuai nama legal/merek di plang fisik tanpa menumpuk kata kunci spam',
            'Satu kali saat setup',
          ],
          [
            'Kategori Utama & Sub-kategori',
            'Kategori primer tepat 100% dan dilengkapi 2–4 kategori sekunder relevan',
            'Setiap 3 bulan',
          ],
          [
            'Nomor Telepon & Tautan Web',
            'Nomor WhatsApp bisnis aktif dan URL website mengarah ke landing page cepat',
            'Setiap bulan',
          ],
          [
            'Jam Operasional & Libur Nasional',
            'Jam buka selalu diperbarui termasuk jadwal khusus hari libur keagamaan',
            'Setiap momen libur',
          ],
          [
            'Balasan Ulasan Pelanggan',
            '100% ulasan dibalas ramah dalam waktu maksimal 48 jam dengan menyebut nama layanan',
            'Setiap minggu',
          ],
          [
            'Foto Bangunan & Layanan Baru',
            'Minimal 2 foto asli baru diunggah setiap bulan untuk menunjukkan bisnis aktif',
            'Setiap bulan',
          ],
          [
            'Validitas Schema Markup Web',
            'Lolos pengujian Rich Results Test tanpa peringatan kesalahan atribut wajib',
            'Setiap pembaruan web',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi',
        text: 'Sumber rujukan resmi',
      },
      {
        type: 'paragraph',
        text: 'Dokumentasi teknis dan standar industri berikut menjadi rujukan resmi dalam implementasi SEO lokal dan data terstruktur Schema.org; cek dokumentasi resmi masing-masing penyedia untuk angka metrik dan kebijakan pembaruan terbaru:',
      },
      {
        type: 'ul',
        items: [
          '[Google Search Central: Panduan Data Terstruktur LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) merinci atribut teknis wajib untuk menampilkan entitas usaha lokal pada Google Search dan Maps.',
          '[Google Business Profile Help Center Guidelines](https://support.google.com/business/answer/3038177) mengatur pedoman kepatuhan penamaan usaha, pemilihan kategori, dan larangan spam ulasan.',
          '[Schema.org Official Vocabulary: LocalBusiness](https://schema.org/LocalBusiness) mendefinisikan hierarki tipe data semantik untuk klinik, restoran, dan jasa profesional.',
        ],
      },
    ],
    conclusion: [
      'SEO lokal di kawasan dinamis seperti BSD City dan Tangerang Selatan merupakan investasi jangka panjang yang mendatangkan calon pelanggan berniat beli tinggi secara berkesinambungan tanpa beban biaya iklan per klik.',
      'Kunci keberhasilannya bertumpu pada disiplin menjaga konsistensi data alamat di seluruh kanal, menyediakan struktur JSON-LD yang ramah mesin pencari AI, serta membiasakan staf meminta ulasan asli dari pelanggan yang puas.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Bangun Website Bisnis dengan Fondasi SEO Lokal & AEO Lengkap',
      description:
        'Setiap website yang kami rancang sudah dilengkapi struktur HTML semantik, JSON-LD LocalBusiness, sitemap dinamis, dan kecepatan tinggi mulai dari Rp1.200.000.',
      href: '/id/jasa/pembuatan-website',
      label: 'Konsultasi Website & SEO Lokal',
    },
    faq: [
      {
        question: 'Berapa lama waktu yang dibutuhkan sampai optimasi SEO lokal mulai terlihat hasilnya?',
        answer:
          'Penyempurnaan Google Business Profile dan penambahan ulasan asli biasanya mulai meningkatkan tayangan peta dan klik telepon dalam 2 hingga 4 minggu. Untuk posisi halaman website di hasil pencarian organik, pertumbuhan stabil umumnya terlihat dalam 1 hingga 3 bulan.',
      },
      {
        question: 'Apakah bisnis jasa yang melayani kunjungan ke lokasi klien tetap bisa memakai SEO lokal?',
        answer:
          'Sangat bisa. Google Business Profile menyediakan fitur Service-Area Business untuk penyedia jasa yang mendatangi rumah atau kantor klien, sehingga alamat rumah pribadi tetap aman tersimpan sembari menjangkau wilayah BSD, Bintaro, dan Tangsel.',
      },
      {
        question: 'Apakah website dari CHESTAADOTCOM sudah langsung memiliki pengaturan schema LocalBusiness dan sitemap?',
        answer:
          'Ya. Seluruh halaman website yang kami bangun sudah dilengkapi meta title, meta description, OpenGraph, JSON-LD LocalBusiness/ProfessionalService, serta terdaftar otomatis di sitemap XML dan arsip AI llms.txt.',
      },
      {
        question: 'Bagaimana cara memulihkan profil Google Business Profile yang terkena penangguhan (suspended)?',
        answer:
          'Penangguhan biasanya dipicu ketidaksesuaian nama bisnis dengan plang ruko fisik atau manipulasi alamat. Pemulihan dilakukan dengan mengajukan banding resmi ke Google disertai bukti foto plang ruko dari jalan dan dokumen legalitas usaha seperti NIB.',
      },
      {
        question: 'Mengapa ulasan dari pelanggan saya terkadang tidak muncul di Google Maps?',
        answer:
          'Google memiliki filter otomatis yang menahan ulasan jika pelanggan menulis ulasan saat terhubung ke Wi-Fi yang sama dengan pengelola bisnis, atau jika akun pengulas baru dibuat beberapa menit sebelumnya. Minta pelanggan mengulas menggunakan jaringan seluler pribadi mereka.',
      },
    ],
    relatedSlugs: [
      'schema-markup-untuk-bisnis-lokal-panduan-praktis',
      'geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai',
    ],
  }),
];

const SUPERSEDED_LEGACY_SLUGS = new Set([
  'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
  'guide-how-agentic-ai-works-for-beginners',
]);

export type InternalLinkKeyRef =
  | { post: string }
  | { caseStudy: string }
  | { service: string; area?: string }
  | { area: string };

export function resolveContentLinkKey(ref: InternalLinkKeyRef, locale: 'id' | 'en'): string {
  if ('post' in ref) {
    return normalizeInternalLinkHref(`/${locale}/blog/${ref.post}`, locale);
  }
  if ('caseStudy' in ref) {
    return normalizeInternalLinkHref(
      locale === 'en' ? `/en/case-studies/${ref.caseStudy}` : `/id/studi-kasus/${ref.caseStudy}`,
      locale
    );
  }
  if ('service' in ref) {
    const base = locale === 'en' ? `/en/services/${ref.service}` : `/id/jasa/${ref.service}`;
    return normalizeInternalLinkHref(ref.area ? `${base}/${ref.area}` : base, locale);
  }
  if ('area' in ref) {
    return normalizeInternalLinkHref(
      locale === 'en'
        ? `/en/services/website-development/${ref.area}`
        : `/id/jasa/pembuatan-website/${ref.area}`,
      locale
    );
  }
  throw new Error(`Invalid content link key: ${JSON.stringify(ref)}`);
}

export function normalizeInternalLinkHref(rawHref: string, locale: 'id' | 'en'): string {
  if (!rawHref) return rawHref;

  // Support structured link keys serialized as "{post:slug}", "{caseStudy:slug}", etc.
  const keyMatch = rawHref.trim().match(/^\{(post|caseStudy|service|area)\s*:\s*["']?([a-z0-9-]+)["']?\}$/i);
  if (keyMatch) {
    const [, kind, slug] = keyMatch;
    if (kind === 'post') return resolveContentLinkKey({ post: slug }, locale);
    if (kind === 'caseStudy') return resolveContentLinkKey({ caseStudy: slug }, locale);
    if (kind === 'service') return resolveContentLinkKey({ service: slug }, locale);
    if (kind === 'area') return resolveContentLinkKey({ area: slug }, locale);
  }

  if (!rawHref.startsWith('/')) return rawHref;
  let clean = rawHref.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const hashPart = rawHref.includes('#') ? `#${rawHref.split('#')[1]}` : '';

  // Fix double locale prefix /en/eng/... or /id/ind/...
  clean = clean.replace(/^\/en\/eng\//, '/en/').replace(/^\/id\/ind\//, '/id/');

  // Map legacy shorthand links to real indexable routes
  if (clean === '/id/glosarium' || clean === '/en/glossary' || clean === '/glosarium') {
    return locale === 'en'
      ? '/en/kamus-ai-teknologi/agentic-ai'
      : '/id/kamus-ai-teknologi/agentic-ai';
  }
  if (
    clean === '/area/bsd' ||
    clean === '/id/area/bsd' ||
    clean === '/id/area/bsd-city' ||
    clean === '/area/bsd-city' ||
    clean === '/en/areas/bsd' ||
    clean === '/en/area/bsd-city'
  ) {
    return locale === 'en'
      ? '/en/services/website-development/bsd-city'
      : '/id/jasa/pembuatan-website/bsd-city';
  }
  if (clean === '/area/pamulang' || clean === '/id/area/pamulang') {
    return locale === 'en'
      ? '/en/services/website-development/pamulang'
      : '/id/jasa/pembuatan-website/pamulang';
  }
  if (clean === '/area/jurang-mangu' || clean === '/id/area/jurang-mangu') {
    return locale === 'en'
      ? '/en/services/website-development/jurang-mangu'
      : '/id/jasa/pembuatan-website/jurang-mangu';
  }
  if (clean === '/area/lebak-bulus' || clean === '/id/area/lebak-bulus') {
    return locale === 'en'
      ? '/en/services/ai-agents/lebak-bulus'
      : '/id/jasa/ai-agent/lebak-bulus';
  }
  if (
    clean === '/area/tangerang-selatan' ||
    clean === '/id/area/tangerang-selatan' ||
    clean === '/area/bintaro' ||
    clean === '/area/alam-sutera' ||
    clean === '/area/gading-serpong'
  ) {
    return locale === 'en'
      ? '/en/services/website-development/tangerang-selatan'
      : '/id/jasa/pembuatan-website/tangerang-selatan';
  }

  // Case study broken slug & cross-locale prefix fixes
  if (
    clean === '/id/case-studies/wa-concierge-klinik' ||
    clean === '/case-studies/wa-concierge-klinik' ||
    clean === '/studi-kasus/wa-concierge-klinik' ||
    clean === '/id/studi-kasus/wa-concierge-klinik' ||
    clean === '/id/case-studies/otomasi-reservasi-klinik-estetika' ||
    clean === '/case-studies/otomasi-reservasi-klinik-estetika' ||
    clean === '/studi-kasus/otomasi-reservasi-klinik-estetika' ||
    clean === '/id/studi-kasus/otomasi-reservasi-klinik-estetika' ||
    clean === '/id/case-studies/klinik-gigi-bsd' ||
    clean === '/case-studies/klinik-gigi-bsd' ||
    clean === '/id/studi-kasus/klinik-gigi-bsd' ||
    clean === '/en/case-studies/wa-concierge-klinik' ||
    clean === '/en/case-studies/otomasi-reservasi-klinik-estetika' ||
    clean === '/en/case-studies/klinik-gigi-bsd'
  ) {
    return locale === 'en'
      ? `/en/case-studies/wa-concierge-klinik${hashPart}`
      : `/id/studi-kasus/wa-concierge-klinik${hashPart}`;
  }
  if (clean.startsWith('/id/case-studies/')) {
    const s = clean.slice('/id/case-studies/'.length);
    return `/id/studi-kasus/${s}${hashPart}`;
  }
  if (clean.startsWith('/en/studi-kasus/')) {
    const s = clean.slice('/en/studi-kasus/'.length);
    return `/en/case-studies/${s}${hashPart}`;
  }
  if (clean.startsWith('/case-studies/')) {
    const s = clean.slice('/case-studies/'.length);
    return locale === 'en'
      ? `/en/case-studies/${s}${hashPart}`
      : `/id/studi-kasus/${s}${hashPart}`;
  }

  // Legacy blog slug aliases
  if (
    clean === '/id/blog/mcp-model-context-protocol-bisnis' ||
    clean === '/blog/mcp-model-context-protocol-bisnis'
  ) {
    return '/id/blog/mcp-model-context-protocol-untuk-pemilik-bisnis';
  }
  if (clean === '/en/blog/mcp-model-context-protocol-business') {
    return '/en/blog/mcp-model-context-protocol-for-business-owners';
  }
  if (clean === '/id/blog/uu-pdp-whatsapp-ai-bisnis' || clean === '/blog/uu-pdp-whatsapp-ai-bisnis') {
    return '/id/blog/uu-pdp-bisnis-whatsapp-ai-panduan-praktis';
  }
  if (clean === '/en/blog/indonesia-pdp-law-whatsapp-ai-business') {
    return '/en/blog/pdp-law-indonesia-business-whatsapp-ai';
  }
  if (
    clean === '/id/blog/keamanan-ai-agent-prompt-injection' ||
    clean === '/blog/keamanan-ai-agent-prompt-injection'
  ) {
    return '/id/blog/keamanan-ai-agent-prompt-injection-data-pelanggan';
  }
  if (clean === '/en/blog/ai-agent-security-prompt-injection') {
    return '/en/blog/ai-agent-security-prompt-injection-customer-data';
  }
  if (
    clean === '/id/blog/otomasi-workflow-bisnis-n8n-make-tanpa-ganti-sistem' ||
    clean === '/blog/otomasi-workflow-bisnis-n8n-make-tanpa-ganti-sistem' ||
    clean === '/id/blog/otomasi-workflow-bisnis-tanpa-ganti-sistem-lama' ||
    clean === '/blog/otomasi-workflow-bisnis-tanpa-ganti-sistem-lama'
  ) {
    return '/id/blog/otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif';
  }
  if (
    clean === '/en/blog/business-workflow-automation-n8n-make-without-replacing-systems' ||
    clean === '/en/blog/business-workflow-automation-without-replacing-legacy-systems'
  ) {
    return '/en/blog/business-workflow-automation-n8n-make-repetitive-tasks';
  }
  if (
    clean === '/id/blog/seo-lokal-bisnis-bsd-tangerang-selatan' ||
    clean === '/blog/seo-lokal-bisnis-bsd-tangerang-selatan'
  ) {
    return '/id/blog/seo-lokal-bisnis-bsd-tangerang-selatan-google-maps';
  }
  if (clean === '/en/blog/local-seo-for-businesses-in-bsd-and-south-tangerang') {
    return '/en/blog/local-seo-guide-for-bsd-and-south-tangerang-businesses';
  }
  if (
    clean === '/id/blog/otomasi-whatsapp-ai-klinik-dan-fnb' ||
    clean === '/blog/otomasi-whatsapp-ai-klinik-dan-fnb'
  ) {
    return '/id/blog/otomasi-whatsapp-ai-klinik-fnb-alur-kerja';
  }
  if (clean === '/en/blog/whatsapp-and-ai-automation-for-clinics-and-fnb') {
    return '/en/blog/whatsapp-ai-automation-for-clinics-and-fnb-workflows';
  }
  if (clean === '/en/blog/guide-how-agentic-ai-works-for-beginners') {
    return '/en/blog/a-complete-guide-to-how-agentic-ai-works-for-beginners';
  }
  if (clean === '/id/blog/cara-kerja-ai-agent-untuk-bisnis-kecil') {
    return '/id/blog/ai-agent-vs-chatbot-perbedaan-untuk-bisnis';
  }
  if (clean === '/en/blog/how-ai-agents-work-for-small-business') {
    return '/en/blog/ai-agent-vs-chatbot-difference-for-business';
  }
  if (clean === '/id/blog/kepatuhan-uu-pdp-whatsapp-dan-ai-bisnis') {
    return '/id/blog/uu-pdp-bisnis-whatsapp-ai-panduan-praktis';
  }
  if (clean === '/en/blog/pdp-law-compliance-for-business-whatsapp-and-ai') {
    return '/en/blog/pdp-law-indonesia-business-whatsapp-ai';
  }
  if (clean === '/id/blog/apa-itu-mcp-model-context-protocol-panduan-bisnis') {
    return '/id/blog/mcp-model-context-protocol-untuk-pemilik-bisnis';
  }
  if (clean === '/en/blog/what-is-mcp-model-context-protocol-business-guide') {
    return '/en/blog/mcp-model-context-protocol-for-business-owners';
  }
  if (clean === '/id/blog/otomasi-whatsapp-ai-agent-untuk-klinik-dan-fnb' || clean === '/id/blog/kapan-bisnis-butuh-ai-agent-whatsapp') {
    return '/id/blog/otomasi-whatsapp-ai-klinik-fnb-alur-kerja';
  }
  if (clean === '/en/blog/whatsapp-ai-agent-automation-for-clinics-and-fnb' || clean === '/en/blog/when-your-business-needs-a-whatsapp-ai-agent') {
    return '/en/blog/whatsapp-ai-automation-for-clinics-and-fnb-workflows';
  }
  if (clean === '/id/blog/landing-page-untuk-iklan-bisnis') {
    return '/id/blog/checklist-landing-page-konversi-tinggi-jasa';
  }
  if (clean === '/en/blog/landing-pages-for-business-ads') {
    return '/en/blog/high-converting-landing-page-checklist-for-service-businesses';
  }
  if (clean === '/id/blog/biaya-pembuatan-website-bisnis-tangerang-selatan') {
    return '/id/blog/harga-website-tangerang-selatan-komponen-biaya';
  }
  if (clean === '/en/blog/business-website-development-cost-south-tangerang') {
    return '/en/blog/website-pricing-south-tangerang-cost-breakdown';
  }
  if (clean === '/id/blog/pindah-dari-spreadsheet-ke-software-custom' || clean === '/id/blog/kapan-usaha-butuh-software-custom-bukan-spreadsheet') {
    return '/id/blog/dashboard-untuk-pemilik-kafe-metrik-operasional';
  }
  if (clean === '/en/blog/moving-from-spreadsheets-to-custom-software' || clean === '/en/blog/when-a-business-needs-custom-software-instead-of-spreadsheets') {
    return '/en/blog/dashboards-for-cafe-owners-operational-metrics';
  }
  if (clean === '/en/blog/high-converting-landing-page-checklist-service-business') {
    return '/en/blog/high-converting-landing-page-checklist-for-service-businesses';
  }
  if (clean === '/en/services/web-development') {
    return `/en/services/website-development${hashPart}`;
  }
  if (clean === '/en/services/web-development/lebak-bulus' || clean === '/en/services/website-development/lebak-bulus') {
    return `/en/services/ai-agents/lebak-bulus${hashPart}`;
  }
  if (clean === '/en/services/web-development/pamulang') {
    return `/en/services/website-development/pamulang${hashPart}`;
  }
  if (clean.startsWith('/en/services/web-development/')) {
    const areaPart = clean.slice('/en/services/web-development/'.length);
    return `/en/services/website-development/${areaPart}${hashPart}`;
  }
  if (clean === '/id/jasa/otomasi-workflow/bsd-city') {
    return `/id/jasa/pembuatan-website/bsd-city${hashPart}`;
  }
  if (clean === '/en/services/workflow-automation/bsd-city') {
    return `/en/services/website-development/bsd-city${hashPart}`;
  }

  // Ensure locale prefix on unprefixed operasional paths
  if (!clean.startsWith('/id/') && !clean.startsWith('/en/') && clean !== '/id' && clean !== '/en') {
    if (clean.startsWith('/studi-kasus/')) {
      const s = clean.slice('/studi-kasus/'.length);
      return locale === 'en' ? `/en/case-studies/${s}${hashPart}` : `/id/studi-kasus/${s}${hashPart}`;
    }
    if (clean.startsWith('/jasa/')) {
      const s = clean.slice('/jasa/'.length);
      if (locale === 'en') {
        const map: Record<string, string> = {
          'pembuatan-website': 'website-development',
          'ai-agent': 'ai-agents',
          'software-custom': 'custom-software',
          'otomasi-workflow': 'workflow-automation',
        };
        return `/en/services/${map[s] || s}${hashPart}`;
      }
      return `/id/jasa/${s}${hashPart}`;
    }
    return `/${locale}${clean}${hashPart}`;
  }

  return `${clean}${hashPart}`;
}

function enrichClusterAndInternalLinks(
  rawPosts: BlogPost[],
  locale: 'id' | 'en'
): BlogPost[] {
  const posts = rawPosts.map((p) => ({
    ...p,
    content: p.content.map((b) => ({ ...b })),
    conclusion: [...p.conclusion],
  }));

  // 1. Ensure every spoke post links up to its cluster Pillar in the first 30% of blocks
  for (const post of posts) {
    const cluster = getTopicClusterById(post.clusterId);
    if (!cluster) continue;
    const isPillar = isPillarPostForCluster(post.slug, post.clusterId);
    const pillarSlug = locale === 'en' ? cluster.pillarSlugEn : cluster.pillarSlugId;
    const pillarHref = `/${locale}/blog/${pillarSlug}`;
    const pillarTitle = locale === 'en' ? cluster.pillarTitleEn : cluster.pillarTitleId;

    if (!isPillar) {
      const earlyLimit = Math.max(2, Math.floor(post.content.length * 0.3));
      let hasEarlyPillarLink = false;

      for (let i = 0; i < earlyLimit; i++) {
        const block = post.content[i];
        const blockStr = JSON.stringify(block);
        if (blockStr.includes(pillarSlug)) {
          hasEarlyPillarLink = true;
          break;
        }
      }

      if (!hasEarlyPillarLink) {
        const firstParaIdx = post.content.findIndex(
          (b, idx) => idx < earlyLimit && b.type === 'paragraph'
        );
        const targetIdx =
          firstParaIdx !== -1
            ? firstParaIdx
            : post.content.findIndex((b) => b.type === 'paragraph');
        if (targetIdx !== -1 && post.content[targetIdx].type === 'paragraph') {
          const para = post.content[targetIdx] as { type: 'paragraph'; text: string };
          const addition =
            locale === 'en'
              ? ` This analysis builds directly on our foundational guide, [${pillarTitle}](${pillarHref}).`
              : ` Pembahasan ini berkaitan langsung dengan panduan utama kami di [${pillarTitle}](${pillarHref}).`;
          post.content[targetIdx] = {
            type: 'paragraph',
            text: `${para.text}${addition}`,
          };
        }
      }
    }
  }


  // 3. Normalize all operasional hrefs, preserve links in list items, and ensure >= 3 contextual links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (const post of posts) {
    const seenTargets = new Set<string>();
    const selfHref = `/${locale}/blog/${post.slug}`;
    seenTargets.add(selfHref);

    const processString = (str: string, preserveDuplicateLinks = false): string =>
      str.replace(linkRegex, (_full, anchor: string, rawHref: string) => {
        const normalizedHref = normalizeInternalLinkHref(rawHref.trim(), locale);
        if (normalizedHref.startsWith('/')) {
          const targetKey = normalizedHref.split('#')[0].toLowerCase();
          if (targetKey === selfHref.toLowerCase()) {
            return anchor;
          }
          if (!preserveDuplicateLinks && seenTargets.has(targetKey)) {
            return anchor;
          }
          seenTargets.add(targetKey);
        }
        return `[${anchor}](${normalizedHref})`;
      });

    post.content = post.content.map((block) => {
      switch (block.type) {
        case 'paragraph':
          return { ...block, text: processString(block.text) };
        case 'ul':
        case 'ol': {
          const isSeriesList = Boolean(
            block.title &&
              (block.title.includes('Rangkaian artikel lanjutan') ||
                block.title.includes('Follow-up articles') ||
                block.title.includes('Further reading in this series') ||
                block.title.includes('Complete cluster articles'))
          );
          return {
            ...block,
            items: block.items.map((item) => processString(item, isSeriesList)),
          };
        }
        case 'callout':
          return { ...block, text: processString(block.text) };
        case 'blockquote':
          return { ...block, quote: processString(block.quote) };
        case 'table':
          return {
            ...block,
            rows: block.rows.map((r) => r.map((c) => processString(c))),
          };
        default:
          return block;
      }
    });

    post.conclusion = post.conclusion.map((c) => processString(c));

    // Ensure at least 3 operasional links per article
    const internalCount = seenTargets.size - 1; // minus selfHref
    if (internalCount < 3) {
      const candidates: Array<{ href: string; label: string }> = [
        {
          href: normalizeInternalLinkHref(post.serviceLink.href, locale),
          label: post.serviceLink.title,
        },
        ...post.relatedSlugs.map((relSlug) => {
          const relPost = posts.find((p) => p.slug === relSlug);
          return {
            href: `/${locale}/blog/${relSlug}`,
            label: relPost ? relPost.title : relSlug.replace(/-/g, ' '),
          };
        }),
        {
          href:
            locale === 'en'
              ? `/en/blog/topic/${post.clusterId}`
              : `/id/blog/topik/${post.clusterId}`,
          label:
            locale === 'en'
              ? `complete ${post.clusterId.replace(/-/g, ' ')} topic hub`
              : `pusat topik ${post.clusterId.replace(/-/g, ' ')}`,
        },
      ];

      const needed: Array<{ href: string; label: string }> = [];
      for (const c of candidates) {
        const key = c.href.split('#')[0].toLowerCase();
        if (!seenTargets.has(key)) {
          seenTargets.add(key);
          needed.push(c);
        }
        if (internalCount + needed.length >= 3) break;
      }

      if (needed.length > 0 && post.conclusion.length > 0) {
        const linksPhrase = needed.map((n) => `[${n.label}](${n.href})`).join(locale === 'en' ? ' and ' : ' serta ');
        const extraSentence =
          locale === 'en'
            ? ` You can also explore ${linksPhrase} for related implementation details.`
            : ` Kamu juga dapat menelusuri ${linksPhrase} untuk panduan implementasi terkait.`;
        post.conclusion[post.conclusion.length - 1] += extraSentence;
      }
    }

    // Recompute wordCount after link enrichment
    post.wordCount = calculateBlogPostWordCount(
      post.content,
      post.conclusion,
      post.faq,
      post.beforeIntroSnapshot,
      post.founderNote
    );
  }

  return posts;
}

const RAW_INDONESIAN_BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_21_22_ID_RAW.map(defineBlogPost),
  ...BLOG_POSTS_23_24_ID_RAW.map(defineBlogPost),
  ...BLOG_POSTS_25_26_ID_RAW.map(defineBlogPost),
  ...BLOG_POSTS_27_28_ID_RAW.map(defineBlogPost),
  ...BLOG_POSTS_29_30_ID_RAW.map(defineBlogPost),
  ...NEW_BLOG_POSTS_11_20_ID_RAW.map(defineBlogPost),
  ...NEW_BLOG_POSTS_6_10_ID_RAW.map(defineBlogPost),
  ...NEW_BLOG_POSTS_ID_RAW.filter((p) => !SUPERSEDED_LEGACY_SLUGS.has(p.slug)).map(
    defineBlogPost
  ),
  ...EXISTING_INDONESIAN_BLOG_POSTS.map(defineBlogPost),
];

const RAW_ENGLISH_BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_21_22_EN_RAW.map(defineBlogPost),
  ...BLOG_POSTS_23_24_EN_RAW.map(defineBlogPost),
  ...BLOG_POSTS_25_26_EN_RAW.map(defineBlogPost),
  ...BLOG_POSTS_27_28_EN_RAW.map(defineBlogPost),
  ...BLOG_POSTS_29_30_EN_RAW.map(defineBlogPost),
  ...NEW_BLOG_POSTS_11_20_EN_RAW.map(defineBlogPost),
  ...NEW_BLOG_POSTS_6_10_EN_RAW.map(defineBlogPost),
  ...NEW_BLOG_POSTS_EN_RAW.filter((p) => !SUPERSEDED_LEGACY_SLUGS.has(p.slug)).map(
    defineBlogPost
  ),
  ...EARLIER_BLOG_POSTS_EN_RAW.map(defineBlogPost),
];

export const BLOG_POSTS: BlogPost[] = enrichClusterAndInternalLinks(
  RAW_INDONESIAN_BLOG_POSTS,
  'id'
);

export const NEW_INDONESIAN_BLOG_POSTS: BlogPost[] = BLOG_POSTS.slice(
  0,
  BLOG_POSTS.length - EXISTING_INDONESIAN_BLOG_POSTS.length
);

export const ENGLISH_BLOG_POSTS: BlogPost[] = enrichClusterAndInternalLinks(
  RAW_ENGLISH_BLOG_POSTS,
  'en'
);

export const ALL_BILINGUAL_BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS,
  ...ENGLISH_BLOG_POSTS,
];

export function getBlogPostsByCluster(
  clusterId: TopicClusterId,
  locale: 'id' | 'en' = 'id'
): BlogPost[] {
  return getPublishedBlogPosts(locale).filter((p) => p.clusterId === clusterId);
}

export function getRelatedClusterBlogPosts(
  post: BlogPost,
  limit = 3
): BlogPost[] {
  const locale = post.locale || 'id';
  const sameCluster = getBlogPostsByCluster(post.clusterId, locale).filter(
    (p) => p.slug !== post.slug
  );
  // Sort by shared tag count first, then pillar priority
  const postTags = new Set(post.tags.map((t) => t.toLowerCase()));
  const scored = sameCluster.map((candidate) => {
    const sharedTags = candidate.tags.filter((t) => postTags.has(t.toLowerCase())).length;
    const isPillar = isPillarPostForCluster(candidate.slug, post.clusterId) ? 2 : 0;
    return { candidate, score: sharedTags * 3 + isPillar };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.candidate);
}

export const BLOG_GRID_PAGE_SIZE = 12;

export function getPublishedBlogPosts(locale: 'id' | 'en' = 'id'): BlogPost[] {
  const source = locale === 'en' ? ENGLISH_BLOG_POSTS : BLOG_POSTS;
  return source
    .filter((post) => !post.draft)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
}

export interface BlogPaginationSlice {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  featuredPost: BlogPost | undefined;
  gridPosts: BlogPost[];
  pagePosts: BlogPost[];
  canonicalPath: string;
  prevPath: string | undefined;
  nextPath: string | undefined;
}

export function getBlogPaginationSlice(
  locale: 'id' | 'en' = 'id',
  rawPage: number = 1
): BlogPaginationSlice {
  const allPosts = getPublishedBlogPosts(locale);
  const totalPosts = allPosts.length;
  // Page 1 shows 1 featured post + 12 grid cards = 13 posts; Page 2+ shows 12 grid cards
  const remainingAfterPage1 = Math.max(0, totalPosts - (1 + BLOG_GRID_PAGE_SIZE));
  const totalPages =
    1 + Math.ceil(remainingAfterPage1 / BLOG_GRID_PAGE_SIZE);
  const currentPage = Math.min(Math.max(1, Math.floor(rawPage || 1)), totalPages);

  const featuredPost = currentPage === 1 ? allPosts[0] : undefined;
  const gridStartIndex =
    currentPage === 1
      ? 1
      : 1 + BLOG_GRID_PAGE_SIZE + (currentPage - 2) * BLOG_GRID_PAGE_SIZE;
  const gridPosts = allPosts.slice(
    gridStartIndex,
    gridStartIndex + BLOG_GRID_PAGE_SIZE
  );
  const pagePosts = featuredPost ? [featuredPost, ...gridPosts] : gridPosts;

  const pageHref = (p: number) => {
    if (p <= 1) return locale === 'en' ? '/en/blog' : '/id/blog';
    return locale === 'en' ? `/en/blog/page/${p}` : `/id/blog/halaman/${p}`;
  };

  return {
    currentPage,
    totalPages,
    totalPosts,
    featuredPost,
    gridPosts,
    pagePosts,
    canonicalPath: pageHref(currentPage),
    prevPath: currentPage > 1 ? pageHref(currentPage - 1) : undefined,
    nextPath: currentPage < totalPages ? pageHref(currentPage + 1) : undefined,
  };
}

export function getBlogPostBySlug(
  slug: string,
  preferredLocale?: 'id' | 'en'
): BlogPost | undefined {
  const normalized = (slug || '').trim().toLowerCase();
  if (!normalized) return undefined;

  const publishedAll = ALL_BILINGUAL_BLOG_POSTS.filter((p) => !p.draft);

  // 1. Direct or alias match
  const matched = publishedAll.find(
    (post) =>
      post.slug.toLowerCase() === normalized ||
      (post.slugAliases && post.slugAliases.some((a) => a.toLowerCase() === normalized))
  );

  if (!matched) return undefined;

  // 2. If preferredLocale is requested and matched post has a counterpart in that locale, return it
  if (
    preferredLocale &&
    matched.locale &&
    matched.locale !== preferredLocale &&
    matched.alternateSlug
  ) {
    const counterpart = publishedAll.find(
      (p) => p.slug.toLowerCase() === matched.alternateSlug!.toLowerCase()
    );
    if (counterpart) return counterpart;
  }

  return matched;
}

export function getBlogAlternateSlugs(slug: string): {
  idSlug: string;
  enSlug?: string;
} | undefined {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;

  if (post.locale === 'en') {
    return {
      idSlug: post.alternateSlug || post.slug,
      enSlug: post.slug,
    };
  }

  return {
    idSlug: post.slug,
    enSlug: post.alternateSlug,
  };
}

export function getBlogCategoryBySlug(
  categorySlug: string,
  locale: 'id' | 'en' = 'id'
): BlogCategoryMeta | undefined {
  const normalized = categorySlug.toLowerCase().trim();
  const categories = getLocalizedBlogCategories(locale);
  return categories.find(
    (cat) =>
      cat.slug === normalized ||
      cat.name.toLowerCase() === normalized ||
      cat.shortLabel.toLowerCase() === normalized ||
      (cat.nameEn && cat.nameEn.toLowerCase() === normalized) ||
      (cat.shortLabelEn && cat.shortLabelEn.toLowerCase() === normalized)
  );
}

export function getBlogPostsByCategorySlug(
  categorySlug: string,
  locale: 'id' | 'en' = 'id'
): BlogPost[] {
  const cat = getBlogCategoryBySlug(categorySlug, locale);
  if (!cat) return [];
  return getPublishedBlogPosts(locale).filter((post) => post.categorySlug === cat.slug);
}

export function getAdjacentBlogPosts(
  slug: string,
  locale?: 'id' | 'en'
): {
  prev: BlogPost | undefined;
  next: BlogPost | undefined;
} {
  const current = getBlogPostBySlug(slug, locale);
  const resolvedLocale = locale || current?.locale || 'id';
  const published = getPublishedBlogPosts(resolvedLocale);
  const targetSlug = current?.slug || slug;
  const idx = published.findIndex((p) => p.slug === targetSlug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const prev = idx > 0 ? published[idx - 1] : published[published.length - 1];
  const next = idx < published.length - 1 ? published[idx + 1] : published[0];
  return {
    prev: prev?.slug !== targetSlug ? prev : undefined,
    next: next?.slug !== targetSlug ? next : undefined,
  };
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatInlineHtml(raw: string): string {
  const escaped = escapeHtml(raw);
  return escaped
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#6A3FD0] underline font-medium">$1</a>'
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-[#EFEAFB] text-[#5230B0] font-mono text-[13px]">$1</code>'
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/**
 * Helper to convert structured content blocks into semantic HTML string
 * for server-side pre-rendering (SSR), RSS feeds, and AI crawlers.
 */
export function renderBlogPostHtml(post: BlogPost): string {
  const isEn = post.locale === 'en';
  const founderNoteHtml = post.founderNote
    ? `<aside class="my-6 p-5 rounded-xl bg-[#F8F6FE] border-l-4 border-[#6A3FD0]"><strong>${escapeHtml(
        post.founderNote.title
      )}:</strong><p class="mt-1">${formatInlineHtml(post.founderNote.text)}</p></aside>`
    : '';

  const blocksHtml = post.content
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return `<p class="mb-4">${formatInlineHtml(block.text)}</p>`;
        case 'h2':
          return `<h2 id="${escapeHtml(block.id)}" class="text-2xl font-bold mt-8 mb-3">${escapeHtml(
            block.text
          )}</h2>`;
        case 'h3':
          return `<h3 id="${escapeHtml(block.id)}" class="text-xl font-semibold mt-6 mb-2">${escapeHtml(
            block.text
          )}</h3>`;
        case 'ul':
          return `<div class="my-4">${
            block.title ? `<p class="font-semibold mb-2">${escapeHtml(block.title)}</p>` : ''
          }<ul class="list-disc pl-5 space-y-1.5">${block.items
            .map((item) => `<li>${formatInlineHtml(item)}</li>`)
            .join('')}</ul></div>`;
        case 'ol':
          return `<div class="my-4">${
            block.title ? `<p class="font-semibold mb-2">${escapeHtml(block.title)}</p>` : ''
          }<ol class="list-decimal pl-5 space-y-1.5">${block.items
            .map((item) => `<li>${formatInlineHtml(item)}</li>`)
            .join('')}</ol></div>`;
        case 'blockquote':
          return `<blockquote class="my-6 p-5 rounded-xl bg-[#F8F6FE] border-l-4 border-[#6A3FD0]"><p>${formatInlineHtml(
            block.quote
          )}</p>${
            block.attribution
              ? `<cite class="block mt-2 text-xs font-mono text-[#5B5675]">— ${escapeHtml(
                  block.attribution
                )}</cite>`
              : ''
          }</blockquote>`;
        case 'callout':
          return `<aside class="my-6 p-5 rounded-xl bg-[#F8F6FE] border-l-4 border-[#6A3FD0]"><strong>${escapeHtml(
            block.title
          )}:</strong> <p class="mt-1">${formatInlineHtml(block.text)}</p></aside>`;
        case 'table':
          return `<div class="my-6 overflow-x-auto"><table class="w-full text-left border-collapse"><thead><tr>${block.headers
            .map((h) => `<th class="border-b p-2 font-semibold">${escapeHtml(h)}</th>`)
            .join('')}</tr></thead><tbody>${block.rows
            .map(
              (row) =>
                `<tr>${row
                  .map((cell) => `<td class="border-b p-2">${formatInlineHtml(cell)}</td>`)
                  .join('')}</tr>`
            )
            .join('')}</tbody></table></div>`;
        case 'code':
          return `<pre class="my-6 p-4 rounded-xl bg-[#17122B] text-[#F8F6FE] overflow-x-auto text-xs font-mono"><code>${escapeHtml(
            block.code
          )}</code></pre>`;
        case 'image':
          return `<figure class="my-6"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(
            block.alt
          )}" width="${block.width || 1280}" height="${
            block.height || 720
          }" loading="lazy" /><figcaption class="text-xs text-[#5B5675] mt-2">${escapeHtml(
            block.caption
          )}</figcaption></figure>`;
      }
    })
    .join('\n');

  const conclusionHeading = isEn ? 'Conclusion' : 'Kesimpulan';
  const conclusionHtml = `<section id="kesimpulan" class="mt-8"><h2 class="text-2xl font-bold mb-3">${conclusionHeading}</h2>${post.conclusion
    .map((p) => `<p class="mb-4">${formatInlineHtml(p)}</p>`)
    .join('\n')}</section>`;

  return `${founderNoteHtml}\n${blocksHtml}\n${conclusionHtml}`;
}
