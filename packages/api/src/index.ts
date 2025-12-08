// Shared API client for Burger Fest
import type { ApiResponse, PaginatedResponse } from '@aaloo/types';
import { appConfig } from '@aaloo/config';

const API_URL = appConfig.apiUrl;

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          message: response.statusText,
        }));
        return {
          data: null,
          error: error.message || 'Request failed',
        };
      }

      const data = await response.json();
      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async getPaginated<T>(
    endpoint: string,
    params?: { page?: number; limit?: number }
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = queryParams.toString()
      ? `${endpoint}?${queryParams.toString()}`
      : endpoint;

    return this.get<PaginatedResponse<T>>(url);
  }
}

export const apiClient = new ApiClient();

// Export specific API functions
export const postsApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.getPaginated('/api/posts', params),
  getById: (id: string) => apiClient.get(`/api/posts/${id}`),
  create: (data: unknown) => apiClient.post('/api/posts', data),
  update: (id: string, data: unknown) =>
    apiClient.put(`/api/posts/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/posts/${id}`),
};

export const usersApi = {
  getProfile: () => apiClient.get('/api/users/me'),
  updateProfile: (data: unknown) => apiClient.put('/api/users/me', data),
};
