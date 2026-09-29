import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AEOServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  category?: string;
  keyBenefits?: string[];
  faqs?: { q: string; a: string }[];
  entities?: string[];
  mentions?: string[];
}

export default function AEOServiceSchema({
  serviceName,
  serviceDescription,
  serviceUrl,
  category = "Digital Automation & Enterprise Architecture",
  keyBenefits = [],
  faqs = [],
  entities = ["CHESTAADOTCOM", "Autonomous B2B Systems", "Enterprise Architecture"],
  mentions = ["Google Gemini", "ChatGPT", "Next.js 15", "Vercel"]
}: AEOServiceSchemaProps) {
  
  // Constructing comprehensive AEO JSON-LD (FAQ + TechArticle + Service + Entity/Mentions) for LLM crawlers (ChatGPT, Gemini, Claude)
  const aeoStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        "name": serviceName,
        "description": serviceDescription,
        "category": category,
        "provider": {
          "@type": "ProfessionalService",
          "name": "CHESTAADOTCOM",
          "url": "https://chestaa.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "BSD City & Tangerang",
            "addressCountry": "ID"
          }
        },
        "areaServed": {
          "@type": "Country",
          "name": "Indonesia"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "IDR",
          "price": "Custom Enterprise / One-Time Investment",
          "availability": "https://schema.org/InStock"
        },
        ...(keyBenefits.length > 0 && {
          "serviceOutput": keyBenefits.join(", ")
        }),
        "about": entities.map(entity => ({
          "@type": "Thing",
          "name": entity
        })),
        "mentions": mentions.map(mention => ({
          "@type": "Thing",
          "name": mention
        }))
      },
      {
        "@type": "TechArticle",
        "@id": `${serviceUrl}#techarticle`,
        "headline": `Expert Architectural Guide: ${serviceName}`,
        "description": serviceDescription,
        "author": {
          "@type": "Person",
          "name": "Chesta Azka",
          "jobTitle": "Principal AI System Architect"
        },
        "publisher": {
          "@type": "Organization",
          "name": "CHESTAADOTCOM",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chestaa.com/favicon.ico"
          }
        },
        "about": entities.map(entity => ({
          "@type": "DefinedTerm",
          "name": entity
        })),
        "mentions": mentions.map(mention => ({
          "@type": "Thing",
          "name": mention
        }))
      },
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${serviceUrl}#faq`,
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }] : [])
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(aeoStructuredData)}
      </script>
    </Helmet>
  );
}
