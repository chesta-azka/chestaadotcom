import React, { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage - A high-performance image utility for Vite/React Router
 * Mimics Next.js Image optimization strategy:
 * 1. Lazy loading by default (using Intersection Observer & loading="lazy")
 * 2. Modern format serving via CDN query params (WebP/AVIF)
 * 3. Blur-up placeholder while loading
 * 4. Priority loading for LCP elements
 * 5. Referrer policy for privacy & security
 */

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  blurSrc?: string;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false, 
  blurSrc, 
  quality = 80,
  className = '',
  objectFit = 'cover',
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.01, 
        rootMargin: '400px' // Pre-load 400px before appearing
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Helper to append optimization params for common CDNs (Unsplash, Picsum, etc.)
  const getOptimizedSrc = (url: string, w?: number | string, q: number = 80) => {
    if (!url) return url;
    
    // Support for Unsplash / Picsum / Cloudinary / Imgix style params
    if (url.includes('unsplash.com') || url.includes('picsum.photos') || url.includes('images.unsplash.com')) {
      const hasParams = url.includes('?');
      const separator = hasParams ? '&' : '?';
      let optimized = `${url}${separator}auto=format&q=${q}`;
      if (w) optimized += `&w=${w}`;
      return optimized;
    }
    
    return url;
  };

  const generateSrcSet = (url: string) => {
    if (!url || (!url.includes('unsplash.com') && !url.includes('picsum.photos') && !url.includes('images.unsplash.com'))) {
      return undefined;
    }
    
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    return widths
      .map(w => `${getOptimizedSrc(url, w, quality)} ${w}w`)
      .join(', ');
  };

  const optimizedSrc = getOptimizedSrc(src, width, quality);
  const srcSet = props.srcSet || generateSrcSet(src);
  const placeholderSrc = blurSrc || getOptimizedSrc(src, 40, 10); // Very low quality for blur

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : (width ? 'auto' : '100%'),
    aspectRatio: (width && height && typeof width === 'number' && typeof height === 'number') ? `${width}/${height}` : undefined,
  };

  return (
    <div 
      ref={containerRef} 
      className={`optimized-image-container ${className}`}
      style={containerStyle}
    >
      {/* Low-res Blur Placeholder */}
      <img
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-${objectFit} blur-2xl scale-110 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-60'}`}
        referrerPolicy="no-referrer"
      />
      
      {/* High-res Main Image */}
      {isInView && (
        <img
          {...props}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={props.sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-${objectFit} transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        />
      )}

      {/* No-JS Fallback */}
      <noscript>
        <img
          {...props}
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-${objectFit} ${className}`}
        />
      </noscript>
    </div>
  );
}
