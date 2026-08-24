const fs = require('fs');
const path = 'src/pages/AdminPage.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(/const \[activeTab, setActiveTab\] = useState<'seo' \| 'chat' \| 'stats'>\('chat'\);\| 'chat'>\('chat'\);/g, `const [activeTab, setActiveTab] = useState<'seo' | 'chat' | 'stats'>('chat');`);

fs.writeFileSync(path, code);
