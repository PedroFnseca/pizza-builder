import request from 'supertest';
import express from 'express';
import ingredientRoutes from '../../routes/ingredientRoutes.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/ingredients', ingredientRoutes);
  return app;
};

describe('Ingredient routes', () => {
  let app;

  beforeEach(() => {
    resetStore();
    app = buildApp();
  });

  it('creates ingredients with valid payload', async () => {
    const response = await request(app)
      .post('/ingredients')
      .send({ id: 'i1', name: 'Cheese', extraPrice: 1 });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Cheese');
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app).post('/ingredients').send({});

    expect(response.status).toBe(400);
  });

  it('retrieves, updates, and deletes ingredients', async () => {
    await request(app)
      .post('/ingredients')
      .send({ id: 'i1', name: 'Cheese', extraPrice: 1 });

    const getResponse = await request(app).get('/ingredients/i1');
    expect(getResponse.status).toBe(200);

    const updateResponse = await request(app)
      .put('/ingredients/i1')
      .send({ extraPrice: 2 });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.extraPrice).toBe(2);

    const deleteResponse = await request(app).delete('/ingredients/i1');
    expect(deleteResponse.status).toBe(204);

    const getMissing = await request(app).get('/ingredients/i1');
    expect(getMissing.status).toBe(404);
  });
});
