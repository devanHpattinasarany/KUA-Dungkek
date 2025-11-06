'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LazyMapProps {
  mapSrc: string;
  title: string;
}

export default function LazyMap({ mapSrc, title }: LazyMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('lazy-map-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div id="lazy-map-container" className="aspect-[16/9] sm:aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-border bg-muted/20">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="text-center">
            <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4 animate-pulse" />
            <p className="text-primary font-medium text-sm sm:text-base">
              KUA Dungkek
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 px-4">
              Memuat peta...
            </p>
          </div>
        </div>
      )}

      {isVisible && (
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{
            border: 0,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title={title}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
}