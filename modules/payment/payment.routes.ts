import { Router } from "express";

import { sslcommerz, cash } from "./payment.controller.js";
import userMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/sslcommerz/:bookingId", userMiddleware, sslcommerz);
router.post("/cash/:bookingId", userMiddleware, cash);

export { router as paymentRouter };
