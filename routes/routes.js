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
import { updateUser } from "../controllers/updateUserController.js";

const router = Router();

router.get("/", getHomeController);
router.get("/justforme", testusers);

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

router.get("/users", auth, getUserController);
router.get("/users/sorted", auth, getUserSortedController);
router.delete("/users", auth, deleteUser);

router.put("/users", auth, updateUser);

export default router;
