const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Clean up broken import React ... { useState } block
  // The error line looks like:
  // import React
  // import MetaTags from '../components/atoms/MetaTags';
  // import { generateCourseSchema } from '../lib/seo';, { useState, useEffect } from 'react';
  
  // Replace the whole mess
  const regex = /import React\s+import MetaTags from '\.\.\/components\/atoms\/MetaTags';\s+import \{ generateCourseSchema \} from '\.\.\/lib\/seo';(.*?)from 'react';/;
  code = code.replace(regex, "import React$1 from 'react';\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generateCourseSchema } from '../lib/seo';");
  
  fs.writeFileSync(file, code);
}

fix('src/pages/AcademyMasterclassPage.tsx');
fix('src/pages/AcademyResourcesPage.tsx');
fix('src/pages/AcademyPage.tsx');

