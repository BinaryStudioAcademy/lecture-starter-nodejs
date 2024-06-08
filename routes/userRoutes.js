import { Router } from "express";
import { userService } from "../services/userService.js";
import { createUserValid } from "../middlewares/user.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.post("/", createUserValid, async (req, res, next) => {
  try {
    const unidentifiedUserResponse = userService.createUser(req.body);
    res.body = unidentifiedUserResponse;
    return next(req.body);
  } catch (error) {
    return next(error);
  }
});

export { router };
