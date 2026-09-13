const fs = require('fs');

function addMetaTags(file, metaTitle, metaDesc, schemaCode, breadcrumbs, importsStr) {
  if (!fs.existsSync(file)) return;
  
  let code = fs.readFileSync(file, 'utf8');
  
  // Clean up if already exists or broken
  if (!code.includes("import MetaTags")) {
    // Add import statement at the top after the first import block
    code = code.replace(
      /(import .*?;)/,
      `$1\nimport MetaTags from '../components/atoms/MetaTags';\n${importsStr}`
    );
  }

  // Inject MetaTags right after <main...> or <div className="min-h-screen...
  if (!code.includes("<MetaTags")) {
    const metaTagsComponent = `
      <MetaTags 
        title="${metaTitle}"
        description="${metaDesc}"
        path="${file.replace('src/pages', '').replace('Page.tsx', '').toLowerCase()}"
        breadcrumbs={${breadcrumbs}}
        ${schemaCode}
      />
    `;
    
    code = code.replace(
      /(<main[^>]*>|<div[^>]*min-h-screen[^>]*>)/,
      `$1\n${metaTagsComponent}`
    );
  }
  
  fs.writeFileSync(file, code);
}

addMetaTags(
  'src/pages/QuizIndexPage.tsx',
  'Tech & Web Dev Quiz | CHESTAADOTCOM Academy',
  'Uji kemampuan Anda dalam Full-Stack Web Development, React, dan AI melalui quiz interaktif dari CHESTAADOTCOM Academy.',
  "schemaString={JSON.stringify(generateQuizSchema('Web Dev & AI Quiz', 'Uji pengetahuan programming', 'https://chestaa.com/academy/quiz'))}",
  "[{ name: 'Home', item: '/' }, { name: 'Academy', item: '/academy' }, { name: 'Quiz', item: '/academy/quiz' }]",
  "import { generateQuizSchema } from '../lib/seo';"
);

addMetaTags(
  'src/pages/AcademyQuizPage.tsx',
  'Interactive Coding Quiz | CHESTAADOTCOM Academy',
  'Evaluasi pemahaman Anda dalam Next.js, Node.js, dan arsitektur AI modern dengan tes interaktif langsung.',
  "schemaString={JSON.stringify(generateQuizSchema('Advanced Coding Quiz', 'Interactive Web Dev Assessment', 'https://chestaa.com/academy/quiz/active'))}",
  "[{ name: 'Home', item: '/' }, { name: 'Academy', item: '/academy' }, { name: 'Quiz', item: '/academy/quiz' }]",
  "import { generateQuizSchema } from '../lib/seo';"
);

addMetaTags(
  'src/pages/CaseStudiesPage.tsx',
  'Case Studies & Portofolio Klien | CHESTAADOTCOM',
  'Eksplorasi studi kasus nyata bagaimana CHESTAADOTCOM mentransformasi bisnis B2B dan enterprise melalui web app dan Agentic AI.',
  "",
  "[{ name: 'Home', item: '/' }, { name: 'Case Studies', item: '/case-studies' }]",
  ""
);

