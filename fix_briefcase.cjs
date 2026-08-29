const fs = require('fs');

let a = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');
a = a.replace("import { Search,", "import { Briefcase, Search,");
fs.writeFileSync('src/pages/AdminPage.tsx', a);

