const fs = require('fs');
let code = fs.readFileSync('src/data/projects.ts', 'utf8');

if (!code.includes('ai-omnichannel-bsd')) {
  const newProject = `
  {
    id: 'ai-omnichannel-bsd',
    title: 'AI Omnichannel Customer Service',
    client: 'Enterprise Retailer (BSD City)',
    duration: '4 Minggu',
    category: 'Website',
    description: 'Sistem customer service otomatis berbasis Agentic AI yang memproses ribuan tiket per hari dari berbagai kanal komunikasi.',
    techStack: ['Node.js', 'Gemini Pro', 'Firebase', 'Next.js 15'],
    features: [
      'Automated Ticket Routing',
      'Context-Aware AI Responses',
      'WhatsApp API Integration',
      'Real-time Analytics Dashboard',
    ],
    liveLink: '#',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
    overview: 'Klien kami yang berlokasi di BSD City mengalami lonjakan volume pertanyaan pelanggan (hingga 10.000+ tiket per hari) yang mengakibatkan waktu tunggu (SLA) membengkak.',
    challenges: 'Tim CS kewalahan merespons pertanyaan repetitif, biaya operasional membengkak, dan kepuasan pelanggan menurun.',
    solution: 'Kami membangun arsitektur Agentic AI menggunakan Google Gemini Pro yang secara otomatis mengklasifikasikan, mengekstraksi konteks, dan memberikan respons instan pada pertanyaan umum. Tim manusia hanya fokus pada eskalasi kasus kompleks.'
  },`;
  
  code = code.replace(
    /export const PROJECTS: Project\[\] = \[/,
    "export const PROJECTS: Project[] = [" + newProject
  );
  
  fs.writeFileSync('src/data/projects.ts', code);
}
