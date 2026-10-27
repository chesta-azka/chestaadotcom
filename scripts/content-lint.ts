import {
  BLOG_POSTS,
  ENGLISH_BLOG_POSTS,
  BlogContentBlock,
  calculateBlogPostWordCount,
} from '../src/data/blog-posts';
import {
  TOPIC_CLUSTERS,
  getTopicClusterById,
  isPillarPostForCluster,
} from '../src/data/clusters';

const NEW_10_ID_SLUGS = [
  'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
  'tool-use-function-calling-ai-agent-bisnis',
  'memori-ai-agent-bisnis-retensi-dan-privasi',
  'multi-agent-vs-single-agent-arsitektur-bisnis',
  'biaya-operasional-bulanan-ai-agent-bisnis',
  'merancang-alur-percakapan-whatsapp-ai-agent',
  'landing-page-iklan-meta-google-konversi-tinggi',
  'core-web-vitals-pemilik-bisnis-lcp-inp-cls',
  'webhook-dan-api-otomasi-antar-aplikasi-bisnis',
  'keamanan-website-bisnis-lokal-12-langkah',
];

const GENERIC_ANCHORS = new Set([
  'klik di sini',
  'disini',
  'di sini',
  'baca selengkapnya',
  'selengkapnya',
  'link',
  'tautan',
  'click here',
  'here',
  'read more',
  'more',
  'this link',
]);

const BANNED_SLOP_WORDS_ID = [
  'di era digital yang serba cepat',
  'revolusioner',
  'game-changer',
  'tak terbantahkan',
  'solusi terbaik nomor satu',
];

const BANNED_SLOP_WORDS_EN = [
  'in today fast-paced digital landscape',
  'game-changing',
  'revolutionary',
  'unparalleled',
  'delve into',
];

function extractLinksFromBlocks(
  content: BlogContentBlock[],
  conclusion: string[]
): Array<{ anchor: string; href: string; blockIndex: number }> {
  const results: Array<{ anchor: string; href: string; blockIndex: number }> = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const scanText = (txt: string, blockIdx: number) => {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(txt)) !== null) {
      results.push({
        anchor: match[1].trim(),
        href: match[2].trim(),
        blockIndex: blockIdx,
      });
    }
  };

  content.forEach((block, idx) => {
    switch (block.type) {
      case 'paragraph':
      case 'h2':
      case 'h3':
        scanText(block.text, idx);
        break;
      case 'ul':
      case 'ol':
        block.items.forEach((item) => scanText(item, idx));
        break;
      case 'callout':
        scanText(block.text, idx);
        break;
      case 'blockquote':
        scanText(block.quote, idx);
        break;
      case 'table':
        block.rows.forEach((r) => r.forEach((cell) => scanText(cell, idx)));
        break;
    }
  });

  conclusion.forEach((p, idx) => scanText(p, content.length + idx));
  return results;
}

