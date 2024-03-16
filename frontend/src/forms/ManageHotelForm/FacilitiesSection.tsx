import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options.config";

export default function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Facility</h2>
      <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-5">
        {hotelFacilities.map((facility) => (
          <label className="flex gap-1 text-sm text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) return true;
                  else return "At least one facility is required";
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="mt-1 text-xs font-medium text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
}
