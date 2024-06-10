import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = fighterService.getAll();
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const data = fighterService.search(req.params.id);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
)

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      const data = fighterService.create(req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
)

router.patch(
  ":id",
  updateFighterValid,
  (req, res, next) => {
    try {
      const data = fighterService.update(req.params.id, req.body);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
)

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.delete(req.params.id);
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
)

export { router };
