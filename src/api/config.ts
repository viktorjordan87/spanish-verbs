// API configuration
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not set');
}

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  verbs: '/api/verbs',
  translations: '/api/translations',
} as const;
