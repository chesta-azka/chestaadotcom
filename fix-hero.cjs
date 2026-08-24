const fs = require('fs');
const path = 'src/components/organisms/HeroSection.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace('ENTERPRISE DIGITAL ARCHITECT', 'AGENCY WEB DEVELOPMENT');
code = code.replace('Intelligent Digital <br className="hidden sm:block"/>', 'Jasa Pembuatan Website <br className="hidden sm:block"/>');
code = code.replace('Transformation.', 'Premium & Profesional.');

fs.writeFileSync(path, code);
