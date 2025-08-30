import type { ProjectTechnologyProps } from '../../types/projects';

export const TechnologyButton = ({
  tech,
  isSelected,
  isDarkMode,
  onClick,
}: ProjectTechnologyProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isSelected
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
        : isDarkMode
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
    }`}
  >
    {tech}
  </button>
);
