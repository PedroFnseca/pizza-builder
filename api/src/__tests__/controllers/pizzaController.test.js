import request from 'supertest';
import express from 'express';
import pizzaRoutes from '../../routes/pizzaRoutes.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
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
    app = buildApp();
  });

  it('creates a pizza when payload is valid', async () => {
    const response = await request(app)
      .post('/pizzas')
      .send({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    expect(response.status).toBe(201);
    expect(response.body.customerName).toBe('Alice');
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app).post('/pizzas').send({});

    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  it('retrieves and updates pizzas', async () => {
    await request(app)
      .post('/pizzas')
      .send({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    const getResponse = await request(app).get('/pizzas/p1');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe('p1');

    const updateResponse = await request(app)
      .put('/pizzas/p1')
      .send({ customerName: 'Bob' });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.customerName).toBe('Bob');
  });

  it('returns 404 when pizza is missing', async () => {
    const response = await request(app).get('/pizzas/missing');

    expect(response.status).toBe(404);
  });

  it('deletes pizzas and returns no content', async () => {
    await request(app)
      .post('/pizzas')
      .send({ id: 'p1', customerName: 'Alice', sizeId: 'm', ingredientIds: ['i1'] });

    const deleteResponse = await request(app).delete('/pizzas/p1');
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get('/pizzas/p1');
    expect(getResponse.status).toBe(404);
  });
});
