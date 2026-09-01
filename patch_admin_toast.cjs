const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

const target = `             if (!data.humanTakeover) {
                toast(\`HOT LEAD ALERT: Visitor requesting human connection! Session ID: \${change.doc.id}\`, {
                   duration: 10000,
                   icon: '🚨',
                   style: { background: '#000', color: '#fff' }
                });
                // Allow admin to click to take over
                const id = change.doc.id;
                setTimeout(() => {
                   if(window.confirm(\`Take over chat session \${id}?\`)) {
                      handleTakeover(id);
                   }
                }, 500); // Wait for toast, then prompt (or could make toast actionable)
             }`;

const replacement = `             if (!data.humanTakeover) {
                const id = change.doc.id;
                toast((t) => (
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
                });
             }`;

if(code.includes('window.confirm')) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/AdminPage.tsx', code);
  console.log("Patched AdminPage toast");
} else {
  console.log("Target not found!");
}
