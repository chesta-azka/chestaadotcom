import fs from 'fs';
import path from 'path';
import { getAllSitemapRoutes, SITE_URL } from './sitemapGenerator';
import { injectSocialMeta } from '../lib/social-meta';

const routes = getAllSitemapRoutes();

// Ensure no static sitemap.xml or robots.txt exists in public/ or dist/ so that
// GET /sitemap.xml and GET /robots.txt are always served dynamically by server.ts
for (const dir of ['public', 'dist']) {
  for (const file of ['sitemap.xml', 'robots.txt']) {
    const target = path.join(process.cwd(), dir, file);
    if (fs.existsSync(target)) {
      try {
        fs.unlinkSync(target);
      } catch {
        // ignore
      }
    }
  }
}

// Pre-render static HTML entrypoints in dist/ so crawlers immediately receive
// full <head> metadata, JSON-LD structured data, and semantic <body> content.
const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  const distIndexHtmlPath = path.join(distDir, 'index.html');
  if (fs.existsSync(distIndexHtmlPath)) {
    const baseHtml = fs.readFileSync(distIndexHtmlPath, 'utf-8');

    // 1. Pre-render Home (/)
    const homeHtml = injectSocialMeta(baseHtml, '/');
    fs.writeFileSync(distIndexHtmlPath, homeHtml, 'utf-8');

    let prerenderedCount = 1;

    // 2. Pre-render all sub-routes (/services, /blog, /blog/:slug, /about, /portfolio, /workflow)
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

    // 3. Pre-render 404 page (dist/404.html) for static host platforms like Vercel
    const notFoundHtml = injectSocialMeta(baseHtml, '/404');
    fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

    console.log(
      `[SSR Pre-render] Pre-rendered ${prerenderedCount} routes and dist/404.html with full HTML body & JSON-LD for ${SITE_URL}.`
    );
  }
}
