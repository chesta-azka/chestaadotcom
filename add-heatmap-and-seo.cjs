const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// 1. Add imports
const importsToAdd = `
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';
`;
code = code.replace("import React, { useState, useEffect, useMemo } from 'react';", "import React, { useState, useEffect, useMemo } from 'react';" + importsToAdd);

// 2. Add Heatmap inside Dashboard
// To create heatmap data, we need logs
const heatmapDataGen = `
  // Prepare Heatmap Data
  const heatmapData = useMemo(() => {
    const counts = {};
    logs.forEach(log => {
      if (log.timestamp) {
        // Just extract YYYY-MM-DD
        const dateObj = log.timestamp.toDate();
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        const dateStr = \`\${y}-\${m}-\${d}\`;
        counts[dateStr] = (counts[dateStr] || 0) + 1;
      }
    });
    return Object.keys(counts).map(date => ({ date, count: counts[date] }));
  }, [logs]);
`;

// Insert the data generator in AdminDashboard
code = code.replace("const serviceStats =", heatmapDataGen + "\n  const serviceStats =");

// Insert the heatmap UI in activeTab === 'dashboard'
const heatmapUI = `
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mt-6">
             <h3 className="text-sm font-medium text-slate-500 mb-4">Activity Heatmap (Chat Interactions)</h3>
             <div className="w-full overflow-x-auto">
               <div className="min-w-[700px]">
                 <CalendarHeatmap
                   startDate={new Date(new Date().setMonth(new Date().getMonth() - 5))}
                   endDate={new Date()}
                   values={heatmapData}
                   classForValue={(value) => {
                     if (!value) {
                       return 'color-empty';
                     }
                     return \`color-scale-\${Math.min(value.count, 4)}\`; // Assuming we have css for color-scale-1 to 4
                   }}
                   tooltipDataAttrs={value => {
                     return {
                       'data-tip': \`\${value.date ? value.date : ''} : \${value.count ? value.count : 0} interactions\`,
                     };
                   }}
                 />
               </div>
             </div>
          </div>
`;

code = code.replace("</div>\n        </div>\n      )}", "</div>" + heatmapUI + "\n        </div>\n      )}");

// 3. Add SEOManager Tab UI
const seoManagerUI = `
      {activeTab === 'seo_manager' && (
        <SEOManager />
      )}
`;

code = code.replace("{activeTab === 'content' && (", seoManagerUI + "\n      {activeTab === 'content' && (");

fs.writeFileSync('src/pages/AdminPage.tsx', code);
