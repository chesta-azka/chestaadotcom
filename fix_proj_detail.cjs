const fs = require('fs');

let code = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf8');

if (!code.includes('import MetaTags')) {
  code = code.replace(
    /(import .*?;)/,
    `$1\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generatePortfolioSchema } from '../lib/seo';`
  );
  
  code = code.replace(
    /<div className="min-h-screen bg-white font-sans text-slate-900 pt-32 pb-20 selection:bg-purple-100 selection:text-purple-900">/,
    `<div className="min-h-screen bg-white font-sans text-slate-900 pt-32 pb-20 selection:bg-purple-100 selection:text-purple-900">
      <MetaTags 
        title={\`\${project.title} - Portfolio | CHESTAADOTCOM\`}
        description={project.description}
        path={\`/portfolio/\${project.id}\`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Portfolio', item: '/portfolio' }, { name: project.title, item: \`/portfolio/\${project.id}\` }]}
        schemaString={JSON.stringify(generatePortfolioSchema(project.title, project.description, \`https://chestaa.com/portfolio/\${project.id}\`, project.image))}
      />`
  );
  fs.writeFileSync('src/pages/ProjectDetailPage.tsx', code);
}
