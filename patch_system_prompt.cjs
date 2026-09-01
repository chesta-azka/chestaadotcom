const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `3. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>\`;`;

const replacement = `3. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>

4. Sangat disarankan untuk sesekali menyertakan opsi <opsi>Hubungi Admin Manusia</opsi> jika Anda merasa user membutuhkan bantuan lebih lanjut atau negosiasi.\`;`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('server.ts', code);
  console.log("Patched system prompt");
} else {
  console.log("Target system prompt not found!");
}
