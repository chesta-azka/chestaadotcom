const fs = require('fs');
let about = fs.readFileSync('src/pages/AboutPage.tsx', 'utf-8');

const importStatement = "import LocalWeatherWidget from '../components/atoms/LocalWeatherWidget';\n";
about = about.replace("import MetaTags", importStatement + "import MetaTags");

const targetDiv = `<div className="flex flex-col w-full min-h-screen bg-white">`;
const replacementDiv = `<div className="flex flex-col w-full min-h-screen bg-white relative">
      <LocalWeatherWidget />`;

about = about.replace(targetDiv, replacementDiv);

fs.writeFileSync('src/pages/AboutPage.tsx', about);
console.log('Added Weather Widget to AboutPage');
