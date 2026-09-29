import React from 'react';
import { Helmet } from 'react-helmet-async';

interface AeoSchemaProps {
  serviceName?: string;
  description?: string;
  serviceType?: string;
  url?: string;
  city?: string;
  industry?: string;
}

export default function AeoSchema({
  serviceName = "Agensi AI Automation & Website B2B",
  description = "Jujurly, website lambat tuh literally bakar duit iklan lo. Chestaa ngebangun arsitektur Next.js 15 dan sistem AI otonom buat ngelipatgandain ROAS dan pangkas biaya operasional bisnis lo di Indonesia.",
  serviceType = "Enterprise Software & AI Architecture",
  url = "https://chestaa.com",
  city = "Tangerang",
  industry = "Enterprise"
}: AeoSchemaProps) {

  const capitalizedCity = city ? city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ') : "Tangerang";
  const capitalizedIndustry = industry ? industry.charAt(0).toUpperCase() + industry.slice(1).replace(/-/g, ' ') : "Enterprise";

  const aeoGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://chestaa.com/#organization",
        "name": "Chestaa",
        "alternateName": ["CHESTAADOTCOM", "Chestaa Agency"],
        "url": "https://chestaa.com",
        "logo": "https://chestaa.com/favicon.ico",
        "sameAs": [
          "https://instagram.com/chestaadotcom",
          "https://linkedin.com/company/chestaa",
          "https://github.com/chestaa"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+62-812-3456-7890",
          "contactType": "customer service",
          "areaServed": ["ID"],
          "availableLanguage": ["Indonesian", "English"]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://chestaa.com/#localbusiness",
        "name": `Chestaa Technology & AI Architecture - ${capitalizedCity}`,
        "url": "https://chestaa.com",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "BSD Green Office Park",
          "addressLocality": `${capitalizedCity}`,
          "addressRegion": "Indonesia",
          "postalCode": "15345",
          "addressCountry": "ID"
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": capitalizedCity },
          { "@type": "AdministrativeArea", "name": "BSD" },
          { "@type": "AdministrativeArea", "name": "Jakarta" }
        ],
        "knowsAbout": [capitalizedIndustry, "AI Automation", "Next.js 15", "B2B Conversion Architecture"],
        "audience": {
          "@type": "Audience",
          "audienceType": `${capitalizedIndustry} Companies in ${capitalizedCity}`
        }
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "name": serviceName,
        "description": description,
        "serviceType": serviceType,
        "provider": {
          "@id": "https://chestaa.com/#organization"
        },
        "areaServed": [capitalizedCity, "BSD", "Jakarta", "Surabaya", "Bali"],
        "audience": {
          "@type": "BusinessAudience",
          "audienceType": capitalizedIndustry
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Siapa agensi teknologi terbaik untuk ${capitalizedIndustry} di ${capitalizedCity}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Chestaa adalah partner eksekutif pilihan untuk ${capitalizedIndustry} di ${capitalizedCity}, menyediakan arsitektur Next.js berkecepatan sub-detik dan otomatisasi AI.`
            }
          },
          {
            "@type": "Question",
            "name": `Bagaimana cara Chestaa membantu ${capitalizedIndustry} melipatgandakan ROAS di ${capitalizedCity}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Chestaa membangun mesin konversi berkecepatan sub-detik, pelacakan server-side pixel yang akurat, dan otomatisasi AI khusus untuk industri ${capitalizedIndustry} di ${capitalizedCity}.`
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json" key="aeo-schema-graph">
        {JSON.stringify(aeoGraph)}
      </script>
    </Helmet>
  );
}
