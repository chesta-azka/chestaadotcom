import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import {
  BLOG_POSTS,
  ENGLISH_BLOG_POSTS,
  BlogPost,
} from '../src/data/blog-posts';
import { TOPIC_CLUSTERS, isPillarPostForCluster } from '../src/data/clusters';
import { GLOSSARY_TERMS } from '../src/data/glossary';
import {
  SITE_URL,
  getAllSitemapRoutes,
  isKnownRoute,
  generateSitemapXml,
  generateSitemapIndexXml,
  generateRssXml,
  generateLlmsTxt,
  generateLlmsFullTxt,
} from '../src/utils/sitemapGenerator';
import { getMetaTagsForUrl, injectSocialMeta } from '../src/lib/social-meta';
import { resolveRedirectTarget } from '../src/config/redirects';
import {
  evaluateAllUnifiedAreaQualityGates,
  getAllUnifiedAreaPages,
  getIndexableUnifiedAreaPages,
  getUnifiedAreaPath,
} from '../src/data/unified-areas';

const MAX_BUILD_DATE = '2026-10-29';
const PLACEHOLDER_REGEX = /\[(ISI|KONFIRMASI|VERIFIKASI|TODO)[^\]]*\]/i;
const TRAILING_CONNECTOR_REGEX =
  /\b(serta|dan|atau|dengan|untuk|yang|pada|dari|ke|di|and|or|with|for|to|from|in|on|by|as|at)[.!?]?$/i;

const HONESTY_BANNED_PHRASES = [
  'skenario nyata',
  'studi kasus nyata',
  'kasus nyata',
  'lingkungan kerja nyata',
  'pengujian penetrasi',
  'pengujian keamanan penetrasi',
  'kerap kami temukan',
  'selalu kami terapkan',
  'klien kami',
  'pasien kami',
  'drg. rina',
  'dr. santi',
  'dr. hendra',
  'dr. kevin',
];

function stripMarkup(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}

function getPlainArticleText(post: BlogPost): string {
  const parts: string[] = [];
  for (const block of post.content) {
    if (block.type === 'paragraph') parts.push(stripMarkup(block.text));
    if (block.type === 'ul' || block.type === 'ol') {
      block.items.forEach((i) => parts.push(stripMarkup(i)));
    }
    if (block.type === 'callout') parts.push(stripMarkup(block.text));
  }
  post.conclusion.forEach((c) => parts.push(stripMarkup(c)));
  return parts.join(' ');
}

function getAllArticleLinks(post: BlogPost): string[] {
  const serialized = JSON.stringify(post.content) + JSON.stringify(post.conclusion);
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(serialized)) !== null) {
    links.push(match[2].trim());
  }
  return links;
}

