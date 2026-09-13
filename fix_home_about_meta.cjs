const fs = require('fs');

let code = fs.readFileSync('src/pages/HomePage.tsx', 'utf8');
code = code.replace(
  /title="Jasa Pembuatan Website Premium & AI Agentic - CHESTAADOTCOM"/,
  'title="Software House BSD City & Cisauk | Web Dev & AI Automation"'
);
code = code.replace(
  /description="CHESTAADOTCOM by Chesta Azka Sofyan - Jasa pembuatan website corporate premium dan otomasi bisnis dengan Agentic AI\."/,
  'description="Software House premium di BSD City dan Cisauk. Layanan profesional IT Services, High-Performance Web Development, dan AI Automation untuk skala Enterprise."'
);
fs.writeFileSync('src/pages/HomePage.tsx', code);

code = fs.readFileSync('src/pages/AboutPage.tsx', 'utf8');
code = code.replace(
  /title="Tentang - Profil Agency \| CHESTAADOTCOM"/,
  'title="Tentang Kami | Software House BSD City & Cisauk"'
);
code = code.replace(
  /description="Pelajari visi dan keahlian rekayasa perangkat lunak dari CHESTAADOTCOM\."/,
  'description="Pelajari visi CHESTAADOTCOM sebagai software house elit di BSD City dan Cisauk yang berfokus pada Web Development dan AI Automation."'
);
fs.writeFileSync('src/pages/AboutPage.tsx', code);
