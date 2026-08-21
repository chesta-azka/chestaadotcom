import fs from 'fs';
import path from 'path';
import { CITIES } from '../data/AreasData';
import { SERVICES_DATA } from '../data/ServicesData';

const baseRoutes = [
  '/',
  '/services',
  '/projects',
  '/blog',
  '/contact',
  '/about'
];

const areaRoutes = CITIES.map(city => `/area/${city.toLowerCase()}`);
const serviceRoutes = Object.keys(SERVICES_DATA).map(slug => `/layanan/${slug}`);

// If there is a blog data source, we could add blog routes here too
const allRoutes = [...baseRoutes, ...areaRoutes, ...serviceRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>https://chestaa.com${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.startsWith('/layanan/') || route.startsWith('/area/') ? '0.9' : '0.8'}</priority>
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
