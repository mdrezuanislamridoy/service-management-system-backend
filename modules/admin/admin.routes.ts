import { Router } from "express";
import {
  approveServiceProvider,
  rejectServiceProvider,
} from "./admin.controller.js";
import userMiddleware from "../../middlewares/user.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";

const router = Router();

router.patch(
  "/approve-provider/:id",
  userMiddleware,
  checkRole("ADMIN"),
  approveServiceProvider
);
router.patch(
  "/reject-provider/:id",
  userMiddleware,
  checkRole("ADMIN"),
  rejectServiceProvider
);

router.get(
  "/get-all-data",
  userMiddleware,
  checkRole("ADMIN"),
  rejectServiceProvider
);

export const adminRouter = router;
