import { Router } from "express";
import { fightsService } from "../services/fightService.js";
import {
  createFightValid,
  updateFightValid,
} from "../middlewares/fight.validation.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.get("/", async (req, res, next) => {
  try {
    const fights = await fightsService.getAllFights();
    return res.json(fights);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const fight = await fightsService.getOneFight({ id: req.params.id });
    if (!fight) {
      return res.status(404).json({ message: "Fight not found" });
    }
    return res.json(fight);
  } catch (error) {
    return next(error);
  }
});

router.post("/", createFightValid, (req, res, next) => {
  const { fighter1, fighter2 } = req.body;
  try {
    const fightCreated = fightsService.createFight(fighter1, fighter2);
    return res.status(201).json(fightCreated);
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/log", updateFightValid, (req, res, next) => {
  const id = req.params.id;
  try {
    const fightUpdated = fightsService.updateFight(id, req.body);
    return res.json(fightUpdated);
  } catch (error) {
    return next(error);
  }
});


export { router };