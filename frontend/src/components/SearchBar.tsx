import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";

import { useSearchContext } from "../contexts/SearchContext";

export default function SearchBar() {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search");
  };

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 grid grid-cols-1 items-center gap-2 rounded bg-orange-400 p-3 shadow-md md:grid-cols-2 lg:grid-cols-7 lg:gap-4"
    >
      <div className="flex flex-1 flex-row items-center bg-white p-2 lg:col-span-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(ev) => setDestination(ev.target.value)}
        />
      </div>

      <div className="flex gap-2 bg-white px-2 py-1 lg:col-span-2">
        <label className="flex items-center">
          Adults:
          <input
            type="number"
            className="w-full p-1 font-bold focus:outline-none"
            min={1}
            max={20}
            value={adultCount}
            onChange={(ev) => setAdultCount(parseInt(ev.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            type="number"
            className="w-full p-1 font-bold focus:outline-none"
            min={0}
            max={20}
            value={childCount}
            onChange={(ev) => setChildCount(parseInt(ev.target.value))}
          />
        </label>
      </div>

      <div className="lg:col-span-2">
        <DatePicker
          value={[checkIn, checkOut]}
          onChange={(_, options) => {
            console.log({ options });
            setCheckIn(new Date(options.validatedValue[0]));
            setCheckOut(new Date(options.validatedValue[1]));
          }}
          range
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Pick dates"
          inputClass="min-w-full bg-white p-2  focus:outline-none"
          containerClassName="min-w-full"
          highlightToday={false}
        />
      </div>

      <div className="flex gap-1">
        <button className="h-full w-full bg-blue-600 p-2 text-lg font-bold text-white hover:bg-blue-500">
          Search
        </button>
      </div>
    </form>
  );
}
