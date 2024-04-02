import { Request, Response } from "express";
import Hotel from "../../models/hotel";

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const result = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.send(result);
  } catch (err) {
    console.error("Error fetching my-bookings: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
