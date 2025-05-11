import { Router } from "express";
import { fightsService } from "../services/fightService.js";

const router = Router();

// TODO: Implement route controllers for fighter

router.post("/", async (req, res, next) => {
  const { fighter1, fighter2 } = req.body;
  try {
    const fightCreated = await fightsService.createFight(fighter1, fighter2);
    res.body = fightCreated;
    return next();
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/log", async (req, res, next) => {
  const id = req.params.id;
  try {
    const fightUpdated = await fightsService.updateFight(id, {
      ...req.body,
    });
    res.body = fightUpdated;
    return next();
  } catch (error) {
    return next(error);
  }
});

export { router };