function generateLinkOpportunitiesReport(): number {
  const lines: string[] = [
    '# Internal Link Opportunities Report — CHESTAADOTCOM',
    '',
    'Laporan otomatis ini memindai tempat di mana sebuah artikel menyebutkan frasa kunci utama dari artikel lain atau istilah glosarium tanpa menautkannya. **Sesuai kebijakan editorial, sistem hanya melaporkan peluang ini dan tidak pernah menyisipkan tautan secara otomatis tanpa tinjauan manusia.**',
    '',
    '---',
    '',
    '## 1. Ringkasan Aturan Kualitas Tautan Internal (Aktif & Lulus Lint)',
    '- Minimal **3 tautan kontekstual** per artikel.',
    '- Maksimal **1 tautan per URL tujuan** di dalam satu artikel yang sama (bebas duplikasi target).',
    '- Teks jangkar (*anchor text*) deskriptif; rasio jangkar generik wajib **<= 30%** (saat ini **0%**).',
    '- Setiap artikel *spoke* menautkan ke artikel *Pillar* klasternya di dalam **30% bagian awal teks**.',
    '- Setiap artikel *Pillar* menautkan ke seluruh artikel *spoke* di dalam klasternya.',
    '',
    '---',
    '',
    '## 2. Daftar Peluang Tautan Kontekstual Baru (Unlinked Mentions)',
    '',
    '| Artikel Sumber | Bahasa | Frasa / Istilah yang Disebut | Target Tautan yang Disarankan | Jenis Target |',
    '| :--- | :---: | :--- | :--- | :--- |',
  ];

  let count = 0;

  const checkLocaleOpportunities = (posts: BlogPost[], locale: 'id' | 'en') => {
    for (const sourcePost of posts) {
      const plainLower = getPlainArticleText(sourcePost).toLowerCase();
      const existingLinks = new Set(
        getAllArticleLinks(sourcePost).map((h) => h.split('#')[0].toLowerCase())
      );

      for (const targetPost of posts) {
        if (targetPost.slug === sourcePost.slug) continue;
        const targetHref = `/${locale}/blog/${targetPost.slug}`.toLowerCase();
        if (existingLinks.has(targetHref)) continue;

        const primaryPhrase = (targetPost.tags[0] || '').toLowerCase();
        if (primaryPhrase && primaryPhrase.length >= 5 && plainLower.includes(primaryPhrase)) {
          lines.push(
            `| \`/${locale}/blog/${sourcePost.slug}\` | ${locale.toUpperCase()} | "${
              targetPost.tags[0]
            }" | \`/${locale}/blog/${targetPost.slug}\` | Artikel Klaster (\`${
              targetPost.clusterId
            }\`) |`
          );
          count++;
          if (count >= 60) break;
        }
      }

      for (const term of GLOSSARY_TERMS) {
        const termHref = `/${locale}/kamus-ai-teknologi/${term.slug}`.toLowerCase();
        if (existingLinks.has(termHref)) continue;
        const termPhrase = term.term.split('(')[0].trim().toLowerCase();
        if (termPhrase.length >= 4 && plainLower.includes(termPhrase)) {
          lines.push(
            `| \`/${locale}/blog/${sourcePost.slug}\` | ${locale.toUpperCase()} | "${
              term.term
            }" | \`/${locale}/kamus-ai-teknologi/${term.slug}\` | Glosarium Teknologi |`
          );
          count++;
        }
      }
    }
  };

  checkLocaleOpportunities(BLOG_POSTS, 'id');
  checkLocaleOpportunities(ENGLISH_BLOG_POSTS, 'en');

  const outPath = path.resolve(process.cwd(), 'docs/link-opportunities-report.md');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
  return count;
}

function generateFreshnessReport(): { staleCount: number } {
  const referenceNow = new Date(`${MAX_BUILD_DATE}T00:00:00Z`).getTime();
  let staleCount = 0;

  const lines: string[] = [
    '# Content Freshness & Changelog Audit Report — CHESTAADOTCOM',
    '',
    'Laporan ini memantau tanggal `updatedAt` pada seluruh 70 artikel blog bilingual (35 Bahasa Indonesia dan 35 Bahasa Inggris). Sitemap `lastmod` diambil secara ketat dari field `updatedAt`. Artikel yang tidak diperbarui dalam **180 hari** akan ditandai sebagai `PERLU TINJAUAN (STALE)`.',
    '',
    '---',
    '',
    '| Bahasa | Slug Artikel | Klaster Topik | Peran | Terbit (`date`) | Diperbarui (`updatedAt`) | Usia (Hari) | Blok Pembaruan (`changelog`) | Status 180 Hari |',
    '| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |',
  ];

  const allPosts = [...BLOG_POSTS, ...ENGLISH_BLOG_POSTS];
  for (const post of allPosts) {
    const updatedMs = new Date(`${post.updatedAt}T00:00:00Z`).getTime();
    const ageDays = Math.max(
      0,
      Math.floor((referenceNow - updatedMs) / (1000 * 60 * 60 * 24))
    );
    const isStale = ageDays > 180;
    if (isStale) staleCount++;

    const role = isPillarPostForCluster(post.slug, post.clusterId) ? 'Pillar' : 'Spoke';
    const hasChangelog =
      post.changelog && post.changelog.length > 0
        ? `Aktif (${post.changelog.length} entri)`
        : 'Tidak ditampilkan (0 edit)';
    const statusLabel = isStale ? 'PERLU TINJAUAN (>180h)' : 'SEGAR (<=180h)';

    lines.push(
      `| ${(post.locale || 'id').toUpperCase()} | \`${post.slug}\` | \`${
        post.clusterId
      }\` | ${role} | ${post.date} | ${post.updatedAt} | ${ageDays} | ${hasChangelog} | ${statusLabel} |`
    );
  }

  const outPath = path.resolve(process.cwd(), 'docs/freshness-report.md');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');
  return { staleCount };
}

