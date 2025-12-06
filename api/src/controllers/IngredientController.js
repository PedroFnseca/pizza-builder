class IngredientController {
  constructor(service) {
    this.service = service;
    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  get(req, res) {
    const ingredients = this.service.getAll();
    return res.status(200).json(ingredients);
  }

  getById(req, res) {
    const ingredient = this.service.getById(req.params.id);
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
    return res.status(200).json(ingredient);
  }

  create(req, res) {
    const ingredient = this.service.create(req.body);
    return res.status(201).json(ingredient);
  }

  update(req, res) {
    const updated = this.service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Ingredient not found' });
    return res.status(200).json(updated);
  }

  delete(req, res) {
    const deleted = this.service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Ingredient not found' });
    return res.status(204).send();
  }
}

export default IngredientController;
