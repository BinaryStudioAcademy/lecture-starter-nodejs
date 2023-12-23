import { Router } from 'express';
import { userCtrl } from '../controllers/userControllers.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

// *********************************************************

const router = Router();

// *********************************************************

// Get all users
router.get('/', userCtrl.getAll, responseMiddleware);

// Get current user
router.get('/:id', userCtrl.getCurrent, responseMiddleware);

// Register a new user
router.post('/', createUserValid, userCtrl.create, responseMiddleware);

// Edit user data
router.put('/:id', updateUserValid, userCtrl.edit, responseMiddleware);

// Delete an existing user
router.delete('/:id', userCtrl.remove, responseMiddleware);

// *********************************************************

export { router };
