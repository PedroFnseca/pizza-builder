import Table from './table.js';

class Store {
  constructor() {
    this.tables = {
      pizzas: new Table(['id', 'customerName', 'sizeId', 'ingredientIds']),
      sizes: new Table(['id', 'name', 'basePrice']),
      ingredients: new Table(['id', 'name', 'extraPrice'])
    };
  }

  read(table, options) {
    return this.getTable(table).read(options?.filters, options?.sort);
  }

  write(table, record) {
    return this.getTable(table).write(record);
  }

  update(table, id, changes) {
    return this.getTable(table).update(id, changes);
  }

  delete(table, id) {
    return this.getTable(table).delete(id);
  }

  getTable(name) {
    const table = this.tables[name];
    if (!table) throw new Error('Table not found');
    return table;
  }
}

const store = new Store();

export default store;
