import { Router, response } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

// GET /users
router.get(
  "/",
  function (req, res, next) {
    const users = userService.getAllUsers();
    res.data = users;
    next();
  },
  responseMiddleware
);

// Get /users/:id
router.get(
  "/:id",
  function (req, res, next) {
    try {
      const user = userService.search({ id: req.params.id });
      if (!user) {
        throw new Error("User not found");
      } else {
        res.data = user;
      }
    } catch (error) {
      res.isError404 = true;
      res.message = error.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// POST /users
router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      if (res.isError422) {
        throw new Error(res.message);
      }

      const checkUser = userService.search({ email: req.body.email });

      if (checkUser) {
        throw new Error("User already exists");
      }

      const newUser = userService.createUser(req.body);
      res.data = newUser;
    } catch (err) {
      res.isError404 = true;
      res.message = err.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PUT /users/:id
router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    try {
      if (res.isError422) {
        throw new Error(res.message);
      }

      const user = userService.search({ id: req.params.id });

      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = userService.updateUser(req.params.id, req.body);
      res.data = updatedUser;
    } catch (err) {
      res.isError404 = true;
      res.message = err.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// DELETE /users/:id
router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const user = userService.search({ id: req.params.id });

      if (!user) {
        throw new Error("User not found");
      }

      userService.deleteUser(req.params.id);
      res.data = {};
    } catch (err) {
      res.isError404 = true;
      res.message = err.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
