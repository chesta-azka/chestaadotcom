const fs = require('fs');
const path = 'src/App.tsx';
let code = fs.readFileSync(path, 'utf-8');

const importStatement = `import { AuthProvider } from './contexts/AuthContext';\n`;
if (!code.includes('AuthProvider')) {
  code = code.replace(/import React from "react";/, `import React from "react";\n${importStatement}`);
}

const oldRouter = `<Router>`;
const newRouter = `<Router>\n      <AuthProvider>`;

const oldRouterEnd = `</Router>`;
const newRouterEnd = `</AuthProvider>\n    </Router>`;

if (!code.includes('<AuthProvider>')) {
  code = code.replace(oldRouter, newRouter);
  code = code.replace(oldRouterEnd, newRouterEnd);
}

fs.writeFileSync(path, code);
