/* 
If everything went well — return the 200 status code and JSON with response data
Errors
Request errors (validation, handling issues) — return the 400 status code and JSON with an error
If requested data is not found — return the 404 status code and JSON with an error
Format of JSON errors
{
    error: true,
    message: ''
}
 */

import { MESSAGES } from "../constants/response.messages.js";
import { CustomError } from "../types/CustomError.js";

function createErrorResponse(message) {
  return {
    error: true,
    message,
  };
}

const responseMiddleware = (error, req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (error instanceof CustomError) {
    return res.status(error.code).send(createErrorResponse(error.message));
  }
  if (error instanceof Error) {
    return res
      .status(500)
      .send(createErrorResponse(MESSAGES.GENERIC_ERROR_MESSAGE));
  }
  return res.status(200).send(res.body);
};

export { responseMiddleware };
