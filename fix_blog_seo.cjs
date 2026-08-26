const fs = require('fs');
let code = fs.readFileSync('src/pages/BlogHubPage.tsx', 'utf8');

const oldReturn = `  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-32 min-h-screen relative"
    >
      {/* Precision Reading Progress Bar */}`;

const newReturn = `  return (
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
    >
      {/* Precision Reading Progress Bar */}`;

code = code.replace(oldReturn, newReturn);

// Now I also need to close the Fragment at the end of the component.
// Wait, is there a Fragment at the end? Let's check the bottom of the file.
