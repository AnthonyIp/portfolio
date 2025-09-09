import type { ProjectsProps } from '../../types/projects';
import { useProjects } from '../../hooks/useProjects';
import { useScrollAnimation, useFadeInAnimation, useSlideInAnimation } from '../../hooks/useScrollAnimation';
import { TechnologyButton } from './TechnologyButton';
import { ProjectCard } from './ProjectCard';
import { PaginationDots } from './PaginationDots';
import { ProjectModal } from './ProjectModal';
import { FILTER_ALL } from '../../constants/projects';

export const Projects = ({
  isDarkMode,
  title,
  subtitle,
  allLabel,
  projects,
  language,
}: ProjectsProps) => {
  const {
    selectedTech,
    currentPage,
    selectedProject,
    isModalOpen,
    availableTechnologies,
    totalPages,
    displayedProjects,
    handleTechnologyChange,
    handleProjectClick,
    handleModalClose,
    setCurrentPage,
  } = useProjects(projects);

  const sectionRef = useScrollAnimation();
  const headerRef = useFadeInAnimation(0.2);
  const filterRef = useSlideInAnimation('up', 0.4);
  const gridRef = useFadeInAnimation(0.6);

  return (
    <>
      <section
        ref={sectionRef}
        id='projects'
        aria-labelledby='projects-heading'
        className={`min-h-screen py-20 ${isDarkMode ? 'bg-gray-800/60' : 'bg-white/60'}`}
      >
        <div className='max-w-6xl mx-auto px-4'>
          {/* Header */}
          <div ref={headerRef} className='text-center mb-16'>
            <h2
              id='projects-heading'
              className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
            >
              {title}
            </h2>
            <div className='w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8' />
            <p
              className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {subtitle}
            </p>
          </div>

          {/* Technology Filter */}
          <div ref={filterRef} className='mb-12'>
            <div className='flex flex-wrap justify-center gap-3'>
              <TechnologyButton
                tech={allLabel}
                isSelected={selectedTech === FILTER_ALL}
                isDarkMode={isDarkMode}
                onClick={() => handleTechnologyChange(FILTER_ALL)}
              />
              {availableTechnologies.map(tech => (
                <TechnologyButton
                  key={tech}
                  tech={tech}
                  isSelected={selectedTech === tech}
                  isDarkMode={isDarkMode}
                  onClick={() => handleTechnologyChange(tech)}
                />
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div ref={gridRef} className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={language === 'fr' ? project.title_fr : project.title_en}
                project={project}
                isDarkMode={isDarkMode}
                language={language}
                onClick={() => handleProjectClick(project)}
                index={index}
                totalCards={displayedProjects.length}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationDots
              currentPage={currentPage}
              totalPages={totalPages}
              isDarkMode={isDarkMode}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isDarkMode={isDarkMode}
        language={language}
      />
    </>
  );
};
