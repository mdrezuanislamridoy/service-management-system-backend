import express from "express";
import handleError from "./middlewares/handleError.js";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.routes.js";
import { serviceRouter } from "./modules/services/service.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/services", serviceRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(handleError);

export default app;
