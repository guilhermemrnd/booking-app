import { body } from "express-validator";

export const createHotelValidator = [
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
];
