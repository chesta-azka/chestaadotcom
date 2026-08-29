import re

with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

# Replace activeTab === 'stats'
stats_pattern = re.compile(r"\{activeTab === 'stats' && \(\s*<div className=\"bg-white rounded-3xl.*?</div>\s*\)\}", re.DOTALL)

new_stats = """{activeTab === 'stats' && (
        <div className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-black pb-4">
            <div>
              <h2 className="text-3xl font-mono font-black text-black uppercase tracking-tighter mb-2">Document Generator</h2>
              <p className="text-black font-mono text-sm">Automated Neural Synthesis of business contracts and proposals.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-2 bg-black text-white font-mono text-sm font-bold uppercase hover:bg-slate-800 transition-colors">
              <FileText size={16} /> GENERATE NEW
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border-2 border-black bg-white p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                <Briefcase size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase tracking-widest text-lg mb-2">Service Proposal</h3>
              <p className="text-sm font-mono text-slate-600 mb-6">Auto-generate client-specific digital agency proposals.</p>
              <button className="w-full py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                SYNTHESIZE
              </button>
            </div>
            
            <div className="border-2 border-black bg-white p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                <Shield size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase tracking-widest text-lg mb-2">NDA Contract</h3>
              <p className="text-sm font-mono text-slate-600 mb-6">Standard Non-Disclosure Agreement for new contractors.</p>
              <button className="w-full py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                SYNTHESIZE
              </button>
            </div>

            <div className="border-2 border-black bg-white p-6 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-4">
                <Activity size={20} />
              </div>
              <h3 className="font-mono font-bold uppercase tracking-widest text-lg mb-2">SLA Agreement</h3>
              <p className="text-sm font-mono text-slate-600 mb-6">Service Level Agreement for enterprise software clients.</p>
              <button className="w-full py-2 border-2 border-black font-mono text-sm font-bold uppercase hover:bg-black hover:text-white transition-colors">
                SYNTHESIZE
              </button>
            </div>
          </div>
        </div>
      )}"""

content = stats_pattern.sub(new_stats, content)

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)

