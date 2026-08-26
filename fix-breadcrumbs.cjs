const fs = require('fs');

let code = fs.readFileSync('src/components/atoms/Breadcrumbs.tsx', 'utf-8');

// Update styling to make it "lebih glases" (more glassmorphism for light theme)
const oldClasses = 'bg-white/[0.02] border border-slate-100 backdrop-blur-sm shadow-sm';
const newClasses = 'bg-white/40 backdrop-blur-xl border border-white/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5';
code = code.replace(oldClasses, newClasses);

// Ensure the border separator is visible
code = code.replace('border-[#ffffff0a]', 'border-slate-200');

// Fix hover item color that was set to #ffffff (white text on hover in light mode won't be visible if background is light)
code = code.replace('color: "#ffffff"', 'color: "#4f46e5"'); // indigo-600

fs.writeFileSync('src/components/atoms/Breadcrumbs.tsx', code);
