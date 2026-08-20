import React, { useState, useEffect } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  src: string;
  alt: string;
  blurSrc?: string;
  className?: string;
}

export default function LazyImage({ src, alt, blurSrc, className = '', ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      <img
        src={blurSrc || `${src}?w=20&blur=10`}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100 blur-md scale-110'}`}
        aria-hidden="true"
      />
      {/* Main Image */}
      <img
        {...props}
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${(props as any).className || ''}`}
        loading="lazy"
      />
    </div>
  );
}
