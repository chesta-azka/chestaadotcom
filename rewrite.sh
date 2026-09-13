#!/bin/bash
cat src/components/organisms/AboutMeSection.tsx | sed '/bentoCards.map/,/<\/div>/!b;//!d;/bentoCards.map/r template.txt' > temp.tsx
mv temp.tsx src/components/organisms/AboutMeSection.tsx
