import { USER } from '../models/user.js';
import { regex } from '../constants/regex.js';
import { errorMessages } from '../constants/errorMessages.js';

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
    const message = errorMessages.emptyBody;
    res.status(400).send({ message });
    next();
  }

  // Some required fields are missing, or extra fields have been detected
  const matches = bodyKeys.every((bodyKey) =>
    userSchema.find((userKey) => userKey === bodyKey)
  );

  if (!matches) {
    const message = errorMessages.invalidData;
    return res.status(400).json({ message });
  }

  const { email, phoneNumber, password } = req.body;

  // Invalid email
  if (!regex.email.test(email)) {
    const message = errorMessages.invalidEmail;
    return res.status(400).json({ message });
  }

  // Invalid phone number
  if (!regex.phoneNumber.test(phoneNumber)) {
    const message = errorMessages.invalidPhone;
    return res.status(400).json({ message });
  }

  if (typeof password !== 'string' || password.length < 3) {
    const message = errorMessages.invalidPass;
    return res.status(400).json({ message });
  }

  next();
};

// Update user validation
const updateUserValid = (req, res, next) => {
  const bodyKeys = Object.keys(req.body);

  // Body is empty
  if (!bodyKeys.length) {
    const message = errorMessages.emptyBody;
    res.status(400).send({ message });
    next();
  }

  // Not any field matches user schema
  const matches = bodyKeys.some((bodyKey) =>
    userSchema.find((userKey) => userKey === bodyKey)
  );

  if (!matches) {
    const message = errorMessages.invalidData;
    return res.status(400).json({ message });
  }

  const { email, phoneNumber } = req.body;

  // Invalid email
  if (email && !regex.email.test(email)) {
    const message = errorMessages.invalidEmail;
    return res.status(400).json({ message });
  }

  // Invalid phone number
  if (phoneNumber && !regex.phoneNumber.test(phoneNumber)) {
    const message = errorMessages.invalidPhone;
    return res.status(400).json({ message });
  }
  next();
};

export { createUserValid, updateUserValid };
