import { BaseService } from './BaseService.js';
import { optionalString, requireString, requireStringArray } from './validators.js';

const SORT_FIELDS = ['finalPrice', 'createdAt'];
const ORDERS = ['asc', 'desc'];

export class PizzasService extends BaseService {
  static resource = 'pizzas';

  static validateQuery({ customerName, sortBy, order } = {}) {
    return {
      customerName: optionalString(customerName),
      sortBy: SORT_FIELDS.includes(sortBy) ? sortBy : undefined,
      order: ORDERS.includes(order) ? order : undefined,
    };
  }

  static validateId(id) {
    return requireString(id, 'Pizza id');
  }

  static validateCreate({ customerName, sizeId, ingredientIds }) {
    return {
      customerName: requireString(customerName, 'Customer name'),
      sizeId: requireString(sizeId, 'Size id'),
      ingredientIds: requireStringArray(ingredientIds, 'Ingredient ids'),
    };
  }

  static validateUpdate({ customerName, sizeId, ingredientIds } = {}) {
    const payload = {
      ...(customerName !== undefined && { customerName: requireString(customerName, 'Customer name') }),
      ...(sizeId !== undefined && { sizeId: requireString(sizeId, 'Size id') }),
      ...(ingredientIds !== undefined && { ingredientIds: requireStringArray(ingredientIds, 'Ingredient ids') }),
    };
    return payload;
  }
}
