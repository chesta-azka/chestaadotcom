const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.tsx', 'utf8');

const oldImports = "import { useState } from 'react';";
const newImports = "import { useState, useEffect } from 'react';";
if (code.includes(oldImports)) {
    code = code.replace(oldImports, newImports);
}

const oldComponentStart = `export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');`;

const newComponentStart = `const PortfolioSkeleton = () => (
  <div className="relative flex flex-col h-full bg-white p-6 rounded-3xl border border-slate-100 animate-pulse text-left shadow-sm">
    <div className="w-full aspect-[4/3] bg-slate-100 rounded-2xl mb-5" />
    <div className="flex gap-2.5 items-center mb-3">
      <div className="h-5 w-24 bg-indigo-50 rounded-full" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-6 w-3/4 bg-slate-200 rounded" />
    </div>
    <div className="space-y-2 mb-6">
      <div className="h-4 w-full bg-slate-100 rounded" />
      <div className="h-4 w-5/6 bg-slate-100 rounded" />
    </div>
  </div>
);

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [filter]);`;

code = code.replace(oldComponentStart, newComponentStart);

const oldProjectsMap = `{filteredProjects.map((project, i) => (`;
const newProjectsMap = `{loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <PortfolioSkeleton key={'skel-'+i} />
            ))
          ) : filteredProjects.map((project, i) => (`;
code = code.replace(oldProjectsMap, newProjectsMap);

const oldProjectsMapEnd = `</motion.div>
            ))}
          </div>`;
const newProjectsMapEnd = `</motion.div>
            ))}
          )}
          </div>`;
code = code.replace(oldProjectsMapEnd, newProjectsMapEnd);

fs.writeFileSync('src/pages/PortfolioPage.tsx', code);
