import fs from 'fs';
import path from 'path';
import { generateSitemapXml, getAllSitemapRoutes } from './sitemapGenerator';

const sitemap = generateSitemapXml('https://chestaa.com');
const routes = getAllSitemapRoutes();

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const outputPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

// If dist directory exists, also copy to dist
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');
}

console.log(`[Sitemap] Successfully generated dynamic sitemap with ${routes.length} URLs for maximum SEO indexing.`);
