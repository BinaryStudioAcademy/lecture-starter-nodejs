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
  },
  GENERIC_ERROR_MESSAGE: "Unexpected error. Please, contact or try again",
  GENERIC_EMPTY_REQUEST_ERROR: "Requested data is not found",
};
