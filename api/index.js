import express from 'express';
import logger from 'logger-endpoints-api';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
