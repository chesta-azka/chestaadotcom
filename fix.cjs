const fs = require('fs');
let text = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const target = `              <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X size={18} />
                </button>
              </div>
            </div>`;

const replacement = `              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X size={18} />
                </button>
              </div>
            </div>`;

text = text.replace(target, replacement);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', text);
