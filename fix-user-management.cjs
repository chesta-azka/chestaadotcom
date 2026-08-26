const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

const oldUserFetch = `  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);`;

const newUserFetch = `  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching users realtime:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);`;

code = code.replace(oldUserFetch, newUserFetch);

const oldChatFetch = `  useEffect(() => {
    // Initial fetch
    const fetchLogs = async () => {
      try {
        const q = query(collection(db, 'chat_history'), orderBy('timestamp', 'desc'), limit(100));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();

    // Realtime listener for toasts
    const unsubscribe = onSnapshot(collection(db, 'chat_history'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' && !loading) {
            // Only toast if it's a new interaction added after initial load
            // A robust way is to check the timestamp, but this basic check works for simple demo
            const data = change.doc.data();
            if (data.timestamp && (Date.now() - data.timestamp.toMillis() < 5000)) {
                toast.success('Pesan chat baru diterima!');
            }
        }
      });
    });

    return () => unsubscribe();
  }, []);`;

const newChatFetch = `  useEffect(() => {
    const q = query(collection(db, 'chat_history'), orderBy('timestamp', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
      setLoading(false);
      
      // Toast notification for newly added items
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            const docData = change.doc.data();
            // If the message is very recent (less than 5 seconds old)
            if (docData.timestamp && (Date.now() - docData.timestamp.toMillis() < 5000)) {
                toast.success('Interaksi baru masuk secara realtime!');
            }
        }
      });
    }, (error) => {
      console.error("Failed to fetch logs in realtime:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);`;

if(code.includes(oldChatFetch)) {
  code = code.replace(oldChatFetch, newChatFetch);
} else {
  // Try an alternative regex replace or just leave it
}

fs.writeFileSync('src/pages/AdminPage.tsx', code);
