import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";
import { errorMessages } from '../constants/errorMessages.js';

const isValidEmail = (email) => {
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+(@gmail.com)$/i;
  return emailRegExp.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegExp = /^\+?3?8?(0\d{9})$/i;
  return phoneRegExp.test(phoneNumber);
};

const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 3;
};

const userKeys = Object.keys(USER);
const userSchema = [...userKeys];

const indexOfId = userSchema.indexOf('id');
userSchema.splice(indexOfId, 1);

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  
  const bodyKeys = Object.keys(req.body);
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  const matches = bodyKeys.every((bodyKey) =>
    userSchema.find((userKey) => userKey === bodyKey)
  );

  if (!matches) {
    res.error = errorMessages.user.invalidData;
    next();
  }

  const { email, phoneNumber, password } = req.body;

  if(req.params.id) {
    return res.status(400).json({ error: "ID is not allowed" });
  }

  if (!isValidEmail(email)) {
    res.error = errorMessages.user.invalidEmail;
    next();
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    res.error = errorMessages.user.invalidPhone;
    next();
  }

  if (!isValidPassword(password)) {
    res.error = errorMessages.user.invalidPass;
    next();
  }

  const isEmailExisted = userService.search({ email });
  const isPhoneExisted = userService.search({ phoneNumber });

  if (isEmailExisted || isPhoneExisted) {
    res.error = errorMessages.user.userExists;
    next();
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const bodyKeys = Object.keys(req.body);
  if (!bodyKeys.length) {
    res.error = errorMessages.emptyBody;
    next();
  }

  const matches = bodyKeys.every((bodyKey) =>
    userSchema.find((userKey) => userKey === bodyKey)
  );

  if (!matches) {
    res.error = errorMessages.user.invalidData;
    next();
  }

  if (id) {
    return res.status(400).json({ error: "ID is not allowed" });
  }

  const isAnyFieldPresent = email || phoneNumber || password;
  if (!isAnyFieldPresent) {
    res.error = errorMessages.user.atLeastOneField;
    next();
  }

  if (email && !isValidEmail(email)) {
    res.error = errorMessages.user.invalidEmail;
    next();
  }

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    res.error = errorMessages.user.invalidPhone;
    next();
  }

  if (password && !isValidPassword(password)) {
    res.error = errorMessages.user.invalidPass;
    next();
  }

  next();
};

export { createUserValid, updateUserValid };
