const fs = require('fs');
let code = fs.readFileSync('src/data/blogData.ts', 'utf8');

if (!code.includes('aiEcosystemBsdMdx')) {
  // Add import
  code = code.replace(
    /import \{ aiAutomationSmallBusinesses2026Mdx \} from '\.\.\/content\/aiAutomationSmallBusinesses2026Article';/,
    "import { aiAutomationSmallBusinesses2026Mdx } from '../content/aiAutomationSmallBusinesses2026Article';\nimport { aiEcosystemBsdMdx } from '../content/aiEcosystemBsdArticle';"
  );
  
  // Add article object
  const newArticle = `
  {
    slug: 'masa-depan-ai-bsd-city-cisauk',
    title: 'Masa Depan AI di BSD City: Membangun Ekosistem Startup Teknologi',
    cat: 'Business & Tech',
    date: '24 Sep 2026',
    readTime: '6 MIN READ',
    readTimeMinutes: 6,
    desc: 'Menelusuri transformasi BSD City dan Cisauk sebagai pusat inovasi AI dan ekosistem startup teknologi terdepan di Indonesia.',
    featured: true,
    recommended: true,
    tags: ['AI', 'BSD City', 'Tech Startup', 'Business'],
    content: [],
    mdxContent: aiEcosystemBsdMdx,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'CHESTAADOTCOM',
      role: 'Head of Engineering'
    }
  },`;
  
  code = code.replace(
    /export const ALL_ARTICLES: Article\[\] = \[/,
    "export const ALL_ARTICLES: Article[] = [" + newArticle
  );
  
  fs.writeFileSync('src/data/blogData.ts', code);
}
