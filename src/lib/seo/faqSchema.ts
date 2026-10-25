export interface FAQEntry {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

export interface FAQPageNode {
  '@context'?: string;
  '@type': 'FAQPage';
  '@id'?: string;
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}

export function sanitizeFaqEntries(faqs: FAQEntry[]): { question: string; answer: string }[] {
  if (!Array.isArray(faqs) || faqs.length === 0) return [];

  return faqs
    .map((item) => {
      const question = (item.question || item.q || '')
        .replace(/<[^>]*>/g, '')
        .trim();
      const rawAnswer = (item.answer || item.a || '').trim();
      const answer = rawAnswer
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .trim();
      return { question, answer };
    })
    .filter((item) => item.question.length > 0 && item.answer.length > 0);
}

/**
 * Generates a structured Schema.org FAQPage node (without redundant @context when used inside @graph)
 */
export function buildFaqSchemaNode(
  faqs: FAQEntry[],
  schemaId?: string,
  includeContext: boolean = false
): FAQPageNode | null {
  const validItems = sanitizeFaqEntries(faqs);
  if (validItems.length === 0) return null;

  const node: FAQPageNode = {
    ...(includeContext ? { '@context': 'https://schema.org' } : {}),
    '@type': 'FAQPage',
    ...(schemaId ? { '@id': schemaId } : {}),
    mainEntity: validItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return node;
}

/**
 * Automatically generates structured JSON-LD FAQ data string for any array of FAQ objects.
 */
export function generateFaqSchema(faqs: FAQEntry[], schemaId?: string): string {
  const node = buildFaqSchemaNode(faqs, schemaId, true);
  if (!node) return '';
  return JSON.stringify(node);
}
