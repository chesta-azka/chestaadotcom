import { MetadataRoute } from 'next';
import { ALL_ARTICLES } from '../data/blogData';
import { PORTFOLIO_ITEMS } from '../data/portfolio';
import { generatePseoSlugs } from '../data/pseo-matrix';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chestaa.com';

  // 1. Static Core Routes
  const coreRoutes = ['', '/about', '/workflow', '/services', '/portfolio', '/case-studies', '/blog', '/trust', '/kamus-ai-teknologi'].map((route) => ({
    url: baseUrl + route,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  // 2. Dynamic Data Routes (Blogs, Portfolio)
  const blogUrls = ALL_ARTICLES.map((post) => ({
    url: baseUrl + '/blog/' + post.slug,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const portfolioUrls = PORTFOLIO_ITEMS.map((item) => ({
    url: baseUrl + '/portfolio/' + item.slug,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 3. Programmatic SEO (pSEO) Matrix Routes
  const pseoSlugs = generatePseoSlugs();
  const pseoUrls = pseoSlugs.map((slug) => ({
    url: baseUrl + '/area/' + slug,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...coreRoutes, ...blogUrls, ...portfolioUrls, ...pseoUrls];
}
