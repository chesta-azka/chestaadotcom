const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add import
const importToAdd = "import LocalSEOBanner from './components/molecules/LocalSEOBanner.tsx';\n";
content = content.replace("import Header from './components/organisms/Header.tsx';", importToAdd + "import Header from './components/organisms/Header.tsx';");

// Add component
const headerTag = "<Header />";
content = content.replace(headerTag, "<LocalSEOBanner />\n            " + headerTag);

fs.writeFileSync('src/App.tsx', content);
console.log("Patched App.tsx");
