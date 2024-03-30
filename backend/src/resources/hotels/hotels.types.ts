export type SearchHotelsQuery = {
  destination: string;
  adultCount: string;
  childCount: string;
  facilities: string | string[];
  types: string | string[];
  stars: string | string[];
  maxPrice: string;
}