import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import handleError from "./middlewares/handleError.js";

import { authRouter } from "./modules/auth/auth.routes.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { bookingRouter } from "./modules/booking/booking.routes.js";
import { paymentRouter } from "./modules/payment/payment.routes.js";
import { reviewRouter } from "./modules/review/review.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { serviceRouter } from "./modules/services/service.routes.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => res.send("ServiceHub API Running"));

app.use(handleError);

export default app;
