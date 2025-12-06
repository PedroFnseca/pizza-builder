import { Router } from 'express';
import pizzaRoutes from './routes/pizzaRoutes.js';
import sizeRoutes from './routes/sizeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';

const router = Router();

router.use('/pizzas', pizzaRoutes);
router.use('/sizes', sizeRoutes);
router.use('/ingredients', ingredientRoutes);

export default router;
