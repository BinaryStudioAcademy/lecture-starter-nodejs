import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get("/", async (req, res, next) => {
  try {
    const storedFighters = await fighterService.getAllFighters();
    res.body = storedFighters;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const requestedFighter = await fighterService.searchById(id);
    res.body = requestedFighter;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const { name, power, defense, health } = req.body;
    const newFighter = await fighterService.createFighter({
      name,
      power,
      defense,
      health,
    });
    res.body = newFighter;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedFighter = await fighterService.deleteFighterById(id);
    res.body = deletedFighter;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedFighter = await fighterService.updateFighter(id, req.body);
    res.body = updatedFighter;
    return next();
  } catch (error) {
    return next(error);
  }
});

export { router };
