import express from "express";
import * as controllers from "./hotels.controllers";

const router = express.Router();

router.get("/search", controllers.searchHotels);

export default router;
