const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const userManagementRender = `{activeTab === 'users' && (
        <UserManagement />
      )}`;

if (code.includes(userManagementRender) && !code.includes('<SystemAuditLog />')) {
  code = code.replace(userManagementRender, userManagementRender + `
      {activeTab === 'audit' && (
        <SystemAuditLog />
      )}`);
}

fs.writeFileSync('src/pages/AdminPage.tsx', code);