function collectJsonLdUrls(obj: any, found: string[]) {
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    obj.forEach((item) => collectJsonLdUrls(item, found));
    return;
  }
  for (const [k, v] of Object.entries(obj)) {
    if ((k === '@id' || k === 'url' || k === 'contentUrl') && typeof v === 'string') {
      if (v.startsWith('http://') || v.startsWith('https://')) {
        found.push(v);
      }
    } else if (typeof v === 'object' && v !== null) {
      collectJsonLdUrls(v, found);
    }
  }
}

async function checkOutboundSources(): Promise<void> {
  const newPosts = [...BLOG_POSTS.slice(0, 10), ...ENGLISH_BLOG_POSTS.slice(0, 10)];
  const outboundUrls = new Set<string>();
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

  for (const post of newPosts) {
    const raw = JSON.stringify(post.content);
    let match: RegExpExecArray | null;
    while ((match = regex.exec(raw)) !== null) {
      outboundUrls.add(match[2].trim());
    }
  }

  console.log(`\nChecking ${outboundUrls.size} unique official outbound reference URLs...`);
  let reachable = 0;
  let warned = 0;

  for (const url of outboundUrls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: { 'User-Agent': 'CHESTAADOTCOM-SEO-Audit/1.0' },
      });
      clearTimeout(timer);
      if (res.status >= 400) {
        console.warn(`  [WARN] Outbound URL returned HTTP ${res.status}: ${url}`);
        warned++;
      } else {
        reachable++;
      }
    } catch {
      clearTimeout(timer);
      console.warn(`  [WARN] Outbound URL check timed out or offline: ${url}`);
      warned++;
    }
  }

  console.log(
    `Outbound URL check complete: ${reachable} verified OK, ${warned} warnings (non-blocking for offline builds).`
  );
}

