const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

const newCourses = `
const COURSES = [
  {
    id: 'fullstack-music-streaming',
    title: 'Full-Stack Music Streaming App Development',
    description: 'Master Web Audio API, Global State Management, and Serverless DB by building a production-ready Spotify clone.',
    category: 'Full-Stack Next.js',
    difficulty: 'Advanced',
    duration: '12 Modul',
    icon: <Terminal size={20} className="text-slate-700" />,
    isNew: true,
  }
];
`;

code = code.replace(/const COURSES = \[.*?\];/s, newCourses.trim());
fs.writeFileSync('src/pages/AcademyPage.tsx', code);
console.log('Patched AcademyPage.tsx');
