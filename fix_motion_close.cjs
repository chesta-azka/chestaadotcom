const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// Replace the closing tag for those buttons
// We can find where motion.button is opened and replace the matching </button> with </motion.button>
code = code.replace(/<motion\.button([\s\S]*?)<\/button>/g, '<motion.button$1</motion.button>');

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Fixed motion.button closing tags');
