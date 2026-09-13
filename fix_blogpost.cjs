const fs = require('fs');

let blogCode = fs.readFileSync('src/pages/BlogPostPage.tsx', 'utf8');

// The file has BlogSEO but not MetaTags. Wait, does it have BlogSEO?
// It renders <BlogSEO ... />? Let's check.
if (!blogCode.includes('import MetaTags')) {
  blogCode = blogCode.replace(
    /(import .*?;)/,
    `$1\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generateArticleSchema } from '../lib/seo';`
  );
  
  // Find where to inject MetaTags
  // It renders: return ( \n    <div className="min-h-screen...
  // Or: return ( \n    <article className="min-h-screen...
  // Let's just do a generic replace after `return (`
  
  blogCode = blogCode.replace(
    /<article className="min-h-screen bg-white pt-40 md:pt-48 pb-24 font-sans selection:bg-purple-200 selection:text-purple-900">/,
    `<article className="min-h-screen bg-white pt-40 md:pt-48 pb-24 font-sans selection:bg-purple-200 selection:text-purple-900">
      {article && (
        <MetaTags 
          title={\`\${article.title} | CHESTAADOTCOM Journal\`}
          description={article.desc}
          path={\`/blog/\${article.slug}\`}
          breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Blog', item: '/blog' }, { name: article.title, item: \`/blog/\${article.slug}\` }]}
          schemaString={JSON.stringify(generateArticleSchema(article.title, article.desc, \`https://chestaa.com/blog/\${article.slug}\`, article.coverImage, article.date))}
        />
      )}`
  );
  fs.writeFileSync('src/pages/BlogPostPage.tsx', blogCode);
}
