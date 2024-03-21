import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiMoney, BiHotel, BiStar } from "react-icons/bi";

import myHotelsService from "../services/my-hotels";

export default function MyHotels() {
  const { data: hotelData } = useQuery("fetchMyHotels", myHotelsService.fetchMyHotels, {
    onError: () => {},
  });

  if (!hotelData) {
    return <span>No hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
          to={"/add-hotel"}
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="flex flex-col justify-between gap-5 rounded-lg border border-slate-300 p-8">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiHotel className="mr-3" />
                <span className="leading-5">
                  {hotel.adultCount} adults, <br /> {hotel.childCount} children
                </span>
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
                to={`/edit-hotel/${hotel._id}`}
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
