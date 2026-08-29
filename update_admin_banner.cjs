const fs = require('fs');

let content = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const targetReturn = `  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">`;

const replaceReturn = `  return (
    <div className="space-y-6">
      {tokenPercentage >= 80 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
          <div className="text-red-500 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-800">Peringatan Kuota Token AI</h3>
            <p className="text-sm text-red-700 mt-1">Konsumsi token AI Anda telah mencapai <strong>{tokenPercentage.toFixed(1)}%</strong> dari batas bulanan. Segera tingkatkan limit atau perbarui paket Anda untuk mencegah gangguan layanan chat.</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">`;

content = content.replace(targetReturn, replaceReturn);

// Also add a toast notification using useEffect
const targetUseEffect = `  const tokenPercentage = (tokenMetrics.used / tokenMetrics.limit) * 100;

  useEffect(() => {`;

const replaceUseEffect = `  const tokenPercentage = (tokenMetrics.used / tokenMetrics.limit) * 100;

  useEffect(() => {
    if (tokenPercentage >= 80) {
      toast.error(\`Peringatan: Kuota AI mencapai \${tokenPercentage.toFixed(1)}%!\`, {
        duration: 5000,
        position: 'top-right',
      });
    }
  }, [tokenPercentage >= 80]); // Only re-run if it crosses the 80% threshold

  useEffect(() => {`;

content = content.replace(targetUseEffect, replaceUseEffect);

fs.writeFileSync('src/pages/AdminPage.tsx', content);
