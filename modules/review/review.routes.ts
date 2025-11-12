import { Router } from "express";
import { createReview } from "./review.controller.js";
import userMiddleware from "../../middlewares/auth.js";

const router = Router();

router.post("/", userMiddleware, createReview);

export { router as reviewRouter };
