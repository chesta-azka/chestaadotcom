const admin = require('firebase-admin');
admin.initializeApp({ projectId: 'core-lambda-wcf5x' });
async function run() {
  try {
    const db = admin.firestore();
    const snap = await db.collection('chat_logs').limit(1).get();
    console.log("Firestore OK", snap.size);
  } catch(e) {
    console.error("Firestore ERROR", e);
  }
}
run();
