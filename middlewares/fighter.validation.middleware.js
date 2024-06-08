import { FIGHTER } from "../models/fighter.js";
import { CustomError } from "../types/CustomError.js";
import { checkEveryParamExistence } from "./middlewares.helper.js";
/*
When creating a fighter — all fields are required, except for id and health
When updating a user or a fighter — at least one field from the model must be present
*/
const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { name, power, defense } = req.body;
  if (checkEveryParamExistence(name, power, defense)) {
    return next();
  }
  const paramsEroor = new CustomError(
    "Missing body parameters. Required: name, power, defense",
    400
  );
  return next(paramsEroor);
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const { name, health, power, defense } = req.body;
  if (checkAtLeastOneParamExist(name, health, power, defense)) {
    next();
  }
  const requestedDataError = new CustomError(
    "Requested data is not found",
    404
  );
  return next(requestedDataError);
};

export { createFighterValid, updateFighterValid };
