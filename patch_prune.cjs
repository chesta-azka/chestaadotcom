const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf8');

const targetRegex = /\/\/ API: AI-Driven Workspace Pruning[\s\S]*?(?=\/\/ Vite middleware for development)/;

const newEndpoint = `
// API: AI-Driven Workspace Pruning
app.post("/api/ai/prune-workspace", async (req, res) => {
  const { workspaceId, archiveMode } = req.body;
  if (!workspaceId) return res.status(400).json({ error: "Missing workspaceId" });

  try {
    const db = getFirestore(getApps()[0], firebaseConfig.firestoreDatabaseId);
    
    // Admin Override Check
    const workspaceDoc = await db.collection('workspaces').doc(workspaceId).get();
    if (workspaceDoc.exists && workspaceDoc.data().neverDelete === true) {
      return res.json({ success: true, pruned: 0, reason: "Skipped: Workspace is protected by admin (Keep Forever)." });
    }

    const messagesRef = db.collection('workspaces').doc(workspaceId).collection('chat_messages');
    
    // Check if there are messages older than 30 days
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    
    const oldMessagesSnapshot = await messagesRef.where('timestamp', '<', oneMonthAgo).get();
    if (oldMessagesSnapshot.empty) {
      return res.json({ success: true, pruned: 0, reason: "No old messages found." });
    }

    // There are old messages. Evaluate lead probability score using AI.
    const recentSnapshot = await messagesRef.orderBy('timestamp', 'desc').limit(30).get();
    const messages = [];
    recentSnapshot.forEach(doc => {
      const data = doc.data();
      messages.push(\`\${data.sender}: \${data.text || (data.fileUrl ? "File uploaded" : "Audio uploaded")}\`);
    });
    
    // Check for low engagement (fewer than 5 messages total in recent context could mean low engagement)
    if (messages.length < 2) {
        // Very low engagement, prune directly
    } else {
        const transcript = messages.reverse().join('\\n');
        let probabilityScore = 100; // Default to high to avoid accidental deletion
        
        if (genAI) {
          try {
            const prompt = \`You are an AI sales analyst. Review the following chat transcript between a client and admin/system.
Calculate a 'lead probability score' from 0 to 100 representing the likelihood that this client will purchase, subscribe, or engage meaningfully.
Reply ONLY with the integer number (0-100), nothing else.

Transcript:
\${transcript}\`;
            
            const response = await genAI.models.generateContent({
              model: "gemini-3.6-flash",
              contents: prompt
            });
            
            const aiText = response.text?.trim() || "100";
            const parsedScore = parseInt(aiText.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(parsedScore)) {
              probabilityScore = parsedScore;
            }
          } catch (aiErr) {
            console.error("AI intent evaluation failed, defaulting to 100:", aiErr);
          }
        }

        // If score is >= 15%, we DO NOT delete.
        if (probabilityScore >= 15) {
          return res.json({ success: true, pruned: 0, reason: \`Skipped pruning: AI determined high purchase intent (Score: \${probabilityScore}%).\` });
        }
    }

    // If intent is < 15%, proceed with pruning
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
    res.json({ success: true, pruned: count, reason: "Pruned due to low engagement & probability score < 15%." });

  } catch (error) {
    console.error("Prune workspace error:", error);
    res.status(500).json({ error: error.message });
  }
});

`;

server = server.replace(targetRegex, newEndpoint);
fs.writeFileSync('server.ts', server);
console.log('AI Pruning updated with <15% logic and admin override.');
