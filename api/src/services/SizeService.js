class SizeService {
  constructor(store) {
    this.store = store;
  }

  create(data) {
    return this.store.write('sizes', data);
  }

  getAll() {
    return this.store.read('sizes');
  }

  getById(id) {
    const result = this.store.read('sizes', { filters: { id } });
    return result[0] || null;
  }

  update(id, changes) {
    return this.store.update('sizes', id, changes);
  }

  delete(id) {
    return this.store.delete('sizes', id);
  }
}

export default SizeService;
