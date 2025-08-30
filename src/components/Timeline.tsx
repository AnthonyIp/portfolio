import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import type { TimelineItem } from '../types';

type Props = {
  isDarkMode: boolean;
  title: string;
  subtitle: string;
  items: TimelineItem[];
};

export function Timeline({ isDarkMode, title, subtitle, items }: Props) {
  return (
    <section
      id='timeline'
      aria-labelledby='timeline-heading'
      className={`py-12 md:py-20 ${isDarkMode ? 'bg-gray-900/60' : 'bg-gray-100/60'}`}
    >
      <div className='max-w-6xl mx-auto px-4'>
        <div className='text-center mb-12 md:mb-16'>
          <h2
            id='timeline-heading'
            className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
          >
            {title}
          </h2>
          <div className='w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 md:mb-8'></div>
          <p
            className={`text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {subtitle}
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className='hidden md:block relative'>
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
          ></div>
          <div className='space-y-12'>
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className='w-1/2 px-8'>
                  <div
                    className={`p-6 rounded-lg border transition-all duration-300 hover:transform hover:scale-105 ${isDarkMode ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}
                  >
                    <div className='flex items-center mb-4'>
                      {item.type === 'education' ? (
                        <GraduationCap
                          className='text-blue-400 mr-3'
                          size={24}
                        />
                      ) : (
                        <Briefcase className='text-purple-400 mr-3' size={24} />
                      )}
                      <span
                        className={`text-sm font-semibold px-3 py-1 rounded-full ${item.type === 'education' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{item.title}</h3>
                    <div className='flex items-center mb-3'>
                      <span className='font-semibold text-blue-400'>
                        {item.institution}
                      </span>
                      <MapPin
                        size={16}
                        className={`ml-2 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      />
                      <span
                        className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        {item.location}
                      </span>
                    </div>
                    <p
                      className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {item.description}
                    </p>
                    {Array.isArray((item as any).tech) &&
                      (item as any).tech.length > 0 && (
                        <div className='mt-4 flex flex-wrap gap-2'>
                          {((item as any).tech as string[]).map(t => (
                            <span
                              key={t}
                              className={`px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    {Array.isArray((item as any).skills) &&
                      (item as any).skills.length > 0 && (
                        <div className='mt-2 flex flex-wrap gap-2'>
                          {((item as any).skills as string[]).map(s => (
                            <span
                              key={s}
                              className={`px-2 py-1 text-xs rounded-full border ${isDarkMode ? 'border-blue-400 text-blue-300' : 'border-blue-600 text-blue-700'}`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-4 ${item.type === 'education' ? 'bg-blue-400 border-blue-200' : 'bg-purple-400 border-purple-200'} z-10`}
                ></div>
                <div className='w-1/2'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Version compacte et optimisée */}
        <div className='md:hidden'>
          <div className='space-y-6'>
            {items.map((item, index) => (
              <div key={index} className='relative'>
                {/* Ligne de connexion mobile */}
                {index < items.length - 1 && (
                  <div 
                    className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                )}
                
                {/* Point de la timeline */}
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <div
                      className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${
                        item.type === 'education' 
                          ? 'bg-blue-500 border-blue-200' 
                          : 'bg-purple-500 border-purple-200'
                      }`}
                    >
                      {item.type === 'education' ? (
                        <GraduationCap
                          className='text-white'
                          size={16}
                        />
                      ) : (
                        <Briefcase className='text-white' size={16} />
                      )}
                    </div>
                  </div>
                  
                  {/* Contenu de l'élément */}
                  <div className='ml-4 flex-1 min-w-0'>
                    <div
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 shadow-lg' 
                          : 'bg-white border-gray-200 shadow-md'
                      }`}
                    >
                      {/* En-tête avec année et type */}
                      <div className='flex items-center justify-between mb-3'>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            item.type === 'education' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {item.year}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {item.type === 'education' ? 'Formation' : 'Expérience'}
                        </span>
                      </div>
                      
                      {/* Titre */}
                      <h3 className={`text-lg font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      
                      {/* Institution et localisation */}
                      <div className='flex items-center mb-3'>
                        <span className={`font-medium text-sm ${
                          isDarkMode ? 'text-blue-300' : 'text-blue-600'
                        }`}>
                          {item.institution}
                        </span>
                        <MapPin
                          size={14}
                          className={`ml-2 mr-1 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {item.location}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed mb-3 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {item.description}
                      </p>
                      
                      {/* Technologies */}
                      {Array.isArray((item as any).tech) &&
                        (item as any).tech.length > 0 && (
                          <div className='mb-3'>
                            <p className={`text-xs font-medium mb-2 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              Technologies utilisées :
                            </p>
                            <div className='flex flex-wrap gap-2'>
                              {((item as any).tech as string[]).map(t => (
                                <span
                                  key={t}
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    isDarkMode 
                                      ? 'bg-gray-700 text-gray-200' 
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      
                      {/* Compétences */}
                      {Array.isArray((item as any).skills) &&
                        (item as any).skills.length > 0 && (
                          <div>
                            <p className={`text-xs font-medium mb-2 ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              Compétences développées :
                            </p>
                            <div className='flex flex-wrap gap-2'>
                              {((item as any).skills as string[]).map(s => (
                                <span
                                  key={s}
                                  className={`px-2 py-1 text-xs rounded-full border ${
                                    isDarkMode 
                                      ? 'border-blue-400 text-blue-300' 
                                      : 'border-blue-600 text-blue-700'
                                  }`}
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
