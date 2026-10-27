#!/usr/bin/env node
/**
 * scripts/url-check.mjs
 * Validates HTTP status codes, redirect chains (hops), and final destination URLs
 * for reproduction, audit, and regression testing across CHESTAADOTCOM routes.
 *
 * Usage:
 *   node scripts/url-check.mjs [baseUrl]
 *   node scripts/url-check.mjs http://localhost:3000
 *   node scripts/url-check.mjs https://www.chestaa.com
 */

const BASE_URL = (process.argv[2] || process.env.TEST_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');

const TEST_URLS = [
  // 1. Failing URL from user report
  '/blog/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',

  // 2. Its /id and /en canonical counterparts
  '/id/blog/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
  '/en/blog/guide-how-agentic-ai-works-for-beginners',

  // 3. /blog index
  '/blog',

  // 4. /blog/<existing slug>
  '/blog/ai-agent-vs-chatbot-perbedaan-untuk-bisnis',

  // 5. /portfolio
  '/portfolio',

  // 6. /portfolio/<slug>
  '/portfolio/wa-concierge',

  // 7. /case-studies/<slug>
  '/case-studies/wa-concierge-klinik',

  // 8. /studi-kasus/<slug>
  '/studi-kasus/wa-concierge-klinik',

  // 9. /jasa/<slug>
  '/jasa/ai-agent',

  // 10. /layanan and /layanan/<slug>
  '/layanan',
  '/layanan/ai-agent',

  // 11. /ind and /eng
  '/ind',
  '/eng',

  // 12. /sitemap.xml
  '/sitemap.xml',

  // 13. /robots.txt
  '/robots.txt',

  // 14. /llms.txt
  '/llms.txt',

  // 15. /id and /en
  '/id',
  '/en',

  // 16. Nonsense 404 URL
  '/halaman-palsu-yang-pasti-tidak-ada-12345'
];

async function checkUrl(path) {
  const initialUrl = `${BASE_URL}${path}`;
  let currentUrl = initialUrl;
  let hops = 0;
  let firstStatus = null;
  const visited = new Set();
  const maxHops = 10;

  try {
    while (hops < maxHops) {
      if (visited.has(currentUrl)) {
        return {
          path,
          status: 'LOOP',
          hops,
          finalUrl: currentUrl,
          ok: false,
          error: 'Redirect loop detected'
        };
      }
      visited.add(currentUrl);

      // Disable auto-redirect following in fetch to count hops
      const res = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
        headers: {
          'User-Agent': 'ChestaUrlCheckBot/1.0',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });

      if (firstStatus === null) {
        firstStatus = res.status;
      }

      // Check if redirect
      if ([301, 302, 307, 308].includes(res.status)) {
        hops++;
        const location = res.headers.get('location');
        if (!location) {
          return {
            path,
            status: firstStatus,
            hops,
            finalUrl: currentUrl,
            ok: false,
            error: 'Redirect missing location header'
          };
        }
        currentUrl = new URL(location, currentUrl).href;
      } else {
        // Reached destination
        return {
          path,
          status: firstStatus,
          hops,
          finalStatus: res.status,
          finalUrl: currentUrl.replace(BASE_URL, '') || '/',
          ok: hops === 0 ? res.status === 200 : res.status === 200
        };
      }
    }

    return {
      path,
      status: firstStatus,
      hops,
      finalUrl: currentUrl,
      ok: false,
      error: 'Max redirect hops exceeded'
    };
  } catch (err) {
    return {
      path,
      status: 'ERR',
      hops,
      finalUrl: currentUrl,
      ok: false,
      error: err.message
    };
  }
}

async function run() {
  console.log(`\n========================================================================`);
  console.log(`CHESTAADOTCOM Route & Redirect Audit`);
  console.log(`Testing Base URL: ${BASE_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`========================================================================\n`);

  const results = [];
  for (const path of TEST_URLS) {
    const res = await checkUrl(path);
    results.push(res);
  }

  // Format table output
  console.log(`| URL | Status | Hops | Final URL | Result |`);
  console.log(`| :--- | :---: | :---: | :--- | :---: |`);

  let passCount = 0;
  for (const r of results) {
    const isExpected404 = r.path.includes('palsu') && (r.status === 404 || r.finalStatus === 404);
    const isSuccess = (r.ok && r.hops <= 1) || isExpected404;
    if (isSuccess) passCount++;

    const statusDisplay = r.hops > 0 ? `${r.status} -> ${r.finalStatus}` : `${r.status}`;
    const resultDisplay = isSuccess ? 'PASS' : 'FAIL';

    console.log(`| \`${r.path}\` | ${statusDisplay} | ${r.hops} | \`${r.finalUrl}\` | ${resultDisplay} |`);
  }

  console.log(`\nSummary: ${passCount}/${results.length} URLs behaving as expected.\n`);
  return results;
}

run();
