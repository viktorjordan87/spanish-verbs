import type { Verb } from './verb';
import type { Translation } from './translation';

// API response types
export interface VerbsResponse {
  items: Verb[];
  total: number;
  page: number;
  limit: number;
}

export interface TranslationsResponse {
  items: Translation[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message?: string;
  error?: string;
  statusCode?: number;
}
