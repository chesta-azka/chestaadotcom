with open("src/pages/AdminPage.tsx", "r") as f:
    content = f.read()

bad_snippet = """      )}
          </div>
        </div>
      )}

      {activeTab === 'stats' && ("""

good_snippet = """      )}

      {activeTab === 'stats' && ("""

content = content.replace(bad_snippet, good_snippet)

with open("src/pages/AdminPage.tsx", "w") as f:
    f.write(content)
