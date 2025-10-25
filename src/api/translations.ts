import { API_ENDPOINTS } from './config';
import { apiClient } from './client';
import type { Translation, CreateTranslationRequest, TranslationsResponse } from '../types';

class TranslationsApi {
  async getTranslations(params?: {
    page?: number;
    limit?: number;
    q?: string;
  }): Promise<TranslationsResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.q) searchParams.set('q', params.q);

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.translations}?${queryString}` : API_ENDPOINTS.translations;
    
    return apiClient.fetch<TranslationsResponse>(endpoint);
  }

  async createTranslation(translation: CreateTranslationRequest): Promise<Translation> {
    // Get password from localStorage
    let password = localStorage.getItem('spanish-admin-password') || '';
    
    // Remove quotes if they exist (Jotai atomWithStorage stores strings with quotes)
    if (password.startsWith('"') && password.endsWith('"')) {
      password = password.slice(1, -1);
    }
    
    return apiClient.fetch<Translation>(API_ENDPOINTS.translations, {
      method: 'POST',
      body: JSON.stringify({
        ...translation,
        password,
      }),
    });
  }

  async updateTranslation(id: string, translation: { 
    memorized?: boolean;
    word?: string;
    translations?: {
      english?: string;
      hungarian?: string;
    };
  }): Promise<Translation> {
    // Get password from localStorage
    let password = localStorage.getItem('spanish-admin-password') || '';
    
    // Remove quotes if they exist (Jotai atomWithStorage stores strings with quotes)
    if (password.startsWith('"') && password.endsWith('"')) {
      password = password.slice(1, -1);
    }
    
    return apiClient.fetch<Translation>(`${API_ENDPOINTS.translations}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...translation,
        password,
      }),
    });
  }

  async getRandomTranslations(number: number): Promise<Translation[]> {
    return apiClient.fetch<Translation[]>(`${API_ENDPOINTS.translations}/random/${number}`);
  }

  async deleteTranslation(id: string): Promise<void> {
    // Get password from localStorage
    let password = localStorage.getItem('spanish-admin-password') || '';
    
    // Remove quotes if they exist (Jotai atomWithStorage stores strings with quotes)
    if (password.startsWith('"') && password.endsWith('"')) {
      password = password.slice(1, -1);
    }
    
    return apiClient.fetch<void>(`${API_ENDPOINTS.translations}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    });
  }
}

export const translationsApi = new TranslationsApi();

