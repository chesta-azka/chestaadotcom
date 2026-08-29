const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

// The lines currently look like this:
//              <button 
//                  onClick={() => setIsOpen(false)}
//                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
//                  aria-label="Tutup asisten AI"
//                >
//                  <X size={18} />
//                </button>
//              </div>
//            </div>

content = content.replace(
  /<button \n\s*onClick=\{\(\) => setIsOpen\(false\)\}\n\s*className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"\n\s*aria-label="Tutup asisten AI"\n\s*>\n\s*<X size=\{18\} \/>\n\s*<\/button>\n\s*<\/div>/m,
  \`<div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X size={18} />
                </button>
              </div>
            </div>\`
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
