import React from 'react';
import { Helmet } from 'react-helmet-async';
import { InsightArticle } from '../../utils/insightsUtils';

interface InsightSchemaProps {
  article: InsightArticle;
}

export default function InsightSchema({ article }: InsightSchemaProps) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["NewsArticle", "TechArticle"],
        "@id": `https://chestaa.com/insights/${article.slug}#article`,
        "headline": article.title,
        "description": article.subtitle,
        "datePublished": article.publishedDate,
        "dateModified": article.publishedDate,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "jobTitle": article.author.role,
          "url": "https://chestaa.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Chestaa",
          "url": "https://chestaa.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chestaa.com/favicon.ico"
          },
          "sameAs": [
            "https://instagram.com/chestaadotcom",
            "https://linkedin.com/company/chestaa"
          ]
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://chestaa.com/insights/${article.slug}`
        },
        "about": article.mentions.map(m => ({
          "@type": "DefinedTerm",
          "name": m.term,
          "url": `https://chestaa.com/kamus-ai-teknologi/${m.slug}`
        })),
        "mentions": article.mentions.map(m => ({
          "@type": "Thing",
          "name": m.term,
          "url": `https://chestaa.com/kamus-ai-teknologi/${m.slug}`
        }))
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json" key="insight-news-schema">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
}
