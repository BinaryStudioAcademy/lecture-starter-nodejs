import { Router } from 'express';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import { authCtrl } from '../controllers/authControllers.js';

// *********************************************************

const router = Router();

// *********************************************************

router.post('/login', authCtrl.login, responseMiddleware);

export { router };
