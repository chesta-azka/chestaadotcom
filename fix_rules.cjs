const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');
rules = rules.replace(/match \/chat_messages\/\{messageId\} \{[\s\S]*?allow read, write: if isAuthClient\(\) \|\| isAdmin\(\);\n      \}/, `match /chat_messages/{messageId} {\n        allow read, write: if true;\n      }\n      match /vault/{vaultId} {\n        allow read, write: if true;\n      }`);
fs.writeFileSync('firestore.rules', rules);
console.log('Rules updated');
