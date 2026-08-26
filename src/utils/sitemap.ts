import fs from 'fs';
import path from 'path';
import { CITIES } from '../data/AreasData';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import { PROJECTS } from '../data/projects';
import { ALL_ARTICLES } from '../data/blogData';

const baseRoutes = [
  '/',
  '/services',
  '/projects',
  '/blog',
  '/about'
];

const areaRoutes = CITIES.map(city => `/area/${city.toLowerCase()}`);
const serviceRoutes = SERVICE_DEFINITIONS.map(service => `/layanan/${service.slug}`);
const projectRoutes = PROJECTS.map(p => `/portfolio/${p.id}`);
const articleRoutes = ALL_ARTICLES.map(a => `/blog?read=${a.slug}`);

// Generate combined Area + Service geo-targeted routes
const localGeoRoutes = [];
const geoTargets = ['bsd', 'cisauk'];
geoTargets.forEach(area => {
  // Add core area routing
  if (!areaRoutes.includes(`/area/${area}`)) { 
    localGeoRoutes.push(`/area/${area}`);
  }
  SERVICE_DEFINITIONS.forEach(service => {
    localGeoRoutes.push(`/area/${area}/${service.slug}`);
  });
});

const allRoutes = [...baseRoutes, ...areaRoutes, ...serviceRoutes, ...localGeoRoutes, ...projectRoutes, ...articleRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>https://chestaa.com${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/area/') && route.split('/').length > 3 ? '0.9' : route.startsWith('/layanan/') || route.startsWith('/area/') ? '0.85' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
const outputPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);

console.log(`Sitemap successfully generated at ${outputPath} with ${allRoutes.length} URLs for maximum SEO indexing.`);
