import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

type Props = { isDarkMode: boolean };

export default function BackToTop({ isDarkMode }: Props) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animation d'apparition/disparition
  useEffect(() => {
    if (!buttonRef.current) return;

    if (visible) {
      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.5,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }
      );
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 20,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [visible]);

  // Animation de hover
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        y: -2,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label='Back to top'
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-50 ${
        isDarkMode
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-gray-900 hover:bg-black text-white'
      }`}
    >
      <span className='text-xl font-bold'>↑</span>
    </button>
  );
}
