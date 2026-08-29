const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf-8');

// Insert ai_knowledge_base rule
const knowledgeBaseRule = `    match /ai_knowledge_base/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
`;

rules = rules.replace(
  "    match /chat_history/{document=**} {",
  knowledgeBaseRule + "    match /chat_history/{document=**} {"
);

fs.writeFileSync('firestore.rules', rules);
