import { ApiClient } from './apiClient.js';

export class BaseService {
  static resource = '';

  static list(query) {
    const safeQuery = this.validateQuery ? this.validateQuery(query) : query;
    return ApiClient.request(`/${this.resource}`, { params: safeQuery });
  }

  static get(id) {
    const resourceId = this.validateId ? this.validateId(id) : id;
    return ApiClient.request(`/${this.resource}/${resourceId}`);
  }

  static create(payload) {
    const body = this.validateCreate ? this.validateCreate(payload) : payload;
    return ApiClient.request(`/${this.resource}`, { method: 'POST', data: body });
  }

  static update(id, payload = {}) {
    const resourceId = this.validateId ? this.validateId(id) : id;
    const body = this.validateUpdate ? this.validateUpdate(payload) : payload;
    this.ensureNotEmpty(body);
    return ApiClient.request(`/${this.resource}/${resourceId}`, { method: 'PUT', data: body });
  }

  static remove(id) {
    const resourceId = this.validateId ? this.validateId(id) : id;
    return ApiClient.request(`/${this.resource}/${resourceId}`, { method: 'DELETE' });
  }

  static ensureNotEmpty(body, message = 'Provide at least one field to update') {
    if (!body || Object.keys(body).length === 0) {
      throw new Error(message);
    }
  }
}
