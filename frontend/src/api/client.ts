import axios from 'axios';

// Use environment variable or default to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

export interface CreateSessionRequest {
  type: 'text' | 'image';
  content: string;
  ttlSeconds?: number;
}

export interface CreateSessionResponse {
  pin: string;
  expiresIn: number;
}

export interface FetchSessionRequest {
  pin: string;
}

export interface FetchSessionResponse {
  type: 'text' | 'image';
  content: string;
}

export const createSession = async (
  data: CreateSessionRequest
): Promise<CreateSessionResponse> => {
  const response = await apiClient.post<CreateSessionResponse>('/create', data);
  return response.data;
};

export const fetchSession = async (
  data: FetchSessionRequest
): Promise<FetchSessionResponse> => {
  const response = await apiClient.post<FetchSessionResponse>('/fetch', data);
  return response.data;
};

export const deleteSession = async (pin: string): Promise<void> => {
  await apiClient.post('/delete', { pin });
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await apiClient.get<{ status: string }>('/health');
  return response.data;
};

export default apiClient;
