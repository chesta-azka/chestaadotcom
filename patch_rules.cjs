const fs = require('fs');

let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
  /match \/blog_interactions\/\{docId\} \{[\s\n]+allow read, write: if true;[\s\n]+\}/g,
  `match /blog_interactions/{document=**} {
      allow read, write: if true;
    }`
);

// Add missing collections
const missingCollections = `
    match /chat_history/{docId} {
      allow read, write: if true;
    }
    match /faqs/{docId} {
      allow read, write: if true;
    }
    match /newsletter_subscribers/{docId} {
      allow create: if true;
      allow read, write: if isAdmin();
    }
    match /page_content/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /workspaces/{workspaceId}/kanban_tickets/{ticketId} {
      allow read, write: if true;
    }
`;

rules = rules.replace(/match \/blog_interactions\/\{document=\*\*\} \{/, missingCollections + '\n    match /blog_interactions/{document=**} {');

fs.writeFileSync('firestore.rules', rules);
console.log('Patched firestore.rules');
