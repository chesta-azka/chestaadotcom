const fs = require('fs');
let data = fs.readFileSync('src/pages/BlogPostPage.tsx', 'utf8');

// The corrupted if (!post) block:
const regex = /if \(!post\) \{[\s\S]*?<MetaTags[\s\S]*?\/>\s*\{\/\* Hero Section \*\/\}\s*<div[\s\S]*?className="absolute inset-0 bg-gradient-to-t from-purple-950 via-slate-950 to-purple-950\/95" \/>\s*<\/motion\.div>/;

// Looking for the rest of the if (!post) block and the actual return.
// Let's just restore the file using the backup if I have one? I don't.
