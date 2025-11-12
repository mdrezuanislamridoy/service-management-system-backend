import { Router } from "express";
import { registerUser, loginUser, profile, logout } from "./auth.controller.js";
import userMiddleware from "../../middlewares/auth.js";
import { refreshAccessToken } from "./auth.service.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", userMiddleware, profile);
router.post("/logout", userMiddleware, logout);
router.patch("/refresh-token", userMiddleware, refreshAccessToken);

export { router as authRouter };
