import { Router } from "express";

import { dashboard, approve, reject } from "./admin.controller.js";
import userMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/roleCheck.js";

const router = Router();

router.get("/dashboard", userMiddleware,checkRole("ADMIN"), dashboard);
router.patch(
  "/providers/approve/:id",
  userMiddleware,
  checkRole("ADMIN"),
  approve
);
router.patch(
  "/providers/reject/:id",
  userMiddleware,
  checkRole("ADMIN"),
  reject
);

export { router as adminRouter };
