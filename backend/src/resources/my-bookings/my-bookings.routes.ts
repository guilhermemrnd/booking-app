import express from "express";

import verifyToken from "../../middleware/auth";
import * as controllers from "./my-bookings.controllers";

const router = express.Router();

router.get("/", verifyToken, controllers.getMyBookings);

export default router;
