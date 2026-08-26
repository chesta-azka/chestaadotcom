const fs = require('fs');

const pages = [
  {
    path: 'src/pages/BlogHubPage.tsx',
    title: 'Insights & AI Engineering Blog | CHESTADOTCOM',
    desc: 'Deep dives into digital architecture, AI implementations, and enterprise solutions.'
  },
  {
    path: 'src/pages/PortfolioPage.tsx',
    title: 'Client Case Studies & Portfolio | CHESTADOTCOM',
    desc: 'Explore our track record of transforming enterprise operations through AI and web technology.'
  },
  {
    path: 'src/pages/HomePage.tsx',
    title: 'Enterprise Digital Agency | CHESTADOTCOM',
    desc: 'Empowering businesses with intelligent digital architecture and AI solutions.'
  },
  {
    path: 'src/pages/AboutPage.tsx',
    title: 'About Us | CHESTADOTCOM',
    desc: 'Learn about our engineering culture and the people building the future of enterprise software.'
  }
];

for (const page of pages) {
  let code = fs.readFileSync(page.path, 'utf-8');
  if (!code.includes('import SEOProvider')) {
    code = `import SEOProvider from '../components/atoms/SEOProvider';\n` + code;
    
    // Find the first return statement of the component
    // To do this simply, we find `return (` and insert <SEOProvider /> right after the opening tag of the root element.
    const returnIdx = code.indexOf('return (');
    if (returnIdx !== -1) {
      const openTagEndIdx = code.indexOf('>', returnIdx);
      if (openTagEndIdx !== -1) {
        const before = code.substring(0, openTagEndIdx + 1);
        const after = code.substring(openTagEndIdx + 1);
        
        const injection = `
      <SEOProvider 
        title="${page.title}"
        description="${page.desc}"
      />`;
        
        code = before + injection + after;
        fs.writeFileSync(page.path, code);
        console.log(`Updated ${page.path}`);
      }
    }
  }
}
