import express from "express";

import { registerUserValidator } from "./users.validation";
import * as controllers from "./users.controllers";
import verifyToken from "../../middleware/auth";

const router = express.Router();

router.get("/me", verifyToken, controllers.getUserDetails)
router.post("/register", registerUserValidator, controllers.registerUser);

export default router;
