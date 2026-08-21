const fs = require('fs');
let hero = fs.readFileSync('src/components/organisms/HeroSection.tsx', 'utf-8');

hero = hero.replace('className="relative pt-32 md:pt-40 pb-24 md:pb-32', 'className="relative pt-44 md:pt-56 pb-24 md:pb-32');

fs.writeFileSync('src/components/organisms/HeroSection.tsx', hero);
console.log('Fixed HeroSection spacing');
