const fs = require('fs');

function addDynamicMetaTags(file, importStr, componentReplacementRegex, newComponent) {
  if (!fs.existsSync(file)) return;
  
  let code = fs.readFileSync(file, 'utf8');
  
  if (!code.includes("import MetaTags")) {
    code = code.replace(
      /(import .*?;)/,
      `$1\nimport MetaTags from '../components/atoms/MetaTags';\n${importStr}`
    );
  }

  if (!code.includes("<MetaTags")) {
    code = code.replace(componentReplacementRegex, newComponent);
  }
  
  fs.writeFileSync(file, code);
}

// ProjectDetailPage.tsx
// Needs to grab `project` object dynamically
let projectCode = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf8');
if (!projectCode.includes('import MetaTags')) {
  projectCode = projectCode.replace(
    /import \{ useParams, Link, useNavigate \} from 'react-router-dom';/,
    `import { useParams, Link, useNavigate } from 'react-router-dom';\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generatePortfolioSchema } from '../lib/seo';`
  );
  
  // Inject after <main
  projectCode = projectCode.replace(
    /<main className="min-h-screen bg-white font-sans selection:bg-purple-200 selection:text-purple-950 pt-24 md:pt-32">/,
    `<main className="min-h-screen bg-white font-sans selection:bg-purple-200 selection:text-purple-950 pt-24 md:pt-32">
      <MetaTags 
        title={\`\${project.title} - Portfolio | CHESTAADOTCOM\`}
        description={project.description}
        path={\`/portfolio/\${project.id}\`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Portfolio', item: '/portfolio' }, { name: project.title, item: \`/portfolio/\${project.id}\` }]}
        schemaString={JSON.stringify(generatePortfolioSchema(project.title, project.description, \`https://chestaa.com/portfolio/\${project.id}\`, project.image))}
      />`
  );
  fs.writeFileSync('src/pages/ProjectDetailPage.tsx', projectCode);
}


// CaseStudyDetailPage.tsx
let caseCode = fs.readFileSync('src/pages/CaseStudyDetailPage.tsx', 'utf8');
if (!caseCode.includes('import MetaTags')) {
  caseCode = caseCode.replace(
    /import \{ useParams, Link \} from 'react-router-dom';/,
    `import { useParams, Link } from 'react-router-dom';\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generateCaseStudySchema } from '../lib/seo';`
  );
  
  caseCode = caseCode.replace(
    /<div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32">/,
    `<div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32">
      <MetaTags 
        title={\`Case Study: \${study.client} | CHESTAADOTCOM\`}
        description={study.challenge.substring(0, 150) + '...'}
        path={\`/case-studies/\${study.id}\`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Case Studies', item: '/case-studies' }, { name: study.client, item: \`/case-studies/\${study.id}\` }]}
        schemaString={JSON.stringify(generateCaseStudySchema(study.client, study.challenge, \`https://chestaa.com/case-studies/\${study.id}\`))}
      />`
  );
  fs.writeFileSync('src/pages/CaseStudyDetailPage.tsx', caseCode);
}

// BlogPostPage.tsx
let blogCode = fs.readFileSync('src/pages/BlogPostPage.tsx', 'utf8');
if (!blogCode.includes('import MetaTags')) {
  blogCode = blogCode.replace(
    /import \{ useParams, Link, useNavigate \} from 'react-router-dom';/,
    `import { useParams, Link, useNavigate } from 'react-router-dom';\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generateArticleSchema } from '../lib/seo';`
  );
  
  blogCode = blogCode.replace(
    /<div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32">/,
    `<div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-900 pt-24 md:pt-32">
      <MetaTags 
        title={\`\${article.title} | CHESTAADOTCOM Journal\`}
        description={article.desc}
        path={\`/blog/\${article.slug}\`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Blog', item: '/blog' }, { name: article.title, item: \`/blog/\${article.slug}\` }]}
        schemaString={JSON.stringify(generateArticleSchema(article.title, article.desc, \`https://chestaa.com/blog/\${article.slug}\`, article.coverImage, article.date))}
      />`
  );
  fs.writeFileSync('src/pages/BlogPostPage.tsx', blogCode);
}
