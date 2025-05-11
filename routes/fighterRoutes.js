import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get("/", async (req, res, next) => {
  try {
    const storedFighters = await fighterService.getAllFighters();
    res.json(storedFighters);
  } catch (error) {
    next(error); 
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const requestedFighter = await fighterService.getOneFighter({ id });
    if (!requestedFighter) {
      return res.status(404).json({ message: "Fighter not found" });
    }
    res.json(requestedFighter);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  createFighterValid,
  async (req, res, next) => {
    const { name, power, defense, health } = req.body;
    try {
      const newFighter = await fighterService.createFighter({
        name,
        power,
        defense,
        health,
      });
      res.status(201).json(newFighter);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedFighter = await fighterService.deleteFighter(id);
    res.json(deletedFighter);
  } catch (error) {
    next(error); 
  }
});

router.patch(
  "/:id",
  updateFighterValid,
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const updatedFighter = await fighterService.updateFighter(id, req.body);
      res.json(updatedFighter);
    } catch (error) {
      next(error);
    }
  }
);


export { router };
