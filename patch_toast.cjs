const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const target = `                toast((t) => (
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">🚨 HOT LEAD ALERT!</div>
                    <div className="text-sm">Visitor requesting human connection!</div>
                    <button 
                      onClick={() => { handleTakeover(id); toast.dismiss(t.id); }}
                      className="bg-white text-black px-3 py-1 text-sm font-bold mt-2"
                    >
                      TAKE OVER NOW
                    </button>
                  </div>
                ), {
                   duration: 30000,
                   style: { background: '#000', color: '#fff' }
                });`;

const replacement = `                toast((t) => (
                  <div className="flex flex-col gap-2 p-1">
                    <div className="font-semibold flex items-center gap-2 text-slate-900">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> 
                      Hot Lead Alert
                    </div>
                    <div className="text-sm text-slate-600">Visitor is requesting human connection!</div>
                    <button 
                      onClick={() => { handleTakeover(id); toast.dismiss(t.id); }}
                      className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded-xl text-sm font-medium mt-2 shadow-sm"
                    >
                      Take Over Session
                    </button>
                  </div>
                ), {
                   duration: 30000,
                   style: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }
                });`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/AdminPage.tsx', code);
  console.log("Patched toast");
} else {
  console.log("Target toast not found");
}
