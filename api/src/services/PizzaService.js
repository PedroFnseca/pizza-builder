class PizzaService {
  constructor(store) {
    this.store = store;
  }

  create(data) {
    const { customerName, sizeId, ingredientIds } = data || {};

    const size = this.ensureSize(sizeId);
    const ingredients = this.ensureIngredients(ingredientIds);
    const finalPrice = this.calculateFinalPrice(size, ingredients);
    const record = {
      id: this.nextId(),
      customerName,
      sizeId,
      ingredientIds,
      createdAt: new Date().toISOString(),
      finalPrice
    };

    return this.store.write('pizzas', record);
  }

  getAll(options = {}) {
    const { customerName, sortBy, order } = options;
    const sort = sortBy ? { by: sortBy, order } : undefined;
    let pizzas = this.store.read('pizzas', { sort });

    if (customerName) {
      const needle = customerName.toLowerCase();
      pizzas = pizzas.filter(item => item.customerName.toLowerCase().includes(needle));
    }

    return pizzas;
  }

  getById(id) {
    const result = this.store.read('pizzas', { filters: { id } });
    return result[0] || null;
  }

  update(id, changes) {
    const current = this.getById(id);
    if (!current) return null;

    const payload = changes || {};
    const customerName = payload.customerName !== undefined ? payload.customerName : current.customerName;
    const sizeId = payload.sizeId !== undefined ? payload.sizeId : current.sizeId;
    const ingredientIds = payload.ingredientIds !== undefined ? payload.ingredientIds : current.ingredientIds;

    const size = this.ensureSize(sizeId);
    const ingredients = this.ensureIngredients(ingredientIds);
    const finalPrice = this.calculateFinalPrice(size, ingredients);

    return this.store.update('pizzas', id, { customerName, sizeId, ingredientIds, finalPrice });
  }

  delete(id) {
    return this.store.delete('pizzas', id);
  }

  nextId() {
    const table = this.store.getTable('pizzas');
    const ids = Array.from(table.data.keys()).map(Number).filter(n => !Number.isNaN(n));
    const maxId = ids.length ? Math.max(...ids) : 0;
    return String(maxId + 1);
  }

  ensureSize(sizeId) {
    const size = this.store.read('sizes', { filters: { id: sizeId } })[0];
    if (!size) throw new Error(`Invalid sizeId: ${sizeId}`);
    return size;
  }

  ensureIngredients(ingredientIds) {
    const ids = ingredientIds || [];
    const found = this.store.read('ingredients');
    const lookup = new Map(found.map(item => [item.id, item]));
    const missing = ids.find(id => !lookup.has(id));
    if (missing) throw new Error(`Invalid ingredientId: ${missing}`);
    return ids.map(id => lookup.get(id));
  }

  calculateFinalPrice(size, ingredients) {
    const extra = (ingredients || []).reduce((sum, item) => sum + Number(item?.extraPrice || 0), 0);
    return Number(size.basePrice || 0) + extra;
  }
}

export default PizzaService;
