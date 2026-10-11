import { MetadataRoute } from 'next';
import { ALL_ARTICLES } from '@/data/blogData';
import { ARCHITECTURAL_TEARDOWNS } from '@/data/teardowns';
import { glossaryTerms } from '@/data/glossary';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chestaadotcom.com';

  const staticPages = [
    '',
    '/services',
    '/teardowns',
    '/kamus-it',
    '/blog',
    '/portfolio',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogPages = ALL_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const teardownPages = ARCHITECTURAL_TEARDOWNS.map((teardown) => ({
    url: `${baseUrl}/teardowns/${teardown.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const glossaryPages = glossaryTerms.map((term) => ({
    url: `${baseUrl}/kamus-it/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...teardownPages, ...glossaryPages];
}
