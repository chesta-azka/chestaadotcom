const fs = require('fs');
let code = fs.readFileSync('src/hooks/useEcosystemChat.ts', 'utf8');

const targetStr = `export function useEcosystemChat(workspaceId: string, archiveMode: boolean = false) {`;
const newStr = `export function useEcosystemChat(workspaceId: string, archiveMode: boolean = false, currentUserRole: string = 'client') {
  const [isProtected, setIsProtected] = useState(false);

  const toggleWorkspaceProtection = async () => {
    if (currentUserRole !== 'admin') return;
    try {
      const newProtectedState = !isProtected;
      setIsProtected(newProtectedState);
      await updateDoc(doc(db, 'workspaces', workspaceId), { neverDelete: newProtectedState });
    } catch (e) {
      console.error('Failed to toggle protection', e);
      // Revert optimism
      setIsProtected(!isProtected);
    }
  };
`;

code = code.replace(targetStr, newStr);

const fetchTarget = `const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');`;
const fetchReplacement = `
    const wsRef = doc(db, 'workspaces', workspaceId);
    onSnapshot(wsRef, (snap) => {
      if (snap.exists()) {
        setIsProtected(!!snap.data().neverDelete);
      }
    });

    const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');
`;

code = code.replace(fetchTarget, fetchReplacement);

const returnTarget = `return { messages, loading, error };`;
const returnReplacement = `return { messages, loading, error, isProtected, toggleWorkspaceProtection };`;
code = code.replace(returnTarget, returnReplacement);

fs.writeFileSync('src/hooks/useEcosystemChat.ts', code);
console.log('Hook updated successfully');
