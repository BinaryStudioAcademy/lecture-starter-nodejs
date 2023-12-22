import { Router } from 'express';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import { controllers } from '../controllers/userControllers.js';

const router = Router();

// Get all users
router.get('/', controllers.getAll, responseMiddleware);

// Get current user
router.get('/:id', controllers.getCurrent, responseMiddleware);

// Register a new user
router.post('/', createUserValid, controllers.create, responseMiddleware);

// Edit user data
router.put('/:id', updateUserValid, controllers.edit, responseMiddleware);

// Delete an existing user
router.delete('/:id', controllers.remove, responseMiddleware);

export { router };
