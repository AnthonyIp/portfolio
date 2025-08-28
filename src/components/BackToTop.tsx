import {useEffect, useState} from 'react';

type Props = { isDarkMode: boolean };

export default function BackToTop({isDarkMode}: Props) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, {passive: true});
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!visible) return null;
    return (
        <button
            aria-label="Back to top"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className={`fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-900 hover:bg-black text-white'
            }`}
        >
            <span className="text-xl font-bold">↑</span>
        </button>
    );
}
