const fs = require('fs');

// 1. Update index.css for .academy-text-content p
let css = fs.readFileSync('src/index.css', 'utf8');
if (css.includes('.academy-text-content p')) {
  css = css.replace(
    /\.academy-text-content p \{[^}]*\}/,
    `.academy-text-content p {
  margin-bottom: 2rem !important;
  padding-bottom: 1rem !important;
  line-height: 1.75 !important;
  color: #334155 !important;
}`
  );
} else {
  css += `
.academy-text-content p {
  margin-bottom: 2rem !important;
  padding-bottom: 1rem !important;
  line-height: 1.75 !important;
  color: #334155 !important;
}
`;
}
fs.writeFileSync('src/index.css', css);
console.log('Updated index.css with academy-text-content p rules');

// 2. Update AcademyMasterclassPage for w-screen max-w-full overflow-x-hidden
let pageCode = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');
pageCode = pageCode.replace(
  'className="h-screen w-full max-w-[100vw] bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-x-hidden box-border selection:bg-purple-200 selection:text-purple-900"',
  'className="h-screen w-screen max-w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-x-hidden box-border selection:bg-purple-200 selection:text-purple-900"'
);
fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', pageCode);
console.log('Updated AcademyMasterclassPage with w-screen max-w-full');

