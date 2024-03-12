import express from "express";

import * as controllers from "./auth.controllers";
import verifyToken from "../../middleware/auth";
import { loginValidator } from "./auth.validation";

const router = express.Router();

router.post("/login", loginValidator, controllers.login);
router.get("/validate-token", verifyToken, controllers.validateToken);
router.post("/logout", controllers.logout);

export default router;
