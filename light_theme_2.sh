#!/bin/bash
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#131825\]\(\/[0-9]*\)\?/bg-gray-50/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#0A0D14\]\(\/[0-9]*\)\?/bg-white/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#0D111A\]\(\/[0-9]*\)\?/bg-white/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#06080F\]\(\/[0-9]*\)\?/bg-gray-100/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#090D15\]\(\/[0-9]*\)\?/bg-white/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#121A2D\]\(\/[0-9]*\)\?/bg-gray-50/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/#D4FF00/#4f46e5/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/#D4FF40/#4f46e5/g'
