const fs = require('fs');

// HeroSection.tsx
let hero = fs.readFileSync('src/components/organisms/HeroSection.tsx', 'utf-8');
hero = hero.replace(/<ArrowRight /g, '<ArrowRight strokeWidth={1} ');
hero = hero.replace(/<Sparkles /g, '<Sparkles strokeWidth={1} ');
hero = hero.replace(/<Zap /g, '<Zap strokeWidth={1} ');
hero = hero.replace(/<Globe /g, '<Globe strokeWidth={1} ');
hero = hero.replace(/<ShieldCheck /g, '<ShieldCheck strokeWidth={1} ');
hero = hero.replace(/<Cpu /g, '<Cpu strokeWidth={1} ');
fs.writeFileSync('src/components/organisms/HeroSection.tsx', hero);

// ServicesSection.tsx
let services = fs.readFileSync('src/components/organisms/ServicesSection.tsx', 'utf-8');
services = services.replace(/<ArrowUpRight /g, '<ArrowUpRight strokeWidth={1.5} ');
services = services.replace(/<Gauge /g, '<Gauge strokeWidth={1} ');
services = services.replace(/<Smartphone /g, '<Smartphone strokeWidth={1} ');
services = services.replace(/<MessageCircle /g, '<MessageCircle strokeWidth={1} ');
services = services.replace(/<Grid2X2 /g, '<Grid2X2 strokeWidth={1} ');
services = services.replace(/<ChevronDown /g, '<ChevronDown strokeWidth={1} ');
fs.writeFileSync('src/components/organisms/ServicesSection.tsx', services);

console.log('Successfully patched icons to strokeWidth={1}');
