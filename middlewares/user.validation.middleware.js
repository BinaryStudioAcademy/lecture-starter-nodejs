import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  try {
    const { email, phoneNumber, password } = USER;
    const user = { email, phoneNumber, password, ...req.body };

    switch (true) {
      case !validateEmail(user.email):
        throw new Error("Email is not valid");
        break;
      case !validatePhoneNumber(user.phoneNumber):
        throw new Error("Phone number is not valid");
        break;
      case !validatePassword(user.password):
        throw new Error("Password is not valid");
        break;
      default:
        next();
    }
  } catch (error) {
    res.isError422 = true;
    res.message = error.message;
    next();
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    const user = req.body;

    Object.keys(user).forEach((prop) => {
      if (!USER.hasOwnProperty(prop)) {
        throw new Error(`Property ${prop} is not allowed to update`);
      } else if (prop === "id") {
        throw new Error("You can't change user ID");
      } else if (prop === "email") {
        if (!validateEmail(user.email)) {
          throw new Error("New email is not valid");
        }
      } else if (prop === "phoneNumber") {
        if (!validatePhoneNumber(user.phoneNumber)) {
          throw new Error("New phone number is not valid");
        }
      } else if (prop === "password") {
        if (!validatePassword(user.password)) {
          throw new Error("New password is not valid");
        }
      }
    });
  } catch (error) {
    res.isError422 = true;
    res.message = error.message;
  } finally {
    next();
  }
};

const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regexEmail.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const regexPhoneNumber = /^\+380[0-9]{9}$/;
  return regexPhoneNumber.test(phoneNumber);
};

const validatePassword = (password) => {
  const symbols = password.match(/[.*$\-?_=]/g);
  return symbols && symbols.length >= 3;
};

export { createUserValid, updateUserValid };
