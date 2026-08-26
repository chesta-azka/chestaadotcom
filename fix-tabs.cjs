const fs = require('fs');
let code = fs.readFileSync('src/components/templates/AdminDashboardLayout.tsx', 'utf-8');
code = code.replace(
  "{ id: 'content', label: 'Content Editor', icon: PenTool },",
  "{ id: 'seo_manager', label: 'SEO Manager', icon: Search },\n    { id: 'content', label: 'Content Editor', icon: PenTool },"
);
fs.writeFileSync('src/components/templates/AdminDashboardLayout.tsx', code);
