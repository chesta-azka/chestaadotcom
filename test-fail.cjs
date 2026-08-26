const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const app = initializeApp({}); // Empty config!
try {
  const db = getFirestore(app);
  console.log("Success");
} catch (e) {
  console.error("Error:", e.message);
}
