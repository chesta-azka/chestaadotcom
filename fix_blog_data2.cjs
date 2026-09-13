const fs = require('fs');
let code = fs.readFileSync('src/data/blogData.ts', 'utf8');

if (!code.includes('itConsultationJabodetabekMdx')) {
  // Add imports
  code = code.replace(
    /import \{ aiEcosystemBsdMdx \} from '\.\.\/content\/aiEcosystemBsdArticle';/,
    "import { aiEcosystemBsdMdx } from '../content/aiEcosystemBsdArticle';\nimport { itConsultationJabodetabekMdx } from '../content/itConsultationJabodetabekArticle';\nimport { premiumWebDevJabodetabekMdx } from '../content/premiumWebDevJabodetabekArticle';"
  );
  
  // Add article objects
  const newArticles = `
  {
    slug: 'it-consultation-transformasi-bisnis-jabodetabek',
    title: 'IT Consultation Terbaik untuk Transformasi Bisnis di Jabodetabek: Fokus Tangerang Selatan hingga Margonda',
    cat: 'IT Consultation',
    date: '28 Sep 2026',
    readTime: '6 MIN READ',
    readTimeMinutes: 6,
    desc: 'Layanan Full IT Consultation untuk Enterprise dan Startup di wilayah Tangerang, Jakarta, Depok, dan Bogor untuk transformasi digital terarah.',
    featured: true,
    recommended: true,
    tags: ['IT Services', 'Tangerang', 'Jakarta', 'Depok', 'Bogor'],
    content: [],
    mdxContent: itConsultationJabodetabekMdx,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'CHESTAADOTCOM',
      role: 'IT Consultant'
    }
  },
  {
    slug: 'premium-web-dev-enterprise-bsd-jakarta-bogor',
    title: 'Mengoptimalkan Skala Enterprise: Layanan IT & Web Development Premium dari BSD City ke Seluruh Jakarta dan Bogor',
    cat: 'Web Development',
    date: '30 Sep 2026',
    readTime: '5 MIN READ',
    readTimeMinutes: 5,
    desc: 'Tingkatkan kinerja web dan terapkan AI Automation untuk memperluas jangkauan pasar B2B Anda di seluruh wilayah Jabodetabek.',
    featured: false,
    recommended: true,
    tags: ['Web Development', 'AI Automation', 'Enterprise', 'Jabodetabek'],
    content: [],
    mdxContent: premiumWebDevJabodetabekMdx,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'CHESTAADOTCOM',
      role: 'Lead Architect'
    }
  },`;
  
  code = code.replace(
    /export const ALL_ARTICLES: Article\[\] = \[/,
    "export const ALL_ARTICLES: Article[] = [" + newArticles
  );
  
  fs.writeFileSync('src/data/blogData.ts', code);
}
