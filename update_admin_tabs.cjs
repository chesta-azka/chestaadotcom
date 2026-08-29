const fs = require('fs');

let content = fs.readFileSync('src/components/templates/AdminDashboardLayout.tsx', 'utf-8');

// Add Bot icon to imports
content = content.replace(
  "LayoutDashboard, Search, Home, Users, Menu, X, Shield",
  "LayoutDashboard, Search, Home, Users, Menu, X, Shield, Bot"
);

// Add tab to the list
const tabsRegex = /\{ id: 'audit', label: 'System Audit Log', icon: Shield \},/g;
content = content.replace(
  tabsRegex,
  "{ id: 'audit', label: 'System Audit Log', icon: Shield },\n    { id: 'ai_training', label: 'AI Training & Tokens', icon: Bot },"
);

fs.writeFileSync('src/components/templates/AdminDashboardLayout.tsx', content);
console.log('AdminDashboardLayout updated with ai_training tab');
