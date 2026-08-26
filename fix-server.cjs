const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const verifyRoute = `// API: Admin Verification
app.get("/api/admin/verify", verifyFirebaseToken, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
`;

code = code.replace(verifyRoute, '');
const middlewareDefinition = `// Middleware to verify Firebase ID Token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};`;

code = code.replace(middlewareDefinition, middlewareDefinition + "\n\n" + verifyRoute);
fs.writeFileSync('server.ts', code);
