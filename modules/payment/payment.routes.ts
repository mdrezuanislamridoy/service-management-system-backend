import { Router } from "express";
import userMiddleware from "../../middlewares/user.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";
import {
  payBillWithCash,
  payBillWithSSLCommerz,
  payBillWithStripe,
} from "./payment.controller.js";

const router = Router();

router.post(
  "/create-payment-sslcommerz",
  userMiddleware,
  checkRole("USER"),
  payBillWithSSLCommerz
);

router.post(
  "/create-payment-cash",
  userMiddleware,
  checkRole("USER"),
  payBillWithCash
);

router.post(
  "/create-payment-stripe",
  userMiddleware,
  checkRole("USER"),
  payBillWithStripe
);

export const paymentRouter = router;