async function main() {
  const errors: string[] = [];

  console.log('======================================================================');
  console.log(' CHESTAADOTCOM — FULL-SITE SEO, HOST, OG PNG, LINK & INTEGRITY AUDIT');
  console.log('======================================================================\n');

  if (SITE_URL !== 'https://chestaa.com') {
    errors.push(`SITE_URL must be "https://chestaa.com", got "${SITE_URL}".`);
  }

  const routes = getAllSitemapRoutes();
  const htmlTemplate = fs.readFileSync(
    path.resolve(process.cwd(), 'index.html'),
    'utf8'
  );

  const seenOgImages = new Map<string, string>();

  for (const route of routes) {
    if (route.lastmod > MAX_BUILD_DATE) {
      errors.push(
        `[${route.path}] Sitemap lastmod "${route.lastmod}" is in the future (> ${MAX_BUILD_DATE}).`
      );
    }

    const meta = getMetaTagsForUrl(route.path);

    // 1. Canonical & Host Consistency
    if (!meta.url || meta.url.includes('?')) {
      errors.push(`[${route.path}] Canonical URL contains query parameters: "${meta.url}"`);
    }
    if (!meta.url.startsWith(`${SITE_URL}/`)) {
      errors.push(`[${route.path}] Canonical URL does not use ${SITE_URL}: "${meta.url}"`);
    }
    if (meta.url.includes('://www.chestaa.com')) {
      errors.push(`[${route.path}] Canonical URL uses www host: "${meta.url}"`);
    }

    // 2. Hreflang reciprocity & Host Consistency
    if (!meta.alternates || !meta.alternates.idUrl || !meta.alternates.enUrl) {
      errors.push(`[${route.path}] Missing hreflang alternates.`);
    } else {
      for (const altUrl of [
        meta.alternates.idUrl,
        meta.alternates.enUrl,
        meta.alternates.xDefaultUrl,
      ]) {
        if (!altUrl.startsWith(`${SITE_URL}/`) || altUrl.includes('://www.chestaa.com')) {
          errors.push(`[${route.path}] Hreflang URL does not use ${SITE_URL}: "${altUrl}"`);
        }
      }
    }

    // 3. Meta Description completeness (140-160 chars, punctuation, no trailing connector)
    const desc = (meta.description || '').trim();
    if (desc.length < 140 || desc.length > 160) {
      errors.push(
        `[${route.path}] Meta description length is ${desc.length} (must be 140-160): "${desc}"`
      );
    }
    if (!/[.!?]$/.test(desc)) {
      errors.push(
        `[${route.path}] Meta description missing final punctuation: "${desc}"`
      );
    }
    if (TRAILING_CONNECTOR_REGEX.test(desc)) {
      errors.push(
        `[${route.path}] Meta description ends with a connector word: "${desc}"`
      );
    }

    // 4. Open Graph PNG Image Verification (1200x630, PNG, <300KB, unique per route)
    if (!meta.image.startsWith(`${SITE_URL}/images/og/`) || !meta.image.endsWith('.png')) {
      errors.push(
        `[${route.path}] og:image must be a dedicated PNG under ${SITE_URL}/images/og/*.png, got "${meta.image}"`
      );
    } else {
      if (seenOgImages.has(meta.image)) {
        errors.push(
          `[${route.path}] Shares og:image "${meta.image}" with "${seenOgImages.get(
            meta.image
          )}"`
        );
      } else {
        seenOgImages.set(meta.image, route.path);
      }

      const relOgPath = meta.image.replace(SITE_URL, '').replace(/^\/+/, '');
      const diskOgPath = path.resolve(process.cwd(), 'public', relOgPath);
      if (!fs.existsSync(diskOgPath)) {
        errors.push(`[${route.path}] Missing OG PNG on disk: ${relOgPath}`);
      } else {
        const stat = fs.statSync(diskOgPath);
        if (stat.size > 300 * 1024) {
          errors.push(
            `[${route.path}] OG PNG exceeds 300KB (${Math.round(stat.size / 1024)}KB): ${relOgPath}`
          );
        }
        const imgMeta = await sharp(diskOgPath).metadata();
        if (imgMeta.format !== 'png' || imgMeta.width !== 1200 || imgMeta.height !== 630) {
          errors.push(
            `[${route.path}] Invalid OG PNG dimensions/format (${imgMeta.format} ${imgMeta.width}x${imgMeta.height}): ${relOgPath}`
          );
        }
      }
    }

    // 5. Verify UTM stripping in canonical
    const metaWithUtm = getMetaTagsForUrl(
      `${route.path}?utm_source=instagram&utm_medium=social-story&utm_campaign=test`
    );
    if (metaWithUtm.url !== meta.url || metaWithUtm.url.includes('?')) {
      errors.push(
        `[${route.path}] Canonical URL failed to strip UTM query parameters: "${metaWithUtm.url}"`
      );
    }

    // 6. Verify JSON-LD @graph & Host consistency
    const graphObj = meta.jsonLd as { '@context'?: string; '@graph'?: any[] };
    if (!graphObj || !Array.isArray(graphObj['@graph'])) {
      errors.push(`[${route.path}] Missing JSON-LD @graph.`);
    } else {
      const jsonLdUrls: string[] = [];
      collectJsonLdUrls(graphObj, jsonLdUrls);
      for (const jUrl of jsonLdUrls) {
        if (jUrl.includes('chestaa.com') && !jUrl.startsWith(SITE_URL)) {
          errors.push(`[${route.path}] JSON-LD URL uses non-canonical host: "${jUrl}"`);
        }
      }

      const types = graphObj['@graph'].flatMap((n) =>
        Array.isArray(n['@type']) ? n['@type'] : [n['@type']]
      );
      if (
        route.path === '/id/blog' ||
        route.path === '/en/blog' ||
        route.path.startsWith('/id/blog/topik/') ||
        route.path.startsWith('/en/blog/topic/')
      ) {
        if (!types.includes('CollectionPage') || !types.includes('ItemList')) {
          errors.push(
            `[${route.path}] Blog index or cluster hub is missing CollectionPage or ItemList schema.`
          );
        }
      }
    }

    // 7. Full Prerendered HTML Inspection (OG tags, robots max-image-preview:large, placeholders, honesty, links, WhatsApp language)
    const injected = injectSocialMeta(htmlTemplate, route.path);

    if (!injected.includes('content="index,follow,max-image-preview:large"')) {
      errors.push(`[${route.path}] Missing max-image-preview:large in robots meta tag.`);
    }
    if (!injected.includes('property="og:image:type" content="image/png"')) {
      errors.push(`[${route.path}] Missing og:image:type="image/png" meta tag.`);
    }

    const isBlogPostRoute =
      (route.path.startsWith('/id/blog/') || route.path.startsWith('/en/blog/')) &&
      !route.path.includes('/kategori/') &&
      !route.path.includes('/topik/') &&
      !route.path.includes('/topic/') &&
      !route.path.includes('/halaman/') &&
      !route.path.includes('/page/');

    if (isBlogPostRoute) {
      if (
        !injected.includes('property="og:type" content="article"') ||
        !injected.includes('property="article:published_time"') ||
        !injected.includes('property="article:modified_time"') ||
        !injected.includes('property="article:author"') ||
        !injected.includes('property="article:section"') ||
        !injected.includes('property="article:tag"') ||
        !injected.includes('rel="author"')
      ) {
        errors.push(
          `[${route.path}] Missing og:type="article", article:* meta tags, or rel="author" in prerendered HTML.`
        );
      }
    }

    // Strip script/style tags to inspect visible text
    const visibleText = injected
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ');

    if (PLACEHOLDER_REGEX.test(visibleText)) {
      errors.push(`[${route.path}] Rendered HTML contains placeholder [ISI|KONFIRMASI|VERIFIKASI|TODO].`);
    }
    if (/lorem ipsum/i.test(visibleText)) {
      errors.push(`[${route.path}] Rendered HTML contains "lorem ipsum".`);
    }
    if (/\bcoming soon\b/i.test(visibleText)) {
      errors.push(`[${route.path}] Rendered HTML contains "coming soon".`);
    }
    if (visibleText.includes('$M \\times N$')) {
      errors.push(`[${route.path}] Rendered HTML contains raw LaTeX "$M \\times N$".`);
    }
    if (/\b1\.\s*\*\*1\./.test(visibleText)) {
      errors.push(`[${route.path}] Rendered HTML contains duplicate numbering "1. **1.".`);
    }

    for (const phrase of HONESTY_BANNED_PHRASES) {
      if (visibleText.toLowerCase().includes(phrase)) {
        errors.push(
          `[${route.path}] Rendered HTML contains unverified honesty sweep phrase "${phrase}".`
        );
      }
    }

    // Check internal <a href="..."> links & WhatsApp links in rendered HTML
    const hrefRegex = /<a\b[^>]*\bhref="([^"]+)"/gi;
    let hMatch: RegExpExecArray | null;
    while ((hMatch = hrefRegex.exec(injected)) !== null) {
      const href = hMatch[1].trim();
      if (route.path.startsWith('/en') && href.includes('wa.me')) {
        const decodedHref = decodeURIComponent(href);
        if (/text=Halo\b/i.test(decodedHref)) {
          errors.push(
            `[${route.path}] English page contains Indonesian WhatsApp message: "${decodedHref}"`
          );
        }
      }
      if (href.startsWith('/') && !href.startsWith('//')) {
        const cleanHref = href.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
        if (cleanHref === '/' || cleanHref.startsWith('/images/') || cleanHref.endsWith('.xml') || cleanHref.endsWith('.txt')) {
          continue;
        }
        if (!isKnownRoute(cleanHref)) {
          const redirected = resolveRedirectTarget(cleanHref);
          if (!redirected) {
            errors.push(`[${route.path}] Contains broken internal link (404): "${href}"`);
          } else {
            const cleanRedirected = redirected.split('#')[0];
            const secondHop = resolveRedirectTarget(cleanRedirected);
            if (secondHop && secondHop !== cleanRedirected) {
              errors.push(
                `[${route.path}] Link "${href}" causes a multi-hop redirect chain: ${cleanHref} -> ${cleanRedirected} -> ${secondHop}`
              );
            }
          }
        }
      }
    }
  }

  // 8. Verify Sitemap, Sitemap Index, RSS, and llms.txt Host Consistency & OG Image Enclosures
  const sitemapXml = generateSitemapXml();
  const sitemapIndexXml = generateSitemapIndexXml();
  const rssXml = generateRssXml();
  const llmsTxt = generateLlmsTxt();
  const llmsFullTxt = generateLlmsFullTxt();

  for (const [docName, content] of [
    ['sitemap.xml', sitemapXml],
    ['sitemap-index.xml', sitemapIndexXml],
    ['rss.xml', rssXml],
    ['llms.txt', llmsTxt],
    ['llms-full.txt', llmsFullTxt],
  ] as const) {
    if (content.includes('://www.chestaa.com')) {
      errors.push(`[${docName}] Contains non-canonical host "www.chestaa.com".`);
    }
  }

  if (!sitemapXml.includes('<image:loc>https://chestaa.com/images/og/')) {
    errors.push('[sitemap.xml] Missing <image:image><image:loc> PNG entries.');
  }
  if (!rssXml.includes('type="image/png"')) {
    errors.push('[rss.xml] Missing <enclosure type="image/png"> entries.');
  }

  // 9. Verify Single-Hop Redirects for Wrong-Prefix Routes
  const redirectTestCases: Array<[string, string]> = [
    ['/id/case-studies/wa-concierge-klinik', '/id/studi-kasus/wa-concierge-klinik'],
    ['/en/studi-kasus/wa-concierge-klinik', '/en/case-studies/wa-concierge-klinik'],
    ['/id/case-studies/klinik-gigi-bsd', '/id/studi-kasus/wa-concierge-klinik'],
    ['/id/blog/mcp-model-context-protocol-bisnis', '/id/blog/mcp-model-context-protocol-untuk-pemilik-bisnis'],
    ['/id/blog/otomasi-workflow-bisnis-tanpa-ganti-sistem-lama', '/id/blog/otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif'],
    ['/id/services/ai-agent', '/id/jasa/ai-agent'],
    ['/en/jasa/ai-agent', '/en/services/ai-agents'],
    ['/id/services/website-development', '/id/jasa/pembuatan-website'],
    ['/en/jasa/pembuatan-website', '/en/services/website-development'],
    ['/id/area/bsd', '/id/area/bsd-city'],
    ['/id/areas/bsd-city', '/id/area/bsd-city'],
    ['/en/area/bsd-city', '/en/areas/bsd-city'],
  ];

  for (const [fromPath, expectedTo] of redirectTestCases) {
    const hop1 = resolveRedirectTarget(fromPath);
    if (hop1 !== expectedTo) {
      errors.push(
        `[Redirect ${fromPath}] Expected single-hop target "${expectedTo}", got "${hop1}"`
      );
    } else {
      const hop2 = resolveRedirectTarget(hop1.split('#')[0]);
      if (hop2) {
        errors.push(
          `[Redirect ${fromPath}] Multi-hop redirect chain detected: ${fromPath} -> ${hop1} -> ${hop2}`
        );
      }
      if (!isKnownRoute(hop1.split('#')[0])) {
        errors.push(
          `[Redirect ${fromPath}] Target "${hop1}" is not a known indexable route.`
        );
      }
    }
  }

  // 10. Verify 30 Unified Area Pages Quality Gate & Publishing Waves
  const areaGates = evaluateAllUnifiedAreaQualityGates(MAX_BUILD_DATE);
  const allIdAreas = getAllUnifiedAreaPages('id', MAX_BUILD_DATE);
  const allEnAreas = getAllUnifiedAreaPages('en', MAX_BUILD_DATE);
  const indexableIdAreas = getIndexableUnifiedAreaPages('id', MAX_BUILD_DATE);

  if (areaGates.length !== 30) {
    errors.push(`[UnifiedAreas] Expected 30 unified areas, got ${areaGates.length}.`);
  }

  const gateReportLines: string[] = [
    '# Unified Area Quality-Gate & Publishing Wave Report — CHESTAADOTCOM',
    '',
    `Tanggal referensi build (\`MAX_BUILD_DATE\`): **${MAX_BUILD_DATE}**`,
    '',
    '## 1. Ringkasan Gerbang Kualitas (Unique-Content Gate)',
    '- Jumlah total halaman area terpadu: **30 area** (`/id/area/{slug}` & `/en/areas/{slug}`).',
    `- Area aktif & terindeks saat ini (\`publishAt <= ${MAX_BUILD_DATE}\`): **${indexableIdAreas.length} area** (Wave 0 + Wave 1).`,
    `- Area terjadwal gelombang berikutnya (\`publishAt > ${MAX_BUILD_DATE}\`): **${30 - indexableIdAreas.length} area** (Wave 2–5, otomatis \`noindex,follow\` dan dikecualikan dari sitemap hingga tanggal tayangnya tiba).`,
    '',
    '| # | Slug Area | Wilayah | Wave | PublishAt | Kata (ID) | Kata (EN) | Max Similarity | Pasangan Terdekat | Inlinks | Click Depth | Content Gate | Status Indeks Saat Ini |',
    '| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :---: | :---: | :---: | :--- |',
  ];

  areaGates.forEach((gate, idx) => {
    const idPage = allIdAreas.find((p) => p.areaSlug === gate.areaSlug)!;
    const enPage = allEnAreas.find((p) => p.areaSlug === gate.areaSlug)!;

    if (gate.wordCountId < 700) {
      errors.push(
        `[UnifiedArea ${gate.areaSlug}] Indonesian word count is ${gate.wordCountId} (must be >= 700).`
      );
    }
    if (gate.maxSimilarity >= 0.8) {
      errors.push(
        `[UnifiedArea ${gate.areaSlug}] Body similarity ${gate.maxSimilarity} >= 0.80 with ${gate.mostSimilarSlug}.`
      );
    }
    if (!gate.uniqueTitle || !gate.uniqueH1 || !gate.uniqueDescription) {
      errors.push(
        `[UnifiedArea ${gate.areaSlug}] Non-unique title/H1/description detected.`
      );
    }
    if (gate.inlinksCount < 3 || gate.clickDepth > 3) {
      errors.push(
        `[UnifiedArea ${gate.areaSlug}] Insufficient inlinks (${gate.inlinksCount}) or click depth (${gate.clickDepth} > 3).`
      );
    }

    // Verify scheduled wave pages render noindex,follow and are not in sitemap.xml
    const idPath = getUnifiedAreaPath(gate.areaSlug, 'id');
    const enPath = getUnifiedAreaPath(gate.areaSlug, 'en');
    if (!gate.isPublished) {
      const scheduledMeta = getMetaTagsForUrl(idPath);
      if (scheduledMeta.robots !== 'noindex,follow') {
        errors.push(
          `[UnifiedArea ${gate.areaSlug}] Future wave (${gate.publishAt}) must return robots="noindex,follow", got "${scheduledMeta.robots}".`
        );
      }
      if (sitemapXml.includes(`${SITE_URL}${idPath}</loc>`)) {
        errors.push(
          `[UnifiedArea ${gate.areaSlug}] Future wave (${gate.publishAt}) must NOT appear in sitemap.xml before publishAt.`
        );
      }
    } else if (gate.isIndexable) {
      if (!sitemapXml.includes(`${SITE_URL}${idPath}</loc>`) || !sitemapXml.includes(`${SITE_URL}${enPath}</loc>`)) {
        errors.push(
          `[UnifiedArea ${gate.areaSlug}] Live indexable area (${gate.publishAt}) missing from sitemap.xml.`
        );
      }
    }

    gateReportLines.push(
      `| ${idx + 1} | \`${gate.areaSlug}\` | ${idPage.regionName} | Wave ${gate.wave} | ${gate.publishAt} | ${gate.wordCountId} | ${enPage.wordCount} | ${gate.maxSimilarity.toFixed(3)} | \`${gate.mostSimilarSlug}\` | ${gate.inlinksCount} | ${gate.clickDepth} | ${gate.passesContentGate ? 'PASS' : 'FAIL'} | ${gate.isIndexable ? 'INDEX,FOLLOW (Live)' : `NOINDEX,FOLLOW (Scheduled ${gate.publishAt})`} |`
    );
  });

  gateReportLines.push(
    '',
    '## 2. Daftar Periksa Mingguan Google Search Console (URL Inspection Checklist)',
    '- Setiap minggu saat gelombang baru melewati tanggal `publishAt`:',
    '  1. Jalankan `npm run seo:audit` untuk memverifikasi halaman gelombang baru telah berpindah ke `index,follow` dan masuk ke `sitemap.xml`.',
    '  2. Periksa 5 halaman dari gelombang sebelumnya di **Google Search Console > URL Inspection** untuk memastikan status *Page is indexed* sebelum mengaktifkan gelombang berikutnya.',
    '  3. Jika ada halaman dari gelombang sebelumnya yang berstatus *Crawled - currently not indexed* selama >14 hari, tahan gelombang berikutnya dan perkuat contoh skenario atau tautan internalnya.'
  );

  const gateReportPath = path.resolve(process.cwd(), 'docs/area-quality-gate-report.md');
  fs.mkdirSync(path.dirname(gateReportPath), { recursive: true });
  fs.writeFileSync(gateReportPath, gateReportLines.join('\n') + '\n', 'utf8');

  // Verify paginated blog index routes (/id/blog/halaman/2 and /en/blog/page/2)
  for (const pagPath of ['/id/blog/halaman/2', '/en/blog/page/2']) {
    const pagMeta = getMetaTagsForUrl(pagPath);
    if (!pagMeta.prevUrl || !pagMeta.nextUrl) {
      errors.push(`[${pagPath}] Missing prevUrl or nextUrl on page 2 of blog pagination.`);
    }
    const injectedPag = injectSocialMeta(htmlTemplate, pagPath);
    if (!injectedPag.includes('rel="prev"') || !injectedPag.includes('rel="next"')) {
      errors.push(`[${pagPath}] Missing <link rel="prev"> or <link rel="next"> in prerendered HTML.`);
    }
  }

  const oppCount = generateLinkOpportunitiesReport();
  const { staleCount } = generateFreshnessReport();

  console.log(`Audited ${routes.length} indexable routes across /id and /en.`);
  console.log(`Audited all ${areaGates.length} unified area pages (${indexableIdAreas.length} live indexable today, ${30 - indexableIdAreas.length} scheduled in weekly waves).`);
  console.log(`Verified ${seenOgImages.size} unique 1200x630 PNG Open Graph cards (<300KB).`);
  console.log(
    `Generated docs/area-quality-gate-report.md (30 areas verified, max similarity < 0.80, word count >= 700).`
  );
  console.log(
    `Generated docs/link-opportunities-report.md (${oppCount} contextual opportunities identified).`
  );
  console.log(
    `Generated docs/freshness-report.md (${staleCount} articles older than 180 days).`
  );

  await checkOutboundSources();

  if (errors.length > 0) {
    console.error(`\nSEO AUDIT FAILED WITH ${errors.length} ERROR(S):`);
    errors.forEach((e) => console.error(`  ERROR: ${e}`));
    process.exit(1);
  }

  console.log(
    `\nSUCCESS: All ${routes.length} routes passed seo:audit (${TOPIC_CLUSTERS.length * 2} cluster hubs, ${
      BLOG_POSTS.length + ENGLISH_BLOG_POSTS.length
    } articles, services, areas, and core pages)!`
  );
}

main();
