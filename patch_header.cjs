const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf8');

const newNavItems = `const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', icon: Home, subtitle: 'Beranda' },
  {
    name: 'Layanan',
    children: [
      { name: 'Web Dev Next.js', href: '/#services', icon: Sparkles, subtitle: 'Pembuatan Website Cepat & Modern' },
      { name: 'AI Integration', href: '/#services', icon: Sparkles, subtitle: 'Otomatisasi dengan Google Gemini' },
      { name: 'UI/UX Design', href: '/#services', icon: Sparkles, subtitle: 'Desain Antarmuka Premium' },
      { name: 'Workflow', href: '/workflow', icon: GitFork, subtitle: 'Proses Kerja & Eksekusi' },
    ]
  },
  {
    name: 'Showcase',
    children: [
      { name: 'Portfolio', href: '/portfolio', icon: Briefcase, subtitle: 'Studi Kasus & Hasil Nyata' },
      { name: 'About', href: '/about', icon: User, subtitle: 'Profil Founder & Visi' },
    ]
  },
  {
    name: 'Developers',
    children: [
      { name: 'Tech Insights', href: '/blog', icon: BookOpen, subtitle: 'Jurnal Vibe Coding' },
      { name: 'Academy', href: '/academy', icon: GraduationCap, subtitle: 'Tutorial & Dokumentasi' },
      { name: 'Quiz Evaluasi', href: '/quiz', icon: CheckSquare, subtitle: 'Uji Kompetensi' },
    ]
  },
];`;

code = code.replace(/const NAV_ITEMS: NavItem\[\] = \[[\s\S]*?\];/m, newNavItems);

fs.writeFileSync('src/components/organisms/Header.tsx', code);
console.log('Patched Header.tsx');
