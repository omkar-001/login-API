import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  testusers,
  getUserController,
  getUserSortedController,
} from "../controllers/getuserController.js";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/authController.js";
import {
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/forgotPasswordController.js";

const router = Router();

router.get("/justforme", testusers);
router.get("/users", auth, getUserController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users/sorted", auth, getUserSortedController);
router.post("/forgotpassword", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

export default router;
