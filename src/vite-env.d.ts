/// <reference types="vite/client" />

declare global {
  interface Window {
    lenis?: {
      scrollTo: (
        target: Element | number,
        options?: { offset?: number; immediate?: boolean }
      ) => void;
      destroy: () => void;
      raf: (time: number) => void;
    };
  }
}
