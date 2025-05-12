import { MESSAGES } from "../constants/response.messages.js";
import { CustomError } from "../CustomError.js";
import { checkEveryParamExistence } from "../helpers/middlewares.helper.js";

const createFightValid = (req, res, next) => {
  const { fighter1, fighter2 } = req.body;
  if (checkEveryParamExistence(fighter1, fighter2)) {
    return next();
  }
  const paramsEroor = new CustomError(
    MESSAGES.FIGHT_MESSAGES.ERROR_FIGHT_CREATE_PARAMS,
    400
  );
  return next(paramsEroor);
};

const updateFightValid = (req, res, next) => {
  const { fighter1Shot, fighter2Shot, fighter1Health, fighter2Health } =
    req.body;
  const id = req.params.id;
  if (
    checkEveryParamExistence(
      fighter1Shot,
      fighter2Shot,
      fighter1Health,
      fighter2Health,
      id
    )
  ) {
    return next();
  }
  const requestedDataError = new CustomError(
    MESSAGES.FIGHT_MESSAGES.ERROR_FIGHT_UPDATE_PARAMS,
    400
  );
  return next(requestedDataError);
};

export { createFightValid, updateFightValid };