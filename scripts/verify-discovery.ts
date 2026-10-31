import http from 'http';
import https from 'https';

/**
 * Post-deploy and local discovery check:
 * Fetches /robots.txt, /sitemap.xml (sitemap index), every child sitemap
 * (/sitemap-pages.xml, /sitemap-blog.xml, /sitemap-areas.xml, /sitemap-projects.xml),
 * /llms.txt, and a sample of canonical URLs.
 * Also verifies that www.chestaa.com redirects in a single hop (301/308) to https://chestaa.com.
 */

const BASE_URL = (process.env.CHECK_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
const CANONICAL_HOST = 'https://chestaa.com';

function requestWithHost(urlStr: string, hostHeader: string): Promise<{ status: number; location: string }> {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.request(
      {
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? 443 : 80),
        path: u.pathname + u.search,
        method: 'GET',
        headers: {
          Host: hostHeader,
          'X-Forwarded-Host': hostHeader,
          'X-Forwarded-Proto': 'https',
        },
      },
      (res) => {
        res.resume();
        resolve({
          status: res.statusCode || 0,
          location: (res.headers.location || '').toString(),
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function checkDiscovery() {
  const failures: string[] = [];

  console.log(`Checking discovery endpoints on ${BASE_URL}...`);

  // 1. Check /robots.txt
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`, { redirect: 'manual' });
  const robotsType = robotsRes.headers.get('content-type') || '';
  const robotsBody = await robotsRes.text();

  console.log(`GET /robots.txt -> status=${robotsRes.status}, content-type=${robotsType}`);
  if (robotsRes.status !== 200) {
    failures.push(`/robots.txt returned status ${robotsRes.status} (expected 200)`);
  }
  if (!robotsType.includes('text/plain')) {
    failures.push(`/robots.txt content-type "${robotsType}" does not include text/plain`);
  }
  const requiredRobotsStrings = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${CANONICAL_HOST}/sitemap.xml`,
    'User-agent: GPTBot',
    'User-agent: OAI-SearchBot',
    'User-agent: ChatGPT-User',
    'User-agent: ClaudeBot',
    'User-agent: PerplexityBot',
    'User-agent: Google-Extended',
    'User-agent: Applebot-Extended',
    'Disallow: /', // in the comment explaining how to block a single bot
  ];
  for (const str of requiredRobotsStrings) {
    if (!robotsBody.includes(str)) {
      failures.push(`/robots.txt missing required string: "${str}"`);
    }
  }

  // 2. Check /llms.txt
  const llmsRes = await fetch(`${BASE_URL}/llms.txt`, { redirect: 'manual' });
  const llmsType = llmsRes.headers.get('content-type') || '';
  console.log(`GET /llms.txt -> status=${llmsRes.status}, content-type=${llmsType}`);
  if (llmsRes.status !== 200) {
    failures.push(`/llms.txt returned status ${llmsRes.status} (expected 200)`);
  }

  // 3. Check /sitemap.xml (must be a <sitemapindex> pointing to pages, blog, areas, projects)
  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`, { redirect: 'manual' });
  const sitemapType = sitemapRes.headers.get('content-type') || '';
  const sitemapBody = await sitemapRes.text();
  console.log(`GET /sitemap.xml -> status=${sitemapRes.status}, content-type=${sitemapType}`);
  if (sitemapRes.status !== 200) {
    failures.push(`/sitemap.xml returned status ${sitemapRes.status} (expected 200)`);
  }
  if (!sitemapType.includes('xml')) {
    failures.push(`/sitemap.xml content-type "${sitemapType}" is not XML`);
  }
  if (!sitemapBody.includes('<sitemapindex')) {
    failures.push(`/sitemap.xml is not a <sitemapindex>`);
  }

  const expectedChildSitemaps = [
    '/sitemap-pages.xml',
    '/sitemap-blog.xml',
    '/sitemap-areas.xml',
    '/sitemap-projects.xml',
  ];

  const sampledCanonicalPaths: string[] = [];

  for (const childPath of expectedChildSitemaps) {
    const expectedLoc = `<loc>${CANONICAL_HOST}${childPath}</loc>`;
    if (!sitemapBody.includes(expectedLoc)) {
      failures.push(`/sitemap.xml missing child sitemap loc: ${expectedLoc}`);
    }

    const childRes = await fetch(`${BASE_URL}${childPath}`, { redirect: 'manual' });
    const childType = childRes.headers.get('content-type') || '';
    const childXml = await childRes.text();
    const locMatches = [...childXml.matchAll(/<loc>https:\/\/chestaa\.com([^<]+)<\/loc>/g)].map(
      (m) => m[1]
    );
    console.log(
      `GET ${childPath} -> status=${childRes.status}, content-type=${childType}, urls=${locMatches.length}`
    );

    if (childRes.status !== 200) {
      failures.push(`${childPath} returned status ${childRes.status}`);
    }
    if (!childType.includes('xml')) {
      failures.push(`${childPath} content-type "${childType}" is not XML`);
    }
    if (!childXml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) {
      failures.push(`${childPath} missing xhtml namespace for hreflang alternates`);
    }
    if (!childXml.includes('<lastmod>')) {
      failures.push(`${childPath} missing <lastmod> entries`);
    }
    if (locMatches.length === 0) {
      failures.push(`${childPath} has 0 canonical URLs`);
    } else {
      sampledCanonicalPaths.push(locMatches[0]);
      if (locMatches.length > 1) sampledCanonicalPaths.push(locMatches[1]);
    }
  }

  // 4. Fetch sample of canonical URLs from the child sitemaps
  for (const samplePath of sampledCanonicalPaths) {
    const pageRes = await fetch(`${BASE_URL}${samplePath}`, { redirect: 'manual' });
    console.log(`Sample URL GET ${samplePath} -> status=${pageRes.status}`);
    if (pageRes.status !== 200) {
      failures.push(`Sample URL ${samplePath} returned ${pageRes.status} (expected 200)`);
    }
  }

  // 5. Verify www.chestaa.com -> https://chestaa.com 1-hop redirect on server
  for (const testPath of ['/', '/id', '/robots.txt', '/sitemap.xml']) {
    const wwwRes = await requestWithHost(`${BASE_URL}${testPath}`, 'www.chestaa.com');
    console.log(
      `Host: www.chestaa.com GET ${testPath} -> status=${wwwRes.status}, location=${wwwRes.location}`
    );
    if (wwwRes.status !== 301 && wwwRes.status !== 308) {
      failures.push(`www.chestaa.com ${testPath} did not return 301/308 redirect (got ${wwwRes.status})`);
    }
    const expectedTarget =
      testPath === '/' ? 'https://chestaa.com/id' : `https://chestaa.com${testPath}`;
    if (wwwRes.location !== expectedTarget) {
      failures.push(
        `www.chestaa.com ${testPath} redirected to "${wwwRes.location}" instead of 1-hop "${expectedTarget}"`
      );
    }
  }

  if (failures.length > 0) {
    console.error('❌ Discovery verification failed:');
    for (const f of failures) console.error('  -', f);
    process.exit(1);
  }

  console.log('✅ All discovery, child sitemaps, sample URLs, and 1-hop www redirects verified!');
}

checkDiscovery().catch((err) => {
  console.error(err);
  process.exit(1);
});
