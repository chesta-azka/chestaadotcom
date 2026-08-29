const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf-8');

const targetRule = `    match /ai_knowledge_base/{document=**} {`;
const replaceRule = `    match /page_content/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /ai_knowledge_base/{document=**} {`;

if (!code.includes('match /page_content')) {
  code = code.replace(targetRule, replaceRule);
  fs.writeFileSync('firestore.rules', code);
  console.log("Updated firestore.rules");
}
