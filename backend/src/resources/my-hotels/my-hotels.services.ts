import cloudinary from "cloudinary";

import Hotel from "../../models/hotel";
import { HotelType } from "../../shared/types";

export const createHotel = async (
  hotelData: HotelType,
  imageFiles: Express.Multer.File[],
  userId: string
) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const base64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  hotelData.imageUrls = imageUrls;
  hotelData.lastUpdated = new Date();
  hotelData.userId = userId;

  const hotel = new Hotel(hotelData);
  return hotel.save();
};
