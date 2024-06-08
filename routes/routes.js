import { router as userRoutes } from "./userRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as fighterRoutes } from "./fighterRoutes.js";
import { router as fightRoutes } from "./fightRoutes.js";
import { loggerMiddleware } from "../middlewares/logger.middleware.js";

const initRoutes = (app) => {
  app.use(loggerMiddleware);
  app.use("/api/users", userRoutes);
  app.use("/api/fighters", fighterRoutes);
  app.use("/api/fights", fightRoutes);
  app.use("/api/auth", authRoutes);
};

export { initRoutes };
