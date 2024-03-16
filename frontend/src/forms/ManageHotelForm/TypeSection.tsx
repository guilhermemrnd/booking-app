import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../config/hotel-options.config";
import mergeClass from "../../utils/merge-class";

export default function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={mergeClass(
              "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold",
              watch("type") === type ? "bg-blue-300" : "bg-gray-300",
            )}
          >
            <input
              type="radio"
              value={type}
              className="hidden"
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="mt-1 text-xs font-medium text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
}
