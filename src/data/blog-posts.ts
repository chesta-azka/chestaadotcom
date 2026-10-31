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
    title: 'Berapa Biaya Bikin Website untuk Bisnis? Panduan Harga Jujur',
    seoTitle: 'Biaya Bikin Website Bisnis: Panduan Harga | CHESTAADOTCOM',
    excerpt:
      'Penawaran pembuatan website di pasaran membentang dari Rp300.000 hingga puluhan juta rupiah. Pahami komponen biaya di balik layar agar kamu tidak salah memilih spesifikasi.',
    metaDescription:
      'Panduan jujur rincian biaya bikin website bisnis di Indonesia: beda spesifikasi landing page mulai Rp1.200.000, company profile, hingga aplikasi web custom.',
    category: 'Strategi & Investasi Web',
    categorySlug: 'investasi-web',
    tags: ['Biaya Website', 'Harga Landing Page', 'Web Development', 'Tips Bisnis', 'UMKM & B2B'],
    author: 'zeeshan',
    date: '2026-10-16',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogWebsiteCost',
    cover: SITE_IMAGES.blogWebsiteCost.src,
    coverAlt: SITE_IMAGES.blogWebsiteCost.alt,
    beforeIntroSnapshot:
      'Salah satu pertanyaan paling membingungkan bagi pemilik bisnis saat ingin membuat website adalah lebarnya rentang harga di pasaran. Di satu sisi, kamu mungkin melihat penawaran seharga Rp300.000 yang menjanjikan website instan. Di sisi lain, agensi digital atau software house mengajukan proposal belasan hingga puluhan juta rupiah untuk kebutuhan yang sekilas terdengar mirip.',
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Biaya pembuatan website bisnis di Indonesia secara objektif terbagi ke dalam tiga tingkatan kebutuhan: landing page iklan mulai Rp1.200.000, website company profile multi-halaman untuk katalog Google, serta aplikasi web operasional berbasis database.',
          'Komponen kerja yang menentukan harga bukan jumlah halaman semata, melainkan penyusunan copywriting penawaran, rekayasa mobile tanpa layout bergeser, optimasi kecepatan LCP di bawah 2,5 detik, dan ketiadaan vendor lock-in.',
          'Hindari penawaran instan di bawah Rp500.000 yang menggunakan tema bajakan atau mendaftarkan domain atas nama pribadi vendor, karena biaya perbaikan celah keamanan dan pemulihan reputasi bisnis jauh lebih mahal di kemudian hari.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Saat meminta penawaran pembuatan website bisnis, kamu mungkin menerima dua angka yang terpaut jauh: satu pihak menawarkan paket Rp300.000 selesai besok, sementara pihak lain mengajukan proposal Rp15.000.000 untuk kebutuhan yang sekilas terdengar sama. Tanpa memahami apa yang sebenarnya dikerjakan di balik layar, kamu berisiko membayar terlalu mahal untuk fitur yang belum dibutuhkan, atau justru membeli website murah yang tidak bisa dipakai menerima trafik iklan.',
      },
      {
        type: 'paragraph',
        text: 'Biaya pembuatan website tidak ditentukan oleh "berapa banyak halaman" semata, melainkan oleh empat komponen kerja: penyusunan struktur pesan penawaran (copywriting), kualitas rekayasa tampilan dan kecepatan di ponsel, kelengkapan fondasi SEO teknis, serta ada tidaknya logika sistem atau database di belakangnya.',
      },
      {
        type: 'h2',
        id: 'peta-perbandingan-tiga-kategori-website-bisnis',
        text: '1. Perbandingan Tiga Kategori Website Bisnis Beserta Kisaran Investasinya',
      },
      {
        type: 'paragraph',
        text: 'Biaya pembuatan website di Indonesia terbagi ke dalam tiga tingkatan kebutuhan utama: landing page fokus konversi mulai Rp1.200.000 (3–7 hari kerja), website company profile dan katalog SEO (1–3 minggu), serta aplikasi web custom dan dashboard operasional (2–4 minggu) yang dirancang sesuai alur kerja spesifik.',
      },
      {
        type: 'paragraph',
        text: 'Supaya kamu memiliki patokan objektif sebelum berdiskusi dengan vendor mana pun, tabel di bawah ini memetakan tiga jenis kebutuhan website yang paling sering kami temui beserta cakupan teknisnya.',
      },
      {
        type: 'table',
        caption: 'Perbandingan spesifikasi, target bisnis, dan kisaran biaya pembuatan website bisnis',
        headers: [
          'Kategori Sistem',
          'Peruntukan Utama',
          'Cakupan Pekerjaan Inti',
          'Patokan Investasi & Waktu',
        ],
        rows: [
          [
            '1. Landing Page Fokus Konversi',
            'Kampanye iklan Meta/Google Ads untuk 1 layanan utama (klinik, F&B, properti, jasa)',
            'Struktur copywriting 1 halaman utuh, kecepatan LCP < 2,5 detik, integrasi CTA WhatsApp & Pixel',
            'Mulai Rp1.200.000 (3–7 hari kerja)',
          ],
          [
            '2. Website Company Profile & Katalog SEO',
            'Perusahaan B2B, kontraktor, arsitek, atau bisnis multi-layanan yang mengejar pencarian Google',
            'Multi-halaman (Layanan, Portofolio, Tentang, Blog), JSON-LD Schema, sitemap dinamis, optimasi lokal',
            'Menyesuaikan jumlah halaman & struktur konten (1–3 minggu)',
          ],
          [
            '3. Aplikasi Web Custom & Otomasi AI',
            'Operasional tim, portal klien, sistem booking jadwal dokter, atau dashboard logistik',
            'Database PostgreSQL, hak akses staf (RBAC), API backend, integrasi WhatsApp Cloud API / n8n',
            'Berdasarkan ruang lingkup setelah audit 30 menit (2–4 minggu)',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'Jika kamu baru ingin menguji pasar atau menjalankan iklan untuk mendatangkan prospek WhatsApp, kamu tidak perlu langsung membangun website besar dengan belasan halaman. Memulai dari satu halaman melalui [jasa pembuatan website](/jasa/pembuatan-website) jauh lebih terfokus dan cepat balik modal. Sebaliknya, jika masalah utamamu adalah pencatatan surat jalan dan rekap operasional yang berantakan seperti pada [studi kasus dashboard logistik](/case-studies/sentralisasi-operasional-armada-logistik), maka yang kamu butuhkan adalah [jasa software custom](/jasa/software-custom).',
      },
      {
        type: 'h2',
        id: 'empat-komponen-yang-membedakan-kualitas-website',
        text: '2. Empat Komponen Kerja yang Membedakan Website Produktif dan Brosur Digital Mati',
      },
      {
        type: 'paragraph',
        text: 'Perbedaan harga website bisnis secara substansial ditentukan oleh empat pilar pengerjaan rekayasa: arsitektur pesan penawaran (copywriting), rekayasa antarmuka mobile di viewport sempit 375px, kelengkapan metadata SEO teknis beserta skema JSON-LD, serta kepemilikan penuh atas domain dan kode sumber tanpa vendor lock-in.',
      },
      {
        type: 'paragraph',
        text: 'Mengapa dua website dengan jumlah halaman yang sama bisa memberikan hasil konversi yang sangat berbeda? Berikut adalah empat detail pengerjaan yang sering dipangkas pada paket pembuatan web instan:',
      },
      {
        type: 'ul',
        items: [
          'Penyusunan alur pesan (Copywriting): Apakah pembuat web membantu menyusun kalimat judul, mengatasi keberatan pembeli, dan merapikan daftar paket, atau hanya menyalin-tempel teks mentah dari brosur lama kamu? Tanpa pesan yang jelas, pengunjung yang datang dari iklan berbayar akan segera pergi tanpa menghubungi WhatsApp bisnismu.',
          'Kerapian di layar ponsel 375px: Mayoritas pengunjung di Indonesia membuka website dari ponsel pintar. Tata letak harus dirancang khusus agar ukuran teks nyaman dibaca, tombol CTA tidak bertumpuk dengan navigasi, dan tidak ada elemen yang meluber ke kanan secara horizontal.',
          'Struktur data mesin pencari & AI: Website yang rapi menyertakan skema JSON-LD terverifikasi, pengaturan OpenGraph untuk pratinjau tautan WhatsApp yang profesional, serta peta situs otomatis yang memudahkan perayapan oleh mesin pencari Google dan bot AI.',
          'Kepemilikan akses penuh: Kamu wajib memegang kendali atas domain resmi perusahaan dan kode sumber tanpa dikunci sepihak oleh vendor, sehingga bisnismu bebas berpindah server kapan saja tanpa risiko disandera.',
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Transparansi Harga di CHESTAADOTCOM',
        text: 'Untuk pembuatan website dan landing page, harga kami mulai dari Rp1.200.000. Untuk pengembangan AI agent dan software custom, biaya dihitung secara terbuka berdasarkan ruang lingkup integrasi setelah sesi diskusi dan audit alur 30 menit.',
      },
      {
        type: 'h2',
        id: 'rincian-biaya-tahunan-yang-wajib-ditanyakan-di-awal',
        text: '3. Rincian Biaya Tahunan dan Infrastruktur yang Wajib Ditanyakan di Awal',
      },
      {
        type: 'paragraph',
        text: 'Biaya kepemilikan website tahunan umumnya mencakup perpanjangan domain sekitar Rp200.000–Rp350.000 per tahun, cloud hosting atau hosting statis mulai Rp0–Rp300.000 per bulan tergantung volume trafik, serta pemeliharaan keamanan berkala tanpa ada biaya lisensi proprietary tersembunyi.',
      },
      {
        type: 'paragraph',
        text: 'Salah satu sumber kekecewaan pemilik bisnis adalah munculnya tagihan tahun kedua yang tidak pernah dijelaskan di awal proyek. Sebelum menyetujui penawaran, pastikan kamu menerima rincian tertulis seperti contoh struktur anggaran berikut:',
      },
      {
        type: 'code',
        language: 'yaml',
        filename: 'contoh-rincian-komponen-biaya-web.yaml',
        code: `# Contoh checklist transparansi biaya tahun ke-1 vs tahun ke-2
biaya_awal_pembuatan:
  desain_dan_pengembangan_halaman: "Termasuk (Satu kali bayar sesuai scope)"
  penyusunan_copywriting_dasar: "Termasuk"
  optimasi_kecepatan_dan_seo_teknis: "Termasuk"
  pemasangan_meta_pixel_dan_analytics: "Termasuk"

biaya_rutin_tahunan_atau_infrastruktur:
  perpanjangan_domain_com_atau_id: "Sekitar Rp200.000 - Rp350.000 / tahun (Atas nama bisnis kamu)"
  cloud_hosting_dan_ssl: "Disesuaikan trafik (Pastikan jelas sejak hari pertama)"
  kepemilikan_kode_sumber: "100% milik klien, bebas dipindahkan kapan saja"`,
        caption: 'Format rincian komponen biaya yang sehat agar tidak ada tagihan tersembunyi di tahun kedua.',
      },
      {
        type: 'paragraph',
        text: 'Untuk bisnis dengan skala operasional yang membutuhkan otomasi berkelanjutan atau pemantauan infrastruktur, kamu juga dapat membaca panduan lengkap mengenai [biaya rawat website dan sistem setelah rilis](/blog/biaya-rawat-website-dan-sistem-setelah-rilis) agar alokasi anggaran tahunan perusahaanmu terencana dengan rapi.',
      },
      {
        type: 'h2',
        id: 'tanda-bahaya-penawaran-website-terlalu-murah',
        text: '4. Empat Risiko Nyata di Balik Penawaran Website Terlalu Murah',
      },
      {
        type: 'paragraph',
        text: 'Paket website seharga Rp150.000–Rp300.000 kerap menyembunyikan risiko backdoor malware dari tema atau plugin bajakan, domain didaftarkan atas nama pribadi vendor, server patungan yang tumbang saat iklan aktif, dan ketiadaan garansi responsif di perangkat ponsel.',
      },
      {
        type: 'paragraph',
        text: 'Berhemat itu penting, tetapi memilih jasa pembuatan website seharga Rp150.000–Rp300.000 sering kali menimbulkan biaya perbaikan yang jauh lebih besar beberapa bulan kemudian. Waspadai empat risiko nyata ini:',
      },
      {
        type: 'ol',
        items: [
          'Penggunaan tema atau plugin bajakan (nulled): File bajakan hampir selalu disisipi celah keamanan (backdoor) yang beberapa minggu kemudian berubah menjadi halaman spam atau judi online di bawah nama domain resmi bisnismu.',
          'Domain didaftarkan atas nama pribadi vendor: Saat kamu ingin pindah layanan di tahun kedua, domain bisnismu ditahan atau diminta biaya tebusan tinggi untuk menyerahkan kode EPP otorisasi.',
          'Server patungan yang padat dan lambat: Halaman tampak bisa dibuka saat diuji sendirian, tetapi langsung gagal dimuat (error 502/504) ketika menerima lonjakan klik serentak dari iklan Meta atau TikTok Ads.',
          'Tanpa garansi perbaikan tampilan mobile: Teks meluber ke samping di layar HP dan tombol WhatsApp tertutup elemen lain tanpa ada dukungan perbaikan bug setelah serah terima.',
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Jangan Pernah Serahkan Hak Milik Domain Bisnis Kamu',
        text: 'Nama domain (.com atau .id) adalah identitas hukum dan digital perusahaanmu. Pastikan kamu memiliki akses langsung ke akun registrar domain resmi atau kesepakatan tertulis bahwa domain tersebut adalah aset milik penuh bisnismu.',
      },
      {
        type: 'h2',
        id: 'cara-menghitung-roi-investasi-website-bisnis',
        text: '5. Cara Menghitung ROI dan Menentukan Kapan Waktunya Membuat Website',
      },
      {
        type: 'paragraph',
        text: 'Investasi website landing page mulai Rp1.200.000 umumnya mencapai titik impas (breakeven) ketika berhasil menghasilkan 1 hingga 3 transaksi pelanggan bernilai memadai dalam 3 bulan pertama, menghemat waktu repetitif staf CS, dan menurunkan cost-per-lead iklan Meta atau Google Ads.',
      },
      {
        type: 'paragraph',
        text: 'Banyak pemilik usaha ragu mengalokasikan anggaran karena memandang website sebagai pos pengeluaran habis pakai. Padahal, jika kamu menjalankan bisnis jasa atau produk bernilai transaksi menengah ke atas, perhitungan return on investment (ROI) dapat diproyeksikan dengan formula sederhana.',
      },
      {
        type: 'paragraph',
        text: 'Sebagai contoh skenario: jika kamu mengelola klinik kecantikan dengan margin laba bersih rata-rata Rp400.000 per paket treatment, dan website baru seharga Rp1.200.000 mampu mengonversi 3 pasien tambahan saja setiap bulannya dari pencarian lokal atau iklan berbayar, maka investasi website kamu sudah balik modal dalam waktu satu bulan pertama. Bulan-bulan berikutnya, website tersebut terus bekerja sebagai aset pemasaran mandiri tanpa perlu membayar komisi penjualan tambahan.',
      },
      {
        type: 'table',
        caption: 'Simulasi proyeksi waktu balik modal pembuatan landing page jasa',
        headers: [
          'Jenis Usaha & Nilai Rata-rata Transaksi',
          'Biaya Pembuatan Landing Page',
          'Jumlah Transaksi untuk Impas',
          'Estimasi Waktu Balik Modal',
        ],
        rows: [
          [
            'Klinik Gigi / Estetika (Rp600.000/pasien)',
            'Rp1.200.000 (sekali bayar)',
            '2 pasien baru',
            '1–3 minggu kampanye iklan',
          ],
          [
            'Kontraktor / Desain Interior (Rp25.000.000/proyek)',
            'Rp3.500.000 (katalog + portofolio)',
            '1 proyek deal',
            '1 transaksi pertama',
          ],
          [
            'Katering Acara / F&B Korporat (Rp2.500.000/order)',
            'Rp1.800.000 (menu & form booking)',
            '1 order korporat',
            '2–4 minggu pertama',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'enam-pertanyaan-kunci-sebelum-deal-dengan-vendor',
        text: '6. Enam Pertanyaan Kunci Sebelum Menandatangani Penawaran Vendor',
      },
      {
        type: 'paragraph',
        text: 'Sebelum mentransfer uang muka pembuatan website, ajukan 6 pertanyaan uji ini: kepemilikan akun domain resmi, target skor kecepatan ponsel Core Web Vitals, ketersediaan bantuan copywriting, rincian biaya perpanjangan tahun kedua, hak migrasi kode sumber, dan garansi perbaikan bug pasca-rilis.',
      },
      {
        type: 'paragraph',
        text: 'Untuk memastikan kamu bekerja sama dengan mitra pengembang yang profesional dan jujur, bawalah daftar pertanyaan berikut saat sesi konsultasi awal:',
      },
      {
        type: 'ol',
        items: [
          'Apakah nama domain akan didaftarkan langsung menggunakan email atau akun registrar milik bisnis saya? (Jawaban sehat: Ya, bisnis memegang kendali 100%).',
          'Berapa target skor kecepatan LCP di perangkat ponsel yang kalian garansi? (Jawaban sehat: LCP di bawah 2,5 detik pada koneksi 4G seluler standar).',
          'Apakah tim kalian membantu menyusun copywriting penawaran, atau saya harus menyediakan seluruh teks sendiri? (Jawaban sehat: Tim pengembang membantu menstrukturkan alur pesan dan call-to-action).',
          'Berapa persisnya biaya perpanjangan di tahun kedua, dan komponen apa saja yang dibayar? (Jawaban sehat: Rincian tertulis domain dan hosting tanpa biaya lisensi tersembunyi).',
          'Jika suatu saat saya ingin memindahkan website ke server lain, apakah kode sumber diserahkan secara lengkap? (Jawaban sehat: Ya, kode diserahkan tanpa enkripsi proprietary).',
          'Apakah ada periode garansi perbaikan bug setelah website tayang? (Jawaban sehat: Minimal 14–30 hari perbaikan bug gratis setelah serah terima).',
        ],
      },
      {
        type: 'paragraph',
        text: 'Jika kamu membutuhkan panduan lebih dalam mengenai kriteria pemilihan mitra teknologi di area Banten dan Jabodetabek, baca juga panduan [cara memilih jasa pembuatan website di Tangerang Selatan](/blog/cara-memilih-jasa-pembuatan-website-tangerang-selatan).',
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi-standar-web-dan-investasi',
        text: '7. Sumber Rujukan Resmi Seputar Standar Web dan Investasi Digital',
      },
      {
        type: 'paragraph',
        text: 'Gunakan panduan dan standar dokumentasi resmi berikut untuk memahami tata kelola web dan infrastruktur digital; cek dokumentasi resmi untuk angka dan ketentuan teknis terbaru:',
      },
      {
        type: 'ul',
        items: [
          'Google Search Central Webmaster Guidelines: Dokumentasi resmi Google mengenai praktik terbaik struktur halaman, kecepatan mobile, dan panduan perayapan mesin pencari.',
          'web.dev Core Web Vitals Standard: Dokumentasi resmi Google mengenai ambang batas metrik LCP di bawah 2,5 detik, INP di bawah 200 ms, dan CLS di bawah 0,1.',
          'PANDI (Pengelola Nama Domain Internet Indonesia): Regulasi resmi pendaftaran dan persyaratan hukum kepemilikan nama domain berekstensi .id di Indonesia.',
          'MDN Web Docs Performance Guide: Panduan komprehensif dari Mozilla Foundation tentang optimasi aset gambar modern WebP/AVIF dan pemuatan skrip asinkron.',
        ],
      },
    ],
    conclusion: [
      'Website bisnis yang baik adalah investasi alat kerja yang bertugas meyakinkan calon pelanggan 24 jam sehari, bukan sekadar pengeluaran dekorasi.',
      'Pilihlah kategori website yang paling sesuai dengan target terdekat bisnismu saat ini, pastikan kepemilikan domain dan rincian biaya tahunannya transparan sejak hari pertama, dan utamakan kecepatan serta kejelasan pesan di atas hiasan visual yang tidak perlu.',
    ],
    serviceLink: {
      slug: 'pembuatan-website',
      title: 'Diskusikan Kebutuhan Website & Estimasi Biaya Bisnismu',
      description:
        'Ceritakan target yang ingin kamu capai. Kami bantu rekomendasikan spesifikasi yang paling masuk akal, dengan layanan web mulai dari Rp1.200.000.',
      href: '/jasa/pembuatan-website',
      label: 'Pelajari Jasa Pembuatan Website & Harga',
    },
    faq: [
      {
        question: 'Berapa biaya pembuatan landing page atau website di CHESTAADOTCOM?',
        answer:
          'Pembuatan landing page dan website dimulai dari Rp1.200.000, menyesuaikan jumlah halaman, kedalaman materi, dan kebutuhan integrasi. Sebelum mulai, kamu selalu mendapatkan rincian ruang lingkup kerja tertulis tanpa biaya tersembunyi.',
      },
      {
        question: 'Apakah saya harus menyiapkan seluruh naskah tulisan dan desain sendiri?',
        answer:
          'Tidak perlu. Kamu cukup menceritakan layanan utama, keunggulan bisnismu, dan mengirimkan foto dokumentasi yang tersedia. Tim kami akan menyusun alur kalimat penawaran (copywriting) dan tata letaknya agar siap memikat calon pelanggan.',
      },
      {
        question: 'Berapa lama waktu pengerjaan website sampai siap dipublikasikan?',
        answer:
          'Untuk landing page fokus konversi, pengerjaan berkisar 3 hingga 7 hari kerja sejak materi dasar disepakati. Untuk website multi-halaman atau aplikasi web custom, durasinya berkisar antara 2 hingga 4 minggu.',
      },
      {
        question: 'Apakah saya mendapatkan akses penuh ke website setelah selesai dibuat?',
        answer:
          'Ya. Kami menyerahkan akses pengelolaan secara transparan dan memastikan domain serta aset digital tetap berada di bawah kendali penuh bisnismu tanpa penguncian pihak ketiga.',
      },
      {
        question: 'Apa perbedaan antara landing page satu halaman dan website company profile?',
        answer:
          'Landing page satu halaman difokuskan untuk mengonversi klik iklan berbayar menjadi kontak WhatsApp secara langsung. Website company profile memiliki banyak halaman navigasi untuk menampilkan profil tim, katalog portofolio lengkap, dan artikel edukasi guna memenangkan pencarian organik Google.',
      },
    ],
    relatedSlugs: [
      'biaya-operasional-bulanan-ai-agent-bisnis',
      'cara-memilih-jasa-pembuatan-website-tangerang-selatan',
      'biaya-rawat-website-dan-sistem-setelah-rilis',
    ],
  }),

  // ==========================================================================
  // 3. WHATSAPP & AI AUTOMATION FOR CLINICS & F&B
  // ==========================================================================
  defineBlogPost({
    slug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    alternateSlug: 'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
    title: 'Otomasi WhatsApp & AI untuk Klinik dan F&B: Contoh Alur Kerja Nyata',
    seoTitle: 'Otomasi WhatsApp & AI Klinik dan F&B | CHESTAADOTCOM',
    excerpt:
      'Pesan pasien atau reservasi pelanggan sering masuk pukul 20.30 malam saat admin sudah pulang. Pelajari 5 alur kerja WhatsApp & AI beserta batasan aman serah terima ke manusia.',
    metaDescription:
      'Contoh nyata alur kerja otomasi WhatsApp & AI agent untuk klinik kecantikan, gigi, dan bisnis F&B: balasan instan, cek jadwal dokter, reminder H-1, dan rekap POS.',
    category: 'Otomasi AI & Workflow',
    categorySlug: 'otomasi-ai',
    tags: ['Otomasi WhatsApp', 'AI untuk Bisnis', 'Klinik Kecantikan', 'Bisnis F&B', 'CRM'],
    author: 'zeeshan',
    date: '2026-10-18',
    updatedAt: '2026-10-23',
    featured: false,
    draft: false,
    coverImageKey: 'blogWhatsappAiClinicFnb',
    cover: SITE_IMAGES.blogWhatsappAiClinicFnb.src,
    coverAlt: SITE_IMAGES.blogWhatsappAiClinicFnb.alt,
    beforeIntroSnapshot:
      'Bagi pemilik klinik kecantikan, klinik gigi, maupun bisnis F&B di kawasan ramai seperti BSD City, Bintaro, dan Gading Serpong, WhatsApp adalah jalur urat nadi transaksi harian. Hampir semua calon pasien atau pelanggan memulai interaksi dengan pesan singkat: "Kak, kalau treatment facial ini harganya berapa?", "Hari Sabtu jam 2 siang ada jadwal kosong?", atau "Bisa kirim buku menu untuk acara makan malam 20 orang?".',
    content: [
      {
        type: 'ul',
        title: 'Poin utama',
        items: [
          'Otomasi WhatsApp dan AI agent memotong beban operasional admin klinik dan bisnis F&B hingga 70% melalui penanganan mandiri tanya-jawab harga, pengecekan jadwal dokter, dan pengingat reservasi H-1.',
          'Pemisahan wewenang yang tegas (guardrails) wajib membatasi agent hanya membaca katalog resmi dan melarang keras pemberian diagnosis medis atau estimasi harga di luar sistem.',
          'Kepatuhan Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022) mewajibkan enkripsi data transit, masking nomor kontak pada sistem pelaporan, serta persetujuan eksplisit pelanggan sebelum data dicatat ke database.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Pukul 20.45 malam adalah jam sibuk bagi calon pasien klinik maupun pelanggan restoran untuk mencari informasi di ponsel, tetapi pada jam yang sama staf admin kamu sudah selesai bertugas. Ketika pertanyaan sesederhana "Sabtu sore jam 4 ada slot dokter kosong?" baru dijawab keesokan paginya pukul 09.30, sebagian besar calon pelanggan sudah lebih dulu memesan jadwal di tempat lain.',
      },
      {
        type: 'paragraph',
        text: 'Menambah shift admin malam khusus untuk menunggu chat sering kali tidak efisien secara biaya operasional. Sebaliknya, memasang pesan balasan otomatis kaku seperti "Ketik 1 untuk harga, Ketik 2 untuk alamat" justru membuat pelanggan malas melanjutkan percakapan. Solusi yang bekerja nyata di lapangan adalah memadukan [jasa AI agent](/id/jasa/ai-agent) untuk menangani pengecekan informasi rutin dan menyerahkan kasus sensitif ke staf manusia.',
      },
      {
        type: 'h2',
        id: 'lima-alur-kerja-otomasi-klinik-dan-fnb',
        text: '1. Lima Alur Kerja (Workflow) Otomasi yang Langsung Memangkas Beban Admin',
      },
      {
        type: 'paragraph',
        text: 'Lima alur kerja otomasi WhatsApp paling bernilai tinggi mencakup penanganan FAQ katalog 24/7, pengecekan ketersediaan jadwal dokter atau meja real-time, pengiriman pengingat H-1 dan H-3 jam untuk menekan no-show, kualifikasi pesanan grup F&B, serta rekapitulasi laporan omzet kasir harian.',
      },
      {
        type: 'paragraph',
        text: 'Alih-alih merombak seluruh tata kelola operasional staf sekaligus, kamu bisa menerapkan otomasi secara bertahap pada lima titik sentral yang paling sering menguras waktu tim admin setiap hari:',
      },
      {
        type: 'ol',
        title: 'Rincian lima alur kerja otomasi prioritas:',
        items: [
          'Tanya-jawab layanan dan harga berbasis basis data resmi: AI membaca daftar perawatan klinik atau menu paket grup restoran, lalu membalas pertanyaan harga, durasi tindakan, dan ketersediaan parkir dalam waktu kurang dari 5 detik dengan sapaan sopan.',
          'Pengecekan slot jadwal dan pencatatan reservasi: Saat pasien ingin menjadwalkan kedatangan, agent mengecek tabel ketersediaan kursi atau dokter secara langsung dan mengunci slot sementara tanpa risiko bentrok jadwal ganda.',
          'Pengingat otomatis (H-1 dan H-3 jam) untuk memangkas angka batal hadir (no-show): Sistem mengirimkan pesan konfirmasi ramah ke WhatsApp pasien lengkap dengan tombol konfirmasi hadir, ubah jadwal, atau batalkan janji.',
          'Penyaringan pesanan katering dan reservasi grup kantor: Untuk bisnis F&B, agent menanyakan tanggal acara, jumlah porsi, preferensi menu, dan anggaran per orang sebelum meneruskan ringkasannya ke tim sales manajer.',
          'Rekonsiliasi laporan harian otomatis ke nomor WhatsApp pemilik bisnis: Melalui [jasa otomasi workflow](/id/jasa/otomasi-workflow), data kasir cabang disinkronkan setiap jam tutup toko dan dikirim sebagai ringkasan laba kotor serta penjualan item terlaris ke ponsel owner.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Kamu bisa mempelajari bagaimana alur reservasi klinik bekerja secara mendalam pada [studi kasus otomasi reservasi klinik estetika](/id/case-studies/otomasi-reservasi-klinik-estetika), serta bagaimana alur penarikan laporan kasir malam hari diimplementasikan pada [studi kasus sinkronisasi rekap POS F&B multi-cabang](/id/case-studies/sinkronisasi-rekap-pos-fnb-multi-cabang).',
      },
      {
        type: 'h2',
        id: 'aturan-batas-tugas-ai-vs-staf-manusia',
        text: '2. Matriks Pembagian Tugas: Apa yang Dijawab AI vs Staf Manusia (Human-in-the-Loop)',
      },
      {
        type: 'paragraph',
        text: 'Prinsip Human-in-the-Loop memastikan AI agent hanya mengeksekusi instruksi administratif deterministik, sementara segala bentuk keluhan emosional, pertanyaan diagnosis medis klinis, dan komplain pesanan langsung dialihkan ke staf manusia.',
      },
      {
        type: 'paragraph',
        text: 'Kesalahan paling fatal saat mengintegrasikan kecerdasan buatan pada saluran WhatsApp bisnis adalah membiarkan sistem menjawab tanpa batasan wewenang (guardrails). Di klinik kesehatan maupun restoran, ada garis pemisah tegas antara informasi administratif dan keputusan yang wajib dievaluasi manusia:',
      },
      {
        type: 'table',
        caption: 'Matriks pembagian wewenang antara AI Agent dan staf manusia pada alur komunikasi klinik & F&B',
        headers: [
          'Jenis Skenario Pesan Masuk',
          'Penanggung Jawab Sistem',
          'Tindakan Protokol yang Benar',
        ],
        rows: [
          [
            'Tanya daftar harga tindakan, menu paket, jam operasional, & lokasi parkir',
            'AI Agent (Respons 24/7)',
            'Menjawab langsung dari basis data katalog resmi tanpa mengarang angka atau diskon fiktif',
          ],
          [
            'Cek jadwal dokter gigi/estetika kosong & kunci slot reservasi awal',
            'AI Agent + Database Kalender',
            'Mengecek slot real-time di database kalender & mencatat nomor kontak pasien ke draft booking',
          ],
          [
            'Pasien mengirim foto keluhan kulit/jerawat & meminta resep obat keras',
            'Wajib Dokter / Tim Medis',
            'AI menolak memberi diagnosis medis klinis & langsung mengalihkan sesi obrolan ke dokter jaga',
          ],
          [
            'Pelanggan komplain makanan basi, pengiriman terlambat, atau minta ganti rugi',
            'Wajib Manajer / Admin Senior',
            'AI menandai status prioritas tinggi, menonaktifkan balasan bot otomatis, & memberi tahu manajer',
          ],
          [
            'Negosiasi kontrak katering kantor di atas 50 porsi atau sewa ruang VIP',
            'Tim Sales Manusia',
            'AI merangkum tanggal, jumlah pax, dan nomor kontak, lalu menyerahkan ruang chat ke staf sales',
          ],
          [
            'Permintaan pembatalan jadwal atau pengembalian dana deposit',
            'Admin Kasir Manusia',
            'AI mencatat alasan pembatalan dan memverifikasi nomor rekening pengembalian sesuai SOP',
          ],
        ],
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Guardrail Wajib untuk Klinik Estetika & Gigi',
        text: 'AI agent di klinik dilarang keras memberikan saran medis klinis atau menjanjikan kesembuhan 100%. Sistem harus selalu menyertakan kalimat penegasan bahwa konsultasi tatap muka dengan dokter spesialis berizin wajib dilakukan sebelum tindakan medis diputuskan.',
      },
      {
        type: 'h2',
        id: 'contoh-payload-webhook-dan-handover-ke-admin',
        text: '3. Contoh Struktur Konfigurasi Aturan, Webhook, dan Serah Terima (Handover)',
      },
      {
        type: 'paragraph',
        text: 'Arsitektur serah terima (handover) menggunakan skema webhook JSON terstruktur yang mengirimkan ringkasan konteks percakapan, alasan eskalasi, dan data kontak pasien ke dasbor admin tanpa mengharuskan staf membaca ulang ratusan baris riwayat chat.',
      },
      {
        type: 'paragraph',
        text: 'Agar staf admin resepsionis tidak bingung saat mengambil alih percakapan dari AI agent, sistem backend wajib membekukan sementara token bot pada ID sesi tersebut dan mengirimkan payload notifikasi operasional seperti contoh konfigurasi berikut:',
      },
      {
        type: 'code',
        language: 'json',
        filename: 'whatsapp-agent-routing-rule.json',
        code: `{
  "channel": "whatsapp_cloud_api",
  "knowledge_source": "postgres_verified_catalog_only",
  "strict_guardrails": {
    "forbid_medical_diagnosis": true,
    "forbid_unlisted_price_estimation": true,
    "human_handover_triggers": [
      "keluhan_medis_spesifik",
      "komplain_layanan",
      "permintaan_bicara_dengan_admin",
      "pesanan_korporat_di_atas_50_pax"
    ]
  },
  "session_governance": {
    "bot_silence_on_handover_minutes": 120,
    "idempotency_cache_ttl_seconds": 60,
    "escalation_webhook_url": "https://api.namabisniskamu.com/webhooks/handover"
  },
  "handover_notification_payload": {
    "target_channel": "telegram_admin_or_slack",
    "summary_template": "Pasien {{nama}} butuh bantuan dokter untuk {{layanan}} pada {{jadwal}}. Alasan eskalasi: {{alasan_handover}}."
  }
}`,
        caption: 'Contoh konfigurasi aturan batas wewenang AI agent WhatsApp dan payload webhook serah terima ke tim manusia.',
      },
      {
        type: 'h2',
        id: 'arsitektur-integrasi-database-kecepatan-respon',
        text: '4. Arsitektur Integrasi: Menghubungkan WhatsApp ke Google Sheets vs Database SQL',
      },
      {
        type: 'paragraph',
        text: 'Integrasi WhatsApp Cloud API membutuhkan pemrosesan webhook asinkron dengan waktu respon di bawah 3 detik untuk menghindari batas waktu habis (timeout) dari server Meta dan pengiriman pesan duplikat ke pelanggan.',
      },
      {
        type: 'paragraph',
        text: 'Banyak bisnis memulai integrasi menggunakan platform visual no-code yang terhubung ke Google Sheets. Meskipun mudah dibuat di minggu pertama, Google Sheets memiliki batas laju panggilan (API rate limits) dan keterlambatan pembacaan data hingga beberapa detik saat banyak pesan masuk bersamaan. Jika dua pasien memilih slot dokter yang sama pada detik yang berdekatan, Google Sheets rentan memicu insiden jadwal ganda (double-booking).',
      },
      {
        type: 'paragraph',
        text: 'Untuk bisnis dengan volume pesan di atas 50 chat per hari, arsitektur terbaik adalah menggunakan database PostgreSQL atau SQLite lokal yang dikelola melalui backend server cepat (seperti Node.js atau Next.js API Routes). Data transaksi dikunci dengan mekanisme database transaction (ACID) sehingga slot jadwal yang sudah dipilih otomatis terkunci seketika.',
      },
      {
        type: 'h2',
        id: 'kepatuhan-uu-pdp-dan-keamanan-data-pasien',
        text: '5. Kepatuhan UU PDP dan Tata Kelola Keamanan Data Pelanggan pada Saluran Chat',
      },
      {
        type: 'paragraph',
        text: 'Penerapan Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27/2022) mewajibkan perlindungan ketat terhadap data identitas pasien dan pelanggan, termasuk enkripsi pesan, pembatasan hak akses staf berbasis peran, dan penghapusan data otomatis.',
      },
      {
        type: 'paragraph',
        text: 'Klinik kesehatan dan tempat usaha dilarang keras menyimpan riwayat rekam medis sensitif atau nomor kartu identitas di dalam basis data prompt yang tidak terenkripsi. Berikut adalah tiga pilar kepatuhan wajib yang kami terapkan pada seluruh sistem otomasi:',
      },
      {
        type: 'ul',
        items: [
          'Enkripsi data bergerak dan data diam: Seluruh token otentikasi WhatsApp Cloud API dan data pelanggan dienkripsi dengan standar AES-256 pada database penyimpanan.',
          'Penyensoran data sensitif (Masking) pada log sistem: Nomor telepon pelanggan dan catatan medis disamarkan pada tampilan log teknis pengembang untuk mencegah kebocoran informasi oleh pihak ketiga.',
          'Mekanisme persetujuan pemrosesan data (Consent Notice): Saat pelanggan baru pertama kali memulai obrolan, sistem menyertakan klausul ringkas bahwa data nama dan nomor kontak hanya diproses untuk keperluan konfirmasi reservasi.',
        ],
      },
      {
        type: 'h2',
        id: 'empat-langkah-memulai-tanpa-mengganggu-operasional',
        text: '6. Empat Langkah Memulai Otomasi Bertahap Tanpa Mengganggu Operasional Harian',
      },
      {
        type: 'paragraph',
        text: 'Peluncuran otomasi WhatsApp yang aman dilakukan secara bertahap melalui audit riwayat pesan, standarisasi katalog harga, pengujian operasional mode bayangan (shadow mode), serta peluncuran resmi dengan pendampingan staf.',
      },
      {
        type: 'paragraph',
        text: 'Kamu tidak perlu menghentikan pelayanan WhatsApp yang sedang berjalan untuk memasang sistem ini. Terapkan urutan empat langkah berikut agar transisi berjalan mulus bagi admin maupun pelanggan bisnismu:',
      },
      {
        type: 'ol',
        title: 'Empat tahap implementasi bertahap di lapangan:',
        items: [
          'Kumpulkan 30 pertanyaan paling berulang dari riwayat chat WhatsApp sebulan terakhir beserta jawaban paling rapi dari admin terbaikmu.',
          'Rapikan satu dokumen spreadsheet atau tabel database berisi daftar layanan, harga resmi, durasi pengerjaan, dan aturan pembatalan sebagai satu-satunya sumber kebenaran.',
          'Uji coba agent di nomor WhatsApp cadangan tim selama 3 hingga 5 hari dengan berbagai skenario pertanyaan menjebak dan komplain untuk memverifikasi disiplin batas tugas.',
          'Aktifkan di nomor resmi utama dengan mode pendampingan staf, di mana admin tetap memantau ruang obrolan dan dapat mengambil alih percakapan kapan pun diperlukan.',
        ],
      },
      {
        type: 'h2',
        id: 'sumber-rujukan-resmi',
        text: 'Sumber rujukan resmi',
      },
      {
        type: 'paragraph',
        text: 'Dokumentasi teknis dan standar industri berikut menjadi rujukan resmi dalam perancangan arsitektur otomasi WhatsApp Business API dan tata kelola data pelanggan; cek dokumentasi resmi masing-masing penyedia untuk angka kuota, harga pesan template, dan regulasi terbaru:',
      },
      {
        type: 'ul',
        items: [
          '[Meta for Developers: WhatsApp Business Cloud API Documentation](https://developers.facebook.com/docs/whatsapp/cloud-api) merinci panduan setup webhook, spesifikasi pengiriman template pesan utilitas, dan batas kuota pesan per detik.',
          '[Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi di JDIH BPK RI](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) mengatur kewajiban pengendali data dalam menjaga kerahasiaan identitas kontak dan rekam transaksi konsumen di Indonesia.',
          '[OWASP API Security Top 10 Standards](https://owasp.org/www-project-api-security/) menjadi standar acuan keamanan dalam validasi payload webhook dan pencegahan manipulasi parameter akses data.',
        ],
      },
    ],
    conclusion: [
      'Otomasi WhatsApp dan AI agent bukan bertujuan menggantikan keramahan komunikasi staf manusia di klinik atau restoranmu, melainkan mengambil alih pekerjaan ketik administratif berulang agar timmu fokus memberikan pelayanan terbaik bagi pelanggan yang hadir langsung di lokasi.',
      'Dengan pembagian tugas yang terukur antara AI dan staf manusia, bisnis kamu tetap responsif membalas calon pembeli dalam hitungan detik di malam hari tanpa melanggar prinsip kehati-hatian data.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Rancang AI Agent WhatsApp & Otomasi Jadwal untuk Bisnismu',
      description:
        'Kami membangun AI agent dengan batasan SOP yang ketat, terhubung ke kalender dan database bisnismu. Jadwalkan audit alur 30 menit gratis.',
      href: '/id/jasa/ai-agent',
      label: 'Lihat Jasa AI Agent & Otomasi',
    },
    faq: [
      {
        question: 'Apakah balasan AI di WhatsApp akan terasa kaku seperti mesin penjawab otomatis?',
        answer:
          'Tidak. Sistem menggunakan gaya sapaan Bahasa Indonesia yang sopan dan natural sesuai kebiasaan brand kamu, namun tetap dibatasi secara ketat agar hanya mengambil fakta harga dan jadwal dari database resmi bisnismu.',
      },
      {
        question: 'Apakah admin manusia tetap bisa membalas chat dari nomor WhatsApp yang sama?',
        answer:
          'Bisa setiap saat. Begitu staf admin mengetik pesan di ruang obrolan atau ketika sistem mendeteksi pemicu eskalasi, bot otomatis membisu sementara di nomor tersebut agar admin manusia dapat berkomunikasi langsung.',
      },
      {
        question: 'Berapa biaya pembuatan sistem AI agent WhatsApp di CHESTAADOTCOM?',
        answer:
          'Karena setiap klinik atau bisnis F&B memiliki jumlah cabang dan alur jadwal yang berbeda, biaya pembuatan AI agent dihitung secara transparan berdasarkan ruang lingkup integrasi setelah sesi audit alur 30 menit gratis.',
      },
      {
        question: 'Apakah sistem ini bisa dihubungkan ke Google Sheets atau Google Calendar yang sudah dipakai admin?',
        answer:
          'Bisa. Untuk bisnis yang belum ingin beralih ke database relasional, agent dapat membaca ketersediaan slot langsung dari Google Calendar dan mencatat daftar prospek baru ke Google Sheets stafmu.',
      },
      {
        question: 'Bagaimana cara mencegah WhatsApp bisnis terkena blokir saat mengirim pesan pengingat jadwal?',
        answer:
          'Pencegahan blokir dilakukan dengan menggunakan WhatsApp Business API resmi dari Meta, bukan aplikasi modifikasi pihak ketiga yang tidak berizin, serta hanya mengirim pesan pengingat terjadwal memakai Template Pesan Kategori Utilitas (Utility) yang disetujui Meta.',
      },
    ],
    relatedSlugs: [
      'webhook-dan-api-otomasi-antar-aplikasi-bisnis',
      'otomasi-invoice-dan-penagihan-jasa-profesional',
      'dashboard-untuk-pemilik-kafe-metrik-operasional',
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
  if (clean === '/id/blog/otomasi-whatsapp-ai-agent-untuk-klinik-dan-fnb') {
    return '/id/blog/otomasi-whatsapp-ai-klinik-fnb-alur-kerja';
  }
  if (clean === '/en/blog/whatsapp-ai-agent-automation-for-clinics-and-fnb') {
    return '/en/blog/whatsapp-ai-automation-for-clinics-and-fnb-workflows';
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
