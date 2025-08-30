import { Code2, ChevronDown } from 'lucide-react';

type Props = {
  isDarkMode: boolean;
  title: string;
  subtitle: string;
  ctaView: string;
  ctaContact: string;
  onViewClick: () => void;
  onContactClick: () => void;
};

export function Hero({
  isDarkMode,
  title,
  subtitle,
  ctaView,
  ctaContact,
  onViewClick,
  onContactClick,
}: Props) {
  return (
    <section
      id='home'
      aria-labelledby='home-heading'
      className='h-screen flex items-center justify-center relative overflow-hidden'
    >
      <div
        className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'}`}
      ></div>
      <div className='max-w-4xl mx-auto text-center px-4 relative z-10'>
        <div className='mb-8'>
          <div className='w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
            <Code2 size={64} className='text-white' />
          </div>
          <h1
            id='home-heading'
            className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent'
          >
            {title}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {subtitle}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={onViewClick}
              className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
            >
              {ctaView}
            </button>
            <button
              onClick={onContactClick}
              className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 ${isDarkMode ? 'border-gray-400 hover:border-white hover:bg-white hover:text-gray-900' : 'border-gray-600 hover:border-gray-900 hover:bg-gray-900 hover:text-white'}`}
            >
              {ctaContact}
            </button>
          </div>
        </div>
      </div>
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
        <ChevronDown
          size={32}
          className={`animate-bounce ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        />
      </div>
    </section>
  );
}

export default Hero;
