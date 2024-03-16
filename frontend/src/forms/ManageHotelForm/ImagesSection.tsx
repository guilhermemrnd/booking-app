import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Images</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              if (imageFiles.length === 0) {
                return "At least one image should be added";
              } else if (imageFiles.length > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="mt-1 text-xs font-medium text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  );
}
