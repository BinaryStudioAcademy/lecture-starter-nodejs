import { USER } from "../models/user.js";
import { CustomError } from "../types/CustomError.js";
import {
  checkAtLeastOneParamExist,
  checkEveryParamExistence,
} from "./middlewares.helper.js";
/* 
When creating a user — all fields are required, except for id
When creating a fighter — all fields are required, except for id and health
When updating a user or a fighter — at least one field from the model must be present
 */

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (
    checkEveryParamExistence(firstName, lastName, email, phoneNumber, password)
  ) {
    return next();
  }
  const paramsEroor = new CustomError(
    "Missing body parameters. Required: firstName, lastName, email, phoneNumber, password",
    400
  );
  return next(paramsEroor);
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (
    checkAtLeastOneParamExist(firstName, lastName, email, phoneNumber, password)
  ) {
    return next();
  }
  const requestedDataError = new CustomError(
    "Requested data is not found",
    404
  );
  return next(requestedDataError);
};

export { createUserValid, updateUserValid };
