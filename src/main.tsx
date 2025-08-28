import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { resolvePath } from './utils/paths';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(resolvePath('assets/js/sw.js')).catch(() => {
        });
    });
}
