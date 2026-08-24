import fs from 'fs';
import path from 'path';

// Define the static routes
const staticRoutes = [
  '/',
  '/services',
  '/projects',
  '/blog',
  '/about',
  '/contact'
];

// Define dynamic data
const services = [
  'web-development', 'ai-agents', 'shopify-optimization', 'cloud-infrastructure',
  'landing-page-conversion', 'seo-auditing', 'bot-automation', 'api-integration',
  'performance-tuning', 'ui-ux-prototyping'
];

const areas = [
  'jakarta', 'bandung', 'surabaya', 'semarang', 'yogyakarta', 'malang',
  'medan', 'bali', 'makassar', 'tangerang', 'bekasi', 'depok', 'bogor',
  'bsd city', 'cisauk'
];

const baseUrl = 'https://chestadotcom.com';

function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Add service routes
  services.forEach(slug => {
    xml += `  <url>\n    <loc>${baseUrl}/layanan/${slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  });

  // Add area routes
  areas.forEach(city => {
    // Format city for URL (e.g., 'bsd city' -> 'bsd-city')
    const formattedCity = city.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>\n    <loc>${baseUrl}/area/${formattedCity}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  });

  xml += '</urlset>';

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('Successfully generated sitemap.xml in public directory.');
}

generateSitemap();
