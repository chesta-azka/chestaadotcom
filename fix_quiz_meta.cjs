const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyQuizPage.tsx', 'utf8');

code = code.replace(
  /title="Interactive Coding Quiz \| CHESTAADOTCOM Academy"/,
  'title="Interactive Coding Quiz di BSD City & Cisauk | CHESTAADOTCOM"'
);
code = code.replace(
  /description="Evaluasi pemahaman Anda dalam Next\.js, Node\.js, dan arsitektur AI modern dengan tes interaktif langsung\."/,
  'description="Evaluasi pemahaman tech stack Next.js dan AI Anda dengan tes interaktif dari software house elit di BSD City & Cisauk."'
);

fs.writeFileSync('src/pages/AcademyQuizPage.tsx', code);
