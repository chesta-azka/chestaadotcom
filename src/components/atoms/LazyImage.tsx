import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  src: string;
  alt: string;
  blurSrc?: string;
  className?: string;
}

export default function LazyImage({ src, alt, blurSrc, className = '', ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <span ref={imgRef} className={`relative overflow-hidden block ${className}`}>
      {/* Blur Placeholder */}
      <img
        src={blurSrc || `${src}?w=20&blur=10`}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100 blur-2xl scale-110'}`}
        aria-hidden="true"
        referrerPolicy="no-referrer"
      />
      
      {/* Main Image */}
      {isInView && (
        <img
          {...props}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${(props as any).className || ''}`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}
    </span>
  );
}
