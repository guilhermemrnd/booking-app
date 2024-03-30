import express from "express";

import * as controllers from "./hotels.controllers";
import { getHotelByIdValidator } from "./hotels.validation";

const router = express.Router();

router.get("/search", controllers.searchHotels);
router.get("/:id", getHotelByIdValidator, controllers.getHotelById);

export default router;
