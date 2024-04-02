import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

export default function LatestDestinationCard({ hotel }: Props) {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img src={hotel.imageUrls[0]} className="h-full w-full object-cover object-center" />
      </div>
      <div className="absolute bottom-0 w-full rounded-b-md bg-black p-4 opacity-50">
        <span className="text-white text-2xl font-bold tracking-tight">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
}
