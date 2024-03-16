import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>

      <label className="flex-1 text-sm font-bold text-gray-700">
        Name
        <input
          type="text"
          className="w-full rounded border px-2 py-[6px] font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="mt-1 text-xs font-medium text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="flex-1 text-sm font-bold text-gray-700">
          City
          <input
            type="text"
            className="w-full rounded border px-2 py-[6px] font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="mt-1 text-xs font-medium text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Country
          <input
            type="text"
            className="w-full rounded border px-2 py-[6px] font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="mt-1 text-xs font-medium text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="flex-1 text-sm font-bold text-gray-700">
        Description
        <textarea
          rows={10}
          className="w-full rounded border px-2 py-[6px] font-normal"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="mt-1 text-xs font-medium text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="max-w-[50%] text-sm font-bold text-gray-700">
        Price Per Night
        <input
          type="number"
          min={1}
          className="w-full rounded border px-2 py-[6px] font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="mt-1 text-xs font-medium text-red-500">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>

      <label className="max-w- text-sm font-bold text-gray-700">
        Star Rating
        <select
          className="w-full rounded border p-2 font-normal text-gray-700"
          {...register("starRating", { required: "This field is required" })}
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="mt-1 text-xs font-medium text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}
