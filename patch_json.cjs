const fs = require('fs');

let content = fs.readFileSync('src/data/academy-curriculum.json', 'utf8');

// The user said: "ok2 gua mau tuh contoh yg di atas ini setelah pemutaran. kasih space line trs baru dehh lanjut lagi giruu, soal nya belum ada di tampilan nya masih dempetann gitu"
// Let's replace the "\n\n**Penempatan File:**" across the file with "<br/><br/>**Penempatan File:**"
content = content.replace(/\\n\\n\*\*Penempatan File:\*\*/g, "<br/><br/><br/>**Penempatan File:**");
content = content.replace(/\\n\\n### Panduan Penempatan/g, "<br/><br/><br/>### Panduan Penempatan");

fs.writeFileSync('src/data/academy-curriculum.json', content);
console.log('Patched JSON');
