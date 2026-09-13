const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');
code = code.replace(
  /title="Masterclass AI & Web Dev \| CHESTAADOTCOM"/,
  'title="Masterclass AI & Web Dev di BSD City & Cisauk | CHESTAADOTCOM"'
);
code = code.replace(
  /description="Ikuti masterclass intensif untuk menguasai pengembangan aplikasi web modern dengan Agentic AI dan arsitektur Next\.js\."/,
  'description="Ikuti masterclass intensif di BSD City & Cisauk untuk menguasai pengembangan aplikasi web modern dengan Agentic AI dan Next.js."'
);
fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);

code = fs.readFileSync('src/pages/AcademyResourcesPage.tsx', 'utf8');
code = code.replace(
  /title="Resource Library - Web Dev & AI \| CHESTAADOTCOM"/,
  'title="Resource Library - Web Dev & AI | CHESTAADOTCOM BSD & Cisauk"'
);
code = code.replace(
  /description="Kumpulan resource gratis, e-book, dan snippet kode untuk membantu perjalanan Anda menjadi top-tier developer\."/,
  'description="Kumpulan resource gratis, e-book, dan snippet kode dari pakar tech di BSD City & Cisauk untuk membantu perjalanan Anda menjadi top-tier developer."'
);
fs.writeFileSync('src/pages/AcademyResourcesPage.tsx', code);

