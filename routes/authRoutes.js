import { Router } from "express";
import { authService } from "../services/authService.js";
import { authCredentialsValidate } from "../middlewares/auth.validation.middleware.js";

const router = Router();

router.post("/login", authCredentialsValidate, (req, res, next) => {
  let userLogged;
  try {
    // TODO: Implement login action (get the user if it exist with entered credentials)
    const { email, password } = req.body;
    userLogged = authService.login({ email, password });
    res.body = userLogged;
    next(res);
  } catch (error) {
    throw error;
  }
});

export { router };
