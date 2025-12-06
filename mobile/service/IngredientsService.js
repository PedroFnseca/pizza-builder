import { BaseService } from './BaseService.js';
import { requireNumber, requireString } from './validators.js';

export class IngredientsService extends BaseService {
  static resource = 'ingredients';

  static validateId(id) {
    return requireString(id, 'Ingredient id');
  }

  static validateCreate({ id, name, extraPrice }) {
    return {
      id: requireString(id, 'Ingredient id'),
      name: requireString(name, 'Ingredient name'),
      extraPrice: requireNumber(extraPrice, 'Extra price'),
    };
  }

  static validateUpdate({ name, extraPrice } = {}) {
    const payload = {
      ...(name !== undefined && { name: requireString(name, 'Ingredient name') }),
      ...(extraPrice !== undefined && { extraPrice: requireNumber(extraPrice, 'Extra price') }),
    };
    return payload;
  }
}
