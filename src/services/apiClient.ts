// src/services/apiClient.ts
import axios, { AxiosError } from 'axios';

export const API_BASE_URL = 'https://nodejs-backend-red.vercel.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // Attach auth token if present (extend when auth available)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Global error normalization
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message || error.message || 'Request failed';

    // Handle unauthorized globally in the future
    if (status === 401) {
      // e.g., trigger logout redirect
    }

    return Promise.reject({ status, message, original: error });
  }
);

export type ApiError = { status?: number; message: string; original?: unknown };
