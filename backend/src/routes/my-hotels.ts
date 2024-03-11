import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";

import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("descrition").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .withMessage("Price per night is required")
      .isNumeric()
      .withMessage("Price per night must be a number"),
    body("facilities")
      .notEmpty()
      .withMessage("Facilities are required")
      .isArray()
      .withMessage("Facilities must be an array"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const hotelData: HotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const base64 = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      hotelData.imageUrls = imageUrls;
      hotelData.lastUpdated = new Date();
      hotelData.userId = req.userId;

      const hotel = new Hotel(hotelData);
      hotel.save();

      res.status(201).send(hotel);
    } catch (err) {
      console.error("Error creating hotel: ", err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
