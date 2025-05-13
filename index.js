import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";
import { router as fighterRouter } from './routes/fighterRoutes.js';

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/fighters', fighterRouter);

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3050;
app.listen(port, () => {});

export { app };
