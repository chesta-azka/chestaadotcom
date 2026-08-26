const fs = require('fs');
let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// Replace all usages of 'service.techStack' with 'service.benefits' to fix the typing error since 'techStack' isn't on the type
code = code.replace(/service\.techStack/g, 'service.benefits');
code = code.replace(/svc\?\.techStack/g, 'svc?.benefits');

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
