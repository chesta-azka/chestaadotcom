const fs = require('fs');
let code = fs.readFileSync('src/components/templates/AdminDashboardLayout.tsx', 'utf-8');

if (!code.includes('import SystemHealthHeader')) {
  code = code.replace(
    /import \{ Link, useLocation \} from 'react-router-dom';/,
    `import { Link, useLocation } from 'react-router-dom';\nimport SystemHealthHeader from '../organisms/SystemHealthHeader';`
  );
  
  code = code.replace(
    /<div className="max-w-6xl mx-auto h-full">\s*<AnimatePresence mode="wait">/,
    `<div className="max-w-6xl mx-auto h-full">\n          <div className="flex justify-end mb-6">\n            <SystemHealthHeader />\n          </div>\n          <AnimatePresence mode="wait">`
  );
  
  fs.writeFileSync('src/components/templates/AdminDashboardLayout.tsx', code);
  console.log('AdminDashboardLayout updated.');
} else {
  console.log('Already updated.');
}
