import { Request, Response } from "express";

import { HotelType } from "../../models/hotel";
import * as services from "./my-hotels.services";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const hotelData: HotelType = req.body;

    const hotel = await services.createHotel(hotelData, imageFiles, req.userId);
    res.status(201).send(hotel);
  } catch (err) {
    console.error("Error creating hotel: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
