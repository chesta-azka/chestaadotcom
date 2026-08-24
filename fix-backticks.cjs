const fs = require('fs');
const path = 'src/components/organisms/AutomatedPricingLogic.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(/\\`/g, '`');
code = code.replace(/\\\$/g, '$');

fs.writeFileSync(path, code);
