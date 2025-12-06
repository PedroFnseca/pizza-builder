import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

describe('Store', () => {
  beforeEach(() => {
    resetStore();
  });

  it('writes and reads from a table', () => {
    store.write('pizzas', { id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    const pizzas = store.read('pizzas');

    expect(pizzas).toHaveLength(1);
    expect(pizzas[0].customerName).toBe('Alice');
  });

  it('updates records in a table', () => {
    store.write('sizes', { id: 's1', name: 'Medium', basePrice: 10 });

    const updated = store.update('sizes', 's1', { basePrice: 12 });

    expect(updated).toEqual({ id: 's1', name: 'Medium', basePrice: 12 });
    expect(store.read('sizes')).toEqual([updated]);
  });

  it('returns null when updating missing rows', () => {
    expect(store.update('ingredients', 'missing', { name: 'Ghost' })).toBeNull();
  });

  it('deletes rows and reports status', () => {
    store.write('ingredients', { id: 'i1', name: 'Cheese', extraPrice: 1 });
    store.write('ingredients', { id: 'i2', name: 'Pepperoni', extraPrice: 1.5 });

    expect(store.delete('ingredients', 'i1')).toBe(true);
    expect(store.read('ingredients').map(item => item.id)).toEqual(['i2']);
    expect(store.delete('ingredients', 'missing')).toBe(false);
  });

  it('throws when accessing an unknown table', () => {
    expect(() => store.read('unknown')).toThrow('Table not found');
  });
});
