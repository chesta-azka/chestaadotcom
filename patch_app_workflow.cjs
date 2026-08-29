const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importTarget = `import AboutPage from './pages/AboutPage.tsx';`;
code = code.replace(importTarget, `import AboutPage from './pages/AboutPage.tsx';\nimport WorkflowPage from './pages/WorkflowPage.tsx';`);

// Add Route
const routeTarget = `<Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />`;
code = code.replace(routeTarget, `<Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />\n            <Route path="/workflow" element={<PageWrapper><WorkflowPage /></PageWrapper>} />`);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated successfully');
