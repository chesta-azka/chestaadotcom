const fs = require('fs');
const path = 'src/pages/ServiceDetailPage.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace("import Breadcrumbs from '../components/molecules/Breadcrumbs';", "import Breadcrumbs from '../components/atoms/Breadcrumbs';");

fs.writeFileSync(path, code);
console.log("Updated ServiceDetailPage imports");
