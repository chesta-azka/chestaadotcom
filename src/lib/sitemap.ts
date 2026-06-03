import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/projects',
  '/blog',
  // Dynamic routes
  '/area/cisauk',
  '/area/bsd',
  '/area/gading-serpong'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
    <url>
      <loc>https://chestaa.com${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
</urlset>`;

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const outputPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap generated at ${outputPath}`);
