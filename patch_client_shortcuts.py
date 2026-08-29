with open("src/components/ClientKanbanView.tsx", "r") as f:
    content = f.read()

import re
old_textarea = """<textarea
                        autoFocus
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}"""

new_textarea = """<textarea
                        autoFocus
                        value={revisionNote}
                        onChange={(e) => setRevisionNote(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.ctrlKey && e.key === 'Enter') {
                            e.preventDefault();
                            handleRevisionSubmit(ticket.id);
                          }
                        }}"""

content = content.replace(old_textarea, new_textarea)

with open("src/components/ClientKanbanView.tsx", "w") as f:
    f.write(content)
