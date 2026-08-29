import re

with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

chat_pattern = re.compile(r"\{activeTab === 'chat' && \(\s*<div className=\"bg-white rounded-3xl.*?</div>\s*\)\}", re.DOTALL)

new_chat = """{activeTab === 'chat' && (
        <div className="space-y-8">
          <div className="flex items-end justify-between border-b-2 border-black pb-4">
            <div>
              <h2 className="text-3xl font-mono font-black text-black uppercase tracking-tighter mb-2">Comm-Link Audit</h2>
              <p className="text-black font-mono text-sm">Intercepted neural chat logs from the Floating AI Assistant.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={16} />
              <input 
                type="text"
                placeholder="SEARCH TRANSMISSIONS..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="pl-10 pr-4 py-2 bg-white border-2 border-black font-mono text-sm focus:outline-none focus:bg-slate-50 w-full sm:w-[300px] uppercase placeholder:text-slate-400"
              />
              <AnimatePresence>
                {showSuggestions && autocompleteSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden"
                  >
                    {autocompleteSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-mono text-black hover:bg-black hover:text-white transition-colors uppercase border-b-2 border-black last:border-b-0"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-2 border-black bg-white flex flex-col">
            <div className="bg-black text-white px-4 py-3 border-b-2 border-black flex justify-between items-center">
              <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Transmission Stream</h3>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} />
                <span className="font-mono text-xs font-bold">{filteredLogs.length} LOGS INTERCEPTED</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-50 min-h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 size={24} className="text-black animate-spin" />
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center text-black font-mono py-10 uppercase font-bold text-sm">
                  No transmissions detected.
                </div>
              ) : (
                <div className="divide-y-2 divide-black">
                  {filteredLogs.map((log) => {
                    const sentiment = getSentiment(log.message || '');
                    return (
                      <div key={log.id} className="p-6 bg-white hover:bg-slate-100 transition-colors flex gap-6">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-white shrink-0">
                          <MessageSquare size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-mono font-bold text-black uppercase tracking-wider">Unidentified Visitor</p>
                            <div className="flex items-center gap-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 border-2 border-black ${sentiment === 'positive' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                {sentiment}
                              </span>
                              <span className="text-xs font-mono font-bold text-black flex items-center gap-1">
                                <Clock size={12} />
                                {log.timestamp ? new Date(log.timestamp.toDate()).toLocaleString('id-ID') : '00:00:00'}
                              </span>
                            </div>
                          </div>
                          <p className="text-base font-mono text-slate-800 leading-relaxed border-l-4 border-black pl-4">"{log.message}"</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}"""

content = chat_pattern.sub(new_chat, content)

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)

