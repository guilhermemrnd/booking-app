import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

export default function HotelCard({ hotel }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 rounded-lg border border-slate-300 p-8 xl:grid-cols-[2fr_3fr]">
      <div className="h-[300px] w-full">
        <img className="h-full w-full object-cover object-center" src={hotel.imageUrls[0]} />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link className="cursor-pointer text-2xl font-bold" to={`/detail/${hotel._id}`}>
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex items-center gap-1">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="whitespace-nowrap rounded-lg bg-slate-300 p-2 text-xs font-bold">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight} per night</span>
            <Link
              className="h-full max-w-fit bg-blue-600 p-2 text-lg font-bold text-white hover:bg-blue-500"
              to={`/detail/${hotel._id}`}
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
