import { BaseService } from './BaseService.js';
import { requireNumber, requireString } from './validators.js';

export class SizesService extends BaseService {
  static resource = 'sizes';

  static validateId(id) {
    return requireString(id, 'Size id');
  }

  static validateCreate({ id, name, basePrice }) {
    return {
      id: requireString(id, 'Size id'),
      name: requireString(name, 'Size name'),
      basePrice: requireNumber(basePrice, 'Base price'),
    };
  }

  static validateUpdate({ name, basePrice } = {}) {
    const payload = {
      ...(name !== undefined && { name: requireString(name, 'Size name') }),
      ...(basePrice !== undefined && { basePrice: requireNumber(basePrice, 'Base price') }),
    };
    return payload;
  }
}
