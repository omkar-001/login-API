import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  testusers,
  getUserController,
} from "../controllers/getuserController.js";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";

const router = Router();

router.get("/justforme", testusers);
router.get("/users", auth, getUserController);
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
