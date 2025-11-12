import { Router } from "express";
import userMiddleware from "../../middlewares/user.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";
import { addCategory } from "./category.controller.js";

const router = Router();

router.post(
  "/create-category",
  userMiddleware,
  checkRole("ADMIN"),
  addCategory
);

router.get(
  "/get-all-categories",
  userMiddleware,
  checkRole("ADMIN"),
  addCategory
);

export const categoryRouter = router;
