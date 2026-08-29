const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/app\.get\("\/api\/admin\/prunable-count", verifyFirebaseToken, async \(req, res\) => \{\n  res\.json\(\{ count: 0 \}\);\n\}\);\n  \} catch \(error\) \{\n    console\.error\("Prunable count error:", error\);\n    res\.status\(500\)\.json\(\{ error: error\.message \}\);\n  \}\n\}\);/g, 
`app.get("/api/admin/prunable-count", verifyFirebaseToken, async (req, res) => {
  res.json({ count: 0 });
});`);

fs.writeFileSync('server.ts', code);
console.log("Fixed syntax");
