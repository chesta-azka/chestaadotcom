const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const oldAuth = `    try {
      if (isSetup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Admin account created!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login berhasil');
      }
    } catch (error: any) {
      toast.error(error.message || 'Autentikasi gagal');
    }`;

const newAuth = `    try {
      if (isSetup) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          toast.success('Admin account created!');
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            toast.success('Akun sudah ada, mencoba masuk otomatis...');
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login berhasil');
          } else {
            throw err;
          }
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Login berhasil');
      }
    } catch (error: any) {
      // Translate common error messages
      let msg = error.message || 'Autentikasi gagal';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        msg = 'Email atau password salah';
      }
      toast.error(msg);
    }`;

code = code.replace(oldAuth, newAuth);
fs.writeFileSync('src/pages/AdminPage.tsx', code);
