const fs = require('fs');

// 1. Update index.css to include academy-text-content global rule
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.academy-text-content p')) {
  css += `
.academy-text-content p {
  margin-bottom: 2rem !important;
  line-height: 1.75 !important;
  color: #334155 !important;
}
.academy-text-content h1,
.academy-text-content h2,
.academy-text-content h3 {
  margin-top: 2.5rem !important;
  margin-bottom: 1.25rem !important;
}
`;
  fs.writeFileSync('src/index.css', css);
  console.log('Updated index.css with academy-text-content rules');
}

// 2. Update AcademyMasterclassPage.tsx to wrap markdown in academy-text-content class
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');
code = code.replace(
  '<div className="prose prose-lg prose-slate max-w-none text-slate-600 prose-headings:font-display prose-headings:font-medium prose-strong:text-slate-900 prose-strong:font-bold prose-ul:list-disc prose-p:leading-relaxed prose-a:text-purple-700">',
  '<div className="academy-text-content prose prose-lg prose-slate max-w-none text-slate-600 prose-headings:font-display prose-headings:font-medium prose-strong:text-slate-900 prose-strong:font-bold prose-ul:list-disc prose-p:leading-relaxed prose-a:text-purple-700">'
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Updated AcademyMasterclassPage with academy-text-content wrapper');
