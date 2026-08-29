const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace prunable-count
code = code.replace(/app\.get\("\/api\/admin\/prunable-count", verifyFirebaseToken, async \(req, res\) => \{[\s\S]*?\}\);/g, 
`app.get("/api/admin/prunable-count", verifyFirebaseToken, async (req, res) => {
  res.json({ count: 0 });
});`);

// Replace prune-workspace
code = code.replace(/app\.post\("\/api\/ai\/prune-workspace", async \(req, res\) => \{[\s\S]*?\}\);/g, 
`app.post("/api/ai/prune-workspace", async (req, res) => {
  res.json({ success: true, pruned: 0, reason: "Pruning delegated to client side." });
});`);

fs.writeFileSync('server.ts', code);
console.log("Patched prune endpoints");
