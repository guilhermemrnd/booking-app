import express from "express";

import { registerUserValidator } from "./users.validation";
import * as controllers from "./users.controllers";

const router = express.Router();

router.post("/register", registerUserValidator, controllers.registerUser);

export default router;
