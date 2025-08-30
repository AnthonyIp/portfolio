import { X, ExternalLink, Github, Calendar, Users, Globe } from 'lucide-react';
import type { Project, ProjectLanguage } from '../../types/projects';
import { ProjectTranslations } from '../../constants/projects';

type Props = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  language: ProjectLanguage;
};

export function ProjectModal({
  project,
  isOpen,
  onClose,
  isDarkMode,
  language,
}: Props) {
  const currentT = ProjectTranslations[language] || ProjectTranslations.en;

  // Get localized content
  if (!project) return null;

  type LocalizedField =
    | 'title'
    | 'description'
    | 'features'
    | 'duration'
    | 'team'
    | 'role'
    | 'challenges';
  const getLocalizedField = (field: LocalizedField) =>
    project[`${field}_${language}` as keyof Project] ||
    project[`${field}_en` as keyof Project];

  const title = getLocalizedField('title');
  const description = getLocalizedField('description');
  const features = getLocalizedField('features') || [];
  const duration = getLocalizedField('duration');
  const team = getLocalizedField('team');
  const role = getLocalizedField('role');
  const challenges = getLocalizedField('challenges');

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {/* Header */}
        <div className='sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
            aria-label='Close modal'
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Hero Image */}
          <div className='relative overflow-hidden rounded-xl'>
            <img
              src={project.image}
              alt={title}
              className='w-full h-64 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
          </div>

          {/* Project Info Grid */}
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-6'>
              {/* Description */}
              <div>
                <h3 className='text-lg font-semibold mb-3 flex items-center gap-2'>
                  <Globe size={20} className='text-blue-500' />
                  {currentT.description}
                </h3>
                <p
                  className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className='text-lg font-semibold mb-3'>
                  {currentT.technologies}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {features && features.length > 0 && (
                <div>
                  <h3 className='text-lg font-semibold mb-3'>
                    {currentT.features}
                  </h3>
                  <ul
                    className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    {features.map((feature: string, index: number) => (
                      <li key={index} className='flex items-start gap-2'>
                        <span className='w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              {/* Project Details */}
              <div
                className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
              >
                <h3 className='text-lg font-semibold mb-3'>
                  {currentT.projectDetails}
                </h3>
                <div className='space-y-3'>
                  {duration && (
                    <div className='flex items-center gap-2'>
                      <Calendar size={16} className='text-blue-500' />
                      <span
                        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        {currentT.duration}: {duration}
                      </span>
                    </div>
                  )}
                  {team && (
                    <div className='flex items-center gap-2'>
                      <Users size={16} className='text-blue-500' />
                      <span
                        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        {currentT.team}: {team}
                      </span>
                    </div>
                  )}
                  {role && (
                    <div className='flex items-center gap-2'>
                      <span className='w-4 h-4 rounded-full bg-green-500' />
                      <span
                        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        {currentT.role}: {role}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Challenges & Solutions */}
              {challenges && (
                <div>
                  <h3 className='text-lg font-semibold mb-3'>
                    {currentT.challenges}
                  </h3>
                  <div
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                  >
                    <p
                      className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      {challenges}
                    </p>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className='flex flex-col gap-3'>
                <a
                  href={project.live}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  <ExternalLink size={20} />
                  {currentT.viewOnline}
                </a>
                <a
                  href={project.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'}`}
                >
                  <Github size={20} />
                  {currentT.viewSource}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
