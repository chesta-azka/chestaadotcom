const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

const importAdmin = "import AdminPage from './pages/AdminPage.tsx';\nimport NotFoundPage";
app = app.replace("import NotFoundPage", importAdmin);

const routeAdmin = "<Route path=\"/admin\" element={<AdminPage />} />\n              <Route path=\"*\" element={<NotFoundPage />} />";
app = app.replace("<Route path=\"*\" element={<NotFoundPage />} />", routeAdmin);

fs.writeFileSync('src/App.tsx', app);
console.log('Added AdminPage route');
