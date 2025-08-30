import { z } from 'zod';

// Schémas de validation pour les données
export const TimelineItemSchema = z.object({
  type: z.enum(['education', 'work']),
  year: z.string().min(1),
  title_fr: z.string().min(1),
  title_en: z.string().min(1),
  institution_fr: z.string().min(1),
  institution_en: z.string().min(1),
  location_fr: z.string().min(1),
  location_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  tech: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
});

export const ProjectSchema = z.object({
  title_fr: z.string().min(1),
  title_en: z.string().min(1),
  description_fr: z.string().min(1),
  description_en: z.string().min(1),
  tech: z.array(z.string()),
  image: z.string().url().optional(),
  github: z.string().url().optional(),
  live: z.string().url().optional(),
  category: z.string().min(1),
  features_fr: z.array(z.string()),
  features_en: z.array(z.string()),
  duration_fr: z.string().min(1),
  duration_en: z.string().min(1),
  team_fr: z.string().min(1),
  team_en: z.string().min(1),
  role_fr: z.string().min(1),
  role_en: z.string().min(1),
  challenges_fr: z.array(z.string()),
  challenges_en: z.array(z.string()),
  longDescription_fr: z.string().min(1),
  longDescription_en: z.string().min(1),
});

export const I18nSchema = z.object({
  nav: z.object({
    home: z.string(),
    about: z.string(),
    timeline: z.string(),
    projects: z.string(),
    contact: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
    viewWork: z.string(),
    getInTouch: z.string(),
  }),
  about: z.object({
    title: z.string(),
    subtitle: z.string(),
    description1: z.string(),
    description2: z.string(),
    projects: z.string(),
    experience: z.string(),
    clients: z.string(),
    backend: z.string(),
    backendDesc: z.string(),
    frontend: z.string(),
    frontendDesc: z.string(),
    database: z.string(),
    databaseDesc: z.string(),
  }),
  timeline: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  projects: z.object({
    title: z.string(),
    subtitle: z.string(),
    allProjects: z.string(),
  }),
  contact: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  footer: z.string(),
});

// Types dérivés des schémas
export type ValidatedTimelineItem = z.infer<typeof TimelineItemSchema>;
export type ValidatedProject = z.infer<typeof ProjectSchema>;
export type ValidatedI18n = z.infer<typeof I18nSchema>;

// Fonction de validation sécurisée
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  fallback: T
): T {
  try {
    const result = schema.safeParse(data);
    if (result.success) {
      return result.data;
    }
    console.warn('Validation failed, using fallback:', result.error);
    return fallback;
  } catch (error) {
    console.error('Validation error:', error);
    return fallback;
  }
}

// Validation des données de timeline
export function validateTimelineData(data: unknown): ValidatedTimelineItem[] {
  const schema = z.array(TimelineItemSchema);
  return validateData(schema, data, []);
}

// Validation des données de projets
export function validateProjectsData(data: unknown): ValidatedProject[] {
  const schema = z.array(ProjectSchema);
  return validateData(schema, data, []);
}

// Validation des données i18n
export function validateI18nData(data: unknown): ValidatedI18n {
  return validateData(I18nSchema, data, {
    nav: { home: '', about: '', timeline: '', projects: '', contact: '' },
    hero: { title: '', subtitle: '', viewWork: '', getInTouch: '' },
    about: {
      title: '',
      subtitle: '',
      description1: '',
      description2: '',
      projects: '',
      experience: '',
      clients: '',
      backend: '',
      backendDesc: '',
      frontend: '',
      frontendDesc: '',
      database: '',
      databaseDesc: '',
    },
    timeline: { title: '', subtitle: '' },
    projects: { title: '', subtitle: '', allProjects: '' },
    contact: { title: '', subtitle: '' },
    footer: '',
  });
}
