import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration commune pour les animations
const COMMON_ANIMATION_CONFIG = {
  duration: 1.0,
  ease: 'power3.out',
  scrollTrigger: {
    toggleActions: 'play none none reverse',
  },
};

export const useScrollAnimation = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Animation d'entrée
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ...COMMON_ANIMATION_CONFIG,
        duration: 1.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          ...COMMON_ANIMATION_CONFIG.scrollTrigger,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
};

export const useFadeInAnimation = (delay = 0) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ...COMMON_ANIMATION_CONFIG,
        duration: 0.9,
        delay,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          ...COMMON_ANIMATION_CONFIG.scrollTrigger,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return elementRef;
};

export const useSlideInAnimation = (
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  delay = 0
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const getInitialPosition = () => {
      switch (direction) {
        case 'left':
          return { x: -50, y: 0 };
        case 'right':
          return { x: 50, y: 0 };
        case 'up':
          return { x: 0, y: -50 };
        case 'down':
          return { x: 0, y: 50 };
        default:
          return { x: 0, y: 50 };
      }
    };

    const { x, y } = getInitialPosition();

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x,
        y,
        scale: 0.95,
        rotation: direction === 'left' ? -2 : direction === 'right' ? 2 : 0,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ...COMMON_ANIMATION_CONFIG,
        duration: 1.1,
        delay,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          ...COMMON_ANIMATION_CONFIG.scrollTrigger,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay]);

  return elementRef;
};
