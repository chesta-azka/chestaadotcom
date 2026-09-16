import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  areasServed?: string[];
  localBusinessName?: string;
}

export default function FAQSchema({ 
  faqs,
  areasServed = ['BSD City', 'Cisauk', 'Tangerang', 'Tangerang Selatan'],
  localBusinessName = 'CHESTAADOTCOM'
}: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': 'https://chestaa.com/#faq',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://chestaa.com/#localbusiness',
        'name': localBusinessName,
        'image': 'https://chestaa.com/logo.png',
        'description': `Layanan optimasi Web, Geo-SEO, dan AI Agentic di area ${areasServed.join(', ')}.`,
        'url': 'https://chestaa.com',
        'telephone': '+6282125447232',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'BSD Green Office Park & Cisauk Hub',
          'addressLocality': 'BSD City, Cisauk, Tangerang',
          'addressRegion': 'Banten',
          'postalCode': '15345',
          'addressCountry': 'ID'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': -6.3042,
          'longitude': 106.6439
        },
        'areaServed': areasServed.map(area => ({
          '@type': 'City',
          'name': area
        })),
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday'
            ],
            'opens': '09:00',
            'closes': '18:00'
          }
        ]
      }
    ]
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
    />
  );
}
