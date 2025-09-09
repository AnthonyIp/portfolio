import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder,
  onLoad,
  onError,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(container);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
        
        // Animation d'apparition
        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            {
              opacity: 0,
              scale: 1.05,
              y: 10,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: 'power3.out',
            }
          );
        }
      };
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
      img.src = src;
    }
  }, [isInView, src, isLoaded, hasError, onLoad, onError]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          {placeholder && (
            <div className="text-gray-400 text-sm">{placeholder}</div>
          )}
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Erreur de chargement</div>
        </div>
      )}
      
      {isLoaded && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};
