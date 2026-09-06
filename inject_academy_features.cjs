const fs = require('fs');

let content = fs.readFileSync('src/app/academy/[slug]/page.tsx', 'utf-8');

// 1. Add Components (ModuleSummary, ProgressDashboard)
const components = `
const ModuleSummary = ({ mod, nextMod }: { mod: any, nextMod?: any }) => {
  return (
    <div className="mt-12 mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100/50 no-print">
      <h4 className="text-xl font-bold text-indigo-950 mb-4 flex items-center gap-2">
        <CheckCircle2 className="text-indigo-600" /> Ringkasan Modul
      </h4>
      <p className="text-indigo-800/80 mb-6 text-sm leading-relaxed">
        Selamat! Anda telah menyelesaikan modul <strong>{mod.title}</strong>. Berikut adalah konsep utama yang telah Anda kuasai:
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {mod.submodules.map((s: any) => (
          <li key={s.id} className="flex items-start gap-2 text-sm text-indigo-900 font-medium">
            <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" /> {s.title}
          </li>
        ))}
      </ul>
      {nextMod && (
        <button 
          onClick={() => {
            const element = document.getElementById(nextMod.id);
            if (element) {
              const y = element.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition-all hover:gap-3"
        >
          Lanjut ke Modul Berikutnya <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

const ProgressDashboard = ({ completedSteps, curriculum }: { completedSteps: Record<string, boolean>, curriculum: any[] }) => {
  const allSubmodules = curriculum.flatMap(m => m.submodules);
  const total = allSubmodules.length;
  const completedCount = Object.keys(completedSteps).filter(k => completedSteps[k]).length;
  const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);
  
  const unreadSubmodules = allSubmodules.filter(s => !completedSteps[s.id]).slice(0, 3);

  return (
    <div className="mb-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm no-print">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Perjalanan Belajar Anda</h3>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-1000 ease-out" style={{ width: \`\${percentage}%\` }} />
            </div>
            <span className="font-bold text-emerald-600 min-w-[3rem]">{percentage}%</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {completedCount} dari {total} materi terselesaikan
          </p>
        </div>
        
        {unreadSubmodules.length > 0 && (
          <div className="w-full md:w-1/2 md:pl-8 md:border-l border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Materi Belum Dibaca</h4>
            <ul className="flex flex-col gap-2">
              {unreadSubmodules.map(sub => (
                <li key={sub.id}>
                  <button 
                    onClick={() => {
                      const element = document.getElementById(sub.id);
                      if (element) {
                        const y = element.getBoundingClientRect().top + window.scrollY - 100;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="text-left text-sm text-slate-600 hover:text-purple-600 hover:underline transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-purple-500 transition-colors flex-shrink-0" /> 
                    <span className="truncate">{sub.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
`;

if (!content.includes('ModuleSummary')) {
  content = content.replace(
    "export default function AcademyTutorialPage() {",
    components + "\nexport default function AcademyTutorialPage() {"
  );
}

// 2. Add Map Index and inject ModuleSummary
content = content.replace(
  "TUTORIAL_CONTENT.map((mod: any) => (",
  "TUTORIAL_CONTENT.map((mod: any, index: number) => ("
);

if (!content.includes('<ModuleSummary')) {
  content = content.replace(
    /<QuizWidget moduleId=\{mod.id\} \/>\s*<\/section>/g,
    "<QuizWidget moduleId={mod.id} />\n                <ModuleSummary mod={mod} nextMod={TUTORIAL_CONTENT[index + 1]} />\n              </section>"
  );
}

// 3. Inject ProgressDashboard
if (!content.includes('<ProgressDashboard')) {
  content = content.replace(
    "{/* Content Modules */}",
    "<ProgressDashboard completedSteps={completedSteps} curriculum={CURRICULUM} />\n\n          {/* Content Modules */}"
  );
}

// 4. State updates for Sidebar
const stateUpdates = `
  const [sidebarTab, setSidebarTab] = useState<'curriculum' | 'glossary'>('curriculum');
  const [glossarySearch, setGlossarySearch] = useState('');
  const sortedGlossary = Object.entries(GLOSSARY).sort((a, b) => a[0].localeCompare(b[0]));
`;

if (!content.includes('sidebarTab')) {
  content = content.replace(
    "const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});",
    "const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});\n" + stateUpdates
  );
}

// 5. Sidebar Replacement
const oldSidebarContentStart = `{/* Search Box */}
            <div className="mb-6 relative">`;
            
const newSidebarContentStart = `
            {/* Sidebar Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg mb-6">
              <button 
                onClick={() => setSidebarTab('curriculum')}
                className={\`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 \${sidebarTab === 'curriculum' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}\`}
              >
                <BookOpen size={14} /> Kurikulum
              </button>
              <button 
                onClick={() => setSidebarTab('glossary')}
                className={\`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-2 \${sidebarTab === 'glossary' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}\`}
              >
                <FileCode size={14} /> Glosarium
              </button>
            </div>

            {sidebarTab === 'curriculum' ? (
              <>
                {/* Search Box */}
                <div className="mb-6 relative">`;

content = content.replace(oldSidebarContentStart, newSidebarContentStart);

const oldSidebarContentEnd = `</div>
              )})}
            </div>`;

const newSidebarContentEnd = `</div>
              )})}
            </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Cari istilah..."
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors text-slate-700"
                  />
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  {sortedGlossary.filter(([term]) => term.toLowerCase().includes(glossarySearch.toLowerCase())).map(([term, def]) => (
                    <div key={term} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="font-bold text-sm text-purple-700 mb-1">{term}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{def}</p>
                    </div>
                  ))}
                  {sortedGlossary.filter(([term]) => term.toLowerCase().includes(glossarySearch.toLowerCase())).length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs font-medium">
                      Istilah tidak ditemukan.
                    </div>
                  )}
                </div>
              </div>
            )}`;

content = content.replace(oldSidebarContentEnd, newSidebarContentEnd);

fs.writeFileSync('src/app/academy/[slug]/page.tsx', content);

