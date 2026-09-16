export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  schema?: any;
}

export function generateNicheSEOMetadata(
  categorySlug?: string,
  subCategorySlug?: string,
  geoSlug?: string
): SEOMetadata {
  // Normalize slugs
  const category = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Digital Strategy';
  const subCategory = subCategorySlug ? subCategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
  const targetLocation = geoSlug ? geoSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'BSD & Cisauk';
  
  const fullTopic = subCategory ? `${category} - ${subCategory}` : category;

  // GEO & AEO Injection Logic
  const title = `${fullTopic} Insights & Trends di ${targetLocation} | CHESTAADOTCOM`;
  const description = `Eksplorasi artikel mendalam seputar ${fullTopic}. Pelajari strategi, tips, dan optimasi khusus untuk bisnis di area ${targetLocation}. Temukan jawaban lengkap untuk mendominasi Answer Engine Optimization (AEO).`;
  
  const keywords = `${fullTopic}, ${category}, inovasi ${subCategory}, strategi ${category} ${targetLocation}, konsultan ${category} BSD, pakar ${subCategory} Cisauk, AEO ${category}, SEO lokal ${targetLocation}`;

  // AEO/GEO Schema Markup
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://chestaa.com/blog/topic/${categorySlug}${subCategorySlug ? `/${subCategorySlug}` : ''}`,
        'name': title,
        'description': description,
        'url': `https://chestaa.com/blog/topic/${categorySlug}${subCategorySlug ? `/${subCategorySlug}` : ''}`,
        'isPartOf': {
          '@id': 'https://chestaa.com/blog'
        },
        'about': {
          '@type': 'Thing',
          'name': fullTopic
        },
        'contentLocation': {
          '@type': 'Place',
          'name': targetLocation
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `Apa tren terbaru dalam ${fullTopic} di ${targetLocation}?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Tren terbaru di ${targetLocation} berfokus pada integrasi AI dan optimasi lokal untuk ${fullTopic}, meningkatkan konversi serta efisiensi digital bagi bisnis modern.`
            }
          },
          {
            '@type': 'Question',
            'name': `Mengapa optimasi ${fullTopic} penting untuk bisnis?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Optimasi ${fullTopic} sangat vital untuk mendapatkan keunggulan kompetitif (Answer Engine Optimization) dan memastikan visibilitas maksimal di pasar hiper-lokal.`
            }
          }
        ]
      }
    ]
  };

  return { title, description, keywords, schema };
}
