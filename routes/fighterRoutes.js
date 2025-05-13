import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";



const router = Router();

// TODO: Implement route controllers for fighter
// GET /api/fighters
router.get("/", async (req, res, next) => {
  try {
    const fighters = await fighterService.getFighters();
    res.data = fighters ?? [];
    next();
  } catch (error) {
    next(error);
  }
}, responseMiddleware);

// GET /api/fighters/:id
router.get("/:id", async (req, res, next) => {
  try {
    const fighter = await fighterService.getFighterById(req.params.id);
    if (!fighter) {
      res.status(404).json({ error: true, message: "Fighter not found" });
    } else {
      res.data = fighter;
      next();
    }
  } catch (error) {
    next(error);
  }
}, responseMiddleware);

router.post('/', createFighterValid, async (req, res, next) => {
  try {
    const created = await fighterService.createFighter(req.body);
    res.data = created;
    next();
  } catch (err) {
    next(err);
  }
}, responseMiddleware);

// PUT /api/fighters/:id
router.put("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const updated = await fighterService.updateFighter(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: true, message: "Fighter not found" });
    }
    res.data = updated;
    next();
  } catch (error) {
    next(error);
  }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await fighterService.deleteFighter(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: true, message: "Fighter not found" });
    }
    res.data = deleted;
    next();
  } catch (error) {
    next(error);
  }
}, responseMiddleware);

export { router };
