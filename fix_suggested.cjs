const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const quickActionsComment = '{/* Quick Actions */}';
const replacement = `{/* Quick Actions */}
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Suggested Questions</div>`;

content = content.replace(quickActionsComment, replacement);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
console.log('Suggested questions label added');
