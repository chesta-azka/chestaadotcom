const fs = require('fs');

const file1 = 'src/app/academy/[slug]/page.tsx';
let content1 = fs.readFileSync(file1, 'utf-8');
content1 = content1.replace(/@\/lib\/firebase/g, '../../../lib/firebase');
fs.writeFileSync(file1, content1);

const file2 = 'src/app/academy/quiz/[moduleId]/page.tsx';
let content2 = fs.readFileSync(file2, 'utf-8');
content2 = content2.replace(/@\/lib\/firebase/g, '../../../../lib/firebase');
fs.writeFileSync(file2, content2);

