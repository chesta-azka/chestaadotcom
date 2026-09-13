const fs = require('fs');

let code = fs.readFileSync('src/pages/CaseStudyDetailPage.tsx', 'utf8');

if (!code.includes('import MetaTags')) {
  code = code.replace(
    /(import .*?;)/,
    `$1\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generateCaseStudySchema } from '../lib/seo';`
  );
  
  code = code.replace(
    /<main className="relative min-h-screen flex flex-col items-center pt-40 md:pt-48 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-\[#FAFAFC\] text-slate-900 selection:bg-purple-500\/20">/,
    `<main className="relative min-h-screen flex flex-col items-center pt-40 md:pt-48 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFAFC] text-slate-900 selection:bg-purple-500/20">
      <MetaTags 
        title={\`Case Study: \${study.client} | CHESTAADOTCOM\`}
        description={study.challenge.substring(0, 150) + '...'}
        path={\`/case-studies/\${study.slug}\`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Case Studies', item: '/case-studies' }, { name: study.client, item: \`/case-studies/\${study.slug}\` }]}
        schemaString={JSON.stringify(generateCaseStudySchema(study.client, study.challenge, \`https://chestaa.com/case-studies/\${study.slug}\`))}
      />`
  );
  
  // also remove the old raw helmet usage if possible, or jsonLd injecting script if it existed
  // The old file did dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} in a Helmet. Let's leave it or it's fine, MetaTags handles it well too.
  
  fs.writeFileSync('src/pages/CaseStudyDetailPage.tsx', code);
}
