import { Request, Response } from "express";
import cloudinary from "cloudinary";

import Hotel from "../../models/hotel";
import { HotelType } from "../../shared/types";

export const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const hotelData: HotelType = req.body;

    const imageUrls = await uploadImages(imageFiles);
    hotelData.imageUrls = imageUrls;
    hotelData.lastUpdated = new Date();
    hotelData.userId = req.userId;

    const hotel = new Hotel(hotelData);
    await hotel.save();

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

export const getHotelById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
    res.json(hotel);
  } catch (err) {
    console.error("Error fetching hotel by id: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files as Express.Multer.File[];
    const updatedImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    console.error("Error updating hotel: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const base64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  return imageUrls;
};
