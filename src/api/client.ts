import { API_CONFIG } from './config';

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    this.timeout = API_CONFIG.timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...API_CONFIG.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
        }));
        // Handle both { message: '...' } and { error: '...' } formats
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // Generic request method for custom endpoints
  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, options);
  }
}

export const apiClient = new ApiClient();
