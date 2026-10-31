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
  getIndexableUnifiedAreaPages,
  getUnifiedAreaPath,
  isUnifiedAreaSlug,
} from '../data/service-areas';
import { getPublishedProjects } from '../data/projects';
import { getPublishedCaseStudies } from '../data/case-studies';
import { REAL_PROJECTS_EXPERIENCE } from '../data/experience';
import { getHreflangAlternates } from '../lib/i18n';
import { getRouteOgPngPath } from '../lib/cover-generator';

export const SITE_URL = (
  (typeof process !== 'undefined' && process.env?.SITE_URL) ||
  'https://chestaa.com'
).replace(/\/+$/, '');

const MAX_BUILD_DATE = '2026-10-29';

export interface SitemapRouteEntry {
  path: string;
  lastmod: string;
  category?: 'pages' | 'services' | 'areas' | 'blog' | 'projects';
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
      const iso = new Date(latestMtimeMs).toISOString().split('T')[0];
      return iso > MAX_BUILD_DATE ? MAX_BUILD_DATE : iso;
    }
  } catch {
    // Fallback to explicit content date
  }

  return fallbackDate > MAX_BUILD_DATE ? MAX_BUILD_DATE : fallbackDate;
}

function normalizeIsoDate(dateStr?: string, fallbackFiles?: string[]): string {
  const fileMtimeDate =
    fallbackFiles && fallbackFiles.length > 0
      ? getFileLastModDate(fallbackFiles, '')
      : '';

  if (dateStr) {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      const rawContentDate = parsed.toISOString().split('T')[0];
      const contentDate =
        rawContentDate > MAX_BUILD_DATE ? MAX_BUILD_DATE : rawContentDate;
      if (fileMtimeDate && fileMtimeDate > contentDate) {
        return fileMtimeDate > MAX_BUILD_DATE ? MAX_BUILD_DATE : fileMtimeDate;
      }
      return contentDate;
    }
  }

  if (fileMtimeDate) {
    return fileMtimeDate > MAX_BUILD_DATE ? MAX_BUILD_DATE : fileMtimeDate;
  }

  return '2026-03-20';
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
      category: 'pages',
    });
    routes.push({
      path: getServicePath(service.slug, 'en'),
      lastmod: serviceFileMtime,
      category: 'pages',
    });
  }
  return routes;
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

  const mainRoutes: SitemapRouteEntry[] = [
    { path: '/id', lastmod: pagesMtime, category: 'pages' },
    { path: '/en', lastmod: pagesMtime, category: 'pages' },
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

  return [...mainRoutes, ...getSitemapServiceRoutes()];
}

export function getSitemapProjectRoutes(): SitemapRouteEntry[] {
  const portfolioMtime = getFileLastModDate(
    ['src/data/projects.ts', 'src/pages/PortfolioPage.tsx'],
    '2026-03-20'
  );
  const caseStudiesMtime = getFileLastModDate(
    ['src/data/case-studies.ts', 'src/pages/CaseStudiesPage.tsx'],
    '2026-03-20'
  );

  const hubRoutes: SitemapRouteEntry[] = [
    { path: '/id/portfolio', lastmod: portfolioMtime, category: 'projects' },
    { path: '/en/portfolio', lastmod: portfolioMtime, category: 'projects' },
    { path: '/id/studi-kasus', lastmod: caseStudiesMtime, category: 'projects' },
    { path: '/en/case-studies', lastmod: caseStudiesMtime, category: 'projects' },
  ];

  const projects = getPublishedProjects('id');
  const projectRoutes: SitemapRouteEntry[] = [];
  const realProjectsLastmod = getFileLastModDate(
    ['src/data/experience.ts', 'src/pages/ProjectDetailPage.tsx'],
    '2026-03-20'
  );
  for (const realProj of REAL_PROJECTS_EXPERIENCE) {
    projectRoutes.push({
      path: `/id/portfolio/${realProj.slugId}`,
      lastmod: realProjectsLastmod,
      category: 'projects',
    });
    projectRoutes.push({
      path: `/en/portfolio/${realProj.slugEn}`,
      lastmod: realProjectsLastmod,
      category: 'projects',
    });
  }
  for (const project of projects) {
    const lastmod = normalizeIsoDate(project.updatedAt, [
      'src/data/projects.ts',
      'src/data/projects.en.ts',
    ]);
    projectRoutes.push({
      path: `/id/portfolio/${project.slug}`,
      lastmod,
      category: 'projects',
    });
    projectRoutes.push({
      path: `/en/portfolio/${project.slug}`,
      lastmod,
      category: 'projects',
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
      category: 'projects',
    });
    caseStudyRoutes.push({
      path: `/en/case-studies/${study.slug}`,
      lastmod,
      category: 'projects',
    });
  }

  return [...hubRoutes, ...projectRoutes, ...caseStudyRoutes];
}

