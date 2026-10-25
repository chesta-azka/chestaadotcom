import {
  BLOG_CATEGORIES,
  getPublishedBlogPosts,
  getAuthorProfile,
} from '../data/blog-posts';
import { getAllServices } from '../data/services';
import { getIndexableServiceAreaPages } from '../data/service-areas';
import { getPublishedProjects } from '../data/projects';
import { getPublishedCaseStudies } from '../data/case-studies';

export const SITE_URL = (
  (typeof process !== 'undefined' && process.env?.SITE_URL) ||
  'https://chestaa.com'
).replace(/\/+$/, '');

export interface SitemapRouteEntry {
  path: string;
  lastmod: string;
  category?: 'pages' | 'services' | 'areas' | 'blog';
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Resolves the accurate last modification date (YYYY-MM-DD) of a source file
 * on disk using Node fs.statSync when running on the server, rather than build time.
 */
export function getFileLastModDate(relativeFilePaths: string[], fallbackDate = '2026-03-20'): string {
  if (typeof window !== 'undefined' || typeof process === 'undefined' || !process.versions?.node) {
    return fallbackDate;
  }

  try {
    // Dynamic require so Vite browser bundle never pulls in node:fs
    const req = Function('return require')();
    const fs = req('fs');
    const path = req('path');
    let latestMtimeMs = 0;

    for (const relPath of relativeFilePaths) {
      const fullPath = path.resolve(process.cwd(), relPath);
      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.mtimeMs > latestMtimeMs) {
          latestMtimeMs = stat.mtimeMs;
        }
      }
    }

    if (latestMtimeMs > 0) {
      return new Date(latestMtimeMs).toISOString().split('T')[0];
    }
  } catch {
    // Fallback to explicit content date
  }

  return fallbackDate;
}

function normalizeIsoDate(dateStr?: string, fallbackFiles?: string[]): string {
  const fileMtimeDate =
    fallbackFiles && fallbackFiles.length > 0
      ? getFileLastModDate(fallbackFiles, '')
      : '';

  if (dateStr) {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      const contentDate = parsed.toISOString().split('T')[0];
      if (fileMtimeDate && fileMtimeDate > contentDate) {
        return fileMtimeDate;
      }
      return contentDate;
    }
  }

  if (fileMtimeDate) {
    return fileMtimeDate;
  }

  return '2026-03-20';
}

export function getSitemapPageRoutes(): SitemapRouteEntry[] {
  const pagesMtime = getFileLastModDate(
    [
      'src/pages/HomePage.tsx',
      'src/pages/AboutPage.tsx',
      'src/pages/WorkflowPage.tsx',
      'src/data/seo-metadata.ts',
    ],
    '2026-03-20'
  );
  const portfolioMtime = getFileLastModDate(
    ['src/data/projects.ts', 'src/pages/PortfolioPage.tsx'],
    '2026-03-20'
  );
  const caseStudiesMtime = getFileLastModDate(
    ['src/data/case-studies.ts', 'src/pages/CaseStudiesPage.tsx'],
    '2026-03-20'
  );

  const mainRoutes: SitemapRouteEntry[] = [
    { path: '/', lastmod: pagesMtime, category: 'pages' },
    { path: '/eng', lastmod: pagesMtime, category: 'pages' },
    { path: '/portfolio', lastmod: portfolioMtime, category: 'pages' },
    { path: '/eng/portfolio', lastmod: portfolioMtime, category: 'pages' },
    { path: '/case-studies', lastmod: caseStudiesMtime, category: 'pages' },
    { path: '/eng/case-studies', lastmod: caseStudiesMtime, category: 'pages' },
    { path: '/about', lastmod: pagesMtime, category: 'pages' },
    { path: '/eng/about', lastmod: pagesMtime, category: 'pages' },
    { path: '/workflow', lastmod: pagesMtime, category: 'pages' },
    { path: '/eng/workflow', lastmod: pagesMtime, category: 'pages' },
  ];

  const projects = getPublishedProjects();
  const projectRoutes: SitemapRouteEntry[] = projects.map((project) => ({
    path: `/portfolio/${project.slug}`,
    lastmod: normalizeIsoDate(project.updatedAt, ['src/data/projects.ts']),
    category: 'pages',
  }));

  const caseStudies = getPublishedCaseStudies();
  const caseStudyRoutes: SitemapRouteEntry[] = caseStudies.map((study) => ({
    path: `/case-studies/${study.slug}`,
    lastmod: normalizeIsoDate(study.updatedAt || study.publishedAt, [
      'src/data/case-studies.ts',
    ]),
    category: 'pages',
  }));

  return [...mainRoutes, ...projectRoutes, ...caseStudyRoutes];
}

