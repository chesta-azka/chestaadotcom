const fs = require('fs');

let code = fs.readFileSync('src/pages/AcademyPage.tsx', 'utf8');
code = code.replace(
  /title="CHESTAADOTCOM Academy \| Belajar Full-Stack Web Development & AI"/,
  'title="CHESTAADOTCOM Academy | Belajar Web Dev & AI di BSD City & Cisauk"'
);
code = code.replace(
  /description="Tingkatkan skill coding Anda dengan materi eksklusif seputar React, Next.js, Node.js, dan Integrasi AI dari CHESTAADOTCOM Academy\."/,
  'description="Tingkatkan skill coding Anda dengan materi eksklusif React, Next.js, dan AI. Tech academy & resource hub terkemuka di BSD City & Cisauk, Tangerang."'
);
fs.writeFileSync('src/pages/AcademyPage.tsx', code);

code = fs.readFileSync('src/pages/QuizIndexPage.tsx', 'utf8');
code = code.replace(
  /title="Technical Quiz & Assessment \| CHESTAADOTCOM Academy"/,
  'title="Technical Quiz & Assessment | CHESTAADOTCOM Academy BSD & Cisauk"'
);
code = code.replace(
  /description="Uji kemampuan teknis Anda di bidang modern web architecture, React, Next\.js, dan AI\. Dapatkan analisis dan roadmap belajar khusus\."/,
  'description="Uji kemampuan teknis Anda di bidang modern web architecture dan AI. Dapatkan roadmap belajar khusus dari software house elit di BSD City & Cisauk."'
);
fs.writeFileSync('src/pages/QuizIndexPage.tsx', code);

code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');
// Check if MetaTags exists and if it has a title
if (code.includes('<MetaTags')) {
  // It might not have explicit BSD in title/desc, let's update it if needed.
  // Actually, wait, let's check what MetaTags args it has.
}
