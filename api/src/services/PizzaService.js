class PizzaService {
  constructor(store) {
    this.store = store;
  }

  create(data) {
    return this.store.write('pizzas', data);
  }

  getAll() {
    return this.store.read('pizzas');
  }

  getById(id) {
    const result = this.store.read('pizzas', { filters: { id } });
    return result[0] || null;
  }

  update(id, changes) {
    return this.store.update('pizzas', id, changes);
  }

  delete(id) {
    return this.store.delete('pizzas', id);
  }
}

export default PizzaService;
