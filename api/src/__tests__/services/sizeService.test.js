import SizeService from '../../services/SizeService.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

describe('SizeService', () => {
  let service;

  beforeEach(() => {
    resetStore();
    service = new SizeService(store);
  });

  it('creates and lists sizes', () => {
    service.create({ id: 's1', name: 'Medium', basePrice: 10 });

    const sizes = service.getAll();

    expect(sizes).toHaveLength(1);
    expect(sizes[0].name).toBe('Medium');
  });

  it('gets by id or returns null', () => {
    service.create({ id: 's1', name: 'Medium', basePrice: 10 });

    expect(service.getById('s1').id).toBe('s1');
    expect(service.getById('missing')).toBeNull();
  });

  it('updates sizes when present', () => {
    service.create({ id: 's1', name: 'Medium', basePrice: 10 });

    const updated = service.update('s1', { basePrice: 12 });

    expect(updated.basePrice).toBe(12);
    expect(service.getById('s1').basePrice).toBe(12);
  });

  it('returns null when updating missing size', () => {
    expect(service.update('missing', { basePrice: 12 })).toBeNull();
  });

  it('deletes sizes and reports status', () => {
    service.create({ id: 's1', name: 'Medium', basePrice: 10 });

    expect(service.delete('s1')).toBe(true);
    expect(service.getById('s1')).toBeNull();
    expect(service.delete('s1')).toBe(false);
  });
});
