import IngredientService from '../../services/IngredientService.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

describe('IngredientService', () => {
  let service;

  beforeEach(() => {
    resetStore();
    service = new IngredientService(store);
  });

  it('creates and lists ingredients', () => {
    service.create({ id: 'i1', name: 'Cheese', extraPrice: 1 });

    const ingredients = service.getAll();

    expect(ingredients).toHaveLength(1);
    expect(ingredients[0].name).toBe('Cheese');
  });

  it('returns ingredient by id or null', () => {
    service.create({ id: 'i1', name: 'Cheese', extraPrice: 1 });

    expect(service.getById('i1').id).toBe('i1');
    expect(service.getById('missing')).toBeNull();
  });

  it('updates ingredients when present', () => {
    service.create({ id: 'i1', name: 'Cheese', extraPrice: 1 });

    const updated = service.update('i1', { extraPrice: 2 });

    expect(updated.extraPrice).toBe(2);
    expect(service.getById('i1').extraPrice).toBe(2);
  });

  it('returns null when updating missing ingredient', () => {
    expect(service.update('missing', { name: 'Ghost' })).toBeNull();
  });

  it('deletes ingredients and reports status', () => {
    service.create({ id: 'i1', name: 'Cheese', extraPrice: 1 });

    expect(service.delete('i1')).toBe(true);
    expect(service.getById('i1')).toBeNull();
    expect(service.delete('i1')).toBe(false);
  });
});
