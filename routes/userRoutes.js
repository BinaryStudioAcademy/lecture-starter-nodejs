import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get(
  "/",
  async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.data = users;
    } catch (err) {
      res.err = err;
      res.status(500);
    }
    next();
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.search({ id });

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      res.data = user;
    } catch (err) {
      res.err = err;
    }
    next();
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201);
      res.data = user;
    } catch (err) {
      res.err = err;
      res.status(400);
    }
    next();
  },
  responseMiddleware
);

router.patch(
  "/:id", 
  updateUserValid,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingUser = await userService.search({ id });

      if (!existingUser) {
        res.status(404);
        throw new Error("User not found");
      }

      const updatedUser = await userService.updateUser(id, req.body);
      res.data = updatedUser;
    } catch (err) {
      res.err = err;
      res.status(400);
    }
    next();
  },
  responseMiddleware
);


router.put(
  "/:id",
  updateUserValid,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingUser = await userService.search({ id });

      if (!existingUser) {
        res.status(404);
        throw new Error("User not found");
      }

      const updatedUser = await userService.updateUser(id, req.body);
      res.data = updatedUser;
    } catch (err) {
      res.err = err;
      res.status(400);
    }
    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const existingUser = await userService.search({ id });

      if (!existingUser) {
        res.status(404);
        throw new Error("User does not exist");
      }

      const deleted = await userService.deleteUser(id);
      res.data = deleted;
    } catch (err) {
      res.err = err;
      res.status(400);
    }
    next();
  },
  responseMiddleware
);

export { router };
