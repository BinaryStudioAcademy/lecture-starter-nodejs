import { MESSAGES } from "../constants/response.messages.js";
import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";
import { authService } from "../services/authService.js";
import { CustomError } from "../CustomError.js";

const createUserValid = async (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const { email, phoneNumber } = req.body;

  try {
    const userEmail = await userService.search({ email });
    const userPhone = await userService.search({ phoneNumber });

    if (userEmail || userPhone) {
      throw new Error("User with this email or phone number already exists.");
    }

    const requiredFields = Object.keys(USER).filter((key) => key !== "id");
    const providedFields = Object.keys(req.body);

    if (providedFields.length !== requiredFields.length) {
      throw new Error("Invalid number of fields.");
    }

    for (const field of providedFields) {
      if (!requiredFields.includes(field)) {
        throw new Error(`Unexpected field: ${field}`);
      }
      if (!req.body[field]) {
        throw new Error(`Empty field: ${field}`);
      }
    }

    isValid(req.body);

    res.data = { ...req.body };
    next();
  } catch (err) {
    res.err = err;
    next();
  }
};

const updateUserValid = async (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { id } = req.params;

  try {
    const existingUser = await userService.search({ id });

    if (!existingUser) {
      res.status(404);
      throw new Error("User does not exist.");
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No fields to update.");
    }

    const updateFields = Object.keys(req.body);
    const allowedFields = Object.keys(USER).filter((key) => key !== "id");

    for (const field of updateFields) {
      if (!allowedFields.includes(field)) {
        throw new Error(`Unexpected field: ${field}`);
      }
      if (!req.body[field]) {
        throw new Error(`Empty field: ${field}`);
      }
    }

    if (req.body.email) {
      const existingEmailUser = await userService.search({ email: req.body.email });
      if (existingEmailUser && existingEmailUser.id !== id) {
        throw new Error("Email already in use.");
      }
    }

    if (req.body.phoneNumber) {
      const existingPhoneUser = await userService.search({ phoneNumber: req.body.phoneNumber });
      if (existingPhoneUser && existingPhoneUser.id !== id) {
        throw new Error("Phone number already in use.");
      }
    }

    isValid(req.body);

    res.data = { ...req.body };
    next();
  } catch (err) {
    res.err = err;
    next();
  }
};

const isValid = (body) => {
  if (body.email) validateEmail(body.email);
  if (body.phoneNumber) validatePhone(body.phoneNumber);
  if (body.firstName) validateName(body.firstName);
  if (body.lastName) validateName(body.lastName);
  if (body.password) validatePassword(body.password);
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid email.");
  }
};

const validatePassword = (password) => {
  if (password.length < 3) {
    throw new Error("Password must be at least 3 characters.");
  }
};

const validatePhone = (phone) => {
  if (!phone.match(/^\+380\d{9}$/)) {
    throw new Error("Invalid phone number. Format: +380XXXXXXXXX");
  }
};

const validateName = (name) => {
  if (!name.match(/^[a-zA-Z]+$/)) {
    throw new Error("Invalid name. Only letters allowed.");
  }
};

export { createUserValid, updateUserValid };
