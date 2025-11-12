import { Router } from "express";

import { bookService, changeStatus } from "./booking.controller.js";
import userMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/roleCheck.js";

const router = Router();

router.post("/", userMiddleware, bookService);
router.patch("/:id/status", userMiddleware, checkRole("ADMIN"), changeStatus);

export { router as bookingRouter };
