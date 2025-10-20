import { API_ENDPOINTS } from './config';
import { apiClient } from './client';
import type { Verb, CreateVerbRequest, UpdateVerbRequest, VerbsResponse } from '../types';

class VerbsApi {

  async getVerbs(params?: {
    page?: number;
    limit?: number;
    q?: string;
  }): Promise<VerbsResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.q) searchParams.set('q', params.q);

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.verbs}?${queryString}` : API_ENDPOINTS.verbs;
    
    return apiClient.fetch<VerbsResponse>(endpoint);
  }

  async getVerb(id: string): Promise<Verb> {
    return apiClient.fetch<Verb>(`${API_ENDPOINTS.verbs}/${id}`);
  }

  async createVerb(verb: CreateVerbRequest): Promise<Verb> {
    return apiClient.fetch<Verb>(API_ENDPOINTS.verbs, {
      method: 'POST',
      body: JSON.stringify(verb),
    });
  }

  async updateVerb(id: string, verb: UpdateVerbRequest): Promise<Verb> {
    return apiClient.fetch<Verb>(`${API_ENDPOINTS.verbs}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(verb),
    });
  }

  async deleteVerb(id: string): Promise<void> {
    return apiClient.fetch<void>(`${API_ENDPOINTS.verbs}/${id}`, {
      method: 'DELETE',
    });
  }

  async searchVerbs(query: string): Promise<{_id: string, word: string}[]> {
    return apiClient.fetch<{_id: string, word: string}[]>(`${API_ENDPOINTS.verbs}/search?q=${query}`);
  }
}

export const verbsApi = new VerbsApi();
