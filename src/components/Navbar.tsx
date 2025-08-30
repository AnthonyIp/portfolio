import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import type { Language } from '../types';

type Props = {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  labels: {
    home: string;
    about: string;
    timeline: string;
    projects: string;
    contact: string;
  };
};

export function Navbar({
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  labels,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? (isDarkMode ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg') : 'bg-transparent'}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            Anthony Ip
          </div>
          <div className='hidden md:flex space-x-8'>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'}`}
              title={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className={`p-1 rounded-lg transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              title={
                language === 'en' ? 'Passer au français' : 'Switch to English'
              }
            >
              <span
                className='text-xl'
                role='img'
                aria-label={language === 'en' ? 'French' : 'English'}
              >
                {language === 'en' ? '🇫🇷' : '🇬🇧'}
              </span>
            </button>
            {['home', 'about', 'timeline', 'projects', 'contact'].map(id => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`transition-colors duration-200 font-medium ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
              >
                {labels[id as keyof typeof labels]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div
            className={`md:hidden rounded-lg mb-4 p-4 space-y-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-lg border border-gray-200'}`}
          >
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <Sun size={20} className='mr-2' />
              ) : (
                <Moon size={20} className='mr-2' />
              )}{' '}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <span className='text-xl mr-2'>
                {language === 'en' ? '🇫🇷' : '🇬🇧'}
              </span>{' '}
              {language === 'en' ? 'Français' : 'English'}
            </button>
            {['home', 'about', 'timeline', 'projects', 'contact'].map(id => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left py-2 px-4 rounded transition-colors duration-200 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {labels[id as keyof typeof labels]}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
