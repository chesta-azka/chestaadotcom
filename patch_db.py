with open("src/lib/db.ts", "r") as f:
    content = f.read()

content = content.replace("revision_note?: string;", "revision_notes?: { note: string, timestamp: any }[];")
content = content.replace("revision_note: '',", "revision_notes: [],")

with open("src/lib/db.ts", "w") as f:
    f.write(content)
