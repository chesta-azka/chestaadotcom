const fs = require('fs');

const filePath = 'src/data/academy-curriculum.json';
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Modify Module 1 slightly to make the VS Code installation explicit if needed
const module0 = {
  "id": "module-0",
  "title": "Modul 0: Persiapan Instalasi VS Code & Git",
  "content": "Sebelum kita mulai ngoding, kita wajib menyiapkan 'senjata' utama kita. Dalam modul ini kita akan menginstal Visual Studio Code (VS Code) dan Git.",
  "submodules": [
    {
      "id": "sub-0-1",
      "title": "0.1 Instalasi Visual Studio Code & Git",
      "content": "Langkah pertama untuk menjadi developer adalah menggunakan alat yang tepat.\n\n1. Unduh VS Code dari [code.visualstudio.com](https://code.visualstudio.com/) dan install.\n2. Unduh Git dari [git-scm.com](https://git-scm.com/) dan install.\n3. Buka VS Code, pilih tab **Extensions** di sebelah kiri (atau `Ctrl+Shift+X`).\n4. Cari dan install ekstensi **ESLint**, **Prettier**, dan **Tailwind CSS IntelliSense**.",
      "filename": "Info",
      "code": "Alat kerja Anda sudah siap! Lanjut ke Modul 1.",
      "lang": "text"
    }
  ]
};

const module6 = {
  "id": "module-6",
  "title": "Modul 6: Deploy ke GitHub dan Vercel",
  "content": "Aplikasi kita sudah jadi! Sekarang saatnya *publish* karya kita agar bisa diakses oleh seluruh dunia. Kita akan menyimpan kode kita di GitHub, lalu melakukan deploy otomatis menggunakan platform serverless Vercel.",
  "submodules": [
    {
      "id": "sub-6-1",
      "title": "6.1 Push Kode ke GitHub",
      "content": "GitHub adalah portofolio developer. Mari kita simpan kode kita ke sana.\n\n1. Buat repository kosong baru di [github.com](https://github.com).\n2. Buka terminal di VS Code (`Ctrl+\\``).\n3. Inisialisasi dan push kode menggunakan perintah berikut (pastikan mengganti username dan repo Anda):",
      "filename": "Terminal",
      "code": "git init\ngit add .\ngit commit -m \"feat: complete spotify clone app\"\ngit branch -M main\n\ngit remote add origin https://github.com/USERNAME/REPO_NAME.git\n\ngit push -u origin main",
      "lang": "bash"
    },
    {
      "id": "sub-6-2",
      "title": "6.2 Deploy ke Internet via Vercel",
      "content": "Vercel adalah platform hosting terbaik untuk men-deploy aplikasi Next.js/React secara instan.\n\n1. Kunjungi [vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.\n2. Klik tombol **Add New...** > **Project**.\n3. Di samping repository GitHub Anda tadi, klik tombol **Import**.\n4. Biarkan pengaturan default, dan klik **Deploy**.\n\nDalam 1-2 menit, Vercel akan mem-build aplikasi Anda dan memberikan URL publik yang siap dibagikan ke teman atau LinkedIn!",
      "filename": "Info",
      "code": "🎉 Selamat! Aplikasi musik Anda sudah online. 🎉\n\nAkses URL dari Vercel (contoh: https://vibe-music-clone.vercel.app).",
      "lang": "text"
    }
  ]
};

data.tutorialContent.unshift(module0);
data.tutorialContent.push(module6);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Modified curriculum');
