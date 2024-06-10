import { FIGHTER } from "../models/fighter.js";

const hasExtraFields = (fields, validFields) => {
  return Object.keys(fields).some((field) => !validFields.includes(field));
};

const isValidPower = power => {
  return typeof power === "number" && power >= 1 && power <= 100;
};

const isValidDefense = defense => {
  return typeof defense === "number" && defense >= 1 && defense <= 10;
};

const isValidHealth = health => {
  return typeof health === "number" && health >= 80 && health <= 120;
};

const createFighterValid = async (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const { id, name, power, defense, health } = req.body;

  if (hasExtraFields(req.body, Object.keys(FIGHTER))) {
    return res.status(400).json({ error: "Extra fields are not allowed" });
  }

  const requiredFields = ["name", "power", "defense"];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  if (id) {
    return res.status(400).json({ error: "ID is not allowed" });
  }

  if (!isValidPower(power)) {
    return res.status(400).json({ error: "Power should be a number between 1 and 100" });
  }

  if (!isValidDefense(defense)) {
    return res.status(400).json({ error: "Defense should be a number between 1 and 10" });
  }

  if (health && !isValidHealth(health)) {
    return res.status(400).json({ error: "Health should be a number between 80 and 120" });
  }

  try {
    const existingFighter = await fighterService.search({ name });
    if (existingFighter && existingFighter.name.toLowerCase() === name.toLowerCase()) {
      return res.status(400).json({ error: "Fighter with this name already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  next();
};

const updateFighterValid = async (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  if (hasExtraFields(req.body, Object.keys(FIGHTER))) {
    return res.status(400).json({ error: "Extra fields are not allowed" });
  }

  if (id) {
    return res.status(400).json({ error: "ID is not allowed" });
  }

  const isAnyFieldPresent = name || power || defense || health;
  if (!isAnyFieldPresent) {
    return res.status(400).json({ error: "At least one field should be present" });
  }

  if (power && !isValidPower(power)) {
    return res.status(400).json({ error: "Power should be a number between 1 and 100" });
  }

  if (defense && !isValidDefense(defense)) {
    return res.status(400).json({ error: "Defense should be a number between 1 and 10" });
  }

  if (health && !isValidHealth(health)) {
    return res.status(400).json({ error: "Health should be a number between 80 and 120" });
  }

  if (name) {
    try {
      const existingFighter = await fighterService.search({ name });
      if (existingFighter && existingFighter.id !== req.params.id && existingFighter.name.toLowerCase() === name.toLowerCase()) {
        return res.status(400).json({ error: "Fighter with this name already exists" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  next();
};

export { createFighterValid, updateFighterValid };
