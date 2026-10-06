import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog', '/insights', '/services', '/portfolio', '/case-studies', '/area', '/kamus-ai-teknologi', '/about', '/workflow', '/trust'],
      disallow: ['/admin', '/portal', '/workspace', '/client', '/api/'],
    },
    sitemap: 'https://chestaa.com/sitemap.xml',
  };
}
