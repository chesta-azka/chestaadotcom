const admin = require('firebase-admin');
admin.initializeApp({ projectId: 'core-lambda-wcf5x' });
console.log("App initialized.");
try {
  admin.auth().verifyIdToken("invalid-token").catch(e => console.log("Auth error:", e.message));
} catch(e) {
  console.log("Error:", e.message);
}
