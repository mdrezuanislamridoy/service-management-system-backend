import { Router } from "express";
import multer from "multer";

import { addService, listServices, myServices } from "./service.controller.js";
import checkRole from "../../middlewares/roleCheck.js";
import userMiddleware from "../../middlewares/auth.js";

const upload = multer();
const router = Router();

router.post(
  "/",
  userMiddleware,
  checkRole("PROVIDER"),
  upload.array("images", 5),
  addService
);
router.get("/", listServices);
router.get("/my", userMiddleware, checkRole("PROVIDER"), myServices);

export { router as serviceRouter };
