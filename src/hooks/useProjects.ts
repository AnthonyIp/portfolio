import {useMemo, useState} from 'react';
import type {Project} from '../types/projects';
import {FILTER_ALL, PROJECTS_PER_PAGE} from '../constants/projects';

export const useProjects = (projects: Project[]) => {
    const [selectedTech, setSelectedTech] = useState(FILTER_ALL);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Extract all unique technologies from projects
    const availableTechnologies = useMemo(() =>
            [...new Set(projects.flatMap(p => p.tech))],
        [projects]
    );

    // Filter projects by selected technology
    const filteredProjects = useMemo(() =>
            selectedTech === FILTER_ALL
                ? projects
                : projects.filter(p => p.tech.includes(selectedTech)),
        [projects, selectedTech]
    );

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages - 1);

    // Get projects for current page
    const displayedProjects = useMemo(() => {
        const start = safeCurrentPage * PROJECTS_PER_PAGE;
        const end = start + PROJECTS_PER_PAGE;
        return filteredProjects.slice(start, end);
    }, [filteredProjects, safeCurrentPage]);

    // Event handlers
    const handleTechnologyChange = (tech: string) => {
        setSelectedTech(tech);
        setCurrentPage(0);
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return {
        selectedTech,
        currentPage: safeCurrentPage,
        selectedProject,
        isModalOpen,
        availableTechnologies,
        totalPages,
        displayedProjects,
        handleTechnologyChange,
        handleProjectClick,
        handleModalClose,
        setCurrentPage
    };
};
