export const MESSAGES = {
  USER_MESSAGES: {
    ERROR_PASSWORD_LENGHT: "User password must be at least 3 characters long",
    ERROR_EMAIL_FORMAT: "Only @gmail email is allowed",
    ERROR_EMAIL_UNIQUE: "User email is in use",
    ERROR_PHONE_FORMAT: "Only +380xxxxxxxxx phoneNumber format is allowed",
    ERROR_PHONE_UNIQUE: "User phone is in use",
    UNEXPECTED_ERROR_CREATING:
      "Unexpected error creating user. Please, contact or try again",
    ERROR_USER_CREDENTIAL_LOGIN: "Wrong user credentials",
    ERROR_USER_VALIDATION_MIDDLEWARE:
      "Missing body parameters. Required: firstName, lastName, email, phoneNumber, password",
    ERROR_AUTH_VALIDATION_MIDDLEWARE:
      "Missing body parameters. Required: email, password",
    ERROR_USER_NOT_FOUND: "User id not found. No action performed.",
    ERROR_USER_UPDATE_EMPTY_PARAMS:
      "Required: firstName or lastName or email or phoneNumber or password.",
  },
  FIGHTER_MESSAGES: {
    ERROR_NAME_UNIQUE: "Fighter name is already in use.",
    UNEXPECTED_FIGHTER_CREATING:
      "Unexpected error creating fighter. Please, contact or try again",
    ERROR_FIGHTER_NOT_FOUND: "Fighter id not found. No action performed.",
    ERROR_FIGHTER_CREATE_PARAMS:
      "Missing body parameters. Required: name, power, defense",
    ERROR_FIGHTER_UPDATE_EMPTY_PARAMS:
      "Required: name or power or defense or health.",
    ERROR_DEFENSE_RANGE_VALUE: "Fighter defense value must be between 1 to 10.",
    ERROR_POWER_RANGE_VALUE: "Fighter power value must be between 1 to 100.",
    ERROR_HEALTH_RANGE_VALUE: "Fighter health value must be between 80 to 120.",
  },
  FIGHT_MESSAGES: {
    ERROR_FIGHT_UPDATE_PARAMS:
      "Required: id url param and body params fighter1Shot, fighter2Shot, fighter1Health and fighter2Health",
    ERROR_FIGHT_CREATE_PARAMS: "Required: fighter1 and fighter2.",
    ERROR_FIGHTER_NOT_FOUND: "Fighter id not found.",
    ERROR_FIGHT_NOT_FOUND: "Fight id not found.",
  },
  GENERIC_ERROR_MESSAGE: "Unexpected error. Please, contact or try again",
  GENERIC_EMPTY_REQUEST_ERROR: "Requested data is not found.",
  ERROR_SECURITY_TOKEN_OR_ID_MISSING: "Token or User id missing",
  ERROR_SECURITY_TOKEN_BAD_CREDENTIAL: "Invalid token",
  ERROR_NUMBER_TYPE_DATA_CAST: "Data type error. Can't cast to number:",
};