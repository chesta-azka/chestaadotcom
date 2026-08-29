import re

with open("server.ts", "r") as f:
    content = f.read()

old_route_pattern = re.compile(r'app\.post\("/api/score-lead", async \(req, res\) => \{.*?\n\}\);\n', re.DOTALL)

new_route = """app.post("/api/score-lead", async (req, res) => {
  const { leadId } = req.body;
  if (!leadId) {
    return res.status(400).json({ error: "Missing leadId" });
  }

  try {
    const db = getFirestore();
    const sessionDoc = await db.collection('ai_chat_sessions').doc(leadId).get();
    
    if (!sessionDoc.exists) {
      return res.status(404).json({ error: "Session not found" });
    }

    const sessionData = sessionDoc.data() || {};
    const messages = sessionData.messages || [];
    const transcript = messages.map((m: any) => `${m.role}: ${m.content}`).join('\\n');

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const prompt = `You are a B2B sales lead analyst. Evaluate the following chat transcript between a user and an AI assistant.
Determine the lead score/category for this user.
Choose EXACTLY ONE from:
- Hot (Very interested, asking for pricing, wants contact, ready to buy)
- Warm (Interested, asking about features, exploring)
- Cold (Just browsing, short conversation, no clear intent)

Return ONLY the category word (Hot, Warm, or Cold).

Transcript:
${transcript}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
      temperature: 0.1,
      max_tokens: 10,
    });

    let score = chatCompletion.choices[0]?.message?.content?.trim() || "Cold";
    if (score.toLowerCase().includes("hot")) score = "Hot";
    else if (score.toLowerCase().includes("warm")) score = "Warm";
    else score = "Cold";

    await db.collection('ai_leads').doc(leadId).set({
      sessionId: leadId,
      score: score,
      createdAt: new Date(),
      messageCount: messages.length,
      userId: sessionData.userId || 'anonymous'
    });

    await db.collection('ai_chat_sessions').doc(leadId).update({ leadScored: true });

    res.json({ success: true, ai_score: score });
  } catch (error: any) {
    console.error("Lead scoring failed:", error);
    res.status(500).json({ error: error.message });
  }
});
"""

content = old_route_pattern.sub(new_route, content)

with open("server.ts", "w") as f:
    f.write(content)

