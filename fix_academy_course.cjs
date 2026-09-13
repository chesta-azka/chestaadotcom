const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

if (!code.includes('ai-agent-automation-bsd')) {
  const newCourse = `
  {
    id: 'ai-agent-automation-bsd',
    title: 'AI Agent Automation for Enterprise',
    description: 'Pelajari cara membangun AI Agents mandiri dengan Node.js dan Gemini Pro untuk mengotomatisasi bisnis di skala Enterprise.',
    category: 'AI & Automation',
    difficulty: 'Expert',
    duration: '10 Modul',
    icon: <Sparkles size={20} className="text-slate-700" />,
    isNew: true,
  },`;
  
  code = code.replace(
    /const COURSES = \[\s*\{/,
    "const COURSES = [" + newCourse + " {"
  );
  
  fs.writeFileSync('src/pages/AcademyPage.tsx', code);
}
