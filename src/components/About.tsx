import { Database, Globe, Server } from 'lucide-react';
import { useFadeInAnimation, useSlideInAnimation } from '../hooks/useScrollAnimation';

type Props = {
  isDarkMode: boolean;
  title: string;
  subtitle: string;
  description1: string;
  description2: string;
  stats: { projects: string; experience: string; clients: string };
  labels: {
    backend: string;
    backendDesc: string;
    frontend: string;
    frontendDesc: string;
    database: string;
    databaseDesc: string;
  };
};

export function About({
  isDarkMode,
  title,
  subtitle,
  description1,
  description2,
  stats,
  labels,
}: Props) {
  const headerRef = useFadeInAnimation(0.2);
  const leftContentRef = useSlideInAnimation('left', 0.4);
  const rightContentRef = useSlideInAnimation('right', 0.6);

  return (
    <section
      id='about'
      aria-labelledby='about-heading'
      className={`py-20 md:py-32 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'}`}
    >
      <div className='max-w-6xl mx-auto px-4 w-full'>
        <div ref={headerRef} className='text-center mb-12 md:mb-16'>
          <h2
            id='about-heading'
            className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
          >
            {title}
          </h2>
          <div className='w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 md:mb-8'></div>
        </div>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div ref={leftContentRef}>
            <h3
              className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {subtitle}
            </h3>
            <p
              className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {description1}
            </p>
            <p
              className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {description2}
            </p>
            <div className='flex space-x-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-400'>10+</div>
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {stats.projects}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-400'>7+</div>
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {stats.experience}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-emerald-400'>10+</div>
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {stats.clients}
                </div>
              </div>
            </div>
          </div>
          <div ref={rightContentRef} className='space-y-6'>
            <div
              className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
            >
              <Server className='text-blue-400 mb-4' size={32} />
              <h4 className='text-xl font-semibold mb-2'>{labels.backend}</h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {labels.backendDesc}
              </p>
            </div>
            <div
              className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
            >
              <Globe className='text-purple-400 mb-4' size={32} />
              <h4 className='text-xl font-semibold mb-2'>{labels.frontend}</h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {labels.frontendDesc}
              </p>
            </div>
            <div
              className={`p-6 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
            >
              <Database className='text-emerald-400 mb-4' size={32} />
              <h4 className='text-xl font-semibold mb-2'>{labels.database}</h4>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {labels.databaseDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
