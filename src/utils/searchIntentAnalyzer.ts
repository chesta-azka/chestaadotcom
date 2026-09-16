import { Article } from '../data/blogData';

export type SearchIntentType = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';

export interface QARStructure {
  question: string;
  answer: string;
  reasoning: string;
}

export interface SearchIntentAnalysis {
  slug: string;
  title: string;
  category: string;
  primaryIntent: SearchIntentType;
  secondaryIntent?: SearchIntentType;
  targetKeyword: string;
  qar: QARStructure;
  snippetReadinessScore: number; // 0 - 100
  snippetFormat: 'Paragraph (Definition)' | 'Ordered List (Step-by-step)' | 'Unordered List (Checklist)' | 'Comparison Table';
  wordCountInAnswer: number; // Google snippets prefer 40-60 words
  isAnswerWithinSnippetLength: boolean;
  generatedMetaTags: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    schemaFaq: {
      '@type': 'Question';
      name: string;
      acceptedAnswer: {
        '@type': 'Answer';
        text: string;
      };
    };
    snippetHintTag: string;
  };
}

/**
 * Extracts raw textual content from an Article for natural language analysis
 */
export function extractArticleText(article: Article): string {
  if (article.mdxContent) return article.mdxContent;
  if (typeof article.content === 'string') return article.content;
  if (Array.isArray(article.content)) {
    return article.content
      .map((item) => (typeof item === 'string' ? item : item.alt || ''))
      .join('\n\n');
  }
  return `${article.title}. ${article.desc || ''}`;
}

/**
 * Detects the Search Intent type based on title, description, category, and tags
 */
export function detectSearchIntent(article: Article): { primary: SearchIntentType; secondary?: SearchIntentType } {
  const combined = `${article.title} ${article.desc || ''} ${article.cat || ''} ${(article.tags || []).join(' ')}`.toLowerCase();

  // Transactional signals
  if (
    /harga|biaya|tarif|sewa|beli|jasa|order|pesan|promo|diskon|hire|quote|paket|pricelist/i.test(combined)
  ) {
    return { primary: 'Transactional', secondary: 'Commercial' };
  }

  // Commercial Investigation signals
  if (
    /terbaik|rekomendasi|review|ulasan|perbandingan|vs|pilihan|alternatif|checklist|kriteria|keunggulan|memilih/i.test(combined)
  ) {
    return { primary: 'Commercial', secondary: 'Informational' };
  }

  // Navigational signals
  if (
    /mengenal|profil|tentang|founder|perjalanan|kontak|login|portal|hubungi/i.test(combined)
  ) {
    return { primary: 'Navigational', secondary: 'Informational' };
  }

  // Default to Informational (panduan, apa itu, bagaimana, tutorial, cara, alasan, tren, arsitektur)
  return {
    primary: 'Informational',
    secondary: /bsd|cisauk|tangerang|jakarta/i.test(combined) ? 'Commercial' : undefined
  };
}

/**
 * Extracts the target focus keyword from title and tags
 */
export function extractTargetKeyword(article: Article): string {
  if (article.tags && article.tags.length > 0) {
    // Pick the most relevant tag
    const prioritized = article.tags.find((t) => !['Web', 'Dev', 'Article'].includes(t));
    if (prioritized) return prioritized;
  }

  // Clean title
  const cleanTitle = article.title
    .replace(/^mengapa\s+|^bagaimana\s+|^panduan\s+|^cara\s+|^mengenal\s+/i, '')
    .trim();
  
  return cleanTitle.split(':')[0].trim();
}

/**
 * Synthesizes the Question-Answer-Reasoning (QAR) structure for an article.
 * Formatted specifically to satisfy Google Featured Snippet requirements (40-60 words answer).
 */
