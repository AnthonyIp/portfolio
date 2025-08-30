import { useEffect } from 'react';

type Props = {
  isDarkMode: boolean;
};

declare global {
  interface Window {
    particlesJS?: any;
  }
}

export default function ParticlesBackground({ isDarkMode }: Props) {
  useEffect(() => {
    let cancelled = false;
    const init = () => {
      if (cancelled) return;
      const container = document.getElementById('particles-js');
      if (!container || !window.particlesJS) {
        requestAnimationFrame(init);
        return;
      }
      const configUrl = isDarkMode
        ? '/datas/particles-dark.json'
        : '/datas/particles-light.json';
      window.particlesJS.load('particles-js', configUrl, () => {});
    };
    init();
    return () => {
      cancelled = true;
    };
  }, [isDarkMode]);

  return (
    <div
      id='particles-js'
      className='fixed inset-0 z-0 pointer-events-none'
      aria-hidden='true'
    />
  );
}
