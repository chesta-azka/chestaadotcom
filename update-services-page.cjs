const fs = require('fs');
const path = 'src/pages/ServicesPage.tsx';
let code = fs.readFileSync(path, 'utf-8');

if (!code.includes('import Breadcrumbs')) {
    code = code.replace("import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';", "import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';\nimport Breadcrumbs from '../components/atoms/Breadcrumbs';");
}

const target = '<div className="max-w-[1400px] mx-auto px-6 md:px-12">';
const replacement = `<div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <Breadcrumbs items={[{ label: 'Layanan' }]} />`;

if(code.includes(target) && !code.includes("<Breadcrumbs items={[{ label: 'Layanan' }]} />")) {
    code = code.replace(target, replacement);
    fs.writeFileSync(path, code);
    console.log("Updated ServicesPage");
} else {
    console.log("Could not find target in ServicesPage or already inserted");
}
