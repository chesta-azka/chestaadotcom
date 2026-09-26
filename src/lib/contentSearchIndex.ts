import { ALL_ARTICLES, Article } from '../data/blogData';
import { PROJECTS, Project } from '../data/projects';
import { caseStudyDB, CaseStudy } from './caseStudies';

export type ContentType = 'blog' | 'project';

export interface IndexedContentItem {
  id: string;
  type: ContentType;
  title: string;
  subtitle: string;
  category: string;
  slug: string;
  path: string;
  tags: string[];
  techStack?: string[];
  client?: string;
  metric?: string;
  readTime?: string;
  date?: string;
  thumbnail?: string;
  score?: number;
  matchedSnippets?: string[];
  // Raw searchable corpus
  searchTokens: string[];
  rawText: string;
}

/**
 * Normalizes input text into lowercase alphanumeric search tokens
 */
export function tokenizeText(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length >= 2);
}

/**
 * Extracts plain text from article content blocks
 */
function extractArticleText(article: Article): string {
  if (!article.content || !Array.isArray(article.content)) return '';
  return article.content
    .map(item => (typeof item === 'string' ? item : item?.alt || ''))
    .filter(Boolean)
    .join(' ')
    .replace(/[#*`_~>\-[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts clean snippet context around a matched query
 */
export function extractMatchingSnippet(content: string, query: string, maxLength = 120): string | null {
  if (!content || !query) return null;
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  const terms = lowerQuery.split(/\s+/).filter(t => t.length >= 2);
  
  let bestIdx = -1;
  for (const term of terms) {
    const idx = lowerContent.indexOf(term);
    if (idx !== -1) {
      bestIdx = idx;
      break;
    }
  }

  if (bestIdx === -1) return null;

  const start = Math.max(0, bestIdx - 30);
  const end = Math.min(content.length, bestIdx + maxLength);
  let snippet = content.substring(start, end).trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  return snippet;
}

// In-memory cached index structures
let cachedBlogIndex: IndexedContentItem[] | null = null;
let cachedProjectIndex: IndexedContentItem[] | null = null;
let cachedCombinedIndex: IndexedContentItem[] | null = null;

/**
 * Builds the lightweight client-side search index for blog posts
 */
export function buildBlogIndex(): IndexedContentItem[] {
  if (cachedBlogIndex) return cachedBlogIndex;

  const items: IndexedContentItem[] = ALL_ARTICLES.map(art => {
    const bodyText = extractArticleText(art);
    const rawText = `${art.title} ${art.desc} ${art.cat} ${(art.tags || []).join(' ')} ${art.author?.name || ''} ${bodyText}`;
    const searchTokens = Array.from(new Set(tokenizeText(rawText)));

    return {
      id: `blog-${art.slug}`,
      type: 'blog',
      title: art.title,
      subtitle: art.desc,
      category: art.cat,
      slug: art.slug,
      path: `/blog?read=${art.slug}`,
      tags: art.tags || [art.cat],
      readTime: art.readTime,
      date: art.date,
      thumbnail: art.image,
      searchTokens,
      rawText
    };
  });

  cachedBlogIndex = items;
  return items;
}

/**
 * Builds the lightweight client-side search index for projects & case studies
 */
export function buildProjectIndex(): IndexedContentItem[] {
  if (cachedProjectIndex) return cachedProjectIndex;

  const items: IndexedContentItem[] = [];

  // 1. Projects
  PROJECTS.forEach(proj => {
    const combinedText = [
      proj.title,
      proj.category,
      proj.client || '',
      proj.description,
      proj.overview || '',
      proj.challenges || '',
      proj.solution || '',
      (proj.techStack || []).join(' '),
      (proj.features || []).join(' ')
    ].join(' ');

    const searchTokens = Array.from(new Set(tokenizeText(combinedText)));

    items.push({
      id: `proj-${proj.id}`,
      type: 'project',
      title: proj.title,
      subtitle: proj.description,
      category: proj.category,
      slug: proj.id,
      path: `/portfolio/${proj.id}`,
      tags: [...proj.techStack, ...(proj.features || []), proj.category],
      techStack: proj.techStack,
      client: proj.client,
      metric: proj.impact || 'High Performance',
      thumbnail: proj.thumbnail,
      searchTokens,
      rawText: combinedText
    });
  });

  // 2. Case Studies DB (deduplicate against projects)
  caseStudyDB.forEach((study: CaseStudy) => {
    const existing = items.find(p => p.slug === study.slug);
    if (!existing) {
      const combinedStudyText = [
        study.client,
        study.title,
        'Case Study Studi Kasus',
        study.desc,
        study.impact,
        study.roi
      ].join(' ');

      const searchTokens = Array.from(new Set(tokenizeText(combinedStudyText)));

      items.push({
        id: `cs-${study.slug}`,
        type: 'project',
        title: `${study.client}: ${study.title}`,
        subtitle: `${study.impact} — ${study.desc}`,
        category: 'Case Study',
        slug: study.slug,
        path: `/portfolio/${study.slug}`,
        tags: ['Studi Kasus', study.client, 'Enterprise ROI'],
        client: study.client,
        metric: study.impact,
        thumbnail: study.image,
        searchTokens,
        rawText: combinedStudyText
      });
    }
  });

  cachedProjectIndex = items;
  return items;
}

/**
 * Builds or retrieves the unified in-memory index for both blog & project sections
 */
export function getUnifiedContentIndex(): IndexedContentItem[] {
  if (cachedCombinedIndex) return cachedCombinedIndex;
  const blogItems = buildBlogIndex();
  const projectItems = buildProjectIndex();
  cachedCombinedIndex = [...blogItems, ...projectItems];
  return cachedCombinedIndex;
}

export interface SearchOptions {
  type?: 'all' | 'blog' | 'project';
  category?: string;
  limit?: number;
}

/**
 * Lightweight, zero-latency client-side scoring search algorithm
 * Ranks items by title matches (x10), exact tag/tech matches (x6), category/client (x4), and fulltext snippet (x2)
 */
export function searchContentIndex(query: string, options: SearchOptions = {}): IndexedContentItem[] {
  const q = query.trim().toLowerCase();
  const { type = 'all', category, limit = 20 } = options;

  let pool = getUnifiedContentIndex();

  if (type === 'blog') {
    pool = pool.filter(item => item.type === 'blog');
  } else if (type === 'project') {
    pool = pool.filter(item => item.type === 'project');
  }

  if (category && category !== 'all' && category !== 'Semua' && category !== 'All') {
    const catLower = category.toLowerCase();
    pool = pool.filter(item => 
      item.category.toLowerCase().includes(catLower) ||
      item.tags.some(t => t.toLowerCase() === catLower)
    );
  }

  if (!q) {
    return pool.slice(0, limit);
  }

  const queryTerms = tokenizeText(q);
  if (queryTerms.length === 0) return pool.slice(0, limit);

  const scoredResults: IndexedContentItem[] = [];

  for (const item of pool) {
    let score = 0;
    const lowerTitle = item.title.toLowerCase();
    const lowerSub = item.subtitle.toLowerCase();
    const lowerClient = (item.client || '').toLowerCase();
    const lowerCat = item.category.toLowerCase();
    const matchedSnippets: string[] = [];

    // Exact full query match boosts
    if (lowerTitle.includes(q)) score += 35;
    if (lowerClient.includes(q)) score += 25;
    if (lowerCat.includes(q)) score += 15;
    if (lowerSub.includes(q)) score += 10;

    let allTermsMatched = true;

    for (const term of queryTerms) {
      let termMatched = false;

      // 1. Title match (Highest priority)
      if (lowerTitle.includes(term)) {
        score += lowerTitle.startsWith(term) ? 18 : 12;
        termMatched = true;
      }

      // 2. Client match (High priority for projects)
      if (lowerClient.includes(term)) {
        score += 15;
        termMatched = true;
      }

      // 3. Category match
      if (lowerCat.includes(term)) {
        score += 8;
        termMatched = true;
      }

      // 4. Tags & Tech stack match
      for (const tag of item.tags) {
        const lowerTag = tag.toLowerCase();
        if (lowerTag === term) {
          score += 10;
          termMatched = true;
          break;
        } else if (lowerTag.includes(term)) {
          score += 5;
          termMatched = true;
          break;
        }
      }

      // 5. Subtitle / Summary match
      if (lowerSub.includes(term)) {
        score += 6;
        termMatched = true;
      }

      // 6. Deep corpus token match
      if (!termMatched && item.searchTokens.some(t => t.includes(term))) {
        score += 2;
        termMatched = true;
      }

      if (!termMatched) {
        allTermsMatched = false;
      }
    }

    if (score > 0) {
      // Bonus if all search terms matched somewhere
      if (allTermsMatched) score += 20;

      const snippet = extractMatchingSnippet(item.rawText, q);
      if (snippet) {
        matchedSnippets.push(snippet);
      }

      scoredResults.push({
        ...item,
        score,
        matchedSnippets
      });
    }
  }

  // Sort by score descending
  scoredResults.sort((a, b) => (b.score || 0) - (a.score || 0));

  return scoredResults.slice(0, limit);
}

/**
 * Filter projects directly for the ProjectsSection or PortfolioPage
 */
export function filterProjectsByQuery(query: string, categoryFilter?: string): IndexedContentItem[] {
  return searchContentIndex(query, {
    type: 'project',
    category: categoryFilter,
    limit: 50
  });
}

/**
 * Filter blog articles directly for the BlogSection or BlogHubPage
 */
export function filterBlogByQuery(query: string, categoryFilter?: string): IndexedContentItem[] {
  return searchContentIndex(query, {
    type: 'blog',
    category: categoryFilter,
    limit: 50
  });
}

/**
 * Returns statistics of indexed items
 */
export function getSearchIndexStats() {
  const blogs = buildBlogIndex();
  const projects = buildProjectIndex();
  return {
    totalItems: blogs.length + projects.length,
    totalBlogPosts: blogs.length,
    totalProjects: projects.length
  };
}

/**
 * Helper to dispatch 'open-command-palette' custom event with options
 */
export function dispatchOpenCommandPalette(params?: {
  category?: 'all' | 'services' | 'portfolio' | 'articles' | 'areas' | 'pages';
  query?: string;
}) {
  window.dispatchEvent(
    new CustomEvent('open-command-palette', {
      detail: params || {}
    })
  );
}
