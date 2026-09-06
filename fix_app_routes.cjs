const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove AcademyTutorialPage import and route from React Router since it's now in App Router
content = content.replace("import AcademyTutorialPage from './pages/AcademyTutorialPage.tsx';\n", "");
content = content.replace('            <Route path="/academy/nextjs-crud" element={<PageWrapper><AcademyTutorialPage /></PageWrapper>} />\n', '');

fs.writeFileSync('src/App.tsx', content);
