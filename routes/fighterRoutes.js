import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter

// GET /fighters
router.get(
  "/",
  function (req, res, next) {
    const fighters = fighterService.getAllFighters();
    res.data = fighters;
    next();
  },
  responseMiddleware
);

// GET /fighters/:id
router.get(
  "/:id",
  function (req, res, next) {
    try {
      const fighter = fighterService.getFighter({ id: req.params.id });

      if (!fighter) {
        throw new Error("Fighter not found");
      } else {
        res.data = fighter;
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

// POST /fighters
router.post(
  "/",
  createFighterValid,
  function (req, res, next) {
    try {
      if (res.isError422) {
        throw new Error(res.message);
      }

      const fighterExist = fighterService.search(req.body.name);

      if (fighterExist) {
        throw new Error("Fighter already exist");
      }

      const fighter = fighterService.createFighter(req.body);
      if (!fighter) {
        throw new Error("Fighter not created");
      }

      res.data = fighter;
    } catch (error) {
      res.isError404 = true;
      res.message = error.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// PATCH /fighters/:id
router.patch(
  "/:id",
  updateFighterValid,
  function (req, res, next) {
    try {
      if (res.isError422) {
        throw new Error(res.message);
      }

      const fighter = fighterService.getFighter({ id: req.params.id });

      if (!fighter) {
        throw new Error("Fighter not found");
      }

      const fighterNameExist = req.body.name
        ? fighterService.search(req.body.name)
        : false;

      if (fighterNameExist) {
        throw new Error("Fighter name already exist");
      }

      const updatedFighter = fighterService.updateFighter(
        req.params.id,
        req.body
      );

      if (!updatedFighter) {
        throw new Error("Fighter not updated");
      }

      res.data = fighter;
    } catch (error) {
      res.isError404 = true;
      res.message = error.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// DELETE /fighters/:id
router.delete(
  "/:id",
  function (req, res, next) {
    try {
      const fighter = fighterService.getFighter({ id: req.params.id });

      if (!fighter) {
        throw new Error("Fighter not found");
      }

      const deletedFighter = fighterService.deleteFighter(req.params.id);

      if (!deletedFighter) {
        throw new Error("Fighter not deleted");
      }

      res.data = deletedFighter;
    } catch (error) {
      res.isError404 = true;
      res.message = error.message;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
