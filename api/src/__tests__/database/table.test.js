import Table from '../../database/table.js';

describe('Table', () => {
  let table;

  beforeEach(() => {
    table = new Table(['id', 'name', 'tags', 'price']);
  });

  it('writes and reads records', () => {
    const margherita = { id: '1', name: 'Margherita', tags: ['classic'], price: 10 };
    const saved = table.write(margherita);

    expect(saved).toEqual(margherita);
    expect(saved).not.toBe(margherita);
    expect(table.read()).toEqual([margherita]);
  });

  it('throws when writing without id', () => {
    expect(() => table.write({ name: 'No Id' })).toThrow('Missing id');
  });

  it('filters by primitive and array values and sorts descending', () => {
    table.write({ id: '1', name: 'Veggie', tags: ['vegan', 'spicy'], price: 12 });
    table.write({ id: '2', name: 'Pepperoni', tags: ['meat'], price: 14 });
    table.write({ id: '3', name: 'Marinara', tags: ['vegan'], price: 9 });

    const result = table.read(
      { tags: ['vegan'] },
      { by: 'price', order: 'desc' }
    );

    expect(result.map(pizza => pizza.id)).toEqual(['1', '3']);
    expect(result[0].price).toBeGreaterThan(result[1].price);
  });

  it('sorts by numeric and string columns through sort option', () => {
    table.write({ id: '1', name: 'Alpha', tags: [], price: 5 });
    table.write({ id: '2', name: 'Charlie', tags: [], price: 15 });
    table.write({ id: '3', name: 'Bravo', tags: [], price: 10 });

    const asc = table.read({}, { by: 'price', order: 'asc' });
    expect(asc.map(item => item.id)).toEqual(['1', '3', '2']);

    const desc = table.read({}, { by: 'name', order: 'desc' });
    expect(desc.map(item => item.name)).toEqual(['Charlie', 'Bravo', 'Alpha']);
  });

  it('updates existing records while preserving id', () => {
    table.write({ id: '5', name: 'Four Cheese', tags: ['cheesy'], price: 15 });

    const updated = table.update('5', { name: 'Quattro Formaggi', price: 16, id: 'ignore' });

    expect(updated).toEqual({ id: '5', name: 'Quattro Formaggi', tags: ['cheesy'], price: 16 });
    expect(table.read()).toEqual([updated]);
  });

  it('returns null when updating non-existent records', () => {
    expect(table.update('missing', { name: 'Ghost' })).toBeNull();
  });

  it('deletes records and reports status', () => {
    table.write({ id: '1', name: 'Margherita', tags: [], price: 10 });
    table.write({ id: '2', name: 'Pepperoni', tags: [], price: 12 });

    expect(table.delete('1')).toBe(true);
    expect(table.read().map(pizza => pizza.id)).toEqual(['2']);
    expect(table.delete('non-existent')).toBe(false);
  });
});
