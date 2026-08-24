const fs = require('fs');
const path = 'src/pages/HomePage.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(/"AI CAPABILITIES"/g, '"KAPABILITAS AI"');
code = code.replace(/"OUR SERVICES"/g, '"LAYANAN KAMI"');
code = code.replace(/"ENTERPRISE WORKFLOW"/g, '"ALUR KERJA KORPORASI"');
code = code.replace(/"AI ROADMAP SIMULATOR"/g, '"SIMULATOR ROADMAP AI"');
code = code.replace(/"CLIENT SUCCESS"/g, '"KESUKSESAN KLIEN"');
code = code.replace(/"PROJECT GALLERY"/g, '"GALERI PROYEK"');
code = code.replace(/"INVESTMENT"/g, '"INVESTASI"');
code = code.replace(/"FAQ"/g, '"TANYA JAWAB (FAQ)"');
code = code.replace(/"GET IN TOUCH"/g, '"HUBUNGI KAMI"');
code = code.replace(/"INSIGHTS & BLOG"/g, '"WAWASAN & ARTIKEL"');
code = code.replace(/"TECH TRENDS"/g, '"TREN TEKNOLOGI"');

fs.writeFileSync(path, code);
