const fs = require('fs');
let code = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf-8');

const oldUseEffect = `  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setRole(userDoc.data().role || 'user');
          } else {
            // New user, default to user
            await setDoc(userDocRef, {
              email: currentUser.email,
              role: 'user',
              createdAt: new Date()
            });
            setRole('user');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole('user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);`;

const newUseEffect = `  useEffect(() => {
    console.log("[AuthContext] Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("[AuthContext] Auth state changed. User:", currentUser ? currentUser.email : 'null');
      setUser(currentUser);
      if (currentUser) {
        try {
          console.log(\`[AuthContext] Fetching role for UID: \${currentUser.uid}\`);
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const currentRole = userDoc.data().role || 'user';
            console.log(\`[AuthContext] Role found in Firestore: \${currentRole}\`);
            setRole(currentRole);
          } else {
            console.log(\`[AuthContext] No role found. Creating default 'user' document for \${currentUser.email}\`);
            await setDoc(userDocRef, {
              email: currentUser.email,
              role: 'user',
              createdAt: new Date()
            });
            setRole('user');
          }
        } catch (error) {
          console.error("[AuthContext] Error fetching user role from Firestore:", error);
          setRole('user');
        }
      } else {
        console.log("[AuthContext] User is logged out. Clearing role state.");
        setRole(null);
      }
      setLoading(false);
    });
    
    return () => {
      console.log("[AuthContext] Cleaning up onAuthStateChanged listener...");
      unsubscribe();
    };
  }, []);`;

code = code.replace(oldUseEffect, newUseEffect);
fs.writeFileSync('src/contexts/AuthContext.tsx', code);
