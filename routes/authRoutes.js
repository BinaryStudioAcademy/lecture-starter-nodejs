import { Router } from 'express';
import { authService } from '../services/authService.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';

const router = Router();

router.post(
  '/login',
  (req, res, next) => {
    try {
      const { email, password } = req;
      const data = authService.login({ email, password });
      console.log('data: ', data);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
