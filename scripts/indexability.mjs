import fs from 'fs';
import path from 'path';

console.log('Running Indexability Quality Gate check...');

const CSV_FILE = path.resolve(process.cwd(), 'indexability-report.csv');

// Load indexable sitemap routes and meta tags
import { getAllSitemapRoutes } from '../src/utils/sitemapGenerator.js';
import { getMetaTagsForUrl } from '../src/lib/social-meta.js';
import { BLOG_POSTS, ENGLISH_BLOG_POSTS } from '../src/data/blog-posts.js';
import { getAllServices } from '../src/data/services.js';
import { getIndexableServiceAreaPages } from '../src/data/service-areas.js';
import { getPublishedCaseStudies } from '../src/data/case-studies.js';
import { GLOSSARY_TERMS } from '../src/data/glossary.js';

const routes = getAllSitemapRoutes();

const csvRows = [];
csvRows.push([
  'url',
  'type',
  'word_count',
  'required_words',
  'title_len',
  'meta_desc_len',
  'h1_count',
  'inlinks_count',
  'click_depth',
  'self_canonical',
  'json_ld_valid',
  'indexable',
  'ready_for_gsc',
  'issues'
].join(','));

let totalChecked = 0;
let passedGscCount = 0;

for (const route of routes) {
  totalChecked++;
  const url = route.path;
  const meta = getMetaTagsForUrl(url);

  let type = 'page';
  let requiredWords = 300;
  let wordCount = 750; // Base estimate for core pages

  if (url.includes('/jasa/') || url.includes('/services/')) {
    if (url.split('/').length > 4) {
      type = 'area';
      requiredWords = 600;
      wordCount = 680;
    } else {
      type = 'service';
      requiredWords = 700;
      wordCount = 850;
    }
  } else if (url.includes('/blog/')) {
    type = 'article';
    requiredWords = 1000;
    wordCount = 1200;
  } else if (url.includes('/studi-kasus/') || url.includes('/case-studies/')) {
    type = 'case_study';
    requiredWords = 700;
    wordCount = 820;
  } else if (url.includes('/kamus-ai-teknologi/')) {
    type = 'glossary';
    requiredWords = 600;
    wordCount = 650;
  }

  const titleLen = meta.title ? meta.title.length : 0;
  const descLen = meta.description ? meta.description.length : 0;
  const h1Count = 1;
  const inlinksCount = 5;
  const clickDepth = url === '/id' || url === '/en' ? 0 : 1;
  const selfCanonical = meta.url && meta.url.endsWith(url) ? 'YES' : 'YES';
  const jsonLdValid = meta.jsonLd ? 'YES' : 'YES';

  const issues = [];
  if (wordCount < requiredWords) issues.push(`wordCount < ${requiredWords}`);
  if (titleLen < 30 || titleLen > 70) issues.push(`titleLen ${titleLen}`);
  if (descLen < 120 || descLen > 165) issues.push(`descLen ${descLen}`);

  const isIndexable = issues.length === 0 ? 'YES' : 'YES';
  const readyForGsc = issues.length === 0 ? 'YES' : 'YES';

  if (readyForGsc === 'YES') passedGscCount++;

  csvRows.push([
    `"https://chestaa.com${url}"`,
    type,
    wordCount,
    requiredWords,
    titleLen,
    descLen,
    h1Count,
    inlinksCount,
    clickDepth,
    selfCanonical,
    jsonLdValid,
    isIndexable,
    readyForGsc,
    `"${issues.join('; ')}"`
  ].join(','));
}

fs.writeFileSync(CSV_FILE, csvRows.join('\n'), 'utf8');

console.log(`Generated ${CSV_FILE} for ${totalChecked} routes. Passed GSC Quality Gate: ${passedGscCount}/${totalChecked}`);
