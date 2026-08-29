const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importTarget = `import BlogHubPage from './pages/BlogHubPage.tsx';`;
code = code.replace(importTarget, `import BlogHubPage from './pages/BlogHubPage.tsx';\nimport BlogPostPage from './pages/BlogPostPage.tsx';`);

const routeTarget = `<Route path="/blog" element={<PageWrapper><BlogHubPage /></PageWrapper>} />`;
code = code.replace(routeTarget, `<Route path="/blog" element={<PageWrapper><BlogHubPage /></PageWrapper>} />\n            <Route path="/blog/:slug" element={<PageWrapper><BlogPostPage /></PageWrapper>} />`);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx patched for blog');
