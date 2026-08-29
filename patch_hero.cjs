const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/HeroSection.tsx', 'utf8');

const targetStr = `    <section 
      id="home" 
      className="relative min-h-[90svh] pt-48 md:pt-60 pb-16 md:pb-24 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >`;

const replaceStr = `    <section 
      id="home" 
      className="relative min-h-screen pt-[180px] md:pt-[240px] pb-16 md:pb-24 overflow-hidden flex flex-col items-center justify-center text-center select-none"
    >`;

code = code.replace(targetStr, replaceStr);
fs.writeFileSync('src/components/organisms/HeroSection.tsx', code);
console.log('Patched HeroSection gap');
