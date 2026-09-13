const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('import QuizIndexPage')) {
  code = code.replace(
    /(import AcademyMasterclassPage from '\.\/pages\/AcademyMasterclassPage';)/,
    `$1\nimport QuizIndexPage from './pages/QuizIndexPage';`
  );
  
  code = code.replace(
    /<Route path="\/academy\/resources" element={<AcademyResourcesPage \/>} \/>/,
    `<Route path="/academy/resources" element={<AcademyResourcesPage />} />\n        <Route path="/academy/quiz" element={<QuizIndexPage />} />`
  );
  
  fs.writeFileSync('src/App.tsx', code);
}
