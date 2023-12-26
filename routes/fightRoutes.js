import { Router } from 'express';
import { fightService } from '../services/fightService.js';
import { saveFightValid } from '../middlewares/fight.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import { fightsCtrl } from '../controllers/fightsControllers.js';

// *********************************************************

const router = Router();

// *********************************************************

// OPTIONAL TODO: Implement route controller for fights

// Get all fights
router.get('/', fightsCtrl.getAll, responseMiddleware);

// Get one fight by id
router.get('/:id', fightsCtrl.getCurrent, responseMiddleware);

// Save the fight
router.post('/', saveFightValid, fightsCtrl.save, responseMiddleware);

// *********************************************************

export { router };
