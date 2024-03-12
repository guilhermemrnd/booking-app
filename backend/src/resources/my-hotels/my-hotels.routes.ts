import express from "express";
import multer from "multer";

import verifyToken from "../../middleware/auth";
import { createHotelValidator } from "./my-hotels.validation";
import * as controllers from "./my-hotels.controllers";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  createHotelValidator,
  upload.array("imageFiles", 6),
  controllers.createHotel
);

export default router;
