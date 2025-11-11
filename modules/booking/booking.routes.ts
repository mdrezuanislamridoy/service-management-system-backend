import { Router } from "express";
import { addBooking, getMyBookings } from "./booking.controller.js";
import userMiddleware from "../../middlewares/user.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/create-booking/id",
  userMiddleware,
  checkRole("USER"),
  addBooking
);
router.get(
  "/get-my-bookings",
  userMiddleware,
  checkRole("USER"),
  getMyBookings
);

export const bookingRouter = router;
