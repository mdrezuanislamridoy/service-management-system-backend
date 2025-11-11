import express from "express";
import handleError from "./middlewares/handleError.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./modules/auth/auth.routes.js";
import { serviceRouter } from "./modules/services/service.routes.js";
import { bookingRouter } from "./modules/booking/booking.routes.js";
import { paymentRouter } from "./modules/payment/payment.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use(handleError);

export default app;
