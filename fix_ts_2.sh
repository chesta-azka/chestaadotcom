#!/bin/bash
sed -i 's/return this.props.children;/return (this.props as any).children;/' src/components/atoms/ErrorBoundary.tsx
sed -i 's/${props.className || '"''"'}/${(props as any).className || '"''"'}/' src/components/atoms/LazyImage.tsx
sed -i 's/import { motion, useScroll, useTransform, useMotionValue, useSpring } from '"'"'motion\/react'"'"';/import React from '"'"'react'"'"';\nimport { motion, useScroll, useTransform, useMotionValue, useSpring } from '"'"'motion\/react'"'"';/' src/components/organisms/HeroSection.tsx
sed -i '/export interface ProjectCardProps {/a\  key?: string | number;' src/components/molecules/ProjectCard.tsx
