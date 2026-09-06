const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf8');

code = code.replace(
  /{ name: 'Portfolio', href: '\/portfolio', icon: Briefcase, subtitle: 'Studi Kasus & Hasil Nyata' },/,
  `{ name: 'Portfolio', href: '/portfolio', icon: Briefcase, subtitle: 'Galeri & Hasil Nyata' },
      { name: 'Case Studies', href: '/case-studies', icon: Briefcase, subtitle: 'Analisis Mendalam' },`
);

fs.writeFileSync('src/components/organisms/Header.tsx', code);
console.log('Fixed Header.tsx');
