import { HotelType } from "../../../backend/src/shared/types";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings/`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetching bookings");
  }

  return response.json();
};

const bookingsService = {
  fetchMyBookings,
};

export default bookingsService;
