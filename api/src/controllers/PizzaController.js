class PizzaController {
  constructor(service) {
    this.service = service;
    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  get(req, res) {
    const pizzas = this.service.getAll(req.query);
    return res.status(200).json(pizzas);
  }

  getById(req, res) {
    const pizza = this.service.getById(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    return res.status(200).json(pizza);
  }

  create(req, res) {
    try {
      const pizza = this.service.create(req.body);
      return res.status(201).json(pizza);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  update(req, res) {
    try {
      const updated = this.service.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: 'Pizza not found' });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  delete(req, res) {
    const deleted = this.service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Pizza not found' });
    return res.status(204).send();
  }
}

export default PizzaController;
