import { Router } from "express";
import { createUserAccount, getUserProfile, loginUserAccount, logout, } from "./auth.controller.js";
import userMiddleware from "../../middlewares/user.middleware.js";
import validator from "../../middlewares/validator.js";
import { createUserSchema } from "./auth.validator.js";
const router = Router();
router.post("/create-user", validator(createUserSchema), createUserAccount);
router.post("/login-user", loginUserAccount);
router.get("/user-profile", userMiddleware, getUserProfile);
router.post("/logout", userMiddleware, logout);
export const authRouter = router;
//# sourceMappingURL=auth.routes.js.map