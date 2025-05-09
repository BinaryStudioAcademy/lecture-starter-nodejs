import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const fighter = new FIGHTER(req.body);
  if (!fighter.isValid()) {
    return res.status(400).send({ error: "Invalid fighter" });
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  req.fighter = req.db.getFighterById(req.params.id);
  next();
};

export { createFighterValid, updateFighterValid };
