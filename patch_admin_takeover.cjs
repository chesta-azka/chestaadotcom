const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf8');

// Inject the RealTimeTakeover component and the "Convert to Client" in AILeadsScoringDashboard

// 1. Convert to Client logic
const leadsTableTarget = `<th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Timestamp</th>
              </tr>
            </thead>`;
const leadsTableReplacement = `<th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Timestamp</th>
                <th className="px-4 py-3 font-mono text-xs font-bold uppercase border-b-2 border-black text-black">Action</th>
              </tr>
            </thead>`;
code = code.replace(leadsTableTarget, leadsTableReplacement);

const leadsRowTarget = `<td className="px-4 py-3 font-mono text-xs text-black">{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString('id-ID') : '-'}</td>
                </tr>`;
const leadsRowReplacement = `<td className="px-4 py-3 font-mono text-xs text-black">{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleString('id-ID') : '-'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-black">
                    <button 
                       onClick={() => handleConvertToClient(lead)}
                       className="px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
                    >
                      Convert to Client
                    </button>
                  </td>
                </tr>`;
code = code.replace(leadsRowTarget, leadsRowReplacement);

// Insert handleConvertToClient
const leadsFuncTarget = `  const handleProcessLeads = async () => {`;
const leadsFuncReplacement = `  const handleConvertToClient = async (lead: any) => {
    try {
      const workspaceId = \`WS-\${Math.random().toString(36).substring(2, 8).toUpperCase()}\`;
      const passcode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const wsRef = doc(db, 'workspaces', workspaceId);
      await setDoc(wsRef, {
         passcode,
         createdAt: serverTimestamp(),
         clientName: "New VIP Client",
         leadSourceId: lead.id,
         status: 'active'
      });
      
      const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');
      await setDoc(doc(messagesRef), {
         sender: 'admin',
         text: 'Welcome to your VIP Workspace! Our Principal Engineer will be with you shortly.',
         timestamp: serverTimestamp(),
         read: false
      });
      
      toast.success(\`Converted! Link: /client?ws=\${workspaceId} | Passcode: \${passcode}\`, { duration: 10000 });
      // We could also update the lead to mark it converted
      await updateDoc(doc(db, 'ai_leads', lead.id), { converted: true });
    } catch(e) {
       toast.error("Failed to convert lead.");
    }
  };

  const handleProcessLeads = async () => {`;
code = code.replace(leadsFuncTarget, leadsFuncReplacement);

// 2. Real-Time Takeover Listener
const adminRenderTarget = `return (
    <AdminDashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>`;
const adminRenderReplacement = `return (
    <AdminDashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      <LiveTakeoverManager />`;
code = code.replace(adminRenderTarget, adminRenderReplacement);

const takeoverManagerComp = `
function LiveTakeoverManager() {
  const [takeoverSession, setTakeoverSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    // Listen for chat sessions requiring human
    const q = query(
      collection(db, 'ai_chat_sessions'), 
      where('requiresHuman', '==', true),
      where('humanTakeover', '==', false)
    );
    
    const unsub = onSnapshot(q, (snapshot) => {
       snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
             const data = change.doc.data();
             if (!data.humanTakeover) {
                toast(\`HOT LEAD ALERT: Visitor requesting human connection! Session ID: \${change.doc.id}\`, {
                   duration: 10000,
                   icon: '🚨',
                   style: { background: '#000', color: '#fff' }
                });
                // Allow admin to click to take over
                const id = change.doc.id;
                setTimeout(() => {
                   if(window.confirm(\`Take over chat session \${id}?\`)) {
                      handleTakeover(id);
                   }
                }, 500); // Wait for toast, then prompt (or could make toast actionable)
             }
          }
       });
    });
    return unsub;
  }, []);

  const handleTakeover = async (id: string) => {
     try {
       await updateDoc(doc(db, 'ai_chat_sessions', id), {
          humanTakeover: true,
          humanTakeoverAt: serverTimestamp()
       });
       setTakeoverSession(id);
     } catch(e) {
       toast.error("Takeover failed");
     }
  };

  useEffect(() => {
    if (!takeoverSession) return;
    const unsub = onSnapshot(doc(db, 'ai_chat_sessions', takeoverSession), (snap) => {
       if (snap.exists()) {
          setMessages(snap.data().messages || []);
       }
    });
    return unsub;
  }, [takeoverSession]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !takeoverSession) return;
    
    const newMessages = [...messages, { role: 'ai', content: inputMsg.trim() }];
    setMessages(newMessages); // optimistic
    setInputMsg('');
    
    await updateDoc(doc(db, 'ai_chat_sessions', takeoverSession), {
       messages: newMessages,
       lastUpdated: serverTimestamp()
    });
  };

  if (!takeoverSession) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 flex flex-col h-[500px]">
       <div className="bg-black text-white p-3 flex justify-between items-center border-b-2 border-black">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-mono font-bold text-sm">LIVE OVERRIDE</h3>
          </div>
          <button onClick={() => setTakeoverSession(null)}><X size={16} /></button>
       </div>
       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
             <div key={i} className={\`flex flex-col \${m.role === 'user' ? 'items-start' : 'items-end'}\`}>
               <span className="text-[10px] font-mono font-bold mb-1 text-slate-500">
                 {m.role === 'user' ? 'VISITOR' : 'PRINCIPAL ENGINEER'}
               </span>
               <div className={\`px-4 py-2 \${m.role === 'user' ? 'bg-white border-2 border-black text-black' : 'bg-black text-white'} font-sans text-sm max-w-[85%]\`}>
                 {m.content}
               </div>
             </div>
          ))}
       </div>
       <form onSubmit={sendMessage} className="border-t-2 border-black p-3 bg-white flex gap-2">
         <input 
           value={inputMsg}
           onChange={e => setInputMsg(e.target.value)}
           className="flex-1 border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none"
           placeholder="Override Groq..."
         />
         <button type="submit" className="bg-black text-white px-4 py-2 font-bold font-mono">
           SEND
         </button>
       </form>
    </div>
  );
}

`;

code = takeoverManagerComp + code;

fs.writeFileSync('src/pages/AdminPage.tsx', code);
console.log('AdminPage patched for Step 2 and 3');
