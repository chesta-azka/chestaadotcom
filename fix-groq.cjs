const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
    ".map(m => ({ role: m.role, content: m.content }))",
    ".map(m => ({ role: m.role === 'ai' ? 'assistant' : m.role, content: m.content }))"
);

fs.writeFileSync(path, code);
