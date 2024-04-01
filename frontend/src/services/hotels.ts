import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
} from "../../../backend/src/shared/types";
import { BookingForm } from "../forms/BookingForm/BookingForm";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  facilities?: string[];
  types?: string[];
  starts?: string[];
  maxPrice?: string;
  sortOption?: string;
  page?: string;
};

const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  Object.keys(searchParams).forEach((key) => {
    if (Array.isArray(searchParams[key])) {
      return searchParams[key].forEach((value: string) => queryParams.append(key, value));
    }
    queryParams.append(key, searchParams[key] || "");
  });

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

  if (!response.ok) {
    throw new Error("Error searching hotels");
  }

  return await response.json();
};

const getHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching hotel by ID");
  }

  return await response.json();
};

const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string,
): Promise<PaymentIntentResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ numberOfNights }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error creating payment intent");
  }

  return await response.json();
};

const createRoomBooking = async (formData: BookingForm) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Error booking the room");
  }
};

const hotelsService = {
  searchHotels,
  getHotelById,
  createPaymentIntent,
  createRoomBooking,
};

export default hotelsService;
