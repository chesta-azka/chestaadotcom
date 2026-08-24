const fs = require('fs');
const path = 'src/App.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes('Toaster')) {
  code = `import { Toaster } from 'react-hot-toast';\n` + code;
  code = code.replace(
    '<AppContent appLoaded={appLoaded} />',
    '<AppContent appLoaded={appLoaded} />\n        <Toaster position="bottom-left" toastOptions={{ style: { background: "#1e293b", color: "#fff", fontSize: "14px", borderRadius: "12px", fontFamily: "sans-serif" } }} />'
  );
  fs.writeFileSync(path, code);
}
