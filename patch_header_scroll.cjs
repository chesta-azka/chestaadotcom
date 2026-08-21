const fs = require('fs');
let header = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

const oldHeaderClass = "className={`bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl pointer-events-auto transition-shadow duration-300 ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : 'shadow-none'}`}";
const newHeaderClass = "className={`transition-all duration-500 ease-out rounded-full px-6 flex items-center justify-between w-full max-w-5xl pointer-events-auto ${scrolled ? 'bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-3' : 'bg-white/0 backdrop-blur-none border border-transparent shadow-none py-4'}`}";

if (header.includes(oldHeaderClass)) {
    header = header.replace(oldHeaderClass, newHeaderClass);
    fs.writeFileSync('src/components/organisms/Header.tsx', header);
    console.log('Successfully patched Header scroll animation');
} else {
    console.log('Failed to find exact header class. Doing a generic replace.');
    // Let's do a more robust regex if the above fails
    const regex = /className=\{`bg-white\/80 backdrop-blur-2xl border border-slate-200 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl pointer-events-auto transition-shadow duration-300 \$\{scrolled \? 'shadow-\[0_8px_32px_rgba\(0,0,0,0\.12\)\]' : 'shadow-none'\}`\}/g;
    header = header.replace(regex, newHeaderClass);
    fs.writeFileSync('src/components/organisms/Header.tsx', header);
    console.log('Replaced via regex');
}
