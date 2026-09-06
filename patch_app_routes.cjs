const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importLines = `
import CaseStudiesPage from './pages/CaseStudiesPage.tsx';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage.tsx';
`;

code = code.replace(/import NotFoundPage from '\.\/pages\/NotFoundPage\.tsx';/, `import NotFoundPage from './pages/NotFoundPage.tsx';${importLines}`);

const routeLines = `
            <Route path="/case-studies" element={<PageWrapper><CaseStudiesPage /></PageWrapper>} />
            <Route path="/case-studies/:slug" element={<PageWrapper><CaseStudyDetailPage /></PageWrapper>} />
`;

code = code.replace(/<Route path="\*" element={<PageWrapper><NotFoundPage \/><\/PageWrapper>} \/>/, `${routeLines}            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />`);

fs.writeFileSync('src/App.tsx', code);
console.log('Added case studies routes to App.tsx');
