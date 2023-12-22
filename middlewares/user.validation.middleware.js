import { USER } from '../models/user.js';
import { regex } from '../constants/regex.js';
import { errorMessages } from '../constants/errorMessages.js';
import { userService } from '../services/userService.js';

const userKeys = Object.keys(USER);
const indexOfId = userKeys.indexOf('id');
const userSchema = [...userKeys];
userSchema.splice(indexOfId, 1);

// **********************************************

// New user validation
const createUserValid = (req, res, next) => {
  //
  const bodyKeys = Object.keys(req.body);

  // Body is empty
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  // Some required fields are missing, or extra fields have been detected
  const matches = bodyKeys.every((bodyKey) =>
    userSchema.find((userKey) => userKey === bodyKey)
  );

  if (!matches) {
    res.error = errorMessages.invalidData;
    next();
  }

  const { email, phoneNumber, password } = req.body;

  // Invalid email
  if (!regex.email.test(email)) {
    res.error = errorMessages.invalidEmail;
    next();
  }

  // Invalid phone number
  if (!regex.phoneNumber.test(phoneNumber)) {
    res.error = errorMessages.invalidPhone;
    next();
  }

  // Email or phone number already exists
  const doesEmailExist = userService.search({ email });
  const doesPhoneExist = userService.search({ phoneNumber });

  if (doesEmailExist || doesPhoneExist) {
    res.error = errorMessages.userExists;
    next();
  }

  if (typeof password !== 'string' || password.length < 3) {
    res.error = errorMessages.invalidPass;
    next();
  }

  next();
};

// Update user validation
const updateUserValid = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);

  // Body is empty
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  // Not any field matches user schema
  const matches = bodyKeys.some((bodyKey) =>
    userSchema.find((userKey) => userKey === bodyKey)
  );

  if (!matches) {
    res.error = errorMessages.invalidData;
    next();
  }

  const { email, phoneNumber } = req.body;

  // Invalid email
  if (email && !regex.email.test(email)) {
    res.error = errorMessages.invalidEmail;
    next();
  }

  // Invalid phone number
  if (phoneNumber && !regex.phoneNumber.test(phoneNumber)) {
    res.error = errorMessages.invalidPhone;
    next();
  }

  next();
};

export { createUserValid, updateUserValid };
