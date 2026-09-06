const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// Ensure Header is imported
if (!code.includes("import Header from '../components/organisms/Header.tsx'")) {
  code = "import Header from '../components/organisms/Header.tsx';\n" + code;
}

// In return statement, add <Header /> before the course sub-bar
code = code.replace(
  'return (\n    <div className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-x-hidden overflow-hidden selection:bg-purple-200 selection:text-purple-900">\n      {/* Top App Bar - Fixed */}',
  'return (\n    <div className="h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 flex flex-col overflow-x-hidden overflow-hidden selection:bg-purple-200 selection:text-purple-900">\n      <Header />\n      {/* Course Sub Bar */}'
);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Added global Header to AcademyMasterclassPage');
