const fs = require('fs');

// HeroSection.tsx
let hero = fs.readFileSync('src/components/organisms/HeroSection.tsx', 'utf-8');
hero = hero.replace(/strokeWidth=\{1\} size=\{20\} strokeWidth=\{1\.5\}/g, 'strokeWidth={1} size={20}');
fs.writeFileSync('src/components/organisms/HeroSection.tsx', hero);

// ServicesSection.tsx
let services = fs.readFileSync('src/components/organisms/ServicesSection.tsx', 'utf-8');
services = services.replace(/<ArrowUpRight strokeWidth=\{1\.5\} ([\s\S]*?) strokeWidth=\{1\.5\}/gm, '<ArrowUpRight strokeWidth={1} $1');
services = services.replace(/<ChevronDown strokeWidth=\{1\} ([\s\S]*?) strokeWidth=\{2\}/gm, '<ChevronDown strokeWidth={1} $1');
fs.writeFileSync('src/components/organisms/ServicesSection.tsx', services);

console.log('Fixed duplicate strokeWidth');
