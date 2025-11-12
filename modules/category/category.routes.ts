import { Router } from "express";

import { createCategory, listCategories } from "./category.controller.js";
import userMiddleware from "../../middlewares/auth.js";
import checkRole from "../../middlewares/roleCheck.js";

const router = Router();

router.post("/", userMiddleware, checkRole("ADMIN"), createCategory);
router.get("/", listCategories);

export { router as categoryRouter };
