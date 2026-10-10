import React from 'react';

export interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

export default function FAQSchema({ 
  faqs 
}: { 
  faqs: (FAQItem | { question: string; answer: string } | { q: string; a: string })[] 
}) {
  if (!faqs || faqs.length === 0) return null;

  const validItems = faqs
    .map((item: any) => {
      const question = (item.question || item.q || '').trim();
      const rawAnswer = (item.answer || item.a || '').trim();
      // Clean any potential HTML/markdown tags for clean text rendering in Google Search Rich Results
      const answer = rawAnswer
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .trim();
      return { question, answer };
    })
    .filter(item => item.question.length > 0 && item.answer.length > 0);

  if (validItems.length === 0) return null;

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': validItems.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
    />
  );
}
