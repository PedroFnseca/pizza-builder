import { Router } from 'express';
import { body, param } from 'express-validator';
import PizzaController from '../controllers/PizzaController.js';
import PizzaService from '../services/PizzaService.js';
import store from '../database/store.js';
import validateRequest from '../validators/validateRequest.js';

const router = Router();
const controller = new PizzaController(new PizzaService(store));

router.get('/', controller.get);

router.get(
  '/:id',
  validateRequest([param('id').isString().notEmpty()]),
  controller.getById
);

router.post(
  '/',
  validateRequest([
    body('id').isString().notEmpty(),
    body('customerName').isString().notEmpty(),
    body('sizeId').isString().notEmpty(),
    body('ingredientIds').isArray(),
    body('ingredientIds.*').isString().notEmpty()
  ]),
  controller.create
);

router.put(
  '/:id',
  validateRequest([
    param('id').isString().notEmpty(),
    body('customerName').optional().isString().notEmpty(),
    body('sizeId').optional().isString().notEmpty(),
    body('ingredientIds').optional().isArray(),
    body('ingredientIds.*').optional().isString().notEmpty()
  ]),
  controller.update
);

router.delete(
  '/:id',
  validateRequest([param('id').isString().notEmpty()]),
  controller.delete
);

export default router;
