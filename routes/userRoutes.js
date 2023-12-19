import { Router } from 'express';
import { userService } from '../services/userService.js';
import {
  createUserValid,
  updateUserValid,
} from '../middlewares/user.validation.middleware.js';
import { responseMiddleware } from '../middlewares/response.middleware.js';
import { errorMessages } from '../constants/errorMessages.js';

const router = Router();

// Get all users
router.get('/', function (req, res, next) {
  const users = userService.getAllUsers();
  res.json(users);
});

// Get current user
router.get(
  '/:id',
  function (req, res, next) {
    const { id } = req.params;
    res.data = userService.search({ id });
    next();
  },
  responseMiddleware
);

// Register a new user
router.post(
  '/',
  createUserValid,
  function (req, res, next) {
    const { email, phoneNumber } = req.body;
    const isAlreadyRegistered =
      userService.search({ email }) || userService.search({ phoneNumber });

    if (isAlreadyRegistered) {
      const message = errorMessages.userExists;
      return res.status(409).json({ message });
    }

    const userData = req.body;
    res.data = userService.register(userData);
    next();
  },
  responseMiddleware
);

// Edit user data
router.put(
  '/:id',
  updateUserValid,
  function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    res.data = userService.editUser(id, data);
    next();
  },
  responseMiddleware
);

// Delete an existing user
router.delete(
  '/:id',
  function (req, res, next) {
    const { id } = req.params;
    const result = userService.deleteUser(id);
    res.data = result;
    next();
  },
  responseMiddleware
);

export { router };
