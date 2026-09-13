const fs = require('fs');

let blogCode = fs.readFileSync('src/pages/BlogPostPage.tsx', 'utf8');

blogCode = blogCode.replace(
  /<Helmet>\s*<title>\{post\.title\} \| CHESTAADOTCOM Insights<\/title>\s*<\/Helmet>/g,
  `<MetaTags 
        title={\`\${post.title} | CHESTAADOTCOM Journal\`}
        description={post.desc}
        path={\`/blog/\${post.slug}\`}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Blog', item: '/blog' }, { name: post.title, item: \`/blog/\${post.slug}\` }]}
        schemaString={JSON.stringify(generateArticleSchema(post.title, post.desc, \`https://chestaa.com/blog/\${post.slug}\`, post.coverImage, post.date))}
      />`
);

fs.writeFileSync('src/pages/BlogPostPage.tsx', blogCode);
