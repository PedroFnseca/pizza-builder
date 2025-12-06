class SizeController {
  constructor(service) {
    this.service = service;
    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  get(req, res) {
    const sizes = this.service.getAll();
    return res.status(200).json(sizes);
  }

  getById(req, res) {
    const size = this.service.getById(req.params.id);
    if (!size) return res.status(404).json({ message: 'Size not found' });
    return res.status(200).json(size);
  }

  create(req, res) {
    const size = this.service.create(req.body);
    return res.status(201).json(size);
  }

  update(req, res) {
    const updated = this.service.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Size not found' });
    return res.status(200).json(updated);
  }

  delete(req, res) {
    const deleted = this.service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Size not found' });
    return res.status(204).send();
  }
}

export default SizeController;
