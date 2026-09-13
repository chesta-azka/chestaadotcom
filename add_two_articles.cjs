const fs = require('fs');
let code = fs.readFileSync('src/data/blogData.ts', 'utf8');

if (!code.includes('panduanTechStackMdx')) {
  code = code.replace(
    /import \{ itConsultationJabodetabekMdx \} from '\.\.\/content\/itConsultationJabodetabekArticle';/,
    "import { itConsultationJabodetabekMdx } from '../content/itConsultationJabodetabekArticle';\nimport { panduanTechStackMdx } from '../content/panduanTechStackArticle';\nimport { mengapaBsdButuhAiMdx } from '../content/mengapaBsdButuhAiArticle';"
  );
  
  const newArticles = `
  {
    slug: 'panduan-memilih-tech-stack-startup-indonesia',
    title: 'Panduan Memilih Tech Stack untuk Startup di Indonesia',
    cat: 'Tech Architecture',
    date: '02 Oct 2026',
    readTime: '5 MIN READ',
    readTimeMinutes: 5,
    desc: 'Strategi pemilihan tumpukan teknologi modern yang tepat untuk memastikan skalabilitas dan efisiensi biaya bagi startup di Indonesia.',
    featured: true,
    recommended: true,
    tags: ['Tech Stack', 'Startup', 'Next.js', 'Architecture'],
    content: [],
    mdxContent: panduanTechStackMdx,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'CHESTAADOTCOM',
      role: 'Chief Technology Officer'
    }
  },
  {
    slug: 'mengapa-bisnis-di-bsd-membutuhkan-automasi-ai',
    title: 'Mengapa Bisnis di BSD Membutuhkan Automasi AI',
    cat: 'AI Automation',
    date: '04 Oct 2026',
    readTime: '6 MIN READ',
    readTimeMinutes: 6,
    desc: 'Meneliti bagaimana adopsi Agentic AI dan otomasi cerdas dapat melipatgandakan efisiensi operasional bisnis di kawasan BSD City dan Cisauk.',
    featured: true,
    recommended: true,
    tags: ['AI Automation', 'BSD City', 'Enterprise', 'Efficiency'],
    content: [],
    mdxContent: mengapaBsdButuhAiMdx,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop',
    author: {
      name: 'CHESTAADOTCOM',
      role: 'AI Specialist'
    }
  },`;
  
  code = code.replace(
    /export const ALL_ARTICLES: Article\[\] = \[/,
    "export const ALL_ARTICLES: Article[] = [" + newArticles
  );
  
  fs.writeFileSync('src/data/blogData.ts', code);
}
