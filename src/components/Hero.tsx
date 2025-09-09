import { Code2, ChevronDown } from 'lucide-react';
import { useFadeInAnimation, useSlideInAnimation } from '../hooks/useScrollAnimation';
import { AnimatedButton } from './AnimatedButton';

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
  const iconRef = useSlideInAnimation('up', 0.2);
  const titleRef = useFadeInAnimation(0.4);
  const subtitleRef = useFadeInAnimation(0.6);
  const buttonsRef = useFadeInAnimation(0.8);
  const chevronRef = useFadeInAnimation(1.0);

  return (
    <section
      id='home'
      aria-labelledby='home-heading'
      className='min-h-screen py-20 md:py-32 flex items-center justify-center relative overflow-hidden'
    >
      <div
        className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'}`}
      ></div>
      <div className='max-w-4xl mx-auto text-center px-4 relative z-10'>
        <div className='mb-8'>
          <div 
            ref={iconRef}
            className='w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'
          >
            <Code2 size={64} className='text-white' />
          </div>
          <h1
            ref={titleRef}
            id='home-heading'
            className='text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent'
          >
            {title}
          </h1>
          <p
            ref={subtitleRef}
            className={`text-xl md:text-2xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {subtitle}
          </p>
          <div 
            ref={buttonsRef}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <AnimatedButton
              onClick={onViewClick}
              variant="primary"
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
            >
              {ctaView}
            </AnimatedButton>
            <AnimatedButton
              onClick={onContactClick}
              variant="outline"
              size="lg"
              className={`px-8 py-3 border-2 rounded-lg font-semibold transition-all duration-300 ${
                isDarkMode 
                  ? 'border-blue-400 text-blue-300 hover:border-blue-300 hover:bg-blue-400 hover:text-white shadow-lg hover:shadow-blue-500/25' 
                  : 'border-gray-600 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white shadow-lg hover:shadow-gray-500/25'
              }`}
            >
              {ctaContact}
            </AnimatedButton>
          </div>
        </div>
      </div>
      <div 
        ref={chevronRef}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
      >
        <ChevronDown
          size={32}
          className={`animate-bounce ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        />
      </div>
    </section>
  );
}

export default Hero;