export function getSitemapServiceRoutes(): SitemapRouteEntry[] {
  const serviceFileMtime = getFileLastModDate(
    ['src/data/services.ts', 'src/pages/ServiceDetailPage.tsx', 'src/lib/i18n-content.ts'],
    '2026-03-20'
  );
  const services = getAllServices();

  const routes: SitemapRouteEntry[] = [];
  for (const service of services) {
    routes.push({
      path: `/jasa/${service.slug}`,
      lastmod: serviceFileMtime,
      category: 'services',
    });
    routes.push({
      path: `/eng/jasa/${service.slug}`,
      lastmod: serviceFileMtime,
      category: 'services',
    });
  }
  return routes;
}

export function getSitemapAreaRoutes(): SitemapRouteEntry[] {
  const areaPages = getIndexableServiceAreaPages();
  const routes: SitemapRouteEntry[] = [];

  for (const areaPage of areaPages) {
    const lastmod = normalizeIsoDate(areaPage.updatedAt, [
      'src/data/service-areas.ts',
      'src/pages/ServiceAreaPage.tsx',
      'src/lib/i18n-content.ts',
    ]);
    routes.push({
      path: `/jasa/${areaPage.serviceSlug}/${areaPage.areaSlug}`,
      lastmod,
      category: 'areas',
    });
    routes.push({
      path: `/eng/jasa/${areaPage.serviceSlug}/${areaPage.areaSlug}`,
      lastmod,
      category: 'areas',
    });
  }

  return routes;
}

export function getSitemapBlogRoutes(): SitemapRouteEntry[] {
  const blogFileMtime = getFileLastModDate(
    [
      'src/data/blog-posts.ts',
      'src/data/new-blog-posts-id.ts',
      'src/data/new-blog-posts-en.ts',
      'src/pages/BlogHubPage.tsx',
      'src/pages/BlogPostPage.tsx',
    ],
    '2026-03-20'
  );

  const hubRoutes: SitemapRouteEntry[] = [
    { path: '/blog', lastmod: blogFileMtime, category: 'blog' },
    { path: '/eng/blog', lastmod: blogFileMtime, category: 'blog' },
  ];

  const categoryRoutes: SitemapRouteEntry[] = [];
  for (const cat of BLOG_CATEGORIES) {
    categoryRoutes.push({
      path: `/blog/kategori/${cat.slug}`,
      lastmod: blogFileMtime,
      category: 'blog',
    });
    categoryRoutes.push({
      path: `/eng/blog/kategori/${cat.slug}`,
      lastmod: blogFileMtime,
      category: 'blog',
    });
  }

  const idPosts = getPublishedBlogPosts('id');
  const idPostRoutes: SitemapRouteEntry[] = idPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: normalizeIsoDate(post.updatedAt || post.date, [
      'src/data/blog-posts.ts',
      'src/data/new-blog-posts-id.ts',
    ]),
    category: 'blog',
  }));

  const enPosts = getPublishedBlogPosts('en');
  const enPostRoutes: SitemapRouteEntry[] = enPosts.map((post) => ({
    path: `/eng/blog/${post.slug}`,
    lastmod: normalizeIsoDate(post.updatedAt || post.date, [
      'src/data/blog-posts.ts',
      'src/data/new-blog-posts-en.ts',
    ]),
    category: 'blog',
  }));

  return [...hubRoutes, ...categoryRoutes, ...idPostRoutes, ...enPostRoutes];
}

