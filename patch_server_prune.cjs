const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const newEndpoint = `
// API: AI-Driven Workspace Pruning
app.post("/api/ai/prune-workspace", async (req, res) => {
  const { workspaceId, archiveMode } = req.body;
  if (!workspaceId) return res.status(400).json({ error: "Missing workspaceId" });

  try {
    const db = getFirestore(getApps()[0], firebaseConfig.firestoreDatabaseId);
    const messagesRef = db.collection('workspaces').doc(workspaceId).collection('chat_messages');
    
    // Check if there are messages older than 30 days
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    
    const oldMessagesSnapshot = await messagesRef.where('timestamp', '<', oneMonthAgo).get();
    if (oldMessagesSnapshot.empty) {
      return res.json({ success: true, pruned: 0, reason: "No old messages found." });
    }

    // There are old messages. Evaluate purchase intent using AI.
    // Fetch last 30 messages for context
    const recentSnapshot = await messagesRef.orderBy('timestamp', 'desc').limit(30).get();
    const messages = [];
    recentSnapshot.forEach(doc => {
      const data = doc.data();
      messages.push(\`\${data.sender}: \${data.text || (data.fileUrl ? "File uploaded" : "Audio uploaded")}\`);
    });
    // Reverse to chronological
    const transcript = messages.reverse().join('\\n');

    let intentIsHigh = false;
    if (genAI) {
      try {
        const prompt = \`You are an AI sales analyst. Review the following chat transcript between a client and admin/system.
Determine if the client has a HIGH intent to purchase, subscribe, or do business (e.g., asking for pricing, ready to buy, highly engaged).
Reply with exactly "HIGH" or "LOW".

Transcript:
\${transcript}\`;
        
        const response = await genAI.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt
        });
        
        const aiText = response.text?.trim().toUpperCase() || "";
        if (aiText.includes("HIGH")) {
          intentIsHigh = true;
        }
      } catch (aiErr) {
        console.error("AI intent evaluation failed, defaulting to low intent:", aiErr);
      }
    }

    if (intentIsHigh) {
      return res.json({ success: true, pruned: 0, reason: "Skipped pruning: AI determined high purchase intent." });
    }

    // If intent is not high, proceed with pruning
    const batch = db.batch();
    let count = 0;
    oldMessagesSnapshot.forEach(docSnap => {
      if (archiveMode) {
        batch.update(docSnap.ref, { archived: true });
      } else {
        batch.delete(docSnap.ref);
      }
      count++;
    });

    await batch.commit();
    res.json({ success: true, pruned: count, reason: "Pruned due to low purchase intent." });

  } catch (error) {
    console.error("Prune workspace error:", error);
    res.status(500).json({ error: error.message });
  }
});

`;

// Insert just before Vite middleware
server = server.replace(/\/\/ Vite middleware for development/, newEndpoint + '// Vite middleware for development');
fs.writeFileSync('server.ts', server);
console.log('Server updated with AI pruning endpoint');
