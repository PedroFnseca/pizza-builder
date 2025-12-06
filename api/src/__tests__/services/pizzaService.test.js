import PizzaService from '../../services/PizzaService.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

const seedReferences = () => {
  store.write('sizes', { id: 'md', name: 'Medium', basePrice: 10 });
  store.write('sizes', { id: 'lg', name: 'Large', basePrice: 15 });
  store.write('ingredients', { id: 'cheese', name: 'Cheese', extraPrice: 1 });
  store.write('ingredients', { id: 'pepperoni', name: 'Pepperoni', extraPrice: 2 });
  store.write('ingredients', { id: 'olive', name: 'Olive', extraPrice: 0.5 });
};

describe('PizzaService', () => {
  let service;

  beforeEach(() => {
    resetStore();
    seedReferences();
    service = new PizzaService(store);
  });

  it('creates pizzas with auto id, timestamps and final price', () => {
    const created = service.create({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese', 'pepperoni'] });

    expect(created.id).toBe('1');
    expect(created.createdAt).toBeTruthy();
    expect(created.finalPrice).toBe(13);

    const pizzas = service.getAll();
    expect(pizzas).toHaveLength(1);
  });

  it('validates size and ingredients on create', () => {
    expect(() => service.create({ customerName: 'Alice', sizeId: 'mdx', ingredientIds: ['cheese'] })).toThrow('Invalid sizeId: mdx');
    expect(() => service.create({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['ghost'] })).toThrow('Invalid ingredientId: ghost');
  });

  it('returns pizza by id or null when missing', () => {
    const created = service.create({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });

    expect(service.getById(created.id).id).toBe(created.id);
    expect(service.getById('missing')).toBeNull();
  });

  it('filters and sorts pizzas', () => {
    service.create({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });
    service.create({ customerName: 'Bob', sizeId: 'lg', ingredientIds: ['cheese', 'pepperoni'] });

    const filtered = service.getAll({ customerName: 'ali' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].customerName).toBe('Alice');

    const sortedDesc = service.getAll({ sortBy: 'finalPrice', order: 'desc' });
    expect(sortedDesc[0].customerName).toBe('Bob');
  });

  it('updates pizzas and recalculates price', () => {
    const created = service.create({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });

    const updated = service.update(created.id, { customerName: 'Bob', sizeId: 'lg', ingredientIds: ['cheese', 'pepperoni'] });

    expect(updated.customerName).toBe('Bob');
    expect(updated.sizeId).toBe('lg');
    expect(updated.finalPrice).toBe(18);
  });

  it('returns null when updating missing pizza', () => {
    expect(service.update('999', { customerName: 'Bob' })).toBeNull();
  });

  it('deletes pizzas and reports status', () => {
    const created = service.create({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });

    expect(service.delete(created.id)).toBe(true);
    expect(service.getById(created.id)).toBeNull();
    expect(service.delete(created.id)).toBe(false);
  });
});
