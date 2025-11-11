import { Router } from "express";
import {
  createService,
  getAllServices,
  getMyServices,
} from "./service.controller.js";
import userMiddleware from "../../middlewares/user.middleware.js";
import checkRole from "../../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/create-service",
  userMiddleware,
  checkRole("PROVIDER"),
  createService
);
router.get(
  "/get-my-services",
  userMiddleware,
  checkRole("PROVIDER"),
  getMyServices
);
router.get("/get-all-services", userMiddleware, getAllServices);

export const serviceRouter = router;
