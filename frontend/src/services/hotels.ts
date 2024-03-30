import { HotelSearchResponse } from "../../../backend/src/shared/types";

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
      return searchParams[key].forEach((value: string) => (
        queryParams.append(key, value)
      ))
    }
    queryParams.append(key, searchParams[key] || "");
  });

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

  if (!response.ok) {
    throw new Error("Error searching hotels");
  }

  return await response.json();
};

const hotelsService = { searchHotels };
export default hotelsService;