export function synthesizeQAR(article: Article, intent: SearchIntentType): QARStructure {
  const targetKeyword = extractTargetKeyword(article);
  const text = extractArticleText(article);

  // Generate appropriate Question based on intent and title
  let question = `Apa itu ${targetKeyword} dan mengapa penting untuk bisnis di 2026?`;
  if (/mengapa/i.test(article.title)) {
    question = article.title.includes('?') ? article.title : `${article.title}?`;
  } else if (/panduan|cara/i.test(article.title)) {
    question = `Bagaimana cara implementasi ${targetKeyword} dengan hasil optimal?`;
  } else if (/memilih|terbaik/i.test(article.title)) {
    question = `Bagaimana kriteria memilih solusi ${targetKeyword} yang tepat?`;
  } else if (intent === 'Transactional') {
    question = `Berapa estimasi investasi dan keunggulan layanan ${targetKeyword}?`;
  }

  // Derive concise direct answer (Aiming for 40-58 words for Answer Box prominence)
  let directAnswer = '';
  
  // Try to find definition sentence from text
  const sentences = text
    .replace(/[#*`_\[\]()]/g, '')
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && !s.startsWith('http'));

  const definitionMatch = sentences.find((s) =>
    /adalah|merupakan|yaitu|berfungsi untuk|solusi/i.test(s) &&
    s.length >= 60 &&
    s.length <= 320
  );

  if (definitionMatch) {
    directAnswer = definitionMatch;
  } else if (article.desc && article.desc.length > 40) {
    directAnswer = article.desc;
  } else {
    directAnswer = `${targetKeyword} adalah solusi strategis modern yang menggabungkan efisiensi arsitektur digital terdepan dengan optimasi performa tinggi untuk mempercepat skalabilitas bisnis tanpa hambatan teknis.`;
  }

  // Ensure directAnswer has conclusive sentence for snippet context if too short
  const words = directAnswer.split(/\s+/).filter(Boolean);
  if (words.length < 38) {
    directAnswer += ` Pendekatan ini memastikan kepatuhan teknis Core Web Vitals dan efisiensi konversi yang terukur.`;
  }

  // Derive Reasoning (The "Why" and contextual verification for Search Generative Experience / SGE)
  const reasoning = `Google memilih konten yang memberikan jawaban instan (direct answer) di 50 kata pertama, didukung struktur semantik teruji. Format ini memvalidasi otoritas teknis dengan konteks ${article.cat || 'Tech'} dan relevansi industri 2026.`;

  return {
    question,
    answer: directAnswer,
    reasoning
  };
}

/**
 * Calculates Snippet Readiness Score (0 - 100) based on Google Featured Snippet guidelines
 */
export function calculateSnippetReadiness(
  article: Article,
  qar: QARStructure
): {
  score: number;
  format: 'Paragraph (Definition)' | 'Ordered List (Step-by-step)' | 'Unordered List (Checklist)' | 'Comparison Table';
  wordCount: number;
  isWithinOptimalLength: boolean;
} {
  const text = extractArticleText(article);
  const words = qar.answer.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Google ideal snippet length is 40 - 60 words
  const isWithinOptimalLength = wordCount >= 35 && wordCount <= 65;

  let format: 'Paragraph (Definition)' | 'Ordered List (Step-by-step)' | 'Unordered List (Checklist)' | 'Comparison Table' = 'Paragraph (Definition)';
  if (/\bvs\b|perbandingan|tabel/i.test(article.title + text)) {
    format = 'Comparison Table';
  } else if (/1\.\s|2\.\s|langkah|tahap/i.test(text)) {
    format = 'Ordered List (Step-by-step)';
  } else if (/-\s|\*\s|checklist/i.test(text)) {
    format = 'Unordered List (Checklist)';
  }

  let score = 0;

  // 1. Direct Answer Presence & Length (35 pts)
  if (isWithinOptimalLength) score += 35;
  else if (wordCount >= 25 && wordCount <= 80) score += 25;
  else score += 15;

  // 2. Question clarity and H2/H3 alignment (25 pts)
  const hasQuestionInContent = text.toLowerCase().includes('?') || /apa itu|bagaimana|mengapa/i.test(text);
  if (hasQuestionInContent) score += 25;
  else score += 12;

  // 3. Structural Formatting (List/Definition/Table) (20 pts)
  const hasLists = /-\s|1\.\s|\*\s/i.test(text);
  const hasDefinition = /adalah|merupakan|yaitu/i.test(qar.answer);
  if (hasLists && hasDefinition) score += 20;
  else if (hasLists || hasDefinition) score += 14;
  else score += 8;

  // 4. Local Relevance & Brand Authority Context (20 pts)
  const hasGeoEntity = /bsd|cisauk|tangerang|jakarta|indonesia|enterprise/i.test(text);
  if (hasGeoEntity) score += 20;
  else score += 10;

  return {
    score: Math.min(100, Math.max(10, score)),
    format,
    wordCount,
    isWithinOptimalLength
  };
}

/**
 * Automatically synthesizes Search Intent and Featured Snippet meta tags
 */
export function analyzeArticleSearchIntent(article: Article): SearchIntentAnalysis {
  const { primary, secondary } = detectSearchIntent(article);
  const targetKeyword = extractTargetKeyword(article);
  const qar = synthesizeQAR(article, primary);
  const snippetStats = calculateSnippetReadiness(article, qar);

  // Generate Meta Tags
  const metaTitle = `${qar.question.replace(/\?$/, '')} | CHESTAADOTCOM`;
  const metaDescription = qar.answer.length > 160 ? `${qar.answer.substring(0, 157)}...` : qar.answer;
  const metaKeywords = [
    targetKeyword.toLowerCase(),
    `${targetKeyword.toLowerCase()} bsd`,
    `${targetKeyword.toLowerCase()} 2026`,
    primary.toLowerCase(),
    'featured snippet',
    ...(article.tags || []).map((t) => t.toLowerCase())
  ];

  return {
    slug: article.slug,
    title: article.title,
    category: article.cat || 'Technology',
    primaryIntent: primary,
    secondaryIntent: secondary,
    targetKeyword,
    qar,
    snippetReadinessScore: snippetStats.score,
    snippetFormat: snippetStats.format,
    wordCountInAnswer: snippetStats.wordCount,
    isAnswerWithinSnippetLength: snippetStats.isWithinOptimalLength,
    generatedMetaTags: {
      metaTitle,
      metaDescription,
      metaKeywords,
      schemaFaq: {
        '@type': 'Question',
        name: qar.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: qar.answer
        }
      },
      snippetHintTag: `<meta name="google-snippet-format" content="${snippetStats.format.toLowerCase()}" data-intent="${primary.toLowerCase()}" />`
    }
  };
}

/**
 * Analyzes all articles in the system
 */
export function analyzeAllArticles(articles: Article[]): SearchIntentAnalysis[] {
  return articles.map(analyzeArticleSearchIntent);
}
