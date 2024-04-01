import express from "express";

import * as controllers from "./hotels.controllers";
import { getHotelByIdValidator } from "./hotels.validation";
import verifyToken from "../../middleware/auth";

const router = express.Router();

router.get("/search", controllers.searchHotels);
router.get("/:id", getHotelByIdValidator, controllers.getHotelById);
router.post("/:hotelId/bookings", verifyToken, controllers.createBooking);
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  controllers.createPaymentIntent
);

export default router;
