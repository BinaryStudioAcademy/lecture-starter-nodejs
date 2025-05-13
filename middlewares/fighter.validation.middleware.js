import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";


// Validation helpers
const isNumberInRange = (val, min, max) => typeof val === "number" && val >= min && val <= max;

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const fighter = req.body;

  // Disallow 'id'
  if ("id" in fighter) {
    return res.status(400).json({ error: true, message: "Field 'id' is not allowed" });
  }

  // Required fields except id and health
  const requiredFields = Object.keys(FIGHTER).filter(f => f !== "id" && f !== "health");
  const missingFields = requiredFields.filter(f => !fighter[f]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // Extra fields
  const modelFields = Object.keys(FIGHTER);
  const extraFields = Object.keys(fighter).filter(f => !modelFields.includes(f));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields are not allowed: ${extraFields.join(", ")}`,
    });
  }

  // Field format checks
  if (!isNumberInRange(fighter.power, 1, 100)) {
    return res.status(400).json({ error: true, message: "Power must be between 1 and 100" });
  }

  if (!isNumberInRange(fighter.defense, 1, 10)) {
    return res.status(400).json({ error: true, message: "Defense must be between 1 and 10" });
  }

  if (fighter.health && !isNumberInRange(fighter.health, 80, 120)) {
    return res.status(400).json({ error: true, message: "Health must be between 80 and 120" });
  }

  // Check for duplicate name (case-insensitive)
  const existing = fighterService.search({ name: fighter.name?.toLowerCase() });
  if (existing) {
    return res.status(400).json({ error: true, message: "Fighter with this name already exists" });
  }

  next();
};


const isPower = (power) => typeof power === "number" && power >= 1 && power <= 100;
const isDefense = (defense) => typeof defense === "number" && defense >= 1 && defense <= 10;
const isHealth = (health) => typeof health === "number" && health >= 80 && health <= 120;

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const fighter = req.body;

  // Disallow 'id'
  if ("id" in fighter) {
    return res.status(400).json({ error: true, message: "Field 'id' is not allowed" });
  }

  const allowedFields = Object.keys(FIGHTER).filter((key) => key !== "id");
  const keys = Object.keys(fighter);

  // Must contain at least one valid field
  const validUpdateFields = keys.filter((key) => allowedFields.includes(key));
  if (validUpdateFields.length === 0) {
    return res.status(400).json({
      error: true,
      message: "At least one valid field must be provided to update",
    });
  }

  // Extra fields
  const extraFields = keys.filter((key) => !allowedFields.includes(key));
  if (extraFields.length > 0) {
    return res.status(400).json({
      error: true,
      message: `Extra fields are not allowed: ${extraFields.join(", ")}`,
    });
  }

  // Format checks (only check if field exists)
  if ("power" in fighter && !isPower(fighter.power)) {
    return res.status(400).json({
      error: true,
      message: "Power must be a number between 1 and 100",
    });
  }

  if ("defense" in fighter && !isDefense(fighter.defense)) {
    return res.status(400).json({
      error: true,
      message: "Defense must be a number between 1 and 10",
    });
  }

  if ("health" in fighter && !isHealth(fighter.health)) {
    return res.status(400).json({
      error: true,
      message: "Health must be a number between 80 and 120",
    });
  }

  if ("name" in fighter) {
    const existingFighter = fighterService.search({ name: fighter.name.toLowerCase() });
    if (existingFighter && existingFighter.id !== req.params.id) {
      return res.status(400).json({
        error: true,
        message: "Fighter with this name already exists",
      });
    }
  }
  next();
};


export { createFighterValid, updateFighterValid };
