import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GlossaryTerm } from '../../utils/glossaryUtils';

interface GlossarySchemaProps {
  item: GlossaryTerm;
}

export default function GlossarySchema({ item }: GlossarySchemaProps) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": `https://chestaa.com/kamus-ai-teknologi/${item.slug}#definedterm`,
        "name": item.term,
        "description": item.definition,
        "inDefinedTermSet": "https://chestaa.com/kamus-ai-teknologi",
        "about": {
          "@type": "Organization",
          "name": "Chestaa B2B Digital Agency",
          "url": "https://chestaa.com"
        }
      },
      {
        "@type": "Article",
        "@id": `https://chestaa.com/kamus-ai-teknologi/${item.slug}#article`,
        "headline": `Definisi & Penerapan ${item.term} untuk Korporat | Chestaa`,
        "description": `Panduan lengkap mengenai ${item.term} dan implementasi praktisnya oleh Chestaa B2B Digital Agency untuk klien enterprise di Indonesia.`,
        "author": {
          "@type": "Person",
          "name": "Chesta Azka",
          "jobTitle": "Principal AI System Architect"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Chestaa",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chestaa.com/favicon.ico"
          }
        },
        "about": {
          "@type": "Thing",
          "name": item.term,
          "description": item.definition
        },
        "mentions": [
          {
            "@type": "Organization",
            "name": "Chestaa B2B Digital Agency",
            "url": "https://chestaa.com"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json" key="glossary-schema">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
}
