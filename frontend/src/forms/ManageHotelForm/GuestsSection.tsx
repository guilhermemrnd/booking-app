import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Guests</h2>
      <div className="grid grid-cols-2 gap-5 rounded-sm bg-gray-300 p-6">
        <label className="flex-1 text-sm font-bold text-gray-700">
          Adults
          <input
            type="number"
            min={1}
            className="w-full rounded border px-2 py-[6px] font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount && (
            <span className="mt-1 text-xs font-medium text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Children
          <input
            type="number"
            min={0}
            className="w-full rounded border px-2 py-[6px] font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount && (
            <span className="mt-1 text-xs font-medium text-red-500">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}
