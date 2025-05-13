import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

  // GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.data = users ?? []; // Return empty array if no users
    next();
  } catch (error) {
    next(error);
  }
}, responseMiddleware);

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({
        error: true,
        message: 'User not found',
      });
    } else {
      res.data = user;
      next();
    }
  } catch (error) {
    next(error);
  }
}, responseMiddleware);

// POST /api/users
router.post(
  '/',
  createUserValid,
  async (req, res, next) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.data = newUser;
      next();
    } catch (error) {
      next(error);
    }
}, responseMiddleware);

router.patch(
  '/:id',
  updateUserValid,
  async (req, res, next) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: true, message: 'User not found' });
      }
      res.data = updatedUser;
      next();
    } catch (error) {
      next(error);
    }
  },
  responseMiddleware
);

router.delete(
  '/:id',
  async (req, res, next) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: true, message: 'User not found' });
      }
      res.data = deletedUser;
      next();
    } catch (error) {
      next(error);
    }
  },
  responseMiddleware
);

export { router }
