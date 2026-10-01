import { ALL_ARTICLES } from '../data/blogData';
import { caseStudyDB } from '../lib/caseStudies';
import { ACADEMY_DATA } from '../data/academyData';
import { SERVICES_DATA } from '../data/servicesData';
import { PROJECTS } from '../data/projects';
import { CITIES } from '../data/AreasData';
import { insightsData } from '../data/insights';
import { glossaryDatabase } from './glossaryUtils';

export interface SitemapRouteEntry {
  path: string;
  priority: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
}

export function getAllSitemapRoutes(): SitemapRouteEntry[] {
  const today = new Date().toISOString().split('T')[0];

  // 1. Core Base Pages
  const coreBaseRoutes: SitemapRouteEntry[] = [
    { path: '/', priority: '1.0', changefreq: 'daily', lastmod: today },
    { path: '/services', priority: '0.95', changefreq: 'weekly', lastmod: today },
    { path: '/portfolio', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/blog', priority: '0.9', changefreq: 'daily', lastmod: today },
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
        // fallback
      }
    }

    return {
      path: `/blog/${article.slug}`,
      priority: article.featured || article.recommended ? '0.85' : '0.8',
      changefreq: 'weekly',
      lastmod
    };
  });

  // 3. Executive Insight Articles
  const insightRoutes: SitemapRouteEntry[] = insightsData.map((article) => {
    let lastmod = today;
    if (article.date) {
      try {
        const parsed = new Date(article.date);
        if (!isNaN(parsed.getTime())) {
          lastmod = parsed.toISOString().split('T')[0];
        }
      } catch {
        // fallback
      }
    }

    return {
      path: `/insights/${article.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
      lastmod
    };
  });

  // 4. Technology Glossary Terms (Kamus AI & Teknologi)
  const glossaryRoutes: SitemapRouteEntry[] = Object.keys(glossaryDatabase).map((key) => ({
    path: `/kamus-ai-teknologi/${glossaryDatabase[key].slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: today
  }));

  // 5. Client Case Studies
  const caseStudyRoutes: SitemapRouteEntry[] = caseStudyDB.map((study) => ({
    path: `/case-studies/${study.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 6. Academy Paths and Masterclasses
  const academyRoutes: SitemapRouteEntry[] = ACADEMY_DATA.map((masterclass) => ({
    path: `/academy/${masterclass.slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 7. Dedicated Enterprise and Speciality Service Routes
  const dedicatedServices: SitemapRouteEntry[] = [
    { path: '/services/jasa-pembuatan-website-bsd-cisauk', priority: '0.95', changefreq: 'weekly', lastmod: today },
    { path: '/services/website-mesin-konversi', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/karyawan-digital-ai', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/toko-online-otonom', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/landing-page-konversi', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/infrastruktur-digital-enterprise', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/infrastruktur-cloud-anti-down', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/keamanan-data-korporat', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/dominasi-pencarian-seo-aeo', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/mesin-pelipatganda-roas', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/proteksi-aset-digital-sla', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/super-app-korporat-pwa', priority: '0.9', changefreq: 'weekly', lastmod: today },
    { path: '/services/konsultasi-cto-eksekutif', priority: '0.9', changefreq: 'weekly', lastmod: today },
  ];

  // Standard Services from SERVICES_DATA
  const standardServices: SitemapRouteEntry[] = Object.keys(SERVICES_DATA).map((slug) => ({
    path: `/services/${slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 8. Portfolio Projects
  const projectRoutes: SitemapRouteEntry[] = PROJECTS.map((proj) => ({
    path: `/portfolio/${proj.id}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 9. Area Regional Pages (Authentic regions served)
  const areaRoutes: SitemapRouteEntry[] = CITIES.map((city) => ({
    path: `/area/${city.toLowerCase()}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: today
  }));

  // 10. High-Priority Programmatic SEO Targets (Industry x City)
  const priorityIndustries = ['enterprise', 'b2b-corporate', 'ecommerce', 'real-estate', 'klinik-kesehatan', 'manufaktur'];
  const priorityCities = ['bsd-city', 'cisauk', 'tangerang', 'tangerang-selatan', 'jakarta-selatan', 'alam-sutera', 'gading-serpong'];
  const programmaticRoutes: SitemapRouteEntry[] = [];

  for (const ind of priorityIndustries) {
    for (const ct of priorityCities) {
      programmaticRoutes.push({
        path: `/services/${ind}/${ct}`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: today
      });
    }
  }

  // Deduplicate by path
  const seenPaths = new Set<string>();
  const allRoutes: SitemapRouteEntry[] = [
    ...coreBaseRoutes,
    ...dedicatedServices,
    ...standardServices,
    ...blogRoutes,
    ...insightRoutes,
    ...glossaryRoutes,
    ...caseStudyRoutes,
    ...academyRoutes,
    ...projectRoutes,
    ...areaRoutes,
    ...programmaticRoutes
  ].filter((entry) => {
    if (seenPaths.has(entry.path)) return false;
    seenPaths.add(entry.path);
    return true;
  });

  return allRoutes;
}

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
