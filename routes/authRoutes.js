import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const data = authService.login(req.body);
      if (!data) {
        throw new Error({
          code: 401,
          status: "Unauthorized",
          message: "Incorrect email/phone or password",
        });
      }

      res.data = data;
      res.status(200);
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
export { router };
