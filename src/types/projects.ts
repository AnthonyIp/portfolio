export type ProjectLanguage = 'fr' | 'en';

export type ProjectTechnologyProps = {
  tech: string;
  isSelected: boolean;
  isDarkMode: boolean;
  onClick: () => void;
};

export type Project = {
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  category: 'web' | 'mobile' | 'api' | string;
  features_fr?: string[];
  features_en?: string[];
  duration_fr?: string;
  duration_en?: string;
  team_fr?: string;
  team_en?: string;
  role_fr?: string;
  role_en?: string;
  challenges_fr?: string;
  challenges_en?: string;
  longDescription_fr?: string;
  longDescription_en?: string;
};

export type ProjectsProps = {
  isDarkMode: boolean;
  title: string;
  subtitle: string;
  allLabel: string;
  projects: Project[];
  language: ProjectLanguage;
};
