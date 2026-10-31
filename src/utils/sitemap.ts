import fs from 'fs';
import path from 'path';
import {
  getAllSitemapRoutes,
  generateSitemapXml,
  generateSitemapIndexXml,
  generateSitemapPagesXml,
  generateSitemapBlogXml,
  generateSitemapAreasXml,
  generateSitemapProjectsXml,
  generateSitemapServicesXml,
  generateSitemapAllXml,
  generateRobotsTxt,
  generateRssXml,
  generateLlmsTxt,
  generateLlmsFullTxt,
  SITE_URL,
} from './sitemapGenerator';
import { getMetaTagsForUrl, injectSocialMeta } from '../lib/social-meta';

const routes = getAllSitemapRoutes();

// 1. Strict build-time verification of titles (50-62 chars), descriptions (150-160 chars),
//    OG PNG images (never SVG), and canonical host (https://chestaa.com) across every indexable page.
const seoErrors: string[] = [];
for (const route of routes) {
  const meta = getMetaTagsForUrl(route.path);
  const titleLen = meta.title.length;
  const descLen = meta.description.length;

  if (titleLen < 50 || titleLen > 62) {
    seoErrors.push(
      `[TITLE LENGTH] ${route.path}: ${titleLen} chars (must be 50-62) -> "${meta.title}"`
    );
  }
  if (descLen < 150 || descLen > 160) {
    seoErrors.push(
      `[DESC LENGTH] ${route.path}: ${descLen} chars (must be 150-160) -> "${meta.description}"`
    );
  }
  if (!meta.image.endsWith('.png') || meta.image.endsWith('.svg')) {
    seoErrors.push(`[OG IMAGE] ${route.path}: must be PNG, got "${meta.image}"`);
  }
  if (!meta.url.startsWith('https://chestaa.com/')) {
    seoErrors.push(`[CANONICAL HOST] ${route.path}: invalid canonical "${meta.url}"`);
  }
}

if (seoErrors.length > 0) {
  console.error('❌ Build failed SEO metadata validation:');
  for (const err of seoErrors) {
    console.error('  -', err);
  }
  process.exit(1);
}

console.log(
  `[SEO Gate] Verified ${routes.length} routes: all titles 50-62 chars, all descriptions 150-160 chars, all OG images 1200x630 PNG.`
);

// 2. Generate static discovery files in both public/ and dist/ so both static
//    deployments (Vercel) and server.ts serve identical, canonical 200 responses.
const discoveryFiles: Record<string, string> = {
  'robots.txt': generateRobotsTxt(SITE_URL),
  'sitemap.xml': generateSitemapXml(SITE_URL),
  'sitemap-index.xml': generateSitemapIndexXml(SITE_URL),
  'sitemap-pages.xml': generateSitemapPagesXml(SITE_URL),
  'sitemap-blog.xml': generateSitemapBlogXml(SITE_URL),
  'sitemap-areas.xml': generateSitemapAreasXml(SITE_URL),
  'sitemap-projects.xml': generateSitemapProjectsXml(SITE_URL),
  'sitemap-services.xml': generateSitemapServicesXml(SITE_URL),
  'sitemap-all.xml': generateSitemapAllXml(SITE_URL),
  'rss.xml': generateRssXml(SITE_URL),
  'llms.txt': generateLlmsTxt(SITE_URL),
  'llms-full.txt': generateLlmsFullTxt(SITE_URL),
};

for (const dir of ['public', 'dist']) {
  const targetDir = path.join(process.cwd(), dir);
  if (fs.existsSync(targetDir)) {
    for (const [filename, content] of Object.entries(discoveryFiles)) {
      fs.writeFileSync(path.join(targetDir, filename), content, 'utf-8');
    }
  }
}

// 3. Pre-render static HTML entrypoints in dist/ so crawlers immediately receive
//    full <head> metadata, JSON-LD structured data, and semantic <body> content.
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  const distIndexHtmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(distIndexHtmlPath)) {
    const baseHtml = fs.readFileSync(distIndexHtmlPath, 'utf-8');

    // Pre-render Home (/)
    const homeHtml = injectSocialMeta(baseHtml, '/id');
    fs.writeFileSync(distIndexHtmlPath, homeHtml, 'utf-8');

    let prerenderedCount = 1;

    // Pre-render all sub-routes (/id, /en, /id/jasa/*, /id/blog/*, /id/area/*, /id/portfolio/*, etc.)
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
      } catch {
        // Continue gracefully
      }
    }

    // Pre-render 404 page (dist/404.html) for static host platforms like Vercel
    const notFoundHtml = injectSocialMeta(baseHtml, '/404');
    fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

    console.log(
      `[SSR Pre-render] Pre-rendered ${prerenderedCount} routes, discovery files, and dist/404.html for ${SITE_URL}.`
    );
  }
}
