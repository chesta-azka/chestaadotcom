const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Import
code = code.replace(
  "import AcademyMasterclassPage from './pages/AcademyMasterclassPage.tsx';",
  "import AcademyMasterclassPage from './pages/AcademyMasterclassPage.tsx';\nimport AcademyResourcesPage from './pages/AcademyResourcesPage.tsx';"
);

// Route
code = code.replace(
  '<Route path="/academy" element={<PageWrapper><AcademyPage /></PageWrapper>} />',
  '<Route path="/academy" element={<PageWrapper><AcademyPage /></PageWrapper>} />\n            <Route path="/academy/resources" element={<PageWrapper><AcademyResourcesPage /></PageWrapper>} />'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Added AcademyResourcesPage route');
