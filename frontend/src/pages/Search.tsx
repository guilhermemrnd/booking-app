import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useSearchContext } from "../contexts/SearchContext";
import hotelsService from "../services/hotels";

import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

export default function Search() {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>();
  const [sortOption, setSortOption] = useState<string>();

  const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked ? [...prev, starRating] : prev.filter((star) => star !== starRating),
    );
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;
    setSelectedTypes((prev) =>
      event.target.checked ? [...prev, hotelType] : prev.filter((type) => type !== hotelType),
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility),
    );
  };

  useEffect(
    () => setPage(1),
    [selectedStars, selectedTypes, selectedFacilities, selectedPrice, sortOption],
  );

  useEffect(() => window.scroll({ top: 0, behavior: "smooth" }), [page]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
    page: page.toString(),
  };

  const { data: hotelsData } = useQuery(["searchHotels", searchParams], () =>
    hotelsService.searchHotels(searchParams),
  );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[250px_1fr]">
      <div className="top-10 h-fit rounded-lg border border-slate-300 p-5 md:sticky">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">Filter by:</h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange} />
          <HotelTypesFilter selectedTypes={selectedTypes} onChange={handleTypeChange} />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {hotelsData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            className="rounded-md border p-1 text-sm"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          </select>
        </div>
        {hotelsData?.data.map((hotel) => <HotelCard hotel={hotel} />)}

        {!!hotelsData?.data.length && (
          <div>
            <Pagination
              page={hotelsData?.pagination.page || 1}
              pages={hotelsData?.pagination.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
