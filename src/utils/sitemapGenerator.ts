import {
  getPublishedBlogPosts,
  getBlogPostsByCluster,
  getAuthorProfile,
  getBlogPaginationSlice,
} from '../data/blog-posts';
import { TOPIC_CLUSTERS } from '../data/clusters';
import {
  getAllServices,
  getServicePath,
  getServiceAreaPath,
} from '../data/services';
import {
  getIndexableServiceAreaPages,
  getIndexableAreas,
} from '../data/service-areas';
import { getPublishedProjects } from '../data/projects';
import { getPublishedCaseStudies } from '../data/case-studies';
import { getHreflangAlternates } from '../lib/i18n';

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
export function getFileLastModDate(
  relativeFilePaths: string[],
  fallbackDate = '2026-03-20'
): string {
  if (
    typeof window !== 'undefined' ||
    typeof process === 'undefined' ||
    !process.versions?.node
  ) {
    return fallbackDate;
  }

  try {
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
    { path: '/id', lastmod: pagesMtime, category: 'pages' },
    { path: '/en', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/portfolio', lastmod: portfolioMtime, category: 'pages' },
    { path: '/en/portfolio', lastmod: portfolioMtime, category: 'pages' },
    { path: '/id/studi-kasus', lastmod: caseStudiesMtime, category: 'pages' },
    { path: '/en/case-studies', lastmod: caseStudiesMtime, category: 'pages' },
    { path: '/id/audit-gratis', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/free-audit', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/tentang', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/about', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/harga', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/pricing', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/cara-kerja', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/how-it-works', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/faq', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/faq', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/privasi', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/privacy', lastmod: pagesMtime, category: 'pages' },
    { path: '/id/workflow', lastmod: pagesMtime, category: 'pages' },
    { path: '/en/workflow', lastmod: pagesMtime, category: 'pages' },
  ];

  const projects = getPublishedProjects('id');
  const projectRoutes: SitemapRouteEntry[] = [];
  for (const project of projects) {
    const lastmod = normalizeIsoDate(project.updatedAt, [
      'src/data/projects.ts',
      'src/data/projects.en.ts',
    ]);
    projectRoutes.push({
      path: `/id/portfolio/${project.slug}`,
      lastmod,
      category: 'pages',
    });
    projectRoutes.push({
      path: `/en/portfolio/${project.slug}`,
      lastmod,
      category: 'pages',
    });
  }

  const caseStudies = getPublishedCaseStudies('id');
  const caseStudyRoutes: SitemapRouteEntry[] = [];
  for (const study of caseStudies) {
    const lastmod = normalizeIsoDate(study.updatedAt || study.publishedAt, [
      'src/data/case-studies.ts',
      'src/data/case-studies.en.ts',
    ]);
    caseStudyRoutes.push({
      path: `/id/studi-kasus/${study.slug}`,
      lastmod,
      category: 'pages',
    });
    caseStudyRoutes.push({
      path: `/en/case-studies/${study.slug}`,
      lastmod,
      category: 'pages',
    });
  }

  return [...mainRoutes, ...projectRoutes, ...caseStudyRoutes];
}

export function getSitemapServiceRoutes(): SitemapRouteEntry[] {
  const serviceFileMtime = getFileLastModDate(
    ['src/data/services.ts', 'src/pages/ServiceDetailPage.tsx'],
    '2026-03-20'
  );
  const services = getAllServices('id');

  const routes: SitemapRouteEntry[] = [];
  for (const service of services) {
    routes.push({
      path: getServicePath(service.slug, 'id'),
      lastmod: serviceFileMtime,
      category: 'services',
    });
    routes.push({
      path: getServicePath(service.slug, 'en'),
      lastmod: serviceFileMtime,
      category: 'services',
    });
  }
  return routes;
}

export function getSitemapAreaRoutes(): SitemapRouteEntry[] {
  const areaPages = getIndexableServiceAreaPages('id');
  const hubLastmod = getFileLastModDate(
    ['src/data/areas.ts', 'src/data/areas.en.ts', 'src/pages/AreasHubPage.tsx'],
    '2026-03-20'
  );

  const routes: SitemapRouteEntry[] = [
    { path: '/id/area', lastmod: hubLastmod, category: 'areas' },
    { path: '/en/areas', lastmod: hubLastmod, category: 'areas' },
  ];

  for (const areaPage of areaPages) {
    if (!areaPage.indexable) continue;
    const lastmod = normalizeIsoDate(areaPage.updatedAt, [
      'src/data/areas.ts',
      'src/data/areas.en.ts',
      'src/pages/ServiceAreaPage.tsx',
    ]);
    routes.push({
      path: getServiceAreaPath(areaPage.serviceSlug, areaPage.areaSlug, 'id'),
      lastmod,
      category: 'areas',
    });
    routes.push({
      path: getServiceAreaPath(areaPage.serviceSlug, areaPage.areaSlug, 'en'),
      lastmod,
      category: 'areas',
    });
  }

  return routes;
}

export function getSitemapBlogRoutes(): SitemapRouteEntry[] {
  const idPosts = getPublishedBlogPosts('id');
  const latestBlogDate = idPosts.reduce(
    (max, p) => (p.updatedAt > max ? p.updatedAt : max),
    '2026-10-23'
  );

  // Only page 1 of the blog index (/id/blog and /en/blog) is included in sitemap.xml
  const hubRoutes: SitemapRouteEntry[] = [
    { path: '/id/blog', lastmod: latestBlogDate, category: 'blog' },
    { path: '/en/blog', lastmod: latestBlogDate, category: 'blog' },
  ];

  const clusterRoutes: SitemapRouteEntry[] = [];
  for (const cluster of TOPIC_CLUSTERS) {
    const clusterPosts = getBlogPostsByCluster(cluster.id, 'id');
    const latestClusterDate = clusterPosts.reduce(
      (max, p) => (p.updatedAt > max ? p.updatedAt : max),
      '2026-10-23'
    );
    clusterRoutes.push({
      path: `/id/blog/topik/${cluster.id}`,
      lastmod: latestClusterDate,
      category: 'blog',
    });
    clusterRoutes.push({
      path: `/en/blog/topic/${cluster.id}`,
      lastmod: latestClusterDate,
      category: 'blog',
    });
  }

  // Sitemap lastmod for blog posts comes strictly from post.updatedAt
  const idPostRoutes: SitemapRouteEntry[] = idPosts.map((post) => ({
    path: `/id/blog/${post.slug}`,
    lastmod: post.updatedAt,
    category: 'blog',
  }));

  const enPosts = getPublishedBlogPosts('en');
  const enPostRoutes: SitemapRouteEntry[] = enPosts.map((post) => ({
    path: `/en/blog/${post.slug}`,
    lastmod: post.updatedAt,
    category: 'blog',
  }));

  return [
    ...hubRoutes,
    ...clusterRoutes,
    ...idPostRoutes,
    ...enPostRoutes,
  ];
}

export function getAllSitemapRoutes(): SitemapRouteEntry[] {
  return [
    ...getSitemapPageRoutes(),
    ...getSitemapServiceRoutes(),
    ...getSitemapAreaRoutes(),
    ...getSitemapBlogRoutes(),
  ];
}

export function isKnownRoute(pathname: string): boolean {
  if (!pathname) return false;
  const clean = (pathname.split('?')[0].split('#')[0] || '/').replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/id' || clean === '/en') return true;
  if (
    clean === '/sitemap.xml' ||
    clean === '/robots.txt' ||
    clean === '/llms.txt' ||
    clean === '/llms-full.txt' ||
    clean === '/rss.xml'
  ) {
    return true;
  }
  if (
    clean.startsWith('/admin') ||
    clean.startsWith('/portal') ||
    clean.startsWith('/workspace/') ||
    clean.startsWith('/client/') ||
    clean.startsWith('/dev/')
  ) {
    return true;
  }
  if (
    clean === '/id/tentang' ||
    clean === '/en/about' ||
    clean === '/id/about' ||
    clean === '/id/audit-gratis' ||
    clean === '/en/free-audit' ||
    clean === '/id/privasi' ||
    clean === '/en/privacy'
  ) {
    return true;
  }

  // Paginated blog index routes (/id/blog/halaman/:n and /en/blog/page/:n)
  const paginatedMatch = clean.match(/^\/(id|en)\/blog\/(halaman|page)\/(\d+)$/i);
  if (paginatedMatch) {
    const loc = paginatedMatch[1].toLowerCase() === 'en' ? 'en' : 'id';
    const pageNum = parseInt(paginatedMatch[3], 10);
    const { totalPages } = getBlogPaginationSlice(loc, 1);
    return pageNum >= 1 && pageNum <= totalPages;
  }

  const allRoutes = getAllSitemapRoutes();
  return allRoutes.some(
    (r) => r.path === clean || r.path === `/${clean.replace(/^\/+/, '')}`
  );
}

function buildUrlsetXml(routes: SitemapRouteEntry[], baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');

  const urlNodes = routes
    .map((route) => {
      const normalizedPath =
        route.path === '/' ? '/id' : `/${route.path.replace(/^\/+|\/+$/g, '')}`;
      const loc = escapeXml(`${cleanBase}${normalizedPath}`);
      const lastmod = escapeXml(route.lastmod);
      const alternates = getHreflangAlternates(normalizedPath, cleanBase);

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <xhtml:link rel="alternate" hreflang="id" href="${escapeXml(alternates.idUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(alternates.enUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alternates.xDefaultUrl)}" />`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
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

/**
 * Generates /sitemap.xml with all indexable /id and /en service pages,
 * the 10 indexable area pages in both languages (20 URLs), /id/area + /en/areas,
 * and core/portfolio/blog pages with xhtml:link rel="alternate" hreflang entries and real lastmod.
 */
export function generateSitemapXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getAllSitemapRoutes(), baseUrl);
}

export function generateRssXml(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const posts = getPublishedBlogPosts();
  const caseStudies = getPublishedCaseStudies('id');
  const latestPostDate = getLatestLastmod(getSitemapBlogRoutes());
  const buildDate = new Date(`${latestPostDate}T09:00:00+07:00`).toUTCString();

  const caseStudyItemsXml = caseStudies
    .map((study) => {
      const link = `${cleanBase}/id/studi-kasus/${study.slug}`;
      const pubDate = new Date(study.updatedAt || study.publishedAt).toUTCString();
      return [
        '    <item>',
        `      <title>${escapeXml(`${study.title} (${study.internalBadgeLabel})`)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `      <dc:creator>${escapeXml(study.author)}</dc:creator>`,
        `      <category>${escapeXml(`Studi Kasus · ${study.industry}`)}</category>`,
        `      <description>${escapeXml(study.seo.description)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const itemsXml = posts
    .map((post) => {
      const link = `${cleanBase}/id/blog/${post.slug}`;
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
    '    <title>Catatan &amp; Studi Kasus Proyek Internal — CHESTAADOTCOM</title>',
    `    <link>${escapeXml(`${cleanBase}/id/blog`)}</link>`,
    `    <atom:link href="${escapeXml(`${cleanBase}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    '    <description>Catatan praktis dan studi kasus proyek internal seputar software custom, AI agent WhatsApp, otomasi alur kerja, dan web untuk bisnis di BSD, Tangerang Selatan &amp; Jabodetabek.</description>',
    '    <language>id</language>',
    `    <lastBuildDate>${escapeXml(buildDate)}</lastBuildDate>`,
    caseStudyItemsXml,
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
  const servicesId = getAllServices('id');
  const servicesEn = getAllServices('en');
  const areaPagesId = getIndexableServiceAreaPages('id');
  const areaPagesEn = getIndexableServiceAreaPages('en');
  const projectsId = getPublishedProjects('id');
  const projectsEn = getPublishedProjects('en');

  const serviceLinesId = servicesId
    .map(
      (s) =>
        `- [${s.title}](${cleanBase}${getServicePath(s.slug, 'id')}): ${s.summary}`
    )
    .join('\n');

  const serviceLinesEn = servicesEn
    .map(
      (s) =>
        `- [${s.title}](${cleanBase}${getServicePath(s.slug, 'en')}): ${s.summary}`
    )
    .join('\n');

  const areaLinesId = areaPagesId
    .map(
      (a) =>
        `- [${a.h1}](${cleanBase}${getServiceAreaPath(a.serviceSlug, a.areaSlug, 'id')}): ${a.quickSummary}`
    )
    .join('\n');

  const areaLinesEn = areaPagesEn
    .map(
      (a) =>
        `- [${a.h1}](${cleanBase}${getServiceAreaPath(a.serviceSlug, a.areaSlug, 'en')}): ${a.quickSummary}`
    )
    .join('\n');

  const projectLinesId = projectsId
    .map(
      (proj) =>
        `- [${proj.title} (${proj.internalBadgeLabel} — ${proj.client})](${cleanBase}/id/portfolio/${proj.slug}): ${proj.oneLiner}`
    )
    .join('\n');

  const projectLinesEn = projectsEn
    .map(
      (proj) =>
        `- [${proj.title} (${proj.internalBadgeLabel} — ${proj.client})](${cleanBase}/en/portfolio/${proj.slug}): ${proj.oneLiner}`
    )
    .join('\n');

  const caseStudiesId = getPublishedCaseStudies('id');
  const caseStudiesEn = getPublishedCaseStudies('en');

  const caseStudyLinesId = caseStudiesId
    .map(
      (cs) =>
        `- [${cs.title} (${cs.internalBadgeLabel})](${cleanBase}/id/studi-kasus/${cs.slug}): Masalah: ${cs.summary.problem} Yang dibangun: ${cs.summary.built}`
    )
    .join('\n');

  const caseStudyLinesEn = caseStudiesEn
    .map(
      (cs) =>
        `- [${cs.title} (${cs.internalBadgeLabel})](${cleanBase}/en/case-studies/${cs.slug}): Problem: ${cs.summary.problem} What we built: ${cs.summary.built}`
    )
    .join('\n');

  return [
    '# CHESTAADOTCOM',
    '',
    '> CHESTAADOTCOM (https://chestaa.com) berbasis di BSD, Tangerang Selatan dan melayani bisnis di Tangerang Selatan serta Jabodetabek untuk pembuatan website dan landing page, AI agent untuk bisnis, pengembangan software custom, dan otomasi workflow bisnis.',
    '',
    '## Fact Sheet Resmi (Section 1)',
    '- **Nama**: CHESTAADOTCOM (chestaa.com)',
    '- **Pendiri**:',
    '  - **Chesta Azka** — Co-founder (arsitektur, produk, teknologi)',
    '  - **Zeeshan** — Co-founder (operasional dan client success)',
    '- **Basis**: Berbasis di BSD, Tangerang Selatan, melayani klien di Tangerang Selatan dan Jabodetabek. Kerja sehari-hari dilakukan secara online (WhatsApp, video call); pertemuan tatap muka di area Tangerang Selatan bisa dijadwalkan sesuai kesepakatan.',
    '- **Kontak**:',
    '  - WhatsApp: +62 821-2544-7232 (https://wa.me/6282125447232)',
    '  - Email: chestaadotcom@gmail.com',
    '  - Instagram: @chestaadotcom (https://instagram.com/chestaadotcom)',
    '- **Layanan (4)**:',
    '  1. Pembuatan website dan landing page — mulai dari Rp1.200.000 (IDR 1,200,000), tergantung kompleksitas.',
    '  2. AI agent untuk bisnis (WhatsApp, operasional, customer support, kualifikasi leads) — harga dihitung setelah audit gratis.',
    '  3. Pengembangan software custom (aplikasi web internal, portal klien, dashboard) — harga dihitung setelah audit gratis.',
    '  4. Otomasi workflow bisnis (integrasi antar aplikasi, form ke sheet ke notifikasi, laporan otomatis) — harga dihitung setelah audit gratis.',
    '- **Proses Kerja (4 Langkah)**:',
    '  1. Audit gratis (30 menit)',
    '  2. Rancang dan prototipe',
    '  3. Bangun dan uji',
    '  4. Rilis dan rawat',
    '- **Dokumentasi Lengkap untuk AI / Answer Engines**: https://chestaa.com/llms-full.txt',
    '',
    '## 4 Layanan Utama — Bahasa Indonesia (/id/jasa/*)',
    serviceLinesId,
    '',
    '## 4 Core Services — English (/en/services/*)',
    serviceLinesEn,
    '',
    '## 10 Halaman Area Layanan Indexable — Bahasa Indonesia (/id/jasa/{service}/{area})',
    `- [Indeks Area Layanan (ID)](${cleanBase}/id/area): Ringkasan 5 area layanan di Tangerang Selatan dan Jakarta Selatan.`,
    areaLinesId,
    '',
    '## 10 Indexable Local Area Pages — English (/en/services/{service}/{area})',
    `- [Service Areas Hub (EN)](${cleanBase}/en/areas): Overview of 5 service areas in South Tangerang and South Jakarta.`,
    areaLinesEn,
    '',
    '## 6 Proyek Internal CHESTAADOTCOM (Internal Projects — Bukan Proyek Klien)',
    '### Bahasa Indonesia (/id/portfolio/*)',
    projectLinesId,
    '',
    '### English (/en/portfolio/*)',
    projectLinesEn,
    '',
    '## 3 Studi Kasus Proyek Internal CHESTAADOTCOM (Internal Case Studies — Bukan Proyek Klien)',
    '### Bahasa Indonesia (/id/studi-kasus/*)',
    `- [Indeks Studi Kasus (ID)](${cleanBase}/id/studi-kasus): Semua studi kasus di halaman ini adalah proyek internal CHESTAADOTCOM, bukan proyek klien.`,
    caseStudyLinesId,
    '',
    '### English (/en/case-studies/*)',
    `- [Case Studies Index (EN)](${cleanBase}/en/case-studies): All case studies on this page are CHESTAADOTCOM internal projects, not client projects.`,
    caseStudyLinesEn,
    '',
  ].join('\n');
}

export function generateLlmsFullTxt(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const servicesId = getAllServices('id');
  const servicesEn = getAllServices('en');
  const projectsId = getPublishedProjects('id');
  const projectsEn = getPublishedProjects('en');
  const caseStudiesId = getPublishedCaseStudies('id');
  const caseStudiesEn = getPublishedCaseStudies('en');
  const indexableAreas = getIndexableAreas();

  const renderServiceMarkdown = (s: (typeof servicesId)[number], locale: 'id' | 'en') => {
    const url = `${cleanBase}${getServicePath(s.slug, locale)}`;
    const deliverablesMd = s.deliverables
      .map((d) => `- **${d.title}**: ${d.description}`)
      .join('\n');
    const useCasesMd = s.useCases
      .map(
        (uc) =>
          `  - **${uc.industryLabel} — ${uc.scenarioTitle}**: ${uc.workflowLines.join(' ')} (${locale === 'en' ? 'Design target' : 'Target desain'}: ${uc.outcome})`
      )
      .join('\n');
    const faqMd = s.faq
      .map((f) => `- **Q: ${f.question}**\n  A: ${f.answer}`)
      .join('\n');

    return [
      `### ${s.h1}`,
      `- **URL**: ${url}`,
      `- **Eyebrow**: ${s.eyebrow}`,
      `- **Ringkasan / Summary**: ${s.ringkasanSingkat}`,
      `- **Cocok Kalau**: ${s.bestForSummary}`,
      `- **Mulai Dari**: ${locale === 'en' ? 'Free 30-minute audit via WhatsApp or video call' : 'Audit gratis 30 menit via WhatsApp atau video call'}`,
      `- **Harga**: ${s.pricingNote.label}`,
      '',
      `#### ${locale === 'en' ? 'What We Build / Deliverables' : 'Yang Kamu Dapat'}`,
      deliverablesMd,
      '',
      `#### ${locale === 'en' ? 'Example Scenarios' : 'Contoh Penggunaan di Lapangan'}`,
      useCasesMd,
      '',
      `#### ${locale === 'en' ? 'Technical Principles' : 'Prinsip Teknis Kami'}`,
      s.prinsipTeknis,
      '',
      `#### ${locale === 'en' ? 'Pricing and Scope' : 'Harga dan Ruang Lingkup'}`,
      s.hargaDanScope,
      '',
      `#### FAQ`,
      faqMd,
    ].join('\n');
  };

  const renderProjectMarkdown = (p: (typeof projectsId)[number], locale: 'id' | 'en') => {
    const url = `${cleanBase}/${locale}/portfolio/${p.slug}`;
    return [
      `### ${p.title} [${p.internalBadgeLabel}]`,
      `- **URL**: ${url}`,
      `- **Status**: ${p.client} (internal: true, year: ${p.year})`,
      `- **Peran / Role**: ${p.role}`,
      `- **Kategori / Category**: ${p.categoryLabel} (${p.industry})`,
      `- **Ringkasan 1 Kalimat**: ${p.oneLiner}`,
      `- **Masalah**: ${p.problem}`,
      `- **Solusi**: ${p.solution}`,
      `- **Alur Kerja**:`,
      ...p.howItWorks.map((step, idx) => `  ${idx + 1}. ${step}`),
      `- **Target Desain (${p.outcomesLabel})**:`,
      ...p.outcomes.map((o) => `  - ${o}`),
      `- **Stack**: ${p.stack.join(', ')}`,
    ].join('\n');
  };

  const renderCaseStudyMarkdown = (cs: (typeof caseStudiesId)[number], locale: 'id' | 'en') => {
    const url =
      locale === 'en'
        ? `${cleanBase}/en/case-studies/${cs.slug}`
        : `${cleanBase}/id/studi-kasus/${cs.slug}`;
    return [
      `### ${cs.title} [${cs.internalBadgeLabel}]`,
      `- **URL**: ${url}`,
      `- **Status**: ${cs.client} (internal: true, year: ${cs.year})`,
      `- **Penulis / Author**: ${cs.author} (${cs.authorRole})`,
      `- **Industri / Industry**: ${cs.industry} (${cs.services.join(', ')})`,
      `- **Masalah / Problem**: ${cs.summary.problem}`,
      `- **Yang Dibangun / What We Built**: ${cs.summary.built}`,
      `- **${cs.targetsBadgeLabel}**:`,
      ...cs.targets.map((t) => `  - **${t.label}**: ${t.value} (${t.note})`),
    ].join('\n');
  };

  const areasMd = indexableAreas
    .map(
      (a) =>
        `- **${a.name} (${a.nameEn})**: ${a.factsSummaryId}\n  - ID Website: ${cleanBase}${getServiceAreaPath('pembuatan-website', a.slug, 'id')}\n  - ID AI Agent: ${cleanBase}${getServiceAreaPath('ai-agent', a.slug, 'id')}\n  - EN Website: ${cleanBase}${getServiceAreaPath('pembuatan-website', a.slug, 'en')}\n  - EN AI Agent: ${cleanBase}${getServiceAreaPath('ai-agent', a.slug, 'en')}`
    )
    .join('\n');

  return [
    '# CHESTAADOTCOM — Full Documentation Export (llms-full.txt)',
    '',
    '> Export lengkap halaman layanan, proyek internal, dan studi kasus internal CHESTAADOTCOM (https://chestaa.com) berdasarkan fakta resmi Section 1.',
    '',
    '## 1. Fact Sheet Resmi',
    '- **Nama**: CHESTAADOTCOM (chestaa.com)',
    '- **Pendiri**: Chesta Azka, Co-founder (arsitektur, produk, teknologi) dan Zeeshan, Co-founder (operasional dan client success).',
    '- **Basis**: Berbasis di BSD, Tangerang Selatan, melayani klien di Tangerang Selatan dan Jabodetabek. Kerja sehari-hari dilakukan secara online (WhatsApp, video call); pertemuan tatap muka di area Tangerang Selatan bisa dijadwalkan sesuai kesepakatan.',
    '- **Kontak**:',
    '  - WhatsApp: +62 821-2544-7232 (https://wa.me/6282125447232)',
    '  - Email: chestaadotcom@gmail.com',
    '  - Instagram: @chestaadotcom (https://instagram.com/chestaadotcom)',
    '- **Layanan (4)**:',
    '  1. Pembuatan website dan landing page — mulai dari Rp1.200.000 (IDR 1,200,000), tergantung kompleksitas.',
    '  2. AI agent untuk bisnis (WhatsApp, operasional, customer support, kualifikasi leads) — harga dihitung setelah audit gratis.',
    '  3. Pengembangan software custom (aplikasi web internal, portal klien, dashboard) — harga dihitung setelah audit gratis.',
    '  4. Otomasi workflow bisnis (integrasi antar aplikasi, form ke sheet ke notifikasi, laporan otomatis) — harga dihitung setelah audit gratis.',
    '- **Proses Kerja (4 Langkah)**:',
    '  1. Audit gratis (30 menit) — melihat masalah, alur sekarang, dan apa yang masuk akal dibangun.',
    '  2. Rancang dan prototipe — kamu lihat bentuk dan alurnya dulu sebelum dibangun penuh.',
    '  3. Bangun dan uji — sistem dibangun, diuji di skenario nyata, dan dirapikan.',
    '  4. Rilis dan rawat — sistem jalan di operasional kamu, dipantau, dan disesuaikan kalau ada kebutuhan baru.',
    '- **Kepemilikan Data & Kode**: Data tetap milikmu (Google Sheets, database, atau server milikmu sendiri). Domain dan hosting terdaftar atas namamu.',
    '- **Catatan Proyek Internal**: Semua proyek dan studi kasus di situs ini adalah proyek internal CHESTAADOTCOM ("Proyek internal" / "Internal project"), bukan proyek klien. Semua metrik adalah "Target desain, bukan hasil klien" / "Design target, not client results".',
    '',
    '---',
    '',
    '## 2. 4 Halaman Layanan Utama — Bahasa Indonesia (/id/jasa/*)',
    '',
    ...servicesId.map((s) => renderServiceMarkdown(s, 'id') + '\n'),
    '---',
    '',
    '## 3. 4 Core Service Pages — English (/en/services/*)',
    '',
    ...servicesEn.map((s) => renderServiceMarkdown(s, 'en') + '\n'),
    '---',
    '',
    '## 4. 6 Proyek Internal CHESTAADOTCOM — Bahasa Indonesia',
    '',
    ...projectsId.map((p) => renderProjectMarkdown(p, 'id') + '\n'),
    '---',
    '',
    '## 5. 6 Internal CHESTAADOTCOM Projects — English',
    '',
    ...projectsEn.map((p) => renderProjectMarkdown(p, 'en') + '\n'),
    '---',
    '',
    '## 6. 3 Studi Kasus Proyek Internal CHESTAADOTCOM — Bahasa Indonesia (/id/studi-kasus/*)',
    '',
    ...caseStudiesId.map((cs) => renderCaseStudyMarkdown(cs, 'id') + '\n'),
    '---',
    '',
    '## 7. 3 Internal CHESTAADOTCOM Case Studies — English (/en/case-studies/*)',
    '',
    ...caseStudiesEn.map((cs) => renderCaseStudyMarkdown(cs, 'en') + '\n'),
    '---',
    '',
    '## 8. 5 Area Layanan Indexable (/id/area & /en/areas)',
    '',
    areasMd,
    '',
  ].join('\n');
}
