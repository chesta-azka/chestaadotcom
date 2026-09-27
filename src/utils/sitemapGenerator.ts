import { ALL_ARTICLES } from '../data/blogData';
import { caseStudyDB } from '../lib/caseStudies';
import { ACADEMY_DATA } from '../data/academyData';
import { SERVICES_DATA } from '../data/servicesData';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import { PROJECTS } from '../data/projects';
import { CITIES } from '../data/AreasData';

export interface SitemapRouteEntry {
  path: string;
  priority: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

/**
 * Dynamically crawls and compiles all application routes across:
 * - Base static pages
 * - Published blog articles
 * - Verified client case studies
 * - Academy paths & masterclasses
 * - Enterprise & UMKM services
 * - Portfolio projects
 * - Geo-targeted regional pages (BSD City, Cisauk, Tangerang)
 */
export function getAllSitemapRoutes(): SitemapRouteEntry[] {
  const today = new Date().toISOString().split('T')[0];

  // 1. Core Base Pages
  const coreBaseRoutes: SitemapRouteEntry[] = [
    { path: '/', priority: '1.0', changefreq: 'daily', lastmod: today },
    { path: '/blog', priority: '0.9', changefreq: 'daily', lastmod: today },
    { path: '/portfolio', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/case-studies', priority: '0.85', changefreq: 'weekly', lastmod: today },
    { path: '/academy', priority: '0.85', changefreq: 'weekly', lastmod: today },
    { path: '/academy/resources', priority: '0.8', changefreq: 'weekly', lastmod: today },
    { path: '/quiz', priority: '0.75', changefreq: 'weekly', lastmod: today },
    { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/workflow', priority: '0.8', changefreq: 'monthly', lastmod: today },
  ];

  // 2. Published Blog Articles
  const blogRoutes: SitemapRouteEntry[] = ALL_ARTICLES.map((article) => {
    let lastmod = today;
    if (article.date) {
      try {
        const parsed = new Date(article.date);
        if (!isNaN(parsed.getTime())) {
          lastmod = parsed.toISOString().split('T')[0];
        }
      } catch {
        // Fallback to today
      }
    }

    return {
      path: `/blog/${article.slug}`,
      priority: article.featured || article.recommended ? '0.85' : '0.8',
      changefreq: 'weekly',
      lastmod
    };
  });

  // 3. Client Case Studies
  const caseStudyRoutes: SitemapRouteEntry[] = caseStudyDB.map((study) => ({
    path: `/case-studies/${study.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 4. Academy Paths & Masterclasses
  const academyRoutes: SitemapRouteEntry[] = ACADEMY_DATA.map((masterclass) => ({
    path: `/academy/${masterclass.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 5. Enterprise & Standard Services
  const serviceSlugs = new Set<string>();
  Object.keys(SERVICES_DATA).forEach(s => serviceSlugs.add(s));
  SERVICE_DEFINITIONS.forEach(s => serviceSlugs.add(s.slug));

  const serviceRoutes: SitemapRouteEntry[] = Array.from(serviceSlugs).map((slug) => ({
    path: `/layanan/${slug}`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 6. Portfolio Projects
  const projectRoutes: SitemapRouteEntry[] = PROJECTS.map((proj) => ({
    path: `/portfolio/${proj.id}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 7. Area Regional Pages
  const areaRoutes: SitemapRouteEntry[] = CITIES.map((city) => ({
    path: `/area/${city.toLowerCase()}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 8. Geo-Targeted Area + Service Combinations
  const geoTargets = ['bsd-city', 'bsd', 'cisauk', 'tangerang'];
  const localGeoRoutes: SitemapRouteEntry[] = [];
  geoTargets.forEach((area) => {
    serviceSlugs.forEach((serviceSlug) => {
      localGeoRoutes.push({
        path: `/area/${area}/${serviceSlug}`,
        priority: '0.75',
        changefreq: 'monthly',
        lastmod: today
      });
    });
  });

  // Deduplicate by path
  const seenPaths = new Set<string>();
  const allRoutes: SitemapRouteEntry[] = [
    ...coreBaseRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
    ...academyRoutes,
    ...projectRoutes,
    ...areaRoutes,
    ...localGeoRoutes
  ].filter((entry) => {
    if (seenPaths.has(entry.path)) return false;
    seenPaths.add(entry.path);
    return true;
  });

  return allRoutes;
}

/**
 * Generates Google-compliant XML sitemap string
 */
export function generateSitemapXml(domain: string = 'https://chestaa.com'): string {
  const routes = getAllSitemapRoutes();

  const xmlUrls = routes
    .map((r) => {
      return `  <url>
    <loc>${domain}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlUrls}
</urlset>`;
}
