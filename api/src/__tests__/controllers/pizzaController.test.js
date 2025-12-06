import request from 'supertest';
import express from 'express';
import pizzaRoutes from '../../routes/pizzaRoutes.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

const seedReferences = () => {
  store.write('sizes', { id: 'md', name: 'Medium', basePrice: 10 });
  store.write('sizes', { id: 'lg', name: 'Large', basePrice: 15 });
  store.write('ingredients', { id: 'cheese', name: 'Cheese', extraPrice: 1 });
  store.write('ingredients', { id: 'pepperoni', name: 'Pepperoni', extraPrice: 2 });
};

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/pizzas', pizzaRoutes);
  return app;
};

describe('Pizza routes', () => {
  let app;

  beforeEach(() => {
    resetStore();
    seedReferences();
    app = buildApp();
  });

  it('creates a pizza when payload is valid', async () => {
    const response = await request(app)
      .post('/pizzas')
      .send({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });

    expect(response.status).toBe(201);
    expect(response.body.customerName).toBe('Alice');
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.finalPrice).toBe(11);
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app).post('/pizzas').send({});

    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  it('rejects invalid references', async () => {
    const sizeResponse = await request(app)
      .post('/pizzas')
      .send({ customerName: 'Alice', sizeId: 'x', ingredientIds: ['cheese'] });

    expect(sizeResponse.status).toBe(400);
    expect(sizeResponse.body.error).toContain('Invalid sizeId');

    const ingredientResponse = await request(app)
      .post('/pizzas')
      .send({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['ghost'] });

    expect(ingredientResponse.status).toBe(400);
    expect(ingredientResponse.body.error).toContain('Invalid ingredientId');
  });

  it('retrieves and updates pizzas', async () => {
    await request(app)
      .post('/pizzas')
      .send({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });

    const getResponse = await request(app).get('/pizzas/1');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe('1');

    const updateResponse = await request(app)
      .put('/pizzas/1')
      .send({ customerName: 'Bob', sizeId: 'lg', ingredientIds: ['cheese', 'pepperoni'] });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.customerName).toBe('Bob');
    expect(updateResponse.body.finalPrice).toBe(18);
  });

  it('returns 404 when pizza is missing', async () => {
    const response = await request(app).get('/pizzas/missing');

    expect(response.status).toBe(404);
  });

  it('filters and sorts pizzas via query', async () => {
    await request(app)
      .post('/pizzas')
      .send({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });
    await request(app)
      .post('/pizzas')
      .send({ customerName: 'Bob', sizeId: 'lg', ingredientIds: ['cheese', 'pepperoni'] });

    const filtered = await request(app).get('/pizzas').query({ customerName: 'ali' });
    expect(filtered.status).toBe(200);
    expect(filtered.body).toHaveLength(1);

    const sorted = await request(app).get('/pizzas').query({ sortBy: 'finalPrice', order: 'desc' });
    expect(sorted.status).toBe(200);
    expect(sorted.body[0].customerName).toBe('Bob');
  });

  it('deletes pizzas and returns no content', async () => {
    await request(app)
      .post('/pizzas')
      .send({ customerName: 'Alice', sizeId: 'md', ingredientIds: ['cheese'] });

    const deleteResponse = await request(app).delete('/pizzas/1');
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get('/pizzas/1');
    expect(getResponse.status).toBe(404);
  });
});
