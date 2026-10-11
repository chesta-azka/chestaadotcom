import React from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface BlogFAQProps {
  faqs: FaqItem[];
}

export default function BlogFAQ({ faqs }: BlogFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="my-10 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 shadow-xl not-prose">
        <h3 className="text-xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
          <span>Pertanyaan Sering Diajukan (FAQ) Arsitektur Enterprise</span>
        </h3>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-5 last:border-b-0 last:pb-0">
              <h4 className="text-base font-semibold text-purple-400 mb-2">
                {faq.question}
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
