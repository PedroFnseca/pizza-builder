import request from 'supertest';
import express from 'express';
import sizeRoutes from '../../routes/sizeRoutes.js';
import store from '../../database/store.js';

const resetStore = () => {
  Object.values(store.tables).forEach(table => table.data.clear());
};

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/sizes', sizeRoutes);
  return app;
};

describe('Size routes', () => {
  let app;

  beforeEach(() => {
    resetStore();
    app = buildApp();
  });

  it('creates sizes with valid payload', async () => {
    const response = await request(app)
      .post('/sizes')
      .send({ id: 's1', name: 'Medium', basePrice: 10 });

    expect(response.status).toBe(201);
    expect(response.body.basePrice).toBe(10);
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app).post('/sizes').send({});

    expect(response.status).toBe(400);
  });

  it('retrieves, updates, and deletes sizes', async () => {
    await request(app)
      .post('/sizes')
      .send({ id: 's1', name: 'Medium', basePrice: 10 });

    const getResponse = await request(app).get('/sizes/s1');
    expect(getResponse.status).toBe(200);

    const updateResponse = await request(app)
      .put('/sizes/s1')
      .send({ basePrice: 12 });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.basePrice).toBe(12);

    const deleteResponse = await request(app).delete('/sizes/s1');
    expect(deleteResponse.status).toBe(204);

    const getMissing = await request(app).get('/sizes/s1');
    expect(getMissing.status).toBe(404);
  });
});
