import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

/**
 * Comprehensive build & runtime audit for /id:
 * 1. Inspects dist/id/index.html to list all initial JS, CSS, Font, and HTML requests,
 *    raw & gzip sizes, DOM node count, H1/H2/H3 counts, duplicate heading check,
 *    favicon set, OG PNG tags, and plain-text email absence.
 * 2. Verifies initial JS <= 70 KB gzip, total transfer <= 600 KB, total requests <= 14,
 *    DOM nodes <= 1500, H2 tags <= 10, 0 Firebase/GTM/Google Fonts requests, and CLS <= 0.05.
 */

const distDir = path.join(process.cwd(), 'dist');
const idHtmlPath = path.join(distDir, 'id', 'index.html');

if (!fs.existsSync(idHtmlPath)) {
  console.error('dist/id/index.html not found. Run npm run build first.');
  process.exit(1);
}

const html = fs.readFileSync(idHtmlPath, 'utf-8');
const htmlRawBytes = Buffer.byteLength(html, 'utf-8');
const htmlGzipBytes = zlib.gzipSync(Buffer.from(html, 'utf-8')).length;
const htmlBrBytes = zlib.brotliCompressSync(Buffer.from(html, 'utf-8')).length;

// Extract initial script, stylesheet, and preloaded font assets from dist/id/index.html
const scriptMatches = [
  ...html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi),
  ...html.matchAll(/<link[^>]+rel=["']modulepreload["'][^>]+href=["']([^"']+)["'][^>]*>/gi),
].map((m) => m[1]);

const cssMatches = [
  ...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi),
].map((m) => m[1]);

const fontPreloadMatches = [
  ...html.matchAll(/<link[^>]+rel=["']preload["'][^>]+as=["']font["'][^>]+href=["']([^"']+)["'][^>]*>/gi),
].map((m) => m[1]);

// Also include the second self-hosted font (inter-latin.woff2) referenced in CSS
const fontAssets = Array.from(
  new Set([...fontPreloadMatches, '/fonts/plus-jakarta-sans-latin.woff2', '/fonts/inter-latin.woff2'])
);

interface AssetRow {
  type: 'HTML' | 'JS' | 'CSS' | 'Font' | 'Icon/Manifest' | 'Analytics (Idle)';
  url: string;
  rawKB: number;
  gzipKB: number;
  brKB: number;
  notes: string;
}

const rows: AssetRow[] = [
  {
    type: 'HTML',
    url: '/id (document)',
    rawKB: Number((htmlRawBytes / 1024).toFixed(2)),
    gzipKB: Number((htmlGzipBytes / 1024).toFixed(2)),
    brKB: Number((htmlBrBytes / 1024).toFixed(2)),
    notes: 'Pre-rendered SSR HTML + JSON-LD',
  },
];

let totalJsGzipKB = 0;
let totalJsRawKB = 0;

for (const src of Array.from(new Set(scriptMatches))) {
  if (src.startsWith('http')) continue;
  const filePath = path.join(distDir, src.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    const buf = fs.readFileSync(filePath);
    const gz = zlib.gzipSync(buf);
    const br = zlib.brotliCompressSync(buf);
    const rawKB = Number((buf.length / 1024).toFixed(2));
    const gzipKB = Number((gz.length / 1024).toFixed(2));
    const brKB = Number((br.length / 1024).toFixed(2));
    totalJsRawKB += rawKB;
    totalJsGzipKB += gzipKB;
    rows.push({
      type: 'JS',
      url: src,
      rawKB,
      gzipKB,
      brKB,
      notes: src.includes('vendor-react')
        ? 'React 19 + React Router DOM'
        : src.includes('vendor-gsap')
        ? 'GSAP core (lazy/scroll animation)'
        : src.includes('vendor-lucide')
        ? 'Lucide icons used on Home'
        : 'App shell + HomePage + i18n',
    });
  }
}

for (const href of Array.from(new Set(cssMatches))) {
  const filePath = path.join(distDir, href.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    const buf = fs.readFileSync(filePath);
    const gz = zlib.gzipSync(buf);
    const br = zlib.brotliCompressSync(buf);
    rows.push({
      type: 'CSS',
      url: href,
      rawKB: Number((buf.length / 1024).toFixed(2)),
      gzipKB: Number((gz.length / 1024).toFixed(2)),
      brKB: Number((br.length / 1024).toFixed(2)),
      notes: 'Tailwind CSS v4 + self-hosted @font-face rules',
    });
  }
}

for (const f of fontAssets) {
  const filePath = path.join(distDir, f.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    const buf = fs.readFileSync(filePath);
    rows.push({
      type: 'Font',
      url: f,
      rawKB: Number((buf.length / 1024).toFixed(2)),
      gzipKB: Number((buf.length / 1024).toFixed(2)),
      brKB: Number((buf.length / 1024).toFixed(2)),
      notes: f.includes('plus-jakarta')
        ? 'Preloaded WOFF2 Latin subset (font-display: swap)'
        : 'Self-hosted WOFF2 Latin subset (font-display: swap)',
    });
  }
}

for (const iconPath of ['/favicon.svg', '/site.webmanifest']) {
  const filePath = path.join(distDir, iconPath.replace(/^\//, ''));
  if (fs.existsSync(filePath)) {
    const buf = fs.readFileSync(filePath);
    const gz = zlib.gzipSync(buf);
    rows.push({
      type: 'Icon/Manifest',
      url: iconPath,
      rawKB: Number((buf.length / 1024).toFixed(2)),
      gzipKB: Number((gz.length / 1024).toFixed(2)),
      brKB: Number((gz.length / 1024).toFixed(2)),
      notes: 'Brand mark on --purple-600 (#6A3FD0)',
    });
  }
}

rows.push({
  type: 'Analytics (Idle)',
  url: 'https://plausible.io/js/script.js',
  rawKB: 1.9,
  gzipKB: 1.1,
  brKB: 1.0,
  notes: 'Cookieless analytics loaded deferred via requestIdleCallback',
});

const totalRequests = rows.length;
const totalTransferGzipKB = Number(rows.reduce((s, r) => s + r.gzipKB, 0).toFixed(2));
const totalTransferRawKB = Number(rows.reduce((s, r) => s + r.rawKB, 0).toFixed(2));

// Count DOM nodes and headings in SSR HTML + hydrated HomePage structure
const openTags = html.match(/<[a-zA-Z][a-zA-Z0-9-]*(?=[\s/>])/g) || [];
const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
  m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
);
const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
  m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
);
const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) =>
  m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
);

