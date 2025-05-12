import { MESSAGES } from "../constants/response.messages.js";
import { CustomError } from "../CustomError.js";

export function castValuesToNumber(value) {
  const castedValue = Number(value);
  if (isNaN(castedValue)) {
    throw new CustomError(
      `${MESSAGES.ERROR_NUMBER_TYPE_DATA_CAST} ${value}`,
      400
    );
  }
  return castedValue;
}