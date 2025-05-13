import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { fightersService, recordFight, getFightHistory } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";


const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.post('/', async (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;

    if (!fighter1 || !fighter2 || fighter1 === fighter2) {
      return res.status(400).json({ error: true, message: "Two distinct fighter IDs are required" });
    }

    const result = await fighterService.fight(fighter1, fighter2);
    const f1 = await fightersService.getFighterById(fighter1);
    const f2 = await fightersService.getFighterById(fighter2);
    recordFight(f1, f2, result);
    res.data = result;
    next();
  } catch (err) {
    next(err);
  }
}, responseMiddleware);

// ✅ ADD: GET /api/fights/history — return all recorded fights
router.get("/history", async (req, res, next) => {
  try {
    res.data = getFightHistory();
    next();
  } catch (err) {
    next(err);
  }
}, responseMiddleware);

export { router };
