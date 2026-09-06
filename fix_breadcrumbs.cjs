const fs = require('fs');
let code = fs.readFileSync('src/components/Breadcrumbs.tsx', 'utf8');

code = code.replace(/import Link from 'next\/link';/g, "import { Link } from 'react-router-dom';");
code = code.replace(/href="/g, 'to="'); // Next link uses href, react-router uses to
// wait, fixing the others as well just to be safe. 
fs.writeFileSync('src/components/Breadcrumbs.tsx', code);
console.log('Fixed breadcrumbs');
