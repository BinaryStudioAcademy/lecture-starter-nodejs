import { Router } from 'express';
import { fighterCtrl } from '../controllers/fighterControllers.js';

import {
  createFighterValid,
  updateFighterValid,
} from '../middlewares/fighter.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

// *********************************************************

const router = Router();

// *********************************************************

// Get all users
router.get('/', fighterCtrl.getAll, responseMiddleware);

// Get current user
router.get('/:id', fighterCtrl.getCurrent, responseMiddleware);

// Register a new user
router.post('/', createFighterValid, fighterCtrl.create, responseMiddleware);

// Edit user data
router.put('/:id', updateFighterValid, fighterCtrl.edit, responseMiddleware);

// Delete an existing user
router.delete('/:id', fighterCtrl.remove, responseMiddleware);

// *********************************************************

export { router };