export function getSitemapAreaRoutes(): SitemapRouteEntry[] {
  const areaPages = getIndexableServiceAreaPages('id');
  const unifiedAreaPages = getIndexableUnifiedAreaPages('id');
  const hubLastmod = getFileLastModDate(
    [
      'src/data/areas.ts',
      'src/data/areas.en.ts',
      'src/data/unified-areas.ts',
      'src/pages/AreasHubPage.tsx',
    ],
    '2026-10-29',
  );

  const routes: SitemapRouteEntry[] = [
    { path: '/id/area', lastmod: hubLastmod, category: 'areas' },
    { path: '/en/areas', lastmod: hubLastmod, category: 'areas' },
  ];

  for (const unified of unifiedAreaPages) {
    if (!unified.indexable) continue;
    const lastmod =
      unified.publishAt > MAX_BUILD_DATE ? MAX_BUILD_DATE : unified.publishAt;
    routes.push({
      path: getUnifiedAreaPath(unified.slug, 'id'),
      lastmod,
      category: 'areas',
    });
    routes.push({
      path: getUnifiedAreaPath(unified.slug, 'en'),
      lastmod,
      category: 'areas',
    });
  }

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
    ...getSitemapProjectRoutes(),
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
    clean === '/sitemap-index.xml' ||
    clean === '/sitemap-pages.xml' ||
    clean === '/sitemap-blog.xml' ||
    clean === '/sitemap-areas.xml' ||
    clean === '/sitemap-projects.xml' ||
    clean === '/sitemap-services.xml' ||
    clean === '/sitemap-all.xml' ||
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

  // Unified area routes (/id/area/:slug and /en/areas/:slug)
  const unifiedAreaMatch = clean.match(/^\/(id\/area|en\/areas)\/([^/]+)$/i);
  if (unifiedAreaMatch) {
    return isUnifiedAreaSlug(unifiedAreaMatch[2].toLowerCase());
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
      const lastmod = escapeXml(route.lastmod > MAX_BUILD_DATE ? MAX_BUILD_DATE : route.lastmod);
      const alternates = getHreflangAlternates(normalizedPath, cleanBase);
      const ogImageLoc = escapeXml(`${cleanBase}${getRouteOgPngPath(normalizedPath)}`);

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <xhtml:link rel="alternate" hreflang="id" href="${escapeXml(alternates.idUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(alternates.enUrl)}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alternates.xDefaultUrl)}" />`,
        '    <image:image>',
        `      <image:loc>${ogImageLoc}</image:loc>`,
        '    </image:image>',
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
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
  const blogLastmod = getLatestLastmod(getSitemapBlogRoutes());
  const areasLastmod = getLatestLastmod(getSitemapAreaRoutes());
  const projectsLastmod = getLatestLastmod(getSitemapProjectRoutes());

  const subSitemaps = [
    { loc: `${cleanBase}/sitemap-pages.xml`, lastmod: pagesLastmod },
    { loc: `${cleanBase}/sitemap-blog.xml`, lastmod: blogLastmod },
    { loc: `${cleanBase}/sitemap-areas.xml`, lastmod: areasLastmod },
    { loc: `${cleanBase}/sitemap-projects.xml`, lastmod: projectsLastmod },
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

export function generateSitemapProjectsXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getSitemapProjectRoutes(), baseUrl);
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

export function generateSitemapAllXml(baseUrl: string = SITE_URL): string {
  return buildUrlsetXml(getAllSitemapRoutes(), baseUrl);
}

/**
 * Generates /sitemap.xml as a sitemap index pointing to the 4 child sitemaps:
 * sitemap-pages.xml, sitemap-blog.xml, sitemap-areas.xml, and sitemap-projects.xml.
 */
export function generateSitemapXml(baseUrl: string = SITE_URL): string {
  return generateSitemapIndexXml(baseUrl);
}

export function generateRssXml(baseUrl: string = SITE_URL): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const posts = getPublishedBlogPosts();
  const caseStudies = getPublishedCaseStudies('id');
  const latestPostDate = getLatestLastmod(getSitemapBlogRoutes());
  const buildDate = new Date(`${latestPostDate}T09:00:00+07:00`).toUTCString();

  const caseStudyItemsXml = caseStudies
    .map((study) => {
      const routePath = `/id/studi-kasus/${study.slug}`;
      const link = `${cleanBase}${routePath}`;
      const enclosureUrl = `${cleanBase}${getRouteOgPngPath(routePath)}`;
      const pubDate = new Date(study.updatedAt || study.publishedAt).toUTCString();
      return [
        '    <item>',
        `      <title>${escapeXml(`${study.title} (${study.badgeLabel})`)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `      <dc:creator>${escapeXml(study.author)}</dc:creator>`,
        `      <category>${escapeXml(`${study.badgeLabel} · ${study.industry}`)}</category>`,
        `      <description>${escapeXml(`${study.seo.description} ${study.sampleNote}`)}</description>`,
        `      <enclosure url="${escapeXml(enclosureUrl)}" length="48000" type="image/png" />`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const itemsXml = posts
    .map((post) => {
      const routePath = `/id/blog/${post.slug}`;
      const link = `${cleanBase}${routePath}`;
      const enclosureUrl = `${cleanBase}${post.ogImage || getRouteOgPngPath(routePath)}`;
      const pubDate = new Date(post.updatedAt || post.date).toUTCString();
      const authorProfile = getAuthorProfile(post.author);

      return [
        '    <item>',
        `      <title>${escapeXml(post.title || '')}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
        `      <dc:creator>${escapeXml(authorProfile.name || '')}</dc:creator>`,
        `      <category>${escapeXml(post.category || '')}</category>`,
        `      <description>${escapeXml(post.metaDescription || post.excerpt || '')}</description>`,
        `      <enclosure url="${escapeXml(enclosureUrl)}" length="48000" type="image/png" />`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Catatan &amp; Studi Kasus Contoh — CHESTAADOTCOM</title>',
    `    <link>${escapeXml(`${cleanBase}/id/blog`)}</link>`,
    `    <atom:link href="${escapeXml(`${cleanBase}/rss.xml`)}" rel="self" type="application/rss+xml" />`,
    '    <description>Catatan praktis dan studi kasus contoh seputar software custom, AI agent WhatsApp, otomasi alur kerja, dan web untuk bisnis di BSD, Tangerang Selatan &amp; Jabodetabek.</description>',
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
  const explicitBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
  ];

  const botBlocks = explicitBots.map((bot) =>
    [`User-agent: ${bot}`, 'Allow: /'].join('\n')
  );

  return [
    '# CHESTAADOTCOM (https://chestaa.com) robots.txt',
    '# To block a single bot from crawling the site, replace its "Allow: /" line with "Disallow: /"',
    '# Example to block a single bot:',
    '# User-agent: GPTBot',
    '# Disallow: /',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    ...botBlocks.flatMap((b) => [b, '']),
    `Sitemap: ${cleanBase}/sitemap.xml`,
    '',
  ].join('\n');
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

  const unifiedAreasId = getIndexableUnifiedAreaPages('id');
  const unifiedAreasEn = getIndexableUnifiedAreaPages('en');

  const unifiedAreaLinesId = unifiedAreasId
    .map(
      (u) =>
        `- [${u.h1}](${cleanBase}${getUnifiedAreaPath(u.slug, 'id')}): ${u.quickSummary}`,
    )
    .join('\n');

  const unifiedAreaLinesEn = unifiedAreasEn
    .map(
      (u) =>
        `- [${u.h1}](${cleanBase}${getUnifiedAreaPath(u.slug, 'en')}): ${u.quickSummary}`,
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

  const realProjectLinesId = REAL_PROJECTS_EXPERIENCE.map(
    (rp) =>
      `- [${rp.titleId} (${rp.tagId})](${cleanBase}/id/portfolio/${rp.slugId}): ${rp.descriptionId}${
        rp.projectValueNoteId ? ` (${rp.projectValueNoteId})` : ''
      }`
  ).join('\n');

  const realProjectLinesEn = REAL_PROJECTS_EXPERIENCE.map(
    (rp) =>
      `- [${rp.titleEn} (${rp.tagEn})](${cleanBase}/en/portfolio/${rp.slugEn}): ${rp.descriptionEn}${
        rp.projectValueNoteEn ? ` (${rp.projectValueNoteEn})` : ''
      }`
  ).join('\n');

  const projectLinesId = projectsId
    .map(
      (proj) =>
        `- [${proj.title} (${proj.badgeLabel})](${cleanBase}/id/portfolio/${proj.slug}): ${proj.oneLiner} (${proj.sampleNote})`
    )
    .join('\n');

  const projectLinesEn = projectsEn
    .map(
      (proj) =>
        `- [${proj.title} (${proj.badgeLabel})](${cleanBase}/en/portfolio/${proj.slug}): ${proj.oneLiner} (${proj.sampleNote})`
    )
    .join('\n');

  const caseStudiesId = getPublishedCaseStudies('id');
  const caseStudiesEn = getPublishedCaseStudies('en');

  const caseStudyLinesId = caseStudiesId
    .map(
      (cs) =>
        `- [${cs.title} (${cs.badgeLabel})](${cleanBase}/id/studi-kasus/${cs.slug}): Masalah: ${cs.summary.problem} Yang dibangun: ${cs.summary.built} (${cs.sampleNote})`
    )
    .join('\n');

  const caseStudyLinesEn = caseStudiesEn
    .map(
      (cs) =>
        `- [${cs.title} (${cs.badgeLabel})](${cleanBase}/en/case-studies/${cs.slug}): Problem: ${cs.summary.problem} What we built: ${cs.summary.built} (${cs.sampleNote})`
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
    '  - Instagram: @softwaredev.aiagentic.agency (https://instagram.com/softwaredev.aiagentic.agency)',
    '- **Layanan (4)**:',
    '  1. Pembuatan website dan landing page — mulai dari Rp1.200.000 (IDR 1,200,000), tergantung kompleksitas.',
    '  2. AI agent untuk bisnis (WhatsApp, operasional, customer support, kualifikasi leads) — harga dihitung setelah audit gratis.',
    '  3. Pengembangan software custom (aplikasi web operasional, portal klien, dashboard) — harga dihitung setelah audit gratis.',
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
    '## Halaman Area Layanan Terpadu Indexable — Bahasa Indonesia (/id/area/{slug})',
    `- [Indeks Area Layanan (ID)](${cleanBase}/id/area): Ringkasan area layanan berdasarkan wilayah (Tangerang Selatan, Kabupaten Tangerang, Kota Tangerang, Kota Depok, Jakarta Selatan).`,
    unifiedAreaLinesId,
    '',
    '## Indexable Unified Service Area Pages — English (/en/areas/{slug})',
    `- [Service Areas Hub (EN)](${cleanBase}/en/areas): Overview of service areas grouped by region (South Tangerang, Tangerang Regency, Tangerang City, Depok City, South Jakarta).`,
    unifiedAreaLinesEn,
    '',
    '## 10 Halaman Layanan x Area Indexable — Bahasa Indonesia (/id/jasa/{service}/{area})',
    areaLinesId,
    '',
    '## 10 Indexable Service x Area Pages — English (/en/services/{service}/{area})',
    areaLinesEn,
    '',
    '## 3 Proyek Nyata CHESTAADOTCOM (Proyek nyata · klien dirahasiakan)',
    '### Bahasa Indonesia (/id/portfolio/*)',
    realProjectLinesId,
    '',
    '### English (/en/portfolio/*)',
    realProjectLinesEn,
    '',
    '## 6 Contoh Proyek CHESTAADOTCOM (Contoh proyek — Bukan Proyek Klien)',
    '### Bahasa Indonesia (/id/portfolio/*)',
    projectLinesId,
    '',
    '### English (/en/portfolio/*)',
    projectLinesEn,
    '',
    '## 5 Studi Kasus Contoh CHESTAADOTCOM (Studi kasus contoh — Bukan Proyek Klien)',
    '### Bahasa Indonesia (/id/studi-kasus/*)',
    `- [Indeks Studi Kasus (ID)](${cleanBase}/id/studi-kasus): Contoh studi kasus yang memperlihatkan cara kami menganalisis masalah, mengambil keputusan, dan menimbang kompromi. Pengalaman proyek nyata kami ada di halaman Tentang dan Proyek. Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.`,
    caseStudyLinesId,
    '',
    '### English (/en/case-studies/*)',
    `- [Case Studies Index (EN)](${cleanBase}/en/case-studies): Sample case studies that show how we analyze problems, make decisions, and weigh trade-offs. Our real project experience is on the About and Projects pages. Sample project designed to show our workflow. Not a client project.`,
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

  const renderRealProjectMarkdown = (rp: (typeof REAL_PROJECTS_EXPERIENCE)[number], locale: 'id' | 'en') => {
    const slug = locale === 'en' ? rp.slugEn : rp.slugId;
    const url = `${cleanBase}/${locale}/portfolio/${slug}`;
    const title = locale === 'en' ? rp.titleEn : rp.titleId;
    const label = locale === 'en' ? rp.tagEn : rp.tagId;
    const desc = locale === 'en' ? rp.descriptionEn : rp.descriptionId;
    const valueNote = locale === 'en' ? rp.projectValueNoteEn : rp.projectValueNoteId;
    const workItems = locale === 'en' ? rp.workItemsEn : rp.workItemsId;
    return [
      `### ${title} [${label}]`,
      `- **URL**: ${url}`,
      `- **Label**: ${label}`,
      `- **Deskripsi**: ${desc}`,
      ...(valueNote ? [`- **Catatan Nilai**: ${valueNote}`] : []),
      `- **${locale === 'en' ? 'What we worked on' : 'Yang kami kerjakan'}**:`,
      ...workItems.map((w) => `  - ${w}`),
      `- **${locale === 'en' ? 'Client' : 'Klien'}**: ${locale === 'en' ? 'Client kept confidential' : 'Klien dirahasiakan'}`,
    ].join('\n');
  };

  const renderProjectMarkdown = (p: (typeof projectsId)[number], locale: 'id' | 'en') => {
    const url = `${cleanBase}/${locale}/portfolio/${p.slug}`;
    return [
      `### ${p.title} [${p.badgeLabel}]`,
      `- **URL**: ${url}`,
      `- **Label**: ${p.badgeLabel} (year: ${p.year})`,
      `- **Catatan**: ${p.sampleNote}`,
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
      `### ${cs.title} [${cs.badgeLabel}]`,
      `- **URL**: ${url}`,
      `- **Label**: ${cs.badgeLabel} (year: ${cs.year})`,
      `- **Catatan**: ${cs.sampleNote}`,
      `- **Penulis / Author**: ${cs.author} (${cs.authorRole})`,
      `- **Industri / Industry**: ${cs.industry} (${cs.services.join(', ')})`,
      `- **Masalah / Problem**: ${cs.summary.problem}`,
      `- **Yang Dibangun / What We Built**: ${cs.summary.built}`,
      `- **${cs.targetsBadgeLabel}**:`,
      ...cs.targets.map((t) => `  - **${t.label}**: ${t.value} (${t.note})`),
    ].join('\n');
  };

  const indexableUnifiedAreas = getIndexableUnifiedAreaPages('id');
  const unifiedAreasMd = indexableUnifiedAreas
    .map((u) => {
      const enPage = getIndexableUnifiedAreaPages('en').find((e) => e.slug === u.slug);
      return `- **${u.name} (${enPage?.name || u.name}) — ${u.regionLabel}**: ${u.factsSummary}\n  - ID Area Page: ${cleanBase}${getUnifiedAreaPath(u.slug, 'id')}\n  - EN Area Page: ${cleanBase}${getUnifiedAreaPath(u.slug, 'en')}`;
    })
    .join('\n');

  const areasMd = indexableAreas
    .map(
      (a) =>
        `- **${a.name} (${a.nameEn})**: ${a.factsSummaryId}\n  - ID Website: ${cleanBase}${getServiceAreaPath('pembuatan-website', a.slug, 'id')}\n  - ID AI Agent: ${cleanBase}${getServiceAreaPath('ai-agent', a.slug, 'id')}\n  - EN Website: ${cleanBase}${getServiceAreaPath('pembuatan-website', a.slug, 'en')}\n  - EN AI Agent: ${cleanBase}${getServiceAreaPath('ai-agent', a.slug, 'en')}`
    )
    .join('\n');

  return [
    '# CHESTAADOTCOM — Full Documentation Export (llms-full.txt)',
    '',
    '> Export lengkap halaman layanan, proyek nyata, contoh proyek, dan studi kasus contoh CHESTAADOTCOM (https://chestaa.com) berdasarkan fakta resmi Section 1.',
    '',
    '## 1. Fact Sheet Resmi',
    '- **Nama**: CHESTAADOTCOM (chestaa.com)',
    '- **Pendiri**: Chesta Azka, Co-founder (arsitektur, produk, teknologi) dan Zeeshan, Co-founder (operasional dan client success).',
    '- **Basis**: Berbasis di BSD, Tangerang Selatan, melayani klien di Tangerang Selatan dan Jabodetabek. Kerja sehari-hari dilakukan secara online (WhatsApp, video call); pertemuan tatap muka di area Tangerang Selatan bisa dijadwalkan sesuai kesepakatan.',
    '- **Kontak**:',
    '  - WhatsApp: +62 821-2544-7232 (https://wa.me/6282125447232)',
    '  - Instagram: @softwaredev.aiagentic.agency (https://instagram.com/softwaredev.aiagentic.agency)',
    '- **Layanan (4)**:',
    '  1. Pembuatan website dan landing page — mulai dari Rp1.200.000 (IDR 1,200,000), tergantung kompleksitas.',
    '  2. AI agent untuk bisnis (WhatsApp, operasional, customer support, kualifikasi leads) — harga dihitung setelah audit gratis.',
    '  3. Pengembangan software custom (aplikasi web operasional, portal klien, dashboard) — harga dihitung setelah audit gratis.',
    '  4. Otomasi workflow bisnis (integrasi antar aplikasi, form ke sheet ke notifikasi, laporan otomatis) — harga dihitung setelah audit gratis.',
    '- **Proses Kerja (4 Langkah)**:',
    '  1. Audit gratis (30 menit) — melihat masalah, alur sekarang, dan apa yang masuk akal dibangun.',
    '  2. Rancang dan prototipe — kamu lihat bentuk dan alurnya dulu sebelum dibangun penuh.',
    '  3. Bangun dan uji — sistem dibangun, diuji di skenario operasional, dan dirapikan.',
    '  4. Rilis dan rawat — sistem jalan di operasional kamu, dipantau, dan disesuaikan kalau ada kebutuhan baru.',
    '- **Kepemilikan Data & Kode**: Data tetap milikmu (Google Sheets, database, atau server milikmu sendiri). Domain dan hosting terdaftar atas namamu.',
    '- **Catatan Proyek & Studi Kasus**: Tiga proyek nyata memiliki label "Proyek nyata · klien dirahasiakan" ("Real project · client kept confidential"). Enam contoh proyek ("Contoh proyek" / "Sample project") dan lima studi kasus contoh ("Studi kasus contoh" / "Sample case study") menampilkan catatan: "Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien." / "Sample project designed to show our workflow. Not a client project." Semua target adalah "Target desain" / "Design target".',
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
    '## 4. 3 Proyek Nyata CHESTAADOTCOM (Klien Dirahasiakan) — Bahasa Indonesia & English',
    '',
    ...REAL_PROJECTS_EXPERIENCE.map((rp) => renderRealProjectMarkdown(rp, 'id') + '\n'),
    ...REAL_PROJECTS_EXPERIENCE.map((rp) => renderRealProjectMarkdown(rp, 'en') + '\n'),
    '---',
    '',
    '## 5. 6 Contoh Proyek CHESTAADOTCOM — Bahasa Indonesia',
    '',
    ...projectsId.map((p) => renderProjectMarkdown(p, 'id') + '\n'),
    '---',
    '',
    '## 6. 6 Sample CHESTAADOTCOM Projects — English',
    '',
    ...projectsEn.map((p) => renderProjectMarkdown(p, 'en') + '\n'),
    '---',
    '',
    '## 7. 5 Studi Kasus Contoh CHESTAADOTCOM — Bahasa Indonesia (/id/studi-kasus/*)',
    '',
    ...caseStudiesId.map((cs) => renderCaseStudyMarkdown(cs, 'id') + '\n'),
    '---',
    '',
    '## 8. 5 Sample CHESTAADOTCOM Case Studies — English (/en/case-studies/*)',
    '',
    ...caseStudiesEn.map((cs) => renderCaseStudyMarkdown(cs, 'en') + '\n'),
    '---',
    '',
    '## 9. Area Layanan Terpadu & Layanan x Area Indexable (/id/area & /en/areas)',
    '',
    '### Halaman Area Terpadu (/id/area/{slug} & /en/areas/{slug})',
    unifiedAreasMd,
    '',
    '### Halaman Layanan x Area (/id/jasa/{service}/{area} & /en/services/{service}/{area})',
    areasMd,
    '',
  ].join('\n');
}
