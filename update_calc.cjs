const fs = require('fs');
let file = fs.readFileSync('src/components/organisms/AutomatedPricingLogic.tsx', 'utf-8');

file = file.replace('const BASE_PRICE = 540000;', 'const BASE_PRICE = 2500000;');
file = file.replace('(Mulai Rp540.000)', '(Mulai Rp2.500.000)');

fs.writeFileSync('src/components/organisms/AutomatedPricingLogic.tsx', file);
console.log('updated AutomatedPricingLogic.tsx');
