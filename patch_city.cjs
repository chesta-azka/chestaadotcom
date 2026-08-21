const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf-8');

const targetStr = `className="group flex flex-col justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-[#4f46e5]/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"`;
const replaceStr = `className="group flex flex-col justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-[#4f46e5]/30 transition-all duration-500 transform hover:scale-[1.03] hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.2)] relative overflow-hidden"`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/pages/ServicesPage.tsx', content);
console.log("Patched ServicesPage City Cards");
