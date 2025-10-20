import type { Verb } from './verb';

// API response types
export interface VerbsResponse {
  items: Verb[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
