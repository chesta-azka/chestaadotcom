import React, { useState, useEffect, useRef } from 'react';
import { ImageIcon } from 'lucide-react';

/**
 * BlurImage - High performance custom Image component supporting blur-up placeholders
 * via low-resolution base64 images to improve visual performance and eliminate Cumulative
 * Layout Shift (CLS = 0) during blog and editorial content loading.
 */

export interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  blurDataURL?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '21/9' | string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  containerClassName?: string;
  fallbackIcon?: React.ReactNode;
}

// Ultra-lightweight base64 blur placeholders for instant rendering without network hops
export const DEFAULT_BLUR_BASE64 = 
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5IiB3aWR0aD0iMTYiIGhlaWdodD0iOSI+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI5IiBmaWxsPSIjZjFmMmY1IiBmaWx0ZXI9InVybCgjYikiLz48L3N2Zz4=';

export const EDITORIAL_SLATE_BLUR_BASE64 = 
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWUyOTNiIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGYxNzJhIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';

export const EDITORIAL_WARM_BLUR_BASE64 = 
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjhmOWZhIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTJlNjhjIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==';

/**
 * Generate a dynamic low-res base64 SVG data URI for custom aspect ratios
 */
export function generateBase64BlurPlaceholder(
  aspectRatio: string = '16/9',
  fromColor: string = '#f1f5f9',
  toColor: string = '#e2e8f0'
): string {
  const [w, h] = aspectRatio.split('/').map(Number);
  const width = isNaN(w) ? 16 : w;
  const height = isNaN(h) ? 9 : h;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${fromColor}"/><stop offset="100%" stop-color="${toColor}"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="1.5"/></filter></defs><rect width="100%" height="100%" fill="url(#g)" filter="url(#b)"/></svg>`;

  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return `data:image/svg+xml;base64,${window.btoa(svg)}`;
  }
  return DEFAULT_BLUR_BASE64;
}

export default function BlurImage({
  src,
  alt,
  blurDataURL,
  aspectRatio = '16/9',
  width,
  height,
  priority = false,
  objectFit = 'cover',
  className = '',
  containerClassName = '',
  fallbackIcon,
  ...restProps
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default low-res base64 placeholder if none provided
  const placeholderBase64 = blurDataURL || DEFAULT_BLUR_BASE64;

  // IntersectionObserver for lazy-loading non-priority images
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px 0px', // Pre-fetch 250px before entering viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Pre-load in background when in view
  useEffect(() => {
    if (!isInView || !src) return;

    let active = true;
    const img = new Image();
    img.src = src;
    img.referrerPolicy = 'no-referrer';

    img.onload = () => {
      if (active) {
        setIsLoaded(true);
      }
    };

    img.onerror = () => {
      if (active) {
        setHasError(true);
      }
    };

    return () => {
      active = false;
    };
  }, [isInView, src]);

  // Maintain precise container aspect ratio to prevent CLS (Layout Shift = 0)
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    ...(aspectRatio ? { aspectRatio } : {}),
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}
    >
      {/* 1. Low-Resolution Base64 Blur-Up Placeholder */}
      <img
        src={placeholderBase64}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity duration-700 ease-out filter blur-lg scale-105 pointer-events-none select-none ${
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* 2. Full-Resolution Primary Image */}
      {isInView && !hasError && (
        <img
          {...restProps}
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-${objectFit} transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 filter blur-0 scale-100' : 'opacity-0 filter blur-sm scale-[1.02]'
          } ${className}`}
        />
      )}

      {/* 3. Styled Zero-Broken-Image Fallback per Universal Design Constitution */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 border border-slate-200/60 p-4 text-center">
          {fallbackIcon || <ImageIcon className="w-6 h-6 text-slate-400 mb-1.5" />}
          <span className="text-[11px] font-mono text-slate-500 line-clamp-1 max-w-[85%]">
            {alt || 'Visual Article Asset'}
          </span>
        </div>
      )}
    </div>
  );
}
