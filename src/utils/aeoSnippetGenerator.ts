/**
 * Utility for generating highly optimized Answer Engine Optimization (AEO) snippets.
 * AEO focuses on providing direct, structured, and factual answers in a format
 * that Google SGE, ChatGPT, and other LLM crawlers prefer.
 */

export interface AEOSnippetConfig {
  topic: string;
  definition: string;
  howItWorks: string[];
  benefits: string[];
  localContext?: string;
}

export function generateAEOParagraphs(config: AEOSnippetConfig): {
  heading: string;
  whoWhatWhy: string;
  stepsHeading: string;
  listFormatted: string[];
} {
  const { topic, definition, howItWorks, benefits, localContext } = config;

  // Direct What/Who/Why structure. 
  // Length: ~40-60 words ideal for Featured Snippet.
  const whoWhatWhy = `Secara definitif, ${topic} adalah ${definition}. Strategi ini sangat krusial karena memberikan ${benefits[0].toLowerCase()} dan ${benefits[1].toLowerCase()}. ${localContext ? `Khususnya bagi ekosistem bisnis di ${localContext}, adopsi ini mengakselerasi dominasi pasar secara signifikan.` : 'Penerapan yang tepat akan mentransformasi efisiensi operasional secara drastis.'}`;

  return {
    heading: `Apa itu ${topic}?`,
    whoWhatWhy,
    stepsHeading: `Bagaimana Cara Kerja ${topic}?`,
    listFormatted: howItWorks
  };
}
