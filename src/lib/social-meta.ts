import { ALL_ARTICLES } from '../data/blogData.ts';
import { PROJECTS } from '../data/projects.ts';

export function getMetaTagsForUrl(url: string) {
  // Parse URL
  let pathname = url;
  let searchParams = new URLSearchParams();
  try {
    const parsed = new URL('https://chestaa.com' + url);
    pathname = parsed.pathname;
    searchParams = parsed.searchParams;
  } catch (e) {
    // Ignore invalid urls
  }

  const defaultMeta = {
    title: 'CHESTAADOTCOM | Premium Web Development & AI Solutions',
    description: 'Elevate your brand with CHESTAADOTCOM. We build lightning-fast web applications, integrate custom AI solutions, and drive measurable digital transformation.',
    image: 'https://chestaadotcom.com/default-og.png',
    url: 'https://chestaadotcom.com' + url,
    type: 'website'
  };

  // Blog Post
  if (pathname === '/blog' && searchParams.has('read')) {
    const slug = searchParams.get('read');
    const article = ALL_ARTICLES.find(a => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} | CHESTAADOTCOM Journal`,
        description: article.desc,
        image: article.image || defaultMeta.image,
        url: defaultMeta.url,
        type: 'article'
      };
    }
  }

  // Project Portfolio
  if (pathname.startsWith('/portfolio/')) {
    const id = pathname.replace('/portfolio/', '').split('/')[0];
    const project = PROJECTS.find(p => p.id === id);
    if (project) {
      return {
        title: `${project.title} - ${project.category} | CHESTAADOTCOM`,
        description: project.description || `Lihat portofolio ${project.title} oleh CHESTAADOTCOM.`,
        image: project.thumbnail || defaultMeta.image,
        url: defaultMeta.url,
        type: 'website'
      };
    }
  }

  // Other specific pages
  if (pathname === '/services') {
    return {
      ...defaultMeta,
      title: 'Layanan Kami | Web Dev & AI Solutions',
    };
  }

  if (pathname === '/blog') {
    return {
      ...defaultMeta,
      title: 'Insight & Journal | CHESTAADOTCOM',
    };
  }

  return defaultMeta;
}

export function injectSocialMeta(html: string, url: string): string {
  const meta = getMetaTagsForUrl(url);

  const tags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:site_name" content="CHESTAADOTCOM" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${meta.url}" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.image}" />
  `;

  // Insert before </head>, removing existing simple tags to prevent duplicates if possible,
  // but Helmet will also update tags on the client side. The injected tags will serve bots perfectly.
  // We can just inject them before </head>.
  return html.replace('</head>', `\n${tags}\n</head>`);
}
