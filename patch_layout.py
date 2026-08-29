with open("src/app/layout.tsx", "r") as f:
    content = f.read()

content = content.replace("import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';", "import { NextErrorBoundary } from '../components/atoms/NextErrorBoundary';\nimport { Navbar } from '../components/Navbar';")
content = content.replace("<NextErrorBoundary>\n            {children}", "<NextErrorBoundary>\n            <Navbar />\n            {children}")

with open("src/app/layout.tsx", "w") as f:
    f.write(content)
