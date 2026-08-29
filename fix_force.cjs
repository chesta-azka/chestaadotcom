const fs = require('fs');

let f = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');
f = f.replace("import { Bot,", "import { AlertTriangle, Bot,");
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', f);

let a = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');
a = a.replace("import { LogOut,", "import { Briefcase, LogOut,");
fs.writeFileSync('src/pages/AdminPage.tsx', a);

