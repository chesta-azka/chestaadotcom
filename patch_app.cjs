const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove import lines for ServicesPage and ServiceDetailPage
code = code.replace(/import ServicesPage from '\.\/pages\/ServicesPage\.tsx';\n/, '');
code = code.replace(/import ServiceDetailPage from '\.\/pages\/ServiceDetailPage\.tsx';\n/, '');

// Remove Route lines
code = code.replace(/<Route path="\/services" element={<PageWrapper><ServicesPage \/><\/PageWrapper>} \/>\n\s*/, '');
code = code.replace(/<Route path="\/layanan\/:slug" element={<PageWrapper><ServiceDetailPage \/><\/PageWrapper>} \/>\n\s*/, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Cleaned up App.tsx imports and routes');
