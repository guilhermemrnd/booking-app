import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";

import authService from "../services/auth";
import hotelsService from "../services/hotels";

import { useAppContext } from "../contexts/AppContext";
import { useSearchContext } from "../contexts/SearchContext";

import BookingForm from "../forms/BookingForm/BookingForm";

export default function Booking() {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkIn.getTime() - search.checkOut.getTime()) / (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntent } = useQuery(
    "createPaymentIntent",
    () => hotelsService.createPaymentIntent(hotelId as string, numberOfNights.toString()),
    { enabled: !!hotelId && numberOfNights > 0 },
  );

  const { data: hotel } = useQuery(
    "getHotelById",
    () => hotelsService.getHotelById(hotelId as string),
    { enabled: !!hotelId },
  );
  const { data: currentUser } = useQuery("getCurrentUser", authService.getCurrentUser);

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
      {hotel && (
        <div className="grid h-fit gap-4 rounded-lg border border-slate-300 p-5">
          <h2 className="text-xl font-bold">Your Booking Details</h2>
          <div className="border-b py-2">
            Location:
            <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
          </div>
          <div className="flex justify-between border-b py-2">
            <div>
              Check-in
              <div className="font-bold">{search.checkIn.toDateString()}</div>
            </div>
            <div>
              Check-out
              <div className="font-bold">{search.checkOut.toDateString()}</div>
            </div>
          </div>
          <div className="border-b py-2">
            Total length of stay:
            <div className="font-bold">{numberOfNights} nights</div>
          </div>
          <div>
            Guests
            <div className="font-bold">
              {search.adultCount} adults & {search.childCount} children
            </div>
          </div>
        </div>
      )}
      {currentUser && paymentIntent && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntent.clientSecret,
          }}
        >
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntent} />
        </Elements>
      )}
    </div>
  );
}
