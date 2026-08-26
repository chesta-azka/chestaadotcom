const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

const regexReturn = /  return \(\n    <motion\.div \n      initial=\{\{ opacity: 0 \}\}\n      animate=\{\{ opacity: 1 \}\}\n      exit=\{\{ opacity: 0 \}\}\n      className="pt-12 pb-32 min-h-screen relative"\n    >/g;

code = code.replace(regexReturn, `  return (
    <>
      <SEOProvider 
        title="Insights & AI Engineering Blog | CHESTADOTCOM"
        description="Deep dives into digital architecture, AI implementations, and enterprise solutions."
      />
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-32 min-h-screen relative"
    >`);

fs.writeFileSync('src/pages/BlogHubPage.tsx', code);
