import fs from 'fs';
import path from 'path';
import { generateSitemapXml, getAllSitemapRoutes } from './sitemapGenerator';
import { injectSocialMeta } from '../lib/social-meta';

const sitemap = generateSitemapXml('https://chestaa.com');
const routes = getAllSitemapRoutes();

// Ensure public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const outputPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

// If dist directory exists, sync sitemap and pre-render route entrypoints
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf-8');

  // Pre-render static HTML entrypoints for social sharing and direct deep-link access
  const distIndexHtmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(distIndexHtmlPath)) {
    const baseHtml = fs.readFileSync(distIndexHtmlPath, 'utf-8');
    let prerenderedCount = 0;

    for (const route of routes) {
      if (route.path === '/' || !route.path.startsWith('/')) continue;

      try {
        const cleanSubPath = route.path.replace(/^\/+/, '');
        const targetRouteDir = path.join(distDir, cleanSubPath);
        if (!fs.existsSync(targetRouteDir)) {
          fs.mkdirSync(targetRouteDir, { recursive: true });
        }

        const routeHtml = injectSocialMeta(baseHtml, route.path);
        fs.writeFileSync(path.join(targetRouteDir, 'index.html'), routeHtml, 'utf-8');
        prerenderedCount++;
      } catch (err) {
        // Continue gracefully if a specific path has an issue
      }
    }

    console.log(`[Pre-render] Successfully generated ${prerenderedCount} static route entrypoints for zero-404 social sharing on Vercel.`);
  }
}

console.log(`[Sitemap] Successfully generated dynamic sitemap with ${routes.length} URLs for maximum SEO indexing.`);