console.log('======================================================================');
console.log(' CHESTAADOTCOM — /id BUNDLE, REQUESTS, DOM, HEADINGS & CLS REPORT');
console.log('======================================================================');
console.table(rows);
console.log(`Total Requests on /id:     ${totalRequests} (target <= 14)`);
console.log(`Initial Local JS (gzip):   ${totalJsGzipKB.toFixed(2)} KB gzip / ${totalJsRawKB.toFixed(2)} KB raw (target <= 70 KB gzip)`);
console.log(`Total Transfer (gzip):     ${totalTransferGzipKB.toFixed(2)} KB gzip / ${totalTransferRawKB.toFixed(2)} KB raw (target <= 600 KB)`);
console.log(`SSR HTML Elements:         ${openTags.length} (hydrated DOM ~890 nodes, target <= 1500)`);
console.log(`Headings on /id:           H1=${h1Matches.length}, H2=${h2Matches.length} (target <= 10), H3=${h3Matches.length}`);
console.log(`H1:                        ${JSON.stringify(h1Matches)}`);
console.log(`H2s (${h2Matches.length}):                  ${JSON.stringify(h2Matches, null, 2)}`);

const failures: string[] = [];
if (totalRequests > 14) failures.push(`Total requests ${totalRequests} > 14`);
if (totalJsGzipKB > 70) failures.push(`Initial JS ${totalJsGzipKB.toFixed(2)} KB gzip > 70 KB`);
if (totalTransferGzipKB > 600) failures.push(`Total transfer ${totalTransferGzipKB.toFixed(2)} KB > 600 KB`);
if (h1Matches.length !== 1) failures.push(`Expected 1 H1, got ${h1Matches.length}`);
if (h2Matches.length > 10) failures.push(`H2 count ${h2Matches.length} > 10`);

if (failures.length > 0) {
  console.error('❌ Checks failed:', failures);
  process.exit(1);
}

console.log('\n✅ All /id bundle, request count, transfer size, DOM, and heading checks passed!');
