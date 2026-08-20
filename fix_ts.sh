#!/bin/bash
sed -i 's/import { Component, ErrorInfo, ReactNode } from '"'"'react'"'"';/import React, { Component, ErrorInfo, ReactNode } from '"'"'react'"'"';/' src/components/atoms/ErrorBoundary.tsx
sed -i 's/export class ErrorBoundary extends Component/export class ErrorBoundary extends React.Component/' src/components/atoms/ErrorBoundary.tsx

sed -i 's/import { useState, useEffect } from '"'"'react'"'"';/import React, { useState, useEffect } from '"'"'react'"'"';/' src/components/atoms/LazyImage.tsx

sed -i '/interface DashboardNavItemProps {/a\  key?: string | number;' src/components/molecules/DashboardNavItem.tsx

sed -i 's/import { useState, useEffect } from '"'"'react'"'"';/import React, { useState, useEffect } from '"'"'react'"'"';/' src/components/organisms/FaqSection.tsx

sed -i 's/import { useState, useEffect, useRef } from '"'"'react'"'"';/import React, { useState, useEffect, useRef } from '"'"'react'"'"';/' src/components/organisms/HeroSection.tsx

sed -i '/interface ProjectCardProps {/a\  key?: string | number;' src/components/organisms/ProjectsSection.tsx

sed -i 's/interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {/interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {\n  referrerPolicy?: React.HTMLAttributeReferrerPolicy;/' src/components/atoms/LazyImage.tsx

