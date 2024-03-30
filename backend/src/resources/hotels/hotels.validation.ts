import { param } from "express-validator";

export const getHotelByIdValidator = [
  param("id").notEmpty().withMessage("Hotel ID is required"),
];
