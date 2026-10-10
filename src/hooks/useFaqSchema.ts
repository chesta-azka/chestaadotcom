import { useMemo } from 'react';

export interface FAQEntry {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

export function useFaqSchema(faqs: FAQEntry[]): string {
  return useMemo(() => {
    if (!faqs || faqs.length === 0) return '';

    const validItems = faqs
      .map((item) => {
        const question = (item.question || item.q || '').trim();
        const rawAnswer = (item.answer || item.a || '').trim();
        const answer = rawAnswer
          .replace(/<[^>]*>/g, '')
          .replace(/\*\*/g, '')
          .replace(/`/g, '')
          .trim();
        return { question, answer };
      })
      .filter((item) => item.question.length > 0 && item.answer.length > 0);

    if (validItems.length === 0) return '';

    const schemaMarkup = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': validItems.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer,
        },
      })),
    };

    return JSON.stringify(schemaMarkup);
  }, [faqs]);
}
