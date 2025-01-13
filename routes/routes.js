import { Router } from "express";
import auth from "../middleware/auth.js";
import { checkUserRole } from "../middleware/checkuser.js";
import { checkPermission } from "../middleware/checkPermission.js";

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
import { createUserController } from "../controllers/createUserController.js";

const router = Router();

router.get("/", getHomeController);
router.get("/justforme", testusers);

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

router.get("/users", auth, checkPermission("users", "view"), getUserController);
router.get(
  "/users/sorted",
  auth,
  checkPermission("users", "view"),
  getUserSortedController
);

router.delete("/users", auth, checkPermission("users", "delete"), deleteUser);

router.put("/users", auth, checkPermission("users", "update"), updateUser);

router.post(
  "/users",
  auth,
  checkPermission("users", "create"),
  createUserController
);

export default router;
