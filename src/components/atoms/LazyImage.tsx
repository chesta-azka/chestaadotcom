import React from 'react';
import OptimizedImage from './OptimizedImage';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  src: string;
  alt: string;
  blurSrc?: string;
  className?: string;
  priority?: boolean;
}

export default function LazyImage({ src, alt, blurSrc, className = '', priority = false, ...props }: LazyImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      blurSrc={blurSrc}
      className={className}
      priority={priority}
      {...props}
    />
  );
}
