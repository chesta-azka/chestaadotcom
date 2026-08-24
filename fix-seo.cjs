const fs = require('fs');
const path = 'src/components/atoms/SEOProvider.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes('htmlAttributes')) {
  code = code.replace('<Helmet>', '<Helmet htmlAttributes={{ lang: \'id-ID\' }}>');
  fs.writeFileSync(path, code);
}
