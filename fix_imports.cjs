const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/import React\nimport MetaTags from '\.\.\/components\/atoms\/MetaTags';\nimport \{ generateCourseSchema \} from '\.\.\/lib\/seo';, \{ useState \} from 'react';/, 
  "import React, { useState } from 'react';\nimport MetaTags from '../components/atoms/MetaTags';\nimport { generateCourseSchema } from '../lib/seo';");
  
  fs.writeFileSync(file, code);
}

fix('src/pages/AcademyPage.tsx');
fix('src/pages/AcademyMasterclassPage.tsx');
fix('src/pages/AcademyResourcesPage.tsx');

