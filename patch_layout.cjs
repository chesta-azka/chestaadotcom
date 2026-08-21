const fs = require('fs');
let appTsx = fs.readFileSync('src/App.tsx', 'utf-8');

appTsx = appTsx.replace("import LocalSEOBanner from './components/molecules/LocalSEOBanner.tsx';\\n", "");
appTsx = appTsx.replace("<LocalSEOBanner />\\n            <Header />", "<Header />");

fs.writeFileSync('src/App.tsx', appTsx);

let headerTsx = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');
const headerImport = "import { Link, useLocation } from 'react-router-dom';\\nimport LocalSEOBanner from '../molecules/LocalSEOBanner.tsx';";
headerTsx = headerTsx.replace("import { Link, useLocation } from 'react-router-dom';", headerImport);

const oldHeaderTag = '<header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">';
const newHeaderTag = \`<!-- Floating Header Container -->
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
        
        {/* The Banner takes full width at the very top, and has pointer events enabled */}
        <div className="w-full pointer-events-auto">
          <LocalSEOBanner />
        </div>

        {/* The Floating Pill is slightly pushed down from the banner or the top */}
        <div className="flex justify-center px-6 mt-4 sm:mt-6 w-full">\`;

headerTsx = headerTsx.replace(oldHeaderTag, newHeaderTag);

// Close the extra div for floating pill
const oldHeaderClose = '</header>';
const newHeaderClose = '</div>\\n      </header>';
headerTsx = headerTsx.replace(oldHeaderClose, newHeaderClose);

fs.writeFileSync('src/components/organisms/Header.tsx', headerTsx);
console.log("Patched layouts");
