import { ExternalLink, Github } from 'lucide-react';
import type { Project, ProjectLanguage } from '../../types/projects';

type ProjectCardProps = {
  project: Project;
  isDarkMode: boolean;
  language: ProjectLanguage;
  onClick: () => void;
};

export const ProjectCard = ({
  project,
  isDarkMode,
  language,
  onClick,
}: ProjectCardProps) => {
  const title = language === 'fr' ? project.title_fr : project.title_en;
  const description =
    language === 'fr' ? project.description_fr : project.description_en;

  return (
    <div
      onClick={onClick}
      className={`rounded-lg overflow-hidden border transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer ${
        isDarkMode
          ? 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg'
      }`}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Click to view details of ${title}`}
    >
      <div className='relative overflow-hidden'>
        <img
          src={project.image}
          alt={title}
          className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 ${isDarkMode ? 'from-gray-900/80' : 'from-white/80'}`}
        >
          <div className='flex space-x-3'>
            {project.github && (
              <a
                href={project.github}
                aria-label={`Open GitHub for ${title}`}
                rel='noopener noreferrer'
                target='_blank'
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={e => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                aria-label={`Open live demo for ${title}`}
                rel='noopener noreferrer'
                target='_blank'
                className='p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200'
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className='p-6'>
        <h3
          className={`text-xl font-bold mb-3 transition-colors duration-200 ${
            isDarkMode
              ? 'group-hover:text-blue-400'
              : 'group-hover:text-blue-600'
          }`}
        >
          {title}
        </h3>
        <p
          className={`mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {description}
        </p>
        <div className='flex flex-wrap gap-2'>
          {project.tech.map(tech => (
            <span
              key={tech}
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
