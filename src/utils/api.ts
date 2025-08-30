// Types pour les réponses API
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Configuration de l'API
const API_CONFIG = {
  baseUrl: '/datas',
  timeout: 10000,
  retries: 3,
} as const;

// Fonction de fetch sécurisée avec timeout
async function secureFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null, success: true };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return { data: null, error: 'Request timeout', success: false };
      }
      return { data: null, error: error.message, success: false };
    }

    return { data: null, error: 'Unknown error occurred', success: false };
  }
}

// Fonction de fetch avec retry
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= API_CONFIG.retries; attempt++) {
    const result = await secureFetch<T>(url, options);

    if (result.success) {
      return result;
    }

    lastError = result.error;

    // Attendre avant de réessayer (backoff exponentiel)
    if (attempt < API_CONFIG.retries) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return { data: null, error: lastError, success: false };
}

// Fonction pour charger les données i18n
export async function loadI18nData(
  language: string
): Promise<ApiResponse<unknown>> {
  const url = `${API_CONFIG.baseUrl}/i18n.json`;
  return fetchWithRetry(url);
}

// Fonction pour charger les données de timeline
export async function loadTimelineData(): Promise<ApiResponse<unknown>> {
  const url = `${API_CONFIG.baseUrl}/data-timeline.json`;
  return fetchWithRetry(url);
}

// Fonction pour charger les données de projets
export async function loadProjectsData(): Promise<ApiResponse<unknown>> {
  const url = `${API_CONFIG.baseUrl}/data-projects.json`;
  return fetchWithRetry(url);
}

// Fonction utilitaire pour gérer les erreurs de chargement
export function handleApiError(
  error: string | null,
  fallback: unknown
): unknown {
  if (error) {
    console.warn('API error, using fallback:', error);
  }
  return fallback;
}

// Fonction pour valider les URLs
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Fonction pour nettoyer les données d'entrée
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Supprimer les balises HTML basiques
    .substring(0, 1000); // Limiter la longueur
}
