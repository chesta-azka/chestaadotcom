const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/pages/*.tsx');
for (const file of files) {
  let code = fs.readFileSync(file, 'utf-8');
  let originalCode = code;
  
  // Replace pt-32 with pt-40 to give more top padding (space from navbar)
  code = code.replace(/pt-32/g, 'pt-48');
  code = code.replace(/pt-24/g, 'pt-32'); // Just in case some use pt-24
  
  if (code !== originalCode) {
    fs.writeFileSync(file, code);
    console.log(`Updated spacing in ${file}`);
  }
}
