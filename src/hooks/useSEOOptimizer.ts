import { useEffect } from 'react';

interface SEOOptimizerProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  author?: string;
}

export function useSEOOptimizer({
  title,
  description,
  image = 'https://chestaa.com/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://chestaa.com',
  type = 'website',
  publishedTime,
  author = 'Chesta Azka Sofyan'
}: SEOOptimizerProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string, isProperty = false) => {
      const selector = `meta[${attrName}="${attrValue}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard & OpenGraph Tags
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title, true);
    setMetaTag('property', 'og:description', description, true);
    setMetaTag('property', 'og:image', image, true);
    setMetaTag('property', 'og:image:secure_url', image, true);
    setMetaTag('property', 'og:image:alt', title, true);
    setMetaTag('property', 'og:url', url, true);
    setMetaTag('property', 'og:type', type, true);

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:image:alt', title);

    // Article Specific Metadata
    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime, true);
    }
    if (author) {
      setMetaTag('property', 'article:author', author, true);
    }
  }, [title, description, image, url, type, publishedTime, author]);
}
