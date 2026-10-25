import React from 'react';
import { FAQEntry } from '../../lib/seo/faqSchema';

/**
 * FAQSchema component is now a no-op wrapper because all FAQPage structured data
 * is emitted inside the single unified @graph JSON-LD block via SEOMetadata & social-meta.ts
 * using generateFaqSchema / buildFaqSchemaNode. This prevents duplicate FAQPage JSON-LD scripts.
 */
export type FAQItem = FAQEntry;

export default function FAQSchema(_props: {
  faqs: (FAQEntry | { question: string; answer: string } | { q: string; a: string })[];
}) {
  return null;
}
