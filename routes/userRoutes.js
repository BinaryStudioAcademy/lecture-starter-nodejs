import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get('/api/users', (req, res) => {
  const users = userService.getAllUsers();
  res.json(users);
});

router.get('/api/users/:id', (req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ error: true, message: 'User not found' });
  } else {
    res.json(user);
  }
});

router.post('/api/users', (req, res) => {
  try {
    const user = userService.createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

router.put('/api/users/:id', (req, res) => {
  try {
    const updatedUser = userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ error: true, message: 'User not found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

router.delete('/api/users/:id', (req, res) => {
  try {
    userService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: true, message: 'User not found' });
  }
});

export { router };