function countWords(text: string): number {
  const cleaned = text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

function main() {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('======================================================================');
  console.log(' CHESTAADOTCOM — CONTENT, CLUSTER, LINK, CTR & PARITY LINTER');
  console.log('======================================================================\n');

  // 1. Validate Topic Clusters
  for (const cluster of TOPIC_CLUSTERS) {
    const introIdWords = countWords(cluster.introId);
    const introEnWords = countWords(cluster.introEn);
    if (introIdWords < 120) {
      errors.push(
        `[Cluster ${cluster.id}] Indonesian intro is ${introIdWords} words (must be >= 120).`
      );
    }
    if (introEnWords < 120) {
      errors.push(
        `[Cluster ${cluster.id}] English intro is ${introEnWords} words (must be >= 120).`
      );
    }
    if (cluster.seoTitleId.length < 50 || cluster.seoTitleId.length > 62) {
      errors.push(
        `[Cluster ${cluster.id}] ID seoTitle length is ${cluster.seoTitleId.length} (must be 50-62): "${cluster.seoTitleId}"`
      );
    }
    if (cluster.seoTitleEn.length < 50 || cluster.seoTitleEn.length > 62) {
      errors.push(
        `[Cluster ${cluster.id}] EN seoTitle length is ${cluster.seoTitleEn.length} (must be 50-62): "${cluster.seoTitleEn}"`
      );
    }
    if (cluster.metaDescriptionId.length < 140 || cluster.metaDescriptionId.length > 160) {
      errors.push(
        `[Cluster ${cluster.id}] ID metaDescription length is ${cluster.metaDescriptionId.length} (must be 140-160).`
      );
    }
    if (cluster.metaDescriptionEn.length < 140 || cluster.metaDescriptionEn.length > 160) {
      errors.push(
        `[Cluster ${cluster.id}] EN metaDescription length is ${cluster.metaDescriptionEn.length} (must be 140-160).`
      );
    }
  }

  // 2. Validate All Posts (Cluster assignment, CTR Title/Desc, Freshness, Link Quality)
  const allPosts = [...BLOG_POSTS, ...ENGLISH_BLOG_POSTS];
  const referenceNow = new Date('2026-11-03T00:00:00Z').getTime();

  for (const post of allPosts) {
    const label = `[${post.locale?.toUpperCase() || 'ID'}:${post.slug}]`;
    const cluster = getTopicClusterById(post.clusterId);
    if (!cluster) {
      errors.push(`${label} Invalid or missing clusterId "${post.clusterId}".`);
      continue;
    }

    // CTR Title: 50-62 chars
    if (post.seoTitle.length < 50 || post.seoTitle.length > 62) {
      errors.push(
        `${label} seoTitle is ${post.seoTitle.length} chars (must be 50-62): "${post.seoTitle}"`
      );
    }
    if (!post.seoTitle.endsWith('| CHESTAADOTCOM')) {
      errors.push(`${label} seoTitle must end with "| CHESTAADOTCOM": "${post.seoTitle}"`);
    }

    // CTR Description: 140-160 chars
    if (post.metaDescription.length < 140 || post.metaDescription.length > 160) {
      errors.push(
        `${label} metaDescription is ${post.metaDescription.length} chars (must be 140-160): "${post.metaDescription}"`
      );
    }

    // Freshness: updatedAt valid & <= 180 days
    if (!post.updatedAt || !/^\d{4}-\d{2}-\d{2}$/.test(post.updatedAt)) {
      errors.push(`${label} Missing or invalid updatedAt "${post.updatedAt}".`);
    } else {
      const updatedMs = new Date(`${post.updatedAt}T00:00:00Z`).getTime();
      const ageDays = Math.floor((referenceNow - updatedMs) / (1000 * 60 * 60 * 24));
      if (ageDays > 180) {
        warnings.push(`${label} Stale article: last updated ${ageDays} days ago (${post.updatedAt}).`);
      }
    }

    // Internal Link Rules
    const allLinks = extractLinksFromBlocks(post.content, post.conclusion);
    const internalLinks = allLinks.filter((l) => l.href.startsWith('/'));

    if (internalLinks.length < 3) {
      errors.push(
        `${label} Has only ${internalLinks.length} contextual internal links (minimum 3 required).`
      );
    }

    // At most 1 link per target URL per article
    const seenTargets = new Map<string, string>();
    for (const link of internalLinks) {
      const targetKey = link.href.split('#')[0].toLowerCase().replace(/\/+$/, '');
      if (seenTargets.has(targetKey)) {
        errors.push(
          `${label} Duplicate internal link target "${targetKey}" (anchors: "${seenTargets.get(
            targetKey
          )}" and "${link.anchor}").`
        );
      } else {
        seenTargets.set(targetKey, link.anchor);
      }
    }

    // Generic anchor ratio <= 30%
    const genericCount = internalLinks.filter((l) =>
      GENERIC_ANCHORS.has(l.anchor.toLowerCase())
    ).length;
    const genericRatio =
      internalLinks.length > 0 ? genericCount / internalLinks.length : 0;
    if (genericRatio > 0.3) {
      errors.push(
        `${label} Generic anchor ratio is ${(genericRatio * 100).toFixed(1)}% (max 30%).`
      );
    }

    // Cluster Pillar bidirectional rules
    const isPillar = isPillarPostForCluster(post.slug, post.clusterId);
    const pillarSlug =
      post.locale === 'en' ? cluster.pillarSlugEn : cluster.pillarSlugId;
    const earlyBlockLimit = Math.max(2, Math.floor(post.content.length * 0.3));

    if (!isPillar) {
      const hasEarlyPillarLink = internalLinks.some(
        (l) => l.blockIndex < earlyBlockLimit && l.href.includes(pillarSlug)
      );
      if (!hasEarlyPillarLink) {
        errors.push(
          `${label} Spoke post does not link up to its cluster Pillar (${pillarSlug}) within the first 30% of content.`
        );
      }
    } else {
      const peerPosts = (post.locale === 'en' ? ENGLISH_BLOG_POSTS : BLOG_POSTS).filter(
        (p) => p.clusterId === post.clusterId && p.slug !== post.slug
      );
      for (const spoke of peerPosts) {
        const linksToSpoke = internalLinks.some((l) => l.href.includes(spoke.slug));
        if (!linksToSpoke) {
          errors.push(
            `${label} Pillar post is missing downward link to cluster spoke "${spoke.slug}".`
          );
        }
      }
    }
  }

  // 3. Long-Form Structural & Parity Audit on the 10 New Bilingual Articles (Posts 21-30)
  console.log('--- WORD COUNT & PARITY REPORT: 10 NEW BILINGUAL ARTICLES (21-30) ---');
  console.log(
    '| # | Indonesian Slug | ID Words | English Slug | EN Words | Ratio | H2 (ID/EN) | FAQ (ID/EN) | Tables (ID/EN) |'
  );
  console.log(
    '|---|-----------------|----------|--------------|----------|-------|------------|-------------|----------------|'
  );

  NEW_10_ID_SLUGS.forEach((idSlug, index) => {
    const idPost = BLOG_POSTS.find((p) => p.slug === idSlug);
    if (!idPost) {
      errors.push(`[New Article #${index + 1}] Missing ID post "${idSlug}".`);
      return;
    }
    const enPost = ENGLISH_BLOG_POSTS.find(
      (p) => p.slug === idPost.alternateSlug || p.alternateSlug === idPost.slug
    );
    if (!enPost) {
      errors.push(
        `[New Article #${index + 1}] Missing EN counterpart for "${idSlug}".`
      );
      return;
    }

    const idBodyWords = calculateBlogPostWordCount(
      idPost.content,
      idPost.conclusion,
      idPost.faq
    );
    const enBodyWords = calculateBlogPostWordCount(
      enPost.content,
      enPost.conclusion,
      enPost.faq
    );

    if (idBodyWords < 1600) {
      errors.push(
        `[ID:${idPost.slug}] Word count is ${idBodyWords} (minimum 1,600 required).`
      );
    }
    if (enBodyWords < 1500) {
      errors.push(
        `[EN:${enPost.slug}] Word count is ${enBodyWords} (minimum 1,500 required).`
      );
    }

    const diffRatio = Math.abs(idBodyWords - enBodyWords) / idBodyWords;
    if (diffRatio > 0.15) {
      errors.push(
        `[Parity:${idPost.slug}] EN word count (${enBodyWords}) differs by ${(
          diffRatio * 100
        ).toFixed(1)}% from ID (${idBodyWords}) — must be within 15%.`
      );
    }

    const idH2s = idPost.content.filter((b) => b.type === 'h2');
    const enH2s = enPost.content.filter((b) => b.type === 'h2');
    const idTables = idPost.content.filter((b) => b.type === 'table');
    const enTables = enPost.content.filter((b) => b.type === 'table');
    const idOls = idPost.content.filter((b) => b.type === 'ol');
    const enOls = enPost.content.filter((b) => b.type === 'ol');
    const idWarnings = idPost.content.filter(
      (b) => b.type === 'callout' && b.variant === 'warning'
    );
    const enWarnings = enPost.content.filter(
      (b) => b.type === 'callout' && b.variant === 'warning'
    );

    if (idH2s.length !== enH2s.length) {
      errors.push(
        `[Parity:${idPost.slug}] H2 count mismatch: ID=${idH2s.length}, EN=${enH2s.length}.`
      );
    }
    if (idPost.faq.length !== enPost.faq.length || idPost.faq.length < 5) {
      errors.push(
        `[Parity:${idPost.slug}] FAQ count mismatch or <5: ID=${idPost.faq.length}, EN=${enPost.faq.length}.`
      );
    }
    if (idTables.length !== enTables.length || idTables.length < 1) {
      errors.push(
        `[Parity:${idPost.slug}] Table count mismatch or <1: ID=${idTables.length}, EN=${enTables.length}.`
      );
    }
    if (idOls.length < 1 || enOls.length < 1) {
      errors.push(`[Structure:${idPost.slug}] Missing numbered list (ol).`);
    }
    if (idWarnings.length < 1 || enWarnings.length < 1) {
      errors.push(`[Structure:${idPost.slug}] Missing warning callout.`);
    }

    // Check Poin utama / Key takeaways at top
    const firstIdBlock = idPost.content[0];
    const firstEnBlock = enPost.content[0];
    if (
      !firstIdBlock ||
      firstIdBlock.type !== 'ul' ||
      firstIdBlock.title !== 'Poin utama' ||
      firstIdBlock.items.length !== 3
    ) {
      errors.push(
        `[Structure:${idPost.slug}] First block must be a 3-bullet "Poin utama" ul.`
      );
    }
    if (
      !firstEnBlock ||
      firstEnBlock.type !== 'ul' ||
      firstEnBlock.title !== 'Key takeaways' ||
      firstEnBlock.items.length !== 3
    ) {
      errors.push(
        `[Structure:${enPost.slug}] First block must be a 3-bullet "Key takeaways" ul.`
      );
    }

    // Check em-dashes and banned slop phrases in body content
    const idRawText = JSON.stringify(idPost.content) + JSON.stringify(idPost.conclusion);
    const enRawText = JSON.stringify(enPost.content) + JSON.stringify(enPost.conclusion);
    if (idRawText.includes('—') || enRawText.includes('—')) {
      errors.push(`[Style:${idPost.slug}] Contains em-dash (—) in content.`);
    }
    for (const banned of BANNED_SLOP_WORDS_ID) {
      if (idRawText.toLowerCase().includes(banned)) {
        errors.push(`[Style:${idPost.slug}] Contains banned phrase "${banned}".`);
      }
    }
    for (const banned of BANNED_SLOP_WORDS_EN) {
      if (enRawText.toLowerCase().includes(banned)) {
        errors.push(`[Style:${enPost.slug}] Contains banned phrase "${banned}".`);
      }
    }

    console.log(
      `| ${index + 1} | \`${idPost.slug}\` | ${idBodyWords} | \`${
        enPost.slug
      }\` | ${enBodyWords} | ${((enBodyWords / idBodyWords) * 100).toFixed(
        1
      )}% | ${idH2s.length}/${enH2s.length} | ${idPost.faq.length}/${
        enPost.faq.length
      } | ${idTables.length}/${enTables.length} |`
    );
  });

  // 4. Print Cluster Assignment Table
  console.log('\n--- TOPIC CLUSTER ASSIGNMENT SUMMARY (ALL 70 BILINGUAL ARTICLES) ---');
  for (const cluster of TOPIC_CLUSTERS) {
    const idClusterPosts = BLOG_POSTS.filter((p) => p.clusterId === cluster.id);
    const enClusterPosts = ENGLISH_BLOG_POSTS.filter(
      (p) => p.clusterId === cluster.id
    );
    console.log(
      `\n* Cluster: ${cluster.id} (ID: ${idClusterPosts.length} posts, EN: ${enClusterPosts.length} posts)`
    );
    console.log(
      `  Pillar: ${cluster.pillarSlugId} <-> ${cluster.pillarSlugEn}`
    );
    idClusterPosts.forEach((p) => {
      const role = isPillarPostForCluster(p.slug, cluster.id) ? '[PILLAR]' : '[SPOKE] ';
      console.log(`    ${role} ${p.slug} <-> ${p.alternateSlug} (${p.wordCount}w)`);
    });
  }

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    warnings.forEach((w) => console.warn(`  WARN: ${w}`));
  }

  if (errors.length > 0) {
    console.error(`\nCONTENT LINT FAILED WITH ${errors.length} ERROR(S):`);
    errors.forEach((e) => console.error(`  ERROR: ${e}`));
    process.exit(1);
  }

  console.log(
    `\nSUCCESS: All ${allPosts.length} bilingual blog posts and ${TOPIC_CLUSTERS.length} topic clusters passed content:lint with 0 errors!`
  );
}

main();
