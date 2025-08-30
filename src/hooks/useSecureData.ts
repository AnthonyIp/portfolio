import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  loadI18nData,
  loadTimelineData,
  loadProjectsData,
  handleApiError,
} from '../utils/api';
import {
  validateI18nData,
  validateTimelineData,
  validateProjectsData,
} from '../utils/validation';
import type { Language } from '../types';

// Types pour les données validées
interface ValidatedData {
  i18n: ReturnType<typeof validateI18nData>;
  timeline: ReturnType<typeof validateTimelineData>;
  projects: ReturnType<typeof validateProjectsData>;
}

// Types pour l'état du hook
interface UseSecureDataState {
  data: ValidatedData;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Configuration du hook
const INITIAL_STATE: UseSecureDataState = {
  data: {
    i18n: validateI18nData({}),
    timeline: [],
    projects: [],
  },
  loading: false,
  error: null,
  lastUpdated: null,
};

// Hook principal pour gérer les données de manière sécurisée
export function useSecureData(language: Language) {
  const [state, setState] = useState<UseSecureDataState>(INITIAL_STATE);

  // Fonction pour charger toutes les données
  const loadAllData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Charger les données en parallèle
      const [i18nResult, timelineResult, projectsResult] =
        await Promise.allSettled([
          loadI18nData(language),
          loadTimelineData(),
          loadProjectsData(),
        ]);

      // Traiter les résultats
      const i18nData =
        i18nResult.status === 'fulfilled' ? i18nResult.value.data : null;
      const timelineData =
        timelineResult.status === 'fulfilled'
          ? timelineResult.value.data
          : null;
      const projectsData =
        projectsResult.status === 'fulfilled'
          ? projectsResult.value.data
          : null;

      // Valider les données
      const validatedData: ValidatedData = {
        i18n: validateI18nData(i18nData),
        timeline: validateTimelineData(timelineData),
        projects: validateProjectsData(projectsData),
      };

      setState({
        data: validatedData,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, [language]);

  // Charger les données au montage et lors du changement de langue
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Fonction pour recharger les données
  const refreshData = useCallback(() => {
    loadAllData();
  }, [loadAllData]);

  // Fonction pour récupérer les données i18n localisées
  const getLocalizedData = useCallback(
    (key: string) => {
      const keys = key.split('.');
      let value: any = state.data.i18n;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return '';
        }
      }

      return value || '';
    },
    [state.data.i18n]
  );

  // Fonction pour récupérer les données de timeline localisées
  const getLocalizedTimeline = useMemo(() => {
    return state.data.timeline.map(item => ({
      type: item.type,
      year: item.year,
      title: language === 'fr' ? item.title_fr : item.title_en,
      institution:
        language === 'fr' ? item.institution_fr : item.institution_en,
      location: language === 'fr' ? item.location_fr : item.location_en,
      description:
        language === 'fr' ? item.description_fr : item.description_en,
      tech: item.tech || [],
      skills: item.skills || [],
    }));
  }, [state.data.timeline, language]);

  // Fonction pour récupérer les données de projets localisées
  const getLocalizedProjects = useMemo(() => {
    return state.data.projects.map(project => ({
      title_fr: project.title_fr,
      title_en: project.title_en,
      description_fr: project.description_fr,
      description_en: project.description_en,
      tech: project.tech,
      image: project.image,
      github: project.github,
      live: project.live,
      category: project.category,
      features_fr: project.features_fr,
      features_en: project.features_en,
      duration_fr: project.duration_fr,
      duration_en: project.duration_en,
      team_fr: project.team_fr,
      team_en: project.team_en,
      role_fr: project.role_fr,
      role_en: project.role_en,
      challenges_fr: project.challenges_fr,
      challenges_en: project.challenges_en,
      longDescription_fr: project.longDescription_fr,
      longDescription_en: project.longDescription_en,
    }));
  }, [state.data.projects]);

  return {
    // État
    loading: state.loading,
    error: state.error,
    lastUpdated: state.lastUpdated,

    // Données validées
    data: state.data,

    // Données localisées
    localizedData: {
      i18n: getLocalizedData,
      timeline: getLocalizedTimeline,
      projects: getLocalizedProjects,
    },

    // Actions
    refreshData,
    loadAllData,
  };
}
