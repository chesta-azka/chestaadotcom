const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// Insert progress bar logic right before the return statement of AcademyMasterclassPage
const progressLogic = `
  const totalSubmodules = modules.reduce((acc, mod) => acc + (mod.submodules?.length || 0), 0);
  const completedCount = Object.values(bookmarks).filter(Boolean).length;
  const progressPercent = totalSubmodules === 0 ? 0 : Math.round((completedCount / totalSubmodules) * 100);
`;

code = code.replace(/  return \(\n    <div className="h-screen/, `${progressLogic}\n  return (\n    <div className="h-screen`);

const progressUI = `
          <div className="p-4 border-b border-slate-100 shrink-0 bg-white">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Progress Kursus</span>
                <span className="text-xs font-bold text-purple-700">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: \`\${progressPercent}%\` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
`;

code = code.replace(/<div className="p-4 border-b border-slate-100 shrink-0 bg-white">/, progressUI);

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Patched Sidebar Progress');
