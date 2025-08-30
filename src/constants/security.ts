// Configuration de sécurité
export const SECURITY_CONFIG = {
  // Headers de sécurité
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  },

  // Configuration CSP (Content Security Policy)
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'connect-src': ["'self'"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  },

  // Configuration des timeouts
  TIMEOUTS: {
    API_REQUEST: 10000,
    USER_INPUT: 5000,
    SESSION: 3600000, // 1 heure
  },

  // Configuration des tentatives
  RETRY_CONFIG: {
    MAX_ATTEMPTS: 3,
    BACKOFF_MULTIPLIER: 2,
    INITIAL_DELAY: 1000,
  },

  // Configuration de validation
  VALIDATION: {
    MAX_STRING_LENGTH: 1000,
    MAX_ARRAY_LENGTH: 100,
    ALLOWED_HTML_TAGS: [],
    ALLOWED_URL_PROTOCOLS: ['http:', 'https:', 'mailto:', 'tel:'],
  },
} as const;

// Types de sécurité
export type SecurityHeader = keyof typeof SECURITY_CONFIG.SECURITY_HEADERS;
export type CspDirective = keyof typeof SECURITY_CONFIG.CSP;

// Fonction pour appliquer les headers de sécurité
export function getSecurityHeaders(): Record<string, string> {
  return SECURITY_CONFIG.SECURITY_HEADERS;
}

// Fonction pour générer la politique CSP
export function generateCSP(): string {
  return Object.entries(SECURITY_CONFIG.CSP)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}

// Fonction pour valider les URLs selon la politique de sécurité
export function isUrlAllowed(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return SECURITY_CONFIG.VALIDATION.ALLOWED_URL_PROTOCOLS.includes(
      urlObj.protocol
    );
  } catch {
    return false;
  }
}

// Fonction pour nettoyer les entrées utilisateur
export function sanitizeUserInput(input: string): string {
  return input
    .trim()
    .substring(0, SECURITY_CONFIG.VALIDATION.MAX_STRING_LENGTH)
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .replace(/javascript:/gi, '') // Supprimer les protocoles dangereux
    .replace(/data:/gi, ''); // Supprimer les protocoles data
}
