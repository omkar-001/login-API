import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  testusers,
  getUserController,
  getUserSortedController,
  getHomeController,
} from "../controllers/getuserController.js";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/authController.js";
import {
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/forgotPasswordController.js";
import { deleteUser } from "../controllers/deleteuserController.js";

const router = Router();

router.get("/", getHomeController);
router.get("/justforme", testusers);
router.get("/users", auth, getUserController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users/sorted", auth, getUserSortedController);
router.post("/forgotpassword", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.delete("/users", auth, deleteUser);

export default router;
