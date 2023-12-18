import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/api/fighters', (req, res) => {
  const fighters = fighterService.getAllFighters();
  res.json(fighters);
});

router.get('/api/fighters/:id', (req, res) => {
  const fighter = fighterService.getFighterById(req.params.id);
  if (!fighter) {
    res.status(404).json({ error: true, message: 'Fighter not found' });
  } else {
    res.json(fighter);
  }
});

router.post('/api/fighters', (req, res) => {
  try {
    const fighter = fighterService.createFighter(req.body);
    res.status(200).json(fighter);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

router.put('/api/fighters/:id', (req, res) => {
  try {
    const updatedFighter = fighterService.updateFighter(req.params.id, req.body);
    if (!updatedFighter) {
      res.status(404).json({ error: true, message: 'Fighter not found' });
    } else {
      res.status(200).json(updatedFighter);
    }
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

router.delete('/api/fighters/:id', (req, res) => {
  try {
    fighterService.deleteFighter(req.params.id);
    res.status(200).json({ success: true, message: 'Fighter deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: true, message: 'Fighter not found' });
  }
});

export { router };
