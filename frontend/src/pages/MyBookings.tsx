import { useQuery } from "react-query";
import bookingsService from "../services/bookings";

export default function MyBookings() {
  const { data: hotels } = useQuery("fetchMyBookings", bookingsService.fetchMyBookings);

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-8 lg:grid-cols-[1fr_3fr]">
          <div className="lg:h-[250px] lg:w-full">
            <img src={hotel.imageUrls[0]} className="objectcenter h-full w-full object-cover" />
          </div>
          <div className="flex max-h-[250px] flex-col gap-4 overflow-y-auto">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div>
            </div>
            {hotel.bookings.map((booking) => (
              <div>
                <div>
                  <span className="mr-2 font-bold">Dates:</span>
                  <span>
                    {new Date(booking.checkIn).toDateString()}
                    {" - "}
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="mr-2 font-bold">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
