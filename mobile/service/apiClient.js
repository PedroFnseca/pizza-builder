import axios from 'axios';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message = data?.message || error.message || 'Request failed';
    const wrapped = new Error(message);
    wrapped.status = status;
    wrapped.data = data;
    return Promise.reject(wrapped);
  }
);

export class ApiClient {
  static request(path, { method = 'GET', data, headers, params } = {}) {
    const url = path.startsWith('/') ? path : `/${path}`;
    return client.request({ url, method, data, params, headers });
  }
}
