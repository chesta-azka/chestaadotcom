import React, { useEffect } from 'react';

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
      // Clean any potential HTML tags for clean text rendering in Google Search Rich Results
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

  const jsonString = JSON.stringify(schemaMarkup);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let script = document.getElementById('faq-schema-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'faq-schema-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = jsonString;

    return () => {
      const el = document.getElementById('faq-schema-jsonld');
      if (el) el.remove();
    };
  }, [jsonString]);

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
