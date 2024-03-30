import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoForm = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export default function GuestInfoForm({ hotelId, pricePerNight }: Props) {
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInfoForm>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoForm) => {
    search.saveSearchValues(
      search.destination,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoForm) => {
    search.saveSearchValues(
      search.destination,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col gap-4 bg-blue-200 p-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2  focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkOut}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2  focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <div className="flex gap-2 bg-white px-2 py-1">
            <label className="flex items-center">
              Adults:
              <input
                className="w-full p-1 font-bold focus:outline-none"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="mt-1 text-xs font-medium text-red-500">
                {errors.adultCount.message}
              </span>
            )}
            <label className="flex items-center">
              Children:
              <input
                className="w-full p-1 font-bold focus:outline-none"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.childCount && (
              <span className="mt-1 text-xs font-medium text-red-500">
                {errors.childCount.message}
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <button className="h-full bg-blue-600 p-2 text-lg font-medium text-white hover:bg-blue-500">
              Book Now
            </button>
          ) : (
            <button className="h-full bg-blue-600 p-2 text-lg font-medium text-white hover:bg-blue-500">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
