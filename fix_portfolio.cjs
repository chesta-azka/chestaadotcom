const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.tsx', 'utf8');

code = code.replace(
  /title="Portfolio \| CHESTAADOTCOM"/,
  'title="Portfolio & Case Studies di BSD City & Cisauk | CHESTAADOTCOM"'
);
code = code.replace(
  /description="Lihat hasil karya dan studi kasus pengembangan web serta implementasi AI dari CHESTAADOTCOM\."/,
  'description="Lihat hasil karya dan studi kasus pengembangan web berkinerja tinggi serta implementasi AI dari software house terbaik di BSD City & Cisauk."'
);

fs.writeFileSync('src/pages/PortfolioPage.tsx', code);
