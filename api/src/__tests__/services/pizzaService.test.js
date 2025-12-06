import PizzaService from '../../services/PizzaService.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

describe('PizzaService', () => {
  let service;

  beforeEach(() => {
    resetStore();
    service = new PizzaService(store);
  });

  it('creates and lists pizzas', () => {
    service.create({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    const pizzas = service.getAll();

    expect(pizzas).toHaveLength(1);
    expect(pizzas[0].customerName).toBe('Alice');
  });

  it('returns pizza by id or null when missing', () => {
    service.create({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    expect(service.getById('p1').id).toBe('p1');
    expect(service.getById('missing')).toBeNull();
  });

  it('updates pizzas when present', () => {
    service.create({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    const updated = service.update('p1', { customerName: 'Bob' });

    expect(updated.customerName).toBe('Bob');
    expect(service.getById('p1').customerName).toBe('Bob');
  });

  it('returns null when updating missing pizza', () => {
    const result = service.update('p1', { customerName: 'Bob' });

    expect(result).toBeNull();
  });

  it('deletes pizzas and reports status', () => {
    service.create({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    expect(service.delete('p1')).toBe(true);
    expect(service.getById('p1')).toBeNull();
    expect(service.delete('p1')).toBe(false);
  });
});
