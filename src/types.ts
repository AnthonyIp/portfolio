export type Language = 'en' | 'fr';

export type TimelineItem = {
  type: 'education' | 'experience';
  year: string;
  title: string;
  institution: string;
  location: string;
  description: string;
  tech?: string[];
  skills?: string[];
};

export type Project = {
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  category: 'web' | 'mobile' | 'api' | string;
  // Localized fields
  features_en?: string[];
  features_fr?: string[];
  duration_en?: string;
  duration_fr?: string;
  team_en?: string;
  team_fr?: string;
  role_en?: string;
  role_fr?: string;
  challenges_en?: string;
  challenges_fr?: string;
  longDescription_en?: string;
  longDescription_fr?: string;
};
