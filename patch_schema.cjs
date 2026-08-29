const fs = require('fs');
let code = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

const targetStr = `  const relatedStudies = caseStudyDB.filter(s => s.id !== study.id).slice(0, 3);

  return (
    <main className="relative min-h-screen flex flex-col items-center pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950">`;

const replaceStr = `  const relatedStudies = caseStudyDB.filter(s => s.id !== study.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "TechArticle"],
    "headline": \`\${study.client} - \${study.title} | B2B Case Study in BSD City, Cisauk\`,
    "description": study.desc,
    "abstract": study.roi,
    "keywords": ["B2B Software", "Tech Architecture", "BSD City", "Cisauk", "Case Study", study.client],
    "author": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "url": "https://chestaa.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "url": "https://chestaa.com"
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/app/case-studies/[slug]/page.tsx', code);
console.log('Patched JSON-LD Schema');
