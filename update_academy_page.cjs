const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');

// Remove the bottom Academy Resource Section
const startIdx = code.indexOf('{/* Academy Resource Section */}');
if (startIdx !== -1) {
  code = code.substring(0, startIdx) + '      </main>\n    </div>\n  );\n}';
}

fs.writeFileSync('src/pages/AcademyPage.tsx', code);
console.log('Removed bottom resource section from AcademyPage');
