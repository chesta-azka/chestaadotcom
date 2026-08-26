const fs = require('fs');

let code = fs.readFileSync('src/pages/ProjectDetailPage.tsx', 'utf-8');

// Replace MetaTags with SEOProvider
code = code.replace(/import MetaTags from '\.\.\/components\/atoms\/MetaTags';/g, "import SEOProvider from '../components/atoms/SEOProvider';");
code = code.replace(/<MetaTags/g, "<SEOProvider");
code = code.replace(/<\/MetaTags>/g, "</SEOProvider>");

fs.writeFileSync('src/pages/ProjectDetailPage.tsx', code);
