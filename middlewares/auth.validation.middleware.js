import { MESSAGES } from "../constants/response.messages.js";
import { CustomError } from "../types/CustomError.js";
import { checkEveryParamExistence } from "./middlewares.helper.js";

export const authCredentialsValidate = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { email, password } = req.body;
  if (checkEveryParamExistence(email, password)) {
    return next();
  }
  const paramsEroor = new CustomError(
    MESSAGES.USER_MESSAGES.ERROR_AUTH_VALIDATION_MIDDLEWARE,
    400
  );
  return next(paramsEroor);
};
