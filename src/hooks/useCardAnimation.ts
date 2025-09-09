import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration commune pour les animations de cartes
const CARD_ANIMATION_CONFIG = {
  duration: 1.0,
  ease: 'power3.out',
  scrollTrigger: {
    toggleActions: 'play none none reverse',
  },
};

export const useCardAnimation = (index: number, totalCards: number) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const directions = ['up', 'left', 'right', 'down'] as const;
    const direction = directions[index % directions.length];
    const delay = index * 0.1;

    const getInitialPosition = () => {
      const distance = 60;
      switch (direction) {
        case 'up':
          return { x: 0, y: distance, rotation: 0 };
        case 'down':
          return { x: 0, y: -distance, rotation: 0 };
        case 'left':
          return { x: distance, y: 0, rotation: 2 };
        case 'right':
          return { x: -distance, y: 0, rotation: -2 };
        default:
          return { x: 0, y: distance, rotation: 0 };
      }
    };

    const { x, y, rotation } = getInitialPosition();

    gsap.fromTo(
      card,
      {
        opacity: 0,
        x,
        y,
        rotation,
        scale: 0.85,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ...CARD_ANIMATION_CONFIG,
        delay,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          ...CARD_ANIMATION_CONFIG.scrollTrigger,
        },
      }
    );

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        y: -8,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index, totalCards]);

  return cardRef;
};

export const useContactCardAnimation = (index: number) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const directions = ['up', 'right', 'down', 'left'] as const;
    const direction = directions[index % directions.length];
    const delay = index * 0.15;

    const getInitialPosition = () => {
      const distance = 80;
      switch (direction) {
        case 'up':
          return { x: 0, y: distance, rotation: 5 };
        case 'down':
          return { x: 0, y: -distance, rotation: -5 };
        case 'left':
          return { x: distance, y: 0, rotation: 3 };
        case 'right':
          return { x: -distance, y: 0, rotation: -3 };
        default:
          return { x: 0, y: distance, rotation: 0 };
      }
    };

    const { x, y, rotation } = getInitialPosition();

    gsap.fromTo(
      card,
      {
        opacity: 0,
        x,
        y,
        rotation,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        delay,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          ...CARD_ANIMATION_CONFIG.scrollTrigger,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return cardRef;
};

export const useTimelineItemAnimation = (index: number) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const item = itemRef.current;
    const delay = index * 0.2;

    const isEven = index % 2 === 0;
    const direction = isEven ? 'left' : 'right';
    const distance = 100;

    gsap.fromTo(
      item,
      {
        opacity: 0,
        x: direction === 'left' ? -distance : distance,
        y: 30,
        scale: 0.9,
        rotation: direction === 'left' ? -1 : 1,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ...CARD_ANIMATION_CONFIG,
        delay,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          ...CARD_ANIMATION_CONFIG.scrollTrigger,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === item) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return itemRef;
};
