#!/bin/bash
sed -i 's/<ScrollingTechTicker \/>/<\/div>\n      <SectionSeparator \/>\n      <div className="snap-start my-4">\n        <ScrollingTechTicker \/>/' src/pages/HomePage.tsx
sed -i 's/<StatsCounter \/>/<StatsCounter \/>\n        <\/FadeInSection>\n      <\/div>\n      <SectionSeparator \/>/' src/pages/HomePage.tsx
