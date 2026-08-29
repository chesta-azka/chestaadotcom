const fs = require('fs');
let code = fs.readFileSync('src/components/templates/AdminDashboardLayout.tsx', 'utf-8');

if (!code.includes("business_config")) {
  code = code.replace(
    "import { LogOut, MessageSquare, BarChart, PenTool, LayoutDashboard, Search, Home, Users, Menu, X, Shield, Bot } from 'lucide-react';",
    "import { LogOut, MessageSquare, BarChart, PenTool, LayoutDashboard, Search, Home, Users, Menu, X, Shield, Bot, Briefcase } from 'lucide-react';"
  );
  
  code = code.replace(
    "{ id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },",
    "{ id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },\n    { id: 'business_config', label: 'Business Config', icon: Briefcase },"
  );
  
  fs.writeFileSync('src/components/templates/AdminDashboardLayout.tsx', code);
  console.log("Patched layout");
}
