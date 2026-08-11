#!/bin/bash
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/text-indigo-600xl/text-4xl/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/text-whitexl/text-6xl/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/text-indigo-600/text-[#4f46e5]/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-indigo-600/bg-[#4f46e5]/g'
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/border-indigo-600/border-[#4f46e5]/g'
