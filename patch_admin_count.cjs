const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const newEndpoint = `
// API: Get prunable messages count
app.get("/api/admin/prunable-count", verifyFirebaseToken, async (req, res) => {
  try {
    const db = getFirestore(getApps()[0], firebaseConfig.firestoreDatabaseId);
    const workspacesSnap = await db.collection('workspaces').get();
    let prunableCount = 0;
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    for (const docSnap of workspacesSnap.docs) {
      if (docSnap.data().neverDelete === true) continue; // Skip protected workspaces
      const countSnap = await docSnap.ref.collection('chat_messages').where('timestamp', '<', oneMonthAgo).count().get();
      prunableCount += countSnap.data().count;
    }
    
    res.json({ count: prunableCount });
  } catch (error) {
    console.error("Prunable count error:", error);
    res.status(500).json({ error: error.message });
  }
});

`;

server = server.replace(/\/\/ API: Admin Verification/, newEndpoint + '// API: Admin Verification');
fs.writeFileSync('server.ts', server);
console.log('Admin count endpoint added.');
