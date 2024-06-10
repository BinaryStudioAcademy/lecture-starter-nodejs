import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  try {
    const { health, power, defense } = FIGHTER;
    const fighter = { health, power, defense, ...req.body };

    switch (true) {
      case !validateHealth(fighter.health):
        throw new Error("Health should be between 80 and 100");
        break;
      case !validatePower(fighter.power):
        throw new Error("Power should be between 1 and 100");
        break;
      case !validateDefense(fighter.defense):
        throw new Error("Defense should be between 1 and 10");
        break;
      default:
        req.body = fighter;
        break;
    }
  } catch (error) {
    res.isError422 = true;
    res.message = error.message;
  } finally {
    next();
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  try {
    const fighter = req.body;

    Object.keys(fighter).forEach((prop) => {
      if (!FIGHTER.hasOwnProperty(prop)) {
        throw new Error(`Property ${prop} is not allowed to update`);
      } else if (prop === "id") {
        throw new Error("You can't change fighter ID");
      } else if (prop === "health") {
        if (!validateHealth(fighter.health)) {
          throw new Error("New health is not valid");
        }
      } else if (prop === "power") {
        if (!validatePower(fighter.power)) {
          throw new Error("New power is not valid");
        }
      } else if (prop === "defense") {
        if (!validateDefense(fighter.defense)) {
          throw new Error("New defense is not valid");
        }
      }
    });
  } catch (error) {
    res.isError422 = true;
    res.message = error.message;
  } finally {
    next();
  }
};

const validateHealth = (health) => {
  return health >= 80 && health <= 100;
};

const validatePower = (power) => {
  return power >= 1 && power <= 100;
};

const validateDefense = (defense) => {
  return defense >= 1 && defense <= 10;
};

export { createFighterValid, updateFighterValid };
