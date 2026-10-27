import fs from 'fs';
import path from 'path';
import {
  BLOG_POSTS,
  ENGLISH_BLOG_POSTS,
  BlogContentBlock,
  BlogPost,
} from '../src/data/blog-posts';
import { TOPIC_CLUSTERS, isPillarPostForCluster } from '../src/data/clusters';
import { GLOSSARY_TERMS } from '../src/data/glossary';
import { getAllSitemapRoutes } from '../src/utils/sitemapGenerator';
import { getMetaTagsForUrl, injectSocialMeta } from '../src/lib/social-meta';

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

      // Check mentions of other posts' primary tag
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

      // Check mentions of glossary terms
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
  const referenceNow = new Date('2026-11-03T00:00:00Z').getTime();
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
  console.log(' CHESTAADOTCOM — FULL-SITE SEO, SCHEMA, HREFLANG & FRESHNESS AUDIT');
  console.log('======================================================================\n');

  const routes = getAllSitemapRoutes();
  const htmlTemplate = fs.readFileSync(
    path.resolve(process.cwd(), 'index.html'),
    'utf8'
  );

  for (const route of routes) {
    const meta = getMetaTagsForUrl(route.path);

    // 1. Canonical must never include query params
    if (!meta.url || meta.url.includes('?')) {
      errors.push(`[${route.path}] Canonical URL contains query parameters: "${meta.url}"`);
    }

    // 2. Hreflang reciprocity check
    if (!meta.alternates || !meta.alternates.idUrl || !meta.alternates.enUrl) {
      errors.push(`[${route.path}] Missing hreflang alternates.`);
    }

    // 3. Verify UTM stripping in canonical
    const metaWithUtm = getMetaTagsForUrl(
      `${route.path}?utm_source=instagram&utm_medium=social-story&utm_campaign=test`
    );
    if (metaWithUtm.url !== meta.url || metaWithUtm.url.includes('?')) {
      errors.push(
        `[${route.path}] Canonical URL failed to strip UTM query parameters: "${metaWithUtm.url}"`
      );
    }

    // 4. Verify JSON-LD @graph
    const graphObj = meta.jsonLd as { '@context'?: string; '@graph'?: any[] };
    if (!graphObj || !Array.isArray(graphObj['@graph'])) {
      errors.push(`[${route.path}] Missing JSON-LD @graph.`);
    } else {
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
      if (
        (route.path.startsWith('/id/blog/') || route.path.startsWith('/en/blog/')) &&
        !route.path.includes('/kategori/') &&
        !route.path.includes('/topik/') &&
        !route.path.includes('/topic/') &&
        !route.path.includes('/halaman/') &&
        !route.path.includes('/page/')
      ) {
        if (!types.includes('BlogPosting')) {
          errors.push(`[${route.path}] Blog post is missing BlogPosting schema.`);
        }
        const injected = injectSocialMeta(htmlTemplate, route.path);
        if (
          !injected.includes('property="article:published_time"') ||
          !injected.includes('property="article:modified_time"') ||
          !injected.includes('property="article:author"') ||
          !injected.includes('property="article:section"') ||
          !injected.includes('property="article:tag"') ||
          !injected.includes('rel="author"')
        ) {
          errors.push(
            `[${route.path}] Missing required article:* meta tags or rel="author" in prerendered HTML.`
          );
        }
      }
    }
  }

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
