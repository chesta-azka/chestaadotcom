import * as fs from 'fs';
import * as path from 'path';
import { SERVICES_DATA } from '../src/data/servicesData';
import { ALL_ARTICLES } from '../src/data/blogData';
import { PORTFOLIO_PROJECTS } from '../src/data/portfolioData';

const BASE_URL = 'https://chestaa.com';

const staticRoutes = [
  '',
  '/blog',
  '/portfolio',
  '/about',
  '/workflow',
  '/academy',
  '/academy/resources',
  '/quiz',
  '/case-studies',
  '/admin',
  '/portal'
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${route}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>\n`;
    xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Service Detail routes
  Object.keys(SERVICES_DATA).forEach(slug => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/layanan/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  });

  // Blog posts
  ALL_ARTICLES.forEach(article => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/blog/${article.slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // Portfolio items
  PORTFOLIO_PROJECTS.forEach(project => {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/portfolio/${project.id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`✅ Sitemap successfully generated at ${sitemapPath}`);
}

generateSitemap();
