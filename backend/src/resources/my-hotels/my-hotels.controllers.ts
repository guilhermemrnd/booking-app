import { Request, Response } from "express";

import Hotel, { HotelType } from "../../models/hotel";
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

export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (err) {
    console.error("Error fetching hotels: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