export function getAllSitemapRoutes(): SitemapRouteEntry[] {
  return [
    ...getSitemapPageRoutes(),
    ...getSitemapServiceRoutes(),
    ...getSitemapAreaRoutes(),
    ...getSitemapBlogRoutes(),
  ];
}

function buildUrlsetXml(routes: SitemapRouteEntry[], baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');

  const urlNodes = routes
    .map((route) => {
      const normalizedPath =
        route.path === '/' ? '' : `/${route.path.replace(/^\/+|\/+$/g, '')}`;
      const loc = escapeXml(`${cleanBase}${normalizedPath}`);
      const lastmod = escapeXml(route.lastmod);

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlNodes,
    '</urlset>',
  ].join('\n');
}

function getLatestLastmod(routes: SitemapRouteEntry[]): string {
  let latest = '2026-03-20';
  for (const r of routes) {
    if (r.lastmod > latest) {
      latest = r.lastmod;
    }
  }
  return latest;
}

/**
 * Generates the root Sitemap Index (/sitemap.xml) referencing the 4 sub-sitemaps:
 * - /sitemap-pages.xml
 * - /sitemap-services.xml
 * - /sitemap-areas.xml
 * - /sitemap-blog.xml
 */
export function generateSitemapIndexXml(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const pagesLastmod = getLatestLastmod(getSitemapPageRoutes());
  const servicesLastmod = getLatestLastmod(getSitemapServiceRoutes());
  const areasLastmod = getLatestLastmod(getSitemapAreaRoutes());
  const blogLastmod = getLatestLastmod(getSitemapBlogRoutes());

  const subSitemaps = [
    { loc: `${cleanBase}/sitemap-pages.xml`, lastmod: pagesLastmod },
    { loc: `${cleanBase}/sitemap-services.xml`, lastmod: servicesLastmod },
    { loc: `${cleanBase}/sitemap-areas.xml`, lastmod: areasLastmod },
    { loc: `${cleanBase}/sitemap-blog.xml`, lastmod: blogLastmod },
  ];

  const sitemapNodes = subSitemaps
    .map(
      (item) =>
        [
          '  <sitemap>',
          `    <loc>${escapeXml(item.loc)}</loc>`,
          `    <lastmod>${escapeXml(item.lastmod)}</lastmod>`,
          '  </sitemap>',
        ].join('\n')
    )
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapNodes,
    '</sitemapindex>',
  ].join('\n');
}

export function generateSitemapPagesXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getSitemapPageRoutes(), baseUrl);
}

export function generateSitemapServicesXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getSitemapServiceRoutes(), baseUrl);
}

export function generateSitemapAreasXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getSitemapAreaRoutes(), baseUrl);
}

export function generateSitemapBlogXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getSitemapBlogRoutes(), baseUrl);
}

export function generateSitemapXml(baseUrl: string = SITE_URL): string {
  return generateSitemapIndexXml(baseUrl);
}

