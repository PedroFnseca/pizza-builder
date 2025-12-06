import express from 'express';
import logger from 'logger-endpoints-api';
import cors from 'cors';
import store from './src/database/store.js';
import seedDatabase from './src/database/seed.js';
import routes from './src/routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

seedDatabase();

app.get('/health', (req, res) => {
  const databaseHealthy = store.isHealthy();

  if (!databaseHealthy) {
    return res.status(503).json({ status: 'unavailable' });
  }

  return res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
