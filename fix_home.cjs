const fs = require('fs');
let code = fs.readFileSync('src/pages/AcademyMasterclassPage.tsx', 'utf8');

// remove any corrupted import line around Home
code = code.replace(/import\s*\{[^}]+\}\s*from\s*'lucide-react';/g, '');
code = code.replace(/import\s*\{[^}]+\}\s*,\s*Home\s*from\s*'lucide-react';/g, '');

// Insert a clean import at the top
const cleanImport = "import { Home, Bookmark, BookmarkCheck, ChevronDown, ChevronRight, ArrowLeft, FileCode, Check, Copy, Share2, Printer, Search, Menu, X, AlignLeft } from 'lucide-react';";
code = cleanImport + "\n" + code;

fs.writeFileSync('src/pages/AcademyMasterclassPage.tsx', code);
console.log('Cleaned and fixed imports');
