const fs = require('fs');

function fixLinks(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');
  if (code.includes("import Link from 'next/link';")) {
    code = code.replace(/import Link from 'next\/link';/g, "import { Link } from 'react-router-dom';");
    fs.writeFileSync(filePath, code);
    console.log('Fixed links in', filePath);
  } else if (code.includes('import Link from "next/link";')) {
    code = code.replace(/import Link from "next\/link";/g, "import { Link } from 'react-router-dom';");
    fs.writeFileSync(filePath, code);
    console.log('Fixed links in', filePath);
  }
}

fixLinks('src/components/FeaturedCaseStudies.tsx');
fixLinks('src/components/organisms/RelatedCaseStudiesSlider.tsx');
fixLinks('src/components/Navbar.tsx');
fixLinks('src/components/organisms/ModernHeroCenterpiece.tsx');

