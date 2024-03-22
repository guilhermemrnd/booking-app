import { HotelType } from "../../../backend/src/shared/types";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function saveMyHotel(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add the hotel");
  }

  return await response.json();
}

async function fetchMyHotels(): Promise<HotelType[]> {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return await response.json();
}

async function fetchMyHotelById(hotelId: string): Promise<HotelType> {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }

  return await response.json();
}

async function updateMyHotelById(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${formData.get("hotelId")}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during hotel update");
  }

  return await response.json();
}

const myHotelsService = { saveMyHotel, fetchMyHotels, fetchMyHotelById, updateMyHotelById };
export default myHotelsService;
