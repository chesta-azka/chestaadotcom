const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const heatmapMemo = `
  const heatmapValues = useMemo(() => {
    const counts = new Map<string, number>();
    logs.forEach(log => {
      if (log.timestamp) {
        let date;
        if (log.timestamp.toDate) {
          date = log.timestamp.toDate();
        } else if (log.timestamp instanceof Date) {
          date = log.timestamp;
        } else if (typeof log.timestamp === 'number') {
          date = new Date(log.timestamp);
        }
        
        if (date) {
          const dateStr = date.toISOString().split('T')[0];
          counts.set(dateStr, (counts.get(dateStr) || 0) + 1);
        }
      }
    });
    
    return Array.from(counts.entries()).map(([date, count]) => ({ date, count }));
  }, [logs]);
`;

if (!code.includes('heatmapValues')) {
    code = code.replace(/const autocompleteSuggestions = useMemo\(\(\) => \{[\s\S]*?\}, \[searchQuery, logs\]\);/g, match => match + '\n' + heatmapMemo);
}

const heatmapComponent = `
            <div className="lg:col-span-2 mt-8">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Peak Interaction Hours (Activity Heatmap)</h3>
              <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="min-w-[600px]">
                  <CalendarHeatmap
                    startDate={new Date(new Date().setMonth(new Date().getMonth() - 4))}
                    endDate={new Date()}
                    values={heatmapValues}
                    classForValue={(value) => {
                      if (!value || value.count === 0) {
                        return 'color-empty';
                      }
                      return \`color-scale-\${Math.min(value.count, 4)}\`;
                    }}
                    titleForValue={(value) => {
                      if (!value) return 'No interactions';
                      return \`\${value.count} interactions on \${value.date}\`;
                    }}
                    showWeekdayLabels={true}
                  />
                </div>
              </div>
            </div>
`;

if (!code.includes('CalendarHeatmap') && code.includes('<LineChart')) {
  // We want to add it at the bottom of the grid
  const gridEndStr = `</ResponsiveContainer>
              </div>
            </div>
          </div>`;
          
  const gridEndMatch = `</ResponsiveContainer>
              </div>
            </div>`;
  // Let's just find the closing tag of the line chart div and insert it.
  
  code = code.replace(/<\/ResponsiveContainer>\s*<\/div>\s*<\/div>\s*<\/div>/, match => `</ResponsiveContainer>
              </div>
            </div>
          ` + heatmapComponent + `
          </div>`);
}

fs.writeFileSync('src/pages/AdminPage.tsx', code);
