import { Router } from 'express';
import { body, param } from 'express-validator';
import IngredientController from '../controllers/IngredientController.js';
import IngredientService from '../services/IngredientService.js';
import store from '../database/store.js';
import validateRequest from '../validators/validateRequest.js';

const router = Router();
const controller = new IngredientController(new IngredientService(store));

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
    body('name').isString().notEmpty(),
    body('extraPrice').isNumeric()
  ]),
  controller.create
);

router.put(
  '/:id',
  validateRequest([
    param('id').isString().notEmpty(),
    body('name').optional().isString().notEmpty(),
    body('extraPrice').optional().isNumeric()
  ]),
  controller.update
);

router.delete(
  '/:id',
  validateRequest([param('id').isString().notEmpty()]),
  controller.delete
);

export default router;
