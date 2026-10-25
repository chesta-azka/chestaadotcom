import React, { useEffect, useRef, useState } from 'react';
import { getImageAsset, SiteImageAsset } from '../../config/images';
import { detectMotionMode } from '../../lib/motion';

interface SmartImageProps {
  imageKey?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  badgeLabel?: string;
  viewTransitionName?: string;
  disableClipReveal?: boolean;
}

/**
 * Resilient Image component that reads from src/config/images.ts,
 * enforces explicit width/height attributes to prevent CLS, supports
 * priority (fetchPriority="high" + eager loading) vs below-the-fold lazy loading,
 * performs clip-path inset(8% round 16px) -> 0 + 1.06 -> 1 scale settle on enter,
 * includes a subtle blur-up placeholder that fades out with opacity,
 * and falls back gracefully to a soft lavender + purple #7C54E0 canvas if missing.
 */
export default function SmartImage({
  imageKey,
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  badgeLabel,
  viewTransitionName,
  disableClipReveal = false,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(priority);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  const asset: SiteImageAsset = getImageAsset(imageKey || src || 'ogDefault');
  const resolvedSrc = src || asset.src;
  const resolvedAlt = alt || asset.alt;
  const resolvedWidth = width || asset.width || 1200;
  const resolvedHeight = height || asset.height || 900;

  useEffect(() => {
    const el = imgRef.current;
    if (!el || priority) {
      setInView(true);
      return;
    }
    if (detectMotionMode() === 'reduced') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  const transitionStyle: React.CSSProperties | undefined = viewTransitionName
    ? ({ viewTransitionName } as React.CSSProperties)
    : undefined;

  if (hasError || !resolvedSrc) {
    return (
      <div
        role="img"
        aria-label={resolvedAlt}
        className={`relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F8F6FE] to-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between p-6 select-none ${className}`}
        style={{
          aspectRatio: `${resolvedWidth} / ${resolvedHeight}`,
          ...transitionStyle,
        }}
      >
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(124, 84, 224, 0.18), transparent 55%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#5B5675]">
          <span className="font-semibold text-[#17122B]">CHESTAADOTCOM</span>
          {badgeLabel && <span className="text-[#6A3FD0] font-medium">{badgeLabel}</span>}
        </div>
        <div className="relative z-10 my-auto py-4">
          <div className="w-10 h-0.5 bg-[#7C54E0] mb-3 rounded-full" />
          <p className="text-sm sm:text-base font-semibold text-[#17122B] line-clamp-2 max-w-md">
            {resolvedAlt}
          </p>
        </div>
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[#5B5675]">
          <span>chestaa.com</span>
          <span>Verified Production</span>
        </div>
      </div>
    );
  }

  const revealedState = isLoaded && inView ? 'loaded' : 'pending';

  return (
    <img
      ref={imgRef}
      src={resolvedSrc}
      alt={resolvedAlt}
      width={resolvedWidth}
      height={resolvedHeight}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // @ts-ignore
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      data-img-state={disableClipReveal ? 'loaded' : revealedState}
      style={transitionStyle}
      className={`bg-[#F8F6FE] object-cover card-image-zoom ${
        disableClipReveal ? '' : 'img-clip-reveal'
      } ${isLoaded ? 'opacity-100' : 'opacity-90'} ${className}`}
    />
  );
}
