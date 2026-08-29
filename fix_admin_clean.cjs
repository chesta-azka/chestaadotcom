const fs = require('fs');
let adminContent = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// 1. Remove exportToCSV from AdminDashboard
const csvStart = adminContent.indexOf('// @ts-ignore\nconst exportToCSV = () => {');
if (csvStart !== -1) {
  const csvEnd = adminContent.indexOf('};\n', csvStart) + 3;
  const csvBlock = adminContent.substring(csvStart, csvEnd);
  adminContent = adminContent.replace(csvBlock, '');
}

// 2. Remove `<AdminChatHistoryFolders sessions={sessions} />` from AdminDashboard
const folderCall = '      {/* Category Folders */}\n      <AdminChatHistoryFolders sessions={sessions} />';
adminContent = adminContent.replace(folderCall, '');

// 3. Let's make sure the AITrainingTab has exportToCSV
// Find AITrainingTab start
const aiStart = adminContent.indexOf('function AITrainingTab() {');
if (aiStart !== -1 && !adminContent.substring(aiStart).includes('const exportToCSV = () => {')) {
  // insert it inside AITrainingTab
  const insertPos = adminContent.indexOf('const [tokenMetrics, setTokenMetrics]', aiStart);
  if (insertPos !== -1) {
    adminContent = adminContent.substring(0, insertPos) + 
`  // @ts-ignore
  const exportToCSV = () => {
    const rows = [["Session ID", "Waktu", "Konteks User", "Jawaban AI", "Rating", "Kategori"]];
    sessions.forEach(session => {
      const messages = (session as any).messages || [];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].feedback) {
          let userCtx = "N/A";
          if (i > 0 && messages[i-1].role === 'user') {
            userCtx = messages[i-1].content;
          }
          const timestamp = session.lastUpdated?.toDate ? session.lastUpdated.toDate().toLocaleString('id-ID') : '-';
          rows.push([
            session.id,
            timestamp,
            '"' + userCtx.replace(/"/g, '""') + '"',
            '"' + messages[i].content.replace(/"/g, '""') + '"',
            messages[i].feedback,
            messages[i].category || 'General'
          ]);
        }
      }
    });
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "feedback_logs.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };\n\n  ` + adminContent.substring(insertPos);
  }
}

fs.writeFileSync('src/pages/AdminPage.tsx', adminContent);
