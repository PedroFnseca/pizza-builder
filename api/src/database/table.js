class Table {
  constructor(columns) {
    this.columns = new Set(columns);
    this.data = new Map();
  }

  read(filters = {}, sort) {
    let rows = Array.from(this.data.values());
    const filterKeys = Object.keys(filters);
    if (filterKeys.length) {
      rows = rows.filter(item => filterKeys.every(key => {
        if (!this.columns.has(key)) return false;
        const filterValue = filters[key];
        const value = item[key];
        if (Array.isArray(filterValue)) return Array.isArray(value) && filterValue.every(v => value.includes(v));
        return value === filterValue;
      }));
    }
    if (sort && sort.by && this.columns.has(sort.by)) {
      const dir = sort.order === 'desc' ? -1 : 1;
      rows = rows.sort((a, b) => {
        const av = a[sort.by];
        const bv = b[sort.by];
        if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * dir;
        if (av > bv) return dir;
        if (av < bv) return -dir;
        return 0;
      });
    }
    return rows;
  }

  write(record) {
    if (!record || !record.id) throw new Error('Missing id');
    this.data.set(record.id, { ...record });
    return this.data.get(record.id);
  }

  update(id, changes) {
    if (!this.data.has(id)) return null;
    const current = this.data.get(id);
    const updated = { ...current, ...changes, id: current.id };
    this.data.set(id, updated);
    return updated;
  }

  delete(id) {
    return this.data.delete(id);
  }
}

export default Table;