export function generateRssXml(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const posts = getPublishedBlogPosts();
  const latestPostDate = getLatestLastmod(getSitemapBlogRoutes());
  const buildDate = new Date(`${latestPostDate}T09:00:00+07:00`).toUTCString();

  const itemsXml = posts
    .map((post) => {
      const link = `${cleanBase}/blog/${post.slug}`;
      const pubDate = new Date(post.updatedAt || post.date).toUTCString();
      const authorProfile = getAuthorProfile(post.author);

      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `      <dc:creator>${escapeXml(authorProfile.name)}</dc:creator>`,
        `      <category>${escapeXml(post.category)}</category>`,
        `      <description>${escapeXml(post.metaDescription || post.excerpt)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Catatan dari Kami — Blog CHESTAADOTCOM</title>',
    `    <link>${escapeXml(`${cleanBase}/blog`)}</link>`,
    `    <atom:link href="${escapeXml(`${cleanBase}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    '    <description>Catatan praktis seputar software custom, AI agent WhatsApp, otomasi alur kerja, dan web untuk bisnis di BSD City, Tangerang Selatan &amp; Jabodetabek.</description>',
    '    <language>id-ID</language>',
    `    <lastBuildDate>${escapeXml(buildDate)}</lastBuildDate>`,
    itemsXml,
    '  </channel>',
    '</rss>',
  ].join('\n');
}

export function generateRobotsTxt(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const allowedBots = [
    '*',
    'Googlebot',
    'Bingbot',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'PerplexityBot',
    'Google-Extended',
  ];

  const blocks = allowedBots.map((bot) =>
    [
      `User-agent: ${bot}`,
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /portal',
      'Disallow: /api/',
    ].join('\n')
  );

  return [
    ...blocks,
    '',
    `Sitemap: ${cleanBase}/sitemap.xml`,
    '',
  ].join('\n\n');
}

export function generateLlmsTxt(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const services = getAllServices();
  const areaPages = getIndexableServiceAreaPages();
  const projects = getPublishedProjects();
  const caseStudies = getPublishedCaseStudies();
  const idPosts = getPublishedBlogPosts('id');
  const enPosts = getPublishedBlogPosts('en');

  const serviceLines = services
    .map(
      (s) =>
        `- [${s.title}](${cleanBase}/jasa/${s.slug}): ${s.summary} (${s.pricingNote.label} · Estimasi ${s.timeline})`
    )
    .join('\n');

  const areaServiceLines = areaPages
    .map(
      (a) =>
        `- [${a.h1}](${cleanBase}/jasa/${a.serviceSlug}/${a.areaSlug}): ${a.quickSummary}`
    )
    .join('\n');

  const projectLines = projects
    .map(
      (proj) =>
        `- [${proj.title}](${cleanBase}/portfolio/${proj.slug}): [${proj.categoryLabel} · ${proj.industry}] ${proj.oneLiner}`
    )
    .join('\n');

  const caseStudyLines = caseStudies
    .map(
      (cs) =>
        `- [${cs.title}](${cleanBase}/case-studies/${cs.slug}): [${cs.industry} · ${cs.services.join(', ')}] Masalah: ${cs.summary.problem} | Solusi: ${cs.summary.solution} | Hasil: ${cs.summary.result}`
    )
    .join('\n');

  const postLines = idPosts
    .map(
      (p) =>
        `- [${p.title}](${cleanBase}/blog/${p.slug}): [${p.category} · ${p.readTime}] ${p.metaDescription}`
    )
    .join('\n');

  const enPostLines = enPosts
    .map(
      (p) =>
        `- [${p.title}](${cleanBase}/eng/blog/${p.slug}): [${p.category} · ${p.readTime}] ${p.metaDescription}`
    )
    .join('\n');

  return [
    '# CHESTAADOTCOM',
    '',
    '> CHESTAADOTCOM (https://chestaa.com) adalah partner rekayasa software custom, pembuatan website/landing page konversi tinggi, dan sistem AI agent (WhatsApp & CRM) yang berbasis di BSD, Tangerang Selatan untuk pemilik bisnis di BSD City, Alam Sutera, Bintaro, Gading Serpong, Tangerang Selatan, dan Jabodetabek.',
    '',
    '## Profil & Pendiri (Co-Founders)',
    '- **Nama Brand**: CHESTAADOTCOM',
    '- **Website Resmi**: https://chestaa.com',
    '- **Basis Operasional**: BSD, Tangerang Selatan (Koordinat: -6.3239, 106.6416)',
    '- **WhatsApp**: +62 821-2544-7232 (https://wa.me/6282125447232)',
    '- **Email**: chestaadotcom@gmail.com',
    '- **Instagram**: https://instagram.com/chestaadotcom (@chestaadotcom)',
    '- **Co-Founders**:',
    '  - **Chesta Azka** — Co-Founder (Arsitektur, Produk, dan Teknologi)',
    '  - **Zeeshan** — Co-Founder (Operasional dan Client Success)',
    '- **Area Layanan Utama**: BSD City, Alam Sutera, Bintaro, Gading Serpong, Tangerang Selatan, dan seluruh Jabodetabek.',
    '- **Target Industri**: Klinik kecantikan & kesehatan, bisnis F&B berkembang, properti & arsitektur, pendidikan & kursus, jasa profesional, dan UMKM/B2B mapan.',
    '- **Catatan Harga Resmi**: Pembuatan Website & Landing Page mulai dari Rp1.200.000; AI Agent, Software Custom, dan Otomasi Workflow dihitung secara transparan berdasarkan ruang lingkup setelah sesi audit/konsultasi gratis.',
    '- **Stack Produksi Terkonfirmasi**: React, Node.js, Python, PostgreSQL, WhatsApp Cloud API, n8n.',
    '',
    '## Daftar Layanan Utama (/jasa/*)',
    serviceLines,
    '',
    '## Halaman Layanan per Area Lokasi (/jasa/[service]/[area])',
    areaServiceLines,
    '',
    '## Daftar Proyek Portofolio (/portfolio)',
    `- [Semua Portofolio CHESTAADOTCOM](${cleanBase}/portfolio): Visual showcase proyek web, AI agent, software custom, dan otomasi workflow.`,
    projectLines,
    '',
    '## Daftar Studi Kasus Mendalam (/case-studies)',
    `- [Semua Studi Kasus CHESTAADOTCOM](${cleanBase}/case-studies): Cerita mendalam masalah operasional, pendekatan arsitektur, dan hasil implementasi proyek.`,
    caseStudyLines,
    '',
    '## Halaman Utama',
    `- [Beranda (ID)](${cleanBase}): Ringkasan layanan, simulasi 5 langkah AI agent, transparansi harga, profil pendiri, dan FAQ pembeli.`,
    `- [Home (EN)](${cleanBase}/eng): Custom software, high-speed websites, and WhatsApp/CRM AI agents for businesses in BSD City & South Tangerang.`,
    `- [Portofolio](${cleanBase}/portfolio): Etalase visual sistem software custom dan AI agent yang sudah kami bangun.`,
    `- [Studi Kasus](${cleanBase}/case-studies): Cerita di balik proyek (masalah, kompromi teknis, dan hasil).`,
    `- [Tentang Kami](${cleanBase}/about): Profil CHESTAADOTCOM, co-founder Chesta Azka & Zeeshan, serta prinsip kerja.`,
    `- [Cara Kerja](${cleanBase}/workflow): Proses kerja 4 tahap dari Audit Gratis, Rancang & Prototipe, Bangun & Uji, hingga Rilis & Rawat.`,
    `- [Catatan dari Kami — Blog (ID)](${cleanBase}/blog): Artikel panduan praktis seputar AI agent vs chatbot, MCP, vibe coding, GEO/AEO, otomasi workflow n8n, dan web bisnis.`,
    `- [Notes from Our Team — Blog (EN)](${cleanBase}/eng/blog): Practical English guides on AI agents vs chatbots, Model Context Protocol (MCP), vibe coding, GEO/AEO, and workflow automation.`,
    `- [RSS Feed Blog](${cleanBase}/rss.xml): Umpan sindikasi XML seluruh artikel CHESTAADOTCOM.`,
    '',
    '## Artikel & Panduan Blog Bahasa Indonesia (/blog)',
    postLines,
    '',
    '## English Blog Articles & Guides (/eng/blog)',
    enPostLines,
    '',
  ].join('\n');
}
