import { useEffect } from 'react';
import { parseDateToISOString } from '../../utils/dateUtils';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authorName?: string;
}

export default function BlogSEO({
  title,
  description,
  url,
  image = 'https://chestaadotcom.com/default-og.png', // Replace with your actual default OG image
  type = 'article',
  publishedTime,
  authorName = 'Chesta Azka Sofyan'
}: SEOProps) {
  useEffect(() => {
    // Generate JSON-LD Structured Data
    const generateJSONLD = () => {
      let schema: any = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebSite',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        headline: title,
        description: description,
        image: image,
        author: {
          '@type': 'Person',
          name: authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'CHESTAADOTCOM',
          logo: {
            '@type': 'ImageObject',
            url: 'https://chestaadotcom.com/logo.png', // Replace with your actual logo
          },
        },
      };

      const isoDate = parseDateToISOString(publishedTime);
      if (isoDate) {
        schema.datePublished = isoDate;
        schema.dateModified = isoDate;
      }

      return JSON.stringify(schema);
    };

    // Remove existing structured data script if exists
    const existingScript = document.getElementById('jsonld-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Inject new structured data
    const script = document.createElement('script');
    script.id = 'jsonld-structured-data';
    script.type = 'application/ld+json';
    script.text = generateJSONLD();
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [title, description, url, image, type, publishedTime, authorName]);

  return null; // This component doesn't render anything visually
}
