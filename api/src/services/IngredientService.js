class IngredientService {
  constructor(store) {
    this.store = store;
  }

  create(data) {
    return this.store.write('ingredients', data);
  }

  getAll() {
    return this.store.read('ingredients');
  }

  getById(id) {
    const result = this.store.read('ingredients', { filters: { id } });
    return result[0] || null;
  }

  update(id, changes) {
    return this.store.update('ingredients', id, changes);
  }

  delete(id) {
    return this.store.delete('ingredients', id);
  }
}

export default IngredientService;
