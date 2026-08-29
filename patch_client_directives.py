import os

def add_use_client(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r') as f:
        content = f.read()
    if '"use client"' not in content and "'use client'" not in content:
        with open(filepath, 'w') as f:
            f.write('"use client";\n' + content)

add_use_client('src/hooks/useCommLink.ts')
add_use_client('src/components/CommLinkClient.tsx')
add_use_client('src/components/CommLinkAdmin.tsx')
add_use_client('src/lib/firebase.ts') # Optionally we can ensure firebase.ts doesn't crash SSR
