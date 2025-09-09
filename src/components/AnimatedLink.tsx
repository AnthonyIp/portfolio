import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  isExternal?: boolean;
  underline?: boolean;
}

export const AnimatedLink = ({
  children,
  href,
  className = '',
  target,
  rel,
  isExternal = false,
  underline = true,
}: AnimatedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseEnter = () => {
      gsap.to(link, {
        opacity: 0.8,
        y: -1,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (underline) {
        gsap.fromTo(
          link,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.4,
            ease: 'power2.out',
            transformOrigin: 'left',
          }
        );
      }
    };

    const handleMouseLeave = () => {
      gsap.to(link, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (underline) {
        gsap.to(link, {
          scaleX: 0,
          duration: 0.4,
          ease: 'power2.out',
          transformOrigin: 'right',
        });
      }
    };

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [underline]);

  const baseClasses =
    'relative inline-block transition-all duration-200 ease-out';
  const underlineClasses = underline
    ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out'
    : '';

  const classes = `${baseClasses} ${underlineClasses} ${className}`;

  return (
    <a
      ref={linkRef}
      href={href}
      target={target || (isExternal ? '_blank' : undefined)}
      rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
      className={classes}
    >
      {children}
    </a>
  );
};
