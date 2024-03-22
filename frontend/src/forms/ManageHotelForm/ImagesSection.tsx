import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string,
  ) => {
    event.preventDefault();

    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl),
    );
  };

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Images</h2>
      <div className="flex flex-col gap-4 rounded border p-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="group relative">
                <img src={url} className="min-h-full object-cover" />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100"
                  onClick={(ev) => handleDelete(ev, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-normal text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalImages = imageFiles.length + (existingImageUrls?.length || 0);

              if (totalImages === 0) {
                return "At least one image should be added";
              } else if (totalImages > 6) {
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
