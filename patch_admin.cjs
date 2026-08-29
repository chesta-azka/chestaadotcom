const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

code = code.replace(/        const res = await fetch\('\/api\/score-lead', \{\n          method: 'POST',\n          headers: \{ 'Content-Type': 'application\/json' \},\n          body: JSON\.stringify\(\{ leadId: docSnap\.id \}\)\n        \}\);/g, 
`        const transcript = messages.map((m: any) => \`\${m.role}: \${m.content}\`).join('\\n');
        const res = await fetch('/api/score-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript })
        });`);
        
code = code.replace(/        if \(res\.ok\) \{\n          processed\+\+;\n        \}/g,
`        if (res.ok) {
          const data = await res.json();
          await updateDoc(doc(db, 'ai_chat_sessions', docSnap.id), { leadScored: true, ai_score: data.ai_score });
          await setDoc(doc(db, 'ai_leads', docSnap.id), {
            sessionId: docSnap.id,
            score: data.ai_score,
            createdAt: serverTimestamp(),
            messageCount: messages.length,
            userId: session.userId || 'anonymous'
          });
          processed++;
        }`);

fs.writeFileSync('src/pages/AdminPage.tsx', code);
console.log("Patched AdminPage.tsx");
