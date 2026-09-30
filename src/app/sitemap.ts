import { MetadataRoute } from 'next';
import { insightsData } from '../data/insights';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chestaa.com';

  const industries = ['enterprise', 'fintech', 'logistik', 'e-commerce', 'saas', 'properti', 'manufaktur'];
  const cities = ['jakarta', 'tangerang', 'bsd-city', 'surabaya', 'bandung', 'medan', 'bali'];

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kamus-ai-teknologi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  // Dynamic Insights routes (/insights/[slug])
  const insightRoutes: MetadataRoute.Sitemap = insightsData.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: new Date(article.date || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Programmatic SEO routes (/services/[industry]/[city])
  const pseoRoutes: MetadataRoute.Sitemap = [];
  for (const industry of industries) {
    for (const city of cities) {
      pseoRoutes.push({
        url: `${baseUrl}/services/${industry}/${city}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    }
  }

  return [...staticRoutes, ...insightRoutes, ...pseoRoutes];
}
