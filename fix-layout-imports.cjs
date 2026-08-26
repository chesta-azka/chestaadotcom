const fs = require('fs');
let code = fs.readFileSync('src/components/templates/AdminDashboardLayout.tsx', 'utf-8');

code = code.replace("Search, Home }", "Search, Home, Users }");

fs.writeFileSync('src/components/templates/AdminDashboardLayout.tsx', code);
