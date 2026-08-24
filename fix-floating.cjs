const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let lines = fs.readFileSync(path, 'utf-8').split('\n');

const newLines = [];
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('{/* Input Area */}')) {
        newLines.push('            )}');
    }
    newLines.push(lines[i]);
}

fs.writeFileSync(path, newLines.join('\n'));
