import { ApiClient } from './apiClient.js';

export class HealthService {
  static check() {
    return ApiClient.request('/health');
  }
}
